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

CKFinder.define( [ 'underscore', 'doT', 'backbone', 'marionette' ], function( _, doT, Backbone, Marionette ) {
	'use strict';

	/**
	 * Sample plugin which displays folder information in the files pane.
	 *
	 * This plugin illustrates how to:
	 *  - Localize plugin by providing language files.
	 *  - Render custom HTML content inside the application by providing a custom region and showing a custom view in this region.
	 */
	var FolderInfo = {
		// Available language files. Put them into the "lang" folder of you plugin.
		lang: 'en,pl',

		init: function( finder ) {
			finder.on( 'page:create:Main', function() {
				// http://docs.cksource.com/ckfinder3/#!/api/CKFinder.CKFinderApp-request-page_addRegion
				finder.request( 'page:addRegion', {
					// The page where CKFinder renders files and folders is called "Main".
					page: 'Main',
					// The region needs to be named.
					name: 'folderInfo',
					id: _.uniqueId( 'ckf-' )
				} );
			} );

			finder.on( 'folder:selected', function( evt ) {
				var folderName = evt.data.folder.get( 'name' );
				var View = Marionette.ItemView.extend( {
					template: doT.template( '<div class="ui-content">{{= it.title.replace( "%1", it.name ) }}</div>' )
				} );

				// http://docs.cksource.com/ckfinder3/#!/api/CKFinder.CKFinderApp-request-page_showInRegion
				finder.request( 'page:showInRegion', {
					view: new View( {
						model: new Backbone.Model( {
							// Read the localized message by accessing the "lang" property.
							// Set CKFinder language to "pl" to see the localized message.
							title: finder.lang.FolderInfo.title,
							name: folderName
						} )
					} ),
					page: 'Main',
					region: 'folderInfo'
				} );
			} );
		}
	};

	return FolderInfo;
} );
