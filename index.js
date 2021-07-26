const express = require("express")
const session = require("express-session")
var app = express();
app.use(session({
    secret:"Some texts",
    resave: false,
    saveUninitialized: true
}))
const PORT = process.env.PORT || 3000

var uses = [
    {id:'1', name:"ogunrinade", password:"gbolahan", cartContent:[]},
    {id:'2', name:"sam", password:"father", cartContent:[]},
    {id:'3', name:"yemi", password:"Samson", cartContent:[]},
    {id:'4', name:"bode", password:"check", cartContent:[]},
]

var foodDatabase = [
    { foodId:'1', foodDetails:"Lorem Ipsum food 1", price:20, foodName:"Bologi",foodImage:"../../images/1.jpg",foodQty:1},
    { foodId:'2', foodDetails:"Lorem Ipsum food 1", price:10, foodName:"Spaghetti",foodImage:"../../images/2.jpg",foodQty:1 },
    { foodId:'3', foodDetails:"Lorem Ipsum food 1", price:10, foodName:"Spaghetti",foodImage:"../../images/2.jpg",foodQty:1 },
    { foodId:'4', foodDetails:"Lorem Ipsum food 1", price:12, foodName:"Beans Spag",foodImage:"../../images/3.jpg",foodQty:1 },
    { foodId:'5', foodDetails:"Lorem Ipsum food 1", price:45, foodName:"Ogbono",foodImage:"../../images/4.jpg",foodQty:1 },
    { foodId:'6', foodDetails:"Lorem Ipsum food 1", price:23, foodName:"Lafun",foodImage:"../../images/5.jpg",foodQty:1 },
    { foodId:'7', foodDetails:"Lorem Ipsum food 1", price:67, foodName:"Banga Soup",foodImage:"../../images/6.jpg",foodQty:1 },
    { foodId:'8', foodDetails:"Lorem Ipsum food 1", price:20, foodName:"Potatoe",foodImage:"../../images/2.jpg",foodQty:1 },
    { foodId:'9', foodDetails:"Lorem Ipsum food 1", price:12, foodName:"Fried Yam",foodImage:"../../images/3.jpg",foodQty:1 },
    { foodId:'10', foodDetails:"Lorem Ipsum food 1", price:25, foodName:"Gbegiri",foodImage:"../../images/1.jpg",foodQty:1 },
    { foodId:'11', foodDetails:"Lorem Ipsum food 1", price:40, foodName:"Maize rice",foodImage:"../../images/5.jpg",foodQty:1 }
]
var cartDatabase = [
    // { foodId:'1', price:20, foodName:"Bologi",foodImage:"../../images/1.jpg"},
    // { foodId:'2', price:10, foodName:"Spaghetti",foodImage:"../../images/2.jpg" },
    // { foodId:'3', price:10, foodName:"Spagewa",foodImage:"../../images/3.jpg" },
    // { foodId:'4', price:12, foodName:"Beans Spag",foodImage:"../../images/4.jpg" },
    // { foodId:'9', price:12, foodName:"Fried Yam",foodImage:"../../images/9.jpg" }
]
var lengthParent ;

// foodDatabase.forEach(food => {
//     console.log(food)
// });

app.set('view engine', 'ejs')
app.use(express.static('public'))

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}));
// app.use(express.bodyParser())
var msg = "";
var empt = ""

function routeProtect(req, res, next) {
    if(req.session.name){
        next()
    }else{
        res.redirect("/login")
    }
}

app.get("/",(req, res)=>{
    res.render('index.ejs',{length:lengthParent})
})

app.get("/login",(req, res)=>{
    res.render('login.ejs')
    // console.log(users)
    // msgs === ['hheheh'] ? console.log(true) : console.log("not true")
})
app.post("/login", (req, res)=>{
    var userinfo = req.body
   var ff = userinfo.Password.toLowerCase()
    // console.log(userinfo)
    // console.log(uses[3])
   var found = uses.find(c=> 
    c.name === userinfo.Email && c.password === ff)
    if(found){
        req.session.name = found.name
        res.redirect("/")
        // console.log(req.session.id)
        // console.log(req.session.name)
    }else{
        msgs = []
        msgs.push("No record found")
        // console.log(msgs)
    }
   

})
app.get("/logout", (req,res)=>{
    req.session.destroy()
    lengthParent = ""
    res.redirect("/")
})
app.get("/test", (req,res)=>{
    res.render("test.ejs")
})
app.get("/foods", (req, res) =>{
    res.render('foods.ejs', {data: foodDatabase, msg, length: lengthParent})
    // console.log(foodDatabase.length)
    // console.log(req.session.name)
})

app.post("/foods", (req, res) =>{
    // console.log(req.body)
})

app.get("/food/:id", (req, res) =>{
    var food = foodDatabase.find(c=> 
        c.foodId === req.params.id)
        if(food){
            console.log(food)
        }else{
           console.log("not found")
            // console.log(msgs)
        }
    res.render('details.ejs', {data: food, length: lengthParent})
})

app.get("/food/add/:id", (req, res) =>{
    var state = ""
   let newCartFood = foodDatabase.find(c=> 
    c.foodId === req.params.id )
    // console.log(cartDatabase.)
    cartDatabase.forEach(cartItem =>{
            state = cartItem.foodId
    })
    if(state === newCartFood.foodId){
        msg="inCart"
        setTimeout(() => {
            msg=""
        }, 2000);
        // console.log("hello")
        // console.log(cartDatabase)
    }else{
        if(req.session.name){
            let userSession = uses.find(user=> 
            req.session.name ===  user.name)
            userSession.cartContent.push(newCartFood)
            console.log(userSession.cartContent.length)
            lengthParent = 0 || userSession.cartContent.length
            res.redirect("/foods")
        }else if(!req.session.name){
           res.redirect("/login")
        }
    }

})
app.get("/register", (req, res) =>{
    res.render('Registration-page.ejs')
})
app.post("/register", (req, res) =>{
    res.render('Registration-page.ejs')
    console.log(req.body)
    var users = foodDatabase.find(c=> 
        c.foodId === req.params.id)
        if(food){
            console.log(food)
        }else{
           console.log("not found")
            // console.log(msgs)
        }
})
app.get("/cart", routeProtect, (req, res) =>{
    var total = 0;
   
    var users = uses.find(user=>
        (user.name === req.session.name)
    )
    users.cartContent.forEach(foodCart =>{
        total = total + foodCart.price;
    })

    res.render('cart.ejs',{data:uses, length: lengthParent, cartTotal:total, empty:empt, validate:users.cartContent.length})
})
app.get("/inc/:id", (req,res,next)=>{
    // console.log(req.params.id)
    var user = uses.find(user=> 
        req.params.id ===  user.id)
        user.cartContent[0].foodQty++
    console.log(user.cartContent[0])
    res.status(200).json({msg:"increased"})
})

app.get("/cart/delete/:id", (req,res)=>{
    var users = uses.find(user=>
        (user.name === req.session.name)
        )
        var food = users.cartContent.find(c=> 
            c.foodId === req.params.id)
            if(food){
                // console.log(food)
            }else{
                //    console.log("not found")            // console.log(msgs)
            }
            let new_array = users.cartContent.filter(function(value) {
                return value !== food ; });
                
    // console.log(new_array)
    lengthParent = lengthParent - 1
    users.cartContent.splice(0, Infinity, ...new_array)
    
    res.redirect("/cart")
})




app.listen(PORT, ()=>{
    console.log("listening to port 3000")
})
