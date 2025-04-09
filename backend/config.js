export const config = {
    application: {
        cors: {
            server: {
                origin: "https://127.0.0.1:8443",
                credentials: true,
                methods: ["GET", "POST", "PUT", "DELETE"],
            }
        }
    }
}