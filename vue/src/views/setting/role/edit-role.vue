<template>
    <div>
        <Modal
         :title="L('EditRole')"
         :value="value"
         @on-ok="save"
         @on-visible-change="visibleChange"
        >
            <Form ref="roleForm"  label-position="top" :rules="roleRule" :model="role">
                <Tabs value="detail">
                    <TabPane :label="L('RoleDetails')" name="detail">
                        <FormItem :label="L('RoleName')" prop="name">
                            <Input v-model="role.name" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem :label="L('DisplayName')" prop="displayName">
                            <Input v-model="role.displayName" :maxlength="32" :minlength="2"></Input>
                        </FormItem>
                        <FormItem :label="L('Description')" prop="description">
                            <Input v-model="role.description" :maxlength="1024"></Input>
                        </FormItem>
                      </TabPane>
                    <TabPane :label="L('RolePermission')" name="permission">
                        <CheckboxGroup v-model="role.grantedPermissions">
                            <Checkbox :label="permission.name" v-for="permission in permissions" :key="permission.name"><span>{{permission.displayName}}</span></Checkbox>
                        </CheckboxGroup>
                        <Tree :data="tree"  show-checkbox multiple></Tree>
                    </TabPane>
                </Tabs>
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
    import Role from '@/store/entities/role';
    @Component
    export default class EditRole extends AbpBase{
        @Prop({type:Boolean,default:false}) value:boolean;
        role:Role=new Role();
        get permissions(){
            console.log(this.$store.state.role.permissions)
            // console.log(this.$store.state.role.permissions[6].checked)
    //data为数组，title为修改前，name为修改后
            console.log(JSON.parse(JSON.stringify(this.$store.state.role.permissions).replace(/name/g, 'title')))
            return this.$store.state.role.permissions
        }
        get tree () {
            let b= []
            let a = JSON.parse(JSON.stringify(this.$store.state.role.permissions).replace(/name/g, 'title'))
            for (let i=0;i<8;i++) {

                console.log(a[i].title.match(/\./g))
                if(a[i].title.match(/\./g).length==1) {
                    b.push(a[i])
                }
            }
            console.log(a)
            console.log(b)
            b[0].children=[]
            b[1].children=[]
            // console.log(a.title.match(/\./g))
            let aaa = {children:[]}
                // (a[i].title.match(/\a[j].title\/g)
                for (let j=0;j<8;j++) {
                    // if(a[j].title==b[i].title) {
                
                        // 思路正确，只要将数组里面的元素从一个变成多个就可以了，因为我循环了多次
      
                        // b[i].children.push(a[j])
                        console.log(j)
                        aaa.children.push(a[j])

                        console.log(b)
                }
            console.log(aaa)
            return a
        }
        save(){
            (this.$refs.roleForm as any).validate(async (valid:boolean)=>{
                if(valid){
                    await this.$store.dispatch({
                        type:'role/update',
                        data:this.role
                    });
                    (this.$refs.roleForm as any).resetFields();
                    this.$emit('save-success');
                    this.$emit('input',false);
                }
            })
        }
        cancel(){
            (this.$refs.roleForm as any).resetFields();
            this.$emit('input',false);
        }
        visibleChange(value:boolean){
            if(!value){
                this.$emit('input',value);
            }else{
                // console.log(this.$store.state.role.editRole)
                this.role=Util.extend(true,{},this.$store.state.role.editRole);
            }
        }
        roleRule={
            name:[{required: true,message:this.L('FieldIsRequired',undefined,this.L('RoleName')),trigger: 'blur'}],
            displayName:[{required:true,message:this.L('FieldIsRequired',undefined,this.L('DisplayName')),trigger: 'blur'}]
        }
    }
</script>

