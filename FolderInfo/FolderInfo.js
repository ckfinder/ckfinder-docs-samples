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

CKFinder.define( [ 'underscore', 'doT', 'backbone', 'marionette' ], function( _, doT, Backbone, Marionette ) {
	'use strict';

	/**
	 * Sample plugin which displays folder information in files pane and is localized.
	 */
	var FolderInfo = {
		// Available language files. Put them in lang folder of you plugin.
		lang: 'en,pl',

		init: function( finder ) {
			finder.on( 'page:create:main', function() {
				finder.request( 'page:addRegion', {
					page: 'main',
					name: 'folderInfo',
					id: _.uniqueId( 'ckf-' )
				} );
			} );

			finder.on( 'folder:selected', function( evt ) {
				var View = Marionette.ItemView.extend( {
					template: doT.template( '<div class="ui-content">{{= it.title }}: {{= it.name }}</div>' )
				} );

				finder.request( 'page:showInRegion', {
					view: new View( {
						model: new Backbone.Model( {
							title: finder.lang.FolderInfo.title, // Read the localized folder info title. Set CKFinder lang to pl to see changes
							name: evt.data.folder.get( 'name' )
						} )
					} ),
					page: 'main',
					region: 'folderInfo'
				} );
			} );
		}
	};

	return FolderInfo;
} );
