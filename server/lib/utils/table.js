'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _db = require('../config/db');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Table = function () {
    function Table(tableName) {
        _classCallCheck(this, Table);

        if (!tableName) {
            throw new TypeError('You must pass a MySQL table name into the Table object constructor.');
        }
        this.tableName = tableName;
    }

    _createClass(Table, [{
        key: 'getOne',
        value: function getOne(id) {
            var sql = 'SELECT * FROM ' + this.tableName + ' WHERE id = ' + id + ';';
            return (0, _db.executeQuery)(sql, [id]).then(function (results) {
                return results[0];
            });
        }
    }, {
        key: 'getAll',
        value: function getAll() {
            var sql = 'SELECT * FROM ' + this.tableName;
            return (0, _db.executeQuery)(sql);
        }
    }, {
        key: 'find',
        value: function find(query) {
            var columns = Object.keys(query);
            var values = Object.values(query);
            var conditions = columns.map(function (columnName) {
                return columnName + ' LIKE ?';
            });
            var sql = 'SELECT * FROM ' + this.tableName + ' WHERE ' + conditions.join(' AND ') + ';';
            return (0, _db.executeQuery)(sql, values);
        }
    }, {
        key: 'insert',
        value: function insert(row) {
            var columns = Object.keys(row);
            var values = Object.values(row);
            var placeholderString = (0, _db.generatePlaceholders)(values);
            var sql = 'INSERT INTO ' + this.tableName + ' (' + columns.join(',') + ') VALUES (' + placeholderString + ');';
            return (0, _db.executeQuery)(sql, values).then(function (results) {
                return { id: results.insertId };
            });
        }
    }, {
        key: 'update',
        value: function update(id, row) {
            var columns = Object.keys(row);
            var values = Object.values(row);
            var updates = columns.map(function (columnName) {
                return columnName + ' = ?';
            });
            var sql = 'UPDATE ' + this.tableName + ' SET ' + updates.join(',') + ' WHERE id = ' + id + ';';
            return (0, _db.executeQuery)(sql, values);
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            var sql = 'DELETE FROM ' + this.tableName + ' WHERE id = ' + id;
            return (0, _db.executeQuery)(sql);
        }
    }]);

    return Table;
}();

exports.default = Table;