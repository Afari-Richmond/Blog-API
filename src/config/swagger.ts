

import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Blog API",
            version: "1.0.0",
            description: "A simple Blog API",
        },
        servers: [ { url: "http://localhost:3000" } ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                },
            },
        }
    },
    apis: ["./src/routes/*.ts", "./src/models/*.ts"],
}

const swaggerspec = swaggerJsdoc(options);

export default swaggerspec;