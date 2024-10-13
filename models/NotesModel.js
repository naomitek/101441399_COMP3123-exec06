const mongoose = require('mongoose');

// TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDIUM)
//      - dateAdded
//      - dateUpdated

const noteSchema = new mongoose.Schema({
    noteTitle: {
        type: String,
        required: true
    },
    noteDescription: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        enum: ['HIGH', 'LOW', 'MEDIUM'],
        required: true
    },
    dateAdded: {
        type: Date,
        default: Date.now
    },
    dateUpdated: {
        type: Date,
        default: Date.now // Default to the date the note was created
    }
});

// Middleware to update dateUpdated before saving
noteSchema.pre('save', function (next) {
    this.dateUpdated = Date.now(); // Update dateUpdated to the current date
    next();
});

// Export the Note model
const Note = mongoose.model('Note', noteSchema);
module.exports = Note;