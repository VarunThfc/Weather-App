const request = require('request')

const geocode = (address,callback) => {
    const url_mapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoidmFydW4xMyIsImEiOiJjazRmeGtyd3cwcjFuM2ZxcWN0OXZoeGZiIn0.czIdnJW_FMUEXaGpva7rqg&limit=1'

    request(  { url:url_mapBox,json:true },(error,{body}={})=>{
        if(error){
            callback("Unable to connect to services",undefined)
        }
        else if(body.features.length === 0){
            callback("Bad request try another search",undefined)
        }
        else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                placeName : body.features[0].place_name
            })
        }
    })

 }

const forecast = (lat,long,callback) =>{
    const forecast_url = 'https://api.darksky.net/forecast/0ed97da4315d7d532b95b4596840457e/'+ encodeURIComponent(lat)+','+encodeURIComponent(long)+'?units=si'
    request(  { url:forecast_url,json:true },(error,{body}={})=>{
        if(error){
            callback("Unable to connect to the services",undefined)
        }
        else if(body.error){
            callback("Bad request , change the content",undefined)
        }
        else{
            callback(undefined,{
                temperature : body.currently.temperature,
                rain_prob : body.currently.precipProbability,
                summary : body.daily.data[0].summary
            })
        }
    })
        
}

 module.exports = {
     geocode : geocode,
     forecast : forecast
 }