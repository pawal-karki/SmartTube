# SmartTube

A free, open-source media client for Android TV and TV boxes, with a YouTube TV style interface.

Based on [yuliskov/SmartTube](https://github.com/yuliskov/SmartTube).

![Home](images/ui-home.png)

## What's different

**Interface**
- Sidebar collapses to an icon rail and expands with labels and a white selection pill
- Top bar with mic and search pill that follows the sidebar
- Borderless cards with rounded 16:9 thumbnails, white focus ring, no zoom or shadow
- Round channel cards with avatar, name, handle and subscribers
- Grey chips for `4K` and `Auto-dubbed` before the views line
- Skeleton rows while a section loads instead of a spinner
- Roboto font, YouTube branding in the `stbeta` build
- In-app on-screen keyboard for search, with a suggestions column

![Sidebar](images/ui-sidebar.png)

**Playback**
- Player engine warms up 1.5 s after launch (was 10 s)
- Playback info is prefetched for the focused home card, so opening it starts faster
- Default quality capped at 1080p for a faster start
- Suggestions load after the player is ready, 1.5 s start buffer

## Build

Requires JDK 17 and the Android SDK.

```bash
git clone --recurse-submodules <this repo>
cd SmartTube
export JAVA_HOME=/path/to/jdk17
sh ./gradlew :smarttubetv:assembleStbetaRelease
```

APKs are written to `smarttubetv/build/outputs/apk/stbeta/release/`. Use the `arm64-v8a`, `armeabi-v7a`, `x86` or `universal` file that matches your device.

Release builds are signed with the debug key so they install over a debug build. Replace the signing config in `smarttubetv/build.gradle` before distributing.

`patches/` holds changes for the `MediaServiceCore` submodule. Apply them inside the submodule.

## License

[MIT](LICENSE), same as upstream. See the [original project](https://github.com/yuliskov/SmartTube) for FAQ, supported devices and installation help.
