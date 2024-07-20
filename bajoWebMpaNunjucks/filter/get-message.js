function getMessage (env, obj = {}, field) {
  const { find, isArray } = this.app.bajo.lib._
  if (isArray(obj)) obj = obj[obj.length - 1]
  const item = find(obj.details ?? [], { field })
  return item ? item.error : undefined
}

export default getMessage
