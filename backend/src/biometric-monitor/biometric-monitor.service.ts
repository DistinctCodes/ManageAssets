import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeviceStatusDto } from "./dto/create-device-status.dto";
import { BiometricDevice } from "./entities/biometric-device.entity";

@Injectable()
export class BiometricMonitorService {
  private devices: Map<string, BiometricDevice> = new Map();

  reportStatus(dto: CreateDeviceStatusDto): BiometricDevice {
    const now = new Date();
    const existing = this.devices.get(dto.id);

    if (existing) {
      // Simulate downtime if lastSeen is too old (> 10 mins)
      const diff = (now.getTime() - existing.lastSeen.getTime()) / 60000;
      if (diff > 10) existing.downtime += 1;

      existing.status = dto.status;
      existing.lastSeen = now;
      existing.uptime += 1;
      existing.type = dto.type;
      existing.location = dto.location;
      return existing;
    }

    const newDevice: BiometricDevice = {
      id: dto.id,
      type: dto.type,
      location: dto.location,
      status: dto.status,
      lastSeen: now,
      uptime: 1,
      downtime: 0,
    };

    this.devices.set(dto.id, newDevice);
    return newDevice;
  }

  getAllDevices(): BiometricDevice[] {
    return Array.from(this.devices.values());
  }

  getDeviceStatus(id: string): BiometricDevice {
    const device = this.devices.get(id);
    if (!device) throw new NotFoundException("Device not found");
    return device;
  }

  getDeviceHealth(id: string): string {
    const device = this.devices.get(id);
    if (!device) throw new NotFoundException("Device not found");

    const healthRatio = device.uptime / (device.uptime + device.downtime);
    if (healthRatio > 0.9) return "Excellent";
    if (healthRatio > 0.7) return "Good";
    if (healthRatio > 0.5) return "Fair";
    return "Poor";
  }
}
