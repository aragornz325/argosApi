import config from "src/config/config";
import { UsersEntity } from "src/user/entities/user.entity";
import * as jsonwebtoken from "jsonwebtoken";


export class JWT {
    public static signJWT(user : UsersEntity) {
        const token = jsonwebtoken.sign(
            { sub: user.id, role: user.role },
            config().security.tokenSecret,
            { expiresIn: config().security.tokenExpiration },
        )
        return token
    }
} 