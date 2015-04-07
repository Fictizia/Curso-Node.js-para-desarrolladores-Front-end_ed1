// client.js
/* globals readCookie, eraseCookie */

$(function window_onDocumentReady () {
    
    if ($('body').hasClass('new-alumn')) {
        (function newAlumn_onDocumentReady () {
            var cActionStatus = readCookie('actionStatus'),
                cStatus = readCookie('actionStatus'),
                cMessage = readCookie('contactoDone');
                
            if (cActionStatus && cActionStatus === 'ok') {
                window.alert('Alumn ' + cStatus + ' ' + cMessage + ' saved!');
            }
        })();
    }
    
    // simplified cookie handling
    eraseCookie('actionStatus');
    eraseCookie('contactoDone');
    eraseCookie('errorMessage');
});