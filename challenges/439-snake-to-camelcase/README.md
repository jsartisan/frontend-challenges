Implement a utility function that converts a `snake_case` string into `camelCase`.

### Requirements

```ts
function snakeToCamel(input: string): string
```

* Replace each underscore (`_`) followed by a character with the **uppercase** version of that character.
* Remove all underscores.
* Preserve all other characters (including digits).
* Leading or trailing underscores should be ignored (not produce uppercase).
* If the input is already in `camelCase`, return it unchanged.
* An empty string should return an empty string.

### Examples

| Input             | Output        |
|-------------------|---------------|
| `"hello_world"`   | `"helloWorld"`|
| `"convert_me_now"`| `"convertMeNow"`|
| `"_private_var"`  | `"privateVar"`|
| `"alreadyCamel"`  | `"alreadyCamel"`|
