const db = require('../../database/connection');

module.exports = {
    signInQuery: (username, callback) => {
        const adminLoginSql = 'select * from users where username = ?';
        const sql = 'select user_id, name, email, username, password, college_name, department_name, isAdmin, created_at\
                    from users\
                    join departments on users.department_id = departments.department_id\
                    join colleges on departments.college_id = colleges.college_id\
                    where username = ?';

        if(username === 'admin' || username === 'ADMIN') {
            db.query(adminLoginSql, username, (err, result) => {
                if(err) {   
                    return callback(err);
                }
                return callback(null, result[0]);
            });
        } else {      
            db.query(sql, username, (err, result) => {
                if(err) {   
                    return callback(err);
                }
                return callback(null, result[0]);
            });
        }
    }
}