import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Warranty } from './entities/warranty.entity';
import { WarrantyService } from './warranty.service';
import { WarrantyController } from './warranty.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Warranty])],
  controllers: [WarrantyController],
  providers: [WarrantyService],
  exports: [WarrantyService],
})
export class WarrantyModule {}
