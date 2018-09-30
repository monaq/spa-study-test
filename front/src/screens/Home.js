const Home = `
<div class-"wrap-coll">
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

export default Home