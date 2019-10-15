const request = require('request')

const forecast = (latitude, longitude, callback) => {
     const url = 'https://api.darksky.net/forecast/fd1718d81852d4a3019031aed0b00570/' + latitude + ',' + longitude

request({ url, json: true }, (error, { body }) => {
    //console.log(body.currently)
        //console.log(latitude, longitude)
    if (error) {
        callback('Unable to connect to reach weather service.', undefined)
    } else if  (body.error) {
        callback('Unable to find your location', undefined)
    } else {
        callback(undefined, 'It is currently ' + body.currently.temperature + ' degrees out.  There is a ' + 
        body.currently.precipProbability + '% chance of rain.')
    }
})
}

module.exports = forecast 
