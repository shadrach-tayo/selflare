// src/workers/shared/zod.worker.ts
import { Buffer } from "node-internal:internal_buffer";

// ../../node_modules/.pnpm/zod@3.22.3/node_modules/zod/lib/index.mjs
var util;
(function (util2) {
	util2.assertEqual = (val) => val;
	function assertIs(_arg) {}
	util2.assertIs = assertIs;
	function assertNever(_x) {
		throw new Error();
	}
	(util2.assertNever = assertNever),
		(util2.arrayToEnum = (items) => {
			let obj = {};
			for (let item of items) obj[item] = item;
			return obj;
		}),
		(util2.getValidEnumValues = (obj) => {
			let validKeys = util2.objectKeys(obj).filter((k) => typeof obj[obj[k]] != "number"),
				filtered = {};
			for (let k of validKeys) filtered[k] = obj[k];
			return util2.objectValues(filtered);
		}),
		(util2.objectValues = (obj) =>
			util2.objectKeys(obj).map(function (e) {
				return obj[e];
			})),
		(util2.objectKeys =
			typeof Object.keys == "function"
				? (obj) => Object.keys(obj)
				: (object) => {
						let keys = [];
						for (let key in object)
							Object.prototype.hasOwnProperty.call(object, key) && keys.push(key);
						return keys;
					}),
		(util2.find = (arr, checker) => {
			for (let item of arr) if (checker(item)) return item;
		}),
		(util2.isInteger =
			typeof Number.isInteger == "function"
				? (val) => Number.isInteger(val)
				: (val) => typeof val == "number" && isFinite(val) && Math.floor(val) === val);
	function joinValues(array, separator = " | ") {
		return array.map((val) => (typeof val == "string" ? `'${val}'` : val)).join(separator);
	}
	(util2.joinValues = joinValues),
		(util2.jsonStringifyReplacer = (_, value) =>
			typeof value == "bigint" ? value.toString() : value);
})(util || (util = {}));
var objectUtil;
(function (objectUtil2) {
	objectUtil2.mergeShapes = (first, second) => ({
		...first,
		...second,
		// second overwrites first
	});
})(objectUtil || (objectUtil = {}));
var ZodParsedType = util.arrayToEnum([
		"string",
		"nan",
		"number",
		"integer",
		"float",
		"boolean",
		"date",
		"bigint",
		"symbol",
		"function",
		"undefined",
		"null",
		"array",
		"object",
		"unknown",
		"promise",
		"void",
		"never",
		"map",
		"set",
	]),
	getParsedType = (data) => {
		switch (typeof data) {
			case "undefined":
				return ZodParsedType.undefined;
			case "string":
				return ZodParsedType.string;
			case "number":
				return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
			case "boolean":
				return ZodParsedType.boolean;
			case "function":
				return ZodParsedType.function;
			case "bigint":
				return ZodParsedType.bigint;
			case "symbol":
				return ZodParsedType.symbol;
			case "object":
				return Array.isArray(data)
					? ZodParsedType.array
					: data === null
						? ZodParsedType.null
						: data.then &&
							  typeof data.then == "function" &&
							  data.catch &&
							  typeof data.catch == "function"
							? ZodParsedType.promise
							: typeof Map < "u" && data instanceof Map
								? ZodParsedType.map
								: typeof Set < "u" && data instanceof Set
									? ZodParsedType.set
									: typeof Date < "u" && data instanceof Date
										? ZodParsedType.date
										: ZodParsedType.object;
			default:
				return ZodParsedType.unknown;
		}
	},
	ZodIssueCode = util.arrayToEnum([
		"invalid_type",
		"invalid_literal",
		"custom",
		"invalid_union",
		"invalid_union_discriminator",
		"invalid_enum_value",
		"unrecognized_keys",
		"invalid_arguments",
		"invalid_return_type",
		"invalid_date",
		"invalid_string",
		"too_small",
		"too_big",
		"invalid_intersection_types",
		"not_multiple_of",
		"not_finite",
	]),
	quotelessJson = (obj) => JSON.stringify(obj, null, 2).replace(/"([^"]+)":/g, "$1:"),
	ZodError = class extends Error {
		constructor(issues) {
			super(),
				(this.issues = []),
				(this.addIssue = (sub) => {
					this.issues = [...this.issues, sub];
				}),
				(this.addIssues = (subs = []) => {
					this.issues = [...this.issues, ...subs];
				});
			let actualProto = new.target.prototype;
			Object.setPrototypeOf
				? Object.setPrototypeOf(this, actualProto)
				: (this.__proto__ = actualProto),
				(this.name = "ZodError"),
				(this.issues = issues);
		}
		get errors() {
			return this.issues;
		}
		format(_mapper) {
			let mapper =
					_mapper ||
					function (issue) {
						return issue.message;
					},
				fieldErrors = { _errors: [] },
				processError = (error) => {
					for (let issue of error.issues)
						if (issue.code === "invalid_union") issue.unionErrors.map(processError);
						else if (issue.code === "invalid_return_type")
							processError(issue.returnTypeError);
						else if (issue.code === "invalid_arguments")
							processError(issue.argumentsError);
						else if (issue.path.length === 0) fieldErrors._errors.push(mapper(issue));
						else {
							let curr = fieldErrors,
								i = 0;
							for (; i < issue.path.length; ) {
								let el = issue.path[i];
								i === issue.path.length - 1
									? ((curr[el] = curr[el] || { _errors: [] }),
										curr[el]._errors.push(mapper(issue)))
									: (curr[el] = curr[el] || { _errors: [] }),
									(curr = curr[el]),
									i++;
							}
						}
				};
			return processError(this), fieldErrors;
		}
		toString() {
			return this.message;
		}
		get message() {
			return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
		}
		get isEmpty() {
			return this.issues.length === 0;
		}
		flatten(mapper = (issue) => issue.message) {
			let fieldErrors = {},
				formErrors = [];
			for (let sub of this.issues)
				sub.path.length > 0
					? ((fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || []),
						fieldErrors[sub.path[0]].push(mapper(sub)))
					: formErrors.push(mapper(sub));
			return { formErrors, fieldErrors };
		}
		get formErrors() {
			return this.flatten();
		}
	};
