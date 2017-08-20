'use strict';

const event = 'html-webpack-plugin-after-html-processing';

const debug = require('debug')('ScriptExt');

const tidy = require('htmltidy').tidy;

const webpackMerge = require('webpack-merge');

const debugEvent = msg => debug(`${event}: ${msg}`);

class TidyHtmlWebpackPlugin {
  constructor(options)
  {
    this.options = webpackMerge(
      {
        tidy: {
          doctype: 'html5',
          hideComments: true,
          indent: true,
          newBlocklevelTags: 'app-root',
          sortAttributes: 'alpha',
          outputHtml: true,
          tabSize: 2,
          wrap: 0
        },
        disabled: false
      },
      options
    );
  }

  apply(compiler)
  {
    const options = this.options;
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin(event, (htmlPluginData, callback) => {
        try
        {
          debugEvent('emit: starting');
          if (!options.disabled)
          {
            debugEvent('emit: tidying');
            tidy(
              htmlPluginData.html,
              options.tidy,
              (error, html) => {
                if (error)
                {
                  throw error;
                }

                htmlPluginData.html = html;
                callback(null, htmlPluginData);
              }
            );
          }
          debugEvent('emit: completed');
        }
        catch (err)
        {
          callback(err);
        }
      });
    });
  }
}

module.exports = TidyHtmlWebpackPlugin;
