// ================================================================================================
// AJAX SETUP
// ================================================================================================
$(document).ajaxStart(function() {
    window.departmentsAlert = toastr.info('Saving...');
});

$(document).ajaxStop(function() {
    toastr.clear(window.departmentsAlert);
});


// ================================================================================================
// Department
// Represents a single department in the DepartmentsList.
// ================================================================================================
var Department = function(data) {
    var self = this;
    
    // Routes used to perform remote CRUD operations.
    var routes = {
        'create': '/Departments/Create',
        'update': '/Departments/Edit',
        'delete': '/Departments/Delete'
    };

    // Gets or sets a status indicating whether this item is active or inactive.
    self.status = ko.computed({
        read:  function() { return self.IsActive() ? 'Active' : 'Inactive'; },
        write: function(val) { self.IsActive(val == 'Active' ? true : false); }
    }, self);

    // Determines whether or not the item is valid.
    self.isValid = function() {
        return self.Name() !== undefined && self.Name() !== null && self.Name() !== '';
    };
    
    // Creates the item remotely on the server.
    self.insert = function(callback) {
        var item = ko.mapping.toJS(self);
        $.post(routes['create'], item, callback);
    };

    // Updates the item remotely on the server.
    self.update = function(callback) {
        var item = ko.mapping.toJS(self);
        $.post(routes['update'], item, callback);
    };
    
    // Deletes the item remotely on the server.
    self.destroy = function(callback) {
        var item = ko.mapping.toJS(self);
        $.post(routes['delete'], item, callback);
    };

    // Initialization
    ko.mapping.fromJS(data, {}, self);
    return self;
};


// ================================================================================================
// DepartmentList
// Represents a list of departments.
// ================================================================================================
var DepartmentList = function(data) {
    var self = this;

    // Mapping used to create the 'items' property from passed in data.
    var mapping = {
        items: {
            key: function(data) { return ko.utils.unwrapObservable(data.Id); },
            create: function(opts) { return new Department(opts.data); }
        }
    };

    // Represent the item that is currently selected.
    self.current = ko.observable();

    // Retrieves the name of the template to use for the given item.
    self.templateName = function(item) {
        return self.current() === item ? 'editTmpl' : 'itemTmpl';
    };
    
    // Adds a new item to the client-side collection and selects it.
    self.add = function() {
        var item = self.items.mappedCreate({ Id: 0, Name: 'New Department', IsActive: false });
        self.items.unshift(item);
        self.current(item);
    };

    // Marks the given item as current and makes it editable.
    self.edit = function(item) {
        self.current(item);
    };

    // Cancels the current selection.
    self.cancel = function() {
        self.current(null);
    };

    // Removes an item from the client-side collection. If the item has been saved remotely, it
    // will be removed from the server as well.
    self.remove = function(item) {
        if (item.Id() > 0) {
            if (confirm('Are you sure you want to delete this item?')) {
                item.destroy(function() { self.items.remove(item); });
            }
        }
        else {
            self.items.remove(item);
        }
    };
    
    // Creates or updates the currently selected item on the server if it is valid.
    self.save = function(item) {
        if (item.isValid()) {
            if (item.Id() === 0)
                item.insert(function(data) { item.Id(data.Id); self.current(null); });
            else
                item.update(function() { self.current(null);  });
        }
        else {
            toastr.error('All fields are required!');
        }
    };
    
    // Initialize
    ko.mapping.fromJS({ items: data }, mapping, self);
    return self;
};