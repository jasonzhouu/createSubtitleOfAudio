import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'

var timeSlice = initTimeSlice()

var table = new Table(timeSlice)

// add new row
$('#addSlice').click(function() {
    timeSlice.newSlice()
    table.refresh()
})