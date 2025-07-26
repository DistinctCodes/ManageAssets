import { Controller, Post, Body, Get } from "@nestjs/common";
import { AuditLogService } from "./audit-log.service";
import { CreateAuditLogDto } from "./dto/create-audit-log.dto";

@Controller("audit-logs")
export class AuditLogController {
  constructor(private readonly auditLogService: AuditLogService) {}

  @Post()
  create(@Body() createAuditLogDto: CreateAuditLogDto) {
    return this.auditLogService.create(createAuditLogDto);
  }

  @Get()
  findAll() {
    return this.auditLogService.findAll();
  }
}
