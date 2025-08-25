import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Warranty } from './warranty.entity';


@Injectable()
export class WarrantyRepository {
constructor(@InjectRepository(Warranty) private readonly repo: Repository<Warranty>) {}


save(entity: Warranty) { return this.repo.save(entity); }
find(options?: any) { return this.repo.find(options); }
findOne(options: any) { return this.repo.findOne(options); }
delete(id: string) { return this.repo.delete(id); }
}