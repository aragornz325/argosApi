import { SetMetadata } from "@nestjs/common";
import { ROLES_KEY } from "constant/key-decorators";
import { ROLES } from "constant/roles";

export const Roles = (...roles: Array<keyof typeof ROLES>) => SetMetadata(ROLES_KEY, true);