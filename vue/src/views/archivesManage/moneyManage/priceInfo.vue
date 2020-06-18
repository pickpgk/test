<template>
    <div class="windowBgBox">
      <Modal
         :title="L('CreateNewMoney')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
         width="700"
        >
        <Form ref="moneyForm"  label-position="right" :model="money" label-width="117">
            <Row :gutter="16">
                <i-col span="8">
                    <FormItem :label="L('价格名称')" prop="价格名称">
                        <i-input v-model="money.P_Name" :maxlength="32" :minlength="2"></i-input>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem :label="L('阶梯数')">
                        <i-select>
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
                        <i-input v-model="money.Other1" :maxlength="1024"></i-input>
                    </FormItem>
                </i-col>
            </Row>
            <Row :gutter="16">
                <i-col span="8">
                    <FormItem :label="L('其他费用1(元/吨)')">
                        <i-input v-model="money.Other2"></i-input>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem :label="L('其他费用2(元/吨)')">
                        <i-input v-model="money.Other3"></i-input>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem :label="L('其他费用3(元/吨)')">
                        <i-input v-model="money.Other4"></i-input>
                    </FormItem>
                </i-col>
            </Row>
            <Row :gutter="16">
                <i-col span="8">
                    <FormItem :label="L('违约金比例(%)')">
                        <i-input v-model="money.Penalties"></i-input>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem :label="L('保底单价(元/吨)')">
                        <i-input v-model="money.LowPrice"></i-input>
                    </FormItem>
                </i-col>
                <i-col span="8">
                    <FormItem :label="L('保底量(吨)')">
                        <i-input v-model="money.LowAmount"></i-input>
                    </FormItem>
                </i-col>
            </Row>
            <!-- 多阶计费 -->
            <Row :gutter="16" class="bd_all bdrs_all_5">
                <p class="positionHead">多阶计费</p>
                <Row :gutter="16" style="position:relative;padding:20px 2px 2px 8px;">
                    <i-col span="8">
                        <FormItem :label="L('一阶单价')">
                            <i-input v-model="money.Base1"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('一阶合计')">
                            <i-input v-model="money.Price1"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                    <i-col span="8">
                        <FormItem :label="L('一阶吨限')">
                            <i-input v-model="money.Ton1"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('二阶单价')">
                            <i-input v-model="money.Base2"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('二阶合计')">
                            <i-input v-model="money.Price2"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                    <i-col span="8">
                        <FormItem :label="L('二阶吨限')">
                            <i-input v-model="money.Ton2"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('三阶单价')">
                            <i-input v-model="money.Base3"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('三阶合计')">
                            <i-input v-model="money.Price3"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
                <Row :gutter="16" style="position:relative;padding:0px 8px 0px 8px;">
                    <i-col span="8">
                        <FormItem :label="L('三阶吨限')">
                            <i-input v-model="money.Ton3"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('四阶单价')">
                            <i-input v-model="money.Base4"></i-input>
                        </FormItem>
                    </i-col>
                    <i-col span="8">
                        <FormItem :label="L('四阶合计')">
                            <i-input v-model="money.Price4"></i-input>
                        </FormItem>
                    </i-col>
                </Row>
            </Row>
            
            <!-- <FormItem :label="L('价格吨限')" prop="价格吨限">
                <i-input v-model="money.p_Ton1" :maxlength="1024"></i-input>
            </FormItem> -->
            <!-- <FormItem>
                <Checkbox v-model="money.isActive">{{L('IsActive')}}</Checkbox>
            </FormItem> -->
            <!-- <p><p>{{L("DefaultPasswordIs",undefined,'123qwe')}}</p></p> -->
        </Form>
                <!-- <Row>
                    <i-col :span="24" style="padding:15px 0 0 340px">
                        <FormItem>
                            <i-button type="primary" size="small" @click="editPriceSubmit">立即创建</i-button>
                            <i-button size="small" @click="editPriceClose">取消</i-button>
                        </FormItem>
                    </i-col>
                </Row> -->
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
    @Component
