import { Controller, Get, Post, Body, Query } from "@nestjs/common";
import { SystemLogsService } from "./system-logs.service";
import { CreateLogDto } from "../system-logs/dto/create-log.dto";
import { FilterLogDto } from "../system-logs/dto/filter-log.dto";

@Controller("system-logs")
export class SystemLogsController {
  constructor(private readonly logsService: SystemLogsService) {}

  @Post()
  create(@Body() createLogDto: CreateLogDto) {
    return this.logsService.create(createLogDto);
  }

  @Get()
  findAll(@Query() filter: FilterLogDto) {
    return this.logsService.findAll(filter);
  }
}
