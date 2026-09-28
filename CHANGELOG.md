# Changelog

## 1.0.1 (2026-09-28)

- Standardize package documentation, preserve the API reference and upstream attribution, and add Stackline community links.
- Add focused npm discovery keywords and consistent repository metadata.
- Keep runtime behavior and dependency versions unchanged.
- Correct the pinned artifact-upload action commit while preserving the publish.yml workflow and Prod environment.

## 1.0.0

- Fork exit-on-epipe 1.0.1 under the `@stackline` scope; retain its Apache-2.0 license and API.
- A custom `bail` callback may return normally after handling EPIPE. The handled pipe error is no longer rethrown. Automatic stdout registration and unrelated error handling are preserved.
- Replace obsolete test dependencies with Mocha 12 and a locked, audited development install.
