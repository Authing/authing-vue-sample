<template>

    <div class="result-wrapper">
        <div class="result">
            <div class="result-circle" v-if="success">
                <div type="android-done" color="#fff" size="50" style="line-height: 60px;"></div>
            </div>

            <div class="result-circle warn" v-if="!success">
                <div class="warn" color="#fff" size="50" style="line-height: 60px;"></div>                
            </div>

            <div class="result-content">
                <h1 style="line-height: 2;">
                    {{message}}
                </h1>
                <p>
                    如果你看到这个页面，说明 Authing 已经可以和你的 WebApp 结合使用了。
                </p>
                <p>
                    假如本页面是你的项目中的登录处理页面那么只需要处理以下登录数据就可以分辨出用户身份了！
                </p>
                <textarea style="width: 100%;" rows="10">{{userInfo}}</textarea>
                <p class="help" style="margin-top: 15px;">
                    <a href="/">返回主页</a>
                </p>
            </div>
        </div>
        <notifications group="foo" />
    </div>

</template>

<script>
import jsBeautify from 'js-beautify';
export default {

    data () {
        return {
            message: '验证中...',
            success:false,
            userInfo: ''
        }
    },
    mounted () {
        let query = this.$route.query;

        console.log(query);

        if(!query.code) {
            this.$notify({
              group: 'foo',
              type: 'warn',
              title: '登录参数错误，请重试',
              position: 'center'
            });    
        }       

        if(query.code == '200') {
            this.success = true;
            this.message = '登录认证成功';
            try {
                let data = JSON.parse(query.data);
                this.userInfo = jsBeautify(JSON.stringify(data));
                localStorage.setItem('token', data.token);
                localStorage.setItem('userId', data._id);
                localStorage.setItem('email', data.email);
                localStorage.setItem('photo', data.photo);
                localStorage.setItem('username', data.username);     
                this.message = '认证成功：欢迎你，' + data.username || data.email;        
            }catch(error) {
                this.message = '登录认证失败，参数错误';
            }
        }else {
            this.message = query.message ? '登录认证失败，请重试: ' + query.message : '登录认证失败，请重试';      
        }

    }

}
    
</script>


<style>
    
    .result-circle {
        border-radius: 50%;
        height: 60px;
        width: 60px;
        background: #56c22d;
        text-align: center;
        margin: 0 auto;
    }

    .result-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        height: 100vh;
    }

    .result-content {
        padding: 20px;
    }

    @media screen and (max-width: 500px) {  
        h1 {
            font-size: 1em;
        }

      
        .logmod__wrapper {
            height: 100%;
            margin: 0px;
        }
    }

</style>