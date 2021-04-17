const books = []

class Book {
    /**
     * @param {Object} book
     * @return {Boolean}
     */
    save(book) {
        return books.push(book) > 0
    }

    /**
     * @return {Array}
     */
    getAll() {
        return books
    }

    /**
     * @param {Number} bookId
     * @return {Boolean}
     */
    delete(bookId) {
        const index = this.getIndex(bookId)
        return books.splice(index, 1).length > 0
    }

    /**
     * @param {Boolean} isReading
     * @return {Array}
     */
    getAllByReading(isReading) {
        return books.filter(value => value.reading === isReading)
    }

    /**
     * @param {Boolean} isFinished
     * @return {Array}
     */
    getAllByFinished(isFinished) {
        return books.filter(value => value.finished === isFinished)
    }

    /**
     * @param {String} name
     * @return {Array}
     */
    getAllByName(name) {
        return books.filter(value => value.name.toLowerCase().includes(name.toLowerCase()))
    }

    /**
     * @param {Number} bookId
     * @return {Array | undefined}
     */
    getFirstById(bookId) {
        return books.filter(value => value.id === bookId)[0]
    }

    /**
     * @param {Number} bookId
     * @return {Number}
     */
    getIndex(bookId) {
        return books.findIndex((book) => book.id === bookId)
    }

    /**
     * @param {Number} bookId
     * @param {Object} newData
     * @return {Boolean}
     */
    update(bookId, newData) {
        const index = this.getIndex(bookId)
        if (index !== -1) {
            books[index] = { ...books[index], ...newData }
            return true
        } else {
            return false
        }
    }
}

export default Book
