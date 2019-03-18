const Mock = require('mockjs');
// 登录返回数据
const loginData = function() {
    return {
        data: {
            resCode: 200,
            msg: 'success'
        }
    }
}
// 获取验证码返回数据
const code = function() {
    return {
        data: {
            resCode: 200,
            msg: 'success'
        }
    }
}
 
Mock.mock('/getCode', 'post', code);
Mock.mock('/login', 'post', loginData);