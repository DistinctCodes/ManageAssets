
import { Test } from "@nestjs/testing";
import { QRCodeService } from "./qrcode.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { QRCode } from "./entities/qrcode.entity";
import { Repository } from "typeorm";

describe("QRCodeService", () => {
  let service: QRCodeService;
  let repo: Repository<QRCode>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        QRCodeService,
        {
          provide: getRepositoryToken(QRCode),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(QRCodeService);
    repo = module.get(getRepositoryToken(QRCode));
  });

  it("should generate a QR code", async () => {
    const mockSave = jest.spyOn(repo, "save").mockResolvedValue({
      id: "123",
      referenceId: "user123",
      data: "hello",
      imageUrl: "data:image/png;base64,...",
      createdAt: new Date(),
    } as any);

    const result = await service.generate("user123", "hello");
    expect(mockSave).toHaveBeenCalled();
    expect(result.referenceId).toBe("user123");
  });
});
