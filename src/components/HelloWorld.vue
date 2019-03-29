<template>
  <div>
    <div id="authing_login-form"></div>
    <div v-if="!formShow" id="button-wrapper">
      <button @click="displayForm" class="btn btn-primary simform__actions blue">显示登录表单</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HelloWorld',

  props: {
    msg: String,
  },

  data () {
    return {
      form: null,

      formShow: true,
    }
  },

  methods: {

    displayForm () {
      this.form.show('authing_login-form');
      this.formShow = true;
    }

  },

  mounted () {
    this.form = new AuthingForm({
      clientId: '5a9fa26cf8635a000185528c',
      timestamp: Math.round(new Date() / 1000),
      nonce: Math.ceil(Math.random() * Math.pow(10, 6)),
      mountId: 'authing_login-form'
    });

    this.form.on('formClosed', () => {
      this.formShow = false;
    })
  }
}
</script>

<style>

  #button-wrapper {
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
