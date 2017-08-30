let $ = require('jquery');
let tpl = '<div class="login-layer"><div class="cont"><a href="javascript:;" class="close"></a><form><h3>新农宝盒智慧云平台</h3><input type="text" name="username" placeholder="用户名"><input type="password" name="password" placeholder="安全码"><p class="tip"><span>用户名或密码错误！</span></p><input type="submit" name="" value="确认登录"></form><p class="msg">找回密码请用注册手机拨打：<a href="tel://18701029660">18701029660</a></p></div>    </div>';
let Login = {
    showFlag: 0,
    show: function() {
        if (this.showFlag) return;
        this.showFlag = 1;
        $('body').append(tpl);
        Login.bind();
    },
    close: function() {
        this.showFlag = 0;
        $('.login-layer').remove();
    },
    bind: function() {
        $('.login-layer').one('click', '.close', function() {
            this.close();
        }.bind(this))
    },
    init: function() {
        let self = this;
        $('#login').click(function() {
            self.show();
        })
    }
}

Login.init();

module.exports = Login;