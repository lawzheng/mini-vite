const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa();

app.use(async ctx => {
  const { url, query } = ctx;
  console.log('url:', url)
  if (url === '/') {
    ctx.type = 'text/html'
    const content = fs.readFileSync('./index.html', 'utf-8')
    ctx.body = content
  } else if(url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    const content = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = content
  }
})

app.listen(3000, () => {
  console.log('vite start at 3000')
})