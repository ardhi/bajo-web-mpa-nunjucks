import getAttr from './component/get-attr.js'

const excludes = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6']

class Component {
  constructor (plugin) {
    this.plugin = plugin
    this.tags = ['comp']
  }

  parse (parser, nodes, lexer) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    const body = parser.parseUntilBlocks('endcomp')
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'run', args, [body])
  }

  run (context, ...args) {
    // const callback = args.pop()
    try {
      const { kebabCase, get, find } = this.plugin.app.bajo.lib._
      const { fs } = this.plugin.app.bajo.lib
      const body = args.pop()
      let name = args.shift()
      if (!excludes.includes(name)) name = kebabCase(name)
      const file = this.plugin.resolveComponentPath(name, context.ctx._meta.theme, true)
      const { form, error, _meta, schema } = context.ctx ?? {}
      const { theme } = _meta
      let handler = get(this.plugin, `app.${theme.ns}.getAttrHandler.exec`)
      let themeName = theme.name
      if (!handler) {
        const parent = find(this.plugin.themes, { name: theme.framework })
        themeName = parent.name
        handler = get(this.plugin, `app.${parent.ns}.getAttrHandler.exec`)
      }
      if (handler) handler = handler(themeName)
      const { attr, attributes, params } = getAttr.call(this, { name, context, args }, handler)
      const locals = { cmp: name, params, attr, attributes, content: body(), form, error, _meta, schema }
      const fragment = fs.readFileSync(file, 'utf8').replaceAll('\r', '') // TODO: replace new line inside the brackets only
      return context.env.renderString(fragment, locals)
    } catch (err) {
      console.log(err)
      return ''
    }
  }
}

function component (plugin) {
  return new Component(plugin)
}

export default component
