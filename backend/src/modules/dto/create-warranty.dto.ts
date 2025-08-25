import { IsDateString, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';


export class CreateWarrantyDto {
@IsString()
@MinLength(1)
@MaxLength(100)
assetId: string;


@IsString()
@MinLength(1)
@MaxLength(100)
vendorId: string;


@IsDateString()
startDate: string; // ISO


@IsDateString()
endDate: string; // ISO


@IsOptional()
@IsString()
@MaxLength(5000)
coverageDetails?: string;
}