import express, { type Application, type Request, type Response } from "express";
import path from 'path';
import cors from 'cors';
import lessonRouter from './routes/lesson.route';
import jurusanRouter from './routes/jurusan.route'; // <--- 1. JANGAN LUPA IMPORT INI

const app: Application = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

// --- PERBAIKAN DISINI ---

// 2. Tambahkan garis miring '/' di depan
app.use('/api/lessons', lessonRouter); 

// 3. Tambahkan Route Jurusan supaya bisa di-POST
app.use('/api/jurusan', jurusanRouter); 

// ------------------------

app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        message: "Selamat datang di API Project Akademik",
        status: "Active"
    });
});

export default app;