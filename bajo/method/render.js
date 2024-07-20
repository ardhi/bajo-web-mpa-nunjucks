async function render (name, params, reply) {
  const locals = await this.buildLocals(name, params, reply)
  return await this.instance.render(`${name}:${reply.request.theme ?? ''}`, locals)
}

export default render
