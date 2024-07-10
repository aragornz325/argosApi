export interface AuthBody {
    email: string;
    password: string;
}

export interface AuthTokenResult {
    sub:  string;
    role: string;
    iat:  number;
    exp:  number;
}

export interface IUseToken {
    sub:  string;
    role: string;
    isExpired: boolean;
}