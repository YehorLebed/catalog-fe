import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { IAuthData, LoginResponse, IRegistrationResponse } from '../interfaces/user.interface';

@Injectable({
    providedIn: 'root'
})
export class UserApiService {

    private loginUrl = `${environment.url}/authentication/login`;
    private registrationUrl = `${environment.url}/authentication/registration`;

    constructor(
        private httpClient: HttpClient
    ) {

    }

    /**
     * send registration request to server
     * @param   {IAuthData}  authData  authentication data
     * @return  {Promise<IRegistrationResponse>}
     */
    public registration(authData: IAuthData): Promise<IRegistrationResponse> {
        return this.httpClient.post<IRegistrationResponse>(this.registrationUrl, authData).toPromise();
    }

    /**
     * send login request to server
     * @param   {IAuthData}  authData  authentication data
     * @return  {Promise<LoginResponse>}
     */
    public login(authData: IAuthData): Promise<LoginResponse> {
        return this.httpClient.post<LoginResponse>(this.loginUrl, authData).toPromise();
    }
}
