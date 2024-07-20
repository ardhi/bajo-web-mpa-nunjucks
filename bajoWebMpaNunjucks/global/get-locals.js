function getLocals (env, key) {
  const { get } = this.app.bajo.lib._
  if (!key) return env.ctx
  return get(env, `ctx.${key}`)
}

export default getLocals
