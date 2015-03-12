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
	 * This plugin illustrates how to display information inside status bar.
	 */
	return {
		init: function( finder ) {
			// A basic model that stores message that will be displayed in status bar
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

				//  Pass an view instance to status bar. This will add a view to regions layout manager.
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
						var folder = evt.finder.request( 'folder:getActive' ); // Get current folder.
						var folderCount = evt.finder.request( 'files:getCurrent' ).length; // Get all files in current folder.
						messageModel.set( 'message', 'Folder "' + folder.get( 'name' ) + '" contains ' + folderCount + ' files' );
					} else if ( selectedFiles.length === 1 ) {
						// There is only one file selected so get the first file and show its name.
						messageModel.set( 'message', 'Selected: ' + selectedFiles.at( 0 ).get( 'name' ) );
					} else {
						// There are many files selected so display number of selected files.
						messageModel.set( 'message', 'Selected ' + selectedFiles.length + ' files' );
					}
				} );
			} );
		}
	};
} );
