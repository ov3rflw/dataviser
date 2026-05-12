"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name2 in all)
    __defProp(target, name2, { get: all[name2], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  PrismaMariaDb: () => PrismaMariaDbAdapterFactory
});
module.exports = __toCommonJS(index_exports);

// src/mariadb.ts
var import_driver_adapter_utils2 = require("@prisma/driver-adapter-utils");
var mariadb = __toESM(require("mariadb"));

// package.json
var name = "@prisma/adapter-mariadb";

// src/conversion.ts
var import_driver_adapter_utils = require("@prisma/driver-adapter-utils");
var UNSIGNED_FLAG = 1 << 5;
var BINARY_COLLATION_INDEX = 63;
function mapColumnType(field) {
  switch (field.type) {
    case "TINY" /* TINY */:
    case "SHORT" /* SHORT */:
    case "INT24" /* INT24 */:
    case "YEAR" /* YEAR */:
      return import_driver_adapter_utils.ColumnTypeEnum.Int32;
    case "INT" /* INT */:
      if (field.flags.valueOf() & UNSIGNED_FLAG) {
        return import_driver_adapter_utils.ColumnTypeEnum.Int64;
      } else {
        return import_driver_adapter_utils.ColumnTypeEnum.Int32;
      }
    case "LONG" /* LONG */:
    case "BIGINT" /* BIGINT */:
      return import_driver_adapter_utils.ColumnTypeEnum.Int64;
    case "FLOAT" /* FLOAT */:
      return import_driver_adapter_utils.ColumnTypeEnum.Float;
    case "DOUBLE" /* DOUBLE */:
      return import_driver_adapter_utils.ColumnTypeEnum.Double;
    case "TIMESTAMP" /* TIMESTAMP */:
    case "TIMESTAMP2" /* TIMESTAMP2 */:
    case "DATETIME" /* DATETIME */:
    case "DATETIME2" /* DATETIME2 */:
      return import_driver_adapter_utils.ColumnTypeEnum.DateTime;
    case "DATE" /* DATE */:
    case "NEWDATE" /* NEWDATE */:
      return import_driver_adapter_utils.ColumnTypeEnum.Date;
    case "TIME" /* TIME */:
      return import_driver_adapter_utils.ColumnTypeEnum.Time;
    case "DECIMAL" /* DECIMAL */:
    case "NEWDECIMAL" /* NEWDECIMAL */:
      return import_driver_adapter_utils.ColumnTypeEnum.Numeric;
    case "VARCHAR" /* VARCHAR */:
    case "VAR_STRING" /* VAR_STRING */:
    case "STRING" /* STRING */:
    case "BLOB" /* BLOB */:
    case "TINY_BLOB" /* TINY_BLOB */:
    case "MEDIUM_BLOB" /* MEDIUM_BLOB */:
    case "LONG_BLOB" /* LONG_BLOB */:
      if (field["dataTypeFormat"] === "json") {
        return import_driver_adapter_utils.ColumnTypeEnum.Json;
      } else if (field.collation.index === BINARY_COLLATION_INDEX) {
        return import_driver_adapter_utils.ColumnTypeEnum.Bytes;
      } else {
        return import_driver_adapter_utils.ColumnTypeEnum.Text;
      }
    case "ENUM" /* ENUM */:
      return import_driver_adapter_utils.ColumnTypeEnum.Enum;
    case "JSON" /* JSON */:
      return import_driver_adapter_utils.ColumnTypeEnum.Json;
    case "BIT" /* BIT */:
    case "GEOMETRY" /* GEOMETRY */:
      return import_driver_adapter_utils.ColumnTypeEnum.Bytes;
    case "NULL" /* NULL */:
      return import_driver_adapter_utils.ColumnTypeEnum.Int32;
    default:
      throw new Error(`Unsupported column type: ${field.type}`);
  }
}
function mapArg(arg, argType) {
  if (arg === null) {
    return null;
  }
  if (typeof arg === "string" && argType.scalarType === "bigint") {
    return BigInt(arg);
  }
  if (typeof arg === "string" && argType.scalarType === "datetime") {
    arg = new Date(arg);
  }
  if (arg instanceof Date) {
    switch (argType.dbType) {
      case "TIME" /* TIME */:
      case "TIME2" /* TIME2 */:
        return formatTime(arg);
      case "DATE" /* DATE */:
      case "NEWDATE" /* NEWDATE */:
        return formatDate(arg);
      default:
        return formatDateTime(arg);
    }
  }
  if (typeof arg === "string" && argType.scalarType === "bytes") {
    return Buffer.from(arg, "base64");
  }
  if (ArrayBuffer.isView(arg)) {
    return Buffer.from(arg.buffer, arg.byteOffset, arg.byteLength);
  }
  return arg;
}
function mapRow(row, fields) {
  const values = Array.isArray(row) ? row : Object.values(row);
  return values.map((value, i) => {
    const type = fields?.[i]?.type;
    if (value === null) {
      return null;
    }
    switch (type) {
      case "TIMESTAMP" /* TIMESTAMP */:
      case "TIMESTAMP2" /* TIMESTAMP2 */:
      case "DATETIME" /* DATETIME */:
      case "DATETIME2" /* DATETIME2 */:
        return (/* @__PURE__ */ new Date(`${value}Z`)).toISOString().replace(/(\.000)?Z$/, "+00:00");
    }
    if (typeof value === "bigint") {
      return value.toString();
    }
    return value;
  });
}
var typeCast = (field, next) => {
  if (field.type === "GEOMETRY" /* GEOMETRY */) {
    return field.buffer();
  }
  return next();
};
function formatDateTime(date) {
  const pad = (n, z = 2) => String(n).padStart(z, "0");
  const ms = date.getUTCMilliseconds();
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + " " + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}
function formatDate(date) {
  const pad = (n, z = 2) => String(n).padStart(z, "0");
  return pad(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate());
}
function formatTime(date) {
  const pad = (n, z = 2) => String(n).padStart(z, "0");
  const ms = date.getUTCMilliseconds();
  return pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + (ms ? "." + String(ms).padStart(3, "0") : "");
}

