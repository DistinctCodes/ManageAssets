import { IsString } from "class-validator";

export class CreateLogDto {
  @IsString()
  eventType: string;

  @IsString()
  message: string;
}
