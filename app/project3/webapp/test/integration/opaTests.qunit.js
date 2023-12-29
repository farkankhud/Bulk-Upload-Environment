sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/error/project3/test/integration/FirstJourney',
		'com/error/project3/test/integration/pages/ERROR_LOG1List',
		'com/error/project3/test/integration/pages/ERROR_LOG1ObjectPage'
    ],
    function(JourneyRunner, opaJourney, ERROR_LOG1List, ERROR_LOG1ObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/error/project3') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheERROR_LOG1List: ERROR_LOG1List,
					onTheERROR_LOG1ObjectPage: ERROR_LOG1ObjectPage
                }
            },
            opaJourney.run
        );
    }
);