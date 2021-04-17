import { nanoid } from "nanoid"
import Book from "./Book.js"

const book = new Book()

/**
 * @param h
 * @param {any} data
 * @param {String} status
 * @param {String} message
 * @param {Number} code
 */
const response = (h, data, status, message, code) => {
    const object = {}
    if (data !== null) object.data = data
    if (status !== null) object.status = status
    if (message !== null) object.message = message
    const response = h.response(object)
    response.code(code)
    return response
}

const saveBookHandler = (request, h) => {
    const payload = request.payload
    const id = nanoid(16)
    const finished = payload.pageCount === payload.readPage
    const insertedAt = new Date().toISOString()
    const updatedAt = insertedAt

    const propertyNameIsNullOrEmpty = payload.name === undefined || payload.name === ""
    const propertyReadPageIsValid = payload.readPage > payload.pageCount
    const messagePropertyNameIsNullOrEmpty = "Gagal menambahkan buku. Mohon isi nama buku"
    const messagePropertyReadPageIsValid = "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount"
    if (propertyNameIsNullOrEmpty || propertyReadPageIsValid) {
        const message = propertyNameIsNullOrEmpty ? messagePropertyNameIsNullOrEmpty : messagePropertyReadPageIsValid
        return response(h, null, "fail", message, 400)
    }

    const isSuccess = book.save({
        name: payload.name,
        year: payload.year,
        author: payload.author,
        summary: payload.summary,
        publisher: payload.publisher,
        pageCount: payload.pageCount,
        readPage: payload.readPage,
        reading: payload.reading,
        id: id,
        finished: finished,
        insertedAt: insertedAt,
        updatedAt: updatedAt
    })
    const status = isSuccess ? "success" : "error"
    const message = isSuccess ? "Buku berhasil ditambahkan" : "Catatan gagal ditambahkan"
    const code = isSuccess ? 201 : 500
    const data = { bookId: isSuccess ? id : null }
    return response(h, data, status, message, code)
}

const getAllBookHandler = (request, h) => {
    const res = (object) => {
        const mapping = (value) => {
            return {
                id: value.id,
                name: value.name,
                publisher: value.publisher
            }
        }
        const data = { books: object.map(mapping) }
        return response(h, data, "success", null, 200)
    }

    const isQuery = (value) => value === "0" || value === "1"

    const query = request.query

    const reading = query.reading
    if (isQuery(reading)) {
        const isReading = reading !== "0"
        return res(book.getAllByReading(isReading))
    }

    const finished = query.finished
    if (isQuery(finished)) {
        const isFinished = finished !== "0"
        return res(book.getAllByFinished(isFinished))
    }

    const name = query.name
    if (name !== undefined) {
        return res(book.getAllByName(name))
    }

    return res(book.getAll())
}

const getDetailBookHandler = (request, h) => {
    const { bookId } = request.params
    const data = book.getFirstById(bookId)
    const isExist = data !== undefined
    const status = isExist ? "success" : "fail"
    const message = isExist ? null : "Buku tidak ditemukan"
    const code = isExist ? 200 : 404
    return response(h, isExist ? { book: data } : null, status, message, code)
}

const updateBookHandler = (request, h) => {
    const payload = request.payload

    if (payload.name === undefined || payload.name === "") {
        return response(h, null, "fail", "Gagal memperbarui buku. Mohon isi nama buku", 400)
    }

    if (payload.readPage > payload.pageCount) {
        return response(h, null, "fail", "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount", 400)
    }

    const data = {
        name: payload.name,
        year: payload.year,
        author: payload.author,
        summary: payload.summary,
        publisher: payload.publisher,
        pageCount: payload.pageCount,
        readPage: payload.readPage,
        reading: payload.reading,
        updatedAt: new Date().toISOString()
    }

    const { bookId } = request.params
    const isUpdate = book.update(bookId, data)
    const status = isUpdate ? "success" : "fail"
    const message = isUpdate ? "Buku berhasil diperbarui" : "Gagal memperbarui buku. Id tidak ditemukan"
    const code = isUpdate ? 200 : 404
    return response(h, null, status, message, code)
}

const deleteBookHandler = (request, h) => {
    const { bookId } = request.params

    const isDelete = book.delete(bookId)
    const status = isDelete ? "success" : "fail"
    const message = isDelete ? "Buku berhasil dihapus" : "Buku gagal dihapus. Id tidak ditemukan"
    const code = isDelete ? 200 : 404
    return response(h, null, status, message, code)
}

export {
    saveBookHandler,
    getAllBookHandler,
    getDetailBookHandler,
    updateBookHandler,
    deleteBookHandler
}