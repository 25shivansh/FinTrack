import arcjet from "@arcjet/next";
const aj=arcjet({
    key:process.env.ARCJET.KEY,
    charactersticts:["userId"],//Track based on clerk userId
    rules:[
        tokenBuckert({
            mode:"LIVE",
            refillRate:10,
            interval:3600,
            capacity:2,
        })
    ]
})
export default aj;