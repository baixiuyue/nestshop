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