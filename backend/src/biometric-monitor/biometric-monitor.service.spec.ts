import { Test, TestingModule } from "@nestjs/testing";
import { BiometricMonitorService } from "./biometric-monitor.service";
import { CreateDeviceStatusDto } from "./dto/create-device-status.dto";

describe("BiometricMonitorService", () => {
  let service: BiometricMonitorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BiometricMonitorService],
    }).compile();

    service = module.get<BiometricMonitorService>(BiometricMonitorService);
  });

  it("should register a new device", () => {
    const dto: CreateDeviceStatusDto = {
      id: "DEVICE_001",
      status: "online",
      type: "fingerprint",
      location: "HQ",
    };
    const result = service.reportStatus(dto);

    expect(result).toHaveProperty("id", dto.id);
    expect(result).toHaveProperty("uptime", 1);
  });

  it("should update existing device", () => {
    const dto: CreateDeviceStatusDto = {
      id: "DEVICE_001",
      status: "online",
      type: "fingerprint",
      location: "HQ",
    };
    service.reportStatus(dto);
    const result = service.reportStatus(dto);

    expect(result.uptime).toBe(2);
  });

  it("should retrieve device status", () => {
    const dto: CreateDeviceStatusDto = {
      id: "DEVICE_002",
      status: "offline",
      type: "retina",
      location: "Branch Office",
    };
    service.reportStatus(dto);

    const device = service.getDeviceStatus("DEVICE_002");
    expect(device.status).toBe("offline");
  });

  it("should evaluate device health", () => {
    const dto: CreateDeviceStatusDto = {
      id: "DEVICE_003",
      status: "online",
      type: "iris",
      location: "Zone A",
    };
    service.reportStatus(dto);
    const health = service.getDeviceHealth("DEVICE_003");

    expect(health).toBe("Excellent");
  });
});
