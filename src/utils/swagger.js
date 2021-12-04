const swaggerJsdoc = require("swagger-jsdoc");

module.exports = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Quantum dashboard api",
      version: "1.0.0",
      contact: {
        name: "Quantum",
      },
    },
  },
  apis: ["./api/controllers/*.js"],
});
