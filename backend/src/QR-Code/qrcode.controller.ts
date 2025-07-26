
import { Controller, Post, Body, Get, Param, Delete } from "@nestjs/common";
import { QRCodeService } from "./qrcode.service";

@Controller("qrcode")
export class QRCodeController {
  constructor(private readonly qrService: QRCodeService) {}

  @Post()
  generate(@Body() body: { referenceId: string; data: string }) {
    return this.qrService.generate(body.referenceId, body.data);
  }

  @Get(":id")
  getQRCode(@Param("id") id: string) {
    return this.qrService.findOne(id);
  }

  @Delete(":id")
  deleteQRCode(@Param("id") id: string) {
    return this.qrService.delete(id);
  }

  @Get("scan/:id")
  scanMock(@Param("id") id: string) {
    return this.qrService.mockScan(id);
  }
}
