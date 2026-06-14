const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// PostgreSQL Connection
// const pool = new Pool({
//     user: process.env.DB_USER,
//     host: process.env.DB_HOST,
//     database: process.env.DB_NAME,
//     password: process.env.DB_PASSWORD,
//     port: process.env.DB_PORT,
//     ssl: {
//         rejectUnauthorized: false
//     }
// });

console.log("DATABASE_URL exists:", !!process.env.DATABASE_URL);
console.log("DB_HOST:", process.env.DB_HOST);
console.log("DB_PORT:", process.env.DB_PORT);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Test Database Connection
pool.query("SELECT NOW()")
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.error("Database Connection Error:");
        console.error(error);
    });


// Home Route
app.get("/", (req, res) => {
    res.send("Backend Running" + process.env.DATABASE_URL + "DB"); 
});


// Get All Students
app.get("/students", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                s.student_id,
                s.student_name,
                s.course,
                l.username
            FROM public.student s
            JOIN public.login l
                ON s.login_id = l.login_id
            ORDER BY s.student_id
        `);

        res.json(result.rows);

    } catch (error) {

        console.error("Students Query Error:");
        console.error(error);

        res.status(500).json({
            error: error.message
        });

    }

});

app.get("/envtest", (req, res) => {
    res.send(process.env.DB_HOST); 
    });



// Login Check
app.post("/login", async (req, res) => {

    try {

        const { username, password } = req.body;

        console.log("Login Attempt:", username);

        const result = await pool.query(
            `
            SELECT *
            FROM public.login
            WHERE username = $1
            AND password = $2
            `,
            [username, password]
        );

        if (result.rows.length > 0) {

            res.json({
                success: true,
                message: "Login Success"
            });

        } else {

            res.status(401).json({
                success: false,
                message: "Invalid Login"
            });

        }

    } catch (error) {

        console.error("Login Error:");
        console.error(error);

        res.status(500).json({
            success: false,
            error: error.message
        });

    }

});


// Start Server
app.listen(process.env.PORT, () => {

    console.log(
        `Server Running on Port ${process.env.PORT}`
    );

});