export default class qqCreateMoney extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
      officeForm= {};
      OfficeList= [];
      PriceForm= {
        Base1: 0.00,
        Base2: 0.00,
        Base3: 0.00,
        Base4: 0.00,
        Base5: 0.00,
        Base6: 0.00,
        Base7: 0.00,
        Base8: 0.00,
        Price1: 0.00,
        Price2: 0.00,
        Price3: 0.00,
        Price4: 0.00,
        Price5: 0.00,
        Price6: 0.00,
        Price7: 0.00,
        Price8: 0.00,
        Ton1: 0,
        Ton2: 0,
        Ton3: 0,
        Ton4: 0,
        Ton5: 0,
        Ton6: 0,
        Ton7: 0,
        Other1: 0.00,
        Other2: 0.00,
        Other3: 0.00,
        Other4: 0.00,
        PriceLen: 0,
        Name: '',
        LowAmount: 0,
        LowPrice: 0.00,
        Penalties: 0
      };
      adjustPriceForm= {};
      PriceList= [];
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
        }, {
          value: 5,
          label: '五阶六价'
        }, {
          value: 6,
          label: '六阶七价'
        }, {
          value: 7,
          label: '七阶八价'
        }
      ];
      addPriceTrue:boolean=false;
      adjustPriceTrue:boolean=false;
      editPriceTrue:boolean=false;
      delPriceTrue: false;
      Order0:boolean=true;
      Order1:boolean=false;
      Order2:boolean=false;
      Order3:boolean=false;
      Order4:boolean=false;
      Order5:boolean=false;
      Order6:boolean=false;
      Order7:boolean=false;
      detailOrder0:boolean=true;
      detailOrder1:boolean=true;
      detailOrder2:boolean=true;
      detailOrder3:boolean=true;
      detailOrder4:boolean=true;
      detailOrder5:boolean=true;
      detailOrder6:boolean=true;
      detailOrder7:boolean=true;
      CompanyId:boolean=null
    };
//   created () {
//     console.log('ffffff')
//   },
//   filters: {
//     NumtoFixed2 (val) {
//       let f = (val * 100) / 100
//       return f.toFixed(2)
//     },
//     EnabledFilters (val) {
//       let f = parseInt(val)
//       if (f === 0) {
//         return '停用'
//       } else if (f === 1) {
//         return '正常'
//       }
//     }
//   },
//   methods: {
//       visibleChange(value){
//             if(!value){
//                 this.$emit('input',value);
//             }
//         },
//     save(){
//         console.log('ddddddd')
//     },
//     /* 删除价格 */
//     delPrice () {
//       if (this.adjustPriceForm === null) {
//         this.$message({
//           type: 'warning',
//           message: '请选择价格后进行此操作！！！'
//         })
//       } else {
//         this.$confirm('此操作将永久删除该价格类型, 是否继续?', '提示', {
//           confirmButtonText: '确定',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//           console.log(userInfo)
//           let params = {iCurOperatorId: userInfo.Id, PriceEntity: {}}
//           // console.log(params)操作员信息
//           params.PriceEntity.Id = this.adjustPriceForm.Id
//           params.PriceEntity.CheckID = userInfo.CheckID
//           params.PriceEntity.CheckCode = userInfo.CheckCode
//           delPrice(params).then(res => {
//             console.log(res)
//             if (res.returnCode === 0) {
//               getPriceListByOffice({iCompanyId: this.CompanyId, iCurPage: 0, iPageCount: 0, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//                 if (res.returnCode === 0) {
//                   this.PriceList = JSON.parse(res.returnMsg)
//                   console.log(this.PriceList)
//                 }
//               })
//               this.$message({
//                 type: 'success',
//                 message: '删除成功!'
//               })
//             } else if (res.returnCode === 1) {
//               this.$router.push({ name: 'ForcedToLogoff' })
//             }
//           })
//         }).catch(() => {
//           this.$message({
//             type: 'info',
//             message: '已取消删除'
//           })
//         })
//       }
//     },
//     /* 修改价格 */
//     editPriceOpen () {
//       if (this.adjustPriceForm === null) {
//         this.$message({
//           type: 'warning',
//           message: '请选择价格后进行此操作！！！'
//         })
//       } else {
//         this.editPriceTrue = true
//       }
//     },
//     editPriceClose () {
//       this.editPriceTrue = false
//       this.$message({
//         type: 'info',
//         message: '已取消价格修改操作！！！'
//       })
//     },
//     editPriceSubmit () {
//       let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//       let PriceEntity = this.adjustPriceForm
//       for (const key in PriceEntity) {
//         if (PriceEntity[key] === '' || PriceEntity[key] === undefined) {
//           if (key === 'CheckCode' || key === 'returnMsg') {
//             continue
//           }
//           this.$message({
//             type: 'warning',
//             message: '请正确填写价格信息！！！'
//           })
//           // console.log(key)
//           return
//         }
//       }
//       let params = {}
//       params.iCurOperatorId = userInfo.Id
//       params.PriceEntity = PriceEntity
//       params.PriceEntity.CheckID = userInfo.CheckID
//       params.PriceEntity.CheckCode = userInfo.CheckCode
//       editPrice(params).then(res => {
//         if (res.returnCode === 0) {
//           getPriceListByOffice({iCompanyId: this.CompanyId, iCurPage: 0, iPageCount: 0, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//             if (res.returnCode === 0) {
//               this.PriceList = JSON.parse(res.returnMsg)
//             }
//           })
//           this.editPriceTrue = false
//           this.$message({
//             type: 'success',
//             message: res.returnMsg
//           })
//         } else if (res.returnCode === 1) {
//           this.$router.push({ name: 'ForcedToLogoff' })
//         } else {
//           this.$message({
//             type: 'warning',
//             message: res.returnMsg
//           })
//         }
//       })
//     },
//     /* 调整价格 */
//     adjustPriceOpen () {
//       if (this.adjustPriceForm === null) {
//         this.$message({
//           type: 'warning',
//           message: '请选择价格后进行此操作！！！'
//         })
//       } else {
//         this.adjustPriceTrue = true
//       }
//     },
//     adjustPriceClose () {
//       this.adjustPriceTrue = false
//       this.$message({
//         type: 'info',
//         message: '已取消价格调整操作！！！'
//       })
//     },
//     adjustPriceSubmit () {
//       let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//       let PriceEntity = this.adjustPriceForm
//       for (const key in PriceEntity) {
//         if (PriceEntity[key] === '' || PriceEntity[key] === undefined) {
//           if (key === 'CheckCode' || key === 'returnMsg') {
//             continue
//           }
//           this.$message({
//             type: 'warning',
//             message: '请正确填写价格信息！！！'
//           })
//           return
//         }
//       }
//       let params = {}
//       params.iCurPriceId = PriceEntity.Id
//       params.iCurOperatorId = userInfo.Id
//       params.PriceEntity = PriceEntity
//       params.PriceEntity.CompanyId = this.CompanyId
//       params.PriceEntity.CheckID = userInfo.CheckID
//       params.PriceEntity.CheckCode = userInfo.CheckCode
//       delete params.PriceEntity.Id
//       adjustPrice(params).then(res => {
//         if (res.returnCode === 0) {
//           getPriceListByOffice({iCompanyId: this.CompanyId, iCurPage: 0, iPageCount: 0, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//             if (res.returnCode === 0) {
//               this.PriceList = JSON.parse(res.returnMsg)
//             }
//           })
//           this.adjustPriceTrue = false
//           this.$message({
//             type: 'success',
//             message: res.returnMsg
//           })
//         } else if (res.returnCode === 1) {
//           this.$router.push({ name: 'ForcedToLogoff' })
//         } else {
//           this.$message({
//             type: 'warning',
//             message: res.returnMsg
//           })
//         }
//       })
//     },
//     /* 新增价格 */
//     addPriceOpen () {
//       if (this.CompanyId === null) {
//         this.$message({
//           type: 'warning',
//           message: '请选择营业所后进行此操作！！！'
//         })
//       } else {
//         this.addPriceTrue = true
//       }
//     },
//     addPriceClose () {
//       this.addPriceTrue = false
//       this.PriceForm = {Base1: 0.00, Base2: 0.00, Base3: 0.00, Base4: 0.00, Base5: 0.00, Base6: 0.00, Base7: 0.00, Base8: 0.00, Price1: 0.00, Price2: 0.00, Price3: 0.00, Price4: 0.00, Price5: 0.00, Price6: 0.00, Price7: 0.00, Price8: 0.00, Ton1: 0, Ton2: 0, Ton3: 0, Ton4: 0, Ton5: 0, Ton6: 0, Ton7: 0, Other1: 0.00, Other2: 0.00, Other3: 0.00, Other4: 0.00, PriceLen: 0, Name: '', LowAmount: 0, LowPrice: 0.00, Penalties: 0}
//       this.$message({
//         type: 'info',
//         message: '已取消新增价格！！！'
//       })
//     },
//     addPriceSubmit () {
//       let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//       let arr = ['Ton1', 'Ton2', 'Ton3', 'Ton4', 'Ton5', 'Ton6', 'Ton7']
//       let PriceEntity = this.PriceForm
//       for (const key in PriceEntity) {
//         if (PriceEntity[key] === '' || PriceEntity[key] === undefined) {
//           this.$message({
//             type: 'warning',
//             message: '请正确填写价格信息！！！'
//           })
//           return
//         }
//         for (let i = 0; i < arr.length; i++) {
//           if (key === arr[i] && parseInt(PriceEntity[key]) === 0) {
//             PriceEntity[key] = 999999
//           }
//         }
//       }
//       let params = {}
//       params.iCurOperatorId = userInfo.Id
//       params.PriceEntity = PriceEntity
//       params.PriceEntity.CompanyId = this.CompanyId
//       params.PriceEntity.CheckID = userInfo.CheckID
//       params.PriceEntity.CheckCode = userInfo.CheckCode
//       AddPrice(params).then(res => {
//         if (res.returnCode === 0) {
//           getPriceListByOffice({iCompanyId: this.CompanyId, iCurPage: 0, iPageCount: 0, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//             if (res.returnCode === 0) {
//               this.PriceList = JSON.parse(res.returnMsg)
//             }
//           })
//           this.addPriceTrue = false
//           this.PriceForm = {Base1: 0.00, Base2: 0.00, Base3: 0.00, Base4: 0.00, Base5: 0.00, Base6: 0.00, Base7: 0.00, Base8: 0.00, Price1: 0.00, Price2: 0.00, Price3: 0.00, Price4: 0.00, Price5: 0.00, Price6: 0.00, Price7: 0.00, Price8: 0.00, Ton1: 0, Ton2: 0, Ton3: 0, Ton4: 0, Ton5: 0, Ton6: 0, Ton7: 0, Other1: 0.00, Other2: 0.00, Other3: 0.00, Other4: 0.00, PriceLen: 0, Name: '', LowAmount: 0, LowPrice: 0.00, Penalties: 0}
//           this.$message({
//             type: 'success',
//             message: res.returnMsg
//           })
//         } else if (res.returnCode === 1) {
//           this.$router.push({ name: 'ForcedToLogoff' })
//         } else {
//           this.$message({
//             type: 'warning',
//             message: res.returnMsg
//           })
//         }
//       })
//     },
//     /* 初始化营业所列表 */
//     // initOfficeList () {
//     //   let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//     //   getOfficeList({iOperatorId: userInfo.Id, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//     //     if (res.returnCode === 0) {
//     //       this.OfficeList = JSON.parse(res.returnMsg)
//     //     }
//     //   })
//     // },
//     /* 阶梯数选择 */
//     handleOrder (val) {
//       let f = parseInt(val)
//       if (f === 0) {
//         this.Order0 = true
//         this.Order1 = this.Order2 = this.Order3 = this.Order4 = this.Order5 = this.Order6 = this.Order7 = false
//       } else if (f === 1) {
//         this.Order0 = this.Order1 = true
//         this.Order2 = this.Order3 = this.Order4 = this.Order5 = this.Order6 = this.Order7 = false
//       } else if (f === 2) {
//         this.Order0 = this.Order1 = this.Order2 = true
//         this.Order3 = this.Order4 = this.Order5 = this.Order6 = this.Order7 = false
//       } else if (f === 3) {
//         this.Order0 = this.Order1 = this.Order2 = this.Order3 = true
//         this.Order4 = this.Order5 = this.Order6 = this.Order7 = false
//       } else if (f === 4) {
//         this.Order0 = this.Order1 = this.Order2 = this.Order3 = this.Order4 = true
//         this.Order5 = this.Order6 = this.Order7 = false
//       } else if (f === 5) {
//         this.Order0 = this.Order1 = this.Order2 = this.Order3 = this.Order4 = this.Order5 = true
//         this.Order6 = this.Order7 = false
//       } else if (f === 6) {
//         this.Order0 = this.Order1 = this.Order2 = this.Order3 = this.Order4 = this.Order5 = this.Order6 = true
//         this.Order7 = false
//       } else if (f === 7) {
//         this.Order0 = this.Order1 = this.Order2 = this.Order3 = this.Order4 = this.Order5 = this.Order6 = this.Order7 = true
//       }
//     },
//     /* 合计价格计算 */
//     autoSummation () {
//       this.PriceForm.Price1 = this.PriceForm.Base1 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price2 = this.PriceForm.Base2 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price3 = this.PriceForm.Base3 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price4 = this.PriceForm.Base4 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price5 = this.PriceForm.Base5 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price6 = this.PriceForm.Base6 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price7 = this.PriceForm.Base7 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1
//       this.PriceForm.Price8 = this.PriceForm.Base8 * 1 + this.PriceForm.Other1 * 1 + this.PriceForm.Other2 * 1 + this.PriceForm.Other3 * 1 + this.PriceForm.Other4 * 1

