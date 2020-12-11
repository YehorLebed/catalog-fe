import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorResponse } from '../interfaces/error.interface';
import { NotificationService } from "./notification.service";

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    private errorResponse: ErrorResponse = null;
    private errorHttpResponse: HttpErrorResponse = null;

    constructor(
        private notificationService: NotificationService
    ) { }

    /**
     * process error http response
     * @param {HttpErrorResponse} errorHttpResponse
     * @return {void}
     */
    public processErrorResponse(errorHttpResponse: HttpErrorResponse): void {
        // prepare error notification
        this.setErrorResponse(errorHttpResponse);
        const message = this.getErrorMessage();
        // set notification
        this.notificationService.setErrorNotification(message);
        this.logError();
    }

    /**
     * set error response
     * @param {HttpErrorResponse} errorResponse error response from server
     * @return {void}
     */
    private setErrorResponse(errorHttpResponse: HttpErrorResponse): void {
        this.errorHttpResponse = errorHttpResponse;
        this.errorResponse = errorHttpResponse.error;
    }

    /**
     * get notification message from error
     * @return {string} notification message
     */
    getErrorMessage(): string {
        if (this.errorResponse) {
            return this.errorResponse.errors.join('\n');
        } else {
            return this.errorHttpResponse.message;
        }
    }

    /**
     * log error
     * @return {void}
     */
    logError(): void {
        console.log('Http Error Response: ', this.errorHttpResponse);
        console.log('Error Response: ', this.errorResponse);
    }

}
