import InputValidation from './inputValidationView';
import { CodeSelect, PagedCodeSelect } from './portalViews';


var PORTAL = window.PORTAL = window.PORTAL || {};
PORTAL.VIEWS = PORTAL.VIEWS || {};

/*
 * Creates a site parameter input view object
 * @param {Object} options
 *      @prop {Jquery element} $container - element where the site parameter inputs are contained
 *      @prop {PORTAL.MODELS.cachedCodes} siteTypeModel
 *      @prop {PORTAL.MODELS.cachedCodes} organizationModel
 * @returns {Object}
 *      @func initialize;
 */
PORTAL.VIEWS.siteParameterInputView = function(options) {
    var self = {};

    var initializeOrganizationSelect = function($select, model) {
        var formatData = function(data) {
            return {
                id : data.id,
                text : data.id + ' - ' + data.desc
            };
        };
        var isMatch = function(searchTerm, data) {
            var termMatcher;
            if (searchTerm) {
                termMatcher = new RegExp(searchTerm, 'i');
                return termMatcher.test(data.id) || termMatcher.test(data.desc);
            } else {
                return true;
            }
        };
        new CodeSelect($select, {
            model : model,
            formatData : formatData,
            isMatch : isMatch
        }, {
            minimumInputLength: 2,
            closeOnSelect : false
        });
    };

    var initializeSiteIdSelect = function($select, $orgsel) {
        var formatData = function(data) {
            return data.value + ' - ' + data.desc;
        };

        var parametername = 'organizationid';

        new PagedCodeSelect($select, {
            codes: 'monitoringlocation',
            formatData: formatData
            }, {
            minimumInputLength: 2
        }, $orgsel, parametername);
    };


    /*
     * Initialize the widgets and DOM event handlers
     * @return Jquery promise
     *      @resolve - when all models have been fetched successfully
     *      @reject - if any model's fetch failed.
     */
    self.initialize = function() {
        var $siteTypeSelect = options.$container.find('#siteType');
        var $organizationSelect = options.$container.find('#organization');
        var $siteIdInput = options.$container.find('#siteid');
        var $hucInput = options.$container.find('#huc');
        var $minActivitiesInput = options.$container.find('#min-activities');

        var fetchSiteType = options.siteTypeModel.fetch();
        var fetchOrganization = options.organizationModel.fetch();
        var fetchComplete = $.when(fetchSiteType, fetchOrganization);

        initializeSiteIdSelect($siteIdInput, $organizationSelect);

        fetchSiteType.done(function() {
            new CodeSelect($siteTypeSelect, {model : options.siteTypeModel});
        });

        fetchOrganization.done(function() {
            initializeOrganizationSelect($organizationSelect, options.organizationModel);
        });

        // Add event handlers
        new InputValidation({
            inputEl: $hucInput,
            validationFnc: PORTAL.hucValidator.validate,
            updateFnc: PORTAL.hucValidator.format
        });
        new InputValidation({
            inputEl : $minActivitiesInput,
            validationFnc : PORTAL.validators.positiveIntValidator
        });

        return fetchComplete;
    };

    return self;
};
