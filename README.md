# msbt2json
`msbt2json` is an npm package to convert [MSBT](https://github.com/Kinnay/Nintendo-File-Formats/wiki/MSBT-File-Format) file to JSON file.

|  Type  |  Description  |  Conversion destination  |
|  ----  |  ----  |  ----  |
|  LBL1  |  Message labels  |  JSON Key  |
|  TXT2  |  Message strings  |  JSON Value  |
|  ATR1  |  Attributes  |  ***Do not convert***  |
|  TSY1  |  Text style  |  ***Do not convert***  |

## Installation
[![npm version](https://badge.fury.io/js/msbt2json.svg)](https://badge.fury.io/js/msbt2json)

``` sh
npm i msbt2json
```
## Usage
The JSON file converted from the MSBT file will be output to the same directory as the MSBT file.

``` js
const msbt2json = require('msbt2json');
const jsonFilePath = msbt2json.convert('<MSBT file path>');
```

### Example
``` js
const msbt2json = require('msbt2json');
const jsonFilePath = msbt2json.convert('/home/foo/bar.msbt');
// --> output "/home/foo/bar.json"
```

### npm run
``` sh
npm run convert -- <MSBT file path>
```
