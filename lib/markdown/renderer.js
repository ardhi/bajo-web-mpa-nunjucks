async function renderer () {
  const cfg = this.config
  return {
    table (header, body) {
      return `
        <table class="${cfg.markdown.tableClass}">
          <thead class="${cfg.markdown.tableHeadClass}">${header}</thead>
          <tbody class="${cfg.markdown.tableBodyClass}">${body}</tbody>
        </table>
        `
    }
  }
}

export default renderer
