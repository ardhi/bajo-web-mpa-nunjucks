function getConfig (env, ns, opts) {
  return this.app[ns].getConfig(opts)
}

export default getConfig
