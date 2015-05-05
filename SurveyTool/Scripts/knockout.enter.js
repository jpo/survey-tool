/*
*   Knockout Enter
*   Created By Josh O'Rourke
*
*   MIT License: http://www.opensource.org/licenses/MIT
*/
(function () {
    if (typeof (ko) === undefined) {
        throw 'Knockout is required, please ensure it is loaded before loading this validation plug-in';
    }
    
    ko.bindingHandlers.enter = {
        init: function(element, valueAccessor, allBindingsAccessor, viewModel) {
            var wrappedHandler, newValueAccessor;

            wrappedHandler = function(data, e) {
                if (e.keyCode === 13) {
                    ko.utils.triggerEvent(element, 'blur');
                    valueAccessor().call(this, data, e);
                }
            };
            
            newValueAccessor = function() {
                return { keyup: wrappedHandler };
            };
            
            ko.bindingHandlers.event.init(element, newValueAccessor, allBindingsAccessor, viewModel);
        }
    };
})();