<template>
    <div class="logmod">
      <div class="logmod__wrapper">
        <span class="logmod__close">Close</span>
        <div class="logmod__container">
          <ul class="logmod__tabs">
            <li data-tabtar="lgm-2"><a href="#">登录</a></li>
            <li data-tabtar="lgm-1"><a href="#">注册</a></li>
          </ul>
          <div class="logmod__tab-wrapper">
          <div class="logmod__tab lgm-1">
            <div class="logmod__heading">
              <span class="logmod__heading-subtitle">提供账号密码 <strong>创建账号</strong></span>
            </div>
            <div class="logmod__form">
              <form accept-charset="utf-8" action="#" class="simform">
                <div class="sminputs">
                  <div class="input full">
                    <input class="string optional" v-model="registerForm.email" maxlength="255" placeholder="邮箱" type="email" size="50" />
                  </div>
                </div>
                <div class="sminputs">
                  <div class="input full">
                    <input class="string optional" v-model="registerForm.password" maxlength="255" placeholder="密码" type="password" size="50" />
                  </div>
                </div>
                <div class="simform__actions">
                  <input class="sumbit" name="commit" type="sumbit" @click="register" value="立即注册" />
                  <!-- <span class="simform__actions-sidetext">创建账户后默认同意我们的 <br><a class="special" href="#" target="_blank" role="link">隐私协议</a></span> -->
                </div> 
              </form>
            </div> 
            <div class="logmod__alter">
              <div class="logmod__alter-container">
                <a v-bind:href="oauth.url" class="connect facebook" v-for="oauth in oauthList">
                  <div class="connect__icon">
                    <i class="fa fa-github"></i>
                  </div>
                  <div class="connect__context">
                    <span>使用 <strong>{{oauth.name}}</strong> 登录</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div class="logmod__tab lgm-2">
            <div class="logmod__heading">
              <span class="logmod__heading-subtitle">输入邮箱和密码 <strong>进行登录</strong></span>
            </div> 
            <div class="logmod__form">
              <form accept-charset="utf-8" action="#" class="simform">
                <div class="sminputs">
                  <div class="input full">
                    <input class="string optional" v-model="loginForm.email" maxlength="255" placeholder="sample@authing.cn" type="email" size="50" />
                  </div>
                </div>
                <div class="sminputs">
                  <div class="input full">
                    <input class="string optional" v-model="loginForm.password" maxlength="255" placeholder="123456" type="password" size="50" />
                  </div>
                </div>
                <div class="sminputs" v-show="verifyCodeSrc">
                  <div class="input string optional">
                    <label class="string optional" for="user-pw">验证码 *</label>
                    <input class="string optional" v-model="loginForm.verifyCode" maxlength="255" placeholder="验证码" type="text" size="50" />
                  </div>
                  <div class="input string optional">
                    <img :src="verifyCodeSrc">
                  </div>
                </div>                             
                <div class="simform__actions">
                  <input class="sumbit" name="commit" type="sumbit" @click="login" value="登录" />
                  <!-- <span class="simform__actions-sidetext"><a class="special" role="link" href="#">忘记密码?<br>点击这里</a></span> -->
                </div> 
              </form>
            </div> 
            <div class="logmod__alter">
              <div class="logmod__alter-container">
                <a v-bind:href="oauth.url" class="connect facebook" v-for="oauth in oauthList">
                  <div class="connect__icon">
                    <i class="fa fa-github"></i>
                  </div>
                  <div class="connect__context">
                    <span>使用 <strong>{{oauth.name}}</strong> 登录</span>
                  </div>
                </a>
              </div>
            </div>
              </div>
          </div>
        </div>
      </div>

      <notifications group="foo" />
  </div>
</template>

<script>

var Authing = require('authing-js-sdk');

