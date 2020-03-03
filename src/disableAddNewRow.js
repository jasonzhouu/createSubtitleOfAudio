// 当前行没有完成，不能点击添加新行

function isComplete(slice) {
    if(slice.start == null
        || slice.end == null
        || slice.note == null
        || slice.note == "") {
            // 只要有一项没有填写，就是就没有完成
            return false;
        } else {
            return true;
        }
}

// 检测currentSlice的变化，如果还没填好，那么添加新行的按钮将不可用
export default function disableNewRowButton(lastRow) {
    if(!isComplete(lastRow)) {
        $("button#addSlice").prop("disabled", true); // https://stackoverflow.com/questions/15122526/disable-button-in-jquery
    } else {
        $("button#addSlice").prop("disabled", false); 
    }
}