<template>
  <div>
      <Modal
         :title="L('充值')"
         :value="value"
         @on-ok="save"
        >
        <!-- :rules="deviceRule"下面的 -->
            <Form ref="deviceForm"  label-position="top" :model="device">
                <FormItem :label="L('金额')" prop="金额">
                    <i-input number  :maxlength="32" :minlength="2"></i-input>
                </FormItem>
            </Form>
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

</style>
