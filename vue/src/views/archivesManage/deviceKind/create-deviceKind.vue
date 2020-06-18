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
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('编号')" prop="编号">
                            <Input number v-model="device.dK_No" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('名称')" prop="名称">
                            <Input v-model="device.dK_Name" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('所属厂家')" prop="所属厂家">
                            <Input number v-model="device.dK_Kind" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('通讯类型')" prop="通讯类型">
                            <Input number v-model="device.dK_CommKind" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('是否带阀门')" prop="是否带阀门">
                            <Input number v-model="device.dK_IfValve" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('温度(℃)')" prop="温度(℃)">
                            <Input number v-model="device.dK_Temperature" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('口径')" prop="口径">
                            <Input number v-model="device.dK_Caliber" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('计量方式')" prop="计量方式">
                            <Input v-model="device.dK_Metering" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <!-- saasa -->
                        <FormItem :label="L('系数')" prop="系数">
                            <Input number v-model="device.dK_Factor" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('最小流量(Q1)')" prop="最小流量(Q1)">
                            <Input number v-model="device.dK_Q1" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('分解流量(Q2)')" prop="分解流量(Q2)">
                            <Input number v-model="device.dK_Q2" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('常用流量(Q3)')" prop="常用流量(Q3)">
                            <Input number v-model="device.dK_Q3" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('过载流量(Q4)')" prop="过载流量(Q4)">
                            <Input number v-model="device.dK_Q4" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('日最大流量')" prop="日最大流量">
                            <Input number v-model="device.dK_MaxFlow" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('水表ID')" prop="水表ID">
                            <Input number v-model="device.id" :maxlength="1024"></Input>
                        </FormItem>
                    </i-col>
                </Row>
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
    import DeviceKind from '@/store/entities/deviceKind';
    @Component
    export default class CreateDeviceKind extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        device:DeviceKind=new DeviceKind();
        save(){
            (this.$refs.deviceForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    console.log(this.device)
                    await this.$store.dispatch({
                        type:'deviceKind/create',
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

