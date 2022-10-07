const options = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: 'Gods API'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    }
  },
  apis: ['./routes/gods.js']
}

module.exports = options;
