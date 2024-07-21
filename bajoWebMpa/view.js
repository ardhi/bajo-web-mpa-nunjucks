import loader from '../lib/engine/loader.js'
import extend from '../lib/engine/extend.js'

async function view () {
  await loader.call(this)
  for (const type of ['global', 'filter', 'extension']) {
    await extend.call(this, type)
  }
  return {
    name: 'nunjucks',
    fileExts: ['.njk', '.mdnjk']
  }
}

export default view
