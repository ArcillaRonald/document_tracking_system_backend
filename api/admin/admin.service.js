const db = require('../../database/connection');

module.exports = { 
    createAdminQuery: (data, callback) => {
        const {name, email, username, password, isAdmin} = data;
        const sql = 'insert into users(name, email, username, password, isAdmin) values(?, ?, ?, ?, ?)';

        db.query(
            sql,
            [
                name,
                email,
                username,
                password,
                isAdmin
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    createUserQuery: (data, callback) => {
        const {name, email, department_id, username, password} = data;
        const sql = 'insert into users(name, email, department_id, username, password) values(?, ?, ?, ?, ?)';

        db.query(
            sql,
            [
                name,
                email,
                department_id,
                username,
                password,
            ],
            (err, result) => {
                if(err) {
                    return callback(err);
                }
                return callback(null, result);
            }
        );
    },
    getUsersQuery: (callback) => {
        const sql = 'select user_id, name, email, username, college_name, department_name, created_at\
                    from users\
                    join departments on users.department_id = departments.department_id\
                    join colleges on departments.college_id = colleges.college_id\
                    where users.isAdmin = ?\
                    order by created_at desc';

        db.query(sql, false, (err, result) => {
            if(err) {
                return callback(err);
            }

            return callback(null, result); 
        });
    }
}