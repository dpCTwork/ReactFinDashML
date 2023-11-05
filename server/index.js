import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import productRoutes from './routes/product.js';
import Product from './models/Product.js';
import kpiRoutes from './routes/kpi.js';
import KPI from './models/KPI.js';
import transactionRoutes from './routes/transaction.js';
import Transaction from './models/Transaction.js';
import { kpis, products, transactions } from './data/data.js';


// Configurations
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy( { policy: "cross-origin" } ));
app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use('/kpi', kpiRoutes);
app.use('/product', productRoutes);
app.use('/transaction', transactionRoutes);

// Mongoose setup
const PORT = process.env.PORT || 3001;
mongoose
    .connect(process.env.MONGO_URL)
    .then(async () => {
        app.listen(PORT, () => console.log(`MongoDB connected. Server running on port: ${PORT}`));
        
        // Before populating database with seed data, drop current database to avoid duplicates
        // Add data one time only or as needed
        // await mongoose.connection.db.dropDatabase();
        // KPI.insertMany(kpis)
        // Product.insertMany(products)
        // Transaction.insertMany(transactions)
    })
    .catch((err) => {console.log(err)});
