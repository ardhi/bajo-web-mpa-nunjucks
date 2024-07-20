import _path from 'path'

// TODO: cache resolved path
function getFileAndTheme (name) {
  const { resolveTplPath } = this.app.bajo
  const { fs } = this.app.bajo.lib
  const { each, find } = this.app.bajo.lib._
  const cfg = this.config
  const parts = name.split(':')
  const theme = parts.pop() // TODO: what if theme is unavailable
  if (_path.isAbsolute(parts[0])) return { file: parts[0], theme }
  const [ns, path] = name.split(':')
  const themeDef = find(this.themes, { name: theme }) ?? {}
  if (ns === 'comp') {
    const file = this.resolveComponentPath(path, themeDef)
    return { file, theme }
  }
  const framework = themeDef.framework ?? 'default'
  const types = [`${theme}@${framework}`, framework, 'default']
  let file
  let check
  // check override
  each(types, type => {
    check = resolveTplPath(`${this.app.bajo.mainNs}:${path}`, `${this.name}/template/override/${ns}/${type}`)
    if (fs.existsSync(check)) {
      file = check
      return false
    } else {
      if (cfg.traceNoTemplate) this.log.trace('Can\'t find template override: %s (%s)', check, name)
    }
  })
  // check real template
  if (!file) {
    each(types, type => {
      check = resolveTplPath(`${ns}:${path}`, `${this.name}/template/${type}`)
      if (fs.existsSync(check)) {
        file = check
        return false
      } else {
        if (cfg.traceNoTemplate) this.log.trace('Can\'t find real template: %s (%s)', check, name)
      }
    })
  }
  // check real template from theme
  if (!file) {
    each(types, type => {
      check = resolveTplPath(`${themeDef.ns}:${path}`, `${this.name}/template/${type}`)
      if (fs.existsSync(check)) {
        file = check
        return false
      } else {
        if (cfg.traceNoTemplate) this.log.trace('Can\'t find theme\'s template: %s (%s)', check, name)
      }
    })
  }
  if (!file) file = check
  return { file, theme }
}

export default getFileAndTheme
