// This is the actual metalsmith configuration script.
import Metalsmith from 'metalsmith'
import markdown from 'metalsmith-markdownit'
import layouts from 'metalsmith-layouts'
import metadata from 'metalsmith-metadata'
import collections from 'metalsmith-collections'
import assets from 'metalsmith-assets'
import fingerprint from 'metalsmith-fingerprint-ignore'
import writemetadata from 'metalsmith-writemetadata'
import sitemap from 'metalsmith-sitemap'
import Handlebars from 'handlebars'
import hbsHelpers from './handlebars-helpers'

import paths from '../config/paths'
import { StatisticsPlugin } from './metalsmith-helpers'

const __PROD__ = process.env.NODE_ENV === 'production'

exports.test = 'test'

exports.create = () => {
  hbsHelpers.register()
  return new Metalsmith(paths.projectRoot)
    .source(paths.metalsmithSource)
    .destination(paths.metalsmithDestination)
    .clean(true)
    .use(metadata({
      site: 'metadata/site.json'
    }))
    .use(assets({
      source: './dist/assets',
      destination: './assets'
    }))
    .use(fingerprint({ pattern: 'assets/page.css' }))
    .use(fingerprint({ pattern: 'assets/immediate.js' }))
    .use(fingerprint({ pattern: 'assets/page.js' }))
    .use(fingerprint({ pattern: 'assets/normalize.css' }))
    .use(fingerprint({ pattern: 'assets/skeleton.css' }))
    .use(fingerprint({ pattern: 'assets/wanderlust.css' }))
    .use(collections({
      pages: {
        pattern: 'pages/*.md'
      },
      photographs: {
        pattern: 'photographs/**/*.md',
        sortBy: 'createdDate',
        reverse: true
      },
      places: {
        pattern: 'places/**/*.md'
      }
    }))
    .use(writemetadata({
      pattern: ['**/*.html'],
      ignorekeys: ['next', 'previous'],
      bufferencoding: 'utf8',
      collections: {
        photographs: {
          output: {
            path: 'content/photographs.json',
            asObject: true,
            metadata: {
              type: "list"
            }
          },
          ignorekeys: ['contents', 'next', 'previous']
        }
      }
    }))
    .use(markdown({
      html: true
    }))
    .use(layouts({
      engine: 'handlebars',
      default: 'default.html',
      partials: 'partials',
      // to avoid conflics, we match only html files
      pattern: '**/*.html',
      helpers: {
        // Neat little handlebars debugger
        // Usage example: <pre>{{debug this}}</pre>
        debug: (obj) => JSON.stringify(obj, null, 2)
      }
    }))
    .use(sitemap({
      hostname: 'http://wanderlust.reisen'
    }))
    // Display statistics of generated files at the end
    .use(StatisticsPlugin())
    // Import above and use the debug plugin to get more detailed information
    // .use(DebugPlugin())

}
