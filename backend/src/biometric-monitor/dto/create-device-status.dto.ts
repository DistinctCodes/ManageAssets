import { IsString, IsIn } from "class-validator";

export class CreateDeviceStatusDto {
  @IsString()
  id: string;

  @IsString()
  type: string;

  @IsString()
  location: string;

  @IsIn(["online", "offline"])
  status: "online" | "offline";
}
