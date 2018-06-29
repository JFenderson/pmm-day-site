'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.generatePlaceholders = exports.executeQuery = exports.empty = exports.rows = exports.row = undefined;

var _mysql = require('mysql');

var _mysql2 = _interopRequireDefault(_mysql);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pool = _mysql2.default.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'JFenderson',
    password: 'M@rqueal1012',
    database: 'pmm_day'
});

function executeQuery(sql) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return getConnection().then(function (connection) {
        return new Promise(function (resolve, reject) {
            connection.query(sql, args, function (err, result) {
                connection.release();
                if (err) {
                    reject(err);
                } else {
                    resolve(result);
                }
            });
        });
    });
}

function callProcedure(procedureName) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var placeholders = generatePlaceholders(args);
    var callString = 'CALL ' + procedureName + '(' + placeholders + ');'; // CALL GetChirps();, or CALL InsertChirp(?,?,?);
    return executeQuery(callString, args);
}

function rows(procedureName) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return callProcedure(procedureName, args).then(function (resultsets) {
        return resultsets[0];
    });
}

function row(procedureName) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return callProcedure(procedureName, args).then(function (resultsets) {
        return resultsets[0][0];
    });
}

function empty(procedureName) {
    var args = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return callProcedure(procedureName, args).then(function () {
        return;
    });
}

function generatePlaceholders() {
    var args = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    var placeholders = '';
    if (args.length > 0) {
        for (var i = 0; i < args.length; i++) {
            if (i === args.length - 1) {
                // if we are on the last argument in the array
                placeholders += '?';
            } else {
                placeholders += '?,';
            }
        }
    }
    return placeholders;
}

function getConnection() {
    return new Promise(function (resolve, reject) {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            } else {
                resolve(connection);
                console.log('mysql connected!');
            }
        });
    });
}

exports.row = row;
exports.rows = rows;
exports.empty = empty;
exports.executeQuery = executeQuery;
exports.generatePlaceholders = generatePlaceholders;