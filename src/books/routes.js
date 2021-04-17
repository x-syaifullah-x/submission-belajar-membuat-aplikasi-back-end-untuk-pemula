import {
    saveBookHandler,
    getAllBookHandler,
    getDetailBookHandler,
    updateBookHandler,
    deleteBookHandler
} from "./handler.js"

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: saveBookHandler
    },

    {
        method: "GET",
        path: "/books",
        handler: getAllBookHandler
    },

    {
        method: "GET",
        path: "/books/{bookId}",
        handler: getDetailBookHandler
    },

    {
        method: "PUT",
        path: "/books/{bookId}",
        handler: updateBookHandler
    },

    {
        method: "DELETE",
        path: "/books/{bookId}",
        handler: deleteBookHandler
    }
]

export { routes }