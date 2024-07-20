async function renderString (text, locals = {}) {
  return await this.instance.renderString(text, locals)
}

export default renderString
