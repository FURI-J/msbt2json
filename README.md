# msbt2json
`msbt2json` is an npm library to convert [MSBT](https://github.com/Kinnay/Nintendo-File-Formats/wiki/MSBT-File-Format) file to JSON file.

|  Type  |  Description  |  Conversion destination  |
|  ----  |  ----  |  ----  |
|  LBL1  |  Message labels  |  JSON Key  |
|  TXT2  |  Message strings  |  JSON Value  |
|  ATR1  |  Attributes  |  ***Do not convert***  |
|  TSY1  |  Message strings  |  ***Do not convert***  |

## Installation
``` sh
npm install --save msbt2json
```
## Usage
``` js
const Msbt2Json = require('msbt2json');
new Msbt2Json().convert('<MSBT file path>');
// --> The file(s) extracted from the SARC file is output to the same directory as the SARC file.
```

Example:
``` js
const Msbt2Json = require('msbt2json');
new Msbt2Json().convert('/home/foo/bar.msbt');
// --> output "/home/foo/bar/baz.json"
```