ZodError.create = (issues) => new ZodError(issues);
var errorMap = (issue, _ctx) => {
		let message;
		switch (issue.code) {
			case ZodIssueCode.invalid_type:
				issue.received === ZodParsedType.undefined
					? (message = "Required")
					: (message = `Expected ${issue.expected}, received ${issue.received}`);
				break;
			case ZodIssueCode.invalid_literal:
				message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
				break;
			case ZodIssueCode.unrecognized_keys:
				message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
				break;
			case ZodIssueCode.invalid_union:
				message = "Invalid input";
				break;
			case ZodIssueCode.invalid_union_discriminator:
				message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
				break;
			case ZodIssueCode.invalid_enum_value:
				message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
				break;
			case ZodIssueCode.invalid_arguments:
				message = "Invalid function arguments";
				break;
			case ZodIssueCode.invalid_return_type:
				message = "Invalid function return type";
				break;
			case ZodIssueCode.invalid_date:
				message = "Invalid date";
				break;
			case ZodIssueCode.invalid_string:
				typeof issue.validation == "object"
					? "includes" in issue.validation
						? ((message = `Invalid input: must include "${issue.validation.includes}"`),
							typeof issue.validation.position == "number" &&
								(message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`))
						: "startsWith" in issue.validation
							? (message = `Invalid input: must start with "${issue.validation.startsWith}"`)
							: "endsWith" in issue.validation
								? (message = `Invalid input: must end with "${issue.validation.endsWith}"`)
								: util.assertNever(issue.validation)
					: issue.validation !== "regex"
						? (message = `Invalid ${issue.validation}`)
						: (message = "Invalid");
				break;
			case ZodIssueCode.too_small:
				issue.type === "array"
					? (message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? "at least" : "more than"} ${issue.minimum} element(s)`)
					: issue.type === "string"
						? (message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? "at least" : "over"} ${issue.minimum} character(s)`)
						: issue.type === "number"
							? (message = `Number must be ${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}${issue.minimum}`)
							: issue.type === "date"
								? (message = `Date must be ${issue.exact ? "exactly equal to " : issue.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(issue.minimum))}`)
								: (message = "Invalid input");
				break;
			case ZodIssueCode.too_big:
				issue.type === "array"
					? (message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? "at most" : "less than"} ${issue.maximum} element(s)`)
					: issue.type === "string"
						? (message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? "at most" : "under"} ${issue.maximum} character(s)`)
						: issue.type === "number"
							? (message = `Number must be ${issue.exact ? "exactly" : issue.inclusive ? "less than or equal to" : "less than"} ${issue.maximum}`)
							: issue.type === "bigint"
								? (message = `BigInt must be ${issue.exact ? "exactly" : issue.inclusive ? "less than or equal to" : "less than"} ${issue.maximum}`)
								: issue.type === "date"
									? (message = `Date must be ${issue.exact ? "exactly" : issue.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(issue.maximum))}`)
									: (message = "Invalid input");
				break;
			case ZodIssueCode.custom:
				message = "Invalid input";
				break;
			case ZodIssueCode.invalid_intersection_types:
				message = "Intersection results could not be merged";
				break;
			case ZodIssueCode.not_multiple_of:
				message = `Number must be a multiple of ${issue.multipleOf}`;
				break;
			case ZodIssueCode.not_finite:
				message = "Number must be finite";
				break;
			default:
				(message = _ctx.defaultError), util.assertNever(issue);
		}
		return { message };
	},
	overrideErrorMap = errorMap;
function setErrorMap(map) {
	overrideErrorMap = map;
}
function getErrorMap() {
	return overrideErrorMap;
}
var makeIssue = (params) => {
		let { data, path, errorMaps, issueData } = params,
			fullPath = [...path, ...(issueData.path || [])],
			fullIssue = {
				...issueData,
				path: fullPath,
			},
			errorMessage = "",
			maps = errorMaps
				.filter((m) => !!m)
				.slice()
				.reverse();
		for (let map of maps)
			errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
		return {
			...issueData,
			path: fullPath,
			message: issueData.message || errorMessage,
		};
	},
	EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
	let issue = makeIssue({
		issueData,
		data: ctx.data,
		path: ctx.path,
		errorMaps: [
			ctx.common.contextualErrorMap,
			ctx.schemaErrorMap,
			getErrorMap(),
			errorMap,
			// then global default map
		].filter((x) => !!x),
	});
	ctx.common.issues.push(issue);
}
var ParseStatus = class {
		constructor() {
			this.value = "valid";
		}
		dirty() {
			this.value === "valid" && (this.value = "dirty");
		}
		abort() {
			this.value !== "aborted" && (this.value = "aborted");
		}
		static mergeArray(status, results) {
			let arrayValue = [];
			for (let s of results) {
				if (s.status === "aborted") return INVALID;
				s.status === "dirty" && status.dirty(), arrayValue.push(s.value);
			}
			return { status: status.value, value: arrayValue };
		}
		static async mergeObjectAsync(status, pairs) {
			let syncPairs = [];
			for (let pair of pairs)
				syncPairs.push({
					key: await pair.key,
					value: await pair.value,
				});
			return ParseStatus.mergeObjectSync(status, syncPairs);
		}
		static mergeObjectSync(status, pairs) {
			let finalObject = {};
			for (let pair of pairs) {
				let { key, value } = pair;
				if (key.status === "aborted" || value.status === "aborted") return INVALID;
				key.status === "dirty" && status.dirty(),
					value.status === "dirty" && status.dirty(),
					key.value !== "__proto__" &&
						(typeof value.value < "u" || pair.alwaysSet) &&
						(finalObject[key.value] = value.value);
			}
			return { status: status.value, value: finalObject };
		}
	},
	INVALID = Object.freeze({
		status: "aborted",
	}),
	DIRTY = (value) => ({ status: "dirty", value }),
	OK = (value) => ({ status: "valid", value }),
	isAborted = (x) => x.status === "aborted",
	isDirty = (x) => x.status === "dirty",
	isValid = (x) => x.status === "valid",
	isAsync = (x) => typeof Promise < "u" && x instanceof Promise,
	errorUtil;
(function (errorUtil2) {
	(errorUtil2.errToObj = (message) => (typeof message == "string" ? { message } : message || {})),
		(errorUtil2.toString = (message) =>
			typeof message == "string" ? message : message?.message);
})(errorUtil || (errorUtil = {}));
var ParseInputLazyPath = class {
		constructor(parent, value, path, key) {
			(this._cachedPath = []),
				(this.parent = parent),
				(this.data = value),
				(this._path = path),
				(this._key = key);
		}
		get path() {
			return (
				this._cachedPath.length ||
					(this._key instanceof Array
						? this._cachedPath.push(...this._path, ...this._key)
						: this._cachedPath.push(...this._path, this._key)),
				this._cachedPath
			);
		}
	},
	handleResult = (ctx, result) => {
		if (isValid(result)) return { success: !0, data: result.value };
		if (!ctx.common.issues.length) throw new Error("Validation failed but no issues detected.");
		return {
			success: !1,
			get error() {
				if (this._error) return this._error;
				let error = new ZodError(ctx.common.issues);
				return (this._error = error), this._error;
			},
		};
	};
function processCreateParams(params) {
	if (!params) return {};
	let { errorMap: errorMap2, invalid_type_error, required_error, description } = params;
	if (errorMap2 && (invalid_type_error || required_error))
		throw new Error(
			`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
		);
	return errorMap2
		? { errorMap: errorMap2, description }
		: {
				errorMap: (iss, ctx) =>
					iss.code !== "invalid_type"
						? { message: ctx.defaultError }
						: typeof ctx.data > "u"
							? { message: required_error ?? ctx.defaultError }
							: { message: invalid_type_error ?? ctx.defaultError },
				description,
			};
}
var ZodType = class {
		constructor(def) {
			(this.spa = this.safeParseAsync),
				(this._def = def),
				(this.parse = this.parse.bind(this)),
				(this.safeParse = this.safeParse.bind(this)),
				(this.parseAsync = this.parseAsync.bind(this)),
				(this.safeParseAsync = this.safeParseAsync.bind(this)),
				(this.spa = this.spa.bind(this)),
				(this.refine = this.refine.bind(this)),
				(this.refinement = this.refinement.bind(this)),
				(this.superRefine = this.superRefine.bind(this)),
				(this.optional = this.optional.bind(this)),
				(this.nullable = this.nullable.bind(this)),
				(this.nullish = this.nullish.bind(this)),
				(this.array = this.array.bind(this)),
				(this.promise = this.promise.bind(this)),
				(this.or = this.or.bind(this)),
				(this.and = this.and.bind(this)),
				(this.transform = this.transform.bind(this)),
				(this.brand = this.brand.bind(this)),
				(this.default = this.default.bind(this)),
				(this.catch = this.catch.bind(this)),
				(this.describe = this.describe.bind(this)),
				(this.pipe = this.pipe.bind(this)),
				(this.readonly = this.readonly.bind(this)),
				(this.isNullable = this.isNullable.bind(this)),
				(this.isOptional = this.isOptional.bind(this));
		}
		get description() {
			return this._def.description;
		}
		_getType(input) {
			return getParsedType(input.data);
		}
		_getOrReturnCtx(input, ctx) {
			return (
				ctx || {
					common: input.parent.common,
					data: input.data,
					parsedType: getParsedType(input.data),
					schemaErrorMap: this._def.errorMap,
					path: input.path,
					parent: input.parent,
				}
			);
		}
		_processInputParams(input) {
			return {
				status: new ParseStatus(),
				ctx: {
					common: input.parent.common,
					data: input.data,
					parsedType: getParsedType(input.data),
					schemaErrorMap: this._def.errorMap,
					path: input.path,
					parent: input.parent,
				},
			};
		}
		_parseSync(input) {
			let result = this._parse(input);
			if (isAsync(result)) throw new Error("Synchronous parse encountered promise.");
			return result;
		}
		_parseAsync(input) {
			let result = this._parse(input);
			return Promise.resolve(result);
		}
		parse(data, params) {
			let result = this.safeParse(data, params);
			if (result.success) return result.data;
			throw result.error;
		}
		safeParse(data, params) {
			var _a;
			let ctx = {
					common: {
						issues: [],
						async: (_a = params?.async) !== null && _a !== void 0 ? _a : !1,
						contextualErrorMap: params?.errorMap,
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data),
				},
				result = this._parseSync({ data, path: ctx.path, parent: ctx });
			return handleResult(ctx, result);
		}
		async parseAsync(data, params) {
			let result = await this.safeParseAsync(data, params);
			if (result.success) return result.data;
			throw result.error;
		}
		async safeParseAsync(data, params) {
			let ctx = {
					common: {
						issues: [],
						contextualErrorMap: params?.errorMap,
						async: !0,
					},
					path: params?.path || [],
					schemaErrorMap: this._def.errorMap,
					parent: null,
					data,
					parsedType: getParsedType(data),
				},
				maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx }),
				result = await (isAsync(maybeAsyncResult)
					? maybeAsyncResult
					: Promise.resolve(maybeAsyncResult));
			return handleResult(ctx, result);
		}
		refine(check, message) {
			let getIssueProperties = (val) =>
				typeof message == "string" || typeof message > "u"
					? { message }
					: typeof message == "function"
						? message(val)
						: message;
			return this._refinement((val, ctx) => {
				let result = check(val),
					setError = () =>
						ctx.addIssue({
							code: ZodIssueCode.custom,
							...getIssueProperties(val),
						});
				return typeof Promise < "u" && result instanceof Promise
					? result.then((data) => (data ? !0 : (setError(), !1)))
					: result
						? !0
						: (setError(), !1);
			});
		}
		refinement(check, refinementData) {
			return this._refinement((val, ctx) =>
				check(val)
					? !0
					: (ctx.addIssue(
							typeof refinementData == "function"
								? refinementData(val, ctx)
								: refinementData,
						),
						!1),
			);
		}
		_refinement(refinement) {
			return new ZodEffects({
				schema: this,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect: { type: "refinement", refinement },
			});
		}
		superRefine(refinement) {
			return this._refinement(refinement);
		}
		optional() {
			return ZodOptional.create(this, this._def);
		}
		nullable() {
			return ZodNullable.create(this, this._def);
		}
		nullish() {
			return this.nullable().optional();
		}
		array() {
			return ZodArray.create(this, this._def);
		}
		promise() {
			return ZodPromise.create(this, this._def);
		}
		or(option) {
			return ZodUnion.create([this, option], this._def);
		}
		and(incoming) {
			return ZodIntersection.create(this, incoming, this._def);
		}
		transform(transform) {
			return new ZodEffects({
				...processCreateParams(this._def),
				schema: this,
				typeName: ZodFirstPartyTypeKind.ZodEffects,
				effect: { type: "transform", transform },
			});
		}
		default(def) {
			let defaultValueFunc = typeof def == "function" ? def : () => def;
			return new ZodDefault({
				...processCreateParams(this._def),
				innerType: this,
				defaultValue: defaultValueFunc,
				typeName: ZodFirstPartyTypeKind.ZodDefault,
			});
		}
		brand() {
			return new ZodBranded({
				typeName: ZodFirstPartyTypeKind.ZodBranded,
				type: this,
				...processCreateParams(this._def),
			});
		}
		catch(def) {
			let catchValueFunc = typeof def == "function" ? def : () => def;
			return new ZodCatch({
				...processCreateParams(this._def),
				innerType: this,
				catchValue: catchValueFunc,
				typeName: ZodFirstPartyTypeKind.ZodCatch,
			});
		}
		describe(description) {
			let This = this.constructor;
			return new This({
				...this._def,
				description,
			});
		}
		pipe(target) {
			return ZodPipeline.create(this, target);
		}
		readonly() {
			return ZodReadonly.create(this);
		}
		isOptional() {
			return this.safeParse(void 0).success;
		}
		isNullable() {
			return this.safeParse(null).success;
		}
	},
	cuidRegex = /^c[^\s-]{8,}$/i,
	cuid2Regex = /^[a-z][a-z0-9]*$/,
	ulidRegex = /[0-9A-HJKMNP-TV-Z]{26}/,
	uuidRegex =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
	emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
	emojiRegex = /^(\p{Extended_Pictographic}|\p{Emoji_Component})+$/u,
	ipv4Regex =
		/^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
	ipv6Regex =
		/^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
	datetimeRegex = (args) =>
		args.precision
			? args.offset
				? new RegExp(
						`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`,
					)
				: new RegExp(
						`^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${args.precision}}Z$`,
					)
			: args.precision === 0
				? args.offset
					? new RegExp(
							"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$",
						)
					: new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
				: args.offset
					? new RegExp(
							"^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$",
						)
					: new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$");
