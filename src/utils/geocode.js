const request=require('request');

const geocode= (address,callback)=>{
    const geoCodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+address+".json?access_token=pk.eyJ1Ijoic2lsZW50bW9uazkxIiwiYSI6ImNqdWpmdHJvbTAwOWk0NHB3bWV1OW5oOWUifQ.vc4fWap7u7VwBF9bPc8GXA&limit=1"
    request({url:geoCodeURL,json:true},(error,{body})=>{
        if (error){
            callback('Unable to connect with to location services.',undefined)
        }
        else if(body.features.length === 0) {
            callback('Unable to find Location. Try another search. ',undefined)
        }
        else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name    
            })};
    });
};
/*
geocode('islamabad',(error,data)=>{
  console.log('Error aya:',error);
  console.log('data lelo:',data);
})
*/

module.exports=geocode;