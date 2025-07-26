import {
  IsOptional,
  IsString,
  IsDateString,
  IsNumber,
  Min,
} from "class-validator";

export class FilterLogDto {
  @IsOptional()
  @IsString()
  eventType?: string;

  @IsOptional()
  @IsDateString()
  from?: string;

  @IsOptional()
  @IsDateString()
  to?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  offset?: number;

  @IsOptional()
  @IsNumber()
  @Min(1)
  limit?: number;
}
