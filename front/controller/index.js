export default class Controller {
    constructor(store, view) {
        this.store = store
        this.view = view
        this.currentUrl = ''
        this.history = []
    }

    setView = (url) => {
        this.currentUrl = url
        this.history.push(url)
    }

    login = () => {

    }
}