import type { ConnectionInfo } from '@prisma/driver-adapter-utils';
import type { IsolationLevel } from '@prisma/driver-adapter-utils';
import * as mariadb from 'mariadb';
import type { SqlDriverAdapter } from '@prisma/driver-adapter-utils';
import type { SqlDriverAdapterFactory } from '@prisma/driver-adapter-utils';
import type { SqlQuery } from '@prisma/driver-adapter-utils';
import type { SqlQueryable } from '@prisma/driver-adapter-utils';
import type { SqlResultSet } from '@prisma/driver-adapter-utils';
import type { Transaction } from '@prisma/driver-adapter-utils';

declare type ArrayModeResult = unknown[][] & {
    meta?: mariadb.FieldInfo[];
    affectedRows?: number;
    insertId?: BigInt;
};

declare type Capabilities = {
    supportsRelationJoins: boolean;
};

declare class MariaDbQueryable<Connection extends mariadb.Pool | mariadb.Connection> implements SqlQueryable {
    protected readonly client: Connection;
    protected readonly mariadbOptions?: {
        useTextProtocol?: boolean | undefined;
    } | undefined;
    readonly provider = "mysql";
    readonly adapterName: string;
    constructor(client: Connection, mariadbOptions?: {
        useTextProtocol?: boolean | undefined;
    } | undefined);
    queryRaw(query: SqlQuery): Promise<SqlResultSet>;
    executeRaw(query: SqlQuery): Promise<number>;
    protected performIO(query: SqlQuery): Promise<ArrayModeResult>;
    protected onError(error: unknown): never;
}

export declare class PrismaMariaDb implements SqlDriverAdapterFactory {
    #private;
    readonly provider = "mysql";
    readonly adapterName: string;
    constructor(config: mariadb.PoolConfig | string, options?: PrismaMariadbOptions);
    connect(): Promise<PrismaMariaDbAdapter>;
}

declare class PrismaMariaDbAdapter extends MariaDbQueryable<mariadb.Pool> implements SqlDriverAdapter {
    private readonly capabilities;
    protected readonly mariadbOptions?: PrismaMariadbOptions | undefined;
    constructor(client: mariadb.Pool, capabilities: Capabilities, mariadbOptions?: PrismaMariadbOptions | undefined);
    executeScript(_script: string): Promise<void>;
    getConnectionInfo(): ConnectionInfo;
    startTransaction(isolationLevel?: IsolationLevel): Promise<Transaction>;
    dispose(): Promise<void>;
    underlyingDriver(): mariadb.Pool;
}

declare type PrismaMariadbOptions = {
    /** The name of the database to use in generated queries */
    database?: string;
    /** Use the driver's text protocol (`query`) instead of the binary protocol (`execute`). */
    useTextProtocol?: boolean;
    /** Callback attached to transaction connection `error` events. */
    onConnectionError?: (err: mariadb.SqlError) => void;
};

export { }
