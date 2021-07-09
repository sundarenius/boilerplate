# Guidelines for all generated projects (and this one)
Should follow what is considered best convention and best practices.

Most well-known and respected projects follow these guidelines.

## Styling

PascalCase:      ->	components / classes / interfaces / types / enums / decorators / type parameters
camelCase:       ->	variables / parameters / functions / methods / properties / module aliases
CONSTANT_CASE:   ->	global constants, enum properties
kebab-case       -> JS/TS files / folders

Dont prefix files with a name if it's already included in a folder that has the name. A component should not have to worry about it's parent context,
from where it is imported or what part of the page it will be rendered to. It should be agnostic/isolated in that way.
Bad:
````
components
  header
    HeaderItems.tsx
````
Good:
````
components
  header
    Items.tsx
````

## Testing

Unit test files places next to original file as `x.spec.js`.

`spec` stands for `Specification`. `test` extension will also work but I like the concept of specification.

````
"Specification in terms of a test refer to the technical details of a given feature or application which must be fulfilled. The best way to think of this is as the technical specifications for a given unit of code to pass successfully."
````

## Folder structures
root
  src
    components (only UI building blocks "components", no logic files) # unit files placed next to each file.
    pages (synced with routes) # if routing is used
    state (can be named redux/vuex/store) # should be split into specific functionality modules.
    styles (global css files)
    router
    types (ts types or js constants)
    utils (helpers and such)
