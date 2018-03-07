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
                <h1>
                    {{message}}
                </h1>
                <p class="help" style="margin-top: 15px;">
                    <a href="/">返回主页</a>
                </p>
            </div>
        </div>
        <notifications group="foo" />
    </div>

</template>

<script>

export default {

    data () {
        return {
            message: '验证中...',
            success:false
        }
    },

    mounted () {
        let query = this.$route.query;

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

</style>