# JSONH
 
**JSON for Humans.**

JSON is great. Until you miss that trailing comma... or want to use comments. What about multiline strings?
JSONH provides a much more elegant way to write JSON that's designed for humans rather than machines.

## Example

```jsonh
{
    // use #, // or /**/ comments
    // quotes are optional
    keys: without quotes,
    // commas are optional
    isn\'t: {
        that: cool?
    }
    // use multiline strings
    haiku: '''
        Let me die in spring
          beneath the cherry blossoms
            while the moon is full.
        '''
    // compatible with JSON5
    key: 0xDEADCAFE
    // or use JSON
    "old-school": 1337
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

## Objection!

New programming languages and formats get created every day and never reach the light of night due to a lack of usage.
Basically, it's hard to get people to change to new things.

However, in the case of JSONH, this is not a problem. Unlike programming languages, which are most useful when they have widespread adoption and an ecosystem of packages,
configuration and data formats like JSONH are useful in personal projects, oblivious to common usage. Use the format that's right for you.