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
            callback(undefined,body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        })
    }
    module.exports=forecast;