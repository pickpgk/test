<template>
    <div class="main">
        <Row>
            <i-col span="5">
                <Card dis-hover>
                    <div class="aside" style="background-color: rgb(255,255,255);height:36vw;overflow:auto;">
                        <!-- 区域树状组件 -->
                        <Tree></Tree>
                    </div>
                </Card>
            </i-col>
            <i-col span="19">
                <Card dis-hover>
                    <div class="mainContent" style="background-color: rgb(255,255,255);height:36vw;overflow:auto;">
                    <!-- <Tree :data="aaa" show-checkbox></Tree> -->
                    <Button @click="create" icon="android-add" type="primary" size="large">{{L('添加')}}</Button>
                    <Button @click="edit" icon="android-add" type="primary" size="large">{{L('修改')}}</Button>
                    <Button @click="remove" icon="android-add" type="primary" size="large">{{L('删除')}}</Button>
                    </div>
                </Card>
            </i-col>
        </Row>
         <!-- <Cascader :data="app" v-model="value1"></Cascader> -->
        <create-district v-model="createModalShow" @save-success="getAll"></create-district>
        <edit-district v-model="editModalShow" @save-success="getAll"></edit-district>
        <remove-district v-model="removeModalShow" @save-success="getAll"></remove-district>
    </div>
</template>

<script lang='ts'>
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import PageRequest from '@/store/entities/page-request'
import Tenant from '@/store/entities/tenant'
import CreateDistrict from './create-district.vue'
import EditDistrict from './edit-district.vue'
import RemoveDistrict from './remove-district.vue'
import Tree from '../../../components/tree.vue'
class  PageDistrictRequest extends PageRequest{
    name: string;
}
@Component({
    components:{ CreateDistrict, EditDistrict, RemoveDistrict, Tree }
})
export default class DistrictManage extends AbpBase{
    // @Prop({type:Boolean,default:false}) value:boolean;
    // @Prop(Array)
    createModalShow:boolean=false;
    editModalShow:boolean = false;
    removeModalShow:boolean = false;
    // choices:any;
    treeData:any;
    selectData:any;
    // async choice (val) {
    //     console.log(val)
    //     this.$store.commit('district/edit',val[0]);
    //     await this.$store.dispatch({
    //         type:'district/parentId',
    //         data:val,
    //     })
    //     // console.log("tree.data",this.$refs.tree.data);
    //     // this.choices = this.dg(this.$refs.tree.data);
    //     //获取半选和全选的
    //     // this.treeData=this.$refs.tree.getCheckedAndIndeterminateNodes();
    // }
    get list(){
        console.log(this.$store.state.district.list)
        return this.$store.state.district.list;
    };
    // aaa = this.baseData
    // get baseData(){
    //     console.log('istri')
    //     return this.$store.state.district.currentPage;
    // };
    async getAll(){
        await this.$store.dispatch({
            type:'district/getAll',
            // 参数
            // data:this.data,
        });
    }
    create(){
        console.log('qqq')
        this.createModalShow=true;
    }
    edit(){
        console.log('qqq')
        this.editModalShow=true;
    }
    remove () {
        this.removeModalShow=true;
    }
    async created(){
        this.getAll();
        console.log('ffffff')
        await this.$store.dispatch({
            type:'user/getRoles'
        })
    }
}
</script>

<style lang='less' scoped>

</style>
