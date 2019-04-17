const request=require('request');

const forecast=(lat,long,callback)=>{
        const url ="https://api.darksky.net/forecast/a2f78ff01a813417e62a7080cd481b79/"+lat+","+long;
        request({url,json:true},(error,{body})=>{
            if(error){
                callback('unable to make connection with weather api',undefined);
            }
            else if(body.error){
                callback("Unable to find Location",undefined);
            }
            else
            temperatureInDegrees=(((Number(body.currently.temperature))-32)*5/9).toFixed(2);
            temperatureInDegreesDayHigh=(((Number(body.daily.data[0].temperatureHigh))-32)*5/9).toFixed(2);
            temperatureInDegreesDayLow=(((Number(body.daily.data[0].temperatureLow))-32)*5/9).toFixed(2);
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + temperatureInDegrees + ' °C out. There is a ' + body.currently.precipProbability + '% chance of rain. To state further, day recorded highest temp at '+temperatureInDegreesDayHigh+' °C and lowest at '+temperatureInDegreesDayLow+ ' °C.')
        })
    }
    module.exports=forecast;