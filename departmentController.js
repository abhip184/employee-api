var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function (con, app) {
    app.get('/department', function (req, res) {
        con.query('select * from department', function (err, result) {
            if (err) {
                res.status(404).json({ 'fail': 'Not found error' })
                throw err;
            }
            else
                res.status(200).json([{ 'success': 'data retrive success' }, { 'data': result }])
        })
    })

    app.get('/department/:id', function (req, res) {
        con.query('select * from department where dept_id = ?',[req.params.id], function (err, result) {
            if (err) {
                res.status(404).json({ 'fail': 'Not found error' })
                throw err;
            }
            else
            {
                if(result.length != 0)
                {
                res.status(200).json([{ 'success': 'data retrive success' }, { 'data': result }])
                }
                else
                {
                    res.status(404).json({ 'fail': 'Not found error' })
                }
            }
        })
    })

    app.post('/department', urlencodedParser, function (req, res) {
        let sql = `INSERT INTO department (dept_name, dept_date_cr) VALUES ( ?,? )`;
        let department = req.body;
        con.query(sql, [department.dept_name, department.dept_date_cr], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
                throw err;
            }
            else
                res.status(200).json([{ 'success': 'record inserted with id ' + result.insertId }, { 'id': result.insertId }])
        })
    })

    app.put('/department/:id', urlencodedParser, function (req, res) {
        let sql = `UPDATE department SET dept_name = ?, dept_date_cr = ? WHERE dept_id = ?`;
        let department = req.body;
        con.query(sql, [department.dept_name, department.dept_date_cr, req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
                throw err;
            }
            else
                res.status(200).json([{ 'success': ' total' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })

    app.delete('/department/:id', function (req, res) {
        let sql = `DELETE FROM department WHERE dept_id = ? `;
        con.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
                throw err;
            }
            else
                res.status(200).json([{ 'success': ' total ' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })
}