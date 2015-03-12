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

CKFinder.define( [ 'underscore' ], function( _ ) {
	'use strict';

	/**
	 * A simple plugin that illustrates how to alter commands sent to server.
	 */
	var AlterCommand = {
		init: function( finder ) {
			// This will alter every command sent to server
			finder.on( 'command:before', function( evt ) {
				if ( !_.has( evt.data, 'params' ) ) {
					evt.data.params = {};
				}
				evt.data.params.foo = 'bar';
			}, null, null, 1 ); // Assign high priority
		}
	};

	return AlterCommand;
} );
