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

        if(routes[pathName]) {
            $container.innerHTML = routes[pathName]
        } else {
            // TODO: 404 처리
        }
    }
}

export default Controller