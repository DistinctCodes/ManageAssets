import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateNotificationDto } from "../notifications/dto/create-notification.dto";
import { UpdateNotificationDto } from "../notifications/dto/update-notification.dto";
import { Notification } from "./entities/notification.entity";

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly notificationRepository: Repository<Notification>
  ) {}

  async create(
    createNotificationDto: CreateNotificationDto
  ): Promise<Notification> {
    const notification = this.notificationRepository.create(
      createNotificationDto
    );
    return this.notificationRepository.save(notification);
  }

  async findAllByUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({
      where: { receiverId: userId },
      order: { createdAt: "DESC" },
    });
  }

  async findOne(id: string): Promise<Notification> {
    const notification = await this.notificationRepository.findOne({
      where: { id },
    });
    if (!notification) {
      throw new NotFoundException(`Notification with ID "${id}" not found`);
    }
    return notification;
  }

  async update(
    id: string,
    updateNotificationDto: UpdateNotificationDto
  ): Promise<Notification> {
    const notification = await this.findOne(id);
    this.notificationRepository.merge(notification, updateNotificationDto);
    return this.notificationRepository.save(notification);
  }

  async markAsRead(id: string): Promise<Notification> {
    const notification = await this.findOne(id);
    notification.read = true;
    return this.notificationRepository.save(notification);
  }

  async remove(id: string): Promise<void> {
    const result = await this.notificationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Notification with ID "${id}" not found`);
    }
  }
}
