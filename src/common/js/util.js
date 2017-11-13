// 手机号验证
export function regexConfig() {
  var reg = {
    phone: /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/
  }
  return reg
}
