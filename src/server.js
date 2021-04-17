import Hapi from "@hapi/hapi"
import { routes as booksRoutes } from "./books/routes.js"
import { routes as helloRoutes } from "./hello/routes.js"

const NOT_FOUND = {
    method: ["*"],
    path: "/{any*}",
    handler: (request, h) => {
        const response = h.response({ message: "404 Error! Page Not Found!" })
        response.code(404)
        return response
    }
}

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== "production" ? "localhost" : "0.0.0.0",
        routes: {
            cors: {
                origin: ["*"]
            }
        }
    })

    server.route(NOT_FOUND)
    server.route(helloRoutes)
    server.route(booksRoutes)

    await server.start()
    
    console.log(server.info.uri)
}

init().catch(reason => console.log(reason))