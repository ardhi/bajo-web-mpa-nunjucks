function json (env, value, ...args) {
  const { sprintf } = this.app.bajo
  return sprintf(value, ...args)
}

export default json
