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

CKFinder.define( [ 'underscore', 'backbone', 'marionette', 'doT' ], function( _, Backbone, Marionette, doT ) {
	'use strict';

	/**
	 * This plugin illustrates how to show, style and add information to the Status Bar.
	 */
	return {
		init: function( finder ) {
			// A basic model that stores message that will be displayed in the status bar
			var messageModel = new Backbone.Model( { message: '' } );

			// A view that will be displayed inside status bar
			var statusBarView = new Marionette.ItemView( {
				tagName: 'p',
				template: doT.template( '{{= it.message }}' ),
				model: messageModel,
				modelEvents: {
					// This will call method render when any model's attribute will change.
					'change': 'render'
				}
			} );

			// Wait for 'app:loaded' event so all core modules are available
			finder.on( 'app:loaded', function( evt ) {
				// Create a status bar named 'MyStatusBar' for 'main' page which contains files pane.
				evt.finder.request( 'statusBar:create', {
					name: 'MyStatusBar',
					page: 'main'
				} );

				// Add a region inside 'MyStatusBar' status bar. By default status bar is empty.
				evt.finder.request( 'statusBar:addRegion', {
					id: 'my-status-bar-region',
					name: 'MyStatusBar'
				} );

				//  Pass a view instance to status bar. This will add a view to regions layout manager.
				evt.finder.request( 'statusBar:showView', {
					region: 'my-status-bar-region',
					name: 'MyStatusBar',
					view: statusBarView
				} );

				// Listen to files:selected event which is triggered when files selection changes.
				finder.on( 'files:selected', function( evt ) {
					var selectedFiles = evt.data.files;

					if ( !selectedFiles.length ) {
						// There are no selected files so display information about folder's contents.
						// Get current folder.
						var folder = evt.finder.request( 'folder:getActive' );
						// Get all files in current folder.
						var folderCount = evt.finder.request( 'files:getCurrent' ).length;
						// Display an information about current folder and amount of files.
						messageModel.set( 'message', 'Folder "' + folder.get( 'name' ) + '" contains ' + folderCount + ' file(s)' );
					} else if ( selectedFiles.length === 1 ) {
						// There is only one file selected so get the first file and show its name.
						messageModel.set( 'message', 'Selected: ' + selectedFiles.at( 0 ).get( 'name' ) );
					} else {
						// There are many files selected so display number of selected files.
						messageModel.set( 'message', 'Selected ' + selectedFiles.length + ' files' );
					}
				} );
			} );

			// Set some nicer styles for status bar content.
			this.addCss( '#my-status-bar-region {padding: 0 1em;font-size:0.8em;font-weight:normal}' );
		}
	};
} );
