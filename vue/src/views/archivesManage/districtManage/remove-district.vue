<template>
    <div>
        <Modal
         :title="L('删除区域')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules="districtRule" -->
            <Form ref="districtForm"  label-position="top" :model="district">
                <p>确认删除么</p>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
            <p>用户编号{{ this.$store.state.district.id }}</p>
            <p>用户名称{{ this.$store.state.district.id }}</p>
            <p>联系方式{{ this.$store.state.district.id }}</p>
            <p>证件号码{{ this.$store.state.district.id }}</p>
            <p>详细地址{{ this.$store.state.district.id }}</p>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import District from '@/store/entities/district';
    @Component
    export default class removeDistrict extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        district:District=new District();
        async save(){
            console.log(this.district)
            await this.$store.dispatch({
                type:'district/delete',
                data:this.$store.state.district
            });
            this.$emit('save-success');
            this.$emit('input',false);
        }
        cancel(){
            (this.$refs.districtForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        // districtRule={
        //     name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('districtName')),trigger: 'blur'}],
        //     tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
        //     adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        // }
    }
</script>