function isValidIP(ip, version) {
	return !!(
		((version === "v4" || !version) && ipv4Regex.test(ip)) ||
		((version === "v6" || !version) && ipv6Regex.test(ip))
	);
}
var ZodString = class extends ZodType {
	constructor() {
		super(...arguments),
			(this._regex = (regex, validation, message) =>
				this.refinement((data) => regex.test(data), {
					validation,
					code: ZodIssueCode.invalid_string,
					...errorUtil.errToObj(message),
				})),
			(this.nonempty = (message) => this.min(1, errorUtil.errToObj(message))),
			(this.trim = () =>
				new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "trim" }],
				})),
			(this.toLowerCase = () =>
				new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toLowerCase" }],
				})),
			(this.toUpperCase = () =>
				new ZodString({
					...this._def,
					checks: [...this._def.checks, { kind: "toUpperCase" }],
				}));
	}
	_parse(input) {
		if (
			(this._def.coerce && (input.data = String(input.data)),
			this._getType(input) !== ZodParsedType.string)
		) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(
					ctx2,
					{
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.string,
						received: ctx2.parsedType,
					},
					//
				),
				INVALID
			);
		}
		let status = new ParseStatus(),
			ctx;
		for (let check of this._def.checks)
			if (check.kind === "min")
				input.data.length < check.value &&
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						minimum: check.value,
						type: "string",
						inclusive: !0,
						exact: !1,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "max")
				input.data.length > check.value &&
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_big,
						maximum: check.value,
						type: "string",
						inclusive: !0,
						exact: !1,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "length") {
				let tooBig = input.data.length > check.value,
					tooSmall = input.data.length < check.value;
				(tooBig || tooSmall) &&
					((ctx = this._getOrReturnCtx(input, ctx)),
					tooBig
						? addIssueToContext(ctx, {
								code: ZodIssueCode.too_big,
								maximum: check.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: check.message,
							})
						: tooSmall &&
							addIssueToContext(ctx, {
								code: ZodIssueCode.too_small,
								minimum: check.value,
								type: "string",
								inclusive: !0,
								exact: !0,
								message: check.message,
							}),
					status.dirty());
			} else if (check.kind === "email")
				emailRegex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "email",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "emoji")
				emojiRegex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "emoji",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "uuid")
				uuidRegex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "uuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "cuid")
				cuidRegex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "cuid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "cuid2")
				cuid2Regex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "cuid2",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "ulid")
				ulidRegex.test(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						validation: "ulid",
						code: ZodIssueCode.invalid_string,
						message: check.message,
					}),
					status.dirty());
			else if (check.kind === "url")
				try {
					new URL(input.data);
				} catch {
					(ctx = this._getOrReturnCtx(input, ctx)),
						addIssueToContext(ctx, {
							validation: "url",
							code: ZodIssueCode.invalid_string,
							message: check.message,
						}),
						status.dirty();
				}
			else
				check.kind === "regex"
					? ((check.regex.lastIndex = 0),
						check.regex.test(input.data) ||
							((ctx = this._getOrReturnCtx(input, ctx)),
							addIssueToContext(ctx, {
								validation: "regex",
								code: ZodIssueCode.invalid_string,
								message: check.message,
							}),
							status.dirty()))
					: check.kind === "trim"
						? (input.data = input.data.trim())
						: check.kind === "includes"
							? input.data.includes(check.value, check.position) ||
								((ctx = this._getOrReturnCtx(input, ctx)),
								addIssueToContext(ctx, {
									code: ZodIssueCode.invalid_string,
									validation: { includes: check.value, position: check.position },
									message: check.message,
								}),
								status.dirty())
							: check.kind === "toLowerCase"
								? (input.data = input.data.toLowerCase())
								: check.kind === "toUpperCase"
									? (input.data = input.data.toUpperCase())
									: check.kind === "startsWith"
										? input.data.startsWith(check.value) ||
											((ctx = this._getOrReturnCtx(input, ctx)),
											addIssueToContext(ctx, {
												code: ZodIssueCode.invalid_string,
												validation: { startsWith: check.value },
												message: check.message,
											}),
											status.dirty())
										: check.kind === "endsWith"
											? input.data.endsWith(check.value) ||
												((ctx = this._getOrReturnCtx(input, ctx)),
												addIssueToContext(ctx, {
													code: ZodIssueCode.invalid_string,
													validation: { endsWith: check.value },
													message: check.message,
												}),
												status.dirty())
											: check.kind === "datetime"
												? datetimeRegex(check).test(input.data) ||
													((ctx = this._getOrReturnCtx(input, ctx)),
													addIssueToContext(ctx, {
														code: ZodIssueCode.invalid_string,
														validation: "datetime",
														message: check.message,
													}),
													status.dirty())
												: check.kind === "ip"
													? isValidIP(input.data, check.version) ||
														((ctx = this._getOrReturnCtx(input, ctx)),
														addIssueToContext(ctx, {
															validation: "ip",
															code: ZodIssueCode.invalid_string,
															message: check.message,
														}),
														status.dirty())
													: util.assertNever(check);
		return { status: status.value, value: input.data };
	}
	_addCheck(check) {
		return new ZodString({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	email(message) {
		return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
	}
	url(message) {
		return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
	}
	emoji(message) {
		return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
	}
	uuid(message) {
		return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
	}
	cuid(message) {
		return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
	}
	cuid2(message) {
		return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
	}
	ulid(message) {
		return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
	}
	ip(options) {
		return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
	}
	datetime(options) {
		var _a;
		return typeof options == "string"
			? this._addCheck({
					kind: "datetime",
					precision: null,
					offset: !1,
					message: options,
				})
			: this._addCheck({
					kind: "datetime",
					precision: typeof options?.precision > "u" ? null : options?.precision,
					offset: (_a = options?.offset) !== null && _a !== void 0 ? _a : !1,
					...errorUtil.errToObj(options?.message),
				});
	}
	regex(regex, message) {
		return this._addCheck({
			kind: "regex",
			regex,
			...errorUtil.errToObj(message),
		});
	}
	includes(value, options) {
		return this._addCheck({
			kind: "includes",
			value,
			position: options?.position,
			...errorUtil.errToObj(options?.message),
		});
	}
	startsWith(value, message) {
		return this._addCheck({
			kind: "startsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	endsWith(value, message) {
		return this._addCheck({
			kind: "endsWith",
			value,
			...errorUtil.errToObj(message),
		});
	}
	min(minLength, message) {
		return this._addCheck({
			kind: "min",
			value: minLength,
			...errorUtil.errToObj(message),
		});
	}
	max(maxLength, message) {
		return this._addCheck({
			kind: "max",
			value: maxLength,
			...errorUtil.errToObj(message),
		});
	}
	length(len, message) {
		return this._addCheck({
			kind: "length",
			value: len,
			...errorUtil.errToObj(message),
		});
	}
	get isDatetime() {
		return !!this._def.checks.find((ch) => ch.kind === "datetime");
	}
	get isEmail() {
		return !!this._def.checks.find((ch) => ch.kind === "email");
	}
	get isURL() {
		return !!this._def.checks.find((ch) => ch.kind === "url");
	}
	get isEmoji() {
		return !!this._def.checks.find((ch) => ch.kind === "emoji");
	}
	get isUUID() {
		return !!this._def.checks.find((ch) => ch.kind === "uuid");
	}
	get isCUID() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid");
	}
	get isCUID2() {
		return !!this._def.checks.find((ch) => ch.kind === "cuid2");
	}
	get isULID() {
		return !!this._def.checks.find((ch) => ch.kind === "ulid");
	}
	get isIP() {
		return !!this._def.checks.find((ch) => ch.kind === "ip");
	}
	get minLength() {
		let min = null;
		for (let ch of this._def.checks)
			ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
		return min;
	}
	get maxLength() {
		let max = null;
		for (let ch of this._def.checks)
			ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
		return max;
	}
};
ZodString.create = (params) => {
	var _a;
	return new ZodString({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodString,
		coerce: (_a = params?.coerce) !== null && _a !== void 0 ? _a : !1,
		...processCreateParams(params),
	});
};
function floatSafeRemainder(val, step) {
	let valDecCount = (val.toString().split(".")[1] || "").length,
		stepDecCount = (step.toString().split(".")[1] || "").length,
		decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount,
		valInt = parseInt(val.toFixed(decCount).replace(".", "")),
		stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
	return (valInt % stepInt) / Math.pow(10, decCount);
}
var ZodNumber = class extends ZodType {
	constructor() {
		super(...arguments),
			(this.min = this.gte),
			(this.max = this.lte),
			(this.step = this.multipleOf);
	}
	_parse(input) {
		if (
			(this._def.coerce && (input.data = Number(input.data)),
			this._getType(input) !== ZodParsedType.number)
		) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx2, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.number,
					received: ctx2.parsedType,
				}),
				INVALID
			);
		}
		let ctx,
			status = new ParseStatus();
		for (let check of this._def.checks)
			check.kind === "int"
				? util.isInteger(input.data) ||
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: "integer",
						received: "float",
						message: check.message,
					}),
					status.dirty())
				: check.kind === "min"
					? (check.inclusive ? input.data < check.value : input.data <= check.value) &&
						((ctx = this._getOrReturnCtx(input, ctx)),
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_small,
							minimum: check.value,
							type: "number",
							inclusive: check.inclusive,
							exact: !1,
							message: check.message,
						}),
						status.dirty())
					: check.kind === "max"
						? (check.inclusive
								? input.data > check.value
								: input.data >= check.value) &&
							((ctx = this._getOrReturnCtx(input, ctx)),
							addIssueToContext(ctx, {
								code: ZodIssueCode.too_big,
								maximum: check.value,
								type: "number",
								inclusive: check.inclusive,
								exact: !1,
								message: check.message,
							}),
							status.dirty())
						: check.kind === "multipleOf"
							? floatSafeRemainder(input.data, check.value) !== 0 &&
								((ctx = this._getOrReturnCtx(input, ctx)),
								addIssueToContext(ctx, {
									code: ZodIssueCode.not_multiple_of,
									multipleOf: check.value,
									message: check.message,
								}),
								status.dirty())
							: check.kind === "finite"
								? Number.isFinite(input.data) ||
									((ctx = this._getOrReturnCtx(input, ctx)),
									addIssueToContext(ctx, {
										code: ZodIssueCode.not_finite,
										message: check.message,
									}),
									status.dirty())
								: util.assertNever(check);
		return { status: status.value, value: input.data };
	}
	gte(value, message) {
		return this.setLimit("min", value, !0, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, !1, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, !0, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, !1, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodNumber({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new ZodNumber({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	int(message) {
		return this._addCheck({
			kind: "int",
			message: errorUtil.toString(message),
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !1,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !1,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: 0,
			inclusive: !0,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: 0,
			inclusive: !0,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	finite(message) {
		return this._addCheck({
			kind: "finite",
			message: errorUtil.toString(message),
		});
	}
	safe(message) {
		return this._addCheck({
			kind: "min",
			inclusive: !0,
			value: Number.MIN_SAFE_INTEGER,
			message: errorUtil.toString(message),
		})._addCheck({
			kind: "max",
			inclusive: !0,
			value: Number.MAX_SAFE_INTEGER,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (let ch of this._def.checks)
			ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
		return min;
	}
	get maxValue() {
		let max = null;
		for (let ch of this._def.checks)
			ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
		return max;
	}
	get isInt() {
		return !!this._def.checks.find(
			(ch) => ch.kind === "int" || (ch.kind === "multipleOf" && util.isInteger(ch.value)),
		);
	}
	get isFinite() {
		let max = null,
			min = null;
		for (let ch of this._def.checks) {
			if (ch.kind === "finite" || ch.kind === "int" || ch.kind === "multipleOf") return !0;
			ch.kind === "min"
				? (min === null || ch.value > min) && (min = ch.value)
				: ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
		}
		return Number.isFinite(min) && Number.isFinite(max);
	}
};
ZodNumber.create = (params) =>
	new ZodNumber({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodNumber,
		coerce: params?.coerce || !1,
		...processCreateParams(params),
	});
var ZodBigInt = class extends ZodType {
	constructor() {
		super(...arguments), (this.min = this.gte), (this.max = this.lte);
	}
	_parse(input) {
		if (
			(this._def.coerce && (input.data = BigInt(input.data)),
			this._getType(input) !== ZodParsedType.bigint)
		) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx2, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.bigint,
					received: ctx2.parsedType,
				}),
				INVALID
			);
		}
		let ctx,
			status = new ParseStatus();
		for (let check of this._def.checks)
			check.kind === "min"
				? (check.inclusive ? input.data < check.value : input.data <= check.value) &&
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						type: "bigint",
						minimum: check.value,
						inclusive: check.inclusive,
						message: check.message,
					}),
					status.dirty())
				: check.kind === "max"
					? (check.inclusive ? input.data > check.value : input.data >= check.value) &&
						((ctx = this._getOrReturnCtx(input, ctx)),
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							type: "bigint",
							maximum: check.value,
							inclusive: check.inclusive,
							message: check.message,
						}),
						status.dirty())
					: check.kind === "multipleOf"
						? input.data % check.value !== BigInt(0) &&
							((ctx = this._getOrReturnCtx(input, ctx)),
							addIssueToContext(ctx, {
								code: ZodIssueCode.not_multiple_of,
								multipleOf: check.value,
								message: check.message,
							}),
							status.dirty())
						: util.assertNever(check);
		return { status: status.value, value: input.data };
	}
	gte(value, message) {
		return this.setLimit("min", value, !0, errorUtil.toString(message));
	}
	gt(value, message) {
		return this.setLimit("min", value, !1, errorUtil.toString(message));
	}
	lte(value, message) {
		return this.setLimit("max", value, !0, errorUtil.toString(message));
	}
	lt(value, message) {
		return this.setLimit("max", value, !1, errorUtil.toString(message));
	}
	setLimit(kind, value, inclusive, message) {
		return new ZodBigInt({
			...this._def,
			checks: [
				...this._def.checks,
				{
					kind,
					value,
					inclusive,
					message: errorUtil.toString(message),
				},
			],
		});
	}
	_addCheck(check) {
		return new ZodBigInt({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	positive(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !1,
			message: errorUtil.toString(message),
		});
	}
	negative(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !1,
			message: errorUtil.toString(message),
		});
	}
	nonpositive(message) {
		return this._addCheck({
			kind: "max",
			value: BigInt(0),
			inclusive: !0,
			message: errorUtil.toString(message),
		});
	}
	nonnegative(message) {
		return this._addCheck({
			kind: "min",
			value: BigInt(0),
			inclusive: !0,
			message: errorUtil.toString(message),
		});
	}
	multipleOf(value, message) {
		return this._addCheck({
			kind: "multipleOf",
			value,
			message: errorUtil.toString(message),
		});
	}
	get minValue() {
		let min = null;
		for (let ch of this._def.checks)
			ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
		return min;
	}
	get maxValue() {
		let max = null;
		for (let ch of this._def.checks)
			ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
		return max;
	}
};
ZodBigInt.create = (params) => {
	var _a;
	return new ZodBigInt({
		checks: [],
		typeName: ZodFirstPartyTypeKind.ZodBigInt,
		coerce: (_a = params?.coerce) !== null && _a !== void 0 ? _a : !1,
		...processCreateParams(params),
	});
};
var ZodBoolean = class extends ZodType {
	_parse(input) {
		if (
			(this._def.coerce && (input.data = !!input.data),
			this._getType(input) !== ZodParsedType.boolean)
		) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.boolean,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
};
ZodBoolean.create = (params) =>
	new ZodBoolean({
		typeName: ZodFirstPartyTypeKind.ZodBoolean,
		coerce: params?.coerce || !1,
		...processCreateParams(params),
	});
var ZodDate = class extends ZodType {
	_parse(input) {
		if (
			(this._def.coerce && (input.data = new Date(input.data)),
			this._getType(input) !== ZodParsedType.date)
		) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx2, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.date,
					received: ctx2.parsedType,
				}),
				INVALID
			);
		}
		if (isNaN(input.data.getTime())) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx2, {
					code: ZodIssueCode.invalid_date,
				}),
				INVALID
			);
		}
		let status = new ParseStatus(),
			ctx;
		for (let check of this._def.checks)
			check.kind === "min"
				? input.data.getTime() < check.value &&
					((ctx = this._getOrReturnCtx(input, ctx)),
					addIssueToContext(ctx, {
						code: ZodIssueCode.too_small,
						message: check.message,
						inclusive: !0,
						exact: !1,
						minimum: check.value,
						type: "date",
					}),
					status.dirty())
				: check.kind === "max"
					? input.data.getTime() > check.value &&
						((ctx = this._getOrReturnCtx(input, ctx)),
						addIssueToContext(ctx, {
							code: ZodIssueCode.too_big,
							message: check.message,
							inclusive: !0,
							exact: !1,
							maximum: check.value,
							type: "date",
						}),
						status.dirty())
					: util.assertNever(check);
		return {
			status: status.value,
			value: new Date(input.data.getTime()),
		};
	}
	_addCheck(check) {
		return new ZodDate({
			...this._def,
			checks: [...this._def.checks, check],
		});
	}
	min(minDate, message) {
		return this._addCheck({
			kind: "min",
			value: minDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	max(maxDate, message) {
		return this._addCheck({
			kind: "max",
			value: maxDate.getTime(),
			message: errorUtil.toString(message),
		});
	}
	get minDate() {
		let min = null;
		for (let ch of this._def.checks)
			ch.kind === "min" && (min === null || ch.value > min) && (min = ch.value);
		return min != null ? new Date(min) : null;
	}
	get maxDate() {
		let max = null;
		for (let ch of this._def.checks)
			ch.kind === "max" && (max === null || ch.value < max) && (max = ch.value);
		return max != null ? new Date(max) : null;
	}
};
ZodDate.create = (params) =>
	new ZodDate({
		checks: [],
		coerce: params?.coerce || !1,
		typeName: ZodFirstPartyTypeKind.ZodDate,
		...processCreateParams(params),
	});
var ZodSymbol = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.symbol) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.symbol,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
};
ZodSymbol.create = (params) =>
	new ZodSymbol({
		typeName: ZodFirstPartyTypeKind.ZodSymbol,
		...processCreateParams(params),
	});
