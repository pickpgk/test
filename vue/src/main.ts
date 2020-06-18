import Vue from 'vue';
import App from './app.vue';
import iView from 'view-design';
import 'view-design/dist/styles/iview.css';
import {router} from './router/index';
// 国旗图标依赖famfamfam-flags.css
import 'famfamfam-flags/dist/sprite/famfamfam-flags.css';
import './theme.less';
import Ajax from './lib/ajax';
import Util from './lib/util';
import SignalRAspNetCoreHelper from './lib/SignalRAspNetCoreHelper';
Vue.use(iView);
import store from './store/index';
// 有了Vue.config.productionTip = false这句代码，它会阻止你显示显示生产模式的消息
Vue.config.productionTip = false;
import { appRouters,otherRouters} from './router/router';
if(!abp.utils.getCookieValue('Abp.Localization.CultureName')){
  let language=navigator.language;
  abp.utils.setCookieValue('Abp.Localization.CultureName',language,new Date(new Date().getTime() + 5 * 365 * 86400000),abp.appPath);
}

Ajax.get('/AbpUserConfiguration/GetAll').then(data=>{
  console.log(Util.abp)
  Util.abp=Util.extend(true,Util.abp,data.data.result);
  // console.log(data.data.result)
  new Vue({
    render: h => h(App),
    router:router,
    store:store,
    data: {
      currentPageName: ''
    },
    async mounted () {
      this.currentPageName = this.$route.name as string;
      await this.$store.dispatch({
        type:'session/init'
      })
      if(!!this.$store.state.session.user&&this.$store.state.session.application.features['SignalR']){
        if (this.$store.state.session.application.features['SignalR.AspNetCore']) {
            SignalRAspNetCoreHelper.initSignalR();
        }
      }
      this.$store.commit('app/initCachepage');
      this.$store.commit('app/updateMenulist');
    },
    created () {
      let tagsList:Array<any> = [];
      appRouters.map((item) => {
          if (item.children.length <= 1) {
              tagsList.push(item.children[0]);
          } else {
              tagsList.push(...item.children);
          }
      });
      this.$store.commit('app/setTagsList', tagsList);
    }
  }).$mount('#app')
})

