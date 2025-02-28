import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false,
        },
    },
});

console.log("🔗  Connected to DB:", process.env.DATABASE_URL);


export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("✅  Database connection successful");
    } catch (error) {
        console.error("❌  Database connection error:", error.message);
        process.exit(1);
    }
};


