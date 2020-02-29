export default function restoreFromElectronStore() {
    let timeSlice = []
    const store = new Store()
    
    timeSlice = store.get('xwz')
    if(timeSlice == undefined) {
        return []
    }
    
    // @todo: 把这部分抽离到单独的文件
    function addNewRow(currentSlice, index) {
        var newRow = $('<tr></tr>').append(
            $("<th></th>").html(index)
        ).append(
            $("<td></td>").html(currentSlice.start)
        ).append(
            $("<td></td>").html(currentSlice.end)
        ).append(
            $('<td contenteditable="true"></td>').html(currentSlice.note)
        )
        $("#timeSliceTable tbody").append(newRow)
    }

    function addEventToRow(currentRow) {
        currentRow.children('td').click(function(){
            
        })
    }

    timeSlice.forEach((currentSlice, index) => {
        addNewRow(currentSlice, index)
    });

    return timeSlice
}
