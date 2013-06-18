/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Scripts/typings/bootstrap/bootstrap.d.ts" />

class Dropdown {
    dropdownopen: KnockoutObservableBool;
    chosenitems: KnockoutObservableArray;
    itemstoshow: KnockoutComputed;
    buttonclick() {
        this.dropdownopen(true);
    }
    additem(item: string) {
        this.chosenitems.push(item);
    }
    removeitem(item: string) {
        this.chosenitems.remove(item);
    }
    constructor(public elements: string[]) {
        this.chosenitems = ko.observableArray();
        this.dropdownopen = new ko.observable(false);
        this.itemstoshow = ko.computed(() => {
            return this.elements;
        });

    }
}

class viewmodel {
    drop: Dropdown;
    constructor() {
        this.drop = new Dropdown(countries);
    }
}
window.onload = () => {
    var vm = new viewmodel();
    ko.applyBindings(vm);

};
var countries = ["Brazil", "Canada", "Denmark"]