# LeetCode Workspace Generator

```
yarn install
yarn build:scripts
yarn new
yarn start
```

- Creates a template file for running code is TS node env
- Automatically pulls in typescript code snippet
- Automatically creates readme from problem description
- Interactive file picker for running examples
- Nodemon watch support

Output File structure:

```
src/
  __template/
  ${id}_${slug}/
    index.ts
    README.md
  ${id2}_${slug2}/
    index.ts
    README.md
  ...
```
