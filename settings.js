
module.exports = {
    customCatalogues: [
        {
            type: 'gitlab',
            registryUrl: 'https://gitlab.com',
            registryToken: process.env.NPM_REGISTRY_TOKEN,
            groupPath: 'momentfactory/mofalib',
            packageFilter: 'node-red-contrib'
        }
      ],
    editorTheme: {
        /** The following property can be used to set a custom theme for the editor.
         * See https://github.com/node-red-contrib-themes/theme-collection for
         * a collection of themes to chose from.
         */
        //theme: "",
        palette: {
            /** The following property can be used to order the categories in the editor
             * palette. If a node's category is not in the list, the category will get
             * added to the end of the palette.
             * If not set, the following default order is used:
             */
            //categories: ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],
            catalogues: ['https://catalogue.nodered.org/catalogue.json', './catalogue']
        }
    }
}
