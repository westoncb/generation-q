# Change Log

All notable changes to the project are listed here.

For more information visit:
https://github.com/codesbiome/electron-react-webpack-typescript-2021

<br>

### v6.2.0

- Upgraded outdated deps:
  - `electron` upgraded to `^19.0.9`.
  - `@typescript-eslint` deps upgraded to `v5.30.7`.
  - `eslint` upgraded to `v8.20.0"`.
  - `fork-ts-checker-webpack-plugin` upgraded to `v7.2.13`.
  - `sass` upgraded to `v1.54.0`.
  - `sass-loader` upgraded to `v13.0.2`.
  - `webpack` upgraded to `v5.74.0`.

<br>

### v5.4.0

- 🎉 Electron core upgraded `v17.0.1`
- Upgraded outdated deps:
  - `@hot-loader/react-dom` upgraded to `v17.0.2`
  - `webpack` upgraded to `v5.69.1`
  - `typescript` upgraded to `v4.5.5`
  - `fork-ts-checker-webpack-plugin` upgraded to `v7.2.1`
  - `eslint` upgraded to `v8.9.0`
  - `css-loader` upgraded to `v6.6.0`
  - `@typescript-eslint` deps upgraded to `v5.12.1`

<br>

### v5.3.0

- Electron Window : File menu visible by default
- Upgraded outdated deps:
  - `electron` upgraded to `v16.0.7`
  - `@electron-forge` deps upgraded to `v6.0.0-beta.63`
  - `@types/node` upgraded to `v17.0.8`
  - `@typescript-eslint` deps upgraded to `v5.9.1`
  - `eslint` upgraded to `v8.6.0`
  - `typescript` upgraded to `v4.5.4`
  - `webpack` upgraded to `v5.66.0`

<br>

### v5.2.0

- 🎉 Electron core upgraded `v16`
- Upgraded outdated deps:
  - `@typescript-eslint` deps upgraded to `^5.5.0`
  - `eslint` upgraded to `^8.4.0`
  - `fork-ts-checker-webpack-plugin` upgraded to `^6.5.0`
  - `typescript` upgraded to `^4.5.2`
  - `webpack` upgraded to `^5.64.4`

<br>

### v5.1.0

