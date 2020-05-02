import { Controller, Get } from '@nestjs/common';
import { Config } from '../../../../config/config';
import { ManagerService } from '../../service/manager/manager.service';
import { ResponseData } from '../../../../extend/response/index';

@Controller(Config.adminPath)
export class ManagerController {
  constructor(private readonly ManagerService: ManagerService) { }
  @Get('manager')
  async index() {
    //获取admin表以及role表关联数据
    var result = await this.ManagerService.getModel().aggregate([
      {
        $lookup: { from: "role", localField: "role_id", foreignField: "_id", as: "role" }
      }
    ]);
    const res = { data: result};
    return new ResponseData(res);
  }
}
