const path = require('path')
const express = require('express')
const hbs = require('hbs')

const weatherUtils = require('./Utils/utils')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Andrew Mead'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Andrew Mead'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Andrew Mead'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error : " Needs a location to find the details"
        })
    }
    
    weatherUtils.geocode(req.query.address,(error,{latitude,longitude,placeName}={}) => {
        if(error){
            return res.send({
                error
            })
        }
        weatherUtils.forecast(latitude, longitude, (error, {temperature,summary,rain_prob} = {}) => {
            if(error){
            return  res.send({
                error
            })
            }
           
            res.send({
                forecast: summary,
                location: placeName,
                temperature : temperature,
                rain_prob : rain_prob*100
            })


        })
        
    })
})
    






app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Andrew Mead',
        errorMessage: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on ports 3000.')
})