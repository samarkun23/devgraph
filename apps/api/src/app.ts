
import Fastify from "fastify";

export function buildApp() {
    const app = Fastify({
        logger: true,
    });

    app.get("/", async () => {
        return {
            message: "Devgraph API is running 🚀",
        };
    });

    app.get("/health", async () => {
        return {
            status: "ok",
        };
    });

    return app;
}
