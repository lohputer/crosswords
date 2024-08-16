const mongoose = require('mongoose');

const CrosswordSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    _creator : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    words : [String],
    hints: [String],
    title : String,
    desc : String,
    layout: [[]],
})

const CrosswordSolveSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    secondsSpent: Number,
    crossword: { type: mongoose.Schema.Types.ObjectId, ref: 'Crossword' },
    currLayout: [[]],
    crosswordPlayer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const UserSchema = new mongoose.Schema({
    _id     : mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdCosswords: [{type: mongoose.Schema.Types.ObjectId, ref: "Crossword"}],
    solvedCrosswords: [{type: mongoose.Schema.Types.ObjectId, ref: "CrosswordSolve"}],
    dateCreated: Date,
    bio: {
        type: String,
        default: "Hi!"
    },
    email: String,
});

module.exports = {
    CrosswordSolve: mongoose.model('CrosswordSolve', CrosswordSolveSchema),
    Crossword: mongoose.model('Crossword', CrosswordSchema),
    User: mongoose.model('User', UserSchema)
}