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
const posts = [ 
    // {
    //     username: "Brian",
    //     body: "Hello world",
    //     created_at: ""
    // }, 
    // {
    //     username: "Misha",
    //     body: "Bonjour monde",
    //     created_at: ""
    // },
    // {
    //     username: "Rick",
    //     body: "Hola Mundo",
    //     created_at: ""
    // }
];

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
        let newUser = {
            username: req.body.username,
            password: hashedPassword
        }
        userList.push(newUser);
        res.send("success");
    } catch {
        res.status(500).send();
    }

});

app.get("/users", (req, res) => {
    res.json(userList);
});

app.get("/users/:username", (req, res) => {
    let username = req.params.username;
    for ( let i = 0; i < userList.length; i ++){
        if (username === userList[i].username){
            return res.json(userList[i].post);
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

app.get("/posts/:username", (req, res) => {
    let username = req.params.username;
    for (let i = 0; i < posts.length; i ++) {
        if (username === posts[i].username){
            return res.send(posts);
        }
    }
    return res.json(false);
});

app.post("/posts", (req, res) => {
    let newPost = {
        username: req.body.username,
        body: req.body.body,
        created_at: req.body.created_at
    };
    posts.push(newPost);  
});

app.delete("/posts/:postIndex", (req, res) => {
    let toDelete = req.params.postIndex;
    posts.splice(toDelete, 1);
    res.send(posts);
})

app.listen(PORT, () => {
    console.log("App is listening on PORT: " + PORT);
})