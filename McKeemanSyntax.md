```
jsonh
    whitespace element whitespace

element
    object
    array
    string
    number
    "true"
    "false"
    "null"

object
    "{" properties "}"
    properties

properties
    whitespace
    whitespace property
    whitespace property whitespace property_separator properties

property
    string whitespace ":" whitespace element

property_separator
    ","
    newline

array
    "[" items "]"

items
    ""
    whitespace element
    whitespace element item_separator items

item_separator
    ","
    newline

string
    double_quoted_string
    single_quoted_string
    multi_quoted_string
    quoteless_string

double_quoted_string
    '"' double_quoted_string_contents '"'

double_quoted_string_contents
    ""
    double_quoted_string_rune double_quoted_string_contents

double_quoted_string_rune
    rune - '"' - "\"
    "\" escape

single_quoted_string
    "'" single_quoted_string_contents "'"

single_quoted_string_contents
    ""
    single_quoted_string_rune single_quoted_string_contents

single_quoted_string_rune
    rune - "'" - "\"
    "\" escape

multi_quoted_string
    "'''" multi_single_quoted_string_contents "'''"  # same number of closing quotes as opening quotes
    '"""' multi_double_quoted_string_contents '"""'  # same number of closing quotes as opening quotes

multi_single_quoted_string_contents
    multi_single_quoted_string_rune
    multi_single_quoted_string_rune multi_single_quoted_string_contents

multi_single_quoted_string_rune
    rune - "'''"  # same number of closing quotes as opening quotes

multi_double_quoted_string_contents
    multi_double_quoted_string_rune
    multi_double_quoted_string_rune multi_double_quoted_string_contents

multi_double_quoted_string_rune
    rune - '"""'  # same number of closing quotes as opening quotes

quoteless_string
    quoteless_string_contents

quoteless_string_contents
    ""
    quoteless_string_rune quoteless_string_contents

quoteless_string_rune
    rune - "," - ":" - "[" - "]" - "{" - "}" - "/" - "#" - "\"
    "\" escape

escape
    "\"
    "b"
    "f"
    "n"
    "r"
    "t"
    "v"
    "0"
    "a"
    "e"
    "u" hex_digit hex_digit hex_digit hex_digit
    "U" hex_digit hex_digit hex_digit hex_digit hex_digit hex_digit hex_digit hex_digit
    "x" hex_digit hex_digit
    newline
    rune

rune
    '0000' . '10FFFF'

digit
    "0" . "9"

digits
    digit
    digit digits
    digit "_" digits

hex_digit
    digit
    "A" . "F"
    "a" . "f"

hex_digits
    hex_digit
    hex_digit hex_digits
    hex_digit "_" hex_digits

binary_digit
    "0" . "1"

binary_digits
    binary_digit
    binary_digit binary_digits
    binary_digit "_" binary_digits

number
    sign digits exponent
    sign digits fraction exponent
    sign fraction exponent
    hex_integer
    binary_integer
    octal_integer
    named_number

fraction
    "." digits
    "."

exponent
    ""
    "E" sign digits
    "e" sign digits

sign
    ""
    "+"
    "-"

hex_integer
    sign "0x" hex_digits
    sign "0X" hex_digits

binary_integer
    sign "0b" binary_digits
    sign "OB" binary_digits

octal_integer
    sign "0o" octal_digits
    sign "0O" octal_digits

named_number
    sign "Infinity"
    sign "infinity"
    sign "NaN"
    sign "nan"

newline
    '000A' # line feed (\n)
    '000D' # carriage return (\r)
    '000D' '000A' # carriage return + line feed (\r\n)
    '2028' # line separator
    '2029' # paragraph separator

whitespace
    ""
    comment
    newline
    '0009' # tab (\t)
    '000B' # vertical tab (\v)
    '000C' # form feed (\f)
    '0020' # space ( )
    '00A0' # non-breaking space
    'FEFF' # byte-order mark
    # Any character in the [Space Separator Unicode category](https://www.compart.com/en/unicode/category/Zs)

comment
    line_comment
    block_comment

line_comment
    "#" line_comment_contents
    "//" line_comment_contents

line_comment_contents
    ""
    line_comment_rune line_comment_contents

line_comment_rune
    rune - newline

block_comment
    "/*" block_comment_contents "*/"

block_comment_contents
    ""
    block_comment_rune block_comment_contents

block_comment_rune
    rune - "*/"
```