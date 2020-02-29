import initTimeSlice from './initTimeSlice.js'
import Table from './Table.js'

var timeSlice = initTimeSlice()

new Table(timeSlice.data)