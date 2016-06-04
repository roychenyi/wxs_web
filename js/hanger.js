/**
 * Created by chenyi on 2016/05/11.
 */
//挂件
var Hanger={
    //天气
    weather:function(city){
        var url=getRootPath()+"/hanger/weather",
            data='';
        if(city!=null&&city.length>0&&city!=''){
            data="city="+city;
        }
        ajax(url,data,Hanger.weather_result);
    },
    weather_result:function(data){
        $('#weather_module').html("<div class='other-info' id='weather-info'><div class='shadow-wrapper city-wrapper' title='"+data.city+"' id='weather_city_name'><p class='city textoverflow'>"+data.city+"</p></div><div class='shadow-wrapper date-wrapper'><p class='date'>"+data.dayWeathers[0].date+data.dayWeathers[0].weather+" </p></div></div><div class='weather-temperature shadow-wrapper'> <h5 class='temperature-num'>"+data.dayWeathers[0].temperature+"</h5><!--<span class='temperature-unit'>°</span>--></div> <img class='weather-icon' src='"+getRootPath()+"/images/weather/a_"+data.dayWeathers[0].path1+"' alt='' title='"+data.dayWeathers[0].weather+"'>");
    }
};