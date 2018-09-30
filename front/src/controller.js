import routes from './routes'
class Controller {
    constructor() {
        this.currentUrl = ''
        this.history = []
    }

    getPathName() {
        return window.location.href.split("/#")[1] || '/'
    }

    setView($container) {
        const pathName = this.getPathName()
        console.log(pathName)
        $container.innerHTML = routes[pathName]
    }
}

export default Controller