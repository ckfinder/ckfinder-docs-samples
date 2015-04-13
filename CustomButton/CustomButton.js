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
	 * This plugin illustrates how to:
	 * - add a custom icon that can be used by a context menu item or a toolbar button,
	 * - add a context menu item,
	 * - add a toolbar button.
	 */
	return {
		init: function( finder ) {
			var iconUrl = this.path + '/gfx/feedback.svg';
			this.addCss( '.ui-icon-feedback:after { background-image: url(' + iconUrl + '); }' );

			// Add a button to the "Main" toolbar.
			// See also events: toolbar:reset:Main:file, toolbar:reset:Main:files, toolbar:reset:Main:folder, toolbar:reset:Main:resources.
			finder.on( 'toolbar:reset:Main', function( evt ) {
				evt.data.toolbar.push( {
					label: 'Send Feedback',
					priority: 0,
					icon: 'feedback',
					action: sendFeedback
				} );
			} );

			// Add a context menu item.
			// See also events: contextMenu:file, contextMenu:folder.
			finder.on( 'contextMenu', function( evt ) {
				evt.data.groups.addGroup( 'default', [
					{
						label: 'Send Feedback',
						icon: 'feedback',
						isActive: true,
						action: sendFeedback
					}
				] );
			} );

			function sendFeedback() {
				finder.request( 'dialog:info', {
					msg: 'If you have any comments or suggestions, please <a href="http://cksource.com/contact">contact us</a>.'
				} );
			}
		}
	};
} );
