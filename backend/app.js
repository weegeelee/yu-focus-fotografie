import express from "express";
import cors from "cors";
import fs from "node:fs/promises";
import path from "path";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from "./config/mongodb.js";
import albumRoutes from './routes/albumRoutes.js';
import photoRoutes from './routes/photoRoutes.js';
import authRoutes from './routes/authRoutes.js';
import cartRoutes from './routes/cartRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use('/albumimages', express.static(path.join(__dirname, 'upload/albumimages')));

app.use('/', albumRoutes);
app.use('/', photoRoutes);
app.use('/', authRoutes);
app.use('/', cartRoutes);
app.use('/', contactRoutes);


connectDB().then(() => {
    app.listen(port, () => console.log(`Server running on port ${port}`));
  });

