## 写在前面
最近在上数据挖掘这门课，老师说课余时间可以玩玩爬虫，爬一爬数据做做个简单的分析啥的，而且老师推荐的python，可惜不会，现在再去新学一门语言太耗费经历了，而且贪多嚼不烂。然后就想着用nodejs试试。

## 准备环境

当然是node环境了，最好是node6.5以上吧，node这一年更新的有点快...好像其他的没什么需要弄的，最不济有记事本加dos也行啊...

## 引入包
### cheerio
用来做页面的解析

```npm install cheerio --save```
### superagent
一款轻量级的ajax api,用起来非常方便,可以发送get、post、delete等等请求

```npm install superagent```
### eventproxy
可以做小型的并发控制

```npmm install eventproxy --save```
## 运行

```node app.js```

然后打开浏览器，地址栏输入127.0.0.1:3000(如果看得不顺眼可以下一个jsonview)

