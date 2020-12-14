import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { INotification } from '../interfaces/notification.interface';

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    public notification: BehaviorSubject<INotification> = new BehaviorSubject<INotification>(null);

    /**
     * set error notification
     * @param {INotification} notification notification object
     * @return {void}
     */
    public setErrorNotification(message: string): void {
        this.notification.next({ type: 'error', message });
    }

    /**
     * set info notification
     * @param {string} message message
     * @return {void}
     */
    public setInfoNotification(message: string): void {
        this.notification.next({ type: 'info', message });
    }
}
