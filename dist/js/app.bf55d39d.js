(function(t){function e(e){for(var r,a,i=e[0],u=e[1],l=e[2],f=0,p=[];f<i.length;f++)a=i[f],o[a]&&p.push(o[a][0]),o[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);c&&c(e);while(p.length)p.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],r=!0,i=1;i<n.length;i++){var u=n[i];0!==o[u]&&(r=!1)}r&&(s.splice(e--,1),t=a(a.s=n[0]))}return t}var r={},o={app:0},s=[];function a(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.m=t,a.c=r,a.d=function(t,e,n){a.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},a.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},a.t=function(t,e){if(1&e&&(t=a(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)a.d(n,r,function(e){return t[e]}.bind(null,r));return n},a.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return a.d(e,"a",e),e},a.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},a.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],u=i.push.bind(i);i.push=e,i=i.slice();for(var l=0;l<i.length;l++)e(i[l]);var c=u;s.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"034f":function(t,e,n){"use strict";var r=n("9e74"),o=n.n(r);o.a},"0414":function(t,e,n){},1149:function(t,e,n){},"31f2":function(t,e,n){"use strict";var r=n("1149"),o=n.n(r);o.a},"3a62":function(t,e,n){},"47c2":function(t,e,n){"use strict";var r=n("0414"),o=n.n(r);o.a},"56d7":function(t,e,n){"use strict";n.r(e);n("5c07"),n("53da"),n("2556"),n("d0f8");var r=n("6e6d"),o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("div",{attrs:{id:"authing_login-form"}}),t.formShow?t._e():n("div",{attrs:{id:"button-wrapper"}},[n("button",{staticClass:"btn btn-primary simform__actions blue",on:{click:t.displayForm}},[t._v("显示登录表单")])])])},i=[],u={name:"HelloWorld",props:{msg:String},data:function(){return{form:null,formShow:!0}},methods:{displayForm:function(){this.form.show("authing_login-form"),this.formShow=!0}},mounted:function(){var t=this;this.form=new AuthingForm({clientId:"5a9fa26cf8635a000185528c",timestamp:Math.round(new Date/1e3),nonce:Math.ceil(Math.random()*Math.pow(10,6)),mountId:"authing_login-form"}),this.form.on("formClosed",function(){t.formShow=!1})}},l=u,c=(n("31f2"),n("17cc")),f=Object(c["a"])(l,a,i,!1,null,null,null),p=f.exports,d=(n("3a62"),{name:"app",components:{HelloWorld:p}}),h=d,m=(n("034f"),Object(c["a"])(h,o,s,!1,null,null,null)),v=m.exports,g=n("9745"),_=n.n(g),y=n("1e6f"),w=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"result-wrapper"},[n("div",{staticClass:"result"},[t.success?n("div",{staticClass:"result-circle"},[n("div",{staticStyle:{"line-height":"60px"},attrs:{type:"android-done",color:"#fff",size:"50"}})]):t._e(),t.success?t._e():n("div",{staticClass:"result-circle warn"},[n("div",{staticClass:"warn",staticStyle:{"line-height":"60px"},attrs:{color:"#fff",size:"50"}})]),n("div",{staticClass:"result-content"},[n("h1",{staticStyle:{"line-height":"2"}},[t._v("\n                "+t._s(t.message)+"\n            ")]),n("p",[t._v("\n                如果你看到这个页面，说明 Authing 已经可以和你的 WebApp 结合使用了。\n            ")]),n("p",[t._v("\n                假如本页面是你的项目中的登录处理页面那么只需要处理以下登录数据就可以分辨出用户身份了！\n            ")]),n("textarea",{staticStyle:{width:"100%"},attrs:{rows:"10"}},[t._v(t._s(t.userInfo))]),t._m(0)])]),n("notifications",{attrs:{group:"foo"}})],1)},b=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"help",staticStyle:{"margin-top":"15px"}},[n("a",{attrs:{href:"/"}},[t._v("返回主页")])])}],S=n("fda0"),O=n.n(S),x={data:function(){return{message:"验证中...",success:!1,userInfo:""}},mounted:function(){var t=this.$route.query;if(console.log(t),t.code||this.$notify({group:"foo",type:"warn",title:"登录参数错误，请重试",position:"center"}),"200"==t.code){this.success=!0,this.message="登录认证成功";try{var e=JSON.parse(t.data);this.userInfo=O()(JSON.stringify(e)),localStorage.setItem("token",e.token),localStorage.setItem("userId",e._id),localStorage.setItem("email",e.email),localStorage.setItem("photo",e.photo),localStorage.setItem("username",e.username),this.message="认证成功：欢迎你，"+e.username||!1}catch(n){this.message="登录认证失败，参数错误"}}else this.message=t.message?"登录认证失败，请重试: "+t.message:"登录认证失败，请重试"}},j=x,I=(n("47c2"),Object(c["a"])(j,w,b,!1,null,null,null)),C=I.exports;r["default"].config.productionTip=!1,r["default"].use(_.a),r["default"].use(y["a"]);var M=[{path:"/",component:p},{path:"/redirect",component:C}],$=new y["a"]({routes:M});new r["default"]({router:$,render:function(t){return t(v)}}).$mount("#app")},"9e74":function(t,e,n){}});
//# sourceMappingURL=app.bf55d39d.js.map