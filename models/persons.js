require('dotenv').config()
const mongoose = require('mongoose') 
mongoose.set('strictQuery', false) 

/*
- Connect to the uri, 
- Create a schema for the data 
- Create a Person mongoose model using the schema
- Create a Person object
- Save the object to the database and close the connection 
*/

// DO NOT SAVE YOUR PASSWORD TO GITHUB
const url = process.env.MONGODB_URL

mongoose
    .connect(url)
    .then(result => {
        console.log('Connected to MongoDB')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB:', error.message)
    })

const personSchema = new mongoose.Schema({
    name: String, 
    number: String
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id 
        delete returnedObject._v
    }
})

const Person = mongoose.model('Person', personSchema) 
console.log('Person object:', Person) 

module.exports = Person