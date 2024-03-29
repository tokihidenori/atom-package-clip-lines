# clip-lines package

Clipping file lines and line numbers

# How to use

1. Select File Lines.
2. Run Command `clip-lines:copy`

# clip sample

```
path/to/README.md: 1-20

5| # How to use
6|
7| 1. Select File Lines.
8| 2. Run Command `clip-lines:copy`
9|
10| # clip sample
11|
12| ```
13| /Users/.../github/copy-file-lines/README.md: 8
14|
15| 2. Continue `clip-lines:copy` until you get entry you want.
16| ```
17|
18| # Keymap
19|
20| - Mac: ctrl + opt + c
```

# Keymap

- Mac: ctrl + opt + c
- Win: ctrl + alt + c

# Config

- lineEndingCode

  default: \n

- lineNumberSepalater

  default: |

- enableMarkDownFormat

  default: true

- includeFilepathInSyntaxMarkDownHighlight

  default: false
  ### sample

  >js:lib/clip-lines.js(7-16)
  7|     lineEndingCode: {
  8|       type: 'string',
  9|       default: "\n"
  10|     },
  11|     lineNumberSepalater: {
  12|       type: 'string',
  13|       default: "|"
  14|     },
  15|     enableMarkDownFormat: {
  16|       type: 'boolean',


- onlyIncludeProjectPath

  default: true
