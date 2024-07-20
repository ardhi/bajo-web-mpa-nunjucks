async function theme () {
  const { eachPlugins, readConfig, join } = this.app.bajo
  const { each, isPlainObject, isString, find, pullAt, map, filter, clone, concat, isArray, merge } = this.app.bajo.lib._
  const all = []
  await eachPlugins(async function ({ file, ns }) {
    let mods = await readConfig(file, { ns, defValue: [] })
    if (isPlainObject(mods)) mods = [mods]
    each(mods, m => {
      m.framework = m.framework ?? m.name
      m.ns = ns
      if (isString(m.css)) m.css = [m.css]
      if (isString(m.script)) m.script = [m.script]
      all.push(m)
    })
  }, { glob: 'theme/index.*', baseNs: this.name })
  // dropped if no framework installed
  const deleted = []
  each(all, (a, i) => {
    if (!find(all, { name: a.framework })) deleted.push([i, a.name])
  })
  if (deleted.length > 0) {
    pullAt(all, map(deleted, d => d[0]))
    this.log.warn('No matching framework found for these themes, skipped: %s', join(map(deleted, d => d[1])))
  }
  // merge script/css
  const items = filter(all, a => a.name !== a.framework)
  each(items, (item, i) => {
    const framework = find(all, { name: item.framework })
    item.useFramework = item.useFramework ?? []
    each(['script', 'css', 'icon', 'mapping'], type => {
      if (item.useFramework.includes(type)) {
        if (isArray(framework[type])) item[type] = concat(clone(framework[type] ?? []), clone(item[type] ?? []))
        else if (isPlainObject(framework[type])) item[type] = merge({}, item[type], framework[type])
      }
    })
    delete item.useFramework
    items[i] = item
  })
  // TODO: check the uniqness of names & frameworks
  this.log.debug('%d theme(s) loaded: %s', all.length, join(map(all, a => a.name)))
  this.themes = all
}

export default theme
