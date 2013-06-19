var Dropdown = (function () {
    function Dropdown(elements, buttontext, nomatchestxt, nomoretxt, entertxt) {
        this.elements = elements;
        var _this = this;
        this.searchquery = ko.observable('');
        this.chosenitems = ko.observableArray();
        this.inputfocus = ko.observable(false);
        this.dropdownopen = new ko.observable(false);
        this.focusmoved = ko.computed(function () {
            if(!_this.inputfocus()) {
                _this.dropdownopen(false);
            }
        }).extend({
            throttle: 100
        });
        this.itemstoshow = ko.computed(function () {
            var q = _this.searchquery().toLowerCase().trim();
            var returnarray = [];
            if(q.length) {
                ko.utils.arrayForEach(elements, function (item) {
                    var index = item.toLowerCase().indexOf(q);
                    if(index > -1) {
                        item = item.slice(0, index) + '<b>' + item.slice(index, index + q.length) + '</b>' + item.slice(index + q.length);
                        returnarray.push(item);
                    }
                });
            } else {
                returnarray = elements.slice(0);
            }
            ko.utils.arrayForEach(_this.chosenitems(), function (item) {
                ko.utils.arrayRemoveItem(returnarray, item);
            });
            return returnarray.sort();
        });
        this.helptxt = ko.computed(function () {
            var noitems = _this.itemstoshow().length;
            if(_this.elements.length == _this.chosenitems().length) {
                return nomoretxt || 'No more items to choose from';
            } else if(noitems === 0) {
                return nomatchestxt || 'No matches found';
            } else {
                return entertxt || 'Press enter to add the first highlighted item';
            }
        });
        this.buttontext = ko.computed(function () {
            var ci = _this.chosenitems();
            if(ci.length > 0) {
                return ci.toString() + '   <span class ="caret"></span>';
            } else {
                return buttontext || 'Choose item   <span class="caret"></span>';
            }
        });
    }
    Dropdown.prototype.keypressed = function (data, event) {
        if(event.charCode == 13) {
            if(this.itemstoshow().length) {
                this.additem(this.itemstoshow()[0]);
            }
        } else {
            return true;
        }
    };
    Dropdown.prototype.buttonclick = function () {
        this.dropdownopen(!this.dropdownopen());
        this.inputfocus(this.dropdownopen());
        this.searchquery('');
    };
    Dropdown.prototype.additem = function (item) {
        this.chosenitems.push(item.replace('<b>', '').replace('</b>', ''));
        this.chosenitems.sort();
        this.searchquery('');
        this.dropdownopen(true);
        this.inputfocus(true);
    };
    Dropdown.prototype.removeitem = function (item) {
        this.chosenitems.remove(item);
        this.dropdownopen(true);
        this.inputfocus(true);
    };
    return Dropdown;
})();
var viewmodel = (function () {
    function viewmodel() {
        this.drop = new Dropdown(countries);
    }
    return viewmodel;
})();
window.onload = function () {
    var vm = new viewmodel();
    ko.applyBindings(vm);
};
var countries = [
    "Armenia", 
    "Brazil", 
    "Canada", 
    "Denmark", 
    "Bolivia"
];
//@ sourceMappingURL=app.js.map
