CKFinder 3.0 Plugins
====================

This folder contains example plugins for CKFinder 3.x.

Plugins list
------------

* ACLInfo - Plugin that add ACL information to folder's label in folders tree.
* AlterCommand - Plugin that alters command sent to server connector.
* CustomButton - Plugin that illustrates how to add a toolbar button with custom icon.
* FolderInfo - Plugin that alters rename file dialog view.
* OverwriteFile - Plugin which displays folder information in files pane and uses language files.
* SettingsDemo - Plugin that adds all settings data types to settings panel.
* StatusBarInfo - Plugin that illustrates Status Bar usage.

Creating plugins
----------------

* Each plugin inside `/plugins` folder must be placed in folder which name is equal to plugin name in which there must be a file named after plugin.
  * For instance plugin `MyPlugin` must be placed inside `plugins/MyPlugin/MyPlugin.js` file.
* If plugin is intended to be loaded from different location above rule does not apply but is considered a good practice.
* Plugins must be properly loaded by require.js AMD loader.
* Inside plugins folder may exists other folders or files, for instance plugin might be divided to AMD modules.

Template file for plugin:
-------------------------

```js

	CKFinder.define( function () {

		var MyPlugin = {
			init: function ( finder ) {
				// plugin initialization code, ie:
				finder.on( 'some:event', function ( evt ) {
					// Do something useful
				} );
			}
		};

		return MyPlugin;
	} );

```

License
-------
For license details see: [LICENSE.md](https://github.com/ckfinder/ckfinder-docs-samples/blob/master/LICENSE.md).
