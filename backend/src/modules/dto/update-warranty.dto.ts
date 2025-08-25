import { PartialType } from '@nestjs/mapped-types';
import { CreateWarrantyDto } from './create-warranty.dto';
import { IsOptional, IsString, IsDateString, MaxLength, MinLength } from 'class-validator';


export class UpdateWarrantyDto extends PartialType(CreateWarrantyDto) {
@IsOptional()
@IsString()
@MinLength(1)
@MaxLength(100)
assetId?: string;


@IsOptional()
@IsString()
@MinLength(1)
@MaxLength(100)
vendorId?: string;


@IsOptional()
@IsDateString()
startDate?: string;


@IsOptional()
@IsDateString()
endDate?: string;


@IsOptional()
@IsString()
@MaxLength(5000)
coverageDetails?: string;
}