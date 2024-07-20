function omit (env, obj, params = []) {
  const { omit } = this.app.bajo.lib._
  return omit(obj, params)
}

export default omit
