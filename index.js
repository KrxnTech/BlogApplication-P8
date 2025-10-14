const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.listen(port, () => {
    console.log("APP IS LISTENING AT PORT", port);
});

let posts = [
    // POST 1 
    {
        id: uuidv4(), // ID : "1a2asd12as09d0910jd-90jshbasuhdbyg"
        username: "apnacollege",
        content: "I love coding",

    },
    // POST 2 
    {
        id: uuidv4(),
        username: "ChaiorCode",
        content: "Ek Chai Ho jaye !",

    },
    // POST 3 
    {
        id: uuidv4(),
        username: "BroCode",
        content: "Whtsp Every Body",

    }
]

let COMMENT = [
    { text: "This Post is Amazing 🔥" },
    { text: "I Love This Post ⭐" },
    { text: "Very Inspiring 💕" },
    { text: "No Bad 😌" }
];

// PAGE RENDER SERVER FORM 
app.get("/posts/comments", (req, res) => {
    res.render("Comment.ejs", { COMMENT });
});

// UPLOAD TO ARRAY 
app.post("/posts/comments", (req, res) => {
    let { CommentText } = req.body;
    console.log(CommentText) // ONLY STORING STRING 
    COMMENT.push({ text: CommentText });
    res.redirect("/posts/comments"); // CHAT GPT 
});

// PROFILE ROUTE 
app.get("/posts/profile/:username", (req, res) => {
    const { username } = req.params
    res.render("Profile.ejs", { username })
})


// CREATING FIRST API 1️⃣
app.get("/posts", (req, res) => {
    res.render("index.ejs", { posts })
})

// CREATING OUR SECOND API 2️⃣  CREATE ROUTE 
// SERVING A FORM 
app.get("/posts/new", (req, res) => {
    res.render("new.ejs")
})

// SENDING FORM DATA AS A NEW POST 
app.post("/posts", (req, res) => {
    let { username, content } = req.body
    let newId = uuidv4() // GEN NEW ID WILL NEW POST ALWAYS
    posts.push({ id: newId, username, content }) // PUSHING TO OBJECT 
    res.redirect("/posts"); // CHAT GPT 
})


// 3RD ROUTE CREATION 3️⃣
app.get("/posts/:id", (req, res) => {
    let { id } = req.params
    let post = posts.find((p) => id === p.id)
    res.render("show.ejs", { post })
})


// DELETE ROUTE 5️⃣
app.delete("/posts/:id",(req , res)=>{
    let {id} = req.params
    posts = posts.filter((p) => id !== p.id) // FILTERING AND REMOVING THE SELECTED ONE AND AFTER GIVE ME REMAINING ONES 
    // res.send("DELETE SUCCESS")
    res.redirect("/posts")
})


// EDIT ROUTE 🔴🔴🔴🔴🔴  
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;                         // 1️⃣ URL se id le lo
    let post = posts.find((p) => id === p.id);       // 2️⃣ post find karo

    if (!post) {                                     // 3️⃣ agar post nahi mila to
        return res.status(404).send("Post not found");
    }

    let NEWCONTENT = req.body.content;               // 4️⃣ content req body se lo
    if (!NEWCONTENT) {                               // 5️⃣ agar content nahi aaya to
        return res.status(400).send("Content missing");
    }

    post.content = NEWCONTENT;                       // 6️⃣ post update karo

    console.log(id);
    console.log(NEWCONTENT);
    console.log(post);

    res.send("PATCH REQUEST WORKING");               // 7️⃣ response bhejo
});


// SEND REPONSE UNIVERSAL ROUTING 
app.get("/", (req, res) => {
    res.send("Hello World!");
});
