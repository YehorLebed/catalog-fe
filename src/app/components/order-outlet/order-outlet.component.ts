import {Component, Input, Output, EventEmitter} from '@angular/core';
import {ISelect} from '../../interfaces/select.interface';

@Component({
  selector: 'app-order-outlet',
  templateUrl: './order-outlet.component.html',
  styleUrls: ['./order-outlet.component.scss']
})
export class OrderOutletComponent {
    @Output('onChange') onChange = new EventEmitter<ISelect>();
    @Input('options') options: ISelect[];

    handleChange(value) {
        const option = this.options.find(option =>
            option.value == value
        );
        this.onChange.emit(option);
    }
}
