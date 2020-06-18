import { Component, Vue,Inject } from 'vue-property-decorator';
import appconst from './appconst'
export default class AbpBase extends Vue{
    // 翻译
    L(value:string,source?:string,...argus:string[]):string{
        if(source){
            return window.abp.localization.localize(value,source,argus);
        }else{
            return window.abp.localization.localize(value,appconst.localization.defaultLocalizationSourceName,argus);
        }
        
    }
    // 所有权限
    hasPermission(permissionName:string){
        return window.abp.auth.hasPermission(permissionName);
    }
    // 获取任意一个权限
    hasAnyOfPermissions(...argus:string[]){
        return window.abp.auth.hasAnyOfPermissions(...argus);
    }
    // 获取所有权限
    hasAllOfPermissions(...argus:string[]){
        return window.abp.auth.hasAllOfPermissions(...argus);
    }
}