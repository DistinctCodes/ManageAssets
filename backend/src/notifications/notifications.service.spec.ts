import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { NotificationsService } from "./notifications.service";
import { Notification } from "./entities/notification.entity";
import { CreateNotificationDto } from "../../src/notifications/dto/create-notification.dto";
import { UpdateNotificationDto } from "../../src/notifications/dto/update-notification.dto";
import { NotFoundException } from "@nestjs/common";

// Mock TypeORM repository
const mockNotificationRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  merge: jest.fn(),
  delete: jest.fn(),
});

describe("NotificationsService", () => {
  let service: NotificationsService;
  let repository: Repository<Notification>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificationsService,
        {
          provide: getRepositoryToken(Notification),
          useFactory: mockNotificationRepository,
        },
      ],
    }).compile();

    service = module.get<NotificationsService>(NotificationsService);
    repository = module.get<Repository<Notification>>(
      getRepositoryToken(Notification)
    );
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create", () => {
    it("should create and save a new notification", async () => {
      const createNotificationDto: CreateNotificationDto = {
        senderId: "sender-uuid",
        receiverId: "receiver-uuid",
        message: "Test message",
      };
      const notification = new Notification();
      jest.spyOn(repository, "create").mockReturnValue(notification);
      jest.spyOn(repository, "save").mockResolvedValue(notification);

      const result = await service.create(createNotificationDto);
      expect(repository.create).toHaveBeenCalledWith(createNotificationDto);
      expect(repository.save).toHaveBeenCalledWith(notification);
      expect(result).toEqual(notification);
    });
  });

  describe("findAllByUser", () => {
    it("should return an array of notifications for a user", async () => {
      const userId = "receiver-uuid";
      const notifications = [new Notification(), new Notification()];
      jest.spyOn(repository, "find").mockResolvedValue(notifications);

      const result = await service.findAllByUser(userId);
      expect(repository.find).toHaveBeenCalledWith({
        where: { receiverId: userId },
        order: { createdAt: "DESC" },
      });
      expect(result).toEqual(notifications);
    });
  });

  describe("findOne", () => {
    it("should return a notification if found", async () => {
      const notificationId = "notification-uuid";
      const notification = new Notification();
      jest.spyOn(repository, "findOne").mockResolvedValue(notification);

      const result = await service.findOne(notificationId);
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: notificationId },
      });
      expect(result).toEqual(notification);
    });

    it("should throw a NotFoundException if notification is not found", async () => {
      const notificationId = "non-existent-uuid";
      jest.spyOn(repository, "findOne").mockResolvedValue(undefined);

      await expect(service.findOne(notificationId)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe("update", () => {
    it("should update a notification", async () => {
      const notificationId = "notification-uuid";
      const updateDto: UpdateNotificationDto = { read: true };
      const existingNotification = new Notification();
      existingNotification.id = notificationId;
      existingNotification.read = false;

      // Mock findOne to return the existing notification
      jest.spyOn(service, "findOne").mockResolvedValue(existingNotification);
      jest
        .spyOn(repository, "save")
        .mockResolvedValue({ ...existingNotification, ...updateDto });
      jest.spyOn(repository, "merge");

      const result = await service.update(notificationId, updateDto);

      expect(service.findOne).toHaveBeenCalledWith(notificationId);
      expect(repository.merge).toHaveBeenCalledWith(
        existingNotification,
        updateDto
      );
      expect(repository.save).toHaveBeenCalledWith(existingNotification);
      expect(result.read).toBe(true);
    });
  });

  describe("markAsRead", () => {
    it("should mark a notification as read", async () => {
      const notificationId = "notification-uuid";
      const notification = new Notification();
      notification.read = false;
      jest.spyOn(service, "findOne").mockResolvedValue(notification);
      jest
        .spyOn(repository, "save")
        .mockResolvedValue({ ...notification, read: true });

      const result = await service.markAsRead(notificationId);
      expect(service.findOne).toHaveBeenCalledWith(notificationId);
      expect(notification.read).toBe(true);
      expect(repository.save).toHaveBeenCalledWith(notification);
      expect(result.read).toBe(true);
    });
  });

  describe("remove", () => {
    it("should remove a notification", async () => {
      const notificationId = "notification-uuid";
      jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 1, raw: {} });

      await service.remove(notificationId);
      expect(repository.delete).toHaveBeenCalledWith(notificationId);
    });

    it("should throw a NotFoundException if notification to remove is not found", async () => {
      const notificationId = "non-existent-uuid";
      jest
        .spyOn(repository, "delete")
        .mockResolvedValue({ affected: 0, raw: {} });

      await expect(service.remove(notificationId)).rejects.toThrow(
        NotFoundException
      );
    });
  });
});
