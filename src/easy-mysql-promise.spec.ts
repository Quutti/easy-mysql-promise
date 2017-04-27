
import { expect } from 'chai';
import * as sinon from 'sinon';
import { IPoolConfig, IMySql, IPool } from 'mysql';

import { MysqlConnection } from './easy-mysql-promise';

const mysqlPoolMock: IPool = {
    config: null,
    end: null,
    on: null,
    getConnection(): any { },
    query(): any { }
}

const mysqlMock: IMySql = {
    createConnection(): any { },
    createPool(): any { return mysqlPoolMock; },
    createPoolCluster(): any { },
    escape(): any { },
    format(): any { }
};

describe("Package: easy-mysql-promise", () => {

    describe("Class: MysqlConnection", () => {

        let mysqlConn, settings;

        beforeEach(() => {
            settings = {
                host: 'localhost',
                port: 5555,
                connectionLimit: 5,
                user: '',
                password: '',
                database: ''
            };
        });

        describe("Constructing", () => {

            it("should call mysql :s createPool method with settings ", () => {
                let spy = sinon.spy(mysqlMock, 'createPool');
                let mysqlConn = new MysqlConnection(settings, mysqlMock);

                expect(spy.calledWith(settings)).to.be.true;

                spy.restore();
            })

            it("should default host, port and connectionLimit", () => {
                settings.host = undefined;
                settings.port = undefined;
                settings.connectionLimit = undefined;

                let spy = sinon.spy(mysqlMock, 'createPool');
                let mysqlConn = new MysqlConnection(settings, mysqlMock);

                expect(spy.args[0][0].host).to.eq('localhost');
                expect(spy.args[0][0].port).to.eq(3306);
                expect(spy.args[0][0].connectionLimit).to.be.greaterThan(0);

                spy.restore();
            });

        });

    });

});