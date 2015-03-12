CKFinder 3.0 Plugins
====================

This folder contains example plugins for CKFinder 3.x.

Creating plugins
----------------

* Each plugin inside `/plugins` folder must be placed in folder which name is equal to plugin name in which there must be a file named after plugin.
  * For instance plugin `MyPlugin` must be placed inside `plugins/MyPlugin/MyPlugin.js` file.
* If plugin is intended to be loaded from different location above rule does not apply but is considered a good practice.
* Plugins must be properly loaded by require.js AMD loader.
* Inside plugin's folder may exists other folders or files, for instance plugin might be divided to AMD modules.

Template file for plugin:
-------------------------

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
