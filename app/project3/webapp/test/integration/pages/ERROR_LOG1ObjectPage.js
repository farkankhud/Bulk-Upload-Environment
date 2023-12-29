sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.error.project3',
            componentId: 'ERROR_LOG1ObjectPage',
            contextPath: '/ERROR_LOG1'
        },
        CustomPageDefinitions
    );
});