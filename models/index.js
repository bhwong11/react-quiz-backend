const mongoose = require("mongoose");

const connectionString = 
    process.env.MONGODB_URI || "mongodb://localhost:27017/quizzes";
const configOptions ={
    useNewUrlParser:true,
    useUnifiedTopology:true,
};

mongoose.connect(connectionString,configOptions)
.then(
    ()=>console.log("MongoDB successfully connected...")
).catch(
    (err)=>console.log(`MongoDB Connection Error: ${err}`)
)

module.exports ={
    Quiz:require('./quiz'),
    User: require('./User'),
}