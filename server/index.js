const dotenv = require('dotenv')
dotenv.config()

const express  = require('express')
const cors  = require('cors')
const bodyParser  = require('body-parser')
const app = express()


const routes = require('./routes/routes')
const Connect = require('./config/dbconnect')


const port = process.env.PORT || 4000;


app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

Connect(process.env.MONGO_DB_URL);

app.use('/api/',routes);


app.listen(port,()=>{
    console.log("Listening to ", port);
})