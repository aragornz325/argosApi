import { SetMetadata } from "@nestjs/common";
import { ACCESS_LEVEL_KEY } from "constant/key-decorators";

export const AccessLevel = (level: number) => SetMetadata(ACCESS_LEVEL_KEY, level);