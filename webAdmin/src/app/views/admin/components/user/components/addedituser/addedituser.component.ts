import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import * as MyValidators from '../../../../../../extend/formMyValidators';
import { Http } from '../../../../../../services/http';
import { TootsService } from '../../../../../../services/toots.service';
import { Helper } from 'src/app/extend/helper';

@Component({
  selector: 'user-addedituser',
  templateUrl: './addedituser.component.html',
  styleUrls: ['./addedituser.component.scss']
})
export class AddedituserComponent implements OnInit {
  @Input() selectTiem;
  @Output() private close = new EventEmitter();
  @Output() private upDate = new EventEmitter();
  isLoad: boolean = false;
  password: string = '';
  validateForm: FormGroup;
  roleList = [];
  // 验证提示语
  autoTips = MyValidators.autoTips;
  urls = {
    add: 'addManager',
    edit: 'editManager',
    role: 'role'
  }
  constructor(private fb: FormBuilder, private $http: Http, private toots: TootsService) {

  }
  init() {
    this.getRoleList();
    const { required, maxLength, minLength, email, mobile, letterAndNumber } = MyValidators.MyValidators;
    let obj = {};
    if (this.selectTiem) {
      obj = {
        username: [this.selectTiem?.username, [required, maxLength(9), minLength(3), letterAndNumber]],
        mobile: [this.selectTiem?.mobile, [required, mobile]],
        email: [this.selectTiem?.email, [required, email]],
        password: ['', [letterAndNumber,maxLength(12), minLength(6)]],
        confirm: ['', [this.confirmValidator]],
        role_id: [this.selectTiem.role_id],
        status: [this.selectTiem?.status],
      };
    } else {
      obj = {
        username: ['', [required, maxLength(9), minLength(3), letterAndNumber]],
        mobile: ['', [required, mobile]],
        email: ['', [required, email]],
        password: ['', [required, maxLength(12), minLength(6), letterAndNumber]],
        confirm: ['', [required, this.confirmValidator]],
        role_id: [''],
        status: [1],
      };
    }
    this.validateForm = this.fb.group(obj);
    this.validateForm.valueChanges.subscribe(data=>{
      this.password = data.password;
    });
  }
  getRoleList() {
    this.$http.get(this.urls.role).subscribe(
      res => {
        if (res.statusCode === 0) {
          this.roleList = res.data;
          if(!this.validateForm.controls.role_id.value){ // 取值
            this.validateForm.patchValue({ // 赋值
              role_id:this.roleList[0]._id
            });
          }
        } else {
          this.toots.message('error', res.message || '获取角色列表失败');
        }
      }
    )
  }
  submitForm(value): void {
    const validArr = [];
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
      validArr.push(this.validateForm.controls[key].valid);
    }
    if (validArr.every(el => el)) { // 通过所有验证
      this.isLoad = true;
      let obj = { confirm: undefined, password:value.password };
      if(!value.password) obj.password = undefined;
      let param = JSON.parse(JSON.stringify(Object.assign({}, value, obj)));
      param.password && (param.password=Helper.getMd5(param.password));
      if(this.selectTiem) param._id =this.selectTiem._id;
      this.$http.post(this.selectTiem?this.urls.edit:this.urls.add,param).subscribe(
        res=>{
          this.isLoad = false;
          if(res.statusCode === 0){
            this.toots.message('success',res.message);
            this.closeModal();
            this.upDate.emit();
          }else{
            this.toots.message('error',res.message);
          }
        }
      )
    }
  }

  confirmValidator = (control: AbstractControl): MyValidators.MyValidationErrors | null => {
    if (control.value !== this.password) {
      return { confirm: { 'zh-cn': `确认密码不正确` } };
    }
    return null;
  };

  closeModal() {
    this.close.emit();
  }
  ngOnInit(): void {
    this.init();
  }

}