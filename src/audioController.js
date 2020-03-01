import wavesurfer from './wavesurfer.js'

export default function addAudioController() {
    $("#play").on("click", function () {
        wavesurfer.playPause();
    });
    $("#forward").click(function () {
        wavesurfer.skip(5);
    });
    $("#backward").click(function () {
        wavesurfer.skip(-5);
    });
}

