import icon from './icon.js'
import mapping from './mapping.js'

async function themes () {
  const { eachPlugins, runHook } = this.app.bajo
  const { virtualDir, assetDir } = this.app.bajoWebStatic
  const cfg = this.config

  const commonScript = []
  if (cfg.virtuals.bootbox) commonScript.push(`${virtualDir(this.name)}/bootbox/bootbox.min.js`)
  if (cfg.virtuals.masonry) commonScript.push(`${virtualDir(this.name)}/masonry/masonry.pkgd.min.js`)
  if (cfg.virtuals.imagesloaded) commonScript.push(`${virtualDir(this.name)}/imagesloaded/imagesloaded.pkgd.min.js`)
  if (cfg.virtuals.tempusDominus) commonScript.push(`${virtualDir(this.name)}/tempus-dominus/js/tempus-dominus.min.js`)
  if (cfg.virtuals.echarts) commonScript.push(`${virtualDir(this.name)}/echarts/echarts.min.js`)
  await runHook(`${this.name}:afterCommonScriptCollect`, commonScript)
  await eachPlugins(async function ({ ns, file, dir }) {
    const path = assetDir(ns) + file.replace(`${dir}/asset`, '')
    commonScript.push(path)
  }, { glob: 'asset/js/autoload/**/*.js', ns: 'bajoWebStatic' })
  await runHook(`${this.name}:afterAllScriptCollect`, commonScript)

  const commonCss = []
  if (cfg.virtuals.icons) commonCss.push(`${virtualDir(this.name)}/icons/font/bootstrap-icons.min.css`)

  const bs5Script = []
  if (cfg.virtuals.jquery) bs5Script.push(`${virtualDir(this.name)}/jquery/jquery.min.js`)
  if (cfg.virtuals.bs5) bs5Script.push(`${virtualDir(this.name)}/bs5/js/bootstrap.bundle.min.js`)
  bs5Script.push(...commonScript)

  const bs5Css = []
  if (cfg.virtuals.bs5) bs5Css.push(`${virtualDir(this.name)}/bs5/css/bootstrap.min.css`)
  bs5Css.push(...commonCss)

  const bs4Script = []
  if (cfg.virtuals.jquery) bs4Script.push(`${virtualDir(this.name)}/jquery/jquery.min.js`)
  if (cfg.virtuals.bs4) bs4Script.push(`${virtualDir(this.name)}/bs4/js/bootstrap.bundle.min.js`)
  bs4Script.push(...commonScript)

  const bs4Css = []
  if (cfg.virtuals.bs4) bs4Css.push(`${virtualDir(this.name)}/bs4/css/bootstrap.min.css`)
  bs4Css.push(...commonCss)

  const themes = [{
    name: 'bootstrap5',
    description: 'Bootstrap 5.3',
    script: bs5Script,
    css: bs5Css,
    icon,
    mapping
  }, {
    name: 'bootstrap4',
    description: 'Bootstrap 4.6',
    script: bs4Script,
    css: bs4Css,
    icon,
    mapping
  }]
  return themes
}

export default themes
