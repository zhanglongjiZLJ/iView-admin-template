<template>
    <div id="myChart" :style="{width: '100%', height: '100%'}"></div>
</template>

<script>
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/radar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  data() {
    return {
    }
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
    var  option = {
	    title: {
	        text: '内部收益率（IRR）',
	        textStyle:{
	        	color:"#fff"
	        }
	    },
	    tooltip: {},
	    legend: {
	    	orient:'vertical',
	    	right:0,
	    	bottom:0,
	    	textStyle:{
	    		color:"#fff"
	    	},
	        data: ['概率分布P75', '概率分布P90']
	    },
	    radar: {
	        // shape: 'circle',
	        name: {
	            textStyle: {
	                color: '#fff',
	                // backgroundColor: '#333',
	                borderRadius: 3,
	                padding: [3, 5]
	           }
	        },
	        indicator: [
	           { name: '全投资IRR', max: 6500},
	           { name: '资本金IRR', max: 16000},
	           { name: '乐观投资IRR', max: 30000},
	           { name: '保守投资IRR', max: 38000},
	           { name: '兜底全投资IRR', max: 52000},
	           { name: '兜底资本金IRR', max: 25000}
	        ]
	    },
	    series: [{
	        //name: '预算 vs 开销（Budget vs spending）',
	        type: 'radar',
	        // areaStyle: {normal: {}},
	        data : [
	            {
	                value : [4300, 10000, 28000, 35000, 50000, 19000],
	                name : '概率分布P75'
	            },
	             {
	                value : [5000, 14000, 28000, 31000, 42000, 21000],
	                name : '概率分布P90'
	            }
	        ]
	    }]
	};
      // 绘制图表
      myChart.setOption(option);
		window.addEventListener('resize', function() {
			myChart.resize();
		});
    }
  }
}
</script>

<style scoped>
#myChart{
}
</style>
