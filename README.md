# node-red-custom-catalogue

A Node-RED plugin to access nodes hosted on a private registry.

This plugin will generate a custom node catalog from a private registry and make it available in Node-RED's palette for easy installation. Currently this works with Gitlab hosted packages but could be extended to support other type of registries.

Note: This plugin doesn't deal with registry authentication, you will need to have a proper `.npmrc` file to access your private nodes.

## Installation

```
npm install --save @natcl/node-red-custom-catalogue
```

## Usage

Configuration of this plugin is done via Node-RED's `settings.js` file. A `customCatalogues` array needs to be provided with the different catalogs the user wants. The user will also need to add the `./catalogues` endpoint to the `editorTheme.palette.catalogues` array.

Note: The `registryToken` can be a Gitlab personal access token or deploy token. For a personal access token it will need the `read_api` scope, for a deploy token it will need the `read_package_registry` scope.

## Example

```javascript
{
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
```