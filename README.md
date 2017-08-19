Tidy HTML for HTML Webpack Plugin
=================================

Very bare bones HTML tidy plugin for HTML webpack plugin.

Enhances [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin)
functionality by using [htmltidy](https://github.com/vavere/htmltidy) after processing HTML

Can be used in conjunction with other plugins for html-webpack-plugin.

Installation
------------
You must be running webpack (1.x, 2.x or 3.x) on node 4+.

Install the plugin with npm:
```shell
npm install --save-dev tidy-html-webpack-plugin
```

Basic Usage
-----------
Add the plugin to your webpack config as follows:

```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin()
]
```
The order is important - the plugin must come **after** HtmlWebpackPlugin.

The above configuration will tidy the HTML to the default configuration spec.


Configuration
-------------

Configuration offers more granular control:

See full documentation at [tidy.sourceforge.net](http://tidy.sourceforge.net/docs/quickref.html)

In general, all options in documentation in the format 'hide-comments', can be used in the 'tidy' property of the config as lower camel case 'hideComments'

eg.
```javascript
let config = {
  tidy: {
    hideComments: true,
    tabSize: 2
  }
};
```

Default plugin configuration (also htmltidy's defaults):
```javascript
{
  tidy: {
    doctype: 'html5',
    hideComments: true,
    indent: true,
    newBlocklevelTags: 'app-root',
    sortAttributes: 'alpha',
    tabSize: 2,
    wrap: 0
  },
  disabled: false,
}
```

Important
---------

The tidy plugin will remove any unknown html tags from your html, so to prevent this from happening you must add any new tag names to either the 'newBlocklevelTags', 'newInlineTags' or 'newEmptyTags', depending on the tag spec, to the 'tidy' part of the config.

Use case:

If your angular/react app contains the root element as a &lt;app-root&gt;&lt;/app-root&gt; tag, HtmlTidy won't recognise it as a tag and will remove it.

To prevent this just add it to the config like this and html tidy will format it as such:
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin({
    tidy: {
      newBlocklevelTags: 'app-root'
      // or comma separated for multiple
      // 'app-header, app-body, app-footer'
    }
  })
]
```

Configuration Examples
---------------------

Change tab size:
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin({
    tidy: {
      indent: true,
      tabSize: 2
    }
  })
]
```

Remove comments:
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin({
    tidy: {
      hideComments: true
    }
  })
]
```

Sort attributes:
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin({
    tidy: {
      sortAttributes: 'alpha'
    }
  })
]
```

Disable plugin (useful for dynamic configuration setups):
```javascript
plugins: [
  new HtmlWebpackPlugin(),
  new TidyHtmlWebpackPlugin({
    disable: true
  })
]
```

Testing
=======

Tests and improvements to come..

PR's welcome!
