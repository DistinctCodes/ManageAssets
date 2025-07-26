import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SystemLog } from "../system-logs/entities/system-log.entity";
import { CreateLogDto } from "../system-logs/dto/create-log.dto";
import { FilterLogDto } from "../system-logs/dto/filter-log.dto";

@Injectable()
export class SystemLogsService {
  constructor(
    @InjectRepository(SystemLog)
    private readonly logRepo: Repository<SystemLog>
  ) {}

  async create(createLogDto: CreateLogDto): Promise<SystemLog> {
    const log = this.logRepo.create(createLogDto);
    return this.logRepo.save(log);
  }

  async findAll(filter: FilterLogDto): Promise<{
    data: SystemLog[];
    meta: { total: number; limit?: number; offset?: number };
  }> {
    const query = this.logRepo.createQueryBuilder("log");

    if (filter.eventType) {
      query.andWhere("log.eventType = :eventType", {
        eventType: filter.eventType,
      });
    }

    if (filter.from) {
      query.andWhere("log.timestamp >= :from", { from: filter.from });
    }

    if (filter.to) {
      query.andWhere("log.timestamp <= :to", { to: filter.to });
    }

    const total = await query.getCount();

    if (filter.offset) query.skip(filter.offset);
    if (filter.limit) query.take(filter.limit);

    const data = await query.orderBy("log.timestamp", "DESC").getMany();

    return {
      data,
      meta: {
        total,
        limit: filter.limit,
        offset: filter.offset,
      },
    };
  }
}
