import { IsDateString } from 'class-validator';


export class ExtendWarrantyDto {
/** New end date must be > current end date */
@IsDateString()
newEndDate: string;
}