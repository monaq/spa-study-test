import Controller from "./controller"

const createApp = () => {
    class App {
        constructor() {
            this.controller = new Controller()
            this.$contentDiv = document.getElementById('s-content')

            this.controller.setView(this.$contentDiv)
            this.onNavItemClick()
            this.onChangeHash()
        }

        onNavItemClick() {
            const self = this
            const $nav = document.getElementById('s-nav')

            console.log($nav)
            $nav.addEventListener('click', e => {
                self.controller.setView(self.$contentDiv)
            })

        }

        onChangeHash() {
            window.onpopstate = () => {
                this.controller.setView(this.$contentDiv)
            }
        }
    }
    const app = new App()
}

export default createApp