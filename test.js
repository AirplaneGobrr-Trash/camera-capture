const { VideoCapture } = require("./dist/src/index");

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