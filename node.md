[TOC]

# nodejs

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
```

## 常用方法

#### 获取默认编码为gbk的txt内容

```js
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

##### express

```js
app.use() //中间件=>请求与响应间发生的事

res.json  //响应数据，最常用，返回ajax数据
res.redirect()  //重定向
res.download()  //下载
res.jsonp()  //配合jsonp跨域处理
```

##### koa

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
```



##### 数据库

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

##### token

