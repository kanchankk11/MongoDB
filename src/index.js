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
        required : true ,   //* Mandatory
        unique : true        //PK
    },
    name : {
        type : String,
        required : true,
        trim : true         //* trims extra spaces
        //? Other validators are - lowercase, uppercase, match, minlength, maxlength, enum
    },
    marks : {
        type : Number,
        validate(value){    //* Custom validation
            if(value < 0){
                throw new Error("Marks cannot be negative")
            }
        }
    },
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
            roll : 6,
            name : "RST",
            marks : 65
        });

        const std2 = new Student({
            roll : 7,
            name : "UVW",
            marks : 89
        });

        const std3 = new Student({
            roll : 2,
            name : "BCD",
            marks : 72
        });
        //! for single data
        //* const res = await std1.save();

        //! for multiple data

        const res = await Student.insertMany([std1,std2,std3]);
       console.log(res);
    } catch (error) {
        console.log(error);
    }
}

//setData();        //* Calling setData() method

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

    //const result = await Student.find({$and : [{marks : {$gt : 80}},{present : true}]}).select({name : 1, _id : 0})
    //? Here the result will consist the names of those students who have marks > 80 and are present
    

    //! Counting no. of records
    //const result = await Student.find({marks : {$gt: 80}}).countDocuments();
    //! NOTE - .count() method is deprecated

    //! Sorting the fetched result
    const result = await Student.find({marks : {$gt: 80}}).sort({name : 1});
    //? sort({field : value})  -> 1 for ascending, -1 for descending

    
    console.log(result);
}

getData();      //* calling getData() method

//! Updating data
const updateData = async (rollNo) => {
    try {
        const result = await Student.updateOne({roll : rollNo}, {
            $set : {present : true}
        });

        console.log(result);
    } catch (error) {
        console.log(error);
    }
}

//updateData(2);       // calling updateData() method

//! Deleting data
const deleteData = async (rollNo) => {
    try {
        const result = await Student.deleteOne({roll : rollNo})
        console.log(result);
    } catch (error) {
        console.log(error);
    }
}
//deleteData(2);