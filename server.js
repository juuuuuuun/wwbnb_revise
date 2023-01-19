var express = require("express");
var bodyParser = require('body-parser');
var app = express();
var nodemailer = require("nodemailer");

const hbs = require("express-handlebars");

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'jsong89.seneca@gmail.com',
        pass: '~Sjh01jh29'
    }
});

var PORT = process.env.PORT || 8080;

app.engine('hbs', hbs({
    extname: '.hbs',
    helpers: {
        isEqual: function(a, b, options) {
            if(a != b) {
                return options.inverse(this);
            } else {
                return options.fn(this);
            }
        },
        json: function(obj) {
            return JSON.stringify(obj);
        }
    }
}));
app.set('view engine', '.hbs');

function onHttpStart() {
    console.log("Express http server listing on: " + PORT);
}

app.use(express.static("views"));
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//-------------------------------------------------------

let username = '';

app.get("/", function (req, res) {
    // res.sendFile(path.join(__dirname, "views/index.html"));
    res.render('index', {layout: false});
});

app.get("/aboutUs", function (req, res) {
    // res.sendFile(path.join(__dirname, "views/aboutUs.html"));
    res.render('aboutUs', {layout: false});
});

//setup http server to listen open the port designated above
// app.get("/about", function (req, res) {
//     res.sendFile(path.join(__dirname, "views/about.html"));
// });

app.get("/room", function (req, res) {
    // res.sendFile(path.join(__dirname, "views/room.html"));
    res.render('room', {layout: false});
});

app.get("/roomDetail/:id", function (req, res) {
    const { id } = req.params;
    // res.sendFile(path.join(__dirname, `views/roomDetail${id}.html`));
    res.render(`roomDetail${id}`, {layout: false});
});

app.get("/login", (req, res) => {
    res.redirect("/");
})

app.get("/dashboard", (req, res) => {
    res.render('dashboard', {layout: false, message: 'success', username});
})

app.post("/login", (req, res) => {
    const FORM_DATA =req.body;
    
    let isError = false;
    const messages = {}
    for(const key in FORM_DATA) {
        if(FORM_DATA[key].length === 0) {
            messages[key] = "Invalid"
            isError = true;
        }
    }

    if(isError) {
        return res.render('index', {layout: false, message: 'login-failure', messages});
    }

    username = FORM_DATA.email;
    res.redirect('/dashboard')//, {layout: false, message: 'success', username: `${FORM_DATA.email}`});

});

app.post("/", (req, res) => {
    const FORM_DATA =req.body;
    
    let isError = false;
    const messages = {}
    for(const key in FORM_DATA) {
        if(FORM_DATA[key].length === 0) {
            messages[key] = "Invalid"
            isError = true;
        }
    }

    const emailReg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!emailReg.test(FORM_DATA["email"])) {
        messages["email"] = "Email form error";
        isError = true;
    }

    const pwdReg = /^[A-Z]+\w+\d*\w*/
    if(FORM_DATA["password"].length < 6 || !pwdReg.test(FORM_DATA["password"])) {
        messages["password"] = "Follow like Abc123xxxx";
        isError = true;
    }

    if(isError) {
        return res.render('index', {layout: false, message: 'failure', messages});

    }

    username = `${FORM_DATA.fName} ${FORM_DATA.lName}`;

    var mailOptions = {
        from: 'jsong89.seneca@gmail.com',
        to: FORM_DATA.email, 
        subject: 'Welcome to register WWBnB!',
        html: '<p>Hello ' + username + ":</p><p>Thank-you for registration.<p/>" + `<a href="https://jsong89.herokuapp.com/dashboard/">Click</a>`

    }
    
    transporter.sendMail(mailOptions, (error,info) =>{
        if (error){
            console.log("ERROR: " + error);
        }else {
            console.log("SUCCESS: " + info.response);
        }
    });

    
    // res.render('dashboard', {layout: false, message: 'success', username: });
    res.redirect('/dashboard');
});

app.listen(PORT, onHttpStart);