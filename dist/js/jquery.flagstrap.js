/*
 *  FlagStrap - v1.2
 *  A lightwieght jQuery plugin for creating Bootstrap 4 compatible country select boxes with flags and option to add custom/3rd party search functionality.
 *  https://github.com/sjoller/flagstrap
 *
 *  Forked from http://www.blazeworx.com/flagstrap
 *
 *  Made by Alex Carter
 *  Under MIT License
 *
 *  Extended by Mads Jensen
 */
(function ($) {

    let defaults = {
        inputId: undefined,
        buttonSize: 'btn-md',
        buttonType: 'btn-default',
        labelMargin: '10px',
        scrollable: true,
        scrollableHeight: '250px',
        searchable: false,
        searchAutoComplete: (0|Math.random()*9e6).toString(36), // Yes, a random string - apparently 'off' is the worst value to use, to turn off autofill/complete.
        searchClass: '',
        searchPlaceholder: 'Search',
        placeholder: {
            value: '',
            text: 'Please select country'
        },
        selectedCountry: ''
    };

    let countries = {
        'AF': 'Afghanistan',
        'AL': 'Albania',
        'DZ': 'Algeria',
        'AS': 'American Samoa',
        'AD': 'Andorra',
        'AO': 'Angola',
        'AI': 'Anguilla',
        'AG': 'Antigua and Barbuda',
        'AR': 'Argentina',
        'AM': 'Armenia',
        'AW': 'Aruba',
        'AU': 'Australia',
        'AT': 'Austria',
        'AZ': 'Azerbaijan',
        'BS': 'Bahamas',
        'BH': 'Bahrain',
        'BD': 'Bangladesh',
        'BB': 'Barbados',
        'BY': 'Belarus',
        'BE': 'Belgium',
        'BZ': 'Belize',
        'BJ': 'Benin',
        'BM': 'Bermuda',
        'BT': 'Bhutan',
        'BO': 'Bolivia, Plurinational State of',
        'BA': 'Bosnia and Herzegovina',
        'BW': 'Botswana',
        'BV': 'Bouvet Island',
        'BR': 'Brazil',
        'IO': 'British Indian Ocean Territory',
        'BN': 'Brunei Darussalam',
        'BG': 'Bulgaria',
        'BF': 'Burkina Faso',
        'BI': 'Burundi',
        'KH': 'Cambodia',
        'CM': 'Cameroon',
        'CA': 'Canada',
        'CV': 'Cape Verde',
        'KY': 'Cayman Islands',
        'CF': 'Central African Republic',
        'TD': 'Chad',
        'CL': 'Chile',
        'CN': 'China',
        'CO': 'Colombia',
        'KM': 'Comoros',
        'CG': 'Congo',
        'CD': 'Congo, the Democratic Republic of the',
        'CK': 'Cook Islands',
        'CR': 'Costa Rica',
        'CI': 'C&ocirc;te d\'Ivoire',
        'HR': 'Croatia',
        'CU': 'Cuba',
        'CW': 'Cura&ccedil;ao',
        'CY': 'Cyprus',
        'CZ': 'Czech Republic',
        'DK': 'Denmark',
        'DJ': 'Djibouti',
        'DM': 'Dominica',
        'DO': 'Dominican Republic',
        'EC': 'Ecuador',
        'EG': 'Egypt',
        'SV': 'El Salvador',
        'GQ': 'Equatorial Guinea',
        'ER': 'Eritrea',
        'EE': 'Estonia',
        'ET': 'Ethiopia',
        'FK': 'Falkland Islands (Malvinas)',
        'FO': 'Faroe Islands',
        'FJ': 'Fiji',
        'FI': 'Finland',
        'FR': 'France',
        'GF': 'French Guiana',
        'PF': 'French Polynesia',
        'TF': 'French Southern Territories',
        'GA': 'Gabon',
        'GM': 'Gambia',
        'GE': 'Georgia',
        'DE': 'Germany',
        'GH': 'Ghana',
        'GI': 'Gibraltar',
        'GR': 'Greece',
        'GL': 'Greenland',
        'GD': 'Grenada',
        'GP': 'Guadeloupe',
        'GU': 'Guam',
        'GT': 'Guatemala',
        'GG': 'Guernsey',
        'GN': 'Guinea',
        'GW': 'Guinea-Bissau',
        'GY': 'Guyana',
        'HT': 'Haiti',
        'HM': 'Heard Island and McDonald Islands',
        'VA': 'Holy See (Vatican City State)',
        'HN': 'Honduras',
        'HK': 'Hong Kong',
        'HU': 'Hungary',
        'IS': 'Iceland',
        'IN': 'India',
        'ID': 'Indonesia',
        'IR': 'Iran, Islamic Republic of',
        'IQ': 'Iraq',
        'IE': 'Ireland',
        'IM': 'Isle of Man',
        'IL': 'Israel',
        'IT': 'Italy',
        'JM': 'Jamaica',
        'JP': 'Japan',
        'JE': 'Jersey',
        'JO': 'Jordan',
        'KZ': 'Kazakhstan',
        'KE': 'Kenya',
        'KI': 'Kiribati',
        'KP': "Korea, Democratic People's Republic of",
        'KR': 'Korea, Republic of',
        'KW': 'Kuwait',
        'KG': 'Kyrgyzstan',
        'LA': "Lao People's Democratic Republic",
        'LV': 'Latvia',
        'LB': 'Lebanon',
        'LS': 'Lesotho',
        'LR': 'Liberia',
        'LY': 'Libya',
        'LI': 'Liechtenstein',
        'LT': 'Lithuania',
        'LU': 'Luxembourg',
        'MO': 'Macao',
        'MK': 'Macedonia, the former Yugoslav Republic of',
        'MG': 'Madagascar',
        'MW': 'Malawi',
        'MY': 'Malaysia',
        'MV': 'Maldives',
        'ML': 'Mali',
        'MT': 'Malta',
        'MH': 'Marshall Islands',
        'MQ': 'Martinique',
        'MR': 'Mauritania',
        'MU': 'Mauritius',
        'YT': 'Mayotte',
        'MX': 'Mexico',
        'FM': 'Micronesia, Federated States of',
        'MD': 'Moldova, Republic of',
        'MC': 'Monaco',
        'MN': 'Mongolia',
        'ME': 'Montenegro',
        'MS': 'Montserrat',
        'MA': 'Morocco',
        'MZ': 'Mozambique',
        'MM': 'Myanmar',
        'NA': 'Namibia',
        'NR': 'Nauru',
        'NP': 'Nepal',
        'NL': 'Netherlands',
        'NC': 'New Caledonia',
        'NZ': 'New Zealand',
        'NI': 'Nicaragua',
        'NE': 'Niger',
        'NG': 'Nigeria',
        'NU': 'Niue',
        'NF': 'Norfolk Island',
        'MP': 'Northern Mariana Islands',
        'NO': 'Norway',
        'OM': 'Oman',
        'PK': 'Pakistan',
        'PW': 'Palau',
        'PS': 'Palestinian Territory, Occupied',
        'PA': 'Panama',
        'PG': 'Papua New Guinea',
        'PY': 'Paraguay',
        'PE': 'Peru',
        'PH': 'Philippines',
        'PN': 'Pitcairn',
        'PL': 'Poland',
        'PT': 'Portugal',
        'PR': 'Puerto Rico',
        'QA': 'Qatar',
        'RE': 'R&eacute;union',
        'RO': 'Romania',
        'RU': 'Russian Federation',
        'RW': 'Rwanda',
        'SH': 'Saint Helena, Ascension and Tristan da Cunha',
        'KN': 'Saint Kitts and Nevis',
        'LC': 'Saint Lucia',
        'MF': 'Saint Martin (French part)',
        'PM': 'Saint Pierre and Miquelon',
        'VC': 'Saint Vincent and the Grenadines',
        'WS': 'Samoa',
        'SM': 'San Marino',
        'ST': 'Sao Tome and Principe',
        'SA': 'Saudi Arabia',
        'SN': 'Senegal',
        'RS': 'Serbia',
        'SC': 'Seychelles',
        'SL': 'Sierra Leone',
        'SG': 'Singapore',
        'SX': 'Sint Maarten (Dutch part)',
        'SK': 'Slovakia',
        'SI': 'Slovenia',
        'SB': 'Solomon Islands',
        'SO': 'Somalia',
        'ZA': 'South Africa',
        'GS': 'South Georgia and the South Sandwich Islands',
        'SS': 'South Sudan',
        'ES': 'Spain',
        'LK': 'Sri Lanka',
        'SD': 'Sudan',
        'SR': 'Suriname',
        'SZ': 'Swaziland',
        'SE': 'Sweden',
        'CH': 'Switzerland',
        'SY': 'Syrian Arab Republic',
        'TW': 'Taiwan, Province of China',
        'TJ': 'Tajikistan',
        'TZ': 'Tanzania, United Republic of',
        'TH': 'Thailand',
        'TL': 'Timor-Leste',
        'TG': 'Togo',
        'TK': 'Tokelau',
        'TO': 'Tonga',
        'TT': 'Trinidad and Tobago',
        'TN': 'Tunisia',
        'TR': 'Turkey',
        'TM': 'Turkmenistan',
        'TC': 'Turks and Caicos Islands',
        'TV': 'Tuvalu',
        'UG': 'Uganda',
        'UA': 'Ukraine',
        'AE': 'United Arab Emirates',
        'GB': 'United Kingdom',
        'US': 'United States',
        'UM': 'United States Minor Outlying Islands',
        'UY': 'Uruguay',
        'UZ': 'Uzbekistan',
        'VU': 'Vanuatu',
        'VE': 'Venezuela, Bolivarian Republic of',
        'VN': 'Viet Nam',
        'VG': 'Virgin Islands, British',
        'VI': 'Virgin Islands, U.S.',
        'WF': 'Wallis and Futuna',
        'EH': 'Western Sahara',
        'YE': 'Yemen',
        'ZM': 'Zambia',
        'ZW': 'Zimbabwe'
    };

    $.flagStrap = function (element, options, i) {
        let plugin = this;

        let uniqueId = generateId(8);

        plugin.countries = {};
        plugin.selected = {value: null, text: null};
        plugin.settings = {inputName: 'country-' + uniqueId};

        let $container = $(element);
        let htmlSelectId = 'flagstrap-' + uniqueId;
        let htmlSelect = '#' + htmlSelectId;

        plugin.init = function () {

            // Merge in global settings then merge in individual settings via data attributes
            plugin.countries = countries;

            // Initialize Settings, priority: defaults, init options, data attributes
            plugin.countries = countries;
            plugin.settings = $.extend({}, defaults, options, $container.data());

            if (undefined !== plugin.settings.countries) {
                plugin.countries = plugin.settings.countries;
            }

            if (undefined !== plugin.settings.inputId) {
                htmlSelectId = plugin.settings.inputId;
                htmlSelect = '#' + htmlSelectId;
            }

            if (plugin.settings.searchable === true) {
                // Build HTML Select, Construct the searchable drop down button, Assemble the drop down list items element and insert
                $container
                    .addClass('flagstrap')
                    .append(buildHtmlSelect)
                    .append(buildSearchDropDown)
                    .append(buildDropDownButtonItemList);
            }
            else {
                // Build HTML Select, Construct the drop down button, Assemble the drop down list items element and insert
                $container
                    .addClass('flagstrap')
                    .append(buildHtmlSelect)
                    .append(buildDropDownButton)
                    .append(buildDropDownButtonItemList);
            }

            // Check to see if the onSelect callback method is assigned / callable, bind the change event for broadcast
            if (plugin.settings.onSelect !== undefined && plugin.settings.onSelect instanceof Function) {
                $(htmlSelect).change(function (event) {
                    let element = this;
                    options.onSelect($(element).val(), element);
                });
            }

            // Hide the actual HTML select
            $(htmlSelect).hide();

        };

        plugin.val = function (country_code) {
            // set the underlying select to the new value
            $(htmlSelect).val(country_code);
            // update the UI of the flag widget to show the new country selection
            let html = '';
            if ( country_code === plugin.settings.placeholder.value ) {
                html = '<i class="flagstrap-icon flagstrap-placeholder"></i> ' + plugin.settings.placeholder.text;
            } else {
                html = $container.find('li a[data-val=' + country_code + ']').html();
            }
            $('#flagstrap-selected-' + uniqueId).html( html );
        };

        let buildHtmlSelect = function () {
            let htmlSelectElement = $('<select/>').attr('id', htmlSelectId).attr('name', plugin.settings.inputName);

            $.each(plugin.countries, function (code, country) {
                let optionAttributes = {value: code};
                if (plugin.settings.selectedCountry !== undefined) {
                    if (plugin.settings.selectedCountry === code) {
                        optionAttributes = {value: code, selected: 'selected'};
                        plugin.selected = {value: code, text: country}
                    }
                }
                htmlSelectElement.append($('<option>', optionAttributes).text(country));
            });

            if (plugin.settings.placeholder !== false) {
                htmlSelectElement.prepend($('<option selected>', {
                    value: plugin.settings.placeholder.value,
                    text: plugin.settings.placeholder.text,
                }));
                plugin.selected = {value: plugin.settings.placeholder.value, text: plugin.settings.placeholder.text}
            }

            return htmlSelectElement;
        };

        let buildDropDownButton = function () {

            let firstOption = $(htmlSelect + ' option:first-child');
            let selectedText = firstOption.text();
            let selectedValue = firstOption.val();
            let selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-placeholder');

            selectedText = plugin.selected.text || selectedText;
            selectedValue = plugin.selected.value || selectedValue;

            if (selectedValue !== plugin.settings.placeholder.value) {
                selectedLabel = $('<i/>')
                .addClass('flagstrap-icon flagstrap-' + selectedValue.toLowerCase())
                .css('margin-right', plugin.settings.labelMargin);
            }

            let buttonLabel = $('<span/>')
                .attr('id', 'flagstrap-selected-' + uniqueId)
                .html(selectedLabel)
                .append(selectedText);

            let button = $('<button/>')
                .attr('type', 'button')
                .attr('data-toggle', 'dropdown')
                .attr('id', 'flagstrap-drop-down-' + uniqueId)
                .addClass('btn ' + plugin.settings.buttonType + ' ' + plugin.settings.buttonSize)
                .on('click', function (e) {
                    $('#flagstrap-drop-down-' + uniqueId + '-list').toggleClass('d-flex');
                })
                .html(buttonLabel);

            $('<span/>')
                .addClass('dropdown-toggle caret')
                .css('margin-left', plugin.settings.labelMargin)
                .insertAfter(buttonLabel);

            return button;

        };

        let buildSearchDropDown = function () {

            let firstOption = $(htmlSelect + ' option:first-child');
            let selectedText = firstOption.text();
            let selectedValue = firstOption.val();
            let selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-placeholder');

            selectedText = plugin.selected.text || selectedText;
            selectedValue = plugin.selected.value || selectedValue;

            if (selectedValue !== plugin.settings.placeholder.value) {
                selectedLabel = $('<i/>').addClass('flagstrap-icon flagstrap-' + selectedValue.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
            }

            let caret = $('<div/>')
                .addClass('caret dropdown-toggle')
                .css('margin-left', plugin.settings.labelMargin);

            // Build (embedded) search field
            let searchInput = $('<input/>')
                .attr('type', 'text')
                .attr('id', 'flagstrap-search-' + uniqueId)
                .attr('autocomplete', plugin.settings.searchAutoComplete)
                .attr('placeholder', plugin.settings.searchPlaceholder)
                .attr('value', selectedText)
                .addClass('flex-grow-1 form-control hidden ' + plugin.settings.searchClass)
                .on('focus', function () {
                    $('#flagstrap-drop-down-' + uniqueId + '-list').addClass('d-flex');
                })
                .on('click', function(e) {
                    e.stopPropagation();
                })
                .on('keyup', function(e) {
                    // escape
                    if (e.which === 27) {
                        $('#flagstrap-selected-' + uniqueId).toggleClass('hidden');
                        $('#flagstrap-search-' + uniqueId).toggleClass('hidden');
                        $('#flagstrap-drop-down-' + uniqueId + '-list').removeClass('d-flex');
                    }
                });

            let buttonLabel = $('<span/>')
                .attr('id', 'flagstrap-selected-' + uniqueId)
                .addClass('flex-grow-1')
                .html(selectedLabel)
                .append(selectedText);

            let buttonContentWrapper = $('<div/>')
                .addClass('input-group-sm w-100')
                // Regular button content
                .append(buttonLabel)
                // Embedded search field
                .append(searchInput);

            let button = $('<button/>')
                .attr('type', 'button')
                .attr('id', 'flagstrap-drop-down-' + uniqueId)
                .addClass('btn ' + plugin.settings.buttonType + ' ' + plugin.settings.buttonSize + ' d-flex justify-content-end flagstrap-search-button')
                .on('click', function () {
                    // Toggle shown button content
                    $('#flagstrap-selected-' + uniqueId).toggleClass('hidden');
                    // Toggle dropdown
                    $('#flagstrap-drop-down-' + uniqueId + '-list').toggleClass('d-flex');
                    // Update search field, toggle visibility and set focus to search field
                    $('#flagstrap-search-' + uniqueId).val($('#flagstrap-selected-' + uniqueId).text()).toggleClass('hidden').focus();
                })
                .append(buttonContentWrapper)
                .append(caret);

            let inputGroupBtn = $('<div/>')
                .addClass('input-group-btn w-100')
                .append(button);

            let search = $('<div/>')
                .addClass('input-group')
                .append(inputGroupBtn);

            return search;
        };

        let buildDropDownButtonItemList = function () {
            let items = $('<ul/>')
                .attr('id', 'flagstrap-drop-down-' + uniqueId + '-list')
                .attr('aria-labelled-by', 'flagstrap-drop-down-' + uniqueId)
                .addClass('flagstrap-list');

            if (plugin.settings.scrollable) {
                items.css({
                    height: 'auto',
                    maxHeight: plugin.settings.scrollableHeight,
                    overflowX: 'hidden'
                });
            }

            // Populate the bootstrap dropdown item list
            $(htmlSelect + ' option').each(function () {

                // Get original select option values and labels
                let text = $(this).text();
                let value = $(this).val();
                let flagIcon = null;

                // Build the flag icon
                if (value !== plugin.settings.placeholder.value) {
                    flagIcon = $('<i/>').addClass('flagstrap-icon flagstrap-' + value.toLowerCase()).css('margin-right', plugin.settings.labelMargin);
                }

                // Build a clickable drop down option item, insert the flag and label, attach click event
                let flagStrapItem = $('<a/>')
                    .attr('data-val', $(this).val())
                    .html(flagIcon)
                    .append(text)
                    .on('click', function (e) {
                        $(htmlSelect).val($(this).data('val'));
                        $(htmlSelect).trigger('change');
                        $('#flagstrap-selected-' + uniqueId).html($(this).html());

                        if (plugin.settings.searchable === true) {
                            $('#flagstrap-search-' + uniqueId).toggleClass('hidden').val(text);
                            $('#flagstrap-selected-' + uniqueId).toggleClass('hidden');
                        }

                        $('#flagstrap-drop-down-' + uniqueId + '-list').removeClass('d-flex');
                    });

                // Make it a list item
                let listItem = $('<li/>')
                    .addClass('flagstrap-list-item')
                    .prepend(flagStrapItem);

                // Append it to the drop down item list
                items.append(listItem);

            });

            return items;
        };

        function generateId(length) {
            let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz'.split('');

            if (!length) {
                length = Math.floor(Math.random() * chars.length);
            }

            let str = '';
            for (let i = 0; i < length; i++) {
                str += chars[Math.floor(Math.random() * chars.length)];
            }
            return str;
        }

        plugin.init();
    };

    $.fn.flagStrap = function (options) {

        let res = this.each(function (i) {

            if (typeof options === 'string' && $(this).data('flagStrap') !== undefined) {
                $(this).data('flagStrap').val(options);
            }
            else {
                if ($(this).data('flagStrap') === undefined) {
                    $(this).data('flagStrap', new $.flagStrap(this, options, i));
                }
            }
        });

        if (options !== undefined && options.onDomReady !== undefined && options.onDomReady instanceof Function) {
            options.onDomReady.call(this);
        }

        return res;
    }

})(jQuery);
