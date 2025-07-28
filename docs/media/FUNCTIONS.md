# ForgeColor Function Reference

A complete list of all color-related functions provided by the ForgeColor extension for ForgeScript.

---

## Table of Contents

- [Color Parsing & Detection](#color-parsing--detection)
  - [$parseColor](#parsecolor)
  - [$colorFormatType](#colorformattype)
- [Color Conversion & Formatting](#color-conversion--formatting)
  - [$convertColor](#convertcolor)
  - [$prettifyColor](#prettifycolor)
- [Color Manipulation](#color-manipulation)
  - [$invertColor](#invertcolor)
  - [$getColorChannel](#getcolorchannel)
- [Color Generation](#color-generation)
  - [$randomColor](#randomcolor)
  - [$blendColors](#blendcolors)

---

## Color Parsing & Detection

### `$parseColor[code]`

Parses and normalizes a color string to a structured object.

- **Parameters:**
  - `code` (String): The color string to parse.
- **Returns:** JSON object with parsed color data.
- **Aliases:** `$normalizeColor`, `$colorObject`
- **Example:**
  ```js
  $parseColor[#ff0000]
  $c[Returns: {"format":"hex","value":"#ff0000"}]

  $parseColor[rgb(255, 0, 0)]
  $c[Returns: {"format":"rgb","r":255,"g":0,"b":0}]
  ```

---

### `$colorFormatType[code]`

Returns the format of a given color code (hex, rgb, rgba, hsl, etc).

- **Parameters:**
  - `code` (String): The color code to get the format of.
- **Returns:** String (format name: hex, rgb, rgba, hsl, cmyk, int, or "unknown").
- **Aliases:** `$getColorFormat`, `$detectColorFormat`
- **Example:**
  ```js
  $colorFormatType[#ff0000]
  $c[Returns: "hex"]
  $colorFormatType[rgb(255,0,0)]
  $c[Returns: "rgb"]
  $colorFormatType[invalid-color]
  $c[Returns: "unknown"]
  ```

---

## Color Conversion & Formatting

### `$convertColor[code;to]`

Converts a color code from any supported format (hex, rgb, hsl, etc.) to a target format.

- **Parameters:**
  - `code` (String): The color string to convert.
  - `to` (String): The format to convert to (hex, rgb, rgba, hsl, cmyk, int).
- **Returns:** String (converted color in target format).
- **Aliases:** `$colorConvert`, `$transformColor`
- **Example:**
  ```js
  $convertColor[#ff0000;rgb]
  $c[Returns: "rgb(255, 0, 0)"]
  $convertColor[rgb(255,0,0);hsl]
  $c[Returns: "hsl(0, 100%, 50%)"]
  ```

---

### `$prettifyColor[code]`

Returns a cleaner, standardized version of the given color string.

- **Parameters:**
  - `code` (String): The color string to prettify.
- **Returns:** String (standardized color format).
- **Aliases:** `$formatColor`, `$normalizeColor`
- **Example:**
  ```js
  $prettifyColor[#F00]
  $c[Returns: "#ff0000"]
  $prettifyColor[rgb(100%,0%,50%)]
  $c[Returns: "rgb(255, 0, 128)"]
  ```

---

## Color Manipulation

### `$invertColor[code]`

Inverts a color's RGB channels and returns a new inverted color in the original format.

- **Parameters:**
  - `code` (String): The color to invert.
- **Returns:** String (inverted color in the original format).
- **Aliases:** `$colorInvert`, `$inverseColor`
- **Example:**
  ```js
  $invertColor[#000000]
  $c[Returns: "#ffffff"]
  $invertColor[rgb(10, 20, 30)]
  $c[Returns: "rgb(245, 235, 225)"]
  ```

---

### `$getColorChannel[code;channel]`

Extracts a specific channel (e.g. red, hue, saturation) from a color code.

- **Parameters:**
  - `code` (String): The color string to extract from.
  - `channel` (String): The channel to extract (red, green, blue, alpha, hue, saturation, lightness, cyan, magenta, yellow, key).
- **Returns:** Number (value of the requested channel).
- **Aliases:** `$colorChannel`, `$extractColorChannel`
- **Example:**
  ```js
  $getColorChannel[#ff0000;red]
  $c[Returns: 255]
  $getColorChannel[rgb(10,20,30);blue]
  $c[Returns: 30]
  $getColorChannel[hsl(120,100%,50%);hue]
  $c[Returns: 120]
  ```

---

## Color Generation

### `$randomColor[format?]`

Generates a random color in the specified format (hex by default).

- **Parameters:**
  - `format` (String, optional): The desired output format: hex, rgb, rgba, hsl, int, or cmyk.
- **Returns:** String (random color in the requested format).
- **Example:**
  ```js
  $randomColor
  $c[Returns: "#a1b2c3" (random hex)]
  $randomColor[rgb]
  $c[Returns: "rgb(123, 45, 67)"]
  $randomColor[hsl]
  $c[Returns: "hsl(210, 50%, 60%)"]
  ```

---

### `$blendColor[color 1;color 2;mode;t?]`

Blends two colors using a blend mode like average, multiply, or gamma.

- **Parameters:**
  - `color 1` (String): The first color.
  - `color 2` (String): The second color.
  - `mode` (String): The blend mode to use (average, additive, screen, multiply, gamma).
  - `t` (Number, optional): Blend factor between 0 and 1. Used only for "average" and "gamma" modes. Defaults to 0.5.
- **Returns:** String (blended color in RGB format).
- **Aliases:** `$blend`, `$mixColors`
- **Example:**
  ```js
  $blendColors[#ff0000;#ff000f;additive]
  $c[Returns: "rgb(255, 0, 15)"]
  $blendColors[rgb(255, 0, 0);rgb(255, 0, 255);gamma;0.34]
  $c[Returns: "rgb(255, 0, 158)"]
  ```

---

> All functions support robust error handling and will return descriptive error messages for invalid input.

--- 