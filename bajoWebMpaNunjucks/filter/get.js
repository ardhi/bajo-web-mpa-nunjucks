function get (env, obj = {}, key, def) {
  const { get } = this.app.bajo.lib._
  return get(obj, key, def)
}

export default get
