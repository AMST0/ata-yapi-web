import { neon, NeonQueryFunction } from '@neondatabase/serverless';
import { drizzle, NeonHttpDatabase } from 'drizzle-orm/neon-http';

// Lazy database connection - only connects when needed
let db: NeonHttpDatabase | null = null;
let sql: NeonQueryFunction<false, false> | null = null;

export function getDb() {
    if (!db) {
        if (!process.env.DATABASE_URL) {
            throw new Error('DATABASE_URL environment variable is not set');
        }
        sql = neon(process.env.DATABASE_URL);
        db = drizzle(sql);
    }
    return db;
}
