const IRISNative = require('./intersystems-iris-native');

const IRIS_HOST = process.env.IRIS_HOST || '127.0.0.1';
const IRIS_PORT = process.env.IRIS_PORT || 1972;
const IRIS_NS = process.env.IRIS_NS || 'USER';
const IRIS_USER = process.env.IRIS_USER || '_SYSTEM';
const IRIS_PWD = process.env.IRIS_PWD || 'SYS';

let connectionInfo = {
    host: IRIS_HOST,
    port: IRIS_PORT,
    ns: IRIS_NS,
    user: IRIS_USER,
    pwd: IRIS_PWD
};

const conn = IRISNative.createConnection(connectionInfo);
const native = conn.createIris();

const App = function () {
    this.insert = function (type, event, data) {
        let val = native.classMethodValue('questy.storage.item', 'Insert', type, event, JSON.stringify(data));
        console.log('insert: ', type, event, data, val);
    };

    this.findOne = function (id) {
        let val = native.classMethodValue('questy.storage.item', 'Find', id);
        console.log('find: ', val);
    };
}

module.exports = new App;
