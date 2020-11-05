const modelParams = {
    flipHorizontal: true,   // flip e.g for video 
    imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
    maxNumBoxes: 1,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.85,    // confidence threshold for predictions.
}

navigator.getUserMedia = navigator.getUserMedia
    || navigator.webkitGetUserMedia
    || navigator.mozGetUserMedia
    || navigator.msGetUserMedia;

const video = document.querySelector("#video");
const audio = document.querySelector("#audio");
let model;

handTrack.startVideo(video).then(status => {
    if (status) {
        navigator.getUserMedia({ video: {} }, stream => {
            video.srcObject = stream;
            setInterval(runDetection, 250);
        }, err => console.log(err))
    }
})

function runDetection() {
    model.detect(video).then(predictions => {
        if (predictions.length !== 0) {
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            if (y > 150) {
                if (x < 250) {
                    audio.src = "a-chord.mp3";
                } else if (x > 250 && x < 350) {
                    audio.src = "b-chord.mp3";
                } else if (x > 350 && x < 450) {
                    audio.src = "c-chord.mp3";
                } else if (x > 450) {
                    audio.src = "e-chord.mp3";
                }
            }
            audio.play();
        }
    });
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});