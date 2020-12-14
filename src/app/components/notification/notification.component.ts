import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { INotification } from '../../interfaces/notification.interface'
import { NotificationService } from 'src/app/services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit, OnDestroy {
    // constant
    private readonly timers = {
        info: 50000,
        error: 80000
    };

    // options
    public notification: INotification = null;
    private isActive = false;

    // subscriptions
    private messageSubscription: Subscription = null;
    private timeoutSubscription: any = null;

    constructor(
        private notificationService: NotificationService
    ) { }

    /**
     * show message and hide it after timeout
     * @param {INotification} notification notification message and type
     * @return {void}
     */
    notify(notification: INotification): void {
        if (this.timeoutSubscription) {
            clearTimeout(this.timeoutSubscription);
        }

        this.notification = notification;
        this.isActive = true;
        this.timeoutSubscription = setTimeout(() => {
            this.isActive = false;
            this.timeoutSubscription = null;
        }, this.timers[this.notification.type]
        );
    }

    /**
     * handle close button
     * @return {void}
     */
    handleClose(): void {
        clearTimeout(this.timeoutSubscription);
        this.timeoutSubscription = null;
        this.isActive = false;
    }

    /**
     * subscribe for notification change
     * @return {void}
     */
    ngOnInit(): void {
        this.messageSubscription = this.notificationService.notification
            .subscribe(notification => {
                if (notification && notification.message) {
                    this.notify(notification);
                }
            });
    }

    /**
     * unsubscribe from all subscriptions
     * @return {void}
     */
    ngOnDestroy(): void {
        if (!this.messageSubscription.closed) {
            this.messageSubscription.unsubscribe();
            this.messageSubscription = null;
        }
        if (this.timeoutSubscription) {
            clearTimeout(this.timeoutSubscription);
            this.timeoutSubscription = null;
        }
    }
}