// src/errors.ts
function convertDriverError(error) {
  if (isDriverError(error)) {
    return {
      originalCode: error.errno.toString(),
      originalMessage: error.sqlMessage ?? "N/A",
      ...mapDriverError(error)
    };
  }
  throw error;
}
function mapDriverError(error) {
  switch (error.errno) {
    case 1062: {
      const index = error.sqlMessage?.split(" ").pop()?.split("'").at(1)?.split(".").pop();
      return {
        kind: "UniqueConstraintViolation",
        constraint: index !== void 0 ? { index } : void 0
      };
    }
    case 1451:
    case 1452: {
      const field = error.sqlMessage?.split(" ").at(17)?.split("`").at(1);
      return {
        kind: "ForeignKeyConstraintViolation",
        constraint: field !== void 0 ? { fields: [field] } : void 0
      };
    }
    case 1263: {
      const index = error.sqlMessage?.split(" ").pop()?.split("'").at(1);
      return {
        kind: "NullConstraintViolation",
        constraint: index !== void 0 ? { index } : void 0
      };
    }
    case 1264:
      return {
        kind: "ValueOutOfRange",
        cause: error.sqlMessage ?? "N/A"
      };
    case 1364:
    case 1048: {
      const field = error.sqlMessage?.split(" ").at(1)?.split("'").at(1);
      return {
        kind: "NullConstraintViolation",
        constraint: field !== void 0 ? { fields: [field] } : void 0
      };
    }
    case 1049: {
      const db = error.sqlMessage?.split(" ").pop()?.split("'").at(1);
      return {
        kind: "DatabaseDoesNotExist",
        db
      };
    }
    case 1007: {
      const db = error.sqlMessage?.split(" ").at(3)?.split("'").at(1);
      return {
        kind: "DatabaseAlreadyExists",
        db
      };
    }
    case 1044: {
      const db = error.sqlMessage?.split(" ").pop()?.split("'").at(1);
      return {
        kind: "DatabaseAccessDenied",
        db
      };
    }
    case 1045: {
      const user = error.sqlMessage?.split(" ").at(4)?.split("@").at(0)?.split("'").at(1);
      return {
        kind: "AuthenticationFailed",
        user
      };
    }
    case 1146: {
      const table = error.sqlMessage?.split(" ").at(1)?.split("'").at(1)?.split(".").pop();
      return {
        kind: "TableDoesNotExist",
        table
      };
    }
    case 1054: {
      const column = error.sqlMessage?.split(" ").at(2)?.split("'").at(1);
      return {
        kind: "ColumnNotFound",
        column
      };
    }
    case 1406: {
      const column = error.sqlMessage?.split(" ").flatMap((part) => part.split("'")).at(6);
      return {
        kind: "LengthMismatch",
        column
      };
    }
    case 1191:
      return {
        kind: "MissingFullTextSearchIndex"
      };
    case 1213:
      return {
        kind: "TransactionWriteConflict"
      };
    case 1040:
    case 1203:
      return {
        kind: "TooManyConnections",
        cause: error.sqlMessage ?? "N/A"
      };
    default:
      return {
        kind: "mysql",
        code: error.errno,
        message: error.sqlMessage ?? "N/A",
        state: error.sqlState ?? "N/A",
        cause: error.cause?.message ?? void 0
      };
  }
}
function isDriverError(error) {
  return typeof error.errno === "number" && (typeof error.sqlMessage === "string" || error.sqlMessage === null) && (typeof error.sqlState === "string" || error.sqlState === null);
}

// src/mariadb.ts
var debug = (0, import_driver_adapter_utils2.Debug)("prisma:driver-adapter:mariadb");
var MariaDbQueryable = class {
  constructor(client, mariadbOptions) {
    this.client = client;
    this.mariadbOptions = mariadbOptions;
  }
  provider = "mysql";
  adapterName = name;
  async queryRaw(query) {
    const tag = "[js::query_raw]";
    debug(`${tag} %O`, query);
    const result = await this.performIO(query);
    return {
      columnNames: result.meta?.map((field) => field.name()) ?? [],
      columnTypes: result.meta?.map(mapColumnType) ?? [],
      rows: Array.isArray(result) ? result.map((row) => mapRow(row, result.meta)) : [],
      lastInsertId: result.insertId?.toString()
    };
  }
  async executeRaw(query) {
    const tag = "[js::execute_raw]";
    debug(`${tag} %O`, query);
    return (await this.performIO(query)).affectedRows ?? 0;
  }
  async performIO(query) {
    const { sql, args } = query;
    try {
      const req = {
        sql,
        rowsAsArray: true,
        dateStrings: true,
        // Disable automatic conversion of JSON blobs to objects.
        autoJsonMap: false,
        // Return JSON strings as strings, not objects.
        // Available in the driver, but not provided in the typings.
        jsonStrings: true,
        // Disable automatic conversion of BIT(1) to boolean.
        // Available in the driver, but not provided in the typings.
        bitOneIsBoolean: false,
        typeCast
      };
      const values = args.map((arg, i) => mapArg(arg, query.argTypes[i]));
      const execute = this.mariadbOptions?.useTextProtocol ? this.client.query.bind(this.client) : this.client.execute.bind(this.client);
      return await execute(req, values);
    } catch (e) {
      const error = e;
      this.onError(error);
    }
  }
  onError(error) {
    debug("Error in performIO: %O", error);
    throw new import_driver_adapter_utils2.DriverAdapterError(convertDriverError(error));
  }
};
var MariaDbTransaction = class extends MariaDbQueryable {
  constructor(conn, mariadbOptions, options, cleanup) {
    super(conn, mariadbOptions);
    this.conn = conn;
    this.options = options;
    this.cleanup = cleanup;
  }
  async commit() {
    debug(`[js::commit]`);
    try {
      await this.client.query({ sql: "COMMIT" });
    } catch (err) {
      this.onError(err);
    } finally {
      this.cleanup?.();
      await this.client.end();
    }
  }
  async rollback() {
    debug(`[js::rollback]`);
    try {
      await this.client.query({ sql: "ROLLBACK" });
    } catch (err) {
      this.onError(err);
    } finally {
      this.cleanup?.();
      await this.client.end();
    }
  }
  async createSavepoint(name2) {
    await this.client.query({ sql: `SAVEPOINT ${name2}` }).catch(this.onError.bind(this));
  }
  async rollbackToSavepoint(name2) {
    await this.client.query({ sql: `ROLLBACK TO ${name2}` }).catch(this.onError.bind(this));
  }
  async releaseSavepoint(name2) {
    await this.client.query({ sql: `RELEASE SAVEPOINT ${name2}` }).catch(this.onError.bind(this));
  }
};
var PrismaMariaDbAdapter = class extends MariaDbQueryable {
  constructor(client, capabilities, mariadbOptions) {
    super(client, mariadbOptions);
    this.capabilities = capabilities;
    this.mariadbOptions = mariadbOptions;
  }
  executeScript(_script) {
    throw new Error("Not implemented yet");
  }
  getConnectionInfo() {
    return {
      schemaName: this.mariadbOptions?.database,
      supportsRelationJoins: this.capabilities.supportsRelationJoins
    };
  }
  async startTransaction(isolationLevel) {
    const options = {
      usePhantomQuery: true
    };
    const tag = "[js::startTransaction]";
    debug("%s options: %O", tag, options);
    const conn = await this.client.getConnection().catch((error) => this.onError(error));
    const onError = (err) => {
      debug(`Error from connection: ${err.message} %O`, err);
      this.mariadbOptions?.onConnectionError?.(err);
    };
    conn.on("error", onError);
    const cleanup = () => {
      conn.removeListener("error", onError);
    };
    try {
      const tx = new MariaDbTransaction(conn, this.mariadbOptions, options, cleanup);
      if (isolationLevel) {
        await tx.executeRaw({
          sql: `SET TRANSACTION ISOLATION LEVEL ${isolationLevel}`,
          args: [],
          argTypes: []
        });
      }
      await tx.conn.query({ sql: "BEGIN" }).catch(this.onError.bind(this));
      return tx;
    } catch (error) {
      await conn.end();
      cleanup();
      this.onError(error);
    }
  }
  async dispose() {
    await this.client.end();
  }
  underlyingDriver() {
    return this.client;
  }
};
var PrismaMariaDbAdapterFactory = class {
  provider = "mysql";
  adapterName = name;
  #capabilities;
  #config;
  #options;
  constructor(config, options) {
    if (typeof config === "string") {
      try {
        const url = new URL(config);
        if (!url.searchParams.has("prepareCacheLength")) {
          url.searchParams.set("prepareCacheLength", "0");
        }
        this.#config = rewriteConnectionString(url).toString();
      } catch (error) {
        debug("Error parsing connection string: %O", error);
        this.#config = config;
      }
    } else {
      if (config.prepareCacheLength === void 0) {
        this.#config = { ...config, prepareCacheLength: 0 };
      } else {
        this.#config = config;
      }
    }
    this.#options = options;
  }
  async connect() {
    let pool;
    try {
      pool = mariadb.createPool(this.#config);
    } catch (error) {
      if (error instanceof Error && error.message.startsWith("error parsing connection string")) {
        throw new Error(
          "error parsing connection string, format must be 'mariadb://[<user>[:<password>]@]<host>[:<port>]/[<db>[?<opt1>=<value1>[&<opt2>=<value2>]]]'"
        );
      }
      throw error;
    }
    if (this.#capabilities === void 0) {
      this.#capabilities = await getCapabilities(pool);
    }
    return new PrismaMariaDbAdapter(pool, this.#capabilities, this.#options);
  }
};
async function getCapabilities(pool) {
  const tag = "[js::getCapabilities]";
  try {
    const rows = await pool.query({
      sql: `SELECT VERSION()`,
      rowsAsArray: true
    });
    const version = rows[0][0];
    debug(`${tag} MySQL version: %s from %o`, version, rows);
    const capabilities = inferCapabilities(version);
    debug(`${tag} Inferred capabilities: %O`, capabilities);
    return capabilities;
  } catch (e) {
    debug(`${tag} Error while checking capabilities: %O`, e);
    return { supportsRelationJoins: false };
  }
}
function inferCapabilities(version) {
  if (typeof version !== "string") {
    return { supportsRelationJoins: false };
  }
  const [versionStr, suffix] = version.split("-");
  const [major, minor, patch] = versionStr.split(".").map((n) => parseInt(n, 10));
  const isMariaDB = suffix?.toLowerCase()?.includes("mariadb") ?? false;
  const supportsRelationJoins = !isMariaDB && (major > 8 || major === 8 && (minor > 0 || minor === 0 && patch >= 13));
  return { supportsRelationJoins };
}
function rewriteConnectionString(url) {
  if (url.protocol === "mysql:") {
    url.protocol = "mariadb:";
  }
  return url;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PrismaMariaDb
});
