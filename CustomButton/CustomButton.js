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

CKFinder.define( [ 'jquery' ], function( jQuery ) {
	'use strict';

	/**
	 * This plugin illustrates how to:
	 * - Add a custom icon that can be used by a context menu item or a toolbar button.
	 * - Add a context menu item.
	 * - Add a toolbar button.
	 */
	return {
		init: function( finder ) {
			var icon = 'feedback-white.svg';

			// Detect if the black icon should be provided by looking for .ui-alt-icon class.
			// To provide different icons for LTR/RTL environment check finder.lang.dir.
			if ( jQuery( 'body' ).hasClass( 'ui-alt-icon' ) ) {
				icon = 'feedback-black.svg';
			}
			this.addCss( '.ui-icon-feedback:after { background-image: url(' + this.path + '/gfx/' + icon + '); }' );

			// Add a button to the "Main" toolbar.
			// See also events: toolbar:reset:Main:file, toolbar:reset:Main:files, toolbar:reset:Main:folder, toolbar:reset:Main:resources.
			finder.on( 'toolbar:reset:Main', function( evt ) {
				evt.data.toolbar.push( {
					name: 'Feedback',
					label: 'Send Feedback',
					priority: 0,
					icon: 'feedback',
					action: sendFeedback
				} );
			} );

			// Add a context menu item.
			// See also events: contextMenu:file, contextMenu:folder.
			finder.on( 'contextMenu', function( evt ) {
				evt.data.groups.add( { name: 'default' } );
			} );

			finder.on( 'contextMenu:file:default', onContextMenuGroup );
			finder.on( 'contextMenu:folder:default', onContextMenuGroup );

			function onContextMenuGroup( evt ) {
				evt.data.items.add( {
					name: 'Feedback',
					label: 'Send Feedback',
					icon: 'feedback',
					isActive: true,
					action: sendFeedback
				} );
			}

			function sendFeedback() {
				finder.request( 'dialog:info', {
					msg: 'If you have any comments or suggestions, please <a href="http://cksource.com/contact">contact us</a>.'
				} );
			}
		}
	};
} );
