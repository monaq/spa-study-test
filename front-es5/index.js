(function () {
    var Login = `<div class-"wrap-coll">
    <div class="coll-tit">
        <h2 class="cont-tit">Login</h2>
        <form method="post" action="/login">
            <fieldset>
                <legend>로그인 화면</legend>
                <div class="login-email">
                    <label>이메일</label>
                    <span class="cover-login">
                        <input type="text" name="email" id="email" placeholder="Email" />
                    </span>
                </div>
                <div class="login-pwd">
                    <label class="screen-out" for="password">비밀번호</label> 
                    <span class="cover-login">
                        <input type="password" name="password" id="password" placeholder="Password" />
                    </span>
                </div>
                <div class="login-submit">
                    <button class="btn-submit" type="submit">>로그인</button>
                </div>
            </fieldset>
        </form>
    </div>
</div>
`

var Home = `<h2>Hello HOME</h2>`
var User = `<h2>Login success, <span class="userName"></span></h2>`

function App () {
    this.state = {
        userId: null,
        isLogin: false
    }
    this.routes = {
        '/': Home,
        '/user': User,
        '/login': Login
    }
    this.$contentDiv = document.getElementById('s-content')

    this.onHashChange()
    this.setView('/')
}

App.prototype = {
    onHashChange: function() {
        window.onpopstate = () => {
            var pathname = window.location.href.split('/#')
            setView(pathname)
        }
    },
    setView: function(url) {
        this.$contentDiv.innerHTML = this.routes[url]
    },
    fetch: function(TYPE, URL, callback) {
        var resourceHost = 'https://localhost:3000'
        return $.ajax({
            type: TYPE,
            url: resourceHost + URL,
            success: data => callback(data),
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    },
    login: function() {
        var self = this
        var data = this.fetch('post', '/login', self.setLogin)
    },
    setLogin: function(data) {
        this.state.userId = data.userId
        this.state.isLogin = true

        this.setView('/user')
        window.location.href = window.location.href + '/#/user'
    },
    logout: function() {
        this.state.userId = null
        this.state.isLogin = false
    }
}

var app = new App()
})()