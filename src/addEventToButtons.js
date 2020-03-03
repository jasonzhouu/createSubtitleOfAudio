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


export function addEventToButtons(audioWave, timeSlice, table) {

    // @todo: 切换文件时，清除注册的这2个事件
    addEventToAudioController(audioWave)
    addNewRowEvent(timeSlice, table)

    // addPopOver()
}

var buttonList = [
    'play',
    'forward',
    'backward',
    'addSlice'
]

export function clearEventToButtons() {
    buttonList.forEach(element => {
        $('#'+element).off('click')
    })
}