import { SetMetadata } from "@nestjs/common";
import { ADMIN_KEY} from "constant/key-decorators";
import { ROLES } from "constant/roles";

export const AdminAccess = () => SetMetadata(ADMIN_KEY, ROLES.ADMIN);