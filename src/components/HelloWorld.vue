<template>
  <div>
    <div id="authing_login-form"></div>
    <button v-if="!formShow" @click="displayForm" class="btn btn-primary">显示登录表单</button>
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
      secret: '427e24d3b7e289ae9469ab6724dc7ff0',

      mountId: 'authing_login-form'
    });

    this.form.on('formClosed', () => {
      this.formShow = false;
    })
  }
}
</script>

<style>


</style>
