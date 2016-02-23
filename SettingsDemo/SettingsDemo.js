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

CKFinder.define( function() {
	'use strict';

	/**
	 * Plugin that adds all possible types of settings to the Settings Panel.
	 */
	var SettingsDemo = {
		init: function ( finder ) {
			function logChange( evt ) {
				/* global console: false */
				console.log( 'Changed setting: ', evt.data );
				/* global console: true */
			}

			finder.on( 'setting:change:mySettings:checkbox1', logChange );
			finder.on( 'setting:change:mySettings:range1', logChange );
			finder.on( 'setting:change:mySettings:text1', logChange );
			finder.on( 'setting:change:mySettings:select1', logChange );
			finder.on( 'setting:change:mySettings:radio1', logChange );

			finder.on( 'app:ready', function() {
				finder.request( 'settings:define', {
					group: 'mySettings',
					label: 'Settings demo',
					settings: [
						{
							label: 'My Checkbox',
							name: 'checkbox1',
							type: 'checkbox'
						},
						{
							label: 'My Range',
							name: 'range1',
							isEnabled: finder.request( 'ui:getMode' ) === 'desktop',
							type: 'range',
							defaultValue: 6,
							attributes: {
								min: 2,
								max: 10,
								step: 2
							}
						},
						{
							label: 'My Text',
							name: 'text1',
							defaultValue: 'Text input'
						},
						{
							label: 'My Hidden',
							name: 'hidden1',
							type: 'hidden',
							defaultValue: 'Must not render'
						},
						{
							label: 'My Select',
							name: 'select1',
							type: 'select',
							defaultValue: 'b',
							attributes: {
								options: {
									a: 'Option A',
									b: 'Option B',
									c: 'Option C'
								}
							}
						},
						{
							label: 'My Radio',
							name: 'radio1',
							type: 'radio',
							defaultValue: 'a',
							attributes: {
								options: {
									a: 'Radio A',
									b: 'Radio B'
								}
							}
						}
					]
				} );
			} );

			// Disable range element in mobile view.
			finder.on( 'ui:resize', function( evt ) {
				if ( evt.data.modeChanged ) {
					if ( evt.data.mode === 'mobile' ) {
						finder.request( 'settings:disable', {
							group: 'mySettings',
							name: 'range1'
						} );
					}
					else {
						finder.request( 'settings:enable', {
							group: 'mySettings',
							name: 'range1'
						} );
					}
				}
			} );
		}
	};

	return SettingsDemo;
} );
