# CKFinder 3 - Sample JavaScript Plugins

This repository contains sample plugins for CKFinder 3 created as examples for the [CKFinder documentation](https://ckeditor.com/docs/ckfinder/ckfinder3/).

To learn about writing your own plugins, read the [Creating Plugins](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_plugins) article in the CKFinder 3 documentation.

## Loading Plugins

To run sample plugins:

1. Download sample plugins and extract them to the `<ckfinder>/plugins` folder. You can download plugins:
 - Using `git`.
 - By pressing the [Download ZIP](https://github.com/ckfinder/ckfinder-docs-samples/archive/master.zip) button.
2. Enable selected plugins with the [`config.plugins`](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/api/CKFinder.Config-cfg-plugins) option.

### Example

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

Note: In CKFinder 3 it is possible to load plugins from a URL, so you can point your CKFinder to the plugin using fully qualified URL. Due to GitHub protection which sends files as `plain/text`, using URLs that point directly to GitHub may **not work**:

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

## Plugin List

### ACLInfo

Sample plugin that displays folder ACL data in the folders tree panel.

It illustrates how to modify [templates](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_templates) used by CKFinder to render various parts of the application.

### AlterCommand

A simple plugin that illustrates how to alter commands sent to the server connector.

### AlterDialogWindow

Sample plugin that alters the "Rename File" [dialog window](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_dialogs).

This plugin illustrates how to:

 * Alter existing dialog windows by overriding the default templates.
 * Read values from input elements in dialog windows.
 * Listen to dialog events (e.g. to execute code when the "OK" button is pressed).
 * Alter executed command to send additional data to the server-side connector.

### CustomButton

Sample plugin that illustrates how to:

* Add a custom icon that can be used by a context menu item or a toolbar button.
* Add a [context menu](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_contextmenu) item.
* Add a [toolbar button](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_toolbar).

### CustomColumn

Sample plugin that illustrates how to add a custom column to list view.

### CustomDialog

Sample plugin which adds a "Share" button that opens a [dialog window](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_dialogs).

This plugin illustrates how to:

 * Create a complete, custom dialog window.
 * Add a button to the toolbar when a file is selected.
 * Define your own request handler.

### CustomPage

Sample plugin which adds a button that opens a separate page with its own [toolbar](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_toolbar) inside CKFinder.

This plugin illustrates how to:

 * Add a button to the "Main" toolbar.
 * Create a custom toolbar and add a button to it.
 * Create, show and close your own page and render a view (custom HTML) inside.

### CustomPanel

Sample plugin which adds a button that opens a secondary panel with a textarea element where the user
can add comments to files.

This plugin illustrates how to:

 * Create, open and close a [custom panel](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_panels).
 * Get a value of an element inside a panel.
 * Add a button to the toolbar when a file is selected.
 * Define your own request handler.

### FolderInfo

Sample plugin which displays folder information in the files pane.

This plugin illustrates how to:

 * [Localize a plugin](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_localization) by providing language files.
 * Render custom HTML content inside the application by providing a custom region and showing a custom view in this region.

### ImageInfo

Sample plugin which adds a "Image Info" button that opens a dialog with basic information about an image.

This plugin illustrates how to:

 * Add a button to the toolbar when an image file is selected.
 * Send a command to the server connector.

### SettingsDemo

Plugin that adds all possible types of [settings](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_settings) to the Settings Panel. It also illustrates on how to detect mode changes
in CKFinder (`mobile`/`desktop`).

### StatusBarInfo

This plugin illustrates how to show, style and add information to the [status bar](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_statusbar).

## Creating Plugins

To learn about creating plugins visit the [CKFinder documentation](https://ckeditor.com/docs/ckfinder/ckfinder3/#!/guide/dev_plugins).

## License

Copyright (c) 2015, CKSource Holding sp. z o.o.. All rights reserved. For license details see: [LICENSE.md](https://github.com/ckfinder/ckfinder-docs-samples/blob/master/LICENSE.md).
