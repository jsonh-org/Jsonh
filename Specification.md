<img src="https://github.com/jsonh-org/Jsonh/blob/main/IconUpscaled.png?raw=true" width=180 style="image-rendering: pixelated;">

**JSON for Humans.**

## Overview

JSONH <i>(JavaScript Object Notation for Humans)</i> is a superset of the JSON ([RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)) format.

JSONH adds syntax features like comments, multiline strings, and hexadecimal numbers. JSONH does not add data types not present in JSON, so any JSONH document can be losslessly converted to JSON.

JSONH is also backwards-compatible with the JSON5 ([spec](https://spec.json5.org)) format. Note that JSON5 also includes support for Infinity and NaN, which are not valid JSON values, so these are treated as quoteless strings in JSONH.

## Design Goals

The design goals of JSONH are:
- To read and write JSON in a more human-friendly way.
- To avoid confusing syntax found in YAML.
- To be backwards-compatible with JSON and JSON5.
- To supercede HJSON.

The intended uses of JSONH are:
- It SHOULD be used for configuration files (instead of JSON).
- It SHOULD NOT be used for machine-to-machine communication (use JSON instead).

## Feature Summary

### Objects

- Properties may be separated by a newline instead of a comma.
- Objects may have a trailing comma.
- Objects may omit braces and terminate at the end of the document.

### Arrays

- Items may be separated by a newline instead of a comma.
- Arrays may have a trailing comma.

### Strings

- Strings may be wrapped in single-quotes instead of double-quotes.
- Strings may contain newlines.
- Strings may contain extra escape sequences.
- Strings may start with an at-sign and ignore escape sequences.
- Strings may be wrapped in three or more quotes and strip indentation preceding the closing quotes.
- Strings may be quoteless and terminate at a newline or reserved symbol and strip whitespace.

### Numbers

- Numbers may have a hexadecimal, binary, or octal base specifier.
- Numbers may have a leading or trailing decimal point for the fraction and exponent.
- Numbers may start with a plus-sign.
- Numbers may separate the digits or base specifier with one or more underscores.

### Comments

- Whitespace may contain line, block, or nestable block comments.

### Whitespace

- Documents may contain extra whitespace characters.
- Documents may contain extra newline characters.

## File Encoding

JSONH is a Unicode character-based format, so it does not have a standard file or byte representation.

JSONH files SHOULD use the UTF-8 encoding and the `.jsonh` file extension.

JSONH files SHOULD NOT start with Byte Order Marks (U+FEFF). If they are not stripped when the file is read, parsers will treat them as part of a string.

## Elements

A single JSONH value is called an element. Elements can be:
- An object
- An array
- A named literal (`true`, `false`, or `null`)
- A string
- A number

## Objects

TODO

## Arrays

TODO

## Strings

TODO

## Named Literals

TODO

## Numbers

TODO

## Comments

TODO

## Whitespace

TODO

## Implementations

TODO