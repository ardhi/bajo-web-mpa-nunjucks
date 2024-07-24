class Script {
  constructor (plugin, cheerio) {
    this.plugin = plugin
    this.cheerio = cheerio
    this.tags = ['script']
  }

  parse (parser, nodes, lexer) {
    const token = parser.nextToken()
    const args = parser.parseSignature(null, true)
    parser.advanceAfterBlockEnd(token.value)

    const body = parser.parseUntilBlocks('endscript')
    parser.advanceAfterBlockEnd()
    return new nodes.CallExtension(this, 'run', args, [body])
  }

  run (context, ...args) {
    const { isEmpty } = this.plugin.app.bajo.lib._
    const body = args.pop()
    const $ = this.cheerio.load(body())
    let content = $('script').text()
    if (isEmpty(content)) content = body()
    context.ctx._meta.script = context.ctx._meta.script ?? []
    context.ctx._meta.script.push(...content.split('\n'))
  }
}

async function script () {
  const { importPkg } = this.app.bajo
  const cheerio = await importPkg('bajoWebMpa:cheerio')
  return new Script(this, cheerio)
}

export default script
