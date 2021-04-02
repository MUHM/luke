## 写着玩的服务端

### Development

```bash
$ yarn
$ yarn dev
$ open http://localhost:7001/
```

### DB init

```bash
$ yarn migrate
```
### Docker

```bash
$ docker build -t luke/server .
$ docker run --name luke_server -p 7001:7001 -d luke/server
```