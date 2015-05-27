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

CKFinder.define( [ 'jquery', 'backbone' ], function( jQuery, Backbone ) {
	'use strict';

	/**
	 * Sample plugin which adds a "Share" button that opens a dialog window.
	 *
	 * This plugin illustrates how to:
	 *
	 *  - Create a complete, custom dialog window.
	 *  - Add a button to the toolbar when a file is selected.
	 *  - Define your own request handler.
	 */
	return {
		init: function( finder ) {
			var icon = 'share-white.svg';

			// Detect if the black icon should be provided by looking for .ui-alt-icon class.
			// To provide different icons for LTR/RTL environment check finder.lang.dir.
			if ( jQuery( 'body' ).hasClass( 'ui-alt-icon' ) ) {
				icon = 'share-black.svg';
			}
			this.addCss( '.ui-icon-share:after { background-image: url(' + this.path + '/gfx/' + icon + '); }' );

			// Add a button to the "Main" toolbar.
			// See also events: toolbar:reset:Main, toolbar:reset:Main:files, toolbar:reset:Main:folder, toolbar:reset:Main:resources.
			finder.on( 'toolbar:reset:Main:file', function( evt ) {
				var file = evt.data.file;
				evt.data.toolbar.push( {
					name: 'Share',
					label: 'Share',
					// Place "Share" after the "Download" button.
					priority: 65,
					icon: 'share',
					action: function() {
						finder.request( 'fileShare', { file: file } );
					}
				} );
			} );

			function fileShare( data ) {
				// Data was passed in finder.request.
				var fileName = data.file.get( 'name' );

				finder.request( 'dialog', {
					name: 'SampleDialog',
					title: 'Share File',
					template: '{{? it.msg }}<p>{{= it.msg }}</p>{{?}}{{~ it.words :word }}' +
					'<label><input type="checkbox" name="service" value="{{= word }}">{{= word }}</label>{{~}}',
					templateModel: new Backbone.Model( {
						msg: 'Where to share ' + fileName + '?',
						words: [ 'Facebook', 'Twitter' ]
					} ),
					buttons: [ 'ok', 'cancel' ]
				} );

				finder.on( 'dialog:SampleDialog:ok', function( evt ) {
					var checked = [];
					evt.data.view.$el.find( '[name="service"]:checked' ).each( function() {
						checked.push( jQuery( this ).val() );
					} );

					if ( checked ) {
						// Destroy the dialog.
						finder.request( 'dialog:destroy' );
						alert( 'Sharing on: ' + checked.join( ', ' ) );
					}
				} );
			}

			finder.setHandler( 'fileShare', fileShare, this );
		}
	};
} );