var ZodUndefined = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.undefined,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
};
ZodUndefined.create = (params) =>
	new ZodUndefined({
		typeName: ZodFirstPartyTypeKind.ZodUndefined,
		...processCreateParams(params),
	});
var ZodNull = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.null) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.null,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
};
ZodNull.create = (params) =>
	new ZodNull({
		typeName: ZodFirstPartyTypeKind.ZodNull,
		...processCreateParams(params),
	});
var ZodAny = class extends ZodType {
	constructor() {
		super(...arguments), (this._any = !0);
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodAny.create = (params) =>
	new ZodAny({
		typeName: ZodFirstPartyTypeKind.ZodAny,
		...processCreateParams(params),
	});
var ZodUnknown = class extends ZodType {
	constructor() {
		super(...arguments), (this._unknown = !0);
	}
	_parse(input) {
		return OK(input.data);
	}
};
ZodUnknown.create = (params) =>
	new ZodUnknown({
		typeName: ZodFirstPartyTypeKind.ZodUnknown,
		...processCreateParams(params),
	});
var ZodNever = class extends ZodType {
	_parse(input) {
		let ctx = this._getOrReturnCtx(input);
		return (
			addIssueToContext(ctx, {
				code: ZodIssueCode.invalid_type,
				expected: ZodParsedType.never,
				received: ctx.parsedType,
			}),
			INVALID
		);
	}
};
ZodNever.create = (params) =>
	new ZodNever({
		typeName: ZodFirstPartyTypeKind.ZodNever,
		...processCreateParams(params),
	});
var ZodVoid = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.undefined) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.void,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
};
ZodVoid.create = (params) =>
	new ZodVoid({
		typeName: ZodFirstPartyTypeKind.ZodVoid,
		...processCreateParams(params),
	});
