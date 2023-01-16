//! Mongoose is an ODM (Object Data Modeling library for MongoDB & Node.JS)
//? Simply. it provides connection between them

const mongoose = require('mongoose');

const url = "mongodb://127.0.0.1:27017/students";       //*URL for the DB/DbName

mongoose.set('strictQuery', true);
mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{console.log("Connection successful");}).catch((err)=>{
    console.log(err);
})

//! SCHEMA
//? It defines the structure of the document, default values, validations etc.
//* below basically we are defining how each object will look in our table.

const studentSchema = mongoose.Schema({
    //* field : Datatype
    roll : {
        type : Number,
        required : true         //* Mandatory
    },
    name : String,
    marks : Number,
    present : {
        type : Boolean,
        default : false         //* default value
    }
});

//! MODEL
//? Model is the basically the table in RDBMS, now we have Schema we will create Model

const studentModel = new mongoose.model("Student",studentSchema);   //* (modelName, schemaName)
//! NOTE : the model name in MongoDB will be in plural form, for this case it will be "students" not "Student"

//*     CRUD Operation 