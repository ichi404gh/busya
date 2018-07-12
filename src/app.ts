import * as Koa from 'koa'
import * as Router from 'koa-router'
import bodyparser from 'koa-bodyparser-ts'

import config from './config'
import cnst from './const'
import process from './processUpdate'

const app = new Koa();
app.use(bodyparser())

const router = new Router();

router.post('/' + config.updateUrl, async (ctx) => {
    await process(ctx.request.body)
    ctx.res.statusCode = 200;
})

app.use(router.routes())

app.listen(config.port)

console.log('Server running on port ' + config.port)