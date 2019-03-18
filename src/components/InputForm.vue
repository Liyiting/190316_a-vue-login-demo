<template>
  <div class="input-box">
    <label>{{label}}</label>
    <input :type="type" v-model="inputValue" v-bind:maxlength="maxlength" @keydown="$emit('inputting')"/>
    <div class="error">{{errorMsg}}</div>
  </div>
</template>
<script>
export default {
  name: 'InputForm',
  props: {
    label: { // 标签
      type: String,
      default: '标签'
    },
    type: { // input类型
      type: String,
      default: 'text'
    },
    errorMsg: { // 错误信息
      type: String,
      default: ''
    },
    value: {  // 初始值
      default: ''
    },
    maxlength: {  // 长度
      type: Number
    }
  },
  data () {
    return {
      inputValue: this.value
    }
  },
  watch: {
    inputValue: function (newVal) {
      this.$emit('input', newVal)
    }
  }
}
</script>
<style scoped>
.input-box {
  margin: 10px 0;
}
label {
  margin-right: 10px;
}
.error {
  color: #f00;
}
</style>
