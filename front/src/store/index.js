export default class Store {
    constructor() {
        this.storage = window.localStorage || {}
    }

    setStorage = (key, val) => {
        this.storage = localStorage.setItem(key, val)
    }

    getStorage = () => {
        return this.storage
    }

    getStorageItem = (key) => {
        return this.storage.getItem(key)
    }

    removeStorage = () => {
        window.localStorage.removeItem()
        this.storage = {}
    }
}