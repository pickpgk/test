<template>
    <div>
        <!-- :title="L('CreateNewMoney')" -->
        <Modal
         :title="this.title"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
         width="700"
        >
        <!-- :rules="moneyRule" -->
            <Form ref="moneyForm"  label-position="right" :model="money" :label-width="117">
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('价格名称')" prop="价格名称">
                            <i-input v-model="money.p_Name" :maxlength="32" :minlength="2"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('阶梯数')">
                            <i-select  @on-change="handleOrder" v-model="money.PriceLen" placeholder="请选择">
                                <i-option
                                    v-for="item in PriceLenList"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                </i-option>
                            </i-select>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('排污费(元/吨)')" prop="排污费(元/吨)">
                            <InputNumber :step="0.01" v-model="money.Other1" :maxlength="1024"></InputNumber>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('其他费用1(元/吨)')">
                            <InputNumber :step="0.01" v-model="money.Other2"></InputNumber>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('其他费用2(元/吨)')">
                            <InputNumber :step="0.01" v-model="money.Other3"></InputNumber>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('其他费用3(元/吨)')">
                            <InputNumber :step="0.01" v-model="money.Other4"></InputNumber>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('违约金比例(%)')">
                            <InputNumber :step="0.01" v-model="money.Penalties"></InputNumber>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('保底单价(元/吨)')">
                            <InputNumber :step="0.01" v-model="money.LowPrice"></InputNumber>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('保底量(吨)')">
                            <InputNumber :step="0.01" v-model="money.LowAmount"></InputNumber>
                        </FormItem>
                    </i-col>
                </Row>
                <!-- <Row :gutter="16">
                    <i-col span="8">
                        <FormItem :label="L('价格描述')">
                            <Input v-model="money.Penalties"></Input>
                        </FormItem>
                    </i-col>
                </Row> -->
                <!-- 多阶计费 -->
                <Row :gutter="16" class="bd_all bdrs_all_5">
                    <p class="positionHead">多阶计费</p>
                    <Row v-if="Order0" :gutter="16" style="position:relative;padding:20px 2px 2px 8px;">
                        <i-col span="8">
                            <FormItem :label="L('一阶单价')">
                                <InputNumber :step="0.01" v-model="money.Base1"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('一阶合计')">
                                <InputNumber :step="0.01" v-model="money.Price1"></InputNumber>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row v-if="Order1" :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                        <i-col span="8">
                            <FormItem :label="L('一阶吨限')">
                                <InputNumber :step="0.01" v-model="money.Ton1"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('二阶单价')">
                                <InputNumber :step="0.01" v-model="money.Base2"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('二阶合计')">
                                <InputNumber :step="0.01" v-model="money.Price2"></InputNumber>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row v-if="Order2" :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                        <i-col span="8">
                            <FormItem :label="L('二阶吨限')">
                                <InputNumber :step="0.01" v-model="money.Ton2"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('三阶单价')">
                                <InputNumber :step="0.01" v-model="money.Base3"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('三阶合计')">
                                <InputNumber :step="0.01" v-model="money.Price3"></InputNumber>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row v-if="Order3" :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                        <i-col span="8">
                            <FormItem :label="L('三阶吨限')">
                                <InputNumber :step="0.01" v-model="money.Ton3"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('四阶单价')">
                                <InputNumber :step="0.01" v-model="money.Base4"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('四阶合计')">
                                <InputNumber :step="0.01" v-model="money.Price4"></InputNumber>
                            </FormItem>
                        </i-col>
                    </Row>
                    <Row v-if="Order4" :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                        <i-col span="8">
                            <FormItem :label="L('四阶吨限')">
                                <InputNumber :step="0.01" v-model="money.Ton4"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('五阶单价')">
                                <InputNumber :step="0.01" v-model="money.Base5"></InputNumber>
                            </FormItem>
                        </i-col>
                        <i-col span="8">
                            <FormItem :label="L('五阶合计')">
                                <InputNumber :step="0.01" v-model="money.Price5"></InputNumber>
                            </FormItem>
                        </i-col>
                    </Row>
                </Row>
                
                <!-- <FormItem :label="L('价格吨限')" prop="价格吨限">
                    <InputNumber v-model="money.p_Ton1" :maxlength="1024"></InputNumber>
                </FormItem> -->
                <!-- <FormItem>
                    <Checkbox v-model="money.isActive">{{L('IsActive')}}</Checkbox>
                </FormItem> -->
                <!-- <p><p>{{L("DefaultPasswordIs",undefined,'123qwe')}}</p></p> -->
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
    import Money from '@/store/entities/money'
    // import PriceInfo from './priceInfo.vue'
    @Component({
        components:{}
    })
    export default class CreateMoney extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        money:Money=new Money();
        title:string="添加价格";
        Order0:Boolean = true;
        Order1:Boolean = false;
        Order2:Boolean = false;
        Order3:Boolean = false;
        Order4:Boolean = false;
        Order5:Boolean = false;
        PriceLenList= [
        {
          value: 0,
          label: '默认0阶'
        }, {
          value: 1,
          label: '一阶二价'
        }, {
          value: 2,
          label: '二阶三价'
        }, {
          value: 3,
          label: '三阶四价'
        }, {
          value: 4,
          label: '四阶五价'
        }
      ];
        save(){
            (this.$refs.moneyForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    console.log(this.money)
                    await this.$store.dispatch({
                        type:'money/create',
                        data:this.money
                    });
                    (this.$refs.moneyForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        
        cancel(){
            (this.$refs.moneyForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }
        }
        // moneyRule={
        //     name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('moneyName')),trigger: 'blur'}],
        //     tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}],
        //     adminEmailAddress:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('AdminEmailAddress')),trigger: 'blur'},{type: 'email'}]
        // }
        /* 阶梯数选择 */
        handleOrder (val) {
            let f = parseInt(val)
            if (f === 0) {
               this.Order0 = true
               this.Order1 = this.Order2 = this.Order3 = this.Order4 = false
            } else if (f === 1) {
              this.Order0 = this.Order1 = true
              this.Order2 = this.Order3 = this.Order4 = false
            } else if (f === 2) {
              this.Order0 = this.Order1 = this.Order2 = true
              this.Order3 = this.Order4 = false
            } else if (f === 3) {
              this.Order0 = this.Order1 = this.Order2 = this.Order3 = true
              this.Order4 = false
            } else if (f === 4) {
              this.Order0 = this.Order1 = this.Order2 = this.Order3 = this.Order4 = true
            }
        }
    }
</script>
<style lang="less">
.bd_all {
  border: 1px solid #bebdbd;
}
.bdrs_all_5 {
  border-radius: 5px;
}
.positionHead {
    position: absolute;
    left: 10px;
    top: -15px;
    background-color: #fff;
    padding: 5px;
}
</style>
