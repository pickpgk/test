import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import app from './modules/app'
import session from './modules/session'
import account from './modules/account'
import user from './modules/user'
import role from './modules/role'
import tenant from './modules/tenant'
import money from './modules/money'
import device from './modules/device'
import deviceKind from './modules/deviceKind'
import district from './modules/district'
// 新增加一个请求需要在.vue组件中写好路径，然后在stores中的两个文件定义些数据和请求方师方式，千万注意路径写对，和字母大小写。最后在index.ts中的module写上前面的文件名！！！
const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {

    },
    modules: {
        app,
        session,
        account,
        user,
        role,
        tenant,
        money,
        device,
        deviceKind,
        district
    }
});

export default store;