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
	 * This plugin illustrates how to add a toolbar button with custom icon.
	 */
	return {
		init: function( finder ) {
			var iconUrl = this.path + '/gfx/pizza.svg';
			this.addCss( '.ui-icon-pizza:after { background-image: url(' + iconUrl + '); }' );

			// Add a button to folder toolbar.
			finder.on( 'toolbar:main:folder', function( evt ) {
				evt.data.toolbar.push( {
					label: 'Order pizza',
					priority: 90,
					icon: 'pizza',
					action: orderPizza
				} );
			} );

			// Add a context menu item for file.
			finder.on( 'contextMenu:file', function( evt ) {
				evt.data.groups.addGroup( 'default', [
					{
						label: 'Order pizza',
						icon: 'pizza',
						isActive: true,
						action: orderPizza
					}
				] );
			} );

			function orderPizza() {
				finder.request( 'dialog:info', { msg: 'Call nearest pizza place!' } );
			}
		}
	};
} );
