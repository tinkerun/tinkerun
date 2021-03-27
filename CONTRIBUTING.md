# CONTRIBUTING

Thanks for your interest in contributing to Tinkerun!

It's hard to do it alone, so bug reports, feature requests and other contributions are more than welcome!

## Running it locally

### Requirements

* [Node.js](https://nodejs.org/)(latest)
* [Yarn](https://yarnpkg.com/)(you can use npm instead)

> **Note:** On Windows, you might need to install Bash commands (e.g. via [git-scm](https://git-scm.com/downloads) or via [linux bash shell](https://www.howtogeek.com/249966/how-to-install-and-use-the-linux-bash-shell-on-windows-10/))

### How to run

```bash
git@github.com:tinkerun/tinkerun.git

cd tinkerun

yarn

yarn start
```

Alternatives to `yarn start`

```bash
# start the main process
yarn start:main

# start the renderer process
yarn start:renderer
```

### Other command

#### yarn rebuild

it will run `electron-rebuild -f -w node-pty` in `packages/tinkerun-main`

it's very useful when you got an error like
```shell
Error: The module `/packages/tinkerun-main/node_modules/node-pty/build/Release/pty.node`
was compiled against a different Node.js version using
NODE_MODULE_VERSION 83. This version of Node.js requires
NODE_MODULE_VERSION 85. Please try re-compiling or re-installing
```

#### yarn package

it will package the app depend on your OS


#### yarn release

upload the built app to github release
