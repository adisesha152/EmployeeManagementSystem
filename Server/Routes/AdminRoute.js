import express from 'express'
import con from '../Utils/db.js'
import jwt from 'jsonwebtoken'
const router = express.Router()
import bcrypt from 'bcrypt'


router.post('/adminlogin', (req, res) => {
    const sql = "SELECT * FROM admin WHERE email = ? AND password = ?";
    con.query(sql, [req.body.email, req.body.password], (err, result) => {
        if (err) return res.json({ loginStatus: false, Error: "Query Error" });
        if (result.length > 0) {
            const email = result[0].email;
            const token = jwt.sign(
                { role: "admin", email: email, id : result[0].id },
                "jwt_secret_key",
                { expiresIn: "1d" }
            );
            res.cookie('token',token)
            return res.json({ loginStatus: true });
        }
        else
        {
            return res.json({ loginStatus: false, Error: "Wrong Email or Password" });
        }
    });
});

router.get('/category', (req,res) => {
    const sql = "SELECT * FROM category"
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
         return res.json({Status: true, Result: result})
    })
})

router.post('/add_category', (req, res) => {
    const sql = "INSERT INTO category (name) VALUES (?)"
    con.query(sql, [req.body.category], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
         return res.json({Status: true})
    })
})

router.get('/employee', (req, res) => {
    const sql = "SELECT employee.id, employee.name, employee.email, employee.address, employee.salary, category.name AS category FROM employee JOIN category ON employee.category_id = category.id";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.post('/add_employee', (req, res) => {
    const sql = "INSERT INTO employee (name, email, password, salary, address, category_id) VALUES (?, ?, ?, ?, ?, ?)";
    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if(err) return res.json({Status: false, Error: "Hashing Error"})
        const values=[
            req.body.name,
            req.body.email,
            hash,
            req.body.salary,
            req.body.address,
            req.body.category_id
        ];
        con.query(sql, values, (err, result) => {
            if(err)
            {
                return res.json({Status: false, Error: "Query Error"});
            }
            return res.json({Status: true})
        });
    });
});

router.get('/employee/:id', (req, res) => {
    const id = req.params.id;
    const sql="SELECT * FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.put('/edit_employee/:id', (req, res) => {
    const id=req.params.id;
    const sql="UPDATE employee SET name = ?, email = ?, salary = ?, address = ?, category_id = ? WHERE id = ?";
    const values=[
        req.body.name,
        req.body.email,
        req.body.salary,
        req.body.address,
        req.body.category_id
    ];
    con.query(sql, [...values, id], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.delete('/delete_employee/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM employee WHERE id = ?";
    con.query(sql, [id], (err, result) => {
        if(err) return res.json({Status: false, Error:"Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/profile', (req, res) => {
    const email = req.body.email;
    const sql = "SELECT email FROM admin WHERE email = ?";
    con.query(sql, [email], (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_count', (req, res) => {
    const sql = "SELECT COUNT(id) AS admin FROM admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/employee_count', (req, res) => {
    const sql="SELECT COUNT(id) AS employee FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/salary_sum', (req, res) => {
    const sql="SELECT SUM(salary) AS salary FROM employee";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/admin_records', (req, res) => {
    const sql = "SELECT * FROM admin";
    con.query(sql, (err, result) => {
        if(err) return res.json({Status: false, Error: "Query Error"})
        return res.json({Status: true, Result: result})
    })
})

router.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({Status: true})
})


export { router as adminRouter }