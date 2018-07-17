<template>
    <div class="logmod">
      <div class="logmod__wrapper">
        <span class="logmod__close">Close</span>
        <div class="logmod__container">
          <ul class="logmod__tabs">
            <li data-tabtar="lgm-0"><a href="#">小程序扫码登录</a></li>          
            <li data-tabtar="lgm-2"><a href="#">登录</a></li>
            <li data-tabtar="lgm-1"><a href="#">注册</a></li>
          </ul>
          <div class="logmod__tab-wrapper">

          <div class="logmod__tab lgm-0">
            <div class="logmod__heading" style="height:300px;">
              <div id="qrcode-node"></div>
            </div>
          </div>

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

import axios from 'axios';
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

    randomWord (randomFlag, min, max) {
      let str = "",
        range = min,
        arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
          'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
          'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L',
          'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

        if (randomFlag) {
          range = Math.round(Math.random() * (max - min)) + min;// 任意长度
        }

        for (let i = 0; i < range; i++) {
          let pos = Math.round(Math.random() * (arr.length - 1));
          str += arr[pos];
        }
        
        return str;
    },

    genQRCode () {
      var random = this.randomWord(true, 12, 24);
      sessionStorage.randomWord = random;
      return axios.get('https://oauth.authing.cn/oauth/wxapp/qrcode/5a9fa26cf8635a000185528c?random=' + random);
    },

    checkQR () {
      var random = sessionStorage.randomWord || '';
      return axios.post('https://oauth.authing.cn/oauth/wxapp/confirm/qr?random=' + random);
    },

    startWXAppScaning (opts) {

      var self = this;

      var mountNode = opts.mount || 'authing__qrcode-root-node';
      var interval = opts.interval || 1500;
      var tips = opts.tips;
      var redirect = opts.redirect == null || opts.redirect == undefined ? true : false;

      var onError = opts.onError;
      var onSuccess = opts.onSuccess;

      var qrcodeNode = document.getElementById(mountNode);

      if(!qrcodeNode) {
        qrcodeNode = document.createElement('div');
        qrcodeNode.id = mountNode;
        document.getElementsByTagName('body')[0].appendChild(qrcodeNode);
      }      

      var styleNode = document.createElement('style'), style = '#authing__spinner{position:absolute;left:50%;margin-left:-6px;}.spinner{margin:100px auto;width:20px;height:20px;position:relative}.container1>div,.container2>div,.container3>div{width:6px;height:6px;background-color:#00a1ea;border-radius:100%;position:absolute;-webkit-animation:bouncedelay 1.2s infinite ease-in-out;animation:bouncedelay 1.2s infinite ease-in-out;-webkit-animation-fill-mode:both;animation-fill-mode:both}.spinner .spinner-container{position:absolute;width:100%;height:100%}.container2{-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.container3{-webkit-transform:rotateZ(90deg);transform:rotateZ(90deg)}.circle1{top:0;left:0}.circle2{top:0;right:0}.circle3{right:0;bottom:0}.circle4{left:0;bottom:0}.container2 .circle1{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.container3 .circle1{-webkit-animation-delay:-1.0s;animation-delay:-1.0s}.container1 .circle2{-webkit-animation-delay:-0.9s;animation-delay:-0.9s}.container2 .circle2{-webkit-animation-delay:-0.8s;animation-delay:-0.8s}.container3 .circle2{-webkit-animation-delay:-0.7s;animation-delay:-0.7s}.container1 .circle3{-webkit-animation-delay:-0.6s;animation-delay:-0.6s}.container2 .circle3{-webkit-animation-delay:-0.5s;animation-delay:-0.5s}.container3 .circle3{-webkit-animation-delay:-0.4s;animation-delay:-0.4s}.container1 .circle4{-webkit-animation-delay:-0.3s;animation-delay:-0.3s}.container2 .circle4{-webkit-animation-delay:-0.2s;animation-delay:-0.2s}.container3 .circle4{-webkit-animation-delay:-0.1s;animation-delay:-0.1s}@-webkit-keyframes bouncedelay{0%,80%,100%{-webkit-transform:scale(0.0)}40%{-webkit-transform:scale(1.0)}}@keyframes bouncedelay{0%,80%,100%{transform:scale(0.0);-webkit-transform:scale(0.0)}40%{transform:scale(1.0);-webkit-transform:scale(1.0)}}';

      styleNode.type = "text/css";

      if(styleNode.styleSheet) {
        styleNode.styleSheet.cssText = style;
      }else{
        styleNode.innerHTML = style;
      }

      document.getElementsByTagName("head")[0].appendChild(styleNode);      

      var loading = function() {
        qrcodeNode.innerHTML = '<div id="authing__spinner" class="spinner"><div class="spinner-container container1"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container2"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div><div class="spinner-container container3"><div class="circle1"></div><div class="circle2"></div><div class="circle3"></div><div class="circle4"></div></div></div>';
      }

      var unloading = function() {
        var child = document.getElementById("authing__spinner");
        qrcodeNode.removeChild(child);
      }      

      var genTip = function(text) {
        var tip = document.createElement('span')
        tip.class = 'authing__heading-subtitle';
        tip.style = 'display: block;font-weight: 400;font-size: 15px;color: #888;line-height: 48px;';
        tip.innerHTML = text;
        return tip;
      }

      var genImage = function(src) {
        var qrcodeImage = document.createElement('img');
        qrcodeImage.class = 'authing__qrcode';
        qrcodeImage.src = src;
        qrcodeImage.width = 240;
        qrcodeImage.height = 240;
        return qrcodeImage;
      }

      var genShadow = function(text, aOnClick) {
        var shadow = document.createElement('div');
        shadow.id = "authing__retry";
        shadow.style = "width: 240px;height: 240px;position: absolute;left: 50%;top: 2;top: 12px;margin-left: -120px;    background-color: rgba(0,0,0, 0.5);line-height:240px;color:#fff;font-weight:600;";

        var shadowA = document.createElement('a');
        shadowA.innerHTML = text;
        shadowA.style = "border-bottom: 1px solid #fff;cursor: pointer;"
        shadowA.onclick = aOnClick;
        shadow.appendChild(shadowA);
        return shadow;      
      }

      var genRetry = function(qrcodeNode, tipText) {
        var tip = genTip(tipText); 

        var qrcodeImage = genImage('https://usercontents.authing.cn/authing_user_manager_wxapp_qrcode.jpg');

        qrcodeImage.onload = function() {
          unloading();
        }

        var shadow = genShadow('点击重试', function() {
          start();          
        });

        qrcodeNode.appendChild(qrcodeImage);
        qrcodeNode.appendChild(shadow);
        qrcodeNode.appendChild(tip);        
      }

      var start = function() {
        loading();
        self.genQRCode().then(function(qrRes) {

          qrRes = qrRes.data;

          if(qrRes.code != 200) {
            genRetry(qrcodeNode, qrRes.message);
            if(onError) {
              onError(qrRes);
            }
          }else {
            var qrcode = qrRes.data;
            sessionStorage.qrcodeUrl = qrcode.qrcode;
            sessionStorage.qrcode = JSON.stringify(qrcode);

            if(qrcodeNode) {
              var qrcodeWrapper = document.createElement("div");
              qrcodeWrapper.id = 'authing__qrcode-wrapper';

              var qrcodeImage = genImage(qrcode.qrcode);

              qrcodeImage.onload = function() {
                unloading();
                var inter = 0;
                inter = setInterval(function() {
                 self.checkQR().then(function(checkRes) {
                  var checkResult = checkRes.data.data;
                  if(checkResult.code === 200) {
                    clearInterval(inter);
                    if(redirect) {
                      var shadow = genShadow('扫码成功，即将跳转', function() {
                        window.location.href = checkResult.redirect + '?code=200&data=' + (JSON.stringify(checkResult.data));
                      });
                      setTimeout(function() {
                        window.location.href = checkResult.redirect + '?code=200&data=' + (JSON.stringify(checkResult.data));
                      }, 600);
                      qrcodeNode.appendChild(shadow);                      
                    }else {
                      if(onSuccess) {
                        onSuccess(checkResult);
                      }
                    }
                  }
                 });
                }, interval);
              }

              var tip = genTip(tips || "搜索小程序 <strong>身份管家</strong> 扫码登录");

              qrcodeWrapper.appendChild(qrcodeImage);
              qrcodeWrapper.appendChild(tip);
              qrcodeNode.appendChild(qrcodeWrapper);
            }
          }

        }).catch(function(error) {
          genRetry(qrcodeNode, '网络出错，请重试');
          if(onError) {
            onError(error);
          }
        });
      }

      start();

    }

  },

  mounted () {

    this.initAuthing();
    this.startWXAppScaning({
      mount: 'qrcode-node'
    });

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
