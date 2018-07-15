import * as Koa from 'koa'
import * as Router from 'koa-router'
import bodyparser from 'koa-bodyparser-ts'

import config from './config'
import { ModuleLoader } from './modules';
import PuckTrigger from './modules/PuckTrigger';
import TyanTrigger from './modules/TyanTrigger';
import RollModule from './modules/RollModule';

const app = new Koa();
app.use(bodyparser())

const router = new Router();

const modules = new ModuleLoader([
    new PuckTrigger(),
    new TyanTrigger(),
    new RollModule(),
])

router.post('/' + config.updateUrl, async (ctx) => {
    modules.ReceiveUpdate(ctx.request.body)
    ctx.res.statusCode = 200;
})

app.use(router.routes())

app.listen(config.port)

console.log('Server running on port ' + config.port)