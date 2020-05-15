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
  async add(json: AdminInterface) {
    try {
      var admin = new this.adminModel(json);
      var result = await admin.save();
      return result;
    } catch (error) {
      return null;
    }
  }

  async update(json1: AdminInterface, json2: AdminInterface) {
    try {
      var result = await this.adminModel.updateOne(json1, json2);
      return result;
    } catch (error) {
      return null;
    }
  }

  async delete(json: AdminInterface) {
    try {
      var result = await this.adminModel.deleteOne(json);
      return result;
    } catch (error) {
      return null;
    }
  }
}
