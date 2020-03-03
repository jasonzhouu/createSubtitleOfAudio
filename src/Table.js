import addExportJsonEvent from './addExportJsonEvent.js'

/*
 * 作用：创建表格
 * @param timeSlice: 表格数据
 * @public method show(): 创建表格
 * @public method refresh(): 刷新表格
 * @private method addTable(): 创建表格
 * @private method addRow(): 添加一行表格
 * @private method addEvent(): 给表格添加事件
 */
export default function Table(audioWave, timeSlice){
    // 这里的timeSlice是对外面的timeSlice的引用，当外部的timeSlice发生任何更改，这里的timeSlice也会相应改变
    // timeSlice 处于下面的函数的闭包

    // 下面的方法都是共有方法，外部可以直接调用
    this.show = function() {
        addTable()
        addExportJsonEvent(timeSlice)
    }

    this.refresh = function() {
        $("#timeSliceTable table tbody").html('')
        addTable()
    }

    // 下面的都是私有方法，外部无法直接调用
    function addTable() {
        timeSlice.get().forEach((element, index) => {
            addRow(element, index)
        })
    }

    function addRow(slice, index) {
        var newRow = $('<tr></tr>').append(
            $("<th></th>").html(index)
        ).append(
            $("<td></td>").html(
                decreaseNumberAccuracy(slice.start)
                )
        ).append(
            $("<td></td>").html(
                decreaseNumberAccuracy(slice.end)
                )
        ).append(
            $('<td contenteditable="true"></td>').html(slice.note)
        )
        addEvent(newRow, index)
        $("#timeSliceTable table tbody").append(newRow)
    }
    
    function decreaseNumberAccuracy(num) {
        if (num == null || num == undefined) {
            return 0
        } else if(typeof(num) == 'number') {
            return num.toFixed(1)
        }
    }

    function addEvent(row, index) {
        var whetherLastRow = (index == (timeSlice.get().length -1))
        if (whetherLastRow) {
            addEventToLastRow(row)
        } else {
            addEventToFormerRow(row)
        }
        addChangeNoteEvent(row, index)
    }

    function addEventToFormerRow (row) {
        row.children('td:lt(2)').click(function(){
            var currentTime = parseFloat(
                $(this).html()
            )
            audioWave.play(currentTime)
        })
    }

    function addEventToLastRow(row) {
        let lastSlice = timeSlice.getLastSlice()
        row.children('td').eq(0).click(function(){
            let startTime = audioWave.getCurrentTime()
            // 显示时间精确到小数点后2位数，内存中的数据仍然保留最大的精确度
            $(this).html(startTime.toFixed(1))
            lastSlice.start = startTime
        })
        row.children('td').eq(1).click(function(){
            let endTime = audioWave.getCurrentTime()
            $(this).html(endTime.toFixed(1))
            lastSlice.end = endTime
        })
        row.addClass('editableRow')
    }
    
    function addChangeNoteEvent(row, index) {
        row.children('td').last().keyup(function() {
            let note = $(this).html()
            timeSlice.changeNote(index, note)
        })
    }
}



