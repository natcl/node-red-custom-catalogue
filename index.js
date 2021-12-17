module.exports = function(RED) {
  const got = require('got')
  const PLUGIN_TYPE_ID = "node-red-contrib-custom-catalog";

  class CustomCatalog {
    constructor() {
      this.type = PLUGIN_TYPE_ID
      this.config = RED.settings.customCatalogs
      RED.httpAdmin.get('/catalog', async (req, res, next) => {
        const packages = await this.getAllPackages(this.config)
        const catalog = {
          name: 'Custom Catalog',
          updated_at: Date.now(),
          modules: packages
        }  
        res.end(JSON.stringify(catalog, '', 2))
      })
    }

    async getAllPackages(_config) {
      let allPackages = []
      for (let config of _config) {
        if (config.type === 'gitlab') {
          let packages = await this.getGitlabPackages("", [], config)
          packages = packages.filter(p => p.tags.nodes.map(t => t.name).includes('latest')).map(pp => {
            return {
              id: pp.name,
              version: pp.version,
              description: pp.project.description,
              updated_at: pp.updatedAt
            }
          })
          allPackages = allPackages.concat(packages)
        }
      }
      return allPackages
    }

    async getGitlabPackages(cursor = "", packages = [], config) {
      const query = `
      {
        group(fullPath: "${config.groupPath}") {
          packages(packageType: NPM, packageName: "${config.packageFilter}", after: "${cursor}") {
            pageInfo {
              endCursor
              hasNextPage
              hasPreviousPage
            }
            nodes {
              name
              version
              updatedAt
              tags {
                nodes {
                  name
                }
              }
              project {
                description
              }
            }
          }
        }
      }`
      try {
        const {data} = await got.post(`${config.registryUrl}/api/graphql`, {
          json: {
            query: query
          },
          headers: {
            Authorization: `Bearer ${config.registryToken}`
          }
        }).json();
        
        packages = packages.concat(data.group.packages.nodes)
        
        if (data.group.packages.pageInfo.hasNextPage) {
          return getPackages(data.group.packages.pageInfo.endCursor, packages, config)
        } else {
          return packages
        }
      } catch (error) {
        console.error(error)
      }
    }
  }
  
  RED.plugins.registerPlugin(PLUGIN_TYPE_ID, {
      type: PLUGIN_TYPE_ID,
      onadd: new CustomCatalog()
  })
}