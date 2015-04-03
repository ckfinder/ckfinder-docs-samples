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
	 * Sample plugin that alters "Rename File" dialog view.
	 *
	 * This plugin illustrates how to:
	 *  - alter existing dialog windows by overriding the default templates,
	 *  - read values from input elements in dialog windows,
	 *  - listen to dialog events (e.g. to execute code when "Ok" button is pressed),
	 *  - alter executed command to send additional data to the server side connector.
	 */
	var AlterDialogWindow = {
		init: function( finder ) {
			// Alter rename file dialog template by adding a checkbox.
			finder.on( 'template:FileNameDialogView', function( evt ) {
				evt.data.template = evt.data.template + '<label><input name="overwrite" type="checkbox"> Overwrite existing file?</label>';
			} );

			// This will be passed to both event listeners using the 4th argument in the "on" methods used below.
			// See http://docs.cksource.com/ckfinder3/#!/api/CKFinder.Event-method-on
			var listenerData = {
				overwrite: false
			};

			finder.on( 'dialog:RenameFile:ok', function( evt ) {
				// Read if checkbox is checked
				// When user confirms overwriting file update listenerData.
				evt.listenerData.overwrite = evt.data.dialog.$el.find( '[name="overwrite"]' ).is( ':checked' );
			}, null, listenerData );

			// Alters command params and add an 'overwrite' parameter which will be passed to server connector.
			// A server side plugin can then read this information and alter RenameFile command to simply
			// overwrite an existing file if a file with a new name already existed.
			finder.on( 'command:before:RenameFile', function( evt ) {
				evt.data.params.overwrite = evt.listenerData.overwrite;
			}, null, listenerData );
		}
	};

	return AlterDialogWindow;
} );
