const pageArr = ['index','finance','depth']
let pluginsConfig = []
pageArr.forEach((page) => {
  const htmlPlugin = new HtmlWebpackPlugin({
    filename: `${page}/index.html`, // page变量形如'product/index'、'product/detail'
    template: path.resolve(dirVars.pagesDir, `./${page}/html.js`),
    chunks: [page, 'commons/commons'],
    hash: true,
    xhtml: true,
  });
  pluginsConfig.push(htmlPlugin);
});
export default pluginsConfig
