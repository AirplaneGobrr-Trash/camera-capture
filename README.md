# @airplanegobrr/camera-capture

This is a "fork" of a fork Please see below

The base of the code is bassed off of [cancerberoSgx/camera-capture](https://github.com/cancerberoSgx/camera-capture)

There is a fork that adds a "getDevicesList" from [zjffun/camera-capture#feat-get-devices-list](https://github.com/zjffun/camera-capture/tree/feat-get-devices-list)

This repo was made because the format of BOTH the above is... messy.

Both projects are dead! I plan to use this as this is supper nice, not sure why its not used/updated more.

A rewrite will happen as I want to make a better API/layout of everything, and CJS.

Once this is rewritten I'll change the package name so its not stupid and drops the `@airplanegobrr/` part

# Using

1. Install.

`pnpm add @airplanegobrr/camera-capture`

2. Use it.

```js
const { VideoCapture } = require("@airplanegobrr/camera-capture");

(async () => {

    const videoCapture = new VideoCapture({
        video: true,
        mime: "image/png",
    });
    await videoCapture.initialize();

    const devicesList = await videoCapture.getDevicesList();
    const videoDevices = devicesList.filter(v => v.kind === "videoinput")
    
    await videoCapture.startCamera({
        video: {
            deviceId: videoDevices[0].deviceId
        }
    })

    let frame = await videoCapture.readFrame() // Extracts frame one by one. (AKA, Take picture)
    console.log(frame)
})();
```

# If building

If your building this make sure to copy `src/assets` to `dist/src/assets`

## TODO / Road map

### performance
- [ ] performance 2: sharing a webrtc session between node and browser, this could imply not having to read/write image data at all just consuming a video stream ?
- [ ] ~~test if toDataUrl is faster than toBlob~~ [See here](https://stackoverflow.com/a/59025746)
- [ ] perhaps is faster to do the capture loop all together inside the DOM, instead calling evaluate() on each iteration?
- [ ] performance 1 post frames to a node.js server, possibly using websockets

## misc

- [ ] supposedly qt supports webrtc natively - oerhaos a demo connecting pptr and qt desktop app ? 
- [ ] probably for frames a generator / or observable is more appropriate than even listeners.
- [ ] CLI
- [ ] demo - stream local camera capture on a server web page.
- [ ] stopVideo refactor TODOs
- [ ] ~~a free port number resolver - try until one is available (conection successful)~~ [get-port](https://www.npmjs.com/package/get-port)
- [ ] pause/resume / start/stop should work for recording too. 
- [ ] do we really need to serialize constrains ? 
- [ ] performance tests (fps raw image data and encoded images)
- [ ] video recording formats other than webm?
- [ ] video recording constraints - size - 
- [ ] audio recording only API
- [ ] record desktop ? ~~possible ?~~ - [Screen_Capture_API](https://developer.mozilla.org/en-US/docs/Web/API/Screen_Capture_API)
- [ ] desktop screenshot only API
- [ ] browser screenshot only API
- [ ] webcam screenshot only API
- [ ] geo location (get the coords) ? (need https? - Should work as the webcam also need HTTPS)
- [ ] change video size dynamically ?
- [x] investigate why/how to pass the buffer / array buffer view  directly without transforming it to number[] / and array buffer views
  -  using Buffer (TextEncoder/TextDecoder to serialize the data as a single char-per-byte string (using windows-1252 encoding) and deserialize it in Node on the other side which is fast (since passing strings is much faster).
- [x] check c.addFrameListener() with encoded images
- [x] real world example: native app
- [x] encode in browser supported formats (png, jpg)
- [x] c.readFrame() users read manually instead listener - loop controlled by users.
- [x] listener API managed  loop
- [x] API docs
- [x] add api docs descriptions to class, options and
- [x] record capture using dom api (output is mp4/avi video)

### low priority
- [ ] research how fast/slow is painting canvas pixel by pixel from image data than showImage in node-gui
- [ ] TODO: support fps control like in opencv

## ideas
- use a desktop GUI library like node-gui to render a node.js canvas  - target users: people using jsdom / node canvas for testing canvas based apps headless have the possibility to render it (not just a screenshot but as actual stream of frames natively in the desktop)idea for for a project node-gui : a jsdom-node-canvas renderer: use jsdom+node-canvas to real-time render the canvas element in a view.