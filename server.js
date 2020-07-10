const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const path = require("path");
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.use("/", express.static("assets"));

//========API DATA========//

const userList = [];
const posts = [];

//========HTML ROUTES=====//

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/post", (req, res) => {
    res.sendFile(path.join(__dirname, "post.html"));
});

//========API Routes======//

// //User Registration// //
app.post("/users", async (req, res) => {
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        console.log(hashedPassword + " with " + req.body.username);
        let newUser = {
            username: req.body.username,
            password: hashedPassword
        }
        userList.push(newUser);
        console.log(userList);
    } catch {
        res.status(500).send();
    }

});

app.get("/users", (req, res) => {
    res.json(userList);
});

app.get("/users/:username", (req, res) => {
    let username = req.params.username;
    console.log(username);
    for ( let i = 0; i < userList.length; i ++){
        if (username === userList[i].username){
            return res.json(userList[i].username);
        }
    }
    return res.json(false);
});

// //User Log In// //

app.post("/users/login", (req, res) => {
    let enteredUser = req.body.username;
    let enteredPassword = req.body.password;

    var user = userList.find(userList => userList.username === enteredUser);
    
    if (user == null ) {
        return res.send("0")
    }
    try{
        if (bcrypt.compareSync(enteredPassword, user.password)) {
            console.log(user.password);
            console.log(enteredUser);
            res.send("success");
        } else {
            res.send("0");
            res.status(500).send();
        }
    } catch{
        res.status(500).send();
    }
});

// //Posts// //

app.get("/posts", (req, res) => {
    return res.json(posts);
});

///////NOTE YOU LEFT OFF HERE/////
app.get("/posts/:username", (req, res) => {
    let username = req.params.username;
    for (let i = 0; i < posts.length; i ++) {
        if (username === posts[i].username){
            console.log(posts[i].username + ": " + posts[i].body);
            return res.send(posts);
        }
    }
    return res.json(posts);
});

//TRYING TO ONLY DISPLAY POSTS FROM A SPECIFIC USER//
//YOU STOPPED BECAUSE YOU CAN ONLY LOG IN ONCE BECAUSE OF THE HASH//

app.post("/posts", (req, res) => {
    let newPost = {
        username: req.body.username,
        body: req.body.body,
        created_at: req.body.created_at
    };
    posts.push(newPost);
    console.log(posts);  
});

app.listen(PORT, () => {
    console.log("App is listening on PORT: " + PORT);
})