'use strict';

/**
 * Msbt2Json Class.
 */
module.exports = class Msbt2Json {
  /**
   * convert MSBT file to json file.
   * @param {string} msbtFileName - The path of the file to convert.
   */
  convert(msbtFileName) {
    const fs = require('fs');
    const path = require('path');

    this.buff = fs.readFileSync(msbtFileName);

    // check MSBT magic.
    const msbtMagic = this.buff.toString(undefined, 0, 8);
    if (msbtMagic !== 'MsgStdBn') {
      throw new Error('Invalid MSBT Header.');
    }

    // endian.
    this.isLE = this.buff.readUInt8(0x08) === 0xff;

    // number of blocks.
    const blockNum = this.readUInt16(0x0e);

    // current offset.
    this.offset = 0x20;

    for (let i = 0; i < blockNum; i++) {
      const blockType = this.buff.toString(
          undefined,
          this.offset,
          this.offset + 4,
      );
      const blockSize = this.readUInt32(this.offset + 0x04);

      this.offset += 0x10;

      if (blockType === 'LBL1') {
        this.parseLabelBlock();
      } else if (blockType === 'TXT2') {
        this.parseTextBlock(blockSize);
      }

      this.offset += Math.ceil(blockSize / 0x10) * 0x10;
    }

    if (this.labelList.length > 0 && this.messageList.length > 0) {
      // create json.
      const json = {};
      this.labelList.forEach((label, i) => {
        json[label] = this.messageList[i];
      });
      // output json.
      const outDir = path.dirname(msbtFileName);
      const baseName = path.basename(msbtFileName, path.extname(msbtFileName));
      const outPath = path.format({
        dir: outDir,
        name: baseName,
        ext: '.json',
      });
      fs.writeFileSync(outPath, JSON.stringify(json, null, 2));
    }
  }

  /**
   * parse LBL1
   */
  parseLabelBlock() {
    const tableCount = this.readUInt32(this.offset);
    this.labelList = [];
    let tableOffset = this.offset + 0x04;
    for (let i = 0; i < tableCount; i++) {
      const labelCount = this.readUInt32(tableOffset);
      let labelOffset = this.offset + this.readUInt32(tableOffset + 0x04);
      for (let j = 0; j < labelCount; j++) {
        const labelLen = this.buff.readInt8(labelOffset);
        const start = labelOffset + 0x01;
        const end = start + labelLen;
        const label = this.buff.toString(undefined, start, end);
        const labelIndex = this.readUInt32(end);
        this.labelList[labelIndex] = label;
        labelOffset += 0x01 + labelLen + 0x04;
      }
      tableOffset += 0x08;
    }
  }

  /**
   * parse TXT2
   * @param {integer} blockSize - Block size.
   */
  parseTextBlock(blockSize) {
    const messageCount = this.readUInt32(this.offset);
    this.messageList = [];
    let tableOffset = this.offset + 0x04;
    for (let i = 0; i < messageCount; i++) {
      const messageOffset = this.offset + this.readUInt32(tableOffset);
      let end = -1;
      if (i + 1 < messageCount) {
        end = this.offset + this.readUInt32(tableOffset + 0x04) - 2;
      } else {
        end = this.offset + blockSize - 2;
      }
      const message = this.buff.toString('utf16le', messageOffset, end);
      this.messageList[i] = message;
      tableOffset += 0x04;
    }
  }

  /**
   * readUInt16.
   * @param {integer} offset - Number of bytes to skip before starting to read.
   * @return {integer}
   */
  readUInt16(offset) {
    return this.isLE ?
      this.buff.readUInt16LE(offset) :
      this.buff.readUInt16BE(offset);
  }

  /**
   * readUInt32.
   * @param {integer} offset - Number of bytes to skip before starting to read.
   * @return {integer}
   */
  readUInt32(offset) {
    return this.isLE ?
      this.buff.readUInt32LE(offset) :
      this.buff.readUInt32BE(offset);
  }
};
