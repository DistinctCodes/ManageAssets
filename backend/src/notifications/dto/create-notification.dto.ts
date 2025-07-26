import { IsString, IsNotEmpty } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @IsString()
  @IsNotEmpty()
  receiverId: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}
