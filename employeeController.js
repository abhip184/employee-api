var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function (con, app) {

    app.get('/employee', function (req, res) {
        con.query('select * from employee', function (err, result) {
            if (err) {
                res.status(404).json({ 'fail': 'Not found error' })
            }
            else
                res.status(200).json([{ 'success': 'data retrive success' }, { 'data': result }])
        })
    })

    app.post('/employee', urlencodedParser, function (req, res) {
        let sql = `INSERT INTO employee (emp_name, emp_no, dept_id, join_date, end_date) VALUES ( ?,?,?,?,? )`;
        let employee = req.body;
        con.query(sql, [employee.emp_name, employee.emp_no, employee.dept_id, employee.join_date, employee.end_date], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': 'record inserted with id ' + result.insertId }, { 'id': result.insertId }])
        })
    })

    app.put('/employee/:id', urlencodedParser, function (req, res) {
        let sql = `UPDATE employee SET emp_name = ?, emp_no = ?, dept_id = ?, join_date = ?, end_date = ? WHERE emp_id = ?`;
        let employee = req.body;
        con.query(sql, [employee.emp_name, employee.emp_no, employee.dept_id, employee.join_date, employee.end_date, req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': ' total ' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })

    app.delete('/employee/:id', function (req, res) {
        let sql = `DELETE FROM employee WHERE emp_id = ? `;
        con.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': ' total ' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })

}