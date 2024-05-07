import { SetMetadata } from "@nestjs/common";
import { PUBLIC_KEY } from "src/constant/key-decorators";

export const PublicAccess = () => SetMetadata(PUBLIC_KEY, true);