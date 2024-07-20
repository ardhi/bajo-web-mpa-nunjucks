# bajo-web-mpa-view

Plugin name: **bajoWebMpaView**, alias: **mpaview**

![GitHub package.json version](https://img.shields.io/github/package-json/v/ardhi/bajo-web-mpa-view) ![NPM Version](https://img.shields.io/npm/v/bajo-web-mpa-view)

> <br />**Attention**: I do NOT accept any pull request at the moment, thanks!<br /><br />

Multi Pages App (View Engine) in Web framework for [Bajo Framework](https://github.com/ardhi/bajo).

## Installation

Goto your ```<bajo-base-dir>``` and type:

```bash
$ npm install bajo-web-mpa-view
```

Now open your ```<bajo-data-dir>/config/.plugins``` and put ```bajo-web-mpa-view``` in it

## Hooks

- ```bajoWebMpaNunjucks:afterBuildLocals (locals, req)```
- ```bajoWebMpaNunjucks.<routeOpts.ns>:afterBuildLocals (locals, req)```


## License

[MIT](LICENSE)
