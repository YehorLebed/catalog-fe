import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { environment } from 'src/environments/environment';
import { AuthData, LoginResponse, RegistrationResponse } from '../interfaces/user.interface';

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
     * @param   {AuthData}  authData  authentication data
     * @return  {Promise<RegistrationResponse>}
     */
    public registration(authData: AuthData): Promise<RegistrationResponse> {
        return this.httpClient.post<RegistrationResponse>(this.registrationUrl, authData).toPromise();
    }

    /**
     * send login request to server
     * @param   {AuthData}  authData  authentication data
     * @return  {Promise<LoginResponse>}
     */
    public login(authData: AuthData): Promise<LoginResponse> {
        return this.httpClient.post<LoginResponse>(this.loginUrl, authData).toPromise();
    }
}