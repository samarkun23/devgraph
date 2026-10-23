import "dotenv/config";
import { buildApp } from "./app.js";
import cors from "@fastify/cors";

const app = buildApp();

const start = async () => {
    try {
        const port = Number(process.env.PORT) || 5000;

        await app.register(cors, {
            origin: "http://localhost:3000",
        });

        await app.listen({
            port,
            host: "127.0.0.1",
        });
    } catch (error) {
        app.log.error(error);
        process.exit(1);
    }
};

start();
