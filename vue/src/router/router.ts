declare global {
    interface RouterMeta {
        title: string;
    }
    interface Router {
        path: string;
        name: string;
        icon?: string;
        permission?: string;
        meta?: RouterMeta;
        component: any;
        children?: Array<Router>;
    }
    interface System {
        import(request: string): Promise<any>
    }
    var System: System
}
import login from '../views/login.vue'
import home from '../views/home/home.vue'
import main from '../views/main.vue'

export const locking = {
    path: '/locking',
    name: 'locking',
    component: () => import('../components/lockscreen/components/locking-page.vue')
};
export const loginRouter: Router = {
    path: '/',
    name: 'login',
    meta: {
        title: 'LogIn'
    },
    component: () => import('../views/login.vue')
};
export const otherRouters: Router = {
    path: '/main',
    name: 'main',
    permission: '',
    meta: { title: 'ManageMenu' },
    component: main,
    children: [
        { path: 'home', meta: { title: 'HomePage' }, name: 'home', component: () => import('../views/home/home.vue') }
    ]
}
export const appRouters: Array<Router> = [{
    path: '/setting',
    name: 'setting',
    permission: '',
    meta: { title: 'ManageMenu' },
    icon: '&#xe615;',
    component: main,
    children: [
        { path: 'user', permission: 'Pages.Users', meta: { title: 'Users' }, name: 'user', component: () => import('../views/setting/user/user.vue') },
        { path: 'role', permission: 'Pages.Roles', meta: { title: 'Roles' }, name: 'role', component: () => import('../views/setting/role/role.vue') },
        { path: 'tenant', permission: 'Pages.Tenants', meta: { title: 'Tenants' }, name: 'tenant', component: () => import('../views/setting/tenant/tenant.vue') }
    ]
}, {
    path: '/archivesManage',
    name: 'archivesManage',
    permission: '',
    meta: { title: '档案管理archivesManage' },
    icon: '&#xe635;',
    component: main,
    children: [
        { path: 'districtManage', meta: { title: '区域管理districtManage' }, name: 'districtManage', component: () => import('../views/archivesManage/districtManage/district.vue') },
        { path: 'moneyManage', permission: 'Pages.Price', meta: { title: 'moneyManage' }, name: 'moneyManage', component: () => import('../views/archivesManage/moneyManage/money.vue') },
        { path: 'device', meta: { title: '表具管理' }, name: 'device', component: () => import('../views/archivesManage/device/device.vue') },
        { path: 'deviceKind', meta: { title: '表具种类管理name' }, name: 'deviceKind', component: () => import('../views/archivesManage/deviceKind/deviceKind.vue') }
    ]
}, {
    path: '/operationManage',
    name: 'operationManage',
    permission: '',
    meta: { title: '营业管理operationManage' },
    icon: '&#xe69e;',
    component: main,
    children: [
        { path: 'ChargeManage', meta: { title: '充值管理ChargeManage' }, name: 'ChargeManage', component: () => import('../views/operationManage/ChargeManage/charge.vue') },
        { path: 'deductionManage', meta: { title: '扣费管理deductionManage' }, name: 'deductionManage', component: () => import('../views/operationManage/deductionManage/deductionManage.vue') },
        { path: 'userRefund', meta: { title: '用户退费userRefund' }, name: 'userRefund', component: () => import('../views/operationManage/userRefund/userRefund.vue') },
        { path: 'houseBinding', meta: { title: '用户绑定houseBinding' }, name: 'houseBinding', component: () => import('../views/operationManage/houseBinding/houseBinding.vue') },
        { path: 'userPriceChange', meta: { title: '用户表价格调整userPriceChange' }, name: 'userPriceChange', component: () => import('../views/operationManage/userPriceChange/userPriceChange.vue') },
        { path: 'UserRechargeDetails', meta: { title: '充值详情UserRechargeDetails' }, name: 'UserRechargeDetails', component: () => import('../views/operationManage/UserRechargeDetails/UserRechargeDetails.vue') }
    ]
}, {
    path: '/meterReadingManage',
    name: 'meterReadingManage',
    permission: '',
    meta: { title: '抄表管理 meterReadingManage' },
    icon: '&#xe656;',
    component: main,
    children: [
        { path: 'handleMeterReading', meta: { title: '手动抄表handleMeterReading' }, name: 'handleMeterReading', component: () => import('../views/meterReadingManage/handleMeterReading/handleMeterReading.vue') },
        { path: 'meterReadingReviewStep1', meta: { title: '批量抄表meterReadingReviewStep1' }, name: 'meterReadingReviewStep1', component: () => import('../views/meterReadingManage/meterReadingReviewStep1/meterReadingReviewStep1.vue') },
        { path: 'meterReadingReviewStep2', meta: { title: '抄表数据审核meterReadingReviewStep2' }, name: 'meterReadingReviewStep2', component: () => import('../views/meterReadingManage/meterReadingReviewStep2/meterReadingReviewStep2.vue') },
        { path: 'meterReadingReviewStep3', meta: { title: '财务复核meterReadingReviewStep3' }, name: 'meterReadingReviewStep3', component: () => import('../views/meterReadingManage/meterReadingReviewStep3/meterReadingReviewStep3.vue') },
        { path: 'meterReadingReviewStep4', meta: { title: '领导审批meterReadingReviewStep4' }, name: 'meterReadingReviewStep4', component: () => import('../views/meterReadingManage/meterReadingReviewStep4/meterReadingReviewStep4.vue') },
        { path: 'meterReadingTime', meta: { title: '抄表时间控制meterReadingTime' }, name: 'meterReadingTime', component: () => import('../views/meterReadingManage/meterReadingTime/meterReadingTime.vue') },
        { path: 'meterValveControl', meta: { title: '阀门控制meterValveControl' }, name: 'meterValveControl', component: () => import('../views/meterReadingManage/meterValveControl/meterValveControl.vue') }
    ]
}, {
    path: '/queryManage',
    name: 'queryManage',
    permission: '',
    meta: { title: '查询管理queryManage' },
    icon: '&#xe606;',
    component: main,
    children: [
        { path: 'parameterQuery', meta: { title: '台账查询parameterQuery' }, name: 'parameterQuery', component: () => import('../views/queryManage/parameterQuery/parameterQuery.vue') },
        { path: 'chargeStatistical', meta: { title: '收费统计chargeStatistical' }, name: 'chargeStatistical', component: () => import('../views/queryManage/chargeStatistical/chargeStatistical.vue') },
        { path: 'problemQuery', meta: { title: '疑户查询problemQuery' }, name: 'problemQuery', component: () => import('../views/queryManage/problemQuery/problemQuery.vue') },
        { path: 'MeterReadingQuery', meta: { title: '抄见率查询MeterReadingQuery' }, name: 'MeterReadingQuery', component: () => import('../views/queryManage/MeterReadingQuery/MeterReadingQuery.vue') },
        { path: 'handleLogQuery', meta: { title: '员工日志查询handleLogQuery' }, name: 'handleLogQuery', component: () => import('../views/queryManage/handleLogQuery/handleLogQuery.vue') }
    ]
}, {
    path: '/maintainManage',
    name: 'maintainManage',
    permission: '',
    meta: { title: '维护管理 maintainManage' },
    icon: '&#xe65e;',
    component: main,
    children: [
        { path: 'meterType', meta: { title: '更换表模块meterType' }, name: 'meterType', component: () => import('../views/maintainManage/meterType/meterType.vue') },
        { path: 'wholeMeter', meta: { title: '更换整表wholeMeter' }, name: 'wholeMeter', component: () => import('../views/maintainManage/wholeMeter/wholeMeter.vue') },
        { path: 'battery', meta: { title: '更换电池battery' }, name: 'battery', component: () => import('../views/maintainManage/battery/battery.vue') },
        { path: 'others', meta: { title: '更换其他others' }, name: 'others', component: () => import('../views/maintainManage/others/others.vue') },
        { path: 'changeMeterQuery', meta: { title: '换表查询changeMeterQuery' }, name: 'changeMeterQuery', component: () => import('../views/maintainManage/changeMeterQuery/changeMeterQuery.vue') }
    ]
}, {
    path: '/systemManage',
    name: 'systemManage',
    permission: '',
    meta: { title: '系统管理 systemManage' },
    icon: '&#xe618;',
    component: main,
    children: [ 
        { path: 'setEnvironment', meta: { title: '环境设置setEnvironment' }, name: 'setEnvironment', component: () => import('../views/systemManage/setEnvironment/setEnvironment.vue') },
        { path: 'registerService', meta: { title: '客户认证registerService' }, name: 'registerService', component: () => import('../views/systemManage/registerService/registerService.vue') },
        { path: 'homeSet', meta: { title: '首页卡片数据设置homeSet' }, name: 'homeSet', component: () => import('../views/systemManage/homeSet/homeSet.vue') }
    ]
}, {
    path: '/dataAnalysis',
    name: 'dataAnalysis',
    permission: '',
    meta: { title: '数据分析 dataAnalysis' },
    icon: '&#xe879;',
    component: main,
    children: [
        { path: 'historyWater', meta: { title: '历史用水historyWater' }, name: 'historyWater', component: () => import('../views/dataAnalysis/historyWater/historyWater.vue') },
        { path: 'lineChart', meta: { title: '营收分析图表lineChart' }, name: 'lineChart', component: () => import('../views/dataAnalysis/lineChart/lineChart.vue') },
        { path: 'meterReadingMonitoring', meta: { title: '抄表监测meterReadingMonitoring' }, name: 'meterReadingMonitoring', component: () => import('../views/dataAnalysis/meterReadingMonitoring/meterReadingMonitoring.vue') }
    ]
}]
export const routers = [
    loginRouter,
    locking,
    ...appRouters,
    otherRouters
];
