function set (env, obj = {}, key, def) {
  const { set } = this.app.bajo.lib._
  return set(obj, key, def)
}

export default set
