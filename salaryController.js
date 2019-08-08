var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
module.exports = function (con, app) {

    app.get('/salary', function (req, res) {
        con.query('select * from salary', function (err, result) {
            if (err) {
                res.status(404).json({ 'fail': 'Not found error' })
            }
            else
                res.status(200).json([{ 'success': 'data retrive success' }, { 'data': result }])
        })
    })

    app.post('/salary', urlencodedParser, function (req, res) {
        let sql = `INSERT INTO salary (emp_id, month, year, amount, generated_date) VALUES ( ?,?,?,?,? )`;
        let salary = req.body;
        con.query(sql, [salary.emp_id, salary.month, salary.year, salary.amount, salary.generated_date], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': 'record inserted with id ' + result.insertId }, { 'id': result.insertId }])
        })
    })

    app.put('/salary/:id', urlencodedParser, function (req, res) {
        let sql = `UPDATE salary SET emp_id = ?, month = ?, year = ?, amount = ?, generated_date = ? WHERE sal_id = ?`;
        let salary = req.body;
        con.query(sql, [salary.emp_id, salary.month, salary.year, salary.amount, salary.generated_date, req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': ' total ' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })

    app.delete('/salary/:id', function (req, res) {
        let sql = `DELETE FROM salary WHERE sal_id = ? `;
        con.query(sql, [req.params.id], function (err, result) {
            if (err) {
                res.status(400).json({ 'fail': 'invalid data error' })
            }
            else
                res.status(200).json([{ 'success': ' total ' + result.affectedRows + ' row(s) affected' }, { 'id': req.params.id }])
        })
    })
}