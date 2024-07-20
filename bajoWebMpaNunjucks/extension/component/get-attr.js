function parseAsClass (text) {
  const { trim } = this.plugin.app.bajo.lib._
  const separator = text.includes(',') ? ',' : ' '
  return text.split(separator).map(c => trim(c))
}

function parseAsStyle (text) {
  const { trim, camelCase } = this.plugin.app.bajo.lib._
  const parts = text.split(';').map(s => trim(s))
  const style = {}
  parts.forEach(p => {
    const [k, v] = p.split(':').map(s => trim(s))
    style[camelCase(k)] = v
  })
  return style
}

function stringifyStyle (obj) {
  const { forOwn, kebabCase } = this.plugin.app.bajo.lib._
  const styles = []
  forOwn(obj, (v, k) => {
    styles.push(`${kebabCase(k)}:${v}`)
  })
  return styles.join(';')
}

function getAttr ({ name, context, args } = {}, { parseForClass, selectAttr, preProcess, postProcess } = {}) {
  const { isSet } = this.plugin.app.bajo
  const { omit, kebabCase, isEmpty, isArray, isString, get, concat, merge } = this.plugin.app.bajo.lib._
  const attr = omit(args.pop() ?? {}, ['__keywords'])
  // normalize classes
  attr.class = attr.class ?? []
  if (isString(attr.class)) attr.class = parseAsClass.call(this, attr.class)
  // normalize styles
  attr.style = attr.style ?? {}
  if (isString(attr.style)) attr.style = parseAsStyle.call(this, attr.style)

  const params = [...args].filter(a => isString(a)).map(a => kebabCase(a))
  let attributes = []
  const deleted = []
  if (preProcess) preProcess.call(this, { name, attr, context, args })
  for (const k in attr) {
    if (!isSet(attr[k])) {
      deleted.push(k)
      continue
    }
    if (parseForClass) {
      const item = parseForClass.call(this, { name, key: k, attr, context, args })
      if (name !== 'column' && item) {
        deleted.push(k)
        continue
      }
    }
    if (['class', 'style', 'classBase'].includes(k) || !isSet(attr[k])) continue
    if (selectAttr) {
      const ret = selectAttr.call(this, { name, key: k, attr, context, args })
      if (ret) continue
    }
    const key = kebabCase(k)
    if (name !== 'column' && attr[k] !== Object(attr[k])) {
      if (attr[k] === true) {
        attributes.push(`${key}`)
      } else if (attr[k] !== false) {
        const quote = isString(attr[k]) && attr[k].includes('"') ? '\'' : '"'
        attributes.push(`${key}=${quote}${attr[k]}${quote}`)
      }
    }
  }
  attributes = attributes.join(' ')
  // post process, if any
  if (postProcess) postProcess.call(this, { name, attr, context, args })
  if (attr.name) {
    attr.id = attr.id ?? `f-${attr.name}`
    // attr.label = attr.label ?? print.__(`field.${attr.name}`, {}, { ns: [context.ctx._meta.ns, 'bajoDb', 'bajoWebMpa'] })
  }
  // denormalize styles
  let style = get(context, `ctx._meta.theme.component.${name}.style`, {})
  if (isString(style)) style = parseAsStyle.call(this, style)
  attr.style = merge(attr.style, style)
  if (!isEmpty(attr.style)) attr.style = stringifyStyle.call(this, attr.style)
  else delete attr.style
  // denormalize classes
  let cls = get(context, `ctx._meta.theme.component.${name}.class`, [])
  if (isString(cls)) cls = parseAsClass.call(this, cls)
  attr.class = concat(attr.class, cls)
  if (!isEmpty(attr.class)) attr.class = ' ' + (isArray(attr.class) ? attr.class.join(' ') : attr.class)
  else delete attr.class
  return { attr, attributes, params }
}

export default getAttr
