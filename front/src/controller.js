import routes from './routes'
import Fetch from './util/fetch';
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

    login() {
        const userData = Fetch('post', '/login', data => {
            // TODO: /user로 redirect.
        })
        // TODO: store에 있는 userData와 localstorage에 저장
        // TODO: event emit?
    }
    logout() {
        // TODO: store에 있는 userData와 localstorge를 날림
    }
}

export default Controller