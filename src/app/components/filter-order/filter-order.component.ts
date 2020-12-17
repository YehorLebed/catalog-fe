import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ISelect} from '../../interfaces/select.interface';

@Component({
  selector: 'app-filter-order',
  templateUrl: './filter-order.component.html',
  styleUrls: ['./filter-order.component.scss']
})
export class FilterOrderComponent {
    @Output('onChange') onChange = new EventEmitter<ISelect>();
    @Input('options') options: ISelect[];

    handleChange(value) {
        const option = this.options.find(option =>
            option.value == value
        );
        this.onChange.emit(option);
    }
}
