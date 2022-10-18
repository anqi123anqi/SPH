//vee-vaildate插件：表单验证
import Vue from 'vue';
import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);
//中文提示信息
import zh_CN from 'vee-validate/dist/locale/zh_CN';

//
VeeValidate.Validator.localize('zh_CN', {
	messages: {
		...zh_CN.messages,
		is: (filed) => `${filed}必须与密码相同`//修改内置规则的 messages 让密码和确认密码相同
	},
	attributes: {//给校验的 filed 属性名映射中文名
		phone: '手机号',
		code: '验证号',
		password: '密码',
		password1: '确认密码',
		agree: '协议'
	}

});
//定义校验规则
VeeValidate.Validator.extend('agree', {
	validate: value => {
		return value;
	},
	getMessage: filed => filed + '必须同意'
});