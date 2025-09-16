const mongoose = require("mongoose");

const Chat = require("./models/chat.js");

async function main() {
    await mongoose.connect(`mongodb://127.0.0.1:27017/whatsapp`);
}


main().then(()=> {
    console.log("connection successful ");
}).catch((err)=> {
    console.log("it is db error : ",err)
})
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


let allChat = [
    {
        from: "neha",
        to: "priya",
        msg: "send me your exam sheets",
        created_at: new Date(),
    },
    {
        from: "priya",
        to: "neha",
        msg: "hii how are you",
        created_at: new Date(),
    },
    {
        from: "neha",
        to: "priya",
        msg: "i am fine",
        created_at: new Date(),
    },
    {
        from: "manish",
        to: "klam",
        msg: "hii tell me about",
        created_at: new Date(),
    },
    {
        from: "klam",
        to: "manish",
        msg: "i am klam",
        created_at: new Date(),
    },
    {
        from: "manish",
        to: "klam",
        msg: "i know you",
        created_at: new Date(),
    },
]

Chat.insertMany(allChat);