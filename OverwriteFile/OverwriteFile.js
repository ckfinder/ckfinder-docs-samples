/*
 * CKFinder
 * ========
 * http://cksource.com/ckfinder
 * Copyright (C) 2007-2015, CKSource - Frederico Knabben. All rights reserved.
 *
 * The software, this file and its contents are subject to the MIT License.
 * Please read the LICENSE.md file before using, installing, copying,
 * modifying or distribute this file or part of its contents.
 */

CKFinder.define( function() {
	'use strict';

	/**
	 * Sample plugin that alters rename file dialog view.
	 */
	var OverwriteFile = {
		init: function( finder ) {
			// Alter rename file dialog template by adding an checkbox.
			finder.on( 'template:RenameFile', function( evt ) {
				evt.data.template = evt.data.template + '<label><input name="overwriteFileName" type="checkbox"> Overwrite existing file?</label>';
			} );

			// This will be passed to both listeners.
			var listenerData = {
				overwrite: false
			};

			// Read if checkbox is checked
			finder.on( 'dialog:RenameFile:ok', function( evt ) {
				// When user confirms overwriting file update listenerData.
				evt.listenerData.overwrite = evt.data.dialog.$el.find( '[name="overwriteFileName"]' ).is( ':checked' );
			}, null, listenerData );

			// Alters command params and add an 'overwrite' parameter which will be passed to server connector.
			// A server side plugin can then read this information and alter RenameFile command
			finder.on( 'command:before:RenameFile', function( evt ) {
				evt.data.params.overwrite = evt.listenerData.overwrite;
			}, null, listenerData );
		}
	};

	return OverwriteFile;
} );
