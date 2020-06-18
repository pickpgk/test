<template>
  <div>
      <Modal
         :title="L('充值')"
         :value="value"
         @on-ok="save"
        >
        <!-- :rules="deviceRule"下面的 -->
            <Form ref="deviceForm"  label-position="left" label-width="40" :model="device" class="deviceForm">
                <FormItem :label="L('金额')" prop="金额">
                    <i-input number  :maxlength="32" :minlength="2"></i-input>
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

    }
}
</script>

<style lang='less' scoped>
.deviceForm /deep/ .ivu-radio-wrapper {
    margin-left: 10px;
    // border-radius: 10px;
}
</style>
