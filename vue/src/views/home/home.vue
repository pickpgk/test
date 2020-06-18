<template>
    <div>
        <Card  style="width:100%;background:#E5EBF2;">
            <div class="headerNumData">
                <Row :gutter="16">
                    <i-col span="4">
                        <Card class="users">
                            <i class="iconfont" style="color:#9370DB;">&#xe612;</i>
                            <!-- <p class="font_size_26">{{ CustomerCount }}</p> -->
                            <p class="font_size_26">9779</p>
                            <p class="font_size_22" @click="Jump">用户总数</p>
                        </Card>
                    </i-col>
                    <i-col span="4">
                        <Card class="district">
                            <i class="iconfont" style="color:#FF7F00;">&#xebd8;</i>
                            <p class="font_size_26">789</p>
                            <p class="font_size_22" style="line-height:40px;background:#9370DB;" @click="Jump">区域总数</p>
                        </Card>
                    </i-col>
                    <i-col span="4">
                        <Card class="revenue">
                            <i class="iconfont" style="color:#ff0000;">&#xe65f;</i>
                            <p class="font_size_26">159632</p>
                            <p class="font_size_22" style="line-height:40px;background:#9370DB;" @click="Jump">营收(元)</p>
                        </Card>
                    </i-col>
                    <i-col span="4">
                        <Card class="device">
                            <i class="iconfont" style="color:#778899;">&#xe62c;</i>
                            <p class="font_size_26">790</p>
                            <p class="font_size_22" style="line-height:40px;background:#9370DB;" @click="Jump">表具总数</p>
                        </Card>
                    </i-col>
                    <i-col span="4">
                        <Card class="waterCount">
                            <i class="iconfont" style="color:#24b0e3;">&#xe63d;</i>
                            <p class="font_size_26">7695</p>
                            <p class="font_size_22" style="line-height:40px;background:#9370DB;" @click="Jump">用水量(吨)</p>
                        </Card>
                    </i-col>
                    <i-col span="4">
                        <Card class="leakage">
                            <i class="iconfont" style="color:#4876FF;">&#xe60f;</i>
                            <p class="font_size_26">2%</p>
                            <p class="font_size_22" style="line-height:40px;background:#9370DB;" @click="Jump">漏水率</p>
                        </Card>
                    </i-col>
                    <!-- <i-col span="3">
                        <Card>
                            <i class="iconfont"></i>
                            <p class="font_size_26">{{ CustomerCount }}</p>
                            <p class="font_size_22" style="line-height:40px;background:DeepSkyBlue;" @click="Jump">用户总数</p>
                        </Card>
                    </i-col>
                    <i-col span="3">
                        <Card>
                            <i class="iconfont"></i>
                            <p class="font_size_26">{{ CustomerCount }}</p>
                            <p class="font_size_22" style="line-height:40px;background:DeepSkyBlue;" @click="Jump">用户总数</p>
                        </Card>
                    </i-col> -->
                </Row>
            </div>
        </Card>
        <i-col span="16">
            <card>
                <div id="main" style="marginTop:10px;width: 100%;height:400px;"></div>
            </card>
        </i-col>
        <i-col span="8">
            <Card>
                <div id="mainPie" style="marginTop:10px;width: 100%;height:400px;"></div>
            </card>
        </i-col>
    </div>
</template>
<script lang="ts">
import { Component, Vue,Inject, Prop,Watch } from 'vue-property-decorator';
import Util from '../../lib/util'
import AbpBase from '../../lib/abpbase'
import Echarts from 'echarts'
@Component
export default class CreateHome extends AbpBase{
    // mounted钩子函数
    mounted () {
        this.app()
        this.qqq()
        console.log(localStorage)
    }
    qqq () {
        var myChart = Echarts.init(document.getElementById('mainPie'));
        var option = {
            title : {
                text: '各个区域的用水量总量',
                subtext: '前五名和其他',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['德源','汉水','福州自来水','京华苑','南京路小区']
            },
            series : [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'德源'},
                        {value:310, name:'汉水'},
                        {value:234, name:'福州自来水'},
                        {value:135, name:'京华苑'},
                        {value:1548, name:'南京路小区'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        myChart.setOption(option);
    }
    // 方法
    app () {
        var myChart = Echarts.init(document.getElementById('main'));
        console.log(myChart)
        // 指定图表的配置项和数据
        var option = {
            title: {
                text: '年度用水量',
                x:'center'
            },
            tooltip: {},
            legend: {
                data:['各个区域的用水量总量']
            },
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月","一月","二月","三月","四月","五月","六月"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20, 5, 20, 36, 10, 10, 20]
            }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
    }
}
</script>

<style lang="less" scoped>
.headerNumData /deep/ .ivu-card-body {
    padding: 0px;
}
.headerNumData .font_size_26 {
    text-align: center;
    font-size: 22px;
    line-height:30px;
    color:DeepSkyBlue;
    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
.headerNumData .font_size_22 {
    text-align: center;
    font-size: 18px;
    line-height:40px;
    background:#9370DB;
    font-family: "Microsoft YaHei", "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}
.iconfont {
    display: block;
    width: 100%;
    font-size: 60px;
    text-align: center;
}
</style>
