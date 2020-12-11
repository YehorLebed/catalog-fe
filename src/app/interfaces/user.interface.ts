/**
 * User role interface
 */
export interface Role {
    id: number;
    name: string;
}

/**
 * User interface
 */
export interface User {
    id: number;
    email: string;
    role: Role;
}

/**
 * AuthData interface is used to send user data 
 * for authentication or registration
 */
export interface AuthData {
    email: string;
    password: string;
}

/**
 * RegistrationResponse interface is used for registration response
 */
export interface RegistrationResponse {
    id: number;
    email: string;
}

/**
 * LoginResponse interface 
 */
export interface LoginResponse {
    token: string;
}