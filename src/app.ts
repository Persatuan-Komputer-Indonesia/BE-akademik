import express, { type Application, type Request, type Response } from "express";
import path from 'path'; // Tambahkan import ini
import cors from 'cors';
import otpRoutes from "./routes/otp.route";

const app: Application = express();

app.set('trust proxy', 1);

app.use(express.json());
app.use(cors()); 

app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.get('/', (_req: Request, res: Response) => {
    res.status(200).json({
        message: "Selamat datang di API Project Akademik",
        status: "Active"
    });
});

app.use('/otp', otpRoutes);

export default app;