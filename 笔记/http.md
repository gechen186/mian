### 1.常见的 http headers

- Accept：浏览器可接收的数据格式
- Accept-Encoding：浏览器可接收的压缩算法，如：gzip
- Accept-languang：浏览器接收的语言，如：zn-CN
- Connection：keep-alive 一次 TCP 连接重复使用，一次连接多次使用
- UA：浏览器信息
- Content-type： 发送数据的格式，如 application/json，post 发送数据的时候才会有
- cookie：本地信息
- Host：当前网址

### 2. 常见的 Respones headers

- Content-type： 返回数据的格式，如 application/json
- Content-legth： 返回数据的大小，多少字节
- Content-Encoding：返回数据的压缩算法，如：gzip
- Set-cookie：服务端通过 Set-cookie 来设置客户端的 cookie

### 3. 自定义 header

```
举例：axios
      headers:{
        'xxxxxxx':'xxxxxx'
      }
```

### 4. 缓存相关的 headers

- Cache-control : Expres
- Last-Modified : If-Modified-Since
- Etag : If-None-Match

### 5. GET 和 POST 区别

1. GET 请求有 URL长度限制，而 POST请求会把参数和值放到请求体里，没有长度限制
2. GET 会主动被浏览器 cache
3. GET 请求发送过程中会产生一个 TCP数据包，而 POST会发送两TCP数据包，GET 请求时浏览器会把 http header与 data一起发送出去，
而 POST会先发送 http header，服务器响应 100 continue后在发送 data

### 6. HTTP 1.0 / 1.1 / 2.0 区别
- 1.0
  - 1


### 7. HTTPS 的工作原理
- HTTP + SSL/TSL = HTTPS  HTTPS是 非对称密钥+对称密钥的组合
- 非对称密钥 速度慢，对称秘钥不安全（可能中间被截获）
- HTTP 三次握手后，浏览器发起请求至服务器的443端口，请求中携带了浏览器支持的加密算法和哈希算法
- 服务器收到请求后，选择浏览器支持的加密算法和哈希算法
- 服务器下载数字证书返还浏览器
- 浏览器内置的 TLS进入数字证书认证
  - 首先浏览器在内置的证书列表中查找证书的对应机构，若没找到，则会提示证书非权威机构颁发，不可信任，若找到则取出该证书机构对应的公钥
  - 用机构公钥解密得到证书的内容和签名，内容包括：网站网址，网站的公钥，证书有效期。
  - 浏览器生成一个随机数 R，并用网站公钥（非对称加密）对 R进行加密
- 浏览器将加密（非对称加密）的 R传送到服务器
- 服务器用自己的私钥解密得到 R（R为对称加密算法的基础秘钥）
- 服务器以 R为秘钥使用了 对 称加密算法 加密将内容传输给浏览器
- 浏览器以 R为秘钥使用之前约定好的解密算法获取网页内容

