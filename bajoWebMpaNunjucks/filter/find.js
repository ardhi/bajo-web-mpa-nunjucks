function find (env, obj, condition) {
  const { find } = this.app.bajo.lib._
  return find(obj, condition)
}

export default find
