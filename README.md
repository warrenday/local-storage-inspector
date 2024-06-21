<div align="center">
  <h1>Local Storage Inspector</h1>
  <h3>A browser extension that allows you to inspect and manage localStorage.</h3>
  <img alt="MIT License" src="https://img.shields.io/github/license/warrenday/local-storage-inspector" />
  <a href="https://github.com/sponsors/warrenday">
    <img alt="GitHub Sponsors" src="https://img.shields.io/github/sponsors/warrenday">
  </a>
  <br />
  <br />
</div>

![Application Preview](docs/main.png)

The extension is available for both Chrome and Firefox.

1. [Chrome Webstore](https://chromewebstore.google.com/detail/local-storage-inspector/pbfecmmdbppphcnmlmegkcdobpadegid?authuser=0&hl=en-GB)

2. Firefox coming very soon!

## Features

- View all items in localStorage
- Add new items
- Edit existing items
- Delete items

## Local Development

Install dependencies:

```bash
yarn
```

Run the development server:

```bash
yarn dev
```

## Bundle the extension

To bundle the extension for distribution, run:

```bash
yarn bundle
```

This will create two zip files for Chrome and Firefox.

## Contribute

PRs are welcome! The best way to do this is to first fork the repository, create a branch and open a pull request back to this repository.

If you want to add a large feature please first raise an issue to discuss. This avoids wasted effort.

## License

The MIT License (MIT)

Copyright (c) 2020 GraphQL Network Inspector authors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
