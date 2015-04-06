$(function window_onDocumentReady () {
    
    if ($('body').hasClass('new-alumn')) {
        (function newAlumn_onDocumentReady () {
            var cActionStatus = readCookie('actionStatus'),
                cFirstName = readCookie('firstName'),
                cLastName = readCookie('lastName');
                
            if (cActionStatus) {
                window.alert(cActionStatus + '\n' + cFirstName + '\n' + cLastName);
            }
        })();
    }
    
    // simplified cookie handling
    eraseCookie('actionStatus');
    eraseCookie('firstName');
    eraseCookie('lastName');
});