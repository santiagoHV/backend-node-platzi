const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: "API Documentation",
            version: "1.0.0",
            description: "Documentation for your API"
        },
        basePath: "/"
    },
    apis: ["./api/components/**/network.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;