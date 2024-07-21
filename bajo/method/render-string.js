async function renderString (text, params = {}) {
  return await this.instance.renderString(text, params)
}

export default renderString
