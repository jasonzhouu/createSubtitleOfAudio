import disableNewRowButton from './disableAddNewRow.js'

function addEventToAudioController(audioWave) {
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

function addNewRowEvent(timeSlice, table) {
    // add new row
    $('#addSlice').click(function () {
        timeSlice.addNewSlice()
        table.refresh()
        disableNewRowButton(timeSlice.getLastSlice())
    })
}

let option = {
    content: "",
    trigger: "hover",
    placement: "auto",
}

function addPopOver() {
    $("#saveToJsonFile").popover({
        ...option,
        content: "将字幕保存到JSON文件",
    })
}


export default function addEventToButtons(audioWave, timeSlice, table) {


    addEventToAudioController(audioWave)
    addNewRowEvent(timeSlice, table)


    addPopOver()
}