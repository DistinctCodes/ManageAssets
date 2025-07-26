import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SystemLog } from "../system-logs/entities/system-log.entity";
import { SystemLogsService } from "../system-logs/system-logs.service";
import { SystemLogsController } from "../system-logs/system-logs.controller";

@Module({
  imports: [TypeOrmModule.forFeature([SystemLog])],
  controllers: [SystemLogsController],
  providers: [SystemLogsService],
  exports: [SystemLogsService], 
})
export class SystemLogsModule {}
