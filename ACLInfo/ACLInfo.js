/*
 * CKFinder - Sample Plugins
 * =========================
 * http://cksource.com/ckfinder
 * Copyright (C) 2007-2015, CKSource - Frederico Knabben. All rights reserved.
 *
 * This file and its contents are subject to the MIT License.
 * Please read the LICENSE.md file before using, installing, copying,
 * modifying or distribute this file or part of its contents.
 */

CKFinder.define( function( ) {
	'use strict';

	/**
	 * This plugin displays folder ACL data in the folders tree panel.
	 *
	 * It illustrates how to modify templates used by CKFinder to render various parts of the application.
	 */
	var ACLInfo = {
		init: function( finder ) {
			// Register listener for the template:NAME event.
			finder.on( 'template:FolderTreeNode', function( evt ) {
				// Get access to the original template.
				var originalTemplate = evt.data.template;

				// In the FolderTreeNode template "it" stores an instance of CKFinder.Models.Folder
				// which gives you access to the acl property.
				var aclLabel = '{{! it.label || it.name }} <span style="font-size: 0.7em;color:#aaa;">' +
					'|' +
					'{{? it.acl.folderView }}V{{??}}_{{?}}' +
					'{{? it.acl.folderCreate }}C{{??}}_{{?}}' +
					'{{? it.acl.folderRename }}R{{??}}_{{?}}' +
					'{{? it.acl.folderDelete }}D{{??}}_{{?}}' +
					'|' +
					'{{? it.acl.fileView }}V{{??}}_{{?}}' +
					'{{? it.acl.fileUpload }}U{{??}}_{{?}}' +
					'{{? it.acl.fileRename }}R{{??}}_{{?}}' +
					'{{? it.acl.fileDelete }}D{{??}}_{{?}}' +
					'|' +
					'{{? it.acl.imageResize }}S{{??}}_{{?}}' +
					'{{? it.acl.imageResizeCustom }}C{{??}}_{{?}}' +
					'|</span>';

				// Append extra information to the original template.
				evt.data.template = originalTemplate.replace( '{{! it.label || it.name }}', aclLabel );
			} );
		}
	};

	return ACLInfo;
} );
