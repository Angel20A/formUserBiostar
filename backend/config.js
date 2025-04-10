export const config = {
    application: {
        cors: {
            server: {
                origin: "127.0.0.1:8443", //https://
                credentials: true,
                methods: ["GET", "POST", "PUT", "DELETE"],
            }
        }
    }
}