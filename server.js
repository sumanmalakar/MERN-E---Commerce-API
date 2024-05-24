import express from 'express'
import bodyParser from 'express'
import mongoose from 'mongoose';
import userRouter from './Routes/user.js'
import productRouter from './Routes/product.js'
import cartRouter from './Routes/cart.js'
import addressRouter from './Routes/address.js'
import paymentRouter from  './Routes/payment.js'
import cors from 'cors'
import { config } from 'dotenv';

const app = express();

app.use(bodyParser.json())

// .env steup
config({ path: ".env" }); 

app.use(cors({
  origin:true,
  methods:["POST","GET","DELETE","PUT"],
  credentials:true
}))



// user Router
app.use('/api/user',userRouter) 

// product Router
app.use('/api/product',productRouter);

// cart Router
app.use('/api/cart',cartRouter);

// address Router
app.use('/api/address',addressRouter);

// payment Router
app.use('/api/payment',paymentRouter)


mongoose
  .connect(
    process.env.Mongo_Url,
    {
      dbName: "MERN_Ecommerce",
    }
  )
  .then(() => console.log("MongoDB is Connected..!"))
  .catch((err) => console.log(err.message));

const port = 1000;
app.listen(port,()=>console.log(`Server is running on port ${port}`))