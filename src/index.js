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

const Student = new mongoose.model("Student",studentSchema);   //* (modelName, schemaName)
//! NOTE : the model name in MongoDB will be in plural form, for this case it will be "students" not "Student"

//*     CRUD Operation 

const setData = async () => {
    try {
        const std1 = new Student({
            roll : 3,
            name : "XYZ",
            marks : 74
        });

        const std2 = new Student({
            roll : 4,
            name : "ABC",
            marks : 84
        });

        const std3 = new Student({
            roll : 5,
            name : "PQR",
            marks : 79
        });
        //! for single data
        //* const res = await std1.save();

        //! for multiple data

       // const res = await Student.insertMany([std1,std2,std3]);
       // console.log(res);
    } catch (error) {
        console.log(error);
    }
}

setData();

//! Read / Fetch data from DB

const getData = async () => {
    //! get all the data from DB
    // const result = await Student.find();

    //! filtering data
    //const result = await Student.find({roll : 2});


    //! filtering field
    //const result = await Student.find({roll : 1}).select({name :1, _id : 0})

    //? find().select(fieldName : 1 ) - shows the field
    //? find.select(fieldName : 0) - exclude the field

    //! filtering using realtion operator gt, eq, gte, lt, lte, in, ne, nin

    //const result = await Student.find({marks : {$gt: 80}}).select({name : 1, _id : 0});
    //? Here result will consist the names of those students whose marks are > 80
    
    //! filtering using logical operator $and, $or, $not, $nor

    const result = await Student.find({$and : [{marks : {$gt : 80}},{present : true}]}).select({name : 1, _id : 0})
    //? Here the result will consist the names of those students who have marks > 80 and are present
    
    console.log(result);
}


getData();