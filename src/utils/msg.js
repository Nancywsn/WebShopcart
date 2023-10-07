//封装消息提示框
import { ElMessage, ElMessageBox } from 'element-plus'

export let $msg_s = (message,duration=2000) => {
    ElMessage({
      showClose: true,
      message,
      duration,
      type: 'success',
    })
  }

export let $msg_w = (message,duration=2000) => {
    ElMessage({
      showClose: true,
      message,
      duration,
      type: 'warning',
    })
  }

export let $msg_e = (message,duration=2000) => {
    ElMessage({
      showClose: true,
      message,
      duration,
      type: 'error',
    })
  }

//确定取消框
export let $confirm = (message,title='提示',type='warning')=>{
    return new Promise((resolve) =>{
        ElMessageBox.confirm(
            message,
            title,
            {
              confirmButtonText: 'OK',
              cancelButtonText: 'Cancel',
              type,
            }
          )
            .then(() => {
                resolve()
            })
            .catch(() => {
            })
    })
}
