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

CKFinder.define( [ 'marionette' ], function( Marionette ) {
	'use strict';

	/**
	 * Plugin that adds a custom column to list view.
	 */
	var CustomColumn = {
		init: function( finder ) {
			finder.on( 'listView:columns', function( evt ) {
				var sizeColumn = evt.data.columns.findWhere( { name: 'size' } );

				if ( sizeColumn ) {
					sizeColumn.set( 'priority', 40 );
				}

				var dateColumn = evt.data.columns.findWhere( { name: 'date' } );

				if ( dateColumn ) {
					dateColumn.set( 'priority', 30 );
				}
			} );

			finder.on( 'listView:columns', function( evt ) {
				evt.data.columns.push( {
					name: 'type',
					label: 'Type',
					priority: 25 // Column will be displayed after name column
				} );
			} );

			// Add a template for file
			finder.on( 'listView:file:column:type', function( evt ) {
				evt.data.template = '<td>{{= it.getType( it.name ) }}</td>';
				evt.data.templateHelpers = {
					getType: function( name ) {
						var extension = name.substr( name.lastIndexOf( '.' ) + 1 ).toLowerCase();

						if ( /(jpg|jpeg|gif|png)/.test( extension ) ) {
							return 'Image';
						}

						if ( /(doc|docx|pdf)/.test( extension ) ) {
							return 'Document';
						}

						return 'Other';
					}
				};
			} );

			// Add a template for folder
			finder.on( 'listView:folder:column:type', function( evt ) {
				evt.data.template = '<td>Folder</td>';
			} );
		}
	};

	return CustomColumn;
} );
