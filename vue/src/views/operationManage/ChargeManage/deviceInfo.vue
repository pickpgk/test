<template>
  <div id="device">
      <Table border :columns="this.columns1" :data="this.data1"></Table>
  </div>
</template>

<script>
export default {
    data () {
        return {
            columns1: [
                {
                    title: '序号',
                    width: '100',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '用户表号',
                    width: '140',
                    align: 'center',
                    key: 'age'
                },
                {
                    title: '表具类型',
                    width: '100',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '价格类型',
                    width: '150',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '表的累计流量',
                    width: '130',
                    align: 'center',
                    key: 'name'
                },
                {
                    title: '表初始值',
                    width: '100',
                    align: 'center',
                    key: 'age'
                },
                {
                    title: '电池电压',
                    width: '100',
                    align: 'center',
                    key: 'address'
                },
                {
                    title: '信号强度',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '累计工作时间',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '阀门状态',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '电池状态',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '强磁状态',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '表当前时间',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '安装地址',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '安装时间',
                    width: '100',
                    align: 'center',
                    key: 'date'
                },
                {
                    title: '上次操作时间',
                    width: '100',
                    align: 'center',
                    key: 'date'
                }
            ],
            data1: [
                {
                    name: 'John Brown',
                    age: 123456789123,
                    address: 'New York No. 1 Lake Park',
                    date: '2016-10-03'
                },
                {
                    name: 'Jim Green',
                    age: 24,
                    address: 'London No. 1 Lake Park',
                    date: '2016-10-01'
                },
                {
                    name: 'Joe Black',
                    age: 30,
                    address: 'Sydney No. 1 Lake Park',
                    date: '2016-10-02'
                },
                {
                    name: 'Jon Snow',
                    age: 26,
                    address: 'Ottawa No. 2 Lake Park',
                    date: '2016-10-04'
                }
            ],
            save(){

            }
        }
    }
}
</script>

<style lang='less' scoped>
#device {
    margin-top: 20px;
}
</style>
