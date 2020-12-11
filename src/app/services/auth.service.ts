import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthData, User } from '../interfaces/user.interface';
import { ErrorService } from './error.service';
import { NotificationService } from './notification.service';
import { UserApiService } from './user-api.service';
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
  ) { }

  /**
   * registrate user 
   * @param   {AuthData}  authData  user authentication data
   * @return  {Promise<void>}
   */
  public async registration(authData: AuthData): Promise<void> {
    try {
      const response = await this.userApiService.registration(authData);
      const message = `User '${response.email}' was registrated`;
      this.notificationService.setInfoNotification(message);
    }
    catch (error) {
      this.errorService.processErrorResponse(error);
    }
  }

  /**
   * login user 
   * @param   {AuthData}  authData  user authentication data
   * @return  {Promise<void>}
   */
  public async login(authData: AuthData): Promise<void> {
    try {
      const response = await this.userApiService.login(authData);
      this.setAuthenticationData(response.token);

      // notify user
      const user = this.getUser();
      const message = `User '${user.email}' was registrated`;
      this.notificationService.setInfoNotification(message);
    }
    catch (error) {
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
   * @return  {User}
   */
  public getUser(): User | null {
    return this.token.value
      ? jwtDecode(this.token.value)
      : null;
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
   *
   * @return  {[type]}  [return description]
   */
  private clearAuthenticationData() {
    localStorage.removeItem('token');
    this.token.next(null);
  }
}
