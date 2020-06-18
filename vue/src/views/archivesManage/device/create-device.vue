<template>
    <div>
        <Modal
         :title="L('CreateNewDevice')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules="deviceRule" -->
            <Form ref="deviceForm"  label-position="top" :model="device">
                <FormItem :label="L('价格名称')" prop="价格名称">
                    <Input v-model="device.P_Name" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('基本价格')" prop="基本价格">
                    <Input v-model="device.p_Base1" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('价格吨限')" prop="价格吨限">
                    <Input v-model="device.p_Ton1" :maxlength="1024"></Input>
                </FormItem>
                <FormItem :label="L('ID')" prop="ID">
                    <Input v-model="device.id" :maxlength="1024"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="device.isActive">{{L('IsActive')}}</Checkbox>
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
    import Device from '@/store/entities/device';
    // import SelectDistrict from './select-district.vue'
    @Component
    // ({
    //     components:{ SelectDistrict }
    // })
    export default class CreateDevice extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        device:Device=new Device();
        save(){
            (this.$refs.deviceForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    console.log(this.device)
                    await this.$store.dispatch({
                        type:'device/create',
                        data:this.device
                    });
                    (this.$refs.deviceForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.deviceForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        // deviceRule={
        //     name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('deviceName')),trigger: 'blur'}],
        //     tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
        //     adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        // }
    }
</script>

