import nunjucks from 'nunjucks'
import path from 'path'

const inBetween = (str, quote = '"') => {
  const matches = str.split(quote)
  return matches[1]
}

async function loader () {
  const { fs } = this.app.bajo.lib
  const { get, cloneDeep, omit } = this.app.bajo.lib._
  const cfg = this.config
  const mdParse = get(this, 'app.bajoMarkdown.parse')
  const me = this

  const Loader = nunjucks.Loader.extend({
    getSource: function (name) {
      const { file, theme } = me.getFileAndTheme(name)
      let source = fs.readFileSync(file, 'utf8')
      if (mdParse && path.extname === '.mdnjk') source = mdParse(source)
      const sources = source.split('\n')
      const tags = ['{% extends', '{% include', '{% import', '{% from', '{%extends', '{%include', '{%import', '{%from']
      for (const i in sources) {
        const s = sources[i]
        let found = false
        for (const t of tags) {
          if (s.includes(t)) found = true
        }
        if (!found) continue
        let link = inBetween(s)
        if (!link) link = inBetween(s, "'")
        if (!link) continue
        sources[i] = s.replace(link, link + ':' + theme)
      }
      source = sources.join('\n')
      return { src: source, path: file, noCache: cfg.nunjucks.noCache }
    }
  })

  const opts = cloneDeep(omit(cfg.nunjucks, ['web', 'express']))
  opts.autoescape = false
  const env = new nunjucks.Environment(new Loader(), opts)
  env.runtime = nunjucks.runtime
  me.instance = env
}

export default loader
