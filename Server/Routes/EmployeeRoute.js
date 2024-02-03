import express from 'express';
import con from '../Utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
const router = express.Router();

router.post('/employeelogin', (req, res) => {
    const sql = "SELECT * FROM employee WHERE email = ?";
    con.query(sql, [req.body.email], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password, (err, response) => {
                if (err) return res.json({ loginStatus: false, Error: "Wrong Password" })
                if (response) {
                    const email = result[0].email;
                    const token = jwt.sign(
                        { role: "admin", email: email },
                        "jwt_secret_key",
                        { expiresIn: "1d" }
                    );
                    res.cookie('token', token)
                    return res.json({ loginStatus: true });
                }
            })

        }
        else {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});


export { router as EmployeeRouter }