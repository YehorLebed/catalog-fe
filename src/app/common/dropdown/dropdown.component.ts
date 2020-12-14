import {Component, ContentChild, Input, TemplateRef} from '@angular/core';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
    public title = 'Title';
    public items = ['title1', 'title2', 'title3'];
    public show = false;

    @Input('itemTemplate') itemTemplate: TemplateRef<any>;

    public toggleShow() {
        this.show = !this.show;
    }
}


