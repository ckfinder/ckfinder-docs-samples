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

CKFinder.define( [ 'underscore', 'doT', 'jquery', 'backbone', 'marionette' ], function( _, doT, jQuery, Backbone, Marionette ) {
	'use strict';

	/**
	 * This plugin illustrates how to:
	 * - Add a custom panel.
	 * - Add a button to the toolbar when a file is selected.
	 * - Define your own request handler.
	 */
	return {
		init: function( finder ) {
			var icon = 'feedback-white.svg';

			// Detect if the black icon should be provided by looking for .ui-alt-icon class.
			// To provide different icons for LTR/RTL environment check finder.lang.dir.
			if ( jQuery( 'body' ).hasClass( 'ui-alt-icon' ) ) {
				icon = 'feedback-black.svg';
			}
			// Add toolbar icon.
			this.addCss( '.ui-icon-feedback:after { background-image: url(' + this.path + '/gfx/' + icon + '); }' );

			// It is always a good practice to remember about LTR and RTL environments..
			var panelPaddingDirection = finder.lang.dir == 'ltr' ? 'left' : 'right';
			this.addCss( '.file-comment-panel .ckf-panel-contents{ padding-' + panelPaddingDirection + ':4%; }' );

			// Add a button to the "Main" toolbar when the file is focused.
			finder.on( 'toolbar:reset:Main:file', function( evt ) {
				// But first, close the panel automatically if a different file is selected.
				finder.request( 'panel:close', { name: 'fileCommentPanel' } );

				var file = evt.data.file;
				evt.data.toolbar.push( {
					name: 'Comment',
					label: 'Comment',
					priority: 100,
					icon: 'feedback',
					action: function() {
						finder.request( 'fileComment', { file: file } );
					}
				} );
			} );

			finder.setHandler( 'fileComment', fileComment, this );

			// The panel for adding comments is created here.
			function fileComment( data ) {
				var commentModel = new Backbone.Model( {
					comment: data.file.get( 'comment' ) || '',
					fileName: data.file.get( 'name' )
				} );

				var CommentView = Marionette.ItemView.extend( {
					template: doT.template( '<p>{{= it.fileName }}</p><h3>Your Comments</h3><label>' +
						'<textarea name="comment" style="width:90%;" rows="12">{{= it.comment }}</textarea></label>' +
						'<small id="count"></small>'
					),
					events: {
						// Attach events to a view, a dummy character counter is created here.
						'keyup textarea': function( evt ) {
							jQuery( '#count' ).html( jQuery( evt.currentTarget ).val().length );
						}
					}
				} );

				var myCommentView = new CommentView( { model: commentModel } );

				finder.request( 'panel:create', {
					name: 'fileCommentPanel',
					position: 'secondary',
					closeButton: 'true',
					className: 'file-comment-panel',
					panelOptions: { display: 'overlay' },
					view: myCommentView
				} );

				// "Save" the comment when closing the panel.
				// As the information is simply remembered in the model in this sample plugin, it will be quickly lost.
				// Use local storage or a custom server-side command to keep the comment in some more persistent storage.
				finder.on( 'panel:close:fileCommentPanel', function() {
					var comment = myCommentView.$el.find( '[name="comment"]' ).val();
					// "this" points to data.file thanks to the scope object that is set in the "on" method below.
					this.set( 'comment', comment );
				}, data.file );

				// You could also request panel:open, but it makes more sense to close the panel if it was already opened.
				finder.request( 'panel:toggle', { name: 'fileCommentPanel' } );
			}
		}
	};
} );