- Fix: CSS/LESS `background-image` corrupted image file output.
- Updated: Webpack Rules to load assets using [Webpack v5 Asset Modules](https://webpack.js.org/guides/asset-modules/) instead of `file-loader`
- Fix: Typo in eslint alias map for `@components`
- Updated: Window (submodule) to latest version.
- Removed: Unused contextBridge api declaration.

<br>

### v5.0.0

- Overhauled: Application default layout and styling.
- Overhauled: Project files structure to separate 'main' & 'renderer' modules.
- Added: Custom Window Frame.
- Added: Custom Window Titlebar.
- Added: Custom Menus for Titlebar.
- Added: Window controls for `windows` & `mac` based platform.
- Renamed: `.eslintrc.json` to `.eslintrc`
- Upgraded Outdated deps :
  - `eslint` upgraded to `v8.2.0`
  - `css-loader` upgraded to `v6.5.1`
  - `@typescript-eslint` deps upgraded to `v5.3.0`
  - `webpack` upgraded to `v5.62.1`

<br>

### v4.2.0

- 🎉 Electron core upgraded to version `v15`
- Application colors updated for vue environment
- Fix eslint script
- Default window background color updated.
- Upgrade outdated deps:
  - `electron` upgraded to `^15.0.0`
  - `@electron-forge` deps upgraded to `6.0.0-beta.61`
  - `@types/node` upgraded to `^16.9.6`
  - `@typescript-eslint` deps upgraded to `^4.31.2`
  - `css-loader` upgraded to `^6.3.0`

<br>

### v4.1.0

- 🎉 Electron core upgraded to version `v14`
- Update application style properties
- Enable `nativeWindowOpen` for main window
- Remove `enableRemoteModule` from main window
- Fix : Hot reloading issue caused by `liveReload` in webpack devServer
- Added additional Webpack `devServer` configuration in `tools/forge/forge.config.js`
- Upgraded outdated deps:
  - `@electron-forge` deps upgraded to `6.0.0-beta.60`
  - `@typescript-eslint` deps upgraded to `^4.30.0`
  - `@types/react` upgraded to `^17.0.19`
  - `electron` upgraded to `^14.0.0`
  - `eslint-plugin-import` upgraded to `^2.24.2`
  - `eslint-plugin-react` upgraded to `^7.25.1`
  - `typescript` upgraded to `^4.4.2`
  - `webpack` upgraded to `^5.51.1`

<br>

### v4.0.1

- Update file-loader configuration for `assets` files
- Add packager configuration for app executable file details
- Update `README` with similar useful projects

<br>

### v4.0.0

- Overhaul for Application default layout and styling.
- Default window background color updated.
- Default `minimal` stats output for main & renderer process via webpack.
- Upgraded outdated deps :
  - `electron` upgraded to `^13.1.9`
  - `@electron-forge` packages upgraded to `6.0.0-beta.59`
  - `@typescript-eslint` packages upgraded to `^4.29.2`
  - `css-loader` upgraded to `^6.2.0`
  - `eslint` upgraded to `^7.32.0`
  - `fork-ts-checker-webpack-plugin` upgraded to `^6.3.2`
  - `less-loader` upgraded to `10.0.1`
  - `style-loader` upgraded to `^3.2.1`
  - `ts-loader` upgraded to `9.2.5`
  - `typescript` upgraded to `^4.3.5`
  - `webpack` upgraded to `^5.50.0`

<br>

### v3.1.0

- Electron core 🚀 upgraded to version 13.
- Expose Webpack Ports settings in forge configuration.
- Upgraded outdated packages :
  - `electron` upgraded to `^13.0.1`
  - `@typescript-eslint` packages upgraded to `^4.26.0`
  - `eslint` upgraded to `^7.27.0`
  - `css-loader` upgraded to `^5.2.6`
  - `ts-loader` upgraded to `8.3.0`
  - `typescript` upgraded to `^4.3.2`
  - `webpack` upgraded to `^5.38.1`
  - `fork-ts-checker-webpack-plugin` upgraded to `^6.2.10`

<br>

### v3.0.1

- Upgraded outdated packages
  - `electron'` upgraded to `^12.0.6`
  - `react` upgraded to `^17.0.2`
  - `react-dom` upgraded to `^17.0.2`
  - `css-loader` upgraded to `^5.2.4`
  - `eslint` upgraded to `^7.25.0`
  - `node-loader` upgraded to `2.0.0`
  - `ts-loader` upgraded to `8.2.0`
  - `typescript` upgraded to `^4.2.4`
  - `webpack` upgraded to `^5.36.2`

<br>

### v3.0.0

- Overhaul for Application component layout and styling.
- Project Files structure updated.
- Move static images to `assets` directory.
- Remove `.prettierignore` file.
- Use `.tsx` file extension for `preload` and `renderer` incase we need to use components.
- Introduce new `assets` webpack alias.
- Modify aliases usage for new project structure.
- Upgraded outdated dependencies
  - `electron` upgraded to `12.0.1`
  - `css-loader` upgraded to `5.1.3`
  - `eslint` upgraded to `7.22.0`
  - `less` upgraded to `4.1.1`
  - `less-loader` upgraded to `7.3.0`
  - `ts-loader` upgraded to `8.0.18`
  - `typescript` upgraded to `4.2.3`
  - `webpack` upgraded to `5.27.1`

<br>

### v2.1.0

- New Year 2021 🎉🎊
- Upgraded outdated dependencies
  - `electron` version upgraded to `11.1.1`
  - `react` version upgraded to `17.0.1`
  - `hot-loader` version upgraded to `17.0.1`
  - `webpack` version upgraded to `5.13.0`
  - `typescript` version upgraded to `4.1.3`
  - `ts-loader` version upgraded to `8.0.14`
  - `css-loader` version upgraded to `5.0.1`
  - `style-loader` version upgraded to `2.0.0`
  - `less` version upgraded to `4.1.0`

<br>

### v2.0.2

- Upgraded outdated dependencies
- `electron` version upgraded to `10.x`
- `typescript` version upgraded to `4.x`
- `less-loader` version upgraded to `7.x`

<br>

### v2.0.1

- Upgraded outdated dependencies

<br>

### v2.0.0

- Added electron window background color
- Devtools opening on startup is disabled
- Added `preload` script usage (preload.ts) 👍
- Moved webpack `aliases` to separate file
- Added new style & color changes to boilerplate layout
- Added prettier configuration files `.prettierrc` `.prettierignore`
- `contextIsolation` is enabled by default
- `nodeIntegration` `enableRemoteModule` `nodeIntegrationInWorker` `nodeIntegrationInSubFrames` are disabled default

<br>

### v1.0.0

- Upgrade package dependencies to latest
- Add hot module replacement (live reload)
- Add linting via ESLint
- Custom webpack configuration
- Custom forge configuration for package/bundle
- Add aliases for project paths
- Image loader to display images
