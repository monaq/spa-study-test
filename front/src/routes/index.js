import Home from '../screens/Home'
import User from '../screens/User'
import Login from '../screens/Login'
// import auth from '../auth'

// vue router랑 비슷한방식임...
// TODO: 인증요구사항은 어떻게??
const routes = {
    '/': Home,
    '/user': User,
    '/login': Login
}
// const routes = [
//     {
//         path: '/',
//         name: 'Home',
//         component: Home
//     }, {
//         path: '/login',
//         name: 'Login',
//         component: Login
//     }, {
//         path: '/user',
//         name: 'User',
//         component: User,
//         beforeEnter: auth.requireAuth
//     }
// ]

export default routes