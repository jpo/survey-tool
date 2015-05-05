var SurveyListModel = function() {
    var self = this;

    self.destroy = function (item, event) {
        var $target = $(event.target);

        if (confirm('Are you sure you want to delete this item?')) {
            $.post($target.attr('href'), function() {
                $target.parents('tr').remove();
            });
        }

        return false;
    };
};