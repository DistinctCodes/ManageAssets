import { Test, TestingModule } from "@nestjs/testing";
import { SystemLogsService } from "./system-logs.service";
import { getRepositoryToken } from "@nestjs/typeorm";
import { SystemLog } from "./entities/system-log.entity";
import { Repository } from "typeorm";
import { CreateLogDto } from "./dto/create-log.dto";

describe("SystemLogsService", () => {
  let service: SystemLogsService;
  let repo: Repository<SystemLog>;

  const mockLogs = [
    {
      id: "1",
      eventType: "LOGIN_FAILED",
      message: "error",
      timestamp: new Date(),
    },
    {
      id: "2",
      eventType: "CLOCK_IN",
      message: "success",
      timestamp: new Date(),
    },
  ];

  const mockRepo = {
    create: jest.fn().mockImplementation((dto) => dto),
    save: jest
      .fn()
      .mockImplementation((log) => Promise.resolve({ id: "123", ...log })),
    createQueryBuilder: jest.fn(() => {
      const qb = {
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        take: jest.fn().mockReturnThis(),
        getMany: jest.fn().mockResolvedValue(mockLogs),
        getCount: jest.fn().mockResolvedValue(2),
      };
      return qb;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SystemLogsService,
        {
          provide: getRepositoryToken(SystemLog),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<SystemLogsService>(SystemLogsService);
    repo = module.get<Repository<SystemLog>>(getRepositoryToken(SystemLog));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a log entry", async () => {
    const dto: CreateLogDto = {
      eventType: "LOGIN_FAILED",
      message: "Invalid password",
    };
    const result = await service.create(dto);
    expect(result).toHaveProperty("eventType", "LOGIN_FAILED");
    expect(repo.save).toHaveBeenCalled();
  });

  it("should retrieve logs with metadata", async () => {
    const filter = { eventType: "CLOCK_IN", limit: 10, offset: 0 };
    const result = await service.findAll(filter);
    expect(result.data.length).toBe(2);
    expect(result.meta.total).toBe(2);
  });
});
