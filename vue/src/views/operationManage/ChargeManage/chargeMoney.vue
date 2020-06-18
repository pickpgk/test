<template>
  <div>
      <Modal
         :title="L('充值')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules="deviceRule"下面的 -->
            <Form ref="deviceForm"  label-position="left" lable-width="50" :model="device" class="deviceForm">
                <FormItem :label="L('金额')" prop="金额">
                    <InputNumber :maxlength="32" :minlength="2" type="number" style="width:50%"></InputNumber>
                </FormItem>
                <RadioGroup v-model="button4" type="button" size="small">
                    <Radio label="刷卡"></Radio>
                    <Radio label="支付宝"></Radio>
                    <Radio label="现金"></Radio>
                    <Radio label="微信"></Radio>
                    <Radio label="其他"></Radio>
                </RadioGroup>
            </Form>
            <p>用户编号</p>
            <p>用户名称</p>
            <p>联系方式</p>
            <p>证件号码</p>
            <p>详细地址</p>
            <p>用户余额</p>
        </Modal>
  </div>
</template>

<script lang='ts'>
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../../lib/util'
import AbpBase from '../../../lib/abpbase'
import Tenant from '@/store/entities/tenant';
@Component
export default class chargeMoney extends AbpBase{
    @Prop({type:Boolean,default:false}) value:boolean;
    tenant:Tenant=new Tenant();
    save(){
        console.log('fff')
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
}
</script>

<style lang='less' scoped>
.deviceForm /deep/ .ivu-radio-wrapper {
    margin-left: 10px;
    // border-radius: 10px;
}
// input::-webkit-outer-spin-button,
// input::-webkit-inner-spin-button {
// -webkit-appearance: none;
// }

// input[type="number"] {
// -moz-appearance: textfield;
// }
</style>
