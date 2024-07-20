function routePath (env, name, opts = {}) {
  opts.params = env.ctx._meta.params
  return this.routePath(name, opts)
}

export default routePath
