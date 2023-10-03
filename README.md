<p align=center>
<img alt="Logo" src="src-tauri/icons/icon.svg" width=128 height=128>
</p>

<h1 align=center>InkSchedule 3</h1>

<p align=center>So good, we just skipped to the 3rd one.</p>

## About
Small [Tauri](https://tauri.app/) app that shows current Splatoon 3 map schedule in your taskbar. Uses [splatoon3.ink](https://splatoon3.ink) API to get current schedule data.

In cases there are any bugs or missing features and it hasn't been issue made for it yet, make one if you can. Pull requests are welcome.

<p align=center>
<img alt="App preview" src=".github/preview.webp">
</p>

## Development
To build the app you need Tauri set up with [pnpm](https://pnpm.io/) and [Rust](https://tauri.app/v1/guides/getting-started/prerequisites).

### Install dependencies
```
pnpm install
```

### Run dev
```
pnpm tauri dev
```

### Release build
```
pnpm tauri build
```

Before committing make sure your code is formatted.


