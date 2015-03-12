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
	 * Plugin that adds all settings data types to settings panel.
	 */
	var SettingsDemo = {
		init: function settingsDataTypes( finder ) {
			function logChange( evt ) {
				/* global console: false */
				console.log( 'Changed setting: ', evt.data );
				/* global console: true */
			}

			finder.on( 'setting:change:hacks:checkbox', logChange );
			finder.on( 'setting:change:hacks:range', logChange );
			finder.on( 'setting:change:hacks:text', logChange );
			finder.on( 'setting:change:hacks:select', logChange );
			finder.on( 'setting:change:hacks:radio', logChange );

			finder.on( 'app:loaded', function() {
				finder.request( 'settings:define', {
					group: 'hacks',
					label: 'Settings demo',
					settings: [
						{
							label: 'Checkbox',
							name: 'checkbox',
							type: 'checkbox'
						},
						{
							label: 'Range',
							name: 'range',
							type: 'range',
							defaultValue: 6,
							attributes: {
								min: 2,
								max: 10,
								step: 2
							}
						},
						{
							label: 'Text',
							name: 'text',
							defaultValue: 'Text input'
						},
						{
							label: 'Hidden',
							name: 'hidden',
							type: 'hidden',
							defaultValue: 'Must not render'
						},
						{
							label: 'Select',
							name: 'select',
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
							label: 'Radio',
							name: 'radio',
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
		}
	};

	return SettingsDemo;
} );
