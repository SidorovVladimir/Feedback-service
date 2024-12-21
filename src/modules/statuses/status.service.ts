import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Status } from './entities/status.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class StatusService {
  constructor(
    @InjectRepository(Status)
    private readonly statusRepository: Repository<Status>,
  ) {}

  async createStatus(name: string): Promise<Status> {
    try {
      const status = await this.findStatusByName(name);
      if (status) return status;
      const newStatus = new Status();
      newStatus.name = name;
      await this.statusRepository.save(newStatus);
      return newStatus;
    } catch (e) {
      throw new Error(e);
    }
  }

  async findStatusByName(name: string): Promise<Status> {
    return this.statusRepository.findOne({ where: { name } });
  }
}
