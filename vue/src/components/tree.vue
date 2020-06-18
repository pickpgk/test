<template>
  <div class="aside" style="background-color: rgb(255,255,255);height:36vw;overflow:auto;">
        <div><input type="text" spellcheck="false" autocomplete="off" :placeholder="L('请输入查询值')" v-model="data" @keyup.enter="search"></div>
        <Tree
            :data="list"
            show-checkbox
            ref="tree"
            @on-select-change="choice"
        >
        </Tree>
    </div>
</template>

<script lang='ts'>
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../lib/util'
import AbpBase from '../lib/abpbase'
import Tenant from '@/store/entities/tenant';
@Component
export default class CreateTenant extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    tenant:Tenant=new Tenant();
    choices:any;
    result:any;
    data:string='';
    valuee:any;
    save(){

    }
    async search () {
        // 搜索展开功能
        // console.log(this.data)
        this.result = this.$store.state.district.list;
        // console.log(this.result[0].title.indexOf(this.data))
        for ( let i = 0; i<this.result.length; i++) {
            if (this.result[i].title.indexOf(this.data) > -1 ) {
                 console.log('tgbyhnujm')
                 this.$store.dispatch({
                     type:'district/search',
                     data:i
                 })
             }
        }
    }
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
    get list(){
        console.log(this.$store.state.district.list)
        return this.$store.state.district.list;
    };
}
</script>

<style lang='less' scoped>

</style>
