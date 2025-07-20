# ForgeColor
A ForgeScript extension for color parsing, conversion, and manipulation — with support for multiple color formats including HEX, RGB, RGBA, HSL, CMYK, and INT.

## Installation
```bash
npm install github:user-lezi/ForgeColor
```

## Usage

```javascript
const { ForgeClient } = require("@tryforge/forgescript");
const ForgeColor = require("forge.color");

const client = new ForgeClient({
    extensions: [
        new ForgeColor()
    ]
});
```

## Functions

### Core Functions

#### `$parseColor[code]`
Parses and normalizes a color string to a structured object.

**Parameters:**
- `code` (String) - The color string to parse

**Returns:** JSON object with parsed color data

**Aliases:** `$normalizeColor`, `$colorObject`

**Example:**
```
$parseColor[#ff0000]
$c[Returns: {"format":"hex","value":"#ff0000"}]

$parseColor[rgb(255, 0, 0)]
$c[Returns: {"format":"rgb","r":255,"g":0,"b":0}]
```

#### `$convertColor[code;to]`
Converts a color code from any supported format to a target format.

**Parameters:**
- `code` (String) - The color string to convert
- `to` (String) - The format to convert to (rgb, rgba, hex, hsl, cmyk, int)

**Returns:** String (converted color in target format)

**Aliases:** `$colorConvert`, `$transformColor`

**Example:**
```
$convertColor[#ff0000;rgb]
$c[Returns: "rgb(255, 0, 0)"]

$convertColor[rgb(255, 0, 0);hsl]
$c[Returns: "hsl(0, 100%, 50%)"]
```

#### `$prettifyColor[code]`
Returns a cleaner, standardized version of the given color string.

**Parameters:**
- `code` (String) - The color string to prettify

**Returns:** String (standardized color format)

**Aliases:** `$formatColor`, `$normalizeColor`

**Example:**
```
$prettifyColor[#F00]
$c[Returns: "#ff0000" - Normalized hex format]

$prettifyColor[rgb(100%, 0%, 50%)]
$c[Returns: "rgb(255, 0, 128)" - Converted to numeric values]
```

## Supported Color Formats

### HEX
- **3-digit:** `#f00`, `#abc`
- **6-digit:** `#ff0000`, `#aabbcc`

### RGB
- **Numeric:** `rgb(255, 0, 0)`
- **Percentage:** `rgb(100%, 0%, 50%)`

### RGBA
- **Numeric:** `rgba(255, 0, 0, 0.5)`
- **Percentage:** `rgba(100%, 0%, 50%, 0.8)`

### HSL
- **Numeric:** `hsl(120, 100%, 50%)`
- **Percentage:** `hsl(180, 50%, 75%)`

### CMYK
- **Percentage:** `cmyk(0%, 100%, 100%, 0%)`
- **Decimal:** `cmyk(0, 1, 1, 0)`

### INT
- **Decimal:** `16711680`
- **Hexadecimal:** `0xff0000`

## Features

- **Robust Parsing**: Automatic format detection and validation
- **Bidirectional Conversion**: Convert between any supported formats
- **Type Safety**: Full TypeScript support with generic type constraints
- **Error Handling**: Graceful fallbacks with descriptive error messages
- **Standardized Output**: Consistent formatting across all formats

## Support
If you need any assistance, don't hesitate to reach out by opening a support form in the official BotForge Discord server! :D

## License

MIT
