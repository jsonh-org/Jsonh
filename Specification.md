<img src="https://github.com/jsonh-org/Jsonh/blob/main/IconUpscaled.png?raw=true" width=180 style="image-rendering: pixelated;">

**JSON for Humans.**

## Overview

JSONH <i>(JavaScript Object Notation for Humans)</i> is a superset of the JSON ([RFC 8259](https://datatracker.ietf.org/doc/html/rfc8259)) and JSON5 ([spec](https://spec.json5.org)) formats.

JSONH is similar to JSON, while adding syntax features like comments, multiline strings, and hexadecimal numbers. JSONH does not add data types not present in JSON, so any JSONH document can be losslessly converted to JSON.

JSONH is fully backwards-compatible with JSON. Any valid JSON document is also valid JSONH and will result in the exact same value.

JSONH is also considered to be backwards-compatible with JSON5. Any valid JSON5 document is also valid JSONH. There are two noted differences in behavior:
- JSON5 also includes support for Infinity and NaN, but these are not valid JSON values, so they are treated as quoteless strings in JSONH.
- Some escape sequences are not supported by JSON5, which will treat them as a character without the backspace, but this is considered to be error handling behavior.

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
- Objects may omit braces and are terminated by the end of the document.

### Arrays

- Items may be separated by a newline instead of a comma.
- Arrays may have a trailing comma.

### Strings

- Strings may be wrapped in single-quotes instead of double-quotes.
- Strings may contain newlines.
- Strings may contain extra escape sequences.
- Strings may start with an at-sign and ignore escape sequences.
- Strings may be wrapped in three or more quotes and strip indentation preceding the closing quotes.
- Strings may be quoteless and are terminated by a newline or reserved character and strip leading and trailing whitespace.

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

It is not expected that future changes in the Unicode specification will impact the syntax of JSONH.

JSONH files SHOULD use the UTF-8 encoding and the `.jsonh` file extension.

JSONH files SHOULD NOT start with Byte Order Marks (`U+FEFF`). If they are not stripped before being passed to a parser, they will be treated as part of a quoteless string.

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

Parsers MAY allow properties which are not properly separated if they are unambiguous (e.g. `{a: "b" c: "d"}`).

If two properties have the same key, the last property replaces the first property.

Parsers SHOULD have a configurable maximum structure depth, with a default value of 64, to prevent denial-of-service attacks.

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

Parsers MAY allow items which are not properly separated if they are unambiguous (e.g. `["a" "b" "c"]`).

Arrays start with an opening square bracket (`[`) and end with a closing square bracket (`]`).

Parsers SHOULD have a configurable maximum structure depth, with a default value of 64, to prevent denial-of-service attacks.

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

Named literals are primitive values that are `null`, `true`, or `false`.
- The `null` literal is any type and represents no value.
- The `true` literal is boolean type and represents a true value.
- The `false` literal is boolean type and represents a false value.

Note that the JSON5 format also supports the literals `Infinity` and `NaN`, with optional signs (`+` or `-`). Those literals represent values which are not standard JSON, so they are not supported by JSONH. Instead, they are parsed as quoteless strings.

## Strings

Strings are primitive values that contain an ordered sequence of Unicode characters.

Strings may contain the following escape sequences:
- `\b` - Backspace (`U+0008`)
- `\f` - Form Feed (`U+000C`)
- `\n` - Line Feed (`U+000A`)
- `\r` - Carriage Return (`U+000D`)
- `\t` - Horizontal Tab (`U+0009`)
- `\v` - Vertical Tab (`U+000B`)
- `\0` - Null (`U+0000`)
- `\a` - Alert (`U+0007`)
- `\e` - Escape (`U+001B`)
- `\u` followed by 4 digits - Unicode Escape Sequence
- `\x` followed by 2 digits - Unicode Short Escape Sequence
- `\U` followed by 8 digits - Unicode Long Escape Sequence
- `\` followed by newline - Escaped Newline
- `\` followed by any other character - Literal Character

If two adjacent Unicode escape sequences (`\u`, `\x`, `\U`) are surrogates, they will be combined into a single character.

If a newline is escaped, the newline will be removed and will not be treated as a reserved character.

Note that the JSON5 format features less escape sequences than JSONH, so some escape sequences (e.g. `\e`) represent a literal character in JSON5 but an escape sequence in JSONH. Treating unsupported escape sequences as literal characters is considered to be error handling behavior, so it is not considered to affect backwards-compatibility.

Strings MAY start with an at-sign (`@`), which makes them "verbatim". Verbatim strings ignore all escape sequences.

### Quoted Strings

Quoted strings start with a double-quote (`"`) or a single-quote (`'`) and end with the same character.

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

If the content of the multi-quoted string starts with any amount of whitespace followed by a newline, and ends with a newline followed by any amount of whitespace, then the whitespace following the last newline is stripped from the start of each line. The whitespace is stripped after escape sequences are applied, meaning stripped whitespace may include escape sequences representing whitespace.

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

Numbers are primitive values that represent a numeric value.

Numbers contain the following parts:
- A fraction part:
  - A sign.
  - A base specifier.
  - An integer.
  - A decimal point.
  - An integer.
- An exponent part:
  - An exponent symbol.
  - A sign.
  - An integer.
  - A decimal point.
  - An integer.

The signs are OPTIONAL and default to positive. If given, the signs MUST be `+` or `-`. If the sign is `+`, it is positive. If the sign is `-`, it is negative.

The base specifier is OPTIONAL and defaults to decimal (base-10). If given, the base specifier MUST be `0x`, `0X`, `0b`, `0B`, `0o`, or `0O`. If the base specifier is `0x` or `0X`, it is hexadecimal (base-16). If the base specifier is `0b` or `0B`, it is binary (base-2). If the base specifier is `0o` or `0O`, it is octal (base-8).

The integers are OPTIONAL if followed by a decimal point and an integer in their part, or preceded by an integer and a decimal point in their part. If given, the integers MUST be a sequence of digits:
- For decimal numbers (base-10), each digit MUST be `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, or `9`.
- For hexadecimal numbers (base-16), each digit MUST be `0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`, `A`, `a`, `B`, `b`, `C`, `c`, `D`, `d`, `E`, `e`, `F`, or `f`.
- For binary numbers (base-2), each digit MUST be `0` or `1`.
- For octal numbers (base-8), each digit MUST be `0`, `1`, `2`, `3`, `4`, `5`, `6`, or `7`.

The decimal points are OPTIONAL if not followed by an integer. If given, the decimal points MUST be `.`, even for non-decimal numbers.

The exponent symbol is mandatory and MUST be `e` or `E`.

The fraction part is mandatory. The fraction part's value is calculated by removing the base specifier and parsing the remaining sub-parts in the base of the base specifier.

The exponent part is OPTIONAL and defaults to 0. The exponent part's value is calculated by removing the exponent symbol and parsing the remaining sub-parts in the base of the base specifier.

The number's value is calculated by multiplying the fraction part's value with 10 to the power of the exponent part's value. If the exponent part is omitted or the exponent part's value is 0, then the number's value MAY be taken directly from the fraction part's value, because the multiplication is redundant.

There MAY be one or more underscores (`_`) in the number for readability purposes. Each underscore MUST be preceded by a digit, a base specifier, or an underscore, and MUST be followed by a digit or an underscore.

If the base specifier is hexadecimal (base-16), and the number contains an exponent part, then the exponent symbol MUST be followed by a sign. Otherwise, the exponent symbol MUST be parsed as a hexadecimal digit in the fraction part instead.

Numbers SHOULD be parsed as 64-bit floating-point values, but MAY be parsed with any precision or representation. Numbers SHOULD NOT be parsed with an arbitrary precision unless this behavior is opt-in, in order to defend against denial-of-service attacks.

If the number contains an exponent part, and the exponent part's value is fractional (not an integer), then the number's value may be irrational. As such, the number's value MAY be calculated with any precision, even if the number ends up being incorrect.

Example:
```jsonh
[
    1.0
    .5e3
    +64e-1.0
    354_246.1_2_3
    0xa1b.5e2
]
```
```json
[
    1,
    500,
    6.4,
    354246.123,
    2587.36767578125
]
```

## Comments

Comments are allowed inside any whitespace and do not affect the resulting value.

### Line Comments

Line comments start with a hash (`#`) or a double-slash (`//`) and end with a newline.

Example:
```jsonh
# Numbers
3.14 // pi approximation
```
```json
3.14
```

### Block Comments

Block comments start with a slash-asterisk (`/*`) and end with an asterisk-slash (`*/`).

Block comments MAY have one or more equal-signs (`=`) between the slash (`/`) and the asterisk (`*`), which makes them "nestable". Nestable block comments end with the same number of equal-signs (`=`) between the asterisk (`*`) and the slash (`/`).

Example:
```jsonh
[ /*
  Example
*/ ]
```
```json
[]
```

Example:
```jsonh
/==*
    /* Hello */
    /=* World *=/
*==/
0
```
```json
0
```

## Whitespace

The following characters are whitespace:
- `U+0020` - Space
- `U+00A0` - Non-breaking space
- `U+1680` - Ogham space mark
- `U+2000` - En quad
- `U+2001` - Em quad
- `U+2002` - En space
- `U+2003` - Em space
- `U+2004` - Three-per-em space
- `U+2005` - Four-per-em space
- `U+2006` - Six-per-em space
- `U+2007` - Figure space
- `U+2008` - Punctuation space
- `U+2009` - Thin space
- `U+200A` - Hair space
- `U+202F` - Narrow no-break space
- `U+205F` - Medium mathematical space
- `U+3000` - Ideographic space
- `U+2028` - Line separator
- `U+2029` - Paragraph separator
- `U+0009` - Character tabulation / Horizontal tab
- `U+000A` - Line feed
- `U+000B` - Line tabulation / vertical tab
- `U+000C` - Form feed
- `U+000D` - Carriage return
- `U+0085` - Next line

These whitespace characters correspond to [`char.IsWhiteSpace`](https://learn.microsoft.com/en-us/dotnet/api/system.char.iswhitespace?view=net-10.0#remarks) in .NET 10.0. Note that parsers SHOULD NOT use the `char.IsWhiteSpace` method instead of hardcoding the whitespace characters, because the behavior of that method is subject to change in future versions of .NET.

## Newlines

The following characters are newlines:
- `U+000A` (line feed)
- `U+000D` (carriage return)
- `U+2028` (line separator)
- `U+2029` (paragraph separator)

If a carriage return (`U+000D`) is followed by a line feed (`U+000A`), they are combined into a single newline.

These newline sequences correspond to [line terminators in JSON5](https://spec.json5.org/#escapes).

## Tokens

Parsers MAY have a way to read the tokens of a JSONH document instead of parsing them as an element.

If available, every token MUST have a string value and one of the following types:

- `0` - None (uninitialized token)
- `1` - Start Object
- `2` - End Object
- `3` - Start Array
- `4` - End Array
- `5` - Property Name
- `6` - Comment
- `7` - String
- `8` - Number
- `9` - True
- `10` - False
- `11` - Null

These token types correspond to [JsonTokenType](https://learn.microsoft.com/en-us/dotnet/api/system.text.json.jsontokentype?view=net-10.0) in .NET 10.0. Note that parsers MAY use the `JsonTokenType` enum instead of defining a new enum, because that enum is unlikely to change in future versions of .NET.

The token's string value MUST be the following:
- An empty string for `None`, `Start Object`, `End Object`, `Start Array`, and `End Array`.
- The parsed property key content for `Property Name`.
- The raw comment content for `Comment`.
- The parsed string content for `String`.
- The raw unparsed number for `Number`.
- The string "true" for `True`.
- The string "false" for `False`.
- The string "null" for `Null`.

If a comment is between a property key and a colon (`:`), then the `Comment` token MUST be outputted before the `Property Name` token.

For objects, the `Start Object` and `End Object` tokens MUST be outputted, even if the object is braceless.

Tokens SHOULD be outputted in a deferred manner (one at a time).

## Implementations

A JSONH parser MUST be able to parse JSONH text into a value or a JSON string.

A JSONH parser MAY be able to parse JSONH text into a stream of tokens.

An official "reference" JSONH parser SHOULD match the [JsonhCs](https://github.com/jsonh-org/JsonhCs) implementation as closely as possible.

A machine SHOULD NOT generate JSONH text, as JSON text should be generated instead. A machine MAY generate JSON text and store it in a JSONH file.

A JSONH parser MUST support version 2 of JSONH. A JSONH parser MAY also support version 1 of JSONH if it is opt-in.

## Versioning

The JSONH specification uses a `MAJOR.MINOR` versioning system to ensure changes to the syntax are properly documented.

JSONH version 2 (JSONH V2) was first released on 2025/11/19. This version adds support for verbatim strings and nestable block comments.

JSONH version 1 (JSONH V1) was first released on 2025/03/19. This version is deprecated and SHOULD NOT be used.

The JSONH specification is very unlikely to receive a new major version. Parsers MUST assume that JSONH text is in version 2 unless specified elsewhere.

## Terminology

The words "start(s) with" and "end(s) with" are inclusive, meaning included in the value.

The words "terminated by" are exclusive, meaning not included in the value.

The key words "MUST", "MUST NOT", "REQUIRED", "SHALL", "SHALL NOT", "SHOULD", "SHOULD NOT", "RECOMMENDED",  "MAY", and "OPTIONAL" in this document are to be interpreted as described in [RFC 2119](https://datatracker.ietf.org/doc/html/rfc2119).
