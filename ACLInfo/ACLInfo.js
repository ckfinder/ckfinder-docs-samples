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

CKFinder.define( function( ) {
	'use strict';

	/**
	 * This plugin display folder's ACL data in folders tree panel.
	 */
	var ACLInfo = {
		init: function( finder ) {
			finder.on( 'template:FolderTreeNode', function( evt ) {
				var originalTemplate = evt.data.template;

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
					'{{? it.acl.imageScale }}S{{??}}_{{?}}' +
					'{{? it.acl.imageScaleCustom }}C{{??}}_{{?}}' +
					'|</span>';

				evt.data.template = originalTemplate.replace( '{{! it.label || it.name }}', aclLabel );
			} );
		}
	};

	return ACLInfo;
} );
