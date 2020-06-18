import {Store,Module,ActionContext} from 'vuex'
import ListModule from './list-module'
import ListState from './list-state'
// 这里的一个单词money的首字母写成大写了，跟路径没有匹配上
import Money from '../entities/money'
import Ajax from '../../lib/ajax'
import PageResult from '@/store/entities/page-result';
import ListMutations from './list-mutations'
interface MoneyState extends ListState<Money>{
    editMoney:Money;
}
class MoneyModule extends ListModule<MoneyState,any,Money>{
    state={
        totalCount:0,
        currentPage:1,
        pageSize:10,
        list: new Array<Money>(),
        loading:false,
        editMoney:new Money()
    }
    actions={
        async getAll(context:ActionContext<MoneyState,any>,payload:any){
            context.state.loading=true;
            console.log('dddddddd')
            let reponse=await Ajax.get('/api/services/app/Price/GetAll',{params:payload.data});
            context.state.loading=false;
            // 读取数据page
            let page=reponse.data.result as PageResult<Money>;
            context.state.totalCount=page.totalCount;
            context.state.list=page.items;
            console.log(context.state.editMoney)
        },
        async create(context:ActionContext<MoneyState,any>,payload:any){
            await Ajax.post('/api/services/app/Price/Create',payload.data);
        },
        async update(context:ActionContext<MoneyState,any>,payload:any){
            await Ajax.put('/api/services/app/Price/Update',payload.data);
        },
        async delete(context:ActionContext<MoneyState,any>,payload:any){
            console.log('dddddddd')
            await Ajax.delete('/api/services/app/Price/Delete?Id='+payload.data.id);
        },
        // async get(context:ActionContext<TenantState,any>,payload:any){
        //     let reponse=await Ajax.get('/api/services/app/Tenant/Get?Id='+payload.id);
        //     return reponse.data.result as Tenant;
        // }
    };
    mutations={
        setCurrentPage(state:MoneyState,page:number){
            state.currentPage=page;
        },
        setPageSize(state:MoneyState,pagesize:number){
            state.pageSize=pagesize;
        },
        edit(state:MoneyState,money:Money){
            state.editMoney=money;
        }
    }
}
const moneyModule=new MoneyModule();
export default moneyModule;