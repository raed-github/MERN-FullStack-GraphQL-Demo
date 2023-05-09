require('dotenv').config()
const express = require('express')
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose')
const cors=require('cors')


const app = express();

const port = process.env.PORT
const mongoURI = process.env.MONGO_URI

app.use(cors())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

mongoose.connect(mongoURI)
    .then(()=>{
        app.listen(port,()=>{
            console.log(`app is connected to db and running on port ${port}`)
        })
    }).catch((error)=>{
        console.log(error)
    })