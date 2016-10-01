var app=angular.module('FeltSo',[]);
app.directive('customOnChange', function() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
    element.bind('change',  scope.$eval(attrs.customOnChange));
    }
  };
});
app.controller('MainController',['$scope',function($scope){
    $scope.name="FeltSO reviews";
 /* $scope.uploadFile = function(){
    var files=event.target.files;
    f = files[0];
    var reader = new FileReader();
      alert("reader");
    reader.onload = (function(theFile) {
 return function(e) {
   data= JSON.parse(e.target.result);
            alert(data["restaurant_name"]);
            $scope.appData=data;
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsText(f);
    };*/
    $scope.uploadFile = function(){
    //alert("working");
     var files=event.target.files;
        f = files[0];
        //alert(f.name);
        var reader = new FileReader();
        reader.onload = function(e) {
            data = JSON.parse(e.target.result);
            //alert(data["restaurant_name"]);
            $scope.$apply(function()
                          {$scope.appData=data;$scope.contentVisible=true;
                          $scope.prepeareData(data);
                           $scope.prepareCharts(data);
                          }
                         );
            $("#uploadPage").fadeOut(500);
            
        };
      // Read in the image file as a data URL.
        reader.readAsText(f);
    };
    $scope.prepeareData = function(data){
        $scope.records=[];
        var stats=data.feltso_gist.feature_wise_stats;
        var samples=data.feltso_gist.feature_wise_samples;
        var ratings=data.feltso_gist.feature_wise_avg_rating;
    for (var key in stats) {
        var temp={};
        temp.name=(key.toString()).replace('_',' ');
        temp.stats=stats[key];
        temp.samples=samples[key];
        temp.ratings=ratings[key];
        $scope.records.push(temp);
      }
}
    $scope.prepareCharts= function(data){
       // alert("prepared charts");
        var dataForSpline=[];
        var posData={};
        var negData={};
        var mixData={};
        posData.type="area";posData.dataPoints=[];
        negData.type="area";negData.dataPoints=[];
        mixData.type="area";mixData.dataPoints=[];
        var posRevs=data.feltso_gist.overall_stats.positive_count;
        var negRevs=data.feltso_gist.overall_stats.negative_count;
        var mixRevs=data.feltso_gist.overall_stats.mixed_count;
        var posPer=parseFloat(posRevs/(posRevs+negRevs+mixRevs));
        var negPer=parseFloat(posRevs/(posRevs+negRevs+mixRevs));
        var mixPer=parseFloat(posRevs/(posRevs+negRevs+mixRevs));
       
        for (var key in data.feltso_gist.time_wise_stats) {
            var mon=key.substr(0,key.indexOf('-'));
            var year=year||parseInt(key.substr(key.indexOf('-')+1));
            var intMon=getMonthInteger(mon);
            //alert(intMon+" mon + year="+year);
            posData.dataPoints.push({ x: new Date(year,intMon,1),y: data.feltso_gist.time_wise_stats[key].positive_count});
            negData.dataPoints.push({x: new Date(year,intMon,1),y: data.feltso_gist.time_wise_stats[key].negative_count});
            mixData.dataPoints.push({x: new Date(year,intMon,1),y: data.feltso_gist.time_wise_stats[key].mixed_count});
      }
        dataForSpline.push(posData);
        dataForSpline.push(negData);
        dataForSpline.push(mixData);
        
        var chart = new CanvasJS.Chart("chartContainer",
    {
             height: 300,
      title:{
        text: "Sentiment Over Time"
    },
    axisX:{
        title: "Month",
        gridThickness: 1
    },
    axisY: {
        title: "Comments"
    },
    data: dataForSpline
           /* [
    {        
        type: "area",
        dataPoints:
        [//array
	   { x: new Date(2012, 00, 1), y: 29},
        { x: new Date(2012, 01, 1), y: 26},
        { x: new Date(2012, 02, 1), y: 38},
        { x: new Date(2012, 03, 1), y: 43},
        { x: new Date(2012, 04, 1), y: 29},
	{ x: new Date(2012, 05, 1), y: 29}

        ]
        
    }
    ]*/
});
    chart.render();
    var chart1 = new CanvasJS.Chart("chartContainer1",
	 {
        height: 300,
      title:{
        text: "Overall Stats",
        fontFamily: "Tahoma",
        fontWeight: "normal"
      },

      legend:{
        verticalAlign: "bottom",
        horizontalAlign: "center"
      },
      data: [
      {
        //startAngle: 45,
       indexLabelFontSize: 20,
       indexLabelFontFamily: "Garamond",
       indexLabelFontColor: "darkgrey",
       indexLabelLineColor: "darkgrey",
       indexLabelPlacement: "outside",
       type: "doughnut",
       showInLegend: true,
       dataPoints: [
       {  y: posRevs, legendText:"Positive", indexLabel: "Positive" },
       {  y: negRevs, legendText:"Negative", indexLabel: "Negative" },
       {  y: mixRevs, legendText:"Mixed", indexLabel: "Mixed" },
       ]
     }
     ]
   });
	chart1.render();
    }
    
    
    
}]);