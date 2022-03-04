const express = require('express')

const app = express()

const phrases = require('./8ball')
const random = require('./8ball')
const fortune = require('./8ball')
const countdown = require('./pass-it-around/passit')
app.listen(3002, () =>{
    console.log('Listening on port 3002')
})



//part one greeting
app.get('/greeting', (req,res) =>{
    res.send("Hello, stranger.")
})

app.get('/greeting/:name', (req,res) => {
    res.send('Whats popping, ' + req.params.name + '!' + " How you feeling?")
})

//part two tips
app.get('/tip/:total/:tipPercentage', (req,res) =>{
    // let ans = total * tipPercentage%
    // console.log(ans)
    res.send("The total is $" + req.params.total + "," + " and the tip percentage is " + req.params.tipPercentage + "%. So you should tip " + "$" + req.params.total * (req.params.tipPercentage /100) )
})

//part three magic 8 ball
app.get('/magic/:phrase', (req,res) =>{
    res.send(req.params.phrase + ". Your fortune is " +  fortune )

})

//part four 
/*
- On the home page (`get "/"`), users should see:
  - "99 Bottles of beer on the wall"
  - a link that says "take one down, pass it around"
  - this should link to `/98`, where the number represents the number of bottles left.
- When a number is given in the url (`get "/:number_of_bottles"`), users should see:
  - The number of bottles of beer on the wall (i.e. `98 Bottles of beer on the wall.`)
  - a link to "take one down, pass it around", where the href is number of bottles in the parameter minus 1.
- If there are 0 bottles left, do not show a link to "take one down"
  - Add a link to start over, which directs the user back to the home page.
*/


app.get('/', (req,res) => {
    res.send("<h1>99 Bottles of beer on the wall.</h1> <body> <a href = /98>take one down, pass it around</a></body>")
})


app.get('/:num_of_bottles', (req,res) => {
    res.send("<h1>" + req.params.num_of_bottles + " Bottles of beer on the wall.</h1>" + "<body><a href = " + countdown(req.params.num_of_bottles) +  ">take one down, pass it around</a>   <br> <br> <a href = /99 >Count again</a> </body> ")
})

app.get('/0', (req,res) => {
    res.send("<h1>0 Bottles of beer on the wall.</h1>")
})