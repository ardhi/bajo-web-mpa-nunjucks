function format (env, value, type = 'string', options) {
  const { i18n } = env.ctx._meta
  if (!i18n) return value
  const { format } = this.app.bajoI18N
  const { lang } = env.ctx._meta
  return format(value, type, lang, options)
}

export default format
