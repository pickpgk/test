<template>
    <div>
        <Card dis-hover>
            <div class="page-body">
                <Form ref="queryForm" :label-width="80" label-position="left" inline>
                    <Row :gutter="16">
                        <Col span="6">
                            <FormItem :label="L('Keyword')+':'" style="width:100%">
                                <Input v-model="pagerequest.keyword" :placeholder="L('PriceName')+'/'+L('Name')"></Input>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('IsActive')+':'" style="width:100%">
                                <!--Select should not set :value="'All'" it may not trigger on-change when first select 'NoActive'(or 'Actived') then select 'All'-->
                                <Select :placeholder="L('Select')" @on-change="isActiveChange">
                                    <Option value="All">{{L('All')}}</Option>
                                    <Option value="Actived">{{L('Actived')}}</Option>
                                    <Option value="NoActive">{{L('NoActive')}}</Option>
                                </Select>
                            </FormItem>
                        </Col>
                        <Col span="6">
                            <FormItem :label="L('CreationTime')+':'" style="width:100%">
                                <DatePicker  v-model="creationTime" type="datetimerange" format="yyyy-MM-dd" style="width:100%" placement="bottom-end" :placeholder="L('SelectDate')"></DatePicker>
                            </FormItem>
                        </Col>
                    </Row>
                    <Row>
                        <Button @click="create" icon="android-add" type="primary" size="large">{{L('Add')}}</Button>
                        <Button icon="ios-search" type="primary" size="large" @click="getpage" class="toolbar-btn">{{L('Find')}}</Button>
                    </Row>
                </Form>
                <div class="margin-top-10">
                    <Table :loading="loading" :columns="columns" :no-data-text="L('NoDatas')" border :data="list">
                    </Table>
                    <Page  show-sizer class-name="fengpage" :total="totalCount" class="margin-top-10" @on-change="pageChange" @on-page-size-change="pagesizeChange" :page-size="pageSize" :current="currentPage"></Page>
                </div>
            </div>
        </Card>
        <create-device v-model="createModalShow" @save-success="getpage"></create-device>
        <edit-device v-model="editModalShow" @save-success="getpage"></edit-device>
    </div>
</template>
<script lang="ts">
    import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '@/lib/util'
    import AbpBase from '@/lib/abpbase'
    import PageRequest from '@/store/entities/page-request'
    import CreateDevice from './create-device.vue'
    import EditDevice from './edit-device.vue'
    class  PageDeviceRequest extends PageRequest{
        keyword:string;
        isActive:boolean=null;//nullable
        from:Date;
        to:Date;
    }

    @Component({
        components:{CreateDevice,EditDevice}
    })
    export default class Devices extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        //filters
        pagerequest:PageDeviceRequest=new PageDeviceRequest();
        creationTime:Date[]=[];

        createModalShow:boolean=false;
        editModalShow:boolean=false;
        get list(){
            console.log(this.$store.state.device.list)
            return this.$store.state.device.list;
        };
        get loading(){
            return this.$store.state.device.loading;
        }
        create(){
            console.log('qqq')
            this.createModalShow=true;
        }
        isActiveChange(val:string){
            console.log(val);
            if(val==='Actived'){
                this.pagerequest.isActive=true;
            }else if(val==='NoActive'){
                this.pagerequest.isActive=false;
            }else{
                this.pagerequest.isActive=null;
            }
        }
        pageChange(page:number){
            this.$store.commit('user/setCurrentPage',page);
            this.getpage();
        }
        // 通过在user.TS里面提交了一个mutations来将pagesize的状态值改变
        pagesizeChange(pagesize:number){
            this.$store.commit('user/setPageSize',pagesize);
            this.getpage();
        }
        async getpage(){
            console.log('dddd')
            this.pagerequest.maxResultCount=this.pageSize;
            this.pagerequest.skipCount=(this.currentPage-1)*this.pageSize;
            //filters
            
            if (this.creationTime.length>0) {
                this.pagerequest.from=this.creationTime[0];
            }
            if (this.creationTime.length>1) {
                this.pagerequest.to=this.creationTime[1];
            }

            await this.$store.dispatch({
                type:'device/getAll',
                // 参数
                data:this.pagerequest,
            });console.log('dddd')
        }
        // 获取pagesize的状态值(每页的条数)
        get pageSize(){
            return this.$store.state.user.pageSize;
        }
        // 获取数据量totalCount
        get totalCount(){
            return this.$store.state.user.totalCount;
        }
        // 获取当前页码currentPage
        get currentPage(){
            return this.$store.state.user.currentPage;
        }
        columns=[{
            title:this.L('价格名称'),
            key:'p_Name'
        },{
            title:this.L('基本价格'),
            key:'p_Base1'
        },{
            title:this.L('IsActive'),
            render:(h:any,params:any)=>{
               return h('span',params.row.isActive?this.L('Yes'):this.L('No'))
            }
        },{
            title:this.L('CreationTime'),
            key:'creationTime',
            render:(h:any,params:any)=>{
                return h('span',new Date(params.row.creationTime).toLocaleDateString())
            }
        },{
            title:this.L('价格吨限'),
            key:'p_Ton1'
        },{
            title:this.L('Actions'),
            key:'Actions',
            width:150,
            render:(h:any,params:any)=>{
                return h('div',[
                    h('Button',{
                        props:{
                            type:'primary',
                            size:'small'
                        },
                        style:{
                            marginRight:'5px'
                        },
                        on:{
                            click:()=>{
                                this.$store.commit('device/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('Edit')),
                    h('Button',{
                        props:{
                            type:'error',
                            size:'small'
                        },
                        on:{
                            click:async ()=>{
                                this.$Modal.confirm({
                                        title:this.L('Tips'),
                                        content:this.L('DeleteUserConfirm'),
                                        okText:this.L('Yes'),
                                        cancelText:this.L('No'),
                                        onOk:async()=>{
                                            await this.$store.dispatch({
                                                type:'device/delete',
                                                data:params.row
                                            })
                                            await this.getpage();
                                        }
                                })
                            }
                        }
                    },this.L('Delete'))
                ])
            }
        }]
        async created(){
            this.getpage();
            console.log('ffffff')
            await this.$store.dispatch({
                type:'user/getRoles'
            })
        }
    }
</script>