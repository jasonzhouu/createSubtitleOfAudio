import {wavesurfer} from './wavesurfer.js'

// 一个数组，保存着所有句子的数据
var timeSlice = [];
var currentSlice = {};

function addNewSliceAndRow() {
    // 在timeSlice数组中添加新项
    addNewSlice();
    // 在DOM table中添加新的一行
    addNewRow();
}

// 一个对象，保存当前句子的数据。提交时，将其保存到timeSlice数组，并清空currentSlice对象。
function addNewSlice() {
    var temp = new Proxy({ // 如何监听 js 中变量的变化? https://www.zhihu.com/question/44724640/answer/117339055
        start: null,
        end: null,
        note: null
    }, {
        set: function(obj, prop, value) {
            if(prop == "start" || prop == "end") {
                if(typeof(value) == 'number') {
                    obj[prop] = value;
                }
            } else if (prop == "note") {
                obj[prop] = value;
            }
            disableNewRowButton()
            return true;
        }
    })
    timeSlice.push(temp);
    currentSlice = temp;
    // 新建行时，也要disable button
    disableNewRowButton();
}

function addNewRow() {
    var newRow = $('<tr class="editableRow"></tr>').append(
        $("<th></th>").html(timeSlice.length)
    ).append(
        $("<td></td>")
    ).append(
        $("<td></td>")
    ).append(
        $('<td contenteditable="true"></td>')
    )
    addEventToNewRow(newRow)
    $("#timeSliceTable tbody").append(newRow)
}
function addEventToNewRow(newRow) {
    newRow.children("td").eq(0).click(function () {
        currentSlice.start = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.start)
    })
    newRow.children("td").eq(1).click(function(){
        currentSlice.end = wavesurfer.getCurrentTime()
        $(this).html(currentSlice.end)
    })
    newRow.children("td[contenteditable=true]").keyup(function(){
        currentSlice.note = $(this).html()
    })
}

$("#addSlice").click(function(){
    // editableRow class的样式不一样。添加后，应该把这个样式去掉。
    $("#timeSliceTable tbody tr:last").removeClass("editableRow")
    $("#timeSliceTable tbody tr:last td").off("click")
    // 点击跳转到对应的时间播放
    $("#timeSliceTable tbody tr").click(function(){
        var startTime = parseFloat($(this).children("td").eq(0).html())
        var endTime = parseFloat($(this).children("td").eq(1).html())
        wavesurfer.play(startTime, endTime)
    })
    addNewSliceAndRow()
    saveTimeSliceToElectronStore()
})

function isCurrentRowIsFinished() {
    if(currentSlice.start == null
        || currentSlice.end == null
        || currentSlice.note == null
        || currentSlice.note == "") {
            // 只要有一项没有填写，就是就没有完成
            return false;
        } else {
            return true;
        }
}

// @todo: 检测currentSlice的变化，如果还没填好，那么添加新行的按钮将不可用
function disableNewRowButton() {
    if(!isCurrentRowIsFinished()) {
        $("button#addSlice").prop("disabled", true); // https://stackoverflow.com/questions/15122526/disable-button-in-jquery
    } else {
        $("button#addSlice").prop("disabled", false); 
    }
}

function saveTimeSliceToElectronStore() {
    console.log('save to json');
    const store = new Store()
    store.set('hello', 'world')
    console.log(store.get('hello'));
    
}

addNewSliceAndRow()


export {timeSlice}