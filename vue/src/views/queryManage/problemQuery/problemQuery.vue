<template>
    <div>
        <Row>
            <i-col span="24">
                <div class="header">
                    <Card dis-hover>
                        <Button @click="charge" icon="android-add" type="primary" size="large">{{L('充值')}}</Button>
                    </Card>
                </div>
            </i-col>
        </Row>
        <div class="main">
            <Row>
                <i-col span="5">
                    <Card>
                        <div class="aside" style="background-color: rgb(255,255,255);height:36vw;overflow:auto;">
                            <!-- 区域树状组件 -->
                            <Tree></Tree>
                        </div>
                    </Card>
                </i-col>
                <i-col span="19">
                    <Card>
                        <div class="mainContent" style="background-color: rgb(255,255,255);height:36vw;overflow:auto;">
                            <charge-info></charge-info>
                            <device-info></device-info>
                        </div>
                    </Card>
                </i-col>
            </Row>
            <!-- <create-district v-model="createModalShow"></create-district> -->
            <charge-money v-model="qqq"></charge-money>
        </div>
    </div>
</template>

<script lang='ts'>
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import Tenant from '@/store/entities/tenant'
import chargeMoney from './chargeMoney.vue'
import chargeInfo from './changeInfo.vue'
import DeviceInfo from './deviceInfo.vue'
import Tree from '../../../components/tree.vue'
// import CreateDistrict from './create-district.vue'
// import EditDistrict from './edit-district.vue'
// import EditDistrict from './edit-district.vue'
class  PageDistrictRequest extends PageRequest{
    name: string;
}
@Component ({
    components:{
        chargeMoney, chargeInfo, DeviceInfo, Tree
    }
})
export default class DistrictManage extends AbpBase{
    // @Prop({type:Boolean,default:false}) value:boolean;
    // @Prop(Array)
    // createModalShow:boolean=false;
    qqq:boolean = false;
    choices:any;
    treeData:any;
    async choice (val) {
        console.log(val)
        await this.$store.dispatch({
            type:'district/parentId',
            data:val,
        })

        // console.log("tree.data",this.$refs.tree.data);
        // this.choices = this.dg(this.$refs.tree.data);
        //获取半选和全选的
        // this.treeData=this.$refs.tree.getCheckedAndIndeterminateNodes();
    }
    charge () {
        console.log('dddd');
        this.qqq = true;
    }
    get list(){
        console.log(this.$store.state.district.list)
        return this.$store.state.district.list;
    };
    // aaa = this.baseData
    // get baseData(){
    //     console.log('istri')
    //     return this.$store.state.district.currentPage;
    // };
    async getpage(){
        await this.$store.dispatch({
            type:'district/getAll',
            // 参数
            // data:this.pagerequest,
        });
    }
    create(){
        console.log('qqq')
        this.qqq=true;
    }
    edit(){
        console.log('qqq')
        // this.editModalShow=true;
    }
    async created(){
        this.getpage();
        console.log('ffffff')
        await this.$store.dispatch({
            type:'user/getRoles'
        })
    }
}
</script>

<style lang='less' scoped>
// .main {
//     margin-top: 10px;;
// }
// .main /deep/ .ivu-card-body{
//     padding: 5px;
// }
// .aside /deep/ .ivu-tree-children {
//     font-size:14px;
//     background-color: rgb(255,255,255);
// }
</style>
