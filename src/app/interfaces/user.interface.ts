/**
 * IUser role interface
 */
export interface IRole {
    id: number;
    name: string;
}

/**
 * IUser interface
 */
export interface IUser {
    id: number;
    email: string;
    role: IRole;
}

/**
 * IAuthData interface is used to send user data
 * for authentication or registration
 */
export interface IAuthData {
    email: string;
    password: string;
}

/**
 * IRegistrationResponse interface is used for registration response
 */
export interface IRegistrationResponse {
    id: number;
    email: string;
}

/**
 * LoginResponse interface
 */
export interface LoginResponse {
    token: string;
}