var ZodArray = class extends ZodType {
	_parse(input) {
		let { ctx, status } = this._processInputParams(input),
			def = this._def;
		if (ctx.parsedType !== ZodParsedType.array)
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.array,
					received: ctx.parsedType,
				}),
				INVALID
			);
		if (def.exactLength !== null) {
			let tooBig = ctx.data.length > def.exactLength.value,
				tooSmall = ctx.data.length < def.exactLength.value;
			(tooBig || tooSmall) &&
				(addIssueToContext(ctx, {
					code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
					minimum: tooSmall ? def.exactLength.value : void 0,
					maximum: tooBig ? def.exactLength.value : void 0,
					type: "array",
					inclusive: !0,
					exact: !0,
					message: def.exactLength.message,
				}),
				status.dirty());
		}
		if (
			(def.minLength !== null &&
				ctx.data.length < def.minLength.value &&
				(addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: def.minLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: def.minLength.message,
				}),
				status.dirty()),
			def.maxLength !== null &&
				ctx.data.length > def.maxLength.value &&
				(addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxLength.value,
					type: "array",
					inclusive: !0,
					exact: !1,
					message: def.maxLength.message,
				}),
				status.dirty()),
			ctx.common.async)
		)
			return Promise.all(
				[...ctx.data].map((item, i) =>
					def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i)),
				),
			).then((result2) => ParseStatus.mergeArray(status, result2));
		let result = [...ctx.data].map((item, i) =>
			def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i)),
		);
		return ParseStatus.mergeArray(status, result);
	}
	get element() {
		return this._def.type;
	}
	min(minLength, message) {
		return new ZodArray({
			...this._def,
			minLength: { value: minLength, message: errorUtil.toString(message) },
		});
	}
	max(maxLength, message) {
		return new ZodArray({
			...this._def,
			maxLength: { value: maxLength, message: errorUtil.toString(message) },
		});
	}
	length(len, message) {
		return new ZodArray({
			...this._def,
			exactLength: { value: len, message: errorUtil.toString(message) },
		});
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodArray.create = (schema, params) =>
	new ZodArray({
		type: schema,
		minLength: null,
		maxLength: null,
		exactLength: null,
		typeName: ZodFirstPartyTypeKind.ZodArray,
		...processCreateParams(params),
	});
function deepPartialify(schema) {
	if (schema instanceof ZodObject) {
		let newShape = {};
		for (let key in schema.shape) {
			let fieldSchema = schema.shape[key];
			newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
		}
		return new ZodObject({
			...schema._def,
			shape: () => newShape,
		});
	} else
		return schema instanceof ZodArray
			? new ZodArray({
					...schema._def,
					type: deepPartialify(schema.element),
				})
			: schema instanceof ZodOptional
				? ZodOptional.create(deepPartialify(schema.unwrap()))
				: schema instanceof ZodNullable
					? ZodNullable.create(deepPartialify(schema.unwrap()))
					: schema instanceof ZodTuple
						? ZodTuple.create(schema.items.map((item) => deepPartialify(item)))
						: schema;
}
var ZodObject = class extends ZodType {
	constructor() {
		super(...arguments),
			(this._cached = null),
			(this.nonstrict = this.passthrough),
			(this.augment = this.extend);
	}
	_getCached() {
		if (this._cached !== null) return this._cached;
		let shape = this._def.shape(),
			keys = util.objectKeys(shape);
		return (this._cached = { shape, keys });
	}
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.object) {
			let ctx2 = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx2, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.object,
					received: ctx2.parsedType,
				}),
				INVALID
			);
		}
		let { status, ctx } = this._processInputParams(input),
			{ shape, keys: shapeKeys } = this._getCached(),
			extraKeys = [];
		if (!(this._def.catchall instanceof ZodNever && this._def.unknownKeys === "strip"))
			for (let key in ctx.data) shapeKeys.includes(key) || extraKeys.push(key);
		let pairs = [];
		for (let key of shapeKeys) {
			let keyValidator = shape[key],
				value = ctx.data[key];
			pairs.push({
				key: { status: "valid", value: key },
				value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
				alwaysSet: key in ctx.data,
			});
		}
		if (this._def.catchall instanceof ZodNever) {
			let unknownKeys = this._def.unknownKeys;
			if (unknownKeys === "passthrough")
				for (let key of extraKeys)
					pairs.push({
						key: { status: "valid", value: key },
						value: { status: "valid", value: ctx.data[key] },
					});
			else if (unknownKeys === "strict")
				extraKeys.length > 0 &&
					(addIssueToContext(ctx, {
						code: ZodIssueCode.unrecognized_keys,
						keys: extraKeys,
					}),
					status.dirty());
			else if (unknownKeys !== "strip")
				throw new Error("Internal ZodObject error: invalid unknownKeys value.");
		} else {
			let catchall = this._def.catchall;
			for (let key of extraKeys) {
				let value = ctx.data[key];
				pairs.push({
					key: { status: "valid", value: key },
					value: catchall._parse(
						new ParseInputLazyPath(ctx, value, ctx.path, key),
						//, ctx.child(key), value, getParsedType(value)
					),
					alwaysSet: key in ctx.data,
				});
			}
		}
		return ctx.common.async
			? Promise.resolve()
					.then(async () => {
						let syncPairs = [];
						for (let pair of pairs) {
							let key = await pair.key;
							syncPairs.push({
								key,
								value: await pair.value,
								alwaysSet: pair.alwaysSet,
							});
						}
						return syncPairs;
					})
					.then((syncPairs) => ParseStatus.mergeObjectSync(status, syncPairs))
			: ParseStatus.mergeObjectSync(status, pairs);
	}
	get shape() {
		return this._def.shape();
	}
	strict(message) {
		return (
			errorUtil.errToObj,
			new ZodObject({
				...this._def,
				unknownKeys: "strict",
				...(message !== void 0
					? {
							errorMap: (issue, ctx) => {
								var _a, _b, _c, _d;
								let defaultError =
									(_c =
										(_b = (_a = this._def).errorMap) === null || _b === void 0
											? void 0
											: _b.call(_a, issue, ctx).message) !== null &&
									_c !== void 0
										? _c
										: ctx.defaultError;
								return issue.code === "unrecognized_keys"
									? {
											message:
												(_d = errorUtil.errToObj(message).message) !==
													null && _d !== void 0
													? _d
													: defaultError,
										}
									: {
											message: defaultError,
										};
							},
						}
					: {}),
			})
		);
	}
	strip() {
		return new ZodObject({
			...this._def,
			unknownKeys: "strip",
		});
	}
	passthrough() {
		return new ZodObject({
			...this._def,
			unknownKeys: "passthrough",
		});
	}
	// const AugmentFactory =
	//   <Def extends ZodObjectDef>(def: Def) =>
	//   <Augmentation extends ZodRawShape>(
	//     augmentation: Augmentation
	//   ): ZodObject<
	//     extendShape<ReturnType<Def["shape"]>, Augmentation>,
	//     Def["unknownKeys"],
	//     Def["catchall"]
	//   > => {
	//     return new ZodObject({
	//       ...def,
	//       shape: () => ({
	//         ...def.shape(),
	//         ...augmentation,
	//       }),
	//     }) as any;
	//   };
	extend(augmentation) {
		return new ZodObject({
			...this._def,
			shape: () => ({
				...this._def.shape(),
				...augmentation,
			}),
		});
	}
	/**
	 * Prior to zod@1.0.12 there was a bug in the
	 * inferred type of merged objects. Please
	 * upgrade if you are experiencing issues.
	 */
	merge(merging) {
		return new ZodObject({
			unknownKeys: merging._def.unknownKeys,
			catchall: merging._def.catchall,
			shape: () => ({
				...this._def.shape(),
				...merging._def.shape(),
			}),
			typeName: ZodFirstPartyTypeKind.ZodObject,
		});
	}
	// merge<
	//   Incoming extends AnyZodObject,
	//   Augmentation extends Incoming["shape"],
	//   NewOutput extends {
	//     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
	//       ? Augmentation[k]["_output"]
	//       : k extends keyof Output
	//       ? Output[k]
	//       : never;
	//   },
	//   NewInput extends {
	//     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
	//       ? Augmentation[k]["_input"]
	//       : k extends keyof Input
	//       ? Input[k]
	//       : never;
	//   }
	// >(
	//   merging: Incoming
	// ): ZodObject<
	//   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
	//   Incoming["_def"]["unknownKeys"],
	//   Incoming["_def"]["catchall"],
	//   NewOutput,
	//   NewInput
	// > {
	//   const merged: any = new ZodObject({
	//     unknownKeys: merging._def.unknownKeys,
	//     catchall: merging._def.catchall,
	//     shape: () =>
	//       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
	//     typeName: ZodFirstPartyTypeKind.ZodObject,
	//   }) as any;
	//   return merged;
	// }
	setKey(key, schema) {
		return this.augment({ [key]: schema });
	}
	// merge<Incoming extends AnyZodObject>(
	//   merging: Incoming
	// ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
	// ZodObject<
	//   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
	//   Incoming["_def"]["unknownKeys"],
	//   Incoming["_def"]["catchall"]
	// > {
	//   // const mergedShape = objectUtil.mergeShapes(
	//   //   this._def.shape(),
	//   //   merging._def.shape()
	//   // );
	//   const merged: any = new ZodObject({
	//     unknownKeys: merging._def.unknownKeys,
	//     catchall: merging._def.catchall,
	//     shape: () =>
	//       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
	//     typeName: ZodFirstPartyTypeKind.ZodObject,
	//   }) as any;
	//   return merged;
	// }
	catchall(index) {
		return new ZodObject({
			...this._def,
			catchall: index,
		});
	}
	pick(mask) {
		let shape = {};
		return (
			util.objectKeys(mask).forEach((key) => {
				mask[key] && this.shape[key] && (shape[key] = this.shape[key]);
			}),
			new ZodObject({
				...this._def,
				shape: () => shape,
			})
		);
	}
	omit(mask) {
		let shape = {};
		return (
			util.objectKeys(this.shape).forEach((key) => {
				mask[key] || (shape[key] = this.shape[key]);
			}),
			new ZodObject({
				...this._def,
				shape: () => shape,
			})
		);
	}
	/**
	 * @deprecated
	 */
	deepPartial() {
		return deepPartialify(this);
	}
	partial(mask) {
		let newShape = {};
		return (
			util.objectKeys(this.shape).forEach((key) => {
				let fieldSchema = this.shape[key];
				mask && !mask[key]
					? (newShape[key] = fieldSchema)
					: (newShape[key] = fieldSchema.optional());
			}),
			new ZodObject({
				...this._def,
				shape: () => newShape,
			})
		);
	}
	required(mask) {
		let newShape = {};
		return (
			util.objectKeys(this.shape).forEach((key) => {
				if (mask && !mask[key]) newShape[key] = this.shape[key];
				else {
					let newField = this.shape[key];
					for (; newField instanceof ZodOptional; ) newField = newField._def.innerType;
					newShape[key] = newField;
				}
			}),
			new ZodObject({
				...this._def,
				shape: () => newShape,
			})
		);
	}
	keyof() {
		return createZodEnum(util.objectKeys(this.shape));
	}
};
ZodObject.create = (shape, params) =>
	new ZodObject({
		shape: () => shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
ZodObject.strictCreate = (shape, params) =>
	new ZodObject({
		shape: () => shape,
		unknownKeys: "strict",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
ZodObject.lazycreate = (shape, params) =>
	new ZodObject({
		shape,
		unknownKeys: "strip",
		catchall: ZodNever.create(),
		typeName: ZodFirstPartyTypeKind.ZodObject,
		...processCreateParams(params),
	});
var ZodUnion = class extends ZodType {
	_parse(input) {
		let { ctx } = this._processInputParams(input),
			options = this._def.options;
		function handleResults(results) {
			for (let result of results) if (result.result.status === "valid") return result.result;
			for (let result of results)
				if (result.result.status === "dirty")
					return ctx.common.issues.push(...result.ctx.common.issues), result.result;
			let unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_union,
					unionErrors,
				}),
				INVALID
			);
		}
		if (ctx.common.async)
			return Promise.all(
				options.map(async (option) => {
					let childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: [],
						},
						parent: null,
					};
					return {
						result: await option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: childCtx,
						}),
						ctx: childCtx,
					};
				}),
			).then(handleResults);
		{
			let dirty,
				issues = [];
			for (let option of options) {
				let childCtx = {
						...ctx,
						common: {
							...ctx.common,
							issues: [],
						},
						parent: null,
					},
					result = option._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: childCtx,
					});
				if (result.status === "valid") return result;
				result.status === "dirty" && !dirty && (dirty = { result, ctx: childCtx }),
					childCtx.common.issues.length && issues.push(childCtx.common.issues);
			}
			if (dirty) return ctx.common.issues.push(...dirty.ctx.common.issues), dirty.result;
			let unionErrors = issues.map((issues2) => new ZodError(issues2));
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_union,
					unionErrors,
				}),
				INVALID
			);
		}
	}
	get options() {
		return this._def.options;
	}
};
ZodUnion.create = (types, params) =>
	new ZodUnion({
		options: types,
		typeName: ZodFirstPartyTypeKind.ZodUnion,
		...processCreateParams(params),
	});
var getDiscriminator = (type) =>
		type instanceof ZodLazy
			? getDiscriminator(type.schema)
			: type instanceof ZodEffects
				? getDiscriminator(type.innerType())
				: type instanceof ZodLiteral
					? [type.value]
					: type instanceof ZodEnum
						? type.options
						: type instanceof ZodNativeEnum
							? Object.keys(type.enum)
							: type instanceof ZodDefault
								? getDiscriminator(type._def.innerType)
								: type instanceof ZodUndefined
									? [void 0]
									: type instanceof ZodNull
										? [null]
										: null,
	ZodDiscriminatedUnion = class extends ZodType {
		_parse(input) {
			let { ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.object)
				return (
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType,
					}),
					INVALID
				);
			let discriminator = this.discriminator,
				discriminatorValue = ctx.data[discriminator],
				option = this.optionsMap.get(discriminatorValue);
			return option
				? ctx.common.async
					? option._parseAsync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx,
						})
					: option._parseSync({
							data: ctx.data,
							path: ctx.path,
							parent: ctx,
						})
				: (addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_union_discriminator,
						options: Array.from(this.optionsMap.keys()),
						path: [discriminator],
					}),
					INVALID);
		}
		get discriminator() {
			return this._def.discriminator;
		}
		get options() {
			return this._def.options;
		}
		get optionsMap() {
			return this._def.optionsMap;
		}
		/**
		 * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
		 * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
		 * have a different value for each object in the union.
		 * @param discriminator the name of the discriminator property
		 * @param types an array of object schemas
		 * @param params
		 */
		static create(discriminator, options, params) {
			let optionsMap = /* @__PURE__ */ new Map();
			for (let type of options) {
				let discriminatorValues = getDiscriminator(type.shape[discriminator]);
				if (!discriminatorValues)
					throw new Error(
						`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`,
					);
				for (let value of discriminatorValues) {
					if (optionsMap.has(value))
						throw new Error(
							`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`,
						);
					optionsMap.set(value, type);
				}
			}
			return new ZodDiscriminatedUnion({
				typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
				discriminator,
				options,
				optionsMap,
				...processCreateParams(params),
			});
		}
	};
