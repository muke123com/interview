[TOC]

# nodejs

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 常用方法

#### 获取默认编码为gbk的txt内容

```js
const iconv = require('iconv-lite');
const iconv = require('fs');
// 获取默认编码为gbk的txt内容
booksModel.getBookContentStream = async (name, encode) => {
    return new Promise(function(resolve, reject) {
        let rs = fs.createReadStream(booksDirPath + name)
            .pipe(iconv.decodeStream('gbk'))
            // .pipe(iconv.encodeStream('utf-8')); 
        var data='';
        rs.on('data',function(trunk){
            data += trunk;
        })
        rs.on('end',function(){
            try {
                let book = data;
                resolve(book);
            }catch (err){
                reject(err);
            }
        })
    })
};
```

#### 搜索文件夹中文件关键字

```js
// 搜索文件夹中文件关键字
const path = require('path');
const fs = require('fs');
let filePath = './books';
let key = '啊啊啊';

class FindFile {
    constructor(){
        
    }
    findFolder(filePath){
        if(!fs.existsSync(filePath)){
            console.log('找不到' + filePath);
            return;
        } 
        let files = fs.readdirSync(filePath)
        for (let i = 0; i < files.length; i++) {
            let f = filePath + '/' + files[i];
            if(isDir(f)) {
                this.findFolder(f)
                continue
            }
            if(isFile(f)) {
                this.findFile(f);
            }
        }
    }
    findFile(filePath){
        let text = fs.readFileSync(filePath); 
        text = text.toString();
        if(key != ""){
            if(text.indexOf(key) != -1){
                text = text.replace(new RegExp(key, 'g'), `****${key}****`)
            }
        }
        console.log(text);
    }
}

function isDir(filePath){
    return fs.statSync(filePath).isDirectory();
}

function isFile(filePath){
    return fs.statSync(filePath).isFile();
}

let f = new FindFile();
f.findFolder(filePath);

```



### 语法

```javascript
process.env   //获取系统变量
```

```js
//fs
fs.writeFile  //写
fs.readFile   //读
fs.writeFileSync  //同步写
fs.readFileSync  //同步读
```

```js
//http
const http = require('http');
let server = http.createServer();
server.on('request', (req,res)=>{
    //req只读 拿属性
    //res只读 调函数
    res.end(233);
});
server.listen(8080,()=>{
    console.log('listen:8080')
})
```

#### express

```js
app.use() //中间件=>请求与响应间发生的事

res.json  //响应数据，最常用，返回ajax数据
res.redirect()  //重定向
res.download()  //下载
res.jsonp()  //配合jsonp跨域处理
```

#### koa

```js
// 1.引入对象
const Koa = require('koa');
// 2.创建服务器对象
let server = new Koa();
// 3.处理响应
server.use((ctx)=>{
    ctx.body = 'koa ok!';
});
// 4.监听端口
server.listen(3000, ()=>{
    console.log(3000)
});


//接收参数
ctx.params.name   // /:name
ctx.query.title   // get
ctx.request.body.username;   // post 

// 使用next() 前台404
await next();
```

​	

#### 数据库

MongoDB

centos中安装

```bash
/etc/yum.repos.d/mongodb.repo 
[mongodb-org]
name=MongoDB Repository
baseurl=https://mirrors.tuna.tsinghua.edu.cn/mongodb/yum/el$releasever/
gpgcheck=0
enabled=1

yum makecache
yum install mongodb-org

mongod --config /usr/mongodb/mongodb.conf
```

```bash
/usr/mongodb/mongodb.conf 中配置

port=27017 #端口  
dbpath= /usr/mongodb/db #数据库存文件存放目录  
logpath= /usr/mongodb/mongodb.log #日志文件存放路径  
logappend=true #使用追加的方式写日志  
fork=false #不以守护程序的方式启用，即不在后台运行  
maxConns=100 #最大同时连接数  
noauth=true #不启用验证  
journal=true #每次写入会记录一条操作日志（通过journal可以重新构造出写入的数据）。
#即使宕机，启动时wiredtiger会先将数据恢复到最近一次的checkpoint点，然后重放后续的journal日志来恢复。
storageEngine=wiredTiger  #存储引擎有mmapv1、wiretiger、mongorocks
```

#### token(learn_node->model/jwt)

1. 登陆时，客户端发送用户名密码
2. 服务端验证用户名密码是否正确，校验通过就会生成一个有时效的token串，发送给客户端
3. 客户端储存token,一般都会存储在localStorage或者cookie里面
4. 客户端每次请求时都带有token，可以将其放在请求头里，每次请求都携带token
5. 服务端验证token，所有需要校验身份的接口都会被校验token，若token解析后的数据包含用户身份信息，则身份验证通过，返回数据

##### Payload

```js
iss(issuer): 签发人
exp (expiration time): 过期时间
sub (subject): 主题
aud (audience): 受众
nbf (Not Before): 生效时间
iat (Issued At): 签发时间
jti (JWT ID): 编号
```


