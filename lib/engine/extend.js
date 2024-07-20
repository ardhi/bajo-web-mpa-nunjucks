import path from 'path'

async function extend (type) {
  const { eachPlugins, importModule } = this.app.bajo
  const { isFunction, camelCase } = this.app.bajo.lib._
  const me = this
  await eachPlugins(async function ({ file, ns }) {
    const fname = path.basename(file, path.extname(file))
    const name = camelCase(ns === me.name ? fname : `${ns} ${fname}`)
    let mod = await importModule(file)
    if (isFunction(mod) && mod.length === 0) mod = await mod.call(this)
    if (isFunction(mod)) {
      const old = mod
      mod = function (...args) {
        return old.call(this, me.instance, ...args)
      }
    }
    me.instance[camelCase(`add ${type}`)](name, mod)
  }, { glob: `${type}/*.js`, baseNs: me.name })
}

export default extend
