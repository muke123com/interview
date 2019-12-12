[TOC]

# nodejs

```bash
npm install -g cnpm --registry=https://registry.npm.taobao.org
npm install --production   // 正式环境不下载devDependencies文件
```

## 常用方法

#### 获取默认编码为gbk的txt内容

```js
const iconv = require('iconv-lite');
const fs = require('fs');
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

### node自动添加路由

```js
const glob = require('glob')
// routes
glob('routes/*.js', (err, files) => {
  files.map(item => {
    const r = require(`./${item}`)
    app.use(r.routes(), r.allowedMethods())
  })
})
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

#### crypto

```js
// md5加密
md5Sign (data) {
    var md5 = crypto.createHash('md5').update(data).digest('hex');
    return md5;
}
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
ctx.header.token    //header

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



#### typeorm

##### entity修饰符

```typescript
@Entity()
@Index(['category'])  //定义索引
export class Article {
  @PrimaryGeneratedColumn() id: number

  /** 标题 */
  @Column() title: string

  /** 内容 */
  @Column('text') content: string

  /** 概要 */
  @Column() summary: string

  /** 缩略图 */
  @Column() thumbnail: string

  /** 创建时间 */
  @CreateDateColumn() createdAt: string

  /** 更新时间 */
  @UpdateDateColumn() updatedAt: string

  /** 原文链接 */
  @Column() sourceUrl: string

  /** 推送到头条的时间 */
  @Column('datetime', { nullable: true })
  headlineTime?: Date

  /** 用户 ID */
  @Column({ nullable: true })
  uid?: number

  /** 分类 ID */
  @Column() categoryId: number

  @OneToOne(type => User)
  @JoinColumn({ name: 'uid' })
  user?: User

  @OneToOne(type => Category)
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @OneToMany(type => Comment, comment => comment.article)
  comments: Comment[]

  @ManyToMany(type => Game, game => game.articles)
  @JoinTable()
  games: Game[]

  @OneToMany(type => ArticleReadersUser, item => item.article)
  readers?: ArticleReadersUser[]

  @RelationCount((article: Article) => article.readers, 'readers', qb =>
    qb.andWhere('readers.like=:like', { like: true })
  )
  likeCount: number

  @RelationCount((artile: Article) => artile.comments)
  commentCount: number


  @BeforeInsert()
  insertSummaryAndThumbnail(): void {
    this.summary = this.summary || this.content.replace(/<[^>]+>/g, '').slice(0, 120)
  }

  @BeforeUpdate()
  updateSummaryAndThumbnail(): void {
    this.summary = this.summary || this.content.replace(/<[^>]+>/g, '').slice(0, 120)
  }
}
```

#### egg(node框架)

```bash
npm init egg --type=simple  # 初始化项目
```

##### mysql 配置

```js
// config/plugin.js
mysql: {
     enable: true,
     package: 'egg-mysql',
}

// config/config.default.js
config.mysql = {
    // 单数据库信息配置
    client: {
      // host
      host: '127.0.0.1',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'm_blog',
},
this.app.mysql.query(sql)  // 使用
```

##### 中间件配置

```js
// config/config.default.js
config.middleware = ['test'];   // 默认会影响所有路由
config.test = {
    enable: true, // 是否开启该中间件，不写默认开启
    match: ['/fetch'], // 只匹配指定路由，反之如果只忽略指定路由，可以用ignore
    // ignore: ['/'] // 不要与match一起使用，避免冲突
}
```

