import { migrate } from 'drizzle-orm/postgres-js/migrator';
import config from '@/drizzle.config';
import { db, connection } from '@/db';

const startMiggration = async () =>{
    try{
        await migrate(db,{migrationsFolder:config.out!});
        console.log("[INFO] Migration completed successfully")
    } catch (error){
        console.error("[INFO] Migration failed",error);
    }finally{
        await connection.end();
    }
};

startMiggration();