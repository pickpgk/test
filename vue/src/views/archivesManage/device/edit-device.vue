<template>
    <div>
        <Modal
         :title="L('修改价格')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules="deviceRule"下面的 -->
            <Form ref="deviceForm"  label-position="top" :model="device">
                <FormItem :label="L('价格名称')" prop="tenancyName">
                    <Input v-model="device.p_Name" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('基本价格')" prop="name">
                    <Input v-model="device.p_Base1" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('价格吨限')" prop="name">
                    <Input v-model="device.p_Ton1" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem>
                    <Checkbox v-model="device.isActive">{{L('IsActive')}}</Checkbox>
                </FormItem>
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
    @Component
    export default class EditDevice extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        device:Device=new Device();
        save(){
            (this.$refs.deviceForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'device/update',
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
            }else{
                console.log(this.$store.state.device.editDevice)
                this.device=Util.extend(true,{},this.$store.state.device.editDevice);
            }
        }
        // deviceRule={
        //     name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('deviceName')),trigger: 'blur'}],
        //     tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}]
        // }
    }
</script>

