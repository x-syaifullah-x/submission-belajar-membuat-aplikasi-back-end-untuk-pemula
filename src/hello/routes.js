const routes = [
    {
        method: "GET",
        path: "/hello",
        handler: (request, h) => {
            return "hello juga"
        }
    }
]

export { routes }