import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
// 这里的一个单词device的首字母写成大写了，跟路径没有匹配上
import Device from '../entities/deviceKind'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface DeviceState extends ListState<Device>{
    editDevice:Device;
}
class DeviceModule extends ListModule<DeviceState,any,Device>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Device>(),
        loading:false,
        editDevice:new Device()
    }
    actions={
        async getAll(context:ActionContext<DeviceState,any>,payload:any){
            context.state.loading=true;
            console.log('dddddddd')
            let reponse=await Ajax.get('/api/services/app/DeviceKind/GetAll',{params:payload.data});
            context.state.loading=false;
            // 读取数据page
            let page=reponse.data.result as PageResult<Device>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            console.log(context.state.editDevice)
        },
        async create(context:ActionContext<DeviceState,any>,payload:any){
            await Ajax.post('/api/services/app/DeviceKind/Create',payload.data);
        },
        async update(context:ActionContext<DeviceState,any>,payload:any){
            await Ajax.put('/api/services/app/DeviceKind/Update',payload.data);
        },
        async delete(context:ActionContext<DeviceState,any>,payload:any){
            console.log('dddddddd')
            await Ajax.delete('/api/services/app/DeviceKind/Delete?Id='+payload.data.id);
        },
        // async get(context:ActionContext<TenantState,any>,payload:any){
        //     let reponse=await Ajax.get('/api/services/app/Tenant/Get?Id='+payload.id);
        //     return reponse.data.result as Tenant;
        // }
    };
    mutations={
        setCurrentPage(state:DeviceState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:DeviceState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:DeviceState,device:Device){
            state.editDevice=device;
        }
    }
}
const deviceModule=new DeviceModule();
export default deviceModule;