export default {
  name: 'HelloWorld',

  props: {
    msg: String,
  },

  data () {
    return {
      auth: null,

      loginForm: {
        email: 'sample@authing.cn',
        password: '123456',
        verifyCode: ''
      },

      verifyCodeSrc: '',

      registerForm: {
        email: '',
        password: ''
      },

      oauthList: []
    }
  },

  methods: {

    initAuthing () {

      // 对Client ID和Client Secret进行验证，获取Access Token
      let auth = new Authing({
        clientId: '5a9fa26cf8635a000185528c',
        secret: '427e24d3b7e289ae9469ab6724dc7ff0'
      });

      auth.then((validAuth) => {
        //验证成功后返回新的authing-js-sdk实例(validAuth)，可以将此实例挂在全局
        this.auth = validAuth;

        this.readOAuthList();

      }).catch(function(error) {
        //验证失败
        console.log(error);
      });
    },

    readOAuthList () {
      this.auth.readOAuthList().then((data) => {
        this.oauthList = data;
      });
    },

    login () {

      this.auth.login(this.loginForm).then((user) => {
        console.log(user);    
        this.$notify({
          group: 'foo',
          type: 'success',
          title: '登录成功',
        });        
        this.$notify({
          group: 'foo',
          type: 'success',
          title: '用户信息',
          position: 'center',
          text: JSON.stringify(user)
        });                
      }).catch((error) => {
        console.log(error);    

        this.$notify({
          group: 'foo',
          type: 'warn',
          title: '登录失败',
          text: error.message.message
        });

        if(error.message.code === 2000 || error.message.code === 2001) {
          //需要输入验证码
          this.verifyCodeSrc = error.message.data.url;
        }

      });

    },

    register () {

      this.auth.register(this.loginForm).then((user) => {
        console.log(user);
        this.$notify({
          group: 'foo',
          type: 'success',
          title: '注册成功',
        });        
      }).catch((error) => {
        console.log(error);    
        this.$notify({
          group: 'foo',
          type: 'warn',
          title: '注册失败',
          text: error.message.message
        });        
      });

    },

  },

  mounted () {

    this.initAuthing();

    var LoginModalController = {
        tabsElementName: ".logmod__tabs li",
        tabElementName: ".logmod__tab",
        inputElementsName: ".logmod__form .input",
        hidePasswordName: ".hide-password",
        
        inputElements: null,
        tabsElement: null,
        tabElement: null,
        hidePassword: null,
        
        activeTab: null,
        tabSelection: 0, // 0 - first, 1 - second
        
        findElements: function () {
            var base = this;
            
            base.tabsElement = $(base.tabsElementName);
            base.tabElement = $(base.tabElementName);
            base.inputElements = $(base.inputElementsName);
            base.hidePassword = $(base.hidePasswordName);
            
            return base;
        },
        
        setState: function (state) {
          var base = this,
                elem = null;
            
            if (!state) {
                state = 0;
            }
            
            if (base.tabsElement) {
              elem = $(base.tabsElement[state]);
                elem.addClass("current");
                $("." + elem.attr("data-tabtar")).addClass("show");
            }
      
            return base;
        },
        
        getActiveTab: function () {
            var base = this;
            
            base.tabsElement.each(function (i, el) {
               if ($(el).hasClass("current")) {
                   base.activeTab = $(el);
               }
            });
            
            return base;
        },
       
        addClickEvents: function () {
          var base = this;
            
            base.hidePassword.on("click", function (e) {
                var $this = $(this),
                    $pwInput = $this.prev("input");
                
                if ($pwInput.attr("type") == "password") {
                    $pwInput.attr("type", "text");
                    $this.text("Hide");
                } else {
                    $pwInput.attr("type", "password");
                    $this.text("Show");
                }
            });
     
            base.tabsElement.on("click", function (e) {
                var targetTab = $(this).attr("data-tabtar");
                
                e.preventDefault();
                base.activeTab.removeClass("current");
                base.activeTab = $(this);
                base.activeTab.addClass("current");
                
                base.tabElement.each(function (i, el) {
                    el = $(el);
                    el.removeClass("show");
                    if (el.hasClass(targetTab)) {
                        el.addClass("show");
                    }
                });
            });
            
            base.inputElements.find("label").on("click", function (e) {
               var $this = $(this),
                   $input = $this.next("input");
                
                $input.focus();
            });
            
            return base;
        },
        
        initialize: function () {
            var base = this;
            
            base.findElements().setState().getActiveTab().addClickEvents();
        }
    };

    $(document).ready(function() {
        LoginModalController.initialize();
    });
  }
}
</script>

<style scoped>

</style>
