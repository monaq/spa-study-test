(function () {
    var Login = `<div class-"wrap-coll">
    <div class="coll-tit">
        <h2 class="cont-tit">Login</h2>
        <form name="login">
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
                    <button id="btn-submit" type="submit">>로그인</button>
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

    
    this.setView('/login')
    this.bindEvents()
}

App.prototype = {
    /**
     * 해쉬 체인지 이벤트에 view를 세팅한다
     */
    bindEvents: function() {
        var $loginBtn = document.getElementById('btn-submit')
        var self = this
        $loginBtn.onclick = function() {
            self.login()
        }
        this.onHashChange()
    },
    onHashChange: function() {
        window.onpopstate = () => {
            var pathname = window.location.href.split('#')[1] || '/'
            this.setView(pathname)
        }
    },
    /**
     * view를 target에 뿌린다
     */
    setView: function(url) {
        this.$contentDiv.innerHTML = this.routes[url]
    },
    /**
     * ajax fetch
     */
    fetch: function(TYPE, URL, data) {
        var resourceHost = 'https://localhost:3012'
        var self = this
        return $.ajax({
            type: TYPE,
            url: resourceHost + URL,
            data: data,
            success: self.setLogin(data),
            error: function (xhr, status, error) {
                console.log(error)
            }
        })
    },
    login: function() {
        var self = this
        var param = $("form[name=login]").serialize()
        console.log(param)
        var data = this.fetch('post', '/login', param)
        console.log(data)
    },
    setLogin: function(data) {
        this.state.userId = data.userId
        this.state.isLogin = true

        console.log(this.state)
        this.setView('/user')
        window.location.href = window.location.href + '#/user'
    },
    logout: function() {
        this.state.userId = null
        this.state.isLogin = false
    }
}

var app = new App()
})()