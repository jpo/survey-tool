var ReportModel = function(data) {
    var self = this;
    
    // Properties

    self.modal = $('#add-question');
    self.questions = ko.observableArray([]);
    self.current = ko.observable();

    self.hasQuestions = ko.computed(function() {
        return self.questions().length > 0;
    }, self);

    self.questionCount = ko.computed(function() {
        return self.questions().length;
    }, self);
    
    // Functions

    self.newQuestion = function() {
        self.current(new QuestionModel());
        self.modal.modal();
    };

    self.editQuestion = function(item) {
        self.current(item);
        self.modal.modal();
    };

    self.saveQuestion = function(item) {
        var index;
        if (item.isValid()) {
            index = self.questions.indexOf(item);
            if (index >= 0) {
                self.questions.splice(index, 1);
                self.questions.splice(index, 0, item);
            } else {
                self.questions.push(item);
            }

            self.modal.modal('hide');
        }
        else {
            alert('Error: All fields are required!');
        }
    };

    self.moveUp = function(item) {
        var currIndex = self.questions.indexOf(item),
            prevIndex = currIndex - 1;

        if (currIndex > 0) {
            self.questions.splice(currIndex, 1);
            self.questions.splice(prevIndex, 0, item);
        }
    };
    
    self.moveDown = function(item) {
        var currIndex = self.questions.indexOf(item),
            nextIndex = currIndex + 1,
            lastIndex = self.questions().length - 1;

        if (currIndex < lastIndex) {
            self.questions.splice(currIndex, 1);
            self.questions.splice(nextIndex, 0, item);
        }
    };

    // Callbacks

    self.afterAdd = function(elem) {
        var el = $(elem);
        if (elem.nodeType === 1) {
            el.before("<div/>");
            el.prev()
                .width(el.innerWidth())
                .height(el.innerHeight())
                .css({
                    "position": "absolute",
                    "background-color": "#ffff99",
                    "opacity": "0.5"
                })
                .fadeOut(500);
        }
    };
    
    // Initialize

    if (data != null) {
        for (var i = 0; i < data.Questions.length; i++) {
            var q = new QuestionModel();
            q.id(data.Questions[i].Id);
            q.title(data.Questions[i].Title);
            q.type(data.Questions[i].Type);
            q.body(data.Questions[i].Body);
            q.isActive(data.Questions[i].IsActive);
            self.questions.push(q);
        }
    }

    return self;
};