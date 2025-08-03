const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {getAllUsers, getUserById, createUser} = require("../controllers/user")

router.get("/" , getAllUsers)
router.post("/" , createUser)



router.get("/signin" , (req,res)=>{
    return res.render("signin");
})
router.get("/signup" , (req,res)=>{
    return res.render("signup");
})


router.post('/signup', async (req, res) => {
    try {
        const { fullname, email, password } = req.body;
        const count = await User.countDocuments();
        const newId = (count + 1).toString(); 

        const newUser = await User.create({
            fullname,
            email,
            password,
            id: newId,
            referenceId: fullname+"2025",
            donationRaised : 0
        });

        console.log("User created:", newUser);
        return res.redirect('/');
    } catch (error) {
        console.error("Signup error:", error.message);
        return res.send(`
            <script>
                alert("Invalid email or password");
                window.location.href = "/";
            </script>
        `);
    }
});
router.post("/signin", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            console.log(password + " " + email)
            return res.send(`
                <script>
                    alert("Invalid email or password");
                    window.location.href = "/";
                </script>
            `);
        }
        console.log("Login successful");
        return res.redirect("/"); 
    } catch (error) {
        console.error("Signin error:", error);
        return res.send(`
            <script>
                alert("Error Occured");
                window.location.href = "/";
            </script>
        `);
    }
});

router.get('/leaderboard', async (req, res) => {
    const leaderboard = [
        { name: 'Sonam', points: "12,000$" },
        { name: 'Anu', points: "10,000$" },
        { name: 'Tsewang', points: "8,000$" },
        { name: 'Nyima', points: "7,000$"},
        { name: 'Stanzin', points: "1,000$"}
    ];
    res.render('leaderboard', { leaderboard });
});


router.get("/:id" , getUserById)

module.exports = router;