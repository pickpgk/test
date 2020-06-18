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
    import CreateDevice from './create-deviceKind.vue'
    import EditDevice from './edit-deviceKind.vue'
    class  PageDeviceKindRequest extends PageRequest{
        keyword:string;
        isActive:boolean=null;//nullable
        from:Date;
        to:Date;
    }

    @Component({
        components:{CreateDevice,EditDevice}
    })
    export default class DeviceKinds extends AbpBase{
        edit(){
            this.editModalShow=true;
        }
        //filters
        pagerequest:PageDeviceKindRequest=new PageDeviceKindRequest();
        creationTime:Date[]=[];

        createModalShow:boolean=false;
        editModalShow:boolean=false;
        // IfValveOptions: [{value: 1, label: '带阀门'}, {value: 0, label: '无阀门'}],
        // CommKindOptions: [{value: 0, label: 'NB表/GPRS物联网表'}, {value: 1, label: 'LORA表'}, {value: 2, label: '集中器+有线远传水表'}],
        // CaliberOptions: [
        //     {
        //     value: 0,
        //     label: '15'
        //     }, {
        //     value: 1,
        //     label: '20'
        //     }, {
        //     value: 2,
        //     label: '25'
        //     }, {
        //     value: 3,
        //     label: '32'
        //     }, {
        //     value: 4,
        //     label: '40'
        //     }, {
        //     value: 5,
        //     label: '50'
        //     }, {
        //     value: 6,
        //     label: '65'
        //     }, {
        //     value: 7,
        //     label: '80'
        //     }, {
        //     value: 8,
        //     label: '100'
        //     }, {
        //     value: 9,
        //     label: '125'
        //     }, {
        //     value: 10,
        //     label: '150'
        //     }, {
        //     value: 11,
        //     label: '200'
        //     }, {
        //     value: 12,
        //     label: '250'
        //     }, {
        //     value: 13,
        //     label: '300'
        //     }, {
        //     value: 14,
        //     label: '350'
        //     }, {
        //     value: 15,
        //     label: '400'
        //     }, {
        //     value: 16,
        //     label: '500'
        //     }, {
        //     value: 17,
        //     label: '600'
        //     }
        // ]
        // MeteringKindOptions: [
        //     {
        //     value: 0,
        //     label: '干簧管'
        //     }, {
        //     value: 1,
        //     label: '霍尔'
        //     }, {
        //     value: 2,
        //     label: '无磁'
        //     }, {
        //     value: 3,
        //     label: '超声波'
        //     }, {
        //     value: 4,
        //     label: '光电直读'
        //     }
        // ]
        get list(){
            console.log(this.$store.state.deviceKind.list)
            return this.$store.state.deviceKind.list;
        };
        get loading(){
            return this.$store.state.deviceKind.loading;
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
                type:'deviceKind/getAll',
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
            title:this.L('编号'),
            key:'dK_No'
        },{
            title:this.L('名称'),
            key:'dK_Name'
        },
        {
            title:this.L('所属厂家'),
            key:'dK_Kind'
        },{
            title:this.L('通讯类型'),
            key:'dK_CommKind'
        },
        {
            title:this.L('是否带阀门'),
            key:'dK_IfValve'
        },{
            title:this.L('温度(℃)'),
            key:'dK_Temperature'
        },{
            title:this.L('口径'),
            key:'dK_Caliber'
        },
        {
            title:this.L('计量方式'),
            key:'dK_Metering'
        },{
            title:this.L('系数'),
            key:'dK_Factor'
        },{
            title:this.L('最小流量(Q1)'),
            key:'dK_Q1'
        },
        {
            title:this.L('分解流量(Q2)'),
            key:'dK_Q2'
        },{
            title:this.L('常用流量(Q3)'),
            key:'dK_Q3'
        },{
            title:this.L('过载流量(Q4)'),
            key:'dK_Q4'
        },
        {
            title:this.L('日最大流量'),
            key:'dK_MaxFlow'
        },{
            title:this.L('水表ID'),
            key:'id'
        },{
            title:this.L('通讯类型'),
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
                                this.$store.commit('deviceKind/edit',params.row);
                                this.edit();
                            }
                        }
                    },this.L('编辑')),
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
                                                type:'deviceKind/delete',
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