<img src="https://github.com/jsonh-org/Jsonh/blob/main/IconUpscaled.png?raw=true" width=180 style="image-rendering: pixelated;">

**JSON for Humans.**

## Overview

JSONH <i>(JavaScript Object Notation for Humans)</i> is a superset of the JSON ([RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)) format.

JSONH adds syntax features like comments, multiline strings, and hexadecimal numbers. JSONH does not add data types not present in JSON, so any JSONH document can be losslessly converted to JSON.

JSONH is also backwards-compatible with the JSON5 ([spec](https://spec.json5.org)) format.
Note that JSON5 also includes support for Infinity and NaN, which are not valid JSON values, so these are treated as quoteless strings in JSONH.
Also note that some escape sequences are not supported by JSON5, which will treat them as a literal character, but this is considered to be error handling behavior, so it does not affect backwards-compatibility.

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

- Numbers may separate the digits or base specifier with one or more underscores.
- Numbers may have a hexadecimal, binary, or octal base specifier.
- Numbers may start with a plus-sign.
- Numbers may have a leading or trailing decimal point for the fraction and exponent.
- Numbers may have a fractional exponent.

### Comments

- Whitespace may contain line, block, or nestable block comments.

### Whitespace

- Documents may contain extra whitespace characters.
- Documents may contain extra newline characters.

## File Encoding

JSONH is a Unicode character-based format, so it does not have a standard file or byte representation.

JSONH files SHOULD use the UTF-8 encoding and the `.jsonh` file extension.

JSONH files SHOULD NOT start with Byte Order Marks (U+FEFF). If they are not stripped before being passed to a parser, they will be treated as part of a quoteless string.

## Elements

A single JSONH value is called an element. Elements may be:
- An object
- An array
- A named literal (`true`, `false`, or `null`)
- A string
- A number

## Objects

Objects are structures that contain an unordered sequence of properties.

Properties contain a key (any string), a colon (`:`) and a value (any element).

Properties are separated by a comma (`,`) or a newline. Objects may contain a single trailing comma (`,`).

If two properties have the same key, the last property replaces the first property.

### Braced Objects

Braced objects start with an opening curly brace (`{`) and end with a closing curly brace (`}`).

Example:
```jsonh
{
    food: pizza
    drink: cola
    price: 500
}
```
```json
{
    "food": "pizza",
    "drink": "cola",
    "price": 500
}
```

### Braceless Objects

Braceless objects start with a property and are terminated by the end of the document.

Example:
```jsonh
food: pizza
drink: cola
price: 500
```
```json
{
    "food": "pizza",
    "drink": "cola",
    "price": 500
}
```

## Arrays

Arrays are structures that contain an ordered sequence of items (any element).

Items are separated by a comma (`,`) or a newline. Arrays may contain a single trailing comma (`,`).

Arrays start with an opening square bracket (`[`) and end with a closing square bracket (`]`).

Example:
```jsonh
[
    pizza
    cola
]
```
```json
[
    "pizza",
    "cola"
]
```

## Named Literals

Named literals are one of `null`, `true`, or `false`.
- The `null` literal is a value of any type.
- The `true` literal is a boolean value of true.
- The `false` literal is a boolean value of false.

Note that the JSON5 format also supports the literals `Infinity` and `NaN`, with optional signs (`+` or `-`). These literals represent values which are not standard JSON, so they are not supported by JSONH. Instead, they are parsed as quoteless strings.

## Strings

Strings are primitive values that contain an ordered sequence of Unicode characters.

Strings may contain the following escape sequences:
- `\b` - Backspace (U+0008)
- `\f` - Form Feed (U+000C)
- `\n` - Line Feed (U+000A)
- `\r` - Carriage Return (U+000D)
- `\t` - Horizontal Tab (U+0009)
- `\v` - Vertical Tab (U+000B)
- `\0` - Null (U+0000)
- `\a` - Alert (U+0007)
- `\e` - Escape (U+001B)
- `\u` followed by 4 digits - Unicode Escape Sequence
- `\x` followed by 2 digits - Unicode Short Escape Sequence
- `\U` followed by 8 digits - Unicode Long Escape Sequence
- `\` followed by newline - Escaped Newline
- `\` followed by any other character - Literal Character

If two adjacent Unicode escape sequences (`\u`, `\x`, `\U`) are surrogates, they will be combined into a single character.

If a newline is escaped, the newline will be removed and will not be treated as a reserved character.

Note that the JSON5 format features less escape sequences than JSONH, so some escape sequences (e.g. `\e`) represent a literal character in JSON5 but an escape sequence in JSONH. Treating unsupported escape sequences as literal characters is considered to be error handling behavior, so it is not considered to affect backwards-compatibility.

Strings MAY start with an at-sign (`@`), which will cause escape sequences to be ignored.

### Quoted Strings

Quoted strings start with a double-quote (`"`) or single-quote (`'`) and end with the same character.

Quoted strings MAY contain newlines.

Example:
```jsonh
'hello
world'
```
```json
"hello\nworld"
```

### Multi-Quoted Strings

Multi-quoted strings start with three or more double-quotes (`"`) or single-quotes (`'`) and end with the same sequence.

If the content of the multi-quoted string starts with any amount of whitespace followed by a newline, and ends with a newline followed by any amount of whitespace, then the whitespace following the last newline is stripped from the beginning of each line. The whitespace is stripped after escape sequences are applied, meaning stripped whitespace may include escape sequences representing whitespace.

If the content of the multi-quoted string does not start with any amount of whitespace followed by a newline, or does not end with a newline followed by any amount of whitespace, then no whitespace is stripped.

Example:
```jsonh
   """
  hello
    world
  """
```
```json
"hello\n  world"
```

Example:
```jsonh
"""
  hello world  """
```
```json
"\n  hello world  "
```

Example:
```jsonh
"""  hello world
  """
```
```json
"  hello world\n  "
```

### Quoteless Strings

Quoteless strings start with a non-reserved character and are terminated by a newline, a reserved character, or the end of the document.

Reserved characters are one of `,`, `:`, `[`, `]`, `{`, `}`, `/`, `#`, `"`, `'`, or `@`.

Leading and trailing whitespace is always stripped, including whitespace resulting from escape sequences.

Example:
```jsonh
{ text: hello world, }
```
```json
{
    "text": "hello world"
}
```

Example:
```jsonh
this \, is a comma. this\
\n is a newline.
```
```json
"this , is a comma. this\n is a newline."
```

Example:
```jsonh
food:   pizza rolls \n,
```
```json
{
    "food": "pizza rolls"
}
```

## Numbers

TODO

## Comments

TODO

## Whitespace

TODO

## Implementations

TODO