(function(t){function e(e){for(var r,s,i=e[0],l=e[1],u=e[2],f=0,p=[];f<i.length;f++)s=i[f],o[s]&&p.push(o[s][0]),o[s]=0;for(r in l)Object.prototype.hasOwnProperty.call(l,r)&&(t[r]=l[r]);c&&c(e);while(p.length)p.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,i=1;i<n.length;i++){var l=n[i];0!==o[l]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},o={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var u=0;u<i.length;u++)e(i[u]);var c=l;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("f3fb"),o=n.n(r);o.a},"0a2e":function(t,e,n){},3063:function(t,e,n){},"31f2":function(t,e,n){"use strict";var r=n("0a2e"),o=n.n(r);o.a},"3a62":function(t,e,n){},"47c2":function(t,e,n){"use strict";var r=n("3063"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("cadf"),n("551c"),n("097d");var r=n("2b0e"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},a=[],s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"authing_login-form"}}),t.formShow?t._e():n("div",{attrs:{id:"button-wrapper"}},[n("button",{staticClass:"btn btn-primary simform__actions blue",on:{click:t.displayForm}},[t._v("显示登录表单")])])])},i=[],l={name:"HelloWorld",props:{msg:String},data:function(){return{form:null,formShow:!0}},methods:{displayForm:function(){this.form.show("authing_login-form"),this.formShow=!0}},mounted:function(){var t=this;this.form=new AuthingForm({clientId:"5a9fa26cf8635a000185528c",secret:"427e24d3b7e289ae9469ab6724dc7ff0",mountId:"authing_login-form"}),this.form.on("formClosed",function(){t.formShow=!1})}},u=l,c=(n("31f2"),n("6ae7")),f=Object(c["a"])(u,s,i,!1,null,null,null);f.options.__file="HelloWorld.vue";var p=f.exports,d=(n("3a62"),{name:"app",components:{HelloWorld:p}}),m=d,h=(n("034f"),Object(c["a"])(m,o,a,!1,null,null,null));h.options.__file="App.vue";var v=h.exports,g=n("ee98"),_=n.n(g),b=n("8c4f"),y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"result-wrapper"},[n("div",{staticClass:"result"},[t.success?n("div",{staticClass:"result-circle"},[n("div",{staticStyle:{"line-height":"60px"},attrs:{type:"android-done",color:"#fff",size:"50"}})]):t._e(),t.success?t._e():n("div",{staticClass:"result-circle warn"},[n("div",{staticClass:"warn",staticStyle:{"line-height":"60px"},attrs:{color:"#fff",size:"50"}})]),n("div",{staticClass:"result-content"},[n("h1",{staticStyle:{"line-height":"2"}},[t._v("\n                "+t._s(t.message)+"\n            ")]),t._m(0)])]),n("notifications",{attrs:{group:"foo"}})],1)},w=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"help",staticStyle:{"margin-top":"15px"}},[n("a",{attrs:{href:"/"}},[t._v("返回主页")])])}],S={data:function(){return{message:"验证中...",success:!1}},mounted:function(){var t=this.$route.query;if(console.log(t),t.code||this.$notify({group:"foo",type:"warn",title:"登录参数错误，请重试",position:"center"}),"200"==t.code){this.success=!0,this.message="登录认证成功";try{var e=JSON.parse(t.data);localStorage.setItem("token",e.token),localStorage.setItem("userId",e._id),localStorage.setItem("email",e.email),localStorage.setItem("photo",e.photo),localStorage.setItem("username",e.username),this.message="认证成功：欢迎你，"+e.username||e.email}catch(t){this.message="登录认证失败，参数错误"}}else this.message=t.message?"登录认证失败，请重试: "+t.message:"登录认证失败，请重试"}},O=S,x=(n("47c2"),Object(c["a"])(O,y,w,!1,null,null,null));x.options.__file="Redirect.vue";var j=x.exports;r["default"].config.productionTip=!1,r["default"].use(_.a),r["default"].use(b["a"]);var C=[{path:"/",component:p},{path:"/redirect",component:j}],I=new b["a"]({routes:C});new r["default"]({router:I,render:function(t){return t(v)}}).$mount("#app")},f3fb:function(t,e,n){}});
//# sourceMappingURL=app.40beda36.js.map