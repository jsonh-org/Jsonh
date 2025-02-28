# JSONH
 
**JSON for Humans.**

JSON is great. Until you miss that trailing comma... or want to use comments. What about multiline strings?
JSONH provides a much more elegant way to write JSON that's designed for humans rather than machines.

Since JSONH is compatible with JSON, any JSONH syntax can be represented with equivalent JSON.

## Example

```jsonh
{
    // use #, // or /**/ comments
    
    // quotes are optional
    keys: without quotes,

    // commas are optional
    isn\'t: {
        that: cool? # yes
    }

    // brackets are optional
    i love: pizza, ice cream, cola

    // use multiline strings
    haiku: '''
        Let me die in spring
          beneath the cherry blossoms
            while the moon is full.
        '''
    
    // compatible with JSON5
    key: 0xDEADCAFE

    // or use JSON
    "old school": 1337
}
```

## Background

JSONH is a format inspired by and closely related to [HJSON](https://hjson.github.io). It aims to improve HJSON's pitfalls while keeping its elegant charm.

Unlike HJSON, JSONH is also backwards compatible with [JSON5](https://json5.org), a superset of JSON that adds features like hexadecimal numbers and escaped newlines.

Usability is at the forefront of JSONH, and this is evident in the features borrowed from all three formats.

```
JSON
  |______
  |      |
JSON5  HJSON
  |
JSONH
```

## Why Should I Use This?

### Over JSON

While JSON is designed to be readable for humans, it's secondary to communication between machines. As such, its syntax is strict, inflexible and basic.

```json
{
    "name": "John Doe",
    "age": 20
}
```

No comments, no trailing commas, no multiline strings, no floating-point literals or hexadecimal. It's as basic as it gets, and can leave you desiring something more.

### Over HJSON

HJSON makes a number of adventurous improvements to JSON. Among quality-of-life changes like trailing commas are more zany ideas like quoteless strings.

```hjson
{
    name: John Doe
    age: 20 # last we heard
}
```

Unfortunately, HJSON's elegance can be undermined by a number of design pitfalls that are too late to change. For example:
- Commas at the end of quoteless strings are parsed as part of the string.
- Multiline strings are very difficult to parse due to an oversight.
- No way to represent Infinity or NaN.

JSONH should be considered as "HJSON v2".

### Over JSON5

JSON5 sticks much closer to JSON than other formats. It mainly adds things like trailing commas and quoteless property names.

```json5
{
    name: "John Doe",
    age: 20 // last we heard
}
```

Since its primary purpose is compatibility with ECMAScript, it's missing some desirable features like:
- Multiline strings.
- Omitted commas.
- Omitted root braces.

### Over YAML

YAML is a format that introduces more confusion than improvements to JSON.

```yaml
name: "John Doe"
age: 20 # last we heard
```

Instead of building upon the JSON syntax, YAML provides a huge number of features, each one more error-prone than the last.
- Indentation-based arrays and objects, with confusion on when or how much indentation is necessary.
- Arbitrary dashes to signify the beginning of an object.
- Multiline string indicators like `>`, `|`, `>-`, `>+`, `|+` (is this readable??)

Safe to say, YAML can't be understood by non-YAML programmers.
JSONH is much more straightforward and still has all the features you need to express yourself.

### Over TOML

TOML is based on INI rather than JSON, making it a format used strictly for configuration files. However, it adds support for JSON objects and other syntax.

```toml
[person]
name = "John Doe"
age = 20
```

Whereas JSON is hierarchical and unambiguous, it's not immediately clear what the attributes in TOML refer to.
Additionally, if you want values as objects, you end up using JSON anyway, making the TOML syntax inconsistent.

### Objection!

You might be thinking: new programming languages and formats get created all the time, and never reach the light of day due to a lack of usage.
Basically, it's hard to get people to change to new things.

However, in the case of JSONH, this is not a problem. Programming languages are most useful when they have widespread adoption and an ecosystem of packages.
However, configuration/data formats like JSONH are useful in personal projects, oblivious to common usage. Use the format that's right for you.

## Syntax

See the syntax in [McKeeman Form](https://github.com/jsonh-org/Jsonh/blob/main/McKeemanSyntax.md).

Since JSONH is a superset of JSON and JSON5, all valid JSON and JSON5 is valid JSONH.

### Objects

Objects contain an ordered sequence of properties (`key: value`).

They are optionally wrapped in braces (`{}`).

Properties are separated with `,` or a newline. A single trailing comma is allowed.

If two properties have the same key, the first property is replaced.

```jsonh
{
    a: b
    c: d
}
```
```json
{
    "a": "b",
    "c": "d"
}
```

If not wrapped in braces, they terminate at `}`, `]` or the end of the document.

> [!TIP]  
> Keep braces for nested objects to avoid confusion.

```jsonh
meal: pizza
drink: cola
snacks: [
    "name": "biscuit",
    "flavor": "chocolate"
]
```
```json
{
    "meal": "pizza",
    "drink": "cola",
    "snacks": [
        {
            "name": "biscuit",
            "flavor": "chocolate"
        }
    ]
}
```

### Arrays

Arrays contain an ordered sequence of items.

They are wrapped in brackets (`[]`).

Items are separated with `,` or a newline. A single trailing comma is allowed.

```jsonh
[
    a
    b
]
```
```json
[
    "a",
    "b"
]
```

If not wrapped in brackets, they terminate at `}`, `]`, a property name or the end of the document.

```jsonh
pizza,
prosciutto
drinks: cola, lemonade,
ice cream,
dessert: chocolate
```
```json
[
    "pizza",
    "prosciutto",
    {
        "drinks": [
            "cola",
            "lemonade",
            "ice cream"
        ],
        "dessert": "chocolate"
    }
]
```

### Named Literals

Named literals are case-insensitive, but the recommended casing is below.

- `null` - no value (any type)
- `true` - true (boolean)
- `false` - false (boolean)
- `Infinity`/`+Infinity` - positive infinity (number)
- `-Infinity` - negative infinity (number)
- `NaN`/`+NaN`/`-NaN` - not a number (number)

### Strings

Strings contain an ordered sequence of characters.

All strings can contain escape sequences starting with `\`:
- `\b` - backspace
- `\f` - form feed
- `\n` - newline
- `\r` - carriage return
- `\t` - tab
- `\v` - vertical tab
- `\0` - null
- `\a` - alert
- `\e` - escape (`\e` = `\u001b`)
- `\u0000` - UTF-16 escape sequence (`\u00E7` = `ç`)
- `\x00` - short UTF-16 escape sequence (`\xE7` = `ç`)
- `\U00000000` - UTF-32 escape sequence (`\U0001F47D` = `👽`)
- `\(newline)` - escaped newline (`\(newline)` = `(empty)`)
- `\(rune)` - literal character (`\q` = `q`)

#### Double-Quoted Strings / Single-Quoted Strings

Double-quoted/single-quoted strings are wrapped in double-quotes (`"`) or single-quotes (`'`).

They can contain newlines.

```jsonh
"hello
world\n"
```
```json
"hello\nworld\n"
```

#### Multi-Quoted Strings (AKA: Triple-Quoted Strings, Multi-Line Strings)

Multi-quoted strings are wrapped in three or more double-quotes (`"""`) or single-quotes (`'''`).

The leading whitespace preceding the closing quotes is stripped from the beginning of each line.

The whitespace preceding the first newline is also stripped.

```jsonh
   """
  hello
    world
  """
```
```json
"hello\n  world"
```

If the multi-quoted string doesn't contain a newline, no whitespace is stripped.

```jsonh
'''  hello world  '''
```
```json
"  hello world  "
```

#### Quoteless Strings (AKA: Unquoted Strings)

Quoteless strings are terminated by a newline or a symbol.

```jsonh
{ text: hello world, }
```
```json
{ "text": "hello world" }
```

Unlike other types of strings, reserved symbols and newlines must be escaped.

```jsonh
this \, is a comma. this\
\n is a newline.
```
```json
"this , is a comma. this\n is a newline."
```

Leading/trailing whitespace is always stripped.

```jsonh
a:   b c ,
```
```json
{
    "a": "b c"
}
```

### Numbers

Numbers represent a numeric value.

#### Rational Numbers

Rational numbers are comprised of the following optional components: a sign, a fractional number, and a fractional exponent.

- The sign can be `+` or `-`.
- The decimal point can be leading (`.5`) or trailing (`5.`).
- The exponent starts with `e` or `E` and an optional sign (`+` or `-`).

- If the number starts with `0x` or `0X`, every digit is hexadecimal (base-16).
- If the number starts with `0b` or `0B`, every digit is binary (base-2).
- If the number starts with `0o` or `0O`, every digit is octal (base-8).
- Otherwise, every digit is decimal (base-10).

Digits can be separated by underscores (`_`). Leading or trailing underscores are not allowed.

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
    258750.0
]
```

> [!NOTE]
> Since fractional exponents (e.g. `1e3.4`) can be irrational, implementations may choose an arbitrary precision, including truncating the exponent to an integer.
> As such, fractional exponents should be avoided.

### Comments

Comments are allowed in the space of any whitespace and do not affect the resulting JSONH.

#### Line Comments

Line comments start with a hash (`#`) or a double-slash (`//`) and are terminated by a newline.

```jsonh
# Numbers
3.14 # pi approximation
```
```json
3.14
```

#### Block Comments

Block comments start with a slash-asterisk (`/*`) and are terminated by an asterisk-slash (`*/`).

```jsonh
[ /*
  Example
*/ ]
```
```json
[  ]
```

### Whitespace

Any unicode whitespace character is considered valid whitespace.

> [!NOTE]
> Languages that don't support unicode whitespace may only support JSON whitespace (space, tab, line feed, carriage return).
> As such, non-JSON whitespace should be avoided.

C#:
```cs
char.IsWhiteSpace(' ');
```
Ruby:
```rb
' '.match(/\s/)
```
Python:
```py
' '.isspace()
```
Lua:
```lua
(" "):match("%s") -- JSON whitespace only
```
C++:
```cpp
isspace(u' '); // JSON whitespace only
```

### Newlines

The characters `\n` (line feed), `\r` (carriage return), `\r\n` (carriage return + line feed), `\u2028` (line separator) and `\u2029` (paragraph separator) are valid string line terminators.

> [!NOTE]
> Languages that don't support unicode characters may only support JSON newlines (line feed, carriage return, carriage return + line feed).
> As such, non-JSON newlines should be avoided.

```jsonh
"hi \
there"
```
```json
"hi there"
```

### Metadata

#### Byte Encoding

JSONH can be written in any unicode encoding (UTF-8, UTF-16, UTF-32).

#### File Extension

JSONH files should always end with `.jsonh`.

#### Versioning

JSONH uses a versioning system to ensure any changes to the syntax are properly documented.

Implementations may support one or more versions of JSONH.

### Contributing

Contributions are welcome.

#### Suggestions

Please raise an issue. Note that the format shouldn't stray too far from HJSON or JSON5 and should be directly translatable to JSON.

#### Implementations

You are welcome to write a JSONH parser in a language of your choice. Raise an issue so it can be added to the list.

#### Parser Implementations

| Language | Implementation | Package |
| -------- | -------------- | ------- |
| C# | [JsonhCs](https://github.com/jsonh-org/JsonhCs) | [WIP]

#### Highlighter Implementations

| Editor | Implementation | Package |
| ------ | -------------- | ------- |
| VSCode | [JsonhVscode](https://github.com/jsonh-org/JsonhVscode) | [WIP]