export default function restoreFromElectronStore() {
    let timeSlice = []
    const store = new Store()
    
    timeSlice = store.get('xwz')
    if(timeSlice == undefined) {
        return []
    }
    
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

    timeSlice.forEach((currentSlice, index) => {
        addNewRow(currentSlice, index)
    });

    return timeSlice
}
