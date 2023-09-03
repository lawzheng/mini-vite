const Koa = require('koa')
const fs = require('fs')
const path = require('path')
const app = new Koa();

app.use(async ctx => {
  const { url, query } = ctx;
  console.log('url:', url)
  // index.html
  if (url === '/') {
    ctx.type = 'text/html'
    let content = fs.readFileSync('./index.html', 'utf-8')
    // 加环境变量
    content = content.replace('<script', `
    <script>
      window.process = { env: { NODE_ENV: 'dev' } } 
    </script>
    <script`)
    ctx.body = content
  }
  // *.js
  else if (url.endsWith('.js')) {
    const p = path.resolve(__dirname, url.slice(1))
    const content = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(content)
  }
  // 第三方库
  else if (url.startsWith('/@modules')) {
    const prefix = path.resolve(
      __dirname,
      'node_modules',
      url.replace('/@modules/', '')
    )
    const module = require(prefix + '/package.json').module;
    const p = path.resolve(prefix, module)
    const content = fs.readFileSync(p, 'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(content)
  }

  function rewriteImport(content) {
    return content.replace(/ from ['|"]([^'"]+)['|"]/g, function (s0, s1) {
      if (s1[0] !== '.' && s1[1] !== '/') {
        return ` from '/@modules/${s1}'`
      } else {
        return s0
      }
    })
  }
})

app.listen(3000, () => {
  console.log('vite start at 3000')
})