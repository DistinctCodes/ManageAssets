import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("audit_logs")
export class AuditLog {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  action: string;

  @Column()
  performedBy: string;

  @Column("jsonb", { nullable: true })
  details: any;

  @CreateDateColumn()
  createdAt: Date;
}

