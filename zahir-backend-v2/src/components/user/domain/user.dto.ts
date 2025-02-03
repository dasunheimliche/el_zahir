import { IsString, IsNotEmpty, IsOptional, IsUrl } from "class-validator";
import { CreateUserDto } from "../../auth/domain/auth.dto";

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  lastname?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsUrl()
  @IsOptional()
  mainPanelImg?: string;

  @IsUrl()
  @IsOptional()
  profileImg?: string;
}

export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export type User = FromDto<CreateUserDto> & {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  lastLoginAt?: Date;
  isActive: boolean;
  version: number;
  profile: UserProfile;
};

export type UserProfile = FromDto<UpdateUserProfileDto>;

type FromDto<T> = {
  [P in keyof T]: T[P];
};
