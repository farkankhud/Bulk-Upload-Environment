sap.ui.define(['sap/fe/test/ListReport'], function(ListReport) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ListReport(
        {
            appId: 'com.error.project3',
            componentId: 'ERROR_LOG1List',
            contextPath: '/ERROR_LOG1'
        },
        CustomPageDefinitions
    );
});