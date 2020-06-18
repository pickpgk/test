<template>
  <div>
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
                    key: 'rank',
                    // width: '70',
                    align: 'center'
                },
                {
                    title: '充值序号',
                    key: 'chargeRank',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '总充值序号',
                    key: 'allChargeRank',
                    // width: '110',
                    align: 'center'
                },
                {
                    title: '价格类型',
                    key: 'priceType',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '实收金额',
                    key: 'moneyAmount',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '上次余额',
                    key: 'lastBalance',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '本次余额',
                    key: 'thisBalance',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '操作类型',
                    key: 'operationType',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '缴费方式',
                    key: 'payMethod',
                    // width: '100',
                    align: 'center'
                },
                {
                    title: '员工名称',
                    key: 'userName',
                    // width: '110',
                    align: 'center'
                },
                {
                    title: '操作时间',
                    key: 'operationTime',
                    // width: '170',
                    align: 'center'
                }
            ],
            data1: [
                {
                    rank: '1',
                    chargeRank: 1,
                    allChargeRank: '1',
                    priceType: '1',
                    moneyAmount: 100,
                    lastBalance: 5,
                    thisBalance: 105,
                    operationType: '充值',
                    payMethod: 'cash',
                    userName: '张三额',
                    operationTime: '2013-02-04 11:01:10'
                },
                {
                    rank: '2',
                    chargeRank: 1,
                    allChargeRank: '1',
                    priceType: '1',
                    moneyAmount: 100,
                    lastBalance: 5,
                    thisBalance: 105,
                    operationType: '充值',
                    payMethod: 'cash',
                    userName: '张三',
                    operationTime: '2013-02-04 11:01:10'
                },
                {
                    rank: '3',
                    chargeRank: 1,
                    allChargeRank: '1',
                    priceType: '1',
                    moneyAmount: 100,
                    lastBalance: 5,
                    thisBalance: 105,
                    operationType: '充值',
                    payMethod: 'cash',
                    userName: '张三',
                    operationTime: '2013-02-04 11:01:10'
                },
                {
                    rank: '4',
                    chargeRank: 1,
                    allChargeRank: '1',
                    priceType: '1',
                    moneyAmount: 100,
                    lastBalance: 5,
                    thisBalance: 105,
                    operationType: '充值', 
                    payMethod: 'cash',
                    userName: '张三',
                    operationTime: '2013-02-04 11:01:10'
                },
                {
                    rank: '5',
                    chargeRank: 1,
                    allChargeRank: '1',
                    priceType: '1',
                    moneyAmount: 100,
                    lastBalance: 5,
                    thisBalance: 105,
                    operationType: '充值',
                    payMethod: 'cash',
                    userName: '张三',
                    operationTime: '2013-02-04 11:01:10'
                }
            ],
            save(){

            }
        }
    }
}
</script>

<style lang='less' scoped>

</style>
