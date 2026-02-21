// 1. WAJIB DI PALING ATAS: Paksa baca file .env sebelum yang lain jalan
import 'dotenv/config'; 

import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/prisma';

// 2. Ambil URL dari environment
const connectionString = process.env.DATABASE_URL;

// Debugging: Biar kita yakin URL-nya nggak undefined lagi
console.log("🔌 URL DB yang dibaca:", connectionString ? "BERHASIL KEBACA" : "KOSONG/UNDEFINED!");

// Cegah aplikasi jalan kalau URL-nya kosong
if (!connectionString) {
    throw new Error("DATABASE_URL tidak ditemukan! Cek file .env kamu.");
}

// 3. Setup Pool dengan SSL (Wajib untuk db.prisma.io)
const pool = new Pool({ 
    connectionString,
    ssl: {
        rejectUnauthorized: false
    }
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ 
    adapter, 
    log: ['query', 'info', 'warn', 'error'] 
});

export default prisma;