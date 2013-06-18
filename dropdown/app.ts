/// <reference path="Scripts/typings/knockout/knockout.d.ts" />
/// <reference path="Scripts/typings/jquery/jquery.d.ts" />
/// <reference path="Scripts/typings/bootstrap/bootstrap.d.ts" />

class Dropdown {
    dropdownopen: KnockoutObservableBool;
    chosenitems: KnockoutObservableArray;
    itemstoshow: KnockoutComputed;
    buttontext: KnockoutComputed;
    searchquery: KnockoutObservableString;
    inputfocus: KnockoutObservableBool;
    focusmoved: KnockoutComputed;
    firstitem: KnockoutObservableString;
    keypressed(data, event) {
        if (event.charCode == 13) {
            if (this.itemstoshow().length)
                this.additem(this.itemstoshow()[0]);
        }
        else
            return true;
    };
    buttonclick() {
        this.dropdownopen(!this.dropdownopen());
        this.inputfocus(this.dropdownopen());
        this.searchquery('');
    };
    additem(item: string) {
        this.chosenitems.push(item.replace('<b>', '').replace('</b>', ''));
        this.chosenitems.sort();
        this.searchquery('');
        this.dropdownopen(true);
        this.inputfocus(true);
    };
    removeitem(item: string) {
        this.chosenitems.remove(item);
        this.dropdownopen(true);
        this.inputfocus(true);
    };
    constructor(public elements: string[], buttontext?: string) {
        this.searchquery = ko.observable('');
        this.chosenitems = ko.observableArray();
        this.inputfocus = ko.observable(false);
        this.dropdownopen = new ko.observable(false);
        this.focusmoved = ko.computed(() => {
            if (!this.inputfocus())
                this.dropdownopen(false);
        }).extend({ throttle: 100 });

        this.itemstoshow = ko.computed(() => {
            var q = this.searchquery().toLowerCase().trim();
            var returnarray = [];
            if (q.length)
                ko.utils.arrayForEach(elements, function (item: string) {
                    var index = item.toLowerCase().indexOf(q);
                    if (index > -1) {
                        item = item.slice(0, index) + '<b>' + item.slice(index, index + q.length) + '</b>' + item.slice(index + q.length);
                        returnarray.push(item);
                    }
                });
            else
                returnarray = elements.slice(0);
            ko.utils.arrayForEach(this.chosenitems(), function (item: string) {
                ko.utils.arrayRemoveItem(returnarray, item);
            });
            return returnarray.sort();
        });
        this.buttontext = ko.computed(() => {
            var ci = this.chosenitems();
            if (ci.length > 0) {
                return ci.toString() + '   <span class ="caret"></span>';
            }
            else
                return buttontext ? buttontext : 'Choose item   <span class="caret"></span>';
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
var countries = [
    "Armenia",
    "Brazil",
    "Canada",
    "Denmark",
"Bolivia"];