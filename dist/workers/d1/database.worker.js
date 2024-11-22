var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
	for (
		var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target,
			i = decorators.length - 1,
			decorator;
		i >= 0;
		i--
	)
		(decorator = decorators[i]) &&
			(result = (kind ? decorator(target, key, result) : decorator(result)) || result);
	return kind && result && __defProp(target, key, result), result;
};

// src/workers/d1/database.worker.ts
import { get, HttpError, MiniflareDurableObject, POST, viewToBuffer } from "miniflare:shared";
import { z } from "miniflare:zod";
import assert from "node:assert";

// src/workers/d1/dumpSql.ts
function* dumpSql(db, options) {
	yield "PRAGMA defer_foreign_keys=TRUE;";
	let filterTables = new Set(options?.tables || []),
		{ noData, noSchema } = options || {},
		tables_cursor = db.prepare(`
    SELECT name, type, sql 
      FROM sqlite_schema AS o 
    WHERE (true) AND type=='table' 
      AND sql NOT NULL 
    ORDER BY tbl_name='sqlite_sequence', rowid;
  `)(),
		tables = Array.from(tables_cursor);
	for (let { name: table, sql } of tables) {
		if (filterTables.size > 0 && !filterTables.has(table)) continue;
		if (table === "sqlite_sequence") noSchema || (yield "DELETE FROM sqlite_sequence;");
		else if (table.match(/^sqlite_stat./)) noSchema || (yield "ANALYZE sqlite_schema;");
		else {
			if (sql.startsWith("CREATE VIRTUAL TABLE"))
				throw new Error(
					"D1 Export error: cannot export databases with Virtual Tables (fts5)",
				);
			if (table.startsWith("_cf_") || table.startsWith("sqlite_")) continue;
			sql.match(/CREATE TABLE ['"].*/)
				? noSchema || (yield `CREATE TABLE IF NOT EXISTS ${sql.substring(13)};`)
				: noSchema || (yield `${sql};`);
		}
		if (noData) continue;
		let columns_cursor = db.exec(`PRAGMA table_info="${table}"`),
			columns = Array.from(columns_cursor),
			select = `SELECT ${columns.map((c) => c.name).join(", ")}
                            FROM "${table}";`,
			rows_cursor = db.exec(select);
		for (let dataRow of rows_cursor.raw()) {
			let formattedCells = dataRow.map((cell, i) => {
				let colType = columns[i].type,
					cellType = typeof cell;
				return cell === null
					? "NULL"
					: colType === "INTEGER" || cellType === "number"
						? cell
						: colType === "TEXT" || cellType === "string"
							? outputQuotedEscapedString(cell)
							: cell instanceof ArrayBuffer
								? `X'${Array.prototype.map.call(new Uint8Array(cell), (b) => b.toString(16)).join("")}'`
								: (console.log({ colType, cellType, cell, column: columns[i] }),
									"ERROR");
			});
			yield `INSERT INTO ${sqliteQuote(table)} VALUES(${formattedCells.join(",")});`;
		}
	}
	if (!noSchema) {
		let rest_of_schema = db.exec(
			"SELECT name, sql FROM sqlite_schema AS o WHERE (true) AND sql NOT NULL AND type IN ('index', 'trigger', 'view') ORDER BY type COLLATE NOCASE /* DESC */;",
		);
		for (let { name, sql } of rest_of_schema)
			(filterTables.size > 0 && !filterTables.has(name)) || (yield `${sql};`);
	}
}
function outputQuotedEscapedString(cell) {
	let lfs = !1,
		crs = !1,
		quotesOrNewlinesRegexp = /'|(\n)|(\r)/g,
		escapeQuotesDetectingNewlines = (_, lf, cr) =>
			lf ? ((lfs = !0), "\\n") : cr ? ((crs = !0), "\\r") : "''",
		output_string = `'${cell.replace(quotesOrNewlinesRegexp, escapeQuotesDetectingNewlines)}'`;
	return (
		crs && (output_string = `replace(${output_string},'\\r',char(13))`),
		lfs && (output_string = `replace(${output_string},'\\n',char(10))`),
		output_string
	);
}
function sqliteQuote(token) {
	return token.length === 0 || // Doesn't start with alpha or underscore
		!token.match(/^[a-zA-Z_]/) ||
		token.match(/\W/) ||
		SQLITE_KEYWORDS.has(token.toUpperCase())
		? `"${token}"`
		: token;
}
var SQLITE_KEYWORDS = /* @__PURE__ */ new Set([
	"ABORT",
	"ACTION",
	"ADD",
	"AFTER",
	"ALL",
	"ALTER",
	"ALWAYS",
	"ANALYZE",
	"AND",
	"AS",
	"ASC",
	"ATTACH",
	"AUTOINCREMENT",
	"BEFORE",
	"BEGIN",
	"BETWEEN",
	"BY",
	"CASCADE",
	"CASE",
	"CAST",
	"CHECK",
	"COLLATE",
	"COLUMN",
	"COMMIT",
	"CONFLICT",
	"CONSTRAINT",
	"CREATE",
	"CROSS",
	"CURRENT",
	"CURRENT_DATE",
	"CURRENT_TIME",
	"CURRENT_TIMESTAMP",
	"DATABASE",
	"DEFAULT",
	"DEFERRED",
	"DEFERRABLE",
	"DELETE",
	"DESC",
	"DETACH",
	"DISTINCT",
	"DO",
	"DROP",
	"END",
	"EACH",
	"ELSE",
	"ESCAPE",
	"EXCEPT",
	"EXCLUSIVE",
	"EXCLUDE",
	"EXISTS",
	"EXPLAIN",
	"FAIL",
	"FILTER",
	"FIRST",
	"FOLLOWING",
	"FOR",
	"FOREIGN",
	"FROM",
	"FULL",
	"GENERATED",
	"GLOB",
	"GROUP",
	"GROUPS",
	"HAVING",
	"IF",
	"IGNORE",
	"IMMEDIATE",
	"IN",
	"INDEX",
	"INDEXED",
	"INITIALLY",
	"INNER",
	"INSERT",
	"INSTEAD",
	"INTERSECT",
	"INTO",
	"IS",
	"ISNULL",
	"JOIN",
	"KEY",
	"LAST",
	"LEFT",
	"LIKE",
	"LIMIT",
	"MATCH",
	"MATERIALIZED",
	"NATURAL",
	"NO",
	"NOT",
	"NOTHING",
	"NOTNULL",
	"NULL",
	"NULLS",
	"OF",
	"OFFSET",
	"ON",
	"OR",
	"ORDER",
	"OTHERS",
	"OUTER",
	"OVER",
	"PARTITION",
	"PLAN",
	"PRAGMA",
	"PRECEDING",
	"PRIMARY",
	"QUERY",
	"RAISE",
	"RANGE",
	"RECURSIVE",
	"REFERENCES",
	"REGEXP",
	"REINDEX",
	"RELEASE",
	"RENAME",
	"REPLACE",
	"RESTRICT",
	"RETURNING",
	"RIGHT",
	"ROLLBACK",
	"ROW",
	"ROWS",
	"SAVEPOINT",
	"SELECT",
	"SET",
	"TABLE",
	"TEMP",
	"TEMPORARY",
	"THEN",
	"TIES",
	"TO",
	"TRANSACTION",
	"TRIGGER",
	"UNBOUNDED",
	"UNION",
	"UNIQUE",
	"UPDATE",
	"USING",
	"VACUUM",
	"VALUES",
	"VIEW",
	"VIRTUAL",
	"WHEN",
	"WHERE",
	"WINDOW",
	"WITH",
	"WITHOUT",
]);

// src/workers/d1/database.worker.ts
var D1ValueSchema = z.union([z.number(), z.string(), z.null(), z.number().array()]),
	D1QuerySchema = z.object({
		sql: z.string(),
		params: z.array(D1ValueSchema).nullable().optional(),
	}),
	D1QueriesSchema = z.union([D1QuerySchema, z.array(D1QuerySchema)]),
	D1_EXPORT_PRAGMA = "PRAGMA miniflare_d1_export(?,?,?);",
	D1ResultsFormatSchema = z
		.enum(["ARRAY_OF_OBJECTS", "ROWS_AND_COLUMNS", "NONE"])
		.catch("ARRAY_OF_OBJECTS"),
	served_by = "miniflare.db",
	D1Error = class extends HttpError {
		constructor(cause) {
			super(500);
			this.cause = cause;
		}
		toResponse() {
			let response = {
				success: !1,
				error:
					typeof this.cause == "object" &&
					this.cause !== null &&
					"message" in this.cause &&
					typeof this.cause.message == "string"
						? this.cause.message
						: String(this.cause),
			};
			return Response.json(response);
		}
	};
function convertParams(params) {
	return (params ?? []).map((param) =>
		// If `param` is an array, assume it's a byte array
		Array.isArray(param) ? viewToBuffer(new Uint8Array(param)) : param,
	);
}
function convertRows(rows) {
	return rows.map((row) =>
		row.map((value) => {
			let normalised;
			return (
				value instanceof ArrayBuffer
					? (normalised = Array.from(new Uint8Array(value)))
					: (normalised = value),
				normalised
			);
		}),
	);
}
function rowsToObjects(columns, rows) {
	return rows.map((row) => Object.fromEntries(columns.map((name, i) => [name, row[i]])));
}
function sqlStmts(db) {
	return {
		getChanges: db.prepare(
			"SELECT total_changes() AS totalChanges, last_insert_rowid() AS lastRowId",
		),
	};
}
var D1DatabaseObject = class extends MiniflareDurableObject {
	#stmts;
	constructor(state, env) {
		super(state, env), (this.#stmts = sqlStmts(this.db));
	}
	#changes() {
		let changes = get(this.#stmts.getChanges());
		return assert(changes !== void 0), changes;
	}
	#query = (format, query) => {
		let beforeTime = performance.now(),
			beforeSize = this.state.storage.sql.databaseSize,
			beforeChanges = this.#changes(),
			params = convertParams(query.params ?? []),
			cursor = this.db.prepare(query.sql)(...params),
			columns = cursor.columnNames,
			rows = convertRows(Array.from(cursor.raw())),
			results;
		format === "ROWS_AND_COLUMNS"
			? (results = { columns, rows })
			: (results = rowsToObjects(columns, rows));
		let afterTime = performance.now(),
			afterSize = this.state.storage.sql.databaseSize,
			afterChanges = this.#changes(),
			duration = afterTime - beforeTime,
			changes = afterChanges.totalChanges - beforeChanges.totalChanges,
			hasChanges = changes !== 0,
			lastRowChanged = afterChanges.lastRowId !== beforeChanges.lastRowId,
			changed = hasChanges || lastRowChanged || afterSize !== beforeSize;
		return {
			success: !0,
			results,
			meta: {
				served_by,
				duration,
				changes,
				last_row_id: afterChanges.lastRowId,
				changed_db: changed,
				size_after: afterSize,
				rows_read: cursor.rowsRead,
				rows_written: cursor.rowsWritten,
			},
		};
	};
	#txn(queries, format) {
		if (
			((queries = queries.filter(
				(query) => query.sql.replace(/^\s+--.*/gm, "").trim().length > 0,
			)),
			queries.length === 0)
		) {
			let error = new Error("No SQL statements detected.");
			throw new D1Error(error);
		}
		try {
			return this.state.storage.transactionSync(() =>
				queries.map(this.#query.bind(this, format)),
			);
		} catch (e) {
			throw new D1Error(e);
		}
	}
	queryExecute = async (req) => {
		let queries = D1QueriesSchema.parse(await req.json());
		if ((Array.isArray(queries) || (queries = [queries]), this.#isExportPragma(queries)))
			return this.#doExportData(queries);
		let { searchParams } = new URL(req.url),
			resultsFormat = D1ResultsFormatSchema.parse(searchParams.get("resultsFormat"));
		return Response.json(this.#txn(queries, resultsFormat));
	};
	#isExportPragma(queries) {
		return (
			queries.length === 1 &&
			queries[0].sql === D1_EXPORT_PRAGMA &&
			(queries[0].params?.length || 0) >= 2
		);
	}
	#doExportData(queries) {
		let [noSchema, noData, ...tables] = queries[0].params,
			options = {
				noSchema: !!noSchema,
				noData: !!noData,
				tables,
			};
		return Response.json({
			success: !0,
			results: [Array.from(dumpSql(this.state.storage.sql, options))],
			meta: {},
		});
	}
};
__decorateClass([POST("/query"), POST("/execute")], D1DatabaseObject.prototype, "queryExecute", 2);
export { D1DatabaseObject, D1Error };
//# sourceMappingURL=database.worker.js.map
