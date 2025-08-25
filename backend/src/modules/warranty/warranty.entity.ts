import {
Entity,
PrimaryGeneratedColumn,
Column,
CreateDateColumn,
UpdateDateColumn,
Index,
} from 'typeorm';


@Entity('warranties')
export class Warranty {
@PrimaryGeneratedColumn('uuid')
id: string;


/** Generic foreign keys (strings or UUIDs). Keep this module independent. */
@Index()
@Column({ type: 'varchar', length: 100 })
assetId: string;


@Index()
@Column({ type: 'varchar', length: 100 })
vendorId: string;


@Column({ type: 'timestamptz' })
startDate: Date;


@Index()
@Column({ type: 'timestamptz' })
endDate: Date;


@Column({ type: 'text', nullable: true })
coverageDetails?: string | null;


/**
* Persisted validity flag for faster querying; always recomputed on writes.
* Rule: valid if now <= endDate.
*/
@Index()
@Column({ type: 'boolean', default: true })
isValid: boolean;


@CreateDateColumn({ type: 'timestamptz' })
createdAt: Date;


@UpdateDateColumn({ type: 'timestamptz' })
updatedAt: Date;
}