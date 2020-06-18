<template>
    <div>
        <Cascader :data="app" v-model="value1"></Cascader>
        <Cascader :data="data" v-model="value12"></Cascader>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value1: [],
                data: [{
                    // value: 'beijing',
                    label: '北京',
                    children: [
                        {
                            // value: 'gugong',
                            label: '故宫'
                        },
                        {
                            // value: 'tiantan',
                            label: '天坛'
                        },
                        {
                            value: 'wangfujing',
                            label: '王府井'
                        }
                    ]
                }, {
                    value: 'jiangsu',
                    label: '江苏',
                    children: [
                        {
                            value: 'nanjing',
                            label: '南京',
                            children: [
                                {
                                    value: 'fuzimiao',
                                    label: '夫子庙',
                                }
                            ]
                        },
                        {
                            value: 'suzhou',
                            label: '苏州',
                            children: [
                                {
                                    value: 'zhuozhengyuan',
                                    label: '拙政园',
                                },
                                {
                                    value: 'shizilin',
                                    label: '狮子林',
                                }
                            ]
                        }
                    ],
                }]
            }
        },
        // get app () {
    //     // console.log(this.$store.state.district.list);
    //     this.selectData = this.$store.state.district.list;
    //     console.log(this.selectData);
    //     return this.treeToList(this.selectData)
    // }
     //********************************** */
    // treeToList(tree) {
    //     console.log('edcrfvtgbyhnujm')
    //         var queen = [];
    //         var out = [];
    //         queen = queen.concat(tree);
    //         while(queen.length) {
    //             var first = queen.shift();
    //             if (first.children) {
    //                 queen = queen.concat(first.children)
    //                 delete first['children'];
    //             }   
    //             out.push(first);
    //         }
    //         for (let i = 0; i<out.length;i++) {
    //             delete out[i].disablecheckbox;
    //             delete out[i].disabled;
    //             delete out[i].expand;
    //             delete out[i].ischecked;
    //             delete out[i].selected;
    //         }
    //         console.log(out)
    //         // return out;
    //         //    
    //         var outt = out.map(function(item) {
    //             return {
    //                 children: item.children,
    //                 id: item.id,
    //                 nodeKey: item.nodekey,
    //                 parentid: item.parentid,
    //                 label: item.title
    //             }
    //         });
    //         console.log(outt)   
    //         var map = {}, 
    //             node, 
    //             treeww= [], 
    //             ii;
    //         for (ii = 0; ii < outt.length; ii ++) {
    //             map[outt[ii].id] = outt[ii]; 
    //             console.log('fffff')
    //             outt[ii].children = []; 
    //             console.log(outt)
    //         }
    //         for (ii = 0; ii < outt.length; ii += 1) {
    //             node = outt[ii];
    //             if (node.parentid !== 0) {
    //                 map[node.parentid].children.push(node);
    //             } else {
    //                 treeww.push(node);console.log('fffff')
    //             }
    //         }
    //         console.log(treeww)
    //         return treeww;
    //     },
        //********************************** */
        mounted () {
            let tree = this.$store.state.district.list
            console.log(this.$store.state.district.list)
            this.treeToList(this.$store.state.district.list)
        },
        methods: {
        treeToList() {
                var queen = [];
                var out = [];
                queen = queen.concat(tree);
                while(queen.length) {
                    var first = queen.shift();
                    if (first.children) {
                        queen = queen.concat(first.children)
                        delete first['children'];
                    }   
                    out.push(first);
                }
                console.log(out)
                // return out;
            },
        }
        // mounted () {

        // }
    }
</script>
