<p align="center">
  <a href="//tinkerun.netlify.app/">
    <img alt="Tinkerun" src="https://user-images.githubusercontent.com/1612364/112719665-f4056e00-8f34-11eb-85b7-8fcc7dc509fc.png" width="100" style="max-width:100%;"/>
  </a>
</p>
<h1 align="center">Tinkerun</h1>

<p align="center">
  A new way of Running <a href="//github.com/laravel/tinker">Tinker</a>. 
  Simplify the Web Artisan's workflow.
  inspired by <a href="//tinkerwell.app">Tinkerwell</a>
</p>

<p align="center">
<img width="100%" alt="screenshot" src="https://user-images.githubusercontent.com/1612364/119233035-b8180f00-bb59-11eb-8922-05343231af20.png">
</p>

<p align="center">
<img width="100%" alt="Snippet Form" src="https://user-images.githubusercontent.com/1612364/119233015-a0d92180-bb59-11eb-95c2-3a6f0edb228d.png">
</p>

### Download links
[Github Releases](//github.com/tinkerun/tinkerun/releases)

🗒 If you are using Visual Studio Code, you may like <a href="//tinke.run/vscode">Tinkerun for Visual Studio Code</a>

### Features

- [x] **Connections**: Quick connect to your app either locally, in production or in docker container etc;
- [x] **Snippets**: Manage the code snippets you have ran;
- [x] **Editor**: Run your terminal code via editor;
- [x] **Output**: Focus on the results you really care that terminal return;
- [x] **[Snippet Form](https://github.com/tinkerun/tinkerun/wiki/Snippet-Form)**: Switch the editor to the form, so that you can modify your variable value via form, like an admin panel;
- [ ] **Dark mode**

## Tech Stack

* [Electron](https://www.electronjs.org/)
* [Lerna](https://lerna.js.org/) (Monorepo)

### Renderer

* [React](https://reactjs.org/)
* [jotai](https://github.com/pmndrs/jotai) (State manage)
* [Immer](https://immerjs.github.io/immer/)
* [Monaco Editor](https://microsoft.github.io/monaco-editor/)
* [Xterm.js](https://xtermjs.org/)
* [wouter](https://github.com/molefrog/wouter)
* [Evergreen](https://evergreen.segment.com/) (UI)
* [React Hook Form](https://react-hook-form.com/)
* [nanoid](https://zelark.github.io/nano-id-cc/)
* [React Intl](https://formatjs.io/docs/react-intl/)
* [Snowpack](https://www.snowpack.dev/) (build the renderer process code)

### Main

* [node-pty](https://github.com/microsoft/node-pty)
* [electron-store](https://github.com/sindresorhus/electron-store)
* [ncc](https://github.com/vercel/ncc) (build the main process code)

## Contributing to Tinkerun

See [CONTRIBUTING.md](./CONTRIBUTING.md)

## Ask for help

If the troubleshooting guides did not resolve the issue, please reach out to me by [filing an issue](https://github.com/tinkerun/tinkerun/issues/new), [starting a GitHub discussion](https://github.com/tinkerun/tinkerun/discussions/new)

## License

[MIT](./LICENSE)
