import {Injectable} from '@angular/core';
import {BehaviorSubject, Subscription} from 'rxjs';
import {IAuthData, IUser} from '../interfaces/user.interface';
import {ErrorService} from './error.service';
import {NotificationService} from './notification.service';
import {UserApiService} from './user-api.service';
import jwtDecode from 'jwt-decode';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token: BehaviorSubject<string> = new BehaviorSubject<string>(null);

    constructor(
        private errorService: ErrorService,
        private userApiService: UserApiService,
        private notificationService: NotificationService,
    ) {
    }

    /**
     * subscribe on token change
     * @param   {(token: string | null) => void} cb calback
     * @return  {Subscription}
     */
    public subscribeOnTokenChange(cb: (token: string | null) => void): Subscription {
        return this.token.subscribe(cb);
    }

    /**
     * registrate user
     * @param   {IAuthData}  authData  user authentication data
     * @return  {Promise<void>}
     */
    public async registration(authData: IAuthData): Promise<void> {
        try {
            const response = await this.userApiService.registration(authData);

            const message = `User '${response.email}' was created`;
            this.notificationService.setInfoNotification(message);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * login user
     * @param   {IAuthData}  authData  user authentication data
     * @return  {Promise<void>}
     */
    public async login(authData: IAuthData): Promise<void> {
        try {
            const response = await this.userApiService.login(authData);
            this.setAuthenticationData(response.token);

            // notify user
            const user = this.getUser();
            const message = `You logged in as '${user.email}'`;
            this.notificationService.setInfoNotification(message);
        } catch (error) {
            this.errorService.processErrorResponse(error);
        }
    }

    /**
     * logout from account
     * @return  {void}
     */
    public logout(): void {
        this.clearAuthenticationData();
    }

    /**
     * get user from token
     * @param   {string}  token  user token
     * @return  {IUser}
     */
    public getUser(): IUser | null {
        return this.token.value
            ? jwtDecode(this.token.value)
            : null;
    }

    /**
     * get authentication token
     */
    public getToken():string |null {
        return this.token.value;
    }

    /**
     * set token and save it ti local storage
     * @param   {string}  token  jwt token
     * @return  {void}
     */
    private setAuthenticationData(token: string) {
        localStorage.setItem('token', token);
        this.token.next(token);
    }

    /**
     * clear token and remove from local storage
     * @return  {void}  [return description]
     */
    private clearAuthenticationData() {
        localStorage.removeItem('token');
        this.token.next(null);
    }

    /**
     * define if user has provided role
     * @param {'customer'|'admin'} name
     */
    public isRole(name) {
        const user = this.getUser();
        return user && user.role && user.role.name === name;
    }
}
