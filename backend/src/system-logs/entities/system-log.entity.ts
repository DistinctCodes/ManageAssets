import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("system_logs")
export class SystemLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  eventType: string;

  @Column("text")
  message: string;

  @CreateDateColumn()
  timestamp: Date;
}
