var Dropdown = (function () {
    function Dropdown(elements) {
        this.elements = elements;
        var _this = this;
        this.chosenitems = ko.observableArray();
        this.dropdownopen = new ko.observable(false);
        this.itemstoshow = ko.computed(function () {
            return _this.elements;
        });
    }
    Dropdown.prototype.buttonclick = function () {
        this.dropdownopen(true);
    };
    Dropdown.prototype.additem = function (item) {
        this.chosenitems.push(item);
    };
    Dropdown.prototype.removeitem = function (item) {
        this.chosenitems.remove(item);
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
    "Brazil", 
    "Canada", 
    "Denmark"
];
