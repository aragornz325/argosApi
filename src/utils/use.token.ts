import { AuthTokenResult, IUseToken } from "src/auth/interfaces/auth.interfaces";
import * as jsonwebtoken from "jsonwebtoken";
import config from "src/config/config";

export const useToken = (token: string): IUseToken | string => {
    try {
        const decodedToken = jsonwebtoken.decode(token) as AuthTokenResult
        
        const currentDate = new Date()
        const expiresDate = new Date(decodedToken.exp)

        return {
            sub: decodedToken.sub,
            role: decodedToken.role,
            isExpired: +expiresDate <= +currentDate / 1000,
        }
    } catch (error) {
        return 'token is invalid '
    }
}