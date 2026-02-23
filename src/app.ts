import express, { type Application, type Request, type Response } from "express";
import path from 'path'; // Tambahkan import ini
import cors from 'cors';
import { errorHandler } from "./middleware/errorHandler";

import userRoutes from "./routes/user.route";
import otpRoutes from "./routes/otp.route";
import registerRoutes from "./routes/register.route";
import lessonRoutes from "./routes/lesson.route";
import forgotPassRoutes from "./routes/forgotPass.route";

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
app.use('/register', registerRoutes);
app.use('/users', userRoutes);
app.use('/lessons', lessonRoutes);
app.use(forgotPassRoutes);


app.use(errorHandler);
export default app;