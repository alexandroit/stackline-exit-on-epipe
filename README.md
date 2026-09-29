# @stackline/exit-on-epipe

> Cleanly exit process on EPIPE.

[![npm version](https://img.shields.io/npm/v/@stackline/exit-on-epipe.svg?style=flat-square)](https://www.npmjs.com/package/@stackline/exit-on-epipe)
[![license](https://img.shields.io/npm/l/@stackline/exit-on-epipe.svg?style=flat-square)](https://github.com/alexandroit/stackline-exit-on-epipe)
[![GitHub repository](https://img.shields.io/badge/GitHub-repository-181717?style=flat-square&logo=github)](https://github.com/alexandroit/stackline-exit-on-epipe)
[![Docs](https://img.shields.io/badge/docs-alexandro.net-0f766e?style=flat-square)](https://alexandro.net/docs/vanilla/exit-on-epipe/)
[![Reddit community](https://img.shields.io/badge/community-r%2FStackline-ff4500?style=flat-square&logo=reddit&logoColor=white)](https://www.reddit.com/r/Stackline/)

**[Documentation](https://alexandro.net/docs/vanilla/exit-on-epipe/)** | **[npm](https://www.npmjs.com/package/@stackline/exit-on-epipe)** | **[Issues](https://github.com/alexandroit/stackline-exit-on-epipe/issues)** | **[Repository](https://github.com/alexandroit/stackline-exit-on-epipe)**

**Current package version:** `1.0.2`

---

## Why this package?

Maintained fork of [exit-on-epipe](https://github.com/SheetJS/node-exit-on-epipe) 1.0.1. Apache-2.0; original copyright notices are retained.

A custom `bail` callback may return normally after handling EPIPE. The handled pipe error is no longer rethrown. Automatic stdout registration and unrelated error handling are preserved.

Requires Node.js 20.19 or newer. No runtime dependencies.

Cleanly exit on pipe errors in NodeJS scripts.

NOTE: The underlying problem was addressed in 8.x NodeJS versions but the fix
was not backported to 6.x and other versions of NodeJS.

These errors are common in pipelines that involve NodeJS scripts. For example,
take a simple script that prints out 10 lines:

```js
for(var i = 0; i < 10; ++i) console.log(i)
```

NodeJS will print an error message if the output is truncated:

```bash
$ cat t.js
for(var i = 0; i < 10; ++i) console.log(i)
$ node --version
v6.11.1
$ node t.js  | head -n 1
0
events.js:160
      throw er; // Unhandled 'error' event
      ^

Error: write EPIPE
    at exports._errnoException (util.js:1018:11)
    at WriteWrap.afterWrite (net.js:800:14)
```

The process will cleanly exit if you require the module:

```bash
$ cat t.js
require("@stackline/exit-on-epipe");
for(var i = 0; i < 10; ++i) console.log(i)
$ node t.js  | head -n 1
0
```

## Compatibility

| Item | Value |
| --- | --- |
| Package | `@stackline/exit-on-epipe@1.0.2` |
| Supported Node.js | `>=20.19.0` |
| Module entry | `./exit-on-epipe` (CommonJS) |
| Runtime dependencies | 0 direct dependencies |

## Installation

```bash
npm install @stackline/exit-on-epipe
```

With [npm](https://www.npmjs.com/package/@stackline/exit-on-epipe):

```bash
$ npm install @stackline/exit-on-epipe
```

## Usage

```js
require('@stackline/exit-on-epipe');
process.stdout.write('Hello\n');
```

For basic scripts, requiring at the top of the source file suffices:

```js
require('@stackline/exit-on-epipe');
// ... rest of source
```

For more advanced situations (e.g. handing other streams), call the module:

```js
var eoepipe = require('@stackline/exit-on-epipe');
eoepipe(stream);            // will exit process on an EPIPE error on stream
eoepipe(stream, handler);   // will call handler() instead of process.exit
```

## Security

Only EPIPE is handled by the configured bail callback. Unrelated stream errors retain their existing behavior.

## API Surface

### Interface

The module exports a single function (exposed as the variable `eoepipe`).

`eoepipe(stream, bail)` will attach an error handler to `stream` which will:

- call the `bail` function if the error `.code` is `"EPIPE"` or `.errno` is `32`
- defer to the default behavior if there are no other error handlers
- noop if the error is not `EPIPE` and if there are other error handlers

If the `bail` function is not specified, `process.exit` is used.

If the `stream` parameter is not specified, no action will be taken

### Notes

The script will not perform any action if `process` or `process.stdout` are not
available.  It is safe to use in a web page.

## Local Development

Clone the [repository](https://github.com/alexandroit/stackline-exit-on-epipe) and run the following commands from its root:

```bash
npm ci
npm test
npm run lint
```

The retained upstream development notes below include historical tooling; the commands above are the maintained package checks.

### Stackline development

Run `npm ci`, `npm test` and `npm run lint`. The checked-in upstream fixtures and focused regression suite run without downloading external test data.

## Release Checklist

1. Update the package version, lockfile, generated version fields, and changelog together.
2. Run the development checks above and audit both `npm audit` and `npm audit --omit=dev`.
3. Use the [GitHub publish workflow](https://github.com/alexandroit/stackline-exit-on-epipe/actions/workflows/publish.yml) with its `Prod` environment to publish the exact CI tarball.
4. Verify public npm bytes, package identity, provenance, and the immutable GitHub release evidence.

## License

[Apache-2.0](https://github.com/alexandroit/stackline-exit-on-epipe/blob/main/LICENSE). Original copyright notices and upstream attribution are retained.

Please consult the attached LICENSE file for details.  All rights not explicitly
granted by the Apache 2.0 license are reserved by the Original Author.

See [NOTICE](https://github.com/alexandroit/stackline-exit-on-epipe/blob/main/NOTICE) for retained attribution.

## Credits and original authors

- Original project: [node-exit-on-epipe](https://github.com/SheetJS/node-exit-on-epipe).
- sheetjs.
- Copyright (C) 2015-present   SheetJS LLC.
- Original work Copyright SheetJS; distributed under the Apache License 2.0.
- Stackline modifications Copyright 2026 Stackline contributors.
- Stackline maintenance: [Alexandro Paixao Marques](https://www.linkedin.com/in/aleinfo/) and [Stackline contributors](https://github.com/alexandroit).

Original copyright, license notices and contributor acknowledgements remain part of this distribution. Stackline maintenance does not replace authorship of the original work.

## Community and Links

- [Stackline website](https://alexandro.net/)
- [GitHub projects](https://github.com/alexandroit)
- [npm packages](https://www.npmjs.com/~alex360qc)
- [Reddit community — r/Stackline](https://www.reddit.com/r/Stackline/)
- [Maintainer LinkedIn](https://www.linkedin.com/in/aleinfo/)

Use this repository's issue tracker for reproducible bugs and feature requests. Join r/Stackline for examples, usage questions and release discussions.
