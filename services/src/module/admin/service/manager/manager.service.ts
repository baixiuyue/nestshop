import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInterface } from '../../interfaces/admin.interface';

@Injectable()
export class ManagerService {
  constructor(
    @InjectModel('Admin') private readonly adminModel) { }

  async find(json: AdminInterface = {}, fields?: string) {
    try {
      return await this.adminModel.find(json, fields);
    } catch (error) {
      return [];
    }
  }
  getModel() {
    return this.adminModel;
  }
}
