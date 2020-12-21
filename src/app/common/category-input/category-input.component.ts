import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ICategory} from '../../interfaces/category.interface';
import {CategoryService} from '../../services/category.service';

@Component({
    selector: 'app-category-input',
    templateUrl: './category-input.component.html',
    styleUrls: ['./category-input.component.scss']
})
export class CategoryInputComponent {
    @Output('onSelect') onSelect = new EventEmitter<ICategory>();
    @Input('selected') selected: ICategory = null;

    /**
     * handle select category
     * @param category
     */
    handleCategorySelect(category: ICategory) {
        this.selected = category;
        this.onSelect.emit(category);
    }

}
