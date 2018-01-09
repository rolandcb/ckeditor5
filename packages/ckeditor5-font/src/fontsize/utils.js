/**
 * @license Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

/**
 * @module font/fontsize/utils
 */

/**
 * Returns {@link module:font/fontsize/fontsizeediting~FontSizeConfig#options} array with options normalized in the
 * {@link module:font/fontsize/fontsizeediting~FontSizeOption} format, translated.
 *
 * @param {Array.<String|Number|Object>} configuredOptions An array of options taken from configuration.
 * @returns {Array.<module:font/fontsize/fontsizeediting~FontSizeOption>}
 */
export function normalizeOptions( configuredOptions ) {
	// Convert options to objects.
	return configuredOptions
		.map( getOptionDefinition )
		// Filter out undefined values that `getOptionDefinition` might return.
		.filter( option => !!option );
}

// Default named presets map.
const namedPresets = {
	tiny: {
		title: 'Tiny',
		model: 'text-tiny',
		view: {
			name: 'span',
			class: 'text-tiny'
		}
	},
	small: {
		title: 'Small',
		model: 'text-small',
		view: {
			name: 'span',
			class: 'text-small'
		}
	},
	big: {
		title: 'Big',
		model: 'text-big',
		view: {
			name: 'span',
			class: 'text-big'
		}
	},
	huge: {
		title: 'Huge',
		model: 'text-huge',
		view: {
			name: 'span',
			class: 'text-huge'
		}
	}
};

// Returns an option definition either from preset or creates one from number shortcut.
// If object is passed then this method will return it without alternating it. Returns undefined for item than cannot be parsed.
//
// @param {String|Number|Object} item
// @returns {undefined|module:font/fontsize/fontsizeediting~FontSizeOption}
function getOptionDefinition( option ) {
	// Treat any object as full item definition provided by user in configuration.
	if ( typeof option === 'object' ) {
		return option;
	}

	// Item is a named preset.
	if ( namedPresets[ option ] ) {
		return namedPresets[ option ];
	}

	// 'Normal' font size. It will be used to remove the fontSize attribute.
	if ( option === 'normal' ) {
		return {
			model: undefined,
			title: 'Normal'
		};
	}

	// At this stage we probably have numerical value to generate a preset so parse it's value.
	const sizePreset = parseFloat( option );

	// Discard any faulty values.
	if ( isNaN( sizePreset ) ) {
		return;
	}

	// Return font size definition from size value.
	return generatePixelPreset( sizePreset );
}

// Creates a predefined preset for pixel size.
//
// @param {Number} size Font size in pixels.
// @returns {module:font/fontsize/fontsizeediting~FontSizeOption}
function generatePixelPreset( size ) {
	const sizeName = String( size );

	return {
		title: sizeName,
		model: sizeName,
		view: {
			name: 'span',
			style: {
				'font-size': `${ size }px`
			}
		}
	};
}
