const express = require('express');
const app = express();
const cors = require('cors');

const port = process.env.PORT || 4000;

//internal
const routes = require('./routes')

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('something')
})

app.use('/api/users',routes.user);
app.use('/api/auth',routes.auth);
app.use('/api/quiz',routes.quiz);

app.listen(port,()=>console.log(`Server is running on port ${port}`))

