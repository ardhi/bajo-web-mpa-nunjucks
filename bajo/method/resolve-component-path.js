import fs from 'fs'
import path from 'path'

const selfClosing = ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr']

function resolveComponentPath (name, theme, useCustom) {
  const { isEmpty } = this.app.bajo.lib._
  if (isEmpty(path.extname(name))) name += '.njk'
  let dir = this.app[theme.plugin].dir.pkg
  let item = `${dir}/bajoWebMpa/component/${theme.name}/${name}`
  if (!fs.existsSync(item)) { // is it in theme?
    const t = this.themes.find(i => i.name === theme.framework)
    if (t) {
      dir = this.app[t.plugin].dir.pkg
      item = `${dir}/bajoWebMpa/component/${t.name}/${name}`
    }
  }
  if (!fs.existsSync(item)) { // is it in framework?
    dir = this.config.dir.pkg
    item = `${dir}/bajoWebMpa/component/common/${name}`
  }
  if (!fs.existsSync(item)) {
    if (!useCustom) return
    const base = path.basename(item, path.extname(item))
    item = `${dir}/bajoWebMpa/component/common/${selfClosing.includes(base) ? '_any-void.njk' : '_any.njk'}`
  }
  return item
}

export default resolveComponentPath
