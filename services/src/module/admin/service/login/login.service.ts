import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AdminInterface } from '../../interfaces/admin.interface'

@Injectable()
export class LoginService {
  @InjectModel('Admin') private readonly adminModel;
  async find(userInfo:AdminInterface = {}){
    return await this.adminModel.find(userInfo);
  }
}
