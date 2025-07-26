import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { NotificationsService } from "../notifications/notifications.service";
import { CreateNotificationDto } from "../notifications/dto/create-notification.dto";
import { UpdateNotificationDto } from "../notifications/dto/update-notification.dto";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";

@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createNotificationDto: CreateNotificationDto) {
    return this.notificationsService.create(createNotificationDto);
  }

  @Get("user/:userId")
  @UseGuards(JwtAuthGuard)
  findAll(@Param("userId") userId: string) {
    return this.notificationsService.findAllByUser(userId);
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  update(
    @Param("id") id: string,
    @Body() updateNotificationDto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(id, updateNotificationDto);
  }

  @Patch("read/:id")
  @UseGuards(JwtAuthGuard)
  markAsRead(@Param("id") id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  remove(@Param("id") id: string) {
    return this.notificationsService.remove(id);
  }
}
