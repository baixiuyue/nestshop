import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {RoleInterface} from '../../interfaces/role.interface';

@Injectable()
export class RoleService {
  constructor(@InjectModel('Role') private roleModel){}
  
  async find(json:RoleInterface={},fields?:string){
      try {
          return await this.roleModel.find(json,fields);
      } catch (error) {
          return [];
      }       
  }
}
