
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QRCode } from "./entities/qrcode.entity";
import { QRCodeService } from "./qrcode.service";
import { QRCodeController } from "./qrcode.controller";

@Module({
  imports: [TypeOrmModule.forFeature([QRCode])],
  controllers: [QRCodeController],
  providers: [QRCodeService],
})
export class QRCodeModule {}
