const jwt = require('jsonwebtoken');
// 创建 token 类
class Jwt {
    constructor(data) {
        this.data = data;
        this.secret = 'token';
    }
    //生成token
    generateToken() {
        let data = this.data;
        let secret = this.secret;
        let token = jwt.sign(data,secret);        
        return token;
    }

    // 校验token
    verifyToken() {
        let token = this.data;
        let secret = this.secret;
        let tok =''
//      let tok=jwt.verify(token, secret)
        console.log(tok)
        return tok;
    }
}

module.exports = Jwt;