function mergeValues(a, b) {
	let aType = getParsedType(a),
		bType = getParsedType(b);
	if (a === b) return { valid: !0, data: a };
	if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
		let bKeys = util.objectKeys(b),
			sharedKeys = util.objectKeys(a).filter((key) => bKeys.indexOf(key) !== -1),
			newObj = { ...a, ...b };
		for (let key of sharedKeys) {
			let sharedValue = mergeValues(a[key], b[key]);
			if (!sharedValue.valid) return { valid: !1 };
			newObj[key] = sharedValue.data;
		}
		return { valid: !0, data: newObj };
	} else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
		if (a.length !== b.length) return { valid: !1 };
		let newArray = [];
		for (let index = 0; index < a.length; index++) {
			let itemA = a[index],
				itemB = b[index],
				sharedValue = mergeValues(itemA, itemB);
			if (!sharedValue.valid) return { valid: !1 };
			newArray.push(sharedValue.data);
		}
		return { valid: !0, data: newArray };
	} else
		return aType === ZodParsedType.date && bType === ZodParsedType.date && +a == +b
			? { valid: !0, data: a }
			: { valid: !1 };
}
var ZodIntersection = class extends ZodType {
	_parse(input) {
		let { status, ctx } = this._processInputParams(input),
			handleParsed = (parsedLeft, parsedRight) => {
				if (isAborted(parsedLeft) || isAborted(parsedRight)) return INVALID;
				let merged = mergeValues(parsedLeft.value, parsedRight.value);
				return merged.valid
					? ((isDirty(parsedLeft) || isDirty(parsedRight)) && status.dirty(),
						{ status: status.value, value: merged.data })
					: (addIssueToContext(ctx, {
							code: ZodIssueCode.invalid_intersection_types,
						}),
						INVALID);
			};
		return ctx.common.async
			? Promise.all([
					this._def.left._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx,
					}),
					this._def.right._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx,
					}),
				]).then(([left, right]) => handleParsed(left, right))
			: handleParsed(
					this._def.left._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx,
					}),
					this._def.right._parseSync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx,
					}),
				);
	}
};
ZodIntersection.create = (left, right, params) =>
	new ZodIntersection({
		left,
		right,
		typeName: ZodFirstPartyTypeKind.ZodIntersection,
		...processCreateParams(params),
	});
var ZodTuple = class extends ZodType {
	_parse(input) {
		let { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.array)
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.array,
					received: ctx.parsedType,
				}),
				INVALID
			);
		if (ctx.data.length < this._def.items.length)
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.too_small,
					minimum: this._def.items.length,
					inclusive: !0,
					exact: !1,
					type: "array",
				}),
				INVALID
			);
		!this._def.rest &&
			ctx.data.length > this._def.items.length &&
			(addIssueToContext(ctx, {
				code: ZodIssueCode.too_big,
				maximum: this._def.items.length,
				inclusive: !0,
				exact: !1,
				type: "array",
			}),
			status.dirty());
		let items = [...ctx.data]
			.map((item, itemIndex) => {
				let schema = this._def.items[itemIndex] || this._def.rest;
				return schema
					? schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex))
					: null;
			})
			.filter((x) => !!x);
		return ctx.common.async
			? Promise.all(items).then((results) => ParseStatus.mergeArray(status, results))
			: ParseStatus.mergeArray(status, items);
	}
	get items() {
		return this._def.items;
	}
	rest(rest) {
		return new ZodTuple({
			...this._def,
			rest,
		});
	}
};
ZodTuple.create = (schemas, params) => {
	if (!Array.isArray(schemas))
		throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
	return new ZodTuple({
		items: schemas,
		typeName: ZodFirstPartyTypeKind.ZodTuple,
		rest: null,
		...processCreateParams(params),
	});
};
var ZodRecord = class extends ZodType {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(input) {
			let { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.object)
				return (
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.object,
						received: ctx.parsedType,
					}),
					INVALID
				);
			let pairs = [],
				keyType = this._def.keyType,
				valueType = this._def.valueType;
			for (let key in ctx.data)
				pairs.push({
					key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
					value: valueType._parse(
						new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key),
					),
				});
			return ctx.common.async
				? ParseStatus.mergeObjectAsync(status, pairs)
				: ParseStatus.mergeObjectSync(status, pairs);
		}
		get element() {
			return this._def.valueType;
		}
		static create(first, second, third) {
			return second instanceof ZodType
				? new ZodRecord({
						keyType: first,
						valueType: second,
						typeName: ZodFirstPartyTypeKind.ZodRecord,
						...processCreateParams(third),
					})
				: new ZodRecord({
						keyType: ZodString.create(),
						valueType: first,
						typeName: ZodFirstPartyTypeKind.ZodRecord,
						...processCreateParams(second),
					});
		}
	},
	ZodMap = class extends ZodType {
		get keySchema() {
			return this._def.keyType;
		}
		get valueSchema() {
			return this._def.valueType;
		}
		_parse(input) {
			let { status, ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.map)
				return (
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.map,
						received: ctx.parsedType,
					}),
					INVALID
				);
			let keyType = this._def.keyType,
				valueType = this._def.valueType,
				pairs = [...ctx.data.entries()].map(([key, value], index) => ({
					key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
					value: valueType._parse(
						new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"]),
					),
				}));
			if (ctx.common.async) {
				let finalMap = /* @__PURE__ */ new Map();
				return Promise.resolve().then(async () => {
					for (let pair of pairs) {
						let key = await pair.key,
							value = await pair.value;
						if (key.status === "aborted" || value.status === "aborted") return INVALID;
						(key.status === "dirty" || value.status === "dirty") && status.dirty(),
							finalMap.set(key.value, value.value);
					}
					return { status: status.value, value: finalMap };
				});
			} else {
				let finalMap = /* @__PURE__ */ new Map();
				for (let pair of pairs) {
					let key = pair.key,
						value = pair.value;
					if (key.status === "aborted" || value.status === "aborted") return INVALID;
					(key.status === "dirty" || value.status === "dirty") && status.dirty(),
						finalMap.set(key.value, value.value);
				}
				return { status: status.value, value: finalMap };
			}
		}
	};
ZodMap.create = (keyType, valueType, params) =>
	new ZodMap({
		valueType,
		keyType,
		typeName: ZodFirstPartyTypeKind.ZodMap,
		...processCreateParams(params),
	});
var ZodSet = class extends ZodType {
	_parse(input) {
		let { status, ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.set)
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.set,
					received: ctx.parsedType,
				}),
				INVALID
			);
		let def = this._def;
		def.minSize !== null &&
			ctx.data.size < def.minSize.value &&
			(addIssueToContext(ctx, {
				code: ZodIssueCode.too_small,
				minimum: def.minSize.value,
				type: "set",
				inclusive: !0,
				exact: !1,
				message: def.minSize.message,
			}),
			status.dirty()),
			def.maxSize !== null &&
				ctx.data.size > def.maxSize.value &&
				(addIssueToContext(ctx, {
					code: ZodIssueCode.too_big,
					maximum: def.maxSize.value,
					type: "set",
					inclusive: !0,
					exact: !1,
					message: def.maxSize.message,
				}),
				status.dirty());
		let valueType = this._def.valueType;
		function finalizeSet(elements2) {
			let parsedSet = /* @__PURE__ */ new Set();
			for (let element of elements2) {
				if (element.status === "aborted") return INVALID;
				element.status === "dirty" && status.dirty(), parsedSet.add(element.value);
			}
			return { status: status.value, value: parsedSet };
		}
		let elements = [...ctx.data.values()].map((item, i) =>
			valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)),
		);
		return ctx.common.async
			? Promise.all(elements).then((elements2) => finalizeSet(elements2))
			: finalizeSet(elements);
	}
	min(minSize, message) {
		return new ZodSet({
			...this._def,
			minSize: { value: minSize, message: errorUtil.toString(message) },
		});
	}
	max(maxSize, message) {
		return new ZodSet({
			...this._def,
			maxSize: { value: maxSize, message: errorUtil.toString(message) },
		});
	}
	size(size, message) {
		return this.min(size, message).max(size, message);
	}
	nonempty(message) {
		return this.min(1, message);
	}
};
ZodSet.create = (valueType, params) =>
	new ZodSet({
		valueType,
		minSize: null,
		maxSize: null,
		typeName: ZodFirstPartyTypeKind.ZodSet,
		...processCreateParams(params),
	});
var ZodFunction = class extends ZodType {
		constructor() {
			super(...arguments), (this.validate = this.implement);
		}
		_parse(input) {
			let { ctx } = this._processInputParams(input);
			if (ctx.parsedType !== ZodParsedType.function)
				return (
					addIssueToContext(ctx, {
						code: ZodIssueCode.invalid_type,
						expected: ZodParsedType.function,
						received: ctx.parsedType,
					}),
					INVALID
				);
			function makeArgsIssue(args, error) {
				return makeIssue({
					data: args,
					path: ctx.path,
					errorMaps: [
						ctx.common.contextualErrorMap,
						ctx.schemaErrorMap,
						getErrorMap(),
						errorMap,
					].filter((x) => !!x),
					issueData: {
						code: ZodIssueCode.invalid_arguments,
						argumentsError: error,
					},
				});
			}
			function makeReturnsIssue(returns, error) {
				return makeIssue({
					data: returns,
					path: ctx.path,
					errorMaps: [
						ctx.common.contextualErrorMap,
						ctx.schemaErrorMap,
						getErrorMap(),
						errorMap,
					].filter((x) => !!x),
					issueData: {
						code: ZodIssueCode.invalid_return_type,
						returnTypeError: error,
					},
				});
			}
			let params = { errorMap: ctx.common.contextualErrorMap },
				fn = ctx.data;
			if (this._def.returns instanceof ZodPromise) {
				let me = this;
				return OK(async function (...args) {
					let error = new ZodError([]),
						parsedArgs = await me._def.args.parseAsync(args, params).catch((e) => {
							throw (error.addIssue(makeArgsIssue(args, e)), error);
						}),
						result = await Reflect.apply(fn, this, parsedArgs);
					return await me._def.returns._def.type.parseAsync(result, params).catch((e) => {
						throw (error.addIssue(makeReturnsIssue(result, e)), error);
					});
				});
			} else {
				let me = this;
				return OK(function (...args) {
					let parsedArgs = me._def.args.safeParse(args, params);
					if (!parsedArgs.success)
						throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
					let result = Reflect.apply(fn, this, parsedArgs.data),
						parsedReturns = me._def.returns.safeParse(result, params);
					if (!parsedReturns.success)
						throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
					return parsedReturns.data;
				});
			}
		}
		parameters() {
			return this._def.args;
		}
		returnType() {
			return this._def.returns;
		}
		args(...items) {
			return new ZodFunction({
				...this._def,
				args: ZodTuple.create(items).rest(ZodUnknown.create()),
			});
		}
		returns(returnType) {
			return new ZodFunction({
				...this._def,
				returns: returnType,
			});
		}
		implement(func) {
			return this.parse(func);
		}
		strictImplement(func) {
			return this.parse(func);
		}
		static create(args, returns, params) {
			return new ZodFunction({
				args: args || ZodTuple.create([]).rest(ZodUnknown.create()),
				returns: returns || ZodUnknown.create(),
				typeName: ZodFirstPartyTypeKind.ZodFunction,
				...processCreateParams(params),
			});
		}
	},
	ZodLazy = class extends ZodType {
		get schema() {
			return this._def.getter();
		}
		_parse(input) {
			let { ctx } = this._processInputParams(input);
			return this._def.getter()._parse({ data: ctx.data, path: ctx.path, parent: ctx });
		}
	};
ZodLazy.create = (getter, params) =>
	new ZodLazy({
		getter,
		typeName: ZodFirstPartyTypeKind.ZodLazy,
		...processCreateParams(params),
	});
var ZodLiteral = class extends ZodType {
	_parse(input) {
		if (input.data !== this._def.value) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_literal,
					expected: this._def.value,
				}),
				INVALID
			);
		}
		return { status: "valid", value: input.data };
	}
	get value() {
		return this._def.value;
	}
};
ZodLiteral.create = (value, params) =>
	new ZodLiteral({
		value,
		typeName: ZodFirstPartyTypeKind.ZodLiteral,
		...processCreateParams(params),
	});
function createZodEnum(values, params) {
	return new ZodEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodEnum,
		...processCreateParams(params),
	});
}
var ZodEnum = class extends ZodType {
	_parse(input) {
		if (typeof input.data != "string") {
			let ctx = this._getOrReturnCtx(input),
				expectedValues = this._def.values;
			return (
				addIssueToContext(ctx, {
					expected: util.joinValues(expectedValues),
					received: ctx.parsedType,
					code: ZodIssueCode.invalid_type,
				}),
				INVALID
			);
		}
		if (this._def.values.indexOf(input.data) === -1) {
			let ctx = this._getOrReturnCtx(input),
				expectedValues = this._def.values;
			return (
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_enum_value,
					options: expectedValues,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
	get options() {
		return this._def.values;
	}
	get enum() {
		let enumValues = {};
		for (let val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Values() {
		let enumValues = {};
		for (let val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	get Enum() {
		let enumValues = {};
		for (let val of this._def.values) enumValues[val] = val;
		return enumValues;
	}
	extract(values) {
		return ZodEnum.create(values);
	}
	exclude(values) {
		return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)));
	}
};
ZodEnum.create = createZodEnum;
var ZodNativeEnum = class extends ZodType {
	_parse(input) {
		let nativeEnumValues = util.getValidEnumValues(this._def.values),
			ctx = this._getOrReturnCtx(input);
		if (ctx.parsedType !== ZodParsedType.string && ctx.parsedType !== ZodParsedType.number) {
			let expectedValues = util.objectValues(nativeEnumValues);
			return (
				addIssueToContext(ctx, {
					expected: util.joinValues(expectedValues),
					received: ctx.parsedType,
					code: ZodIssueCode.invalid_type,
				}),
				INVALID
			);
		}
		if (nativeEnumValues.indexOf(input.data) === -1) {
			let expectedValues = util.objectValues(nativeEnumValues);
			return (
				addIssueToContext(ctx, {
					received: ctx.data,
					code: ZodIssueCode.invalid_enum_value,
					options: expectedValues,
				}),
				INVALID
			);
		}
		return OK(input.data);
	}
	get enum() {
		return this._def.values;
	}
};
ZodNativeEnum.create = (values, params) =>
	new ZodNativeEnum({
		values,
		typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
		...processCreateParams(params),
	});
var ZodPromise = class extends ZodType {
	unwrap() {
		return this._def.type;
	}
	_parse(input) {
		let { ctx } = this._processInputParams(input);
		if (ctx.parsedType !== ZodParsedType.promise && ctx.common.async === !1)
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.promise,
					received: ctx.parsedType,
				}),
				INVALID
			);
		let promisified =
			ctx.parsedType === ZodParsedType.promise ? ctx.data : Promise.resolve(ctx.data);
		return OK(
			promisified.then((data) =>
				this._def.type.parseAsync(data, {
					path: ctx.path,
					errorMap: ctx.common.contextualErrorMap,
				}),
			),
		);
	}
};
ZodPromise.create = (schema, params) =>
	new ZodPromise({
		type: schema,
		typeName: ZodFirstPartyTypeKind.ZodPromise,
		...processCreateParams(params),
	});
var ZodEffects = class extends ZodType {
	innerType() {
		return this._def.schema;
	}
	sourceType() {
		return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
			? this._def.schema.sourceType()
			: this._def.schema;
	}
	_parse(input) {
		let { status, ctx } = this._processInputParams(input),
			effect = this._def.effect || null,
			checkCtx = {
				addIssue: (arg) => {
					addIssueToContext(ctx, arg), arg.fatal ? status.abort() : status.dirty();
				},
				get path() {
					return ctx.path;
				},
			};
		if (
			((checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx)), effect.type === "preprocess")
		) {
			let processed = effect.transform(ctx.data, checkCtx);
			return ctx.common.issues.length
				? {
						status: "dirty",
						value: ctx.data,
					}
				: ctx.common.async
					? Promise.resolve(processed).then((processed2) =>
							this._def.schema._parseAsync({
								data: processed2,
								path: ctx.path,
								parent: ctx,
							}),
						)
					: this._def.schema._parseSync({
							data: processed,
							path: ctx.path,
							parent: ctx,
						});
		}
		if (effect.type === "refinement") {
			let executeRefinement = (acc) => {
				let result = effect.refinement(acc, checkCtx);
				if (ctx.common.async) return Promise.resolve(result);
				if (result instanceof Promise)
					throw new Error(
						"Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
					);
				return acc;
			};
			if (ctx.common.async === !1) {
				let inner = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				return inner.status === "aborted"
					? INVALID
					: (inner.status === "dirty" && status.dirty(),
						executeRefinement(inner.value),
						{ status: status.value, value: inner.value });
			} else
				return this._def.schema
					._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
					.then((inner) =>
						inner.status === "aborted"
							? INVALID
							: (inner.status === "dirty" && status.dirty(),
								executeRefinement(inner.value).then(() => ({
									status: status.value,
									value: inner.value,
								}))),
					);
		}
		if (effect.type === "transform")
			if (ctx.common.async === !1) {
				let base = this._def.schema._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				if (!isValid(base)) return base;
				let result = effect.transform(base.value, checkCtx);
				if (result instanceof Promise)
					throw new Error(
						"Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
					);
				return { status: status.value, value: result };
			} else
				return this._def.schema
					._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
					.then((base) =>
						isValid(base)
							? Promise.resolve(effect.transform(base.value, checkCtx)).then(
									(result) => ({ status: status.value, value: result }),
								)
							: base,
					);
		util.assertNever(effect);
	}
};
ZodEffects.create = (schema, effect, params) =>
	new ZodEffects({
		schema,
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		effect,
		...processCreateParams(params),
	});
ZodEffects.createWithPreprocess = (preprocess, schema, params) =>
	new ZodEffects({
		schema,
		effect: { type: "preprocess", transform: preprocess },
		typeName: ZodFirstPartyTypeKind.ZodEffects,
		...processCreateParams(params),
	});
var ZodOptional = class extends ZodType {
	_parse(input) {
		return this._getType(input) === ZodParsedType.undefined
			? OK(void 0)
			: this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodOptional.create = (type, params) =>
	new ZodOptional({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodOptional,
		...processCreateParams(params),
	});
var ZodNullable = class extends ZodType {
	_parse(input) {
		return this._getType(input) === ZodParsedType.null
			? OK(null)
			: this._def.innerType._parse(input);
	}
	unwrap() {
		return this._def.innerType;
	}
};
ZodNullable.create = (type, params) =>
	new ZodNullable({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodNullable,
		...processCreateParams(params),
	});
var ZodDefault = class extends ZodType {
	_parse(input) {
		let { ctx } = this._processInputParams(input),
			data = ctx.data;
		return (
			ctx.parsedType === ZodParsedType.undefined && (data = this._def.defaultValue()),
			this._def.innerType._parse({
				data,
				path: ctx.path,
				parent: ctx,
			})
		);
	}
	removeDefault() {
		return this._def.innerType;
	}
};
ZodDefault.create = (type, params) =>
	new ZodDefault({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodDefault,
		defaultValue: typeof params.default == "function" ? params.default : () => params.default,
		...processCreateParams(params),
	});
var ZodCatch = class extends ZodType {
	_parse(input) {
		let { ctx } = this._processInputParams(input),
			newCtx = {
				...ctx,
				common: {
					...ctx.common,
					issues: [],
				},
			},
			result = this._def.innerType._parse({
				data: newCtx.data,
				path: newCtx.path,
				parent: {
					...newCtx,
				},
			});
		return isAsync(result)
			? result.then((result2) => ({
					status: "valid",
					value:
						result2.status === "valid"
							? result2.value
							: this._def.catchValue({
									get error() {
										return new ZodError(newCtx.common.issues);
									},
									input: newCtx.data,
								}),
				}))
			: {
					status: "valid",
					value:
						result.status === "valid"
							? result.value
							: this._def.catchValue({
									get error() {
										return new ZodError(newCtx.common.issues);
									},
									input: newCtx.data,
								}),
				};
	}
	removeCatch() {
		return this._def.innerType;
	}
};
ZodCatch.create = (type, params) =>
	new ZodCatch({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodCatch,
		catchValue: typeof params.catch == "function" ? params.catch : () => params.catch,
		...processCreateParams(params),
	});
var ZodNaN = class extends ZodType {
	_parse(input) {
		if (this._getType(input) !== ZodParsedType.nan) {
			let ctx = this._getOrReturnCtx(input);
			return (
				addIssueToContext(ctx, {
					code: ZodIssueCode.invalid_type,
					expected: ZodParsedType.nan,
					received: ctx.parsedType,
				}),
				INVALID
			);
		}
		return { status: "valid", value: input.data };
	}
};
ZodNaN.create = (params) =>
	new ZodNaN({
		typeName: ZodFirstPartyTypeKind.ZodNaN,
		...processCreateParams(params),
	});
var BRAND = Symbol("zod_brand"),
	ZodBranded = class extends ZodType {
		_parse(input) {
			let { ctx } = this._processInputParams(input),
				data = ctx.data;
			return this._def.type._parse({
				data,
				path: ctx.path,
				parent: ctx,
			});
		}
		unwrap() {
			return this._def.type;
		}
	},
	ZodPipeline = class extends ZodType {
		_parse(input) {
			let { status, ctx } = this._processInputParams(input);
			if (ctx.common.async)
				return (async () => {
					let inResult = await this._def.in._parseAsync({
						data: ctx.data,
						path: ctx.path,
						parent: ctx,
					});
					return inResult.status === "aborted"
						? INVALID
						: inResult.status === "dirty"
							? (status.dirty(), DIRTY(inResult.value))
							: this._def.out._parseAsync({
									data: inResult.value,
									path: ctx.path,
									parent: ctx,
								});
				})();
			{
				let inResult = this._def.in._parseSync({
					data: ctx.data,
					path: ctx.path,
					parent: ctx,
				});
				return inResult.status === "aborted"
					? INVALID
					: inResult.status === "dirty"
						? (status.dirty(),
							{
								status: "dirty",
								value: inResult.value,
							})
						: this._def.out._parseSync({
								data: inResult.value,
								path: ctx.path,
								parent: ctx,
							});
			}
		}
		static create(a, b) {
			return new ZodPipeline({
				in: a,
				out: b,
				typeName: ZodFirstPartyTypeKind.ZodPipeline,
			});
		}
	},
	ZodReadonly = class extends ZodType {
		_parse(input) {
			let result = this._def.innerType._parse(input);
			return isValid(result) && (result.value = Object.freeze(result.value)), result;
		}
	};
ZodReadonly.create = (type, params) =>
	new ZodReadonly({
		innerType: type,
		typeName: ZodFirstPartyTypeKind.ZodReadonly,
		...processCreateParams(params),
	});
var custom = (check, params = {}, fatal) =>
		check
			? ZodAny.create().superRefine((data, ctx) => {
					var _a, _b;
					if (!check(data)) {
						let p =
								typeof params == "function"
									? params(data)
									: typeof params == "string"
										? { message: params }
										: params,
							_fatal =
								(_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !==
									null && _b !== void 0
									? _b
									: !0,
							p2 = typeof p == "string" ? { message: p } : p;
						ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
					}
				})
			: ZodAny.create(),
	late = {
		object: ZodObject.lazycreate,
	},
	ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind2) {
	(ZodFirstPartyTypeKind2.ZodString = "ZodString"),
		(ZodFirstPartyTypeKind2.ZodNumber = "ZodNumber"),
		(ZodFirstPartyTypeKind2.ZodNaN = "ZodNaN"),
		(ZodFirstPartyTypeKind2.ZodBigInt = "ZodBigInt"),
		(ZodFirstPartyTypeKind2.ZodBoolean = "ZodBoolean"),
		(ZodFirstPartyTypeKind2.ZodDate = "ZodDate"),
		(ZodFirstPartyTypeKind2.ZodSymbol = "ZodSymbol"),
		(ZodFirstPartyTypeKind2.ZodUndefined = "ZodUndefined"),
		(ZodFirstPartyTypeKind2.ZodNull = "ZodNull"),
		(ZodFirstPartyTypeKind2.ZodAny = "ZodAny"),
		(ZodFirstPartyTypeKind2.ZodUnknown = "ZodUnknown"),
		(ZodFirstPartyTypeKind2.ZodNever = "ZodNever"),
		(ZodFirstPartyTypeKind2.ZodVoid = "ZodVoid"),
		(ZodFirstPartyTypeKind2.ZodArray = "ZodArray"),
		(ZodFirstPartyTypeKind2.ZodObject = "ZodObject"),
		(ZodFirstPartyTypeKind2.ZodUnion = "ZodUnion"),
		(ZodFirstPartyTypeKind2.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
		(ZodFirstPartyTypeKind2.ZodIntersection = "ZodIntersection"),
		(ZodFirstPartyTypeKind2.ZodTuple = "ZodTuple"),
		(ZodFirstPartyTypeKind2.ZodRecord = "ZodRecord"),
		(ZodFirstPartyTypeKind2.ZodMap = "ZodMap"),
		(ZodFirstPartyTypeKind2.ZodSet = "ZodSet"),
		(ZodFirstPartyTypeKind2.ZodFunction = "ZodFunction"),
		(ZodFirstPartyTypeKind2.ZodLazy = "ZodLazy"),
		(ZodFirstPartyTypeKind2.ZodLiteral = "ZodLiteral"),
		(ZodFirstPartyTypeKind2.ZodEnum = "ZodEnum"),
		(ZodFirstPartyTypeKind2.ZodEffects = "ZodEffects"),
		(ZodFirstPartyTypeKind2.ZodNativeEnum = "ZodNativeEnum"),
		(ZodFirstPartyTypeKind2.ZodOptional = "ZodOptional"),
		(ZodFirstPartyTypeKind2.ZodNullable = "ZodNullable"),
		(ZodFirstPartyTypeKind2.ZodDefault = "ZodDefault"),
		(ZodFirstPartyTypeKind2.ZodCatch = "ZodCatch"),
		(ZodFirstPartyTypeKind2.ZodPromise = "ZodPromise"),
		(ZodFirstPartyTypeKind2.ZodBranded = "ZodBranded"),
		(ZodFirstPartyTypeKind2.ZodPipeline = "ZodPipeline"),
		(ZodFirstPartyTypeKind2.ZodReadonly = "ZodReadonly");
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
var instanceOfType = (
		cls,
		params = {
			message: `Input not instance of ${cls.name}`,
		},
	) => custom((data) => data instanceof cls, params),
	stringType = ZodString.create,
	numberType = ZodNumber.create,
	nanType = ZodNaN.create,
	bigIntType = ZodBigInt.create,
	booleanType = ZodBoolean.create,
	dateType = ZodDate.create,
	symbolType = ZodSymbol.create,
	undefinedType = ZodUndefined.create,
	nullType = ZodNull.create,
	anyType = ZodAny.create,
	unknownType = ZodUnknown.create,
	neverType = ZodNever.create,
	voidType = ZodVoid.create,
	arrayType = ZodArray.create,
	objectType = ZodObject.create,
	strictObjectType = ZodObject.strictCreate,
	unionType = ZodUnion.create,
	discriminatedUnionType = ZodDiscriminatedUnion.create,
	intersectionType = ZodIntersection.create,
	tupleType = ZodTuple.create,
	recordType = ZodRecord.create,
	mapType = ZodMap.create,
	setType = ZodSet.create,
	functionType = ZodFunction.create,
	lazyType = ZodLazy.create,
	literalType = ZodLiteral.create,
	enumType = ZodEnum.create,
	nativeEnumType = ZodNativeEnum.create,
	promiseType = ZodPromise.create,
	effectsType = ZodEffects.create,
	optionalType = ZodOptional.create,
	nullableType = ZodNullable.create,
	preprocessType = ZodEffects.createWithPreprocess,
	pipelineType = ZodPipeline.create,
	ostring = () => stringType().optional(),
	onumber = () => numberType().optional(),
	oboolean = () => booleanType().optional(),
	coerce = {
		string: (arg) => ZodString.create({ ...arg, coerce: !0 }),
		number: (arg) => ZodNumber.create({ ...arg, coerce: !0 }),
		boolean: (arg) =>
			ZodBoolean.create({
				...arg,
				coerce: !0,
			}),
		bigint: (arg) => ZodBigInt.create({ ...arg, coerce: !0 }),
		date: (arg) => ZodDate.create({ ...arg, coerce: !0 }),
	},
	NEVER = INVALID,
	z = /* @__PURE__ */ Object.freeze({
		__proto__: null,
		defaultErrorMap: errorMap,
		setErrorMap,
		getErrorMap,
		makeIssue,
		EMPTY_PATH,
		addIssueToContext,
		ParseStatus,
		INVALID,
		DIRTY,
		OK,
		isAborted,
		isDirty,
		isValid,
		isAsync,
		get util() {
			return util;
		},
		get objectUtil() {
			return objectUtil;
		},
		ZodParsedType,
		getParsedType,
		ZodType,
		ZodString,
		ZodNumber,
		ZodBigInt,
		ZodBoolean,
		ZodDate,
		ZodSymbol,
		ZodUndefined,
		ZodNull,
		ZodAny,
		ZodUnknown,
		ZodNever,
		ZodVoid,
		ZodArray,
		ZodObject,
		ZodUnion,
		ZodDiscriminatedUnion,
		ZodIntersection,
		ZodTuple,
		ZodRecord,
		ZodMap,
		ZodSet,
		ZodFunction,
		ZodLazy,
		ZodLiteral,
		ZodEnum,
		ZodNativeEnum,
		ZodPromise,
		ZodEffects,
		ZodTransformer: ZodEffects,
		ZodOptional,
		ZodNullable,
		ZodDefault,
		ZodCatch,
		ZodNaN,
		BRAND,
		ZodBranded,
		ZodPipeline,
		ZodReadonly,
		custom,
		Schema: ZodType,
		ZodSchema: ZodType,
		late,
		get ZodFirstPartyTypeKind() {
			return ZodFirstPartyTypeKind;
		},
		coerce,
		any: anyType,
		array: arrayType,
		bigint: bigIntType,
		boolean: booleanType,
		date: dateType,
		discriminatedUnion: discriminatedUnionType,
		effect: effectsType,
		enum: enumType,
		function: functionType,
		instanceof: instanceOfType,
		intersection: intersectionType,
		lazy: lazyType,
		literal: literalType,
		map: mapType,
		nan: nanType,
		nativeEnum: nativeEnumType,
		never: neverType,
		null: nullType,
		nullable: nullableType,
		number: numberType,
		object: objectType,
		oboolean,
		onumber,
		optional: optionalType,
		ostring,
		pipeline: pipelineType,
		preprocess: preprocessType,
		promise: promiseType,
		record: recordType,
		set: setType,
		strictObject: strictObjectType,
		string: stringType,
		symbol: symbolType,
		transformer: effectsType,
		tuple: tupleType,
		undefined: undefinedType,
		union: unionType,
		unknown: unknownType,
		void: voidType,
		NEVER,
		ZodIssueCode,
		quotelessJson,
		ZodError,
	});

// src/workers/shared/zod.worker.ts
var HEX_REGEXP = /^[0-9a-f]*$/i,
	BASE64_REGEXP = /^[0-9a-z+/=]*$/i,
	HexDataSchema = z
		.string()
		.regex(HEX_REGEXP)
		.transform((hex) => Buffer.from(hex, "hex")),
	Base64DataSchema = z
		.string()
		.regex(BASE64_REGEXP)
		.transform((base64) => Buffer.from(base64, "base64"));
export { BASE64_REGEXP, Base64DataSchema, HEX_REGEXP, HexDataSchema, z };
//# sourceMappingURL=zod.worker.js.map
