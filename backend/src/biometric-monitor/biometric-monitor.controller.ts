import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { BiometricMonitorService } from "./biometric-monitor.service";
import { CreateDeviceStatusDto } from "./dto/create-device-status.dto";

@Controller("biometric-monitor")
export class BiometricMonitorController {
  constructor(private readonly monitorService: BiometricMonitorService) {}

  @Post("report")
  reportStatus(@Body() dto: CreateDeviceStatusDto) {
    return this.monitorService.reportStatus(dto);
  }

  @Get("devices")
  getAllDevices() {
    return this.monitorService.getAllDevices();
  }

  @Get("devices/:id")
  getDeviceStatus(@Param("id") id: string) {
    return this.monitorService.getDeviceStatus(id);
  }

  @Get("devices/:id/health")
  getDeviceHealth(@Param("id") id: string) {
    return this.monitorService.getDeviceHealth(id);
  }
}
