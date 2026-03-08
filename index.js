const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// Signup Page
app.get("/signup", (req, res) => {
    res.render("signup", { msg: null });
});

// Signup form submit
app.post("/signup", (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.render("signup", { msg: "All fields are required" });
    } else {
        res.send("Signup Successful");
    }
});

//Login Page

app.get("/login", (req, res) => {
    res.render("login", { msg: null });
});

// Login form submit
app.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.render("login", { msg: "All fields required" });
    } else {
        res.redirect("/dashboard")
    }
});

// Dashboard
app.get("/dashboard", (req, res) => {
    res.render("dashboard");
});


//Forgot Password
app.get("/forgot", (req, res) => {
    res.render("forgot");
});

//Forgot form submit
app.post("/forgot", (req, res) => {

    const email = req.body.email;

    if (!email) {
        return res.send("Email required");
    }

    console.log("Reset requested for:", email);

    res.redirect("/reset");

});

//Reset Password
app.get("/reset", (req, res) => {
    res.render("reset", { msg: null });
});

//Reset form submit
app.post("/reset", (req, res) => {

    const { password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.render("reset", { msg: "Passwords do not match" });
    }

    res.send("Password Reset Successful");

});


// Logout 
app.get("/logout", (req, res) => {
    res.redirect("/login");
});
app.listen(4000, () => {
    console.log("Server  is running on port 4000");
});