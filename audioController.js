import {wavesurfer, setAudioController} from './wavesurfer.js'
import {currentSlice} from './timeSlice.js'

$("#start").click(function () {
    currentSlice.start = wavesurfer.getCurrentTime();
    $("#start + span").html(currentSlice.start)
})

$("#end").click(function () {
    currentSlice.end = wavesurfer.getCurrentTime();
    $("#end + span").html(currentSlice.end)
})

$("#audioController").on("click", function () {
    wavesurfer.playPause()
    setAudioController()
})