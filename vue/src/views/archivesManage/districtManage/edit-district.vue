<template>
    <div>
        <Modal
         :title="L('修改区域')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
        <!-- :rules=DistrictRule"下面的 -->
            <Form ref="districtForm"  label-position="top" :model="district">
                <FormItem :label="L('区域名称')" prop="tenancyName">
                    <Input v-model="district.areaName" :value="www.title" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <FormItem :label="L('区域描述')" prop="name">
                    <Input v-model="district.description" :maxlength="32" :minlength="2"></Input>
                </FormItem>
                <!-- <FormItem>
                    <Checkbox v-model="district.isActive">{{L('IsActive')}}</Checkbox>
                </FormItem> -->
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
    export default class EditDistrict extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        district:District=new District();
        www:District=new District();
        save(){
            (this.$refs.districtForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    this.district.parentId = this.$store.state.district.parentId;
                    this.district.id = this.$store.state.district.id;
                    console.log(this.district)
                    await this.$store.dispatch({
                        type:'district/update',
                        data:this.district
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
            }else{
                console.log(this.$store.state.district.editDistrict)
                this.district=Util.extend(true,{},this.$store.state.district.editDistrict);
                this.www=Util.extend(true,{},this.$store.state.district.editDistrict);
                // 获取更改字段
                // this.district.areaName = this.www.title;
                // this.district.description = this.www.title;
            }
        }
        // districtRule={
        //     name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('districtName')),trigger: 'blur'}],
        //     tenancyName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('TenancyName')),trigger: 'blur'}]
        // }
    }
</script>

