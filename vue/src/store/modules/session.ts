import ajax from '../../lib/ajax';
import util from '../../lib/util'
import {Store,Module,ActionContext} from 'vuex' 
interface SessionState{
    application:any,
    user:any,
    tenant:any
}
class SessionStore implements Module<SessionState,any>{
    namespaced=true;
    state={
        application:null,
        user:null,
        tenant:null
    }
    actions={
        async init(content:ActionContext<SessionState,any>){
            let rep=await ajax.get('/api/services/app/Session/GetCurrentLoginInformations',{
                headers:{
                    'Abp.TenantId': util.abp.multiTenancy.getTenantIdCookie()
                }}
            );
            content.state.application=rep.data.result.application;
            content.state.user=rep.data.result.user;
            console.log(content.state.user.userName)
            content.state.tenant=rep.data.result.tenant;
        }
    }
}
const session=new SessionStore();
export default session;