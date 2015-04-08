// client.js
/* globals readCookie, eraseCookie */

$(function window_onDocumentReady () {
    
    if ($('body').hasClass('new-alumn')) {
        (function newAlumn_onDocumentReady () {
            var cActionStatus = readCookie('actionStatus'),
                cFirstName = readCookie('firstName'),
                cLastName = readCookie('lastName');
                
            if (cActionStatus && cActionStatus === 'ok') {
                window.alert('Alumn ' + cFirstName + ' ' + cLastName + ' saved!');
            }
        })();
    }
    
    // simplified cookie handling
    eraseCookie('actionStatus');
    eraseCookie('firstName');
    eraseCookie('lastName');
});