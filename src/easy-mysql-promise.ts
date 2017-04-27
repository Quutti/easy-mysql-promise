
import * as MySQL from 'mysql';
import * as Promise from 'bluebird';

const ERROR_PREFIX = 'easy-mysql-promise: ';

let mysqlConnection: MysqlConnection = null;

/**
 * Creates query with passed string to database
 * @throws if mysqlConnection is not inited
 * @param query
 * @param params 
 * @returns Resolved promise with result, or rejected with error
 */
export const query = (query: string, params: any[]): Promise<any> => {
    if (!mysqlConnection) {
        throw ERROR_PREFIX + 'Connection must be inited. Call DB.init method with MysqlSettings object';
    }
    return mysqlConnection.query(query, params);
}

/**
 * Inits mysql connection with passed settings
 * @param settings
 */
export const init = (settings: MySQL.IPoolConfig) => {
    mysqlConnection = new MysqlConnection(settings);
}

/**
 * Class to create MysqlConnection pool via node-mysql package
 */
export class MysqlConnection {

    private pool: any = null;
    private inited: boolean = false;
    private mysql: MySQL.IMySql = null;

    constructor(settings: MySQL.IPoolConfig, mysql: MySQL.IMySql = MySQL) {
        let { connectionLimit, host, port, user, password, database } = settings;

        this.pool = mysql.createPool({
            connectionLimit: connectionLimit || 50,
            host: host || 'localhost',
            port: port || 3306,
            user: user || '',
            password: password || '',
            database: database || ''
        });
    }

    /**
     * Creates query with passed string to database
     * @param query
     * @param params 
     * @returns Resolved promise with result, or rejected with error
     */
    query(query: string, params: any[]): Promise<any> {
        return this.acquireConnection()
            .then(connection => {
                return new Promise((resolve, reject) => {
                    connection.query(query, params, (err, result) => {
                        connection.release();
                        err ? reject(err) : resolve(result);
                    });
                });
            });
    }


    /**
     * Acquires and returns connection
     * @returns Resolved promise with connection, or rejected with error
     */
    private acquireConnection(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.pool.getConnection((err, connection) => {
                err ? reject(err) : resolve(connection);
            });
        });
    }

}