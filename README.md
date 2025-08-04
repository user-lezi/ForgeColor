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

---

## Function Reference

For a complete list of available color functions, usage, and examples, see the [ForgeDocs](https://forgedocs.page.gd/#8).

---

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
