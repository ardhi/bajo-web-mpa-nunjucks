function generateId (env, opts = {}) {
  opts.length = opts.length ?? 10
  return this.app.bajo.generateId(opts)
}

export default generateId
