import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { Config } from '../../../../config/config';
import { Helper } from '../../../../extend/helper';
import { ManagerService } from '../../service/manager/manager.service';
import { ResponseData, ResponseErrorType, ResponseErrorEvent } from '../../../../extend/response/index';

@Controller(Config.adminPath)
export class ManagerController {
  constructor(private readonly ManagerService: ManagerService) { }
  @Get('manager')
  async index(@Query() que) {

    let result;
    //获取admin表以及role表关联数据
    // https://www.jianshu.com/p/4cad07d793d6
    if (que.username) {
      result = await this.ManagerService.getModel().aggregate([
        {
          // 查询条件
          $match: {
            username: que.username
          }
        },
        {
          $lookup: { from: "role", localField: "role_id", foreignField: "_id", as: "role" }
        }
      ]);
    } else {
      result = await this.ManagerService.getModel().aggregate([
        {
          $lookup: { from: "role", localField: "role_id", foreignField: "_id", as: "role" }
        }
      ]);
    }

    const res = { data: result };
    return new ResponseData(res);
  }
  @Post('addManager')
  async doAdd(@Body() body) {
    //从数据库查询当前用户名是否存在
    var adminResult = await this.ManagerService.find({ "username": body.username });
    if (adminResult.length > 0) {
      throw new ResponseErrorEvent(ResponseErrorType.incorrectFormat, '此管理已经存在');
    } else {
      const result = this.ManagerService.add(body);
      if (result) {
        return new ResponseData({
          age: '新增成功',
          data: result
        });
      } else {
        throw new ResponseErrorEvent(ResponseErrorType.unknown, '新增失败');
      }
    }
  }
  @Post('editManager')
  async doEdit(@Body() body) {
    const { _id, username, mobile, email, role_id, status, password } = body;
    let result;
    if (password) {
      result = await this.ManagerService.update({ "_id": _id }, { username, mobile, email, role_id, status, password });
    } else {
      result = await this.ManagerService.update({ "_id": _id }, { username, mobile, email, role_id, status });
    }
    if (result) {
      const redisResult = await Helper.cacheManager.del(username);
      return new ResponseData({
        message: '修改成功',
        data: result
      });
    } else {
      throw new ResponseErrorEvent(ResponseErrorType.unknown, '修改失败');
    }
  }
  @Post('delManager')
  async delete(@Body() body) {
    var result = await this.ManagerService.delete({ "_id": body.id });
    if (result) {
      Helper.cacheManager.del(body.username);
      return new ResponseData({
        message: '删除成功',
        data: result
      });
    } else {
      throw new ResponseErrorEvent(ResponseErrorType.unknown, '删除失败');
    }
  }
}
