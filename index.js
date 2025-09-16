const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");
const methodOverride = require("method-override");

app.use(methodOverride("_method"))
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

main().then(()=> {
    console.log("connection successful ");
}).catch((err)=> {
    console.log("it is db error : ",err)
})

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/whatsapp`);
}

// let chat1 = new Chat( {
//     from: "neha",
//     to: "priya",
//     msg: "send me your exam sheets",
//     created_at: new Date(),
// })
// chat1.save().then((res)=>{
//     console.log(res)
// }).catch((err)=> {
//     console.log(err);
// })

app.get("/", (req, res)=> {
    res.send("server are work");
})

//// Index rout 
app.get("/chats", async (req, res)=> {
    const chats =await Chat.find();
    // console.log(chats);
    // res.send("success");
    res.render("index.ejs", {chats});
})
//// new chats
app.get("/chats/new", (req, res)=> {
    res.render("new.ejs");
})

//// new post router
app.post("/chats", (req, res)=> {
    let {from, msg, to} = req.body;
    let newChat = new Chat({
        from: from,
        msg: msg,
        to: to,
        created_at: new Date(),
    })
    newChat.save()
    .then((res)=> {
        console.log("chat is save");
    }).catch((err)=> {
        console.log(err)
    })
    res.redirect("/chats")
})

///// edit route
app.get("/chats/:id/edit", async(req, res)=> {
    let { id } = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs", {chat});
})
app.put("/chats/:id", async(req, res)=> {
    let {id} = req.params;
    let {msg: newmessage} = req.body;
    console.log(newmessage)
    let updatedChat = await Chat.findByIdAndUpdate(id, {msg: newmessage}, {runValidators: true , new: true});
    // console.log(updatedChat);
    res.redirect("/chats")
    
})
//////// detroy route
app.delete("/chats/:id", async (req, res)=> {
    let {id} = req.params;
    let deletechat = await Chat.findByIdAndDelete(id);
    console.log(deletechat);
    res.redirect("/chats?deleted=true");
})
app.listen(8080, ()=> {
    console.log("server is listening on port: 8080")
})