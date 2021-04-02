## 写着玩的服务端

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

### DB init
mysql与postgres已经过测试，因id自增问题，暂时未兼容mssql，需手动初始化
```bash
$ yarn migrate 
```
### Docker

```bash
$ docker build -t luke/server .
$ docker run --name luke_server -p 7001:7001 -d luke/server
```