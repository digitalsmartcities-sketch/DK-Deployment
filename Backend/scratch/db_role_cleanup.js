import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

async function cleanup() {
    try {
        await mongoose.connect(process.env.DB_URL + '/DSCH');
        const db = mongoose.connection.db;
        
        // 1. Convert role: 'ADMIN' to role: 'admin'
        const r1 = await db.collection('Accounts').updateMany(
            { role: 'ADMIN' },
            { $set: { role: 'admin' } }
        );
        console.log(`Converted ${r1.modifiedCount} ADMIN roles to admin.`);

        // 2. Rename Role (uppercase) to role (lowercase) if it exists
        const r2 = await db.collection('Accounts').updateMany(
            { Role: { $exists: true } },
            { $rename: { Role: 'role' } }
        );
        console.log(`Renamed uppercase Role field in ${r2.modifiedCount} documents.`);

        process.exit(0);
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

cleanup();
