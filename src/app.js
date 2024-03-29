const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather for the hard core',
        name: 'Mother Nature'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'And now for the weather report',
        name: 'Gaia'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help for losers',
        name: 'Athena',
        helpText: 'Do not use the mouse as a paperweight'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must enter an address"
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } ={}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help page not found',
        name: 'Jon Snow',
        errorMessage: 'Try again djork'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'This is a 404 page',
        name: 'Yer mom',
        errorMessage: 'Try a better page next time'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

