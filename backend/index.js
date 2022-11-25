const connectToMongo = require('./db');
const express = require('express')
var cors = require('cors') 
const app = express()
const port = 5000;

connectToMongo();

app.use(cors())
app.use(express.json());

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
  console.log(`Full Stack App running on port http://localhost:${port}`)
})