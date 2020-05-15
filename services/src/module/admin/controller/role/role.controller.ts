import { Controller,Get } from '@nestjs/common';
import { Config } from '../../../../config/config';
import { RoleService} from '../../service/role/role.service';
import { ResponseData } from '../../../../extend/response/index';

@Controller(Config.adminPath)
export class RoleController {
  constructor(private readonly roleService: RoleService){}
  @Get('role')
  async index() {
      var result = await this.roleService.find({});
      return new ResponseData({data:result});
  }

}
