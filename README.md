CKFinder 3 - Sample Plugins
===========================

This folder contains sample plugins for CKFinder 3. 

To learn about writing your own plugins, read the [Creating Plugins](http://docs.cksource.com/ckfinder3/#!/guide/dev_plugins) article in the CKFinder 3 documentation.

Loading Plugins
---------------

To run sample plugins:

1. Download sample plugins and extract them to the `<ckfinder>/plugins` folder. You can download plugins:
 - Using `git`.
 - By pressing the [Download ZIP](https://github.com/ckfinder/ckfinder-docs-samples/archive/master.zip) button.
2. Enable selected plugins with the [`config.plugins`](http://docs.cksource.com/ckfinder3/#!/api/CKFinder.Config-cfg-plugins) option.

#### Example

```js
<script src="/ckfinder/ckfinder.js"></script>
<div id="ckfinder1"></div>
<script>
	CKFinder.widget( 'ckfinder1', {
		width: 800,
		height: 700,
		plugins: [
			'StatusBarInfo'
		]
	} );
</script>
```

Note: In CKFinder 3 it is possible to load plugins from a URL, so you can point your CKFinder straight to the plugin on GitHub!

```js
<script src="/ckfinder/ckfinder.js"></script>
<div id="ckfinder1"></div>
<script>
	CKFinder.widget( 'ckfinder1', {
		width: 800,
		height: 700,
		plugins: [
			'https://raw.githubusercontent.com/ckfinder/ckfinder-docs-samples/master/StatusBarInfo/StatusBarInfo.js'
		]
	} );
</script>
```

Plugin List
-----------

### ACLInfo

Plugin that displays folder's ACL data in the folders tree panel.

It illustrates how to modify templates used by CKFinder to render various parts of the application.

### AlterCommand

A simple plugin that illustrates how to alter commands sent to the server connector.

### AlterDialogWindow

Sample plugin that alters the "Rename File" dialog window.

This plugin illustrates how to:

* Alter existing dialog windows by overriding the default templates.
* Read values from input elements in dialog windows.
* Listen to dialog events (e.g. to execute code when the "OK" button is pressed).
* Alter executed command to send additional data to the server-side connector.

### CustomButton

Plugin that illustrates how to:

* Add a custom icon that can be used by a context menu item or a toolbar button.
* Add a context menu item.
* Add a toolbar button.

### CustomDialog

Sample plugin which adds a "Share" button that opens a dialog window.

This plugin illustrates how to:

 * Create a complete, custom dialog window.
 * Add a button to the toolbar when a file is selected.
 * Define your own request handler.

### CustomPage

Sample plugin which adds a button that opens a separate page with its own toolbar inside CKFinder.

This plugin illustrates how to:

 * Add a button to the "Main" toolbar.
 * Create a custom toolbar and add a button to it.
 * Create, show and close your own page and render a view (custom HTML) inside.

### CustomPanel

Sample plugin which adds a button that opens a secondary panel with a textarea element where the user
can add comments to files.

This plugin illustrates how to:

 * Create, open and close a custom panel.
 * Get a value of an element inside a panel.
 * Add a button to the toolbar when a file is selected.
 * Define your own request handler.

### FolderInfo

Sample plugin which displays folder information in the files pane.

This plugin illustrates how to:

* Localize a plugin by providing language files.
* Render custom HTML content inside the application by providing own region and showing custom view in this region.

### SettingsDemo

Plugin that adds all possible types of settings to the Settings Panel.

### StatusBarInfo

This plugin illustrates how to show, style and add information to the Status Bar.

Creating Plugins
----------------

To learn about creating plugins visit the [CKFinder documentation](http://docs.cksource.com/ckfinder3/#!/guide/dev_plugins).

License
-------
For license details see: [LICENSE.md](https://github.com/ckfinder/ckfinder-docs-samples/blob/master/LICENSE.md).
