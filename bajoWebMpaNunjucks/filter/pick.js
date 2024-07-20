function pick (env, obj, params = []) {
  const { pick } = this.app.bajo.lib._
  return pick(obj, params)
}

export default pick
