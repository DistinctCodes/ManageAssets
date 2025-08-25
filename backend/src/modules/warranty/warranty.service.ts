import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
}


/** Extend warranty by setting a new end date greater than current end date */
async extend(id: string, dto: ExtendWarrantyDto): Promise<Warranty> {
const w = await this.findOne(id);
const nextEnd = new Date(dto.newEndDate);
if (isNaN(nextEnd.getTime())) throw new BadRequestException('Invalid newEndDate');
if (nextEnd.getTime() <= new Date(w.endDate).getTime()) {
throw new BadRequestException('newEndDate must be greater than current endDate');
}
w.endDate = nextEnd;
w.isValid = this.computeIsValid(nextEnd);
return this.repo.save(w);
}


/** Cancel warranty: immediate invalidation by setting endDate to now and isValid=false */
async cancel(id: string): Promise<Warranty> {
const w = await this.findOne(id);
const now = new Date();
w.endDate = now;
w.isValid = false;
return this.repo.save(w);
}


/** Delete (hard delete to keep module simple) */
async remove(id: string): Promise<void> {
await this.repo.delete(id);
}


/**
* Mocked expiration reminders: return items expiring within `days` and their reminderTimestamp
* (e.g., 7 days before endDate). No external scheduler; caller can poll.
*/
async getExpiringWithin(days = 30, remindBeforeDays = 7): Promise<Array<{ warranty: Warranty; reminderTimestamp: Date }>> {
const now = new Date();
const cutoff = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
const soon = await this.repo.find({ where: { }, order: { endDate: 'ASC' } });
return soon
.filter(w => new Date(w.endDate) >= now && new Date(w.endDate) <= cutoff)
.map(w => ({
warranty: w,
reminderTimestamp: new Date(new Date(w.endDate).getTime() - remindBeforeDays * 24 * 60 * 60 * 1000),
}));
}
}