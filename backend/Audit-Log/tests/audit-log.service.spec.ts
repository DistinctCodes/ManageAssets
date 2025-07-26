import { Test, TestingModule } from "@nestjs/testing";
import { AuditLogService } from "../audit-log.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { AuditLog } from "../entities/audit-log.entity";
import { Repository } from "typeorm";

const mockRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
});

describe("AuditLogService", () => {
  let service: AuditLogService;
  let repo: Repository<AuditLog>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuditLogService,
        {
          provide: getRepositoryToken(AuditLog),
          useFactory: mockRepository,
        },
      ],
    }).compile();

    service = module.get<AuditLogService>(AuditLogService);
    repo = module.get<Repository<AuditLog>>(getRepositoryToken(AuditLog));
  });

  it("should create and save an audit log", async () => {
    const dto = {
      action: "UPDATE_ROLE",
      performedBy: "admin1",
      details: { userId: "abc123", newRole: "moderator" },
    };

    const created = { ...dto, id: "uuid", createdAt: new Date() };

    repo.create = jest.fn().mockReturnValue(dto);
    repo.save = jest.fn().mockResolvedValue(created);

    const result = await service.create(dto);
    expect(repo.create).toHaveBeenCalledWith(dto);
    expect(repo.save).toHaveBeenCalledWith(dto);
    expect(result).toEqual(created);
  });

  it("should return a list of audit logs", async () => {
    const logs = [
      {
        id: "uuid1",
        action: "DELETE_USER",
        performedBy: "admin1",
        details: { userId: "xyz123" },
        createdAt: new Date(),
      },
    ];
    repo.find = jest.fn().mockResolvedValue(logs);

    const result = await service.findAll();
    expect(result).toEqual(logs);
  });
});
