// const sessionIdToUserMap = new Map();

// function setUser(id,user){
//     sessionIdToUserMap.set(id,user);
// }

// function getUser(id){
//     return sessionIdToUserMap.get(id);
// }

// module.exports = {
//     setUser,
//     getUser,
// }

// const jwt = require("jsonwebtoken");
// const secret = "Rajeev$123$";

// function setUser(user){
//     return jwt.sign({
//         _id : user._id,
//         email:user.email,
//     },secret);
// }

// function getUser(token){
//     console.log(token,"token here");
//     if(!token) return null;
//     return jwt.verify(token,secret);
// }

// module.exports = {
//     setUser,
//     getUser,
// }

const jwt = require("jsonwebtoken");
const secret = "Rajeev$123$";
function setUser(user) {
    return jwt.sign({
        _id: user._id,
        email: user.email,
    }, secret, { expiresIn: '1h' });
}

function getUser(token) {
    if (!token) return null;
    try {
        
        return jwt.verify(token, secret);
    } catch (err) {
        console.error('JWT verification failed:', err.message);
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
}
