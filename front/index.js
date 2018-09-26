/* window */
import Fetch from './util/fetch'
import routes from './routes'

const contentDiv = document.getElementById('s-content')

const App = () => {
    window.onpopstate = () => {
        contentDiv.innerHTML = routes[window.location.pathname];
    }
}

export default App