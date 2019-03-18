<template>
    <div class="login">
        <h1>登录</h1>
        <p class="msg">操作反馈：{{msg}}</p>
        <InputForm label="手机号" :error-msg="phoneErrorMsg" v-model="phone" v-bind:maxlength="11" @inputting="clearMsg"/>
        <InputForm label="验证码" :error-msg="codeErrorMsg" v-model="code" v-bind:maxlength="6" @inputting="clearMsg"/>
        <button @click="check" data-id="code" :disabled="buttonDisabled">获取验证码<span v-show="time!==0">{{time}}</span></button>
        <button @click="check" data-id="login">登录</button>
    </div>
</template>
<script>
import * as api from '../api/login.js'
import InputForm from './InputForm.vue'
import { setInterval, clearInterval } from 'timers';
let timer = null

export default {
  name: 'app',
  components: {
    InputForm
  },
  data: () => {
    return {
      phone: '',
      code: '',
      phoneErrorMsg: '',
      codeErrorMsg: '',
      buttonDisabled: false,
      time: 0,
      msg: ''
    }
  },
  watch: {

  },
  methods: {
    check (env) {
      // 判断按钮
      let id = env.target.dataset.id
      
      // 手机号校验
      if (this.phone.length !== 11 || !(/^1(39|38|37|36|35|34|78|70|88|87|83|82|59|58|57|52|50|47|86|85|70|56|55|30|31|32|89|80|70|53|33|99|98|66|73)\d{8}$/.test(this.phone))){
        this.setMsg('请输入有效手机号')
        this.phoneErrorMsg = '请输入有效手机号'
        return
      }

      // 请求
      // 验证码校验
      if(id==='code') {
        this.getCode()
      } else if (!(/^\d{6}$/.test(this.code))) {
        this.setMsg('验证码有误，请重新输入6位数字的验证码')
        this.codeErrorMsg = '验证码有误，请重新输入6位数字的验证码'
      } else {
        this.login()
      }
    },
    // 获取验证码请求
    async getCode () {
      this.buttonDisabled = true
      try {
        const data = await api.getCode({phone: this.phone})
        this.setMsg('验证码已发送至您的手机，请注意查收', data)
        this.time = 60
        timer = setInterval(()=>{
          if(this.time==1){
            this.clearTimer()
            return
          }
          this.time--
        }, 1000)
      } catch (err) {
        this.buttonDisabled = false
        this.setMsg('请求失败，请稍后重试')
      }
    },
    // 登录请求
    async login () {
      try {
        const data = await api.login({phone: this.phone, code: this.code})
        this.buttonDisabled = false
        this.setMsg('登录成功', data)
        this.clearTimer()
      } catch (err) {
        this.setMsg('请求失败，请稍后重试')
      }
    },
    // 清除定时
    clearTimer () {
      clearInterval(timer)
      this.buttonDisabled = false
      this.time = 0
    },
    // 操作反馈
    setMsg (...msg) {
      this.msg = msg
    },
    // 清除操作反馈
    clearMsg () {
      this.msg = ''
      this.phoneErrorMsg = ''
      this.codeErrorMsg = ''
    }
  }
}
</script>
<style>
button {
  margin: 0 10px;
}
.msg {
  max-width: 400px;
  padding: 20px;
  margin: 0 auto;
  border: 1px solid #2c3e50;
  border-radius: 10px;
  text-align: left;
}
</style>