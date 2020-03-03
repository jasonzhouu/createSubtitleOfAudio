export default function addAudioController(audioWave) {
    $("#play").on("click", function () {
        audioWave.playPause();
    });
    $("#forward").click(function () {
        audioWave.skip(5);
    });
    $("#backward").click(function () {
        audioWave.skip(-5);
    });
}

