var QuestionModel = function() {
    var self = this;

    self.id = ko.observable(0);
    self.title = ko.observable().extend({ required: true });
    self.type = ko.observable().extend({ required: true });
    self.body = ko.observable().extend({ required: true });
    self.isActive = ko.observable(true);

    self.activeText = ko.computed(function() {
        return self.isActive() ? "true" : "false";
    }, self);

    self.isValid = function() {
        return self.title.isValid() && self.type.isValid() && self.body.isValid();
    };

    self.enable = function() {
        self.isActive(true);
    };

    self.disable = function() {
        self.isActive(false);
    };
};