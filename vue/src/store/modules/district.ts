import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
// 这里的一个单词district的首字母写成大写了，跟路径没有匹配上
import District from '../entities/district'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface DistrictState extends ListState<District>{
    editDistrict:District;
    parentId:number;
    id:number;
}
class DistrictModule extends ListModule<DistrictState,any,District>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<District>(),
        loading:false,
        editDistrict:new District(),
        parentId:0,
        id:0
    }
    actions={
        async getAll(context:ActionContext<DistrictState,any>,payload:any){
            context.state.loading=true;
            console.log('dddddddd')
            let reponse=await Ajax.get('/api/services/app/Area/GetAreaTreeJson',{params:payload.data});
            context.state.loading=false;
            console.log(reponse)
            // 读取数据page
            let page=reponse.data.result as PageResult<District>;
            context.state.totalCount=page.totalCount;
            context.state.list=reponse.data.result;
            console.log(context.state.editDistrict)
        },
        async create(context:ActionContext<DistrictState,any>,payload:any){
            await Ajax.post('/api/services/app/Area/Create',payload.data);
        },
        async update(context:ActionContext<DistrictState,any>,payload:any){
            await Ajax.put('/api/services/app/Area/Update',payload.data);
        },
        async delete(context:ActionContext<DistrictState,any>,payload:any){
            console.log('dddddddd')
            await Ajax.delete('/api/services/app/Area/Delete?Id='+payload.data.id);
        },
        parentId (context:ActionContext<DistrictState,any>,payload:any) {
            console.log(payload.data[0].parentid)
            // 点击区域后获取parentId和id，然后存在store中。若没有点击，则直接取用store中的parentId，为0
            context.state.parentId=payload.data[0].parentid;
            context.state.id=payload.data[0].id;
        },
        // id归零
        parentedID (context:ActionContext<DistrictState,any>,payload:any) {
            context.state.parentId=0;
            context.state.id=0;
        },
        search (context:ActionContext<DistrictState,any>,payload:any) {
            console.log(context.state.list)
            context.state.list[payload.data].expand = true;
            context.state.list[payload.data].selected = true;
        }
        // async get(context:ActionContext<TenantState,any>,payload:any){
        //     let reponse=await Ajax.get('/api/services/app/Tenant/Get?Id='+payload.id);
        //     return reponse.data.result as Tenant;
        // }
    };
    mutations={
        setCurrentPage(state:DistrictState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:DistrictState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:DistrictState,district:District){
            state.editDistrict=district;
            console.log('fffffffffffffffffffffffffffff')
        }
    }
}
const districtModule=new DistrictModule();
export default districtModule;