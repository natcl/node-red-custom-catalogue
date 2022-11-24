
module.exports = {
  customCatalogues: [
    {
      type: 'gitlab',
      registryUrl: 'https://gitlab.com',
      registryToken: process.env.NPM_REGISTRY_TOKEN,
      groupPath: 'myorg/mynodes',
      packageFilter: 'node-red-contrib'
    }
  ],
  editorTheme: {
    palette: {
      catalogues: ['https://catalogue.nodered.org/catalogue.json', './catalogue']
    }
  }
}
