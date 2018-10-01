(function () {
    'use strict';

    var Home = "\n<div class-\"wrap-coll\">\n    <div class=\"coll-tit\">\n        <h2 class=\"cont-tit\">Login</h2>\n        <form method=\"post\" action=\"/login\">\n            <fieldset>\n                <legend>\uB85C\uADF8\uC778 \uD654\uBA74</legend>\n                <div class=\"login-email\">\n                    <label>\uC774\uBA54\uC77C</label>\n                    <span class=\"cover-login\">\n                        <input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Email\" />\n                    </span>\n                </div>\n                <div class=\"login-pwd\">\n                    <label class=\"screen-out\" for=\"password\">\uBE44\uBC00\uBC88\uD638</label> \n                    <span class=\"cover-login\">\n                        <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" />\n                    </span>\n                </div>\n                <div class=\"login-submit\">\n                    <button class=\"btn-submit\" type=\"submit\">>\uB85C\uADF8\uC778</button>\n                </div>\n            </fieldset>\n        </form>\n    </div>\n</div>\n\n";

    var User = "\n<div class-\"wrap-coll\">\n    <div class=\"coll-tit\">\n        <h2 class=\"cont-tit\">User</h2>\n        <h3>Hello, <span class=\"msg\"></span></h3>\n    </div>\n</div>\n\n";

    var Login = "\n<div class-\"wrap-coll\">\n    <div class=\"coll-tit\">\n        <h2 class=\"cont-tit\">Login</h2>\n        <form method=\"post\" action=\"/login\">\n            <fieldset>\n                <legend>\uB85C\uADF8\uC778 \uD654\uBA74</legend>\n                <div class=\"login-email\">\n                    <label>\uC774\uBA54\uC77C</label>\n                    <span class=\"cover-login\">\n                        <input type=\"text\" name=\"email\" id=\"email\" placeholder=\"Email\" />\n                    </span>\n                </div>\n                <div class=\"login-pwd\">\n                    <label class=\"screen-out\" for=\"password\">\uBE44\uBC00\uBC88\uD638</label> \n                    <span class=\"cover-login\">\n                        <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"Password\" />\n                    </span>\n                </div>\n                <div class=\"login-submit\">\n                    <button class=\"btn-submit\" type=\"submit\">>\uB85C\uADF8\uC778</button>\n                </div>\n            </fieldset>\n        </form>\n    </div>\n</div>\n";

    // import auth from '../auth'

    // vue router랑 비슷한방식임...
    // TODO: 인증요구사항은 어떻게??
    var routes = {
        '/': Home,
        '/user': User,
        '/login': Login
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

    };

    var PORT = '3000';
    var resourceHost = 'http://localhost:' + PORT;
    var Fetch = function Fetch() {
        var TYPE = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
        var URL = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
        var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function () {};


        return $.ajax({
            type: TYPE,
            url: resourceHost + URL,
            success: function success(data) {
                return callback(data);
            },
            error: function error(xhr, status, _error) {
                console.log(_error);
            }
        });
    };

    var classCallCheck = function (instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    };

    var createClass = function () {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }

      return function (Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();

    var Controller = function () {
        function Controller() {
            classCallCheck(this, Controller);

            this.currentUrl = '';
            this.history = [];
        }

        createClass(Controller, [{
            key: 'getPathName',
            value: function getPathName() {
                return window.location.href.split("/#")[1] || '/';
            }
        }, {
            key: 'setView',
            value: function setView($container) {
                var pathName = this.getPathName();

                if (routes[pathName]) {
                    $container.innerHTML = routes[pathName];
                }
            }
        }, {
            key: 'login',
            value: function login() {
                var userData = Fetch('post', '/login', function (data) {
                    // TODO: /user로 redirect.
                });
                // TODO: store에 있는 userData와 localstorage에 저장
                // TODO: event emit?
            }
        }, {
            key: 'logout',
            value: function logout() {
                // TODO: store에 있는 userData와 localstorge를 날림
            }
        }]);
        return Controller;
    }();

    var createApp = function createApp() {
        var App = function () {
            function App() {
                classCallCheck(this, App);

                this.controller = new Controller();
                this.$contentDiv = document.getElementById('s-content');

                this.controller.setView(this.$contentDiv);
                this.onNavItemClick();
                this.onHashChange();
            }

            createClass(App, [{
                key: 'onNavItemClick',
                value: function onNavItemClick() {
                    var self = this;
                    var $nav = document.getElementById('s-nav');

                    console.log($nav);
                    $nav.addEventListener('click', function (e) {
                        self.controller.setView(self.$contentDiv);
                    });
                }
            }, {
                key: 'onHashChange',
                value: function onHashChange() {
                    var _this = this;

                    window.onpopstate = function () {
                        _this.controller.setView(_this.$contentDiv);
                    };
                }
            }]);
            return App;
        }();

        var app = new App();
    };

    var App = createApp();

}());