//       this.adjustPriceForm.Price1 = this.adjustPriceForm.Base1 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price2 = this.adjustPriceForm.Base2 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price3 = this.adjustPriceForm.Base3 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price4 = this.adjustPriceForm.Base4 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price5 = this.adjustPriceForm.Base5 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price6 = this.adjustPriceForm.Base6 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price7 = this.adjustPriceForm.Base7 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//       this.adjustPriceForm.Price8 = this.adjustPriceForm.Base8 * 1 + this.adjustPriceForm.Other1 * 1 + this.adjustPriceForm.Other2 * 1 + this.adjustPriceForm.Other3 * 1 + this.adjustPriceForm.Other4 * 1
//     },
//     /* 点击营业所加载价格 */
//     handleCurrentChange (val) {
//       this.officeForm = val
//       let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
//       this.CompanyId = val.Id
//       getPriceListByOffice({iCompanyId: this.CompanyId, iCurPage: 0, iPageCount: 0, iCheckID: userInfo.CheckID, iCheckCode: userInfo.CheckCode}).then(res => {
//         if (res.returnCode === 0) {
//           this.PriceList = JSON.parse(res.returnMsg)
//         }
//       })
//     },
//     setCurrent (row) {
//       this.$refs.officeTable.setCurrentRow(row)
//       this.OfficeInfo = {No: '', Name: ''}
//       this.CompanyId = null
//       console.log(123)
//     },
//     /* 价格状态字体颜色 */
//     EnabledStyle ({row, column, rowIndex, columnIndex}) {
//       if (column.label === '状态' && row.Enabled * 1 === 1) {
//         return 'color:#47b747'
//       } else if (column.label === '状态' && row.Enabled * 1 === 0) {
//         return 'color:red'
//       }
//     },
//     /* 点击获取价格信息 */
//     handleCurrentChangeJiage (val) {
//       if (val !== null) {
//         this.adjustPriceForm = val
//         let f = parseInt(val.PriceLen)
//         if (f === 0) {
//           this.detailOrder0 = true
//           this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 1) {
//           this.detailOrder0 = this.detailOrder1 = true
//           this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 2) {
//           this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = true
//           this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 3) {
//           this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = true
//           this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 4) {
//           this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = true
//           this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 5) {
//           this.detailOrder0 = this.Order1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = true
//           this.detailOrder6 = this.detailOrder7 = false
//         } else if (f === 6) {
//           this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = true
//           this.detailOrder7 = false
//         } else if (f === 7) {
//           this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = true
//         }
//       }
//       this.adjustPriceForm = val
//     },
//     expandChange (row, expandedRows) {
//       this.staffInfo = row
//       let f = parseInt(row.PriceLen)
//       if (f === 0) {
//         this.detailOrder0 = true
//         this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 1) {
//         this.detailOrder0 = this.detailOrder1 = true
//         this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 2) {
//         this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = true
//         this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 3) {
//         this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = true
//         this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 4) {
//         this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = true
//         this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 5) {
//         this.detailOrder0 = this.Order1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = true
//         this.detailOrder6 = this.detailOrder7 = false
//       } else if (f === 6) {
//         this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = true
//         this.detailOrder7 = false
//       } else if (f === 7) {
//         this.detailOrder0 = this.detailOrder1 = this.detailOrder2 = this.detailOrder3 = this.detailOrder4 = this.detailOrder5 = this.detailOrder6 = this.detailOrder7 = true
//       }
//       if (expandedRows.length > 1) {
//         expandedRows.shift()
//       }
//     }
//   }
// }
}
</script>

<style lang='less' scoped>
// .el-table /deep/ td {
//   padding: 6px;
// }
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
