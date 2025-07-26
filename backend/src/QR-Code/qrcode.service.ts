
import { Injectable, NotFoundException } from "@nestjs/common";
import { QRCode as QRCodeLib } from "qrcode";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QRCode } from "./entities/qrcode.entity";

@Injectable()
export class QRCodeService {
  constructor(
    @InjectRepository(QRCode)
    private readonly qrRepo: Repository<QRCode>
  ) {}

  async generate(referenceId: string, data: string): Promise<QRCode> {
    const qrImageBase64 = await QRCodeLib.toDataURL(data);

    const qr = this.qrRepo.create({
      referenceId,
      data,
      imageUrl: qrImageBase64,
    });

    return this.qrRepo.save(qr);
  }

  async findOne(id: string): Promise<QRCode> {
    const qr = await this.qrRepo.findOneBy({ id });
    if (!qr) throw new NotFoundException("QR code not found");
    return qr;
  }

  async delete(id: string): Promise<void> {
    const result = await this.qrRepo.delete(id);
    if (result.affected === 0) throw new NotFoundException("QR code not found");
  }

  async mockScan(id: string): Promise<{ referenceId: string; data: string }> {
    const qr = await this.findOne(id);
    return {
      referenceId: qr.referenceId,
      data: qr.data,
    };
  }
}
