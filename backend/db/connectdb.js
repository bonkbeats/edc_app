const mongoose =  require('mongoose')

//const mongoURI = process.env.MONGO_URI;


const connectDB = (url) => {
 
mongoose.connect(url, {  })
.then(() => {
    console.log('MongoDB connected successfully!');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

 }
 
 module.exports = connectDB
 