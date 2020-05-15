# 全局组件
```
加载load <g-load></g-load>

模态框 import { NzModalService } from 'ng-zorro-antd/modal';
method 为 'create' 'info', 'success', 'error' 'warning', 'confirm'
this.modal.[methot]({
      nzTitle: 'This is an error message',
      nzContent: 'some messages...some messages...',
      nzOnOk: () => console.log('Info OK'),
    });
可选项
      nzIconType确认弹框icon图标 nzMaskClosable点击蒙层是否关闭
      nzOkText: 'Yes',
      nzOkType: 'danger',
      nzOnOk: () => console.log('OK'),

      nzCancelText: 'No',
      nzCancelType:'primary',
      nzOnCancel: () => console.log('Cancel')

      this.modal.destroy();
```
# 状态管理
```
Action: Action是状态的改变。它描述了某个事件的发生，但是没有指定应用的状态如何改变。
ActionReducerMap： ActionReducerMap注册了一系列的reducer，在应用中使用StoreModule对它进行配置。
ActionReducer: 它被用于创建reducer，例如logger。
MetaReducer: 在应用中使用StoreModule配置的MetaReducer构成了根的meta-reducer。
StoreModule: StoreModule是@ngrx/storeAPI中的一个模块，它被用来在应用模块中配置reducer。
createFeatureSelector: 它为状态（state）创建一个feature selector。
createSelector: 它创建一个selector用于生成一个指定的状态。
Store: 它提供了Store.select()和Store.dispatch()来与reducer协同工作。Store.select()用于选择一个selector，Store.dispatch()用于向reducer分发action的类型。
```

# local-storage
```
import * as storage from 'local-storage';
```

# css
```
强制不换行
设置p标签不换行
p { white-space:nowrap; }

自动换行
p { word-wrap:break-word; }

强制英文单词断行
p { word-break:break-all; }
*注意：设置强制将英文单词断行，需要将行内元素设置为块级元素。

超出显示省略号
p { text-overflow:ellipsis; overflow:hidden; }

```
# from https://angular.cn/guide/reactive-forms
```
this.studentForm.valueChanges.subscribe(data => this.onStudentFormValueChange(data));

onStudentFormValueChange(data) {
    this.selectedStudent.age = data.age
    this.selectedStudent.email = data.email
    this.selectedStudent.nameSurname = data.nameSurname
    // or
    for (const key in this.studentForm.controls) {
       const control = this.studentForm.get(key);
       this.selectedStudent[key] = control.value
    }
}
this.studentForm
    .patchValue({
       age: data.age,
       email:data.email,
       nameSurname:data.nameSurname
  });
```