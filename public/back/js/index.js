var myChart = echarts.init(document.querySelector(".pic_left"));
var myChart1 = echarts.init(document.querySelector(".pic_right"));
var option = {
  title: {
    text: '2017注册人数'
  },
  tooltip: {},
  legend: {
    data:['人数']
  },
  xAxis: {
    data: ["1月","2月","3月","4月","5月","6月"]
  },
  yAxis: {},
  series: [{
    name: '人数',
    type: 'bar',
    data: [5223, 22330, 3226, 12220, 1033, 20332]
  }]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);
option = {
  title : {
    text: '热门品牌销售',
    subtext: '2017年6月',
    x:'center'
  },
  tooltip : {
    trigger: 'item',
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克','阿迪','特步','李宁','红星']
  },
  series : [
    {
      name: '',
      type: 'pie',
      radius : '55%',
      center: ['50%', '60%'],
      data:[
        {value:335, name:'耐克'},
        {value:310, name:'阿迪'},
        {value:234, name:'特步'},
        {value:135, name:'李宁'},
        {value:1548, name:'红星'}
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
myChart1.setOption(option);
