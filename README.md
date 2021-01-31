[![npm version](https://badge.fury.io/js/msbt2json.svg)](https://badge.fury.io/js/msbt2json)

# msbt2json
`msbt2json` is an npm library to convert [MSBT](https://github.com/Kinnay/Nintendo-File-Formats/wiki/MSBT-File-Format) file to JSON file.

|  Type  |  Description  |  Conversion destination  |
|  ----  |  ----  |  ----  |
|  LBL1  |  Message labels  |  JSON Key  |
|  TXT2  |  Message strings  |  JSON Value  |
|  ATR1  |  Attributes  |  ***Do not convert***  |
|  TSY1  |  Text style  |  ***Do not convert***  |

## Installation
``` sh
npm install --save msbt2json
```
## Usage
``` js
const msbt2json = require('msbt2json');
msbt2json.convert('<MSBT file path>');
// --> The file(s) extracted from the SARC file is output to the same directory as the SARC file.
```

Example:
``` js
const msbt2json = require('msbt2json');
msbt2json.convert('/home/foo/bar.msbt');
// --> output "/home/foo/bar/baz.json"
```
