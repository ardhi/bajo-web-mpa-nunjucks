function map (env, obj = [], handler) {
  const { map } = this.app.bajo.lib._
  return map(obj, handler)
}

export default map
