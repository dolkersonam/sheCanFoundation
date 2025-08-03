const User = require("../models/user");

async function getAllUsers(req,res){
    const allUsers = await User.find({});
    const html = `
        <ul>
            ${allUsers
                .map((user) => `<li>${user.fullname} - ${user.email}</li>`)
                .join("")
            }
        </ul>
    `;
    res.send(html);
}

async function getUserById(req, res) {
    try {
        const user = await User.findById(req.params.id); 
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.json(user); 
    } catch (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}


async function createUser(req,res){
    const body = res.body;
    if(
        !body ||
        !fullname ||
        !email
    ) res.json({msg : "all fields are required"});
    
    const result = await User.create({
        fullname : body.fullname,
        email : body.email,
        id : body.id,
        donationRaised : body.donationRaised
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
}