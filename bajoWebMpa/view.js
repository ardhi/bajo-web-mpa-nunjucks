import loader from '../lib/engine/loader.js'
import extend from '../lib/engine/extend.js'

async function view (ctx) {
  const me = this
  await loader.call(me)
  for (const type of ['global', 'filter', 'extension']) {
    await extend.call(me, type)
  }

  return {
    name: 'nunjucks',
    fileExts: '.njk'
  }
}

export default view
