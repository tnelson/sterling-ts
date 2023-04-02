# Sterling Testing Notes

## Jest Configuration

Configuration was difficult, and the file is still rather messy. See comments within `jest.config.cjs`. 

The biggest issue has been ESM vs. CJS. 

## Default imports and modules that support both ESM and CJS

Jest won't always handle these well if the package has different entry points depending on whether the caller uses ESM or CJS. Jest (at time of writing) won't look at the `module` field of `package.json` for these packages, which defines the ESM entry point. This can be patched via a `moduleNameMapper` in Jest configuration, but because this doesn't always work well I've just changed Sterling to use named imports only in some situations (e.g., importing `produce` from `immer`).

Not all packages will allow this switch away from default exports, however. E.g., `react-monaco-editor` explicitly _doesn't_ export the `MonacoEditor` clsass component except as default.



