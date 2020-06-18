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
                    key: 'rank'
                },
                {
                    title: '充值序号',
                    key: 'chargeRank'
                },
                {
                    title: '总充值序号',
                    key: 'allChargeRank'
                },
                {
                    title: '价格类型',
                    key: 'priceType'
                },
                {
                    title: '实收金额',
                    key: 'moneyAmount'
                },
                {
                    title: '上次余额',
                    key: 'lastBalance'
                },
                {
                    title: '本次余额',
                    key: 'thisBalance'
                },
                {
                    title: '操作类型',
                    key: 'operationType'
                },
                {
                    title: '缴费方式',
                    key: 'payMethod'
                },
                {
                    title: '员工名称',
                    key: 'userName'
                },
                {
                    title: '操作时间',
                    key: 'operationTime'
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
                    userName: '张三',
                    operationTime: '2019/12/13'
                },
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
                    userName: '张三',
                    operationTime: '2019/12/13'
                },
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
                    userName: '张三',
                    operationTime: '2019/12/13'
                },
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
                    userName: '张三',
                    operationTime: '2019/12/13'
                },
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
                    userName: '张三',
                    operationTime: '2019/12/13'
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
