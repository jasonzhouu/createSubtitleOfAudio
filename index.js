import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'
import disableNewRowButton from './disableAddNewRow.js'


var timeSlice = initTimeSlice()

var table = new Table(timeSlice)

// add new row
$('#addSlice').click(function() {
    timeSlice.newSlice()
    table.refresh()
    disableNewRowButton(timeSlice)
})

// todo: 组织代码，存放在src目录