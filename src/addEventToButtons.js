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

function addEventToButtons(audioWave, timeSlice, table) {

    addEventToAudioController(audioWave)
    addNewRowEvent(timeSlice, table)
}

var buttonList = [
    'play',
    'forward',
    'backward',
    'addSlice'
]

function clearEventToButtons() {
    buttonList.forEach(element => {
        $('#'+element).off('click')
    })
}


export {
    addEventToButtons,
    clearEventToButtons
}