import { IsString, IsOptional, IsObject } from "class-validator";

export class CreateAuditLogDto {
  @IsString()
  action: string;

  @IsString()
  performedBy: string;

  @IsOptional()
  @IsObject()
  details?: any;
}
