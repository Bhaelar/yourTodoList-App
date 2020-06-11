const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ListSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    task: {
        type: String,
        required: true
    }, 
    startTime: {
        type: Date,
        default: Date.now
    },
    endTime: {
        type: Date
    }
});

module.exports = List = mongoose.model('list', ListSchema);