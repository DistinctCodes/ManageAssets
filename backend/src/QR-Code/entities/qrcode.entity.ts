
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity("qr_codes")
export class QRCode {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  referenceId: string;

  @Column("text")
  data: string;

  @Column({ nullable: true })
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}
