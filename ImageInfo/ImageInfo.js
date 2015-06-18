/*
 * CKFinder - Sample Plugins
 * ==========================
 * http://cksource.com/ckfinder
 * Copyright (C) 2007-2015, CKSource - Frederico Knabben. All rights reserved.
 *
 * This file and its contents are subject to the MIT License.
 * Please read the LICENSE.md file before using, installing, copying,
 * modifying or distribute this file or part of its contents.
 */

CKFinder.define( [ 'backbone' ], function( Backbone ) {
	'use strict';

	/**
	 * Sample plugin which adds a "Image Info" button that opens a dialog with basic information about an image.
	 *
	 * This plugin illustrates how to:
	 *
	 *  - Add a button to the toolbar when an image file is selected.
	 *  - Send a command to the server connector.
	 */
	return {
		init: function( finder ) {
			// Template for Image Info dialog contents
			var imageInfoTemplate =
				'<table>' +
				'<tr><td><strong>Width: </strong></td><td>{{! it.width }}px</td></tr>' +
				'<tr><td><strong>Height: </strong></td><td>{{! it.height }}px</td></tr>' +
				'<tr><td><strong>Size: </strong></td><td>{{! it.size }} bytes</td></tr>' +
				'</table>';

			// Attach an event to add a button to the "Main" toolbar when one file is selected
			finder.on( 'toolbar:reset:Main:file', function( evt ) {
				// Show the button only for image files
				if ( evt.data.file.isImage() ) {
					evt.data.toolbar.push( {
						name: 'ImageInfo',
						type: 'button',
						priority: 150,
						icon: 'ckf-details',
						label: 'Image Info',
						action: displayImageInfo
					} );
				}
			} );

			// Callback function executed after button is clicked
			function displayImageInfo() {
				// Get selected file
				var selectedFiles = finder.request( 'files:getSelected' );
				var file = selectedFiles.first();

				// Send ImageInfo command to the server
				finder.request( 'command:send', {
					name: 'ImageInfo',
					folder: file.get( 'folder' ),
					params: {
						fileName: file.get( 'name' )
					}
				} ).done( function( response ) {
					if ( !response.error ) {
						// Display a dialog window
						finder.request( 'dialog', {
							template: imageInfoTemplate,
							templateModel: new Backbone.Model( response ),
							title: 'Image Info',
							name: 'ImageInfoDialog',
							buttons: [ 'okClose' ]
						} );
					}
				} );
			}
		}
	};
} );