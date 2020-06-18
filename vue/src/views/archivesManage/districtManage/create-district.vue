<template>
    <div>
        <Modal
         :title="L('创建区域')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules="districtRule" -->
            <Form ref="districtForm"  label-position="top" :model="district">
                <FormItem :label="L('区域名称')" prop="区域名称">
                    <Input v-model="district.areaName" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('区域描述')" prop="区域描述">
                    <Input v-model="district.description" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <p><p>{{L("DefaultPasswordIs",undefined,'123qwe')}}</p></p>
            </Form>
            <div slot="footer">
                <Button @click="cancel">{{L('Cancel')}}</Button>
                <Button @click="save" type="primary">{{L('OK')}}</Button>
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
    import Util from '../../../lib/util'
    import AbpBase from '../../../lib/abpbase'
    import District from '@/store/entities/district';
    @Component
    export default class CreateDistrict extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        district:District=new District();
        save(){
            (this.$refs.districtForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.district.parentId = this.$store.state.district.id;
                    console.log(this.district)
                    await this.$store.dispatch({
                        type:'district/create',
                        data:this.district
                    });
                    // id归零
                    await this.$store.dispatch({
                        type:'district/parentedID',
                    });
                    (this.$refs.districtForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
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

