require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());

//connectdb
const connectDB = require('./db/connectdb')
const { auth, authorizeRoles } = require('./middleware/authentication');



//routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin')
const publicEventRouter = require('./routes/public_event'); // Import public_event router
const path = require('path');





// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.json());
// extra packages

// routes
app.use('/api/v1/auth',authRouter)
// app.use('/api/v1/jobs', authenticateUser, jobsRouter);
app.use('/api/v1/user/userdashboard',auth, authorizeRoles('user'),  userRouter);
app.use('/api/v1/user/admindashboard',auth, authorizeRoles('admin'), adminRouter );
app.use('/api/v1/publicevent', publicEventRouter); // Mount public_event router
app.use('/images', express.static(path.join(__dirname, 'public/images'))
);
app.use('/images', (req, res, next) => {
  // Log each request made to the /public route
 
  next(); // Move to the next middleware (static file serving)
});


 app.use(notFoundMiddleware);
 app.use(errorHandlerMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
  try {
   await connectDB(process.env.MONGO_URI)
    app.listen(port,'0.0.0.0', () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
