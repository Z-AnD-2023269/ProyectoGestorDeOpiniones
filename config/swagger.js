import { version } from "mongoose";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"

const swaggerOptions = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            title: "Sistema de Gestion de Opciones",
            version:"1.0.0",
            description: "API para gestionar publicaciones y opiniones de los usuarios",
            contact:{
                name: "Anderson Lopez",
                email: "alopez-2023269@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/gestionDeOpiniones/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/user/*.js",
        "./src/categorias/*.js",
        "./src/comentarios/*.js",
        "./src/publicaciones/*.js",
    ]
}

const swaggerDocs = swaggerJSDoc(swaggerOptions)

export { swaggerDocs, swaggerUi }