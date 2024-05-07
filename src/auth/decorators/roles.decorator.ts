import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "src/constant/key-decorators";
import { ROLES } from "src/constant/roles";

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, true);