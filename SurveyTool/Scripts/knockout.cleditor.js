/*
*   Knockout CLEditor
*   Created By Josh O'Rourke
*
*   MIT License: http://www.opensource.org/licenses/MIT
*/
(function () {
    if (typeof (ko) === undefined) {
        throw 'Knockout is required, please ensure it is loaded before loading this validation plug-in';
    }

    ko.bindingHandlers.cleditor = {
        init: function(element, valueAccessor, allBindingsAccessor) {
            var modelValue = valueAccessor(),
                allBindings = allBindingsAccessor();

            var $editor = $(element).cleditor({
                height: 200,
                controls: "bold italic underline | bullets numbering | color | undo redo",
                colors: '000000 049CDB 46A546 9D261D FFC40D F89406 C3325F 7A48B6'
            });
            
            $editor[0].change(function() {
                var elementValue = $editor[0].doc.body.innerHTML;
                if (ko.isWriteableObservable(modelValue)) {
                    modelValue(elementValue);
                } 
                else {
                    if (allBindings['_ko_property_writers'] && allBindings['_ko_property_writers'].cleditor) {
                        allBindings['_ko_property_writers'].cleditor(elementValue);
                    }
                }
            });
        },
        
        update: function(element, valueAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()) || '',
                $editor = $(element).cleditor();

            $editor[0].doc.body.innerHTML = value;
        }
    };
})();