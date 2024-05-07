import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY} from "src/constant/key-decorators";
import { ROLES } from "src/constant/roles";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);