function is (env, value, method) {
  const { isSet, pascalCase } = this.app.bajo
  method = `is${pascalCase(method)}`
  if (method === 'isSet') return isSet(value)
  return this.app.bajo.lib._[method](value)
}

export default is
