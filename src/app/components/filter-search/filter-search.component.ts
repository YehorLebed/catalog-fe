import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-filter-search',
    templateUrl: './filter-search.component.html',
    styleUrls: ['./filter-search.component.scss']
})
export class FilterSearchComponent implements OnInit {

    @Output('onApply') onApply = new EventEmitter<string>();
    public filterSearch: FormGroup;

    constructor() {
    }

    ngOnInit(): void {
        this.filterSearch = new FormGroup({
            search: new FormControl(null, []),
        });
    }

    get search() {
        return this.filterSearch.get('search');
    }

    onSubmit() {
        this.onApply.emit(this.search.value);
    }

}
