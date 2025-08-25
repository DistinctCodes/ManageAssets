import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseBoolPipe } from '@nestjs/common';
import { WarrantyService } from './warranty.service';
import { CreateWarrantyDto } from './dto/create-warranty.dto';
import { UpdateWarrantyDto } from './dto/update-warranty.dto';
import { ExtendWarrantyDto } from './dto/extend-warranty.dto';


@Controller('warranties')
export class WarrantyController {
constructor(private readonly service: WarrantyService) {}


@Post()
create(@Body() dto: CreateWarrantyDto) {
return this.service.create(dto);
}


@Get()
findAll(
@Query('assetId') assetId?: string,
@Query('vendorId') vendorId?: string,
@Query('isValid', new ParseBoolPipe({ optional: true })) isValid?: boolean,
) {
return this.service.findAll({ assetId, vendorId, isValid });
}


@Get('expiring')
expiring(@Query('days') days = '30', @Query('remindBeforeDays') remindBeforeDays = '7') {
return this.service.getExpiringWithin(parseInt(days, 10), parseInt(remindBeforeDays, 10));
}


@Get(':id')
findOne(@Param('id') id: string) {
return this.service.findOne(id);
}


@Patch(':id')
update(@Param('id') id: string, @Body() dto: UpdateWarrantyDto) {
return this.service.update(id, dto);
}


@Post(':id/extend')
extend(@Param('id') id: string, @Body() dto: ExtendWarrantyDto) {
return this.service.extend(id, dto);
}


@Post(':id/cancel')
cancel(@Param('id') id: string) {
return this.service.cancel(id);
}


@Delete(':id')
remove(@Param('id') id: string) {
return this.service.remove(id);
}
}