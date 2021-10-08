const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    questions: {
        type:[{
            correct: Boolean,
            question: String,
        }],
    },
    difficulty:{
        type:String,
        required: true,
    },
    score:{
        type:Number,
        default: 0,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    completed_date: {
        type: Date,
        default: Date.now,
      },
})

const Quiz = mongoose.model('Quiz',QuizSchema);

module.exports = Quiz;