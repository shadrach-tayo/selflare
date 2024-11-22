// ../../node_modules/.pnpm/kleur@4.1.5/node_modules/kleur/colors.mjs
var FORCE_COLOR,
	NODE_DISABLE_COLORS,
	NO_COLOR,
	TERM,
	isTTY = !0;
typeof process < "u" &&
	(({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {}),
	(isTTY = process.stdout && process.stdout.isTTY));
var $ = {
	enabled:
		!NODE_DISABLE_COLORS &&
		NO_COLOR == null &&
		TERM !== "dumb" &&
		((FORCE_COLOR != null && FORCE_COLOR !== "0") || isTTY),
};
function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, "g"),
		open = `\x1B[${x}m`,
		close = `\x1B[${y}m`;
	return function (txt) {
		return !$.enabled || txt == null
			? txt
			: open + (~("" + txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}
var reset = init(0, 0),
	bold = init(1, 22),
	dim = init(2, 22),
	italic = init(3, 23),
	underline = init(4, 24),
	inverse = init(7, 27),
	hidden = init(8, 28),
	strikethrough = init(9, 29),
	black = init(30, 39),
	red = init(31, 39),
	green = init(32, 39),
	yellow = init(33, 39),
	blue = init(34, 39),
	magenta = init(35, 39),
	cyan = init(36, 39),
	white = init(37, 39),
	gray = init(90, 39),
	grey = init(90, 39),
	bgBlack = init(40, 49),
	bgRed = init(41, 49),
	bgGreen = init(42, 49),
	bgYellow = init(43, 49),
	bgBlue = init(44, 49),
	bgMagenta = init(45, 49),
	bgCyan = init(46, 49),
	bgWhite = init(47, 49);

// src/workers/core/entry.worker.ts
import { HttpError, LogLevel, SharedHeaders } from "miniflare:shared";

// src/shared/mime-types.ts
var compressedByCloudflareFL = /* @__PURE__ */ new Set([
	// list copied from https://developers.cloudflare.com/speed/optimization/content/brotli/content-compression/#:~:text=If%20supported%20by%20visitors%E2%80%99%20web%20browsers%2C%20Cloudflare%20will%20return%20Gzip%20or%20Brotli%2Dencoded%20responses%20for%20the%20following%20content%20types%3A
	"text/html",
	"text/richtext",
	"text/plain",
	"text/css",
	"text/x-script",
	"text/x-component",
	"text/x-java-source",
	"text/x-markdown",
	"application/javascript",
	"application/x-javascript",
	"text/javascript",
	"text/js",
	"image/x-icon",
	"image/vnd.microsoft.icon",
	"application/x-perl",
	"application/x-httpd-cgi",
	"text/xml",
	"application/xml",
	"application/rss+xml",
	"application/vnd.api+json",
	"application/x-protobuf",
	"application/json",
	"multipart/bag",
	"multipart/mixed",
	"application/xhtml+xml",
	"font/ttf",
	"font/otf",
	"font/x-woff",
	"image/svg+xml",
	"application/vnd.ms-fontobject",
	"application/ttf",
	"application/x-ttf",
	"application/otf",
	"application/x-otf",
	"application/truetype",
	"application/opentype",
	"application/x-opentype",
	"application/font-woff",
	"application/eot",
	"application/font",
	"application/font-sfnt",
	"application/wasm",
	"application/javascript-binast",
	"application/manifest+json",
	"application/ld+json",
	"application/graphql+json",
	"application/geo+json",
]);
function isCompressedByCloudflareFL(contentTypeHeader) {
	if (!contentTypeHeader) return !0;
	let [contentType] = contentTypeHeader.split(";");
	return compressedByCloudflareFL.has(contentType);
}

// src/workers/core/constants.ts
var CoreHeaders = {
		CUSTOM_SERVICE: "MF-Custom-Service",
		ORIGINAL_URL: "MF-Original-URL",
		PROXY_SHARED_SECRET: "MF-Proxy-Shared-Secret",
		DISABLE_PRETTY_ERROR: "MF-Disable-Pretty-Error",
		ERROR_STACK: "MF-Experimental-Error-Stack",
		ROUTE_OVERRIDE: "MF-Route-Override",
		CF_BLOB: "MF-CF-Blob",
		// API Proxy
		OP_SECRET: "MF-Op-Secret",
		OP: "MF-Op",
		OP_TARGET: "MF-Op-Target",
		OP_KEY: "MF-Op-Key",
		OP_SYNC: "MF-Op-Sync",
		OP_STRINGIFIED_SIZE: "MF-Op-Stringified-Size",
		OP_RESULT_TYPE: "MF-Op-Result-Type",
	},
	CoreBindings = {
		SERVICE_LOOPBACK: "MINIFLARE_LOOPBACK",
		SERVICE_USER_ROUTE_PREFIX: "MINIFLARE_USER_ROUTE_",
		SERVICE_USER_FALLBACK: "MINIFLARE_USER_FALLBACK",
		TEXT_CUSTOM_SERVICE: "MINIFLARE_CUSTOM_SERVICE",
		TEXT_UPSTREAM_URL: "MINIFLARE_UPSTREAM_URL",
		JSON_CF_BLOB: "CF_BLOB",
		JSON_ROUTES: "MINIFLARE_ROUTES",
		JSON_LOG_LEVEL: "MINIFLARE_LOG_LEVEL",
		DATA_LIVE_RELOAD_SCRIPT: "MINIFLARE_LIVE_RELOAD_SCRIPT",
		DURABLE_OBJECT_NAMESPACE_PROXY: "MINIFLARE_PROXY",
		DATA_PROXY_SECRET: "MINIFLARE_PROXY_SECRET",
		DATA_PROXY_SHARED_SECRET: "MINIFLARE_PROXY_SHARED_SECRET",
	},
	ProxyOps = {
		// Get the target or a property of the target
		GET: "GET",
		// Get the descriptor for a property of the target
		GET_OWN_DESCRIPTOR: "GET_OWN_DESCRIPTOR",
		// Get the target's own property names
		GET_OWN_KEYS: "GET_OWN_KEYS",
		// Call a method on the target
		CALL: "CALL",
		// Remove the strong reference to the target on the "heap", allowing it to be
		// garbage collected
		FREE: "FREE",
	},
	ProxyAddresses = {
		GLOBAL: 0,
		// globalThis
		ENV: 1,
		// env
		USER_START: 2,
	};
function isFetcherFetch(targetName, key) {
	return (
		(targetName === "Fetcher" ||
			targetName === "DurableObject" ||
			targetName === "WorkerRpc") &&
		key === "fetch"
	);
}
function isR2ObjectWriteHttpMetadata(targetName, key) {
	return (
		(targetName === "HeadResult" || targetName === "GetResult") && key === "writeHttpMetadata"
	);
}

// src/workers/core/http.ts
var STATUS_CODES = {
	100: "Continue",
	101: "Switching Protocols",
	102: "Processing",
	103: "Early Hints",
	200: "OK",
	201: "Created",
	202: "Accepted",
	203: "Non-Authoritative Information",
	204: "No Content",
	205: "Reset Content",
	206: "Partial Content",
	207: "Multi-Status",
	208: "Already Reported",
	226: "IM Used",
	300: "Multiple Choices",
	301: "Moved Permanently",
	302: "Found",
	303: "See Other",
	304: "Not Modified",
	305: "Use Proxy",
	307: "Temporary Redirect",
	308: "Permanent Redirect",
	400: "Bad Request",
	401: "Unauthorized",
	402: "Payment Required",
	403: "Forbidden",
	404: "Not Found",
	405: "Method Not Allowed",
	406: "Not Acceptable",
	407: "Proxy Authentication Required",
	408: "Request Timeout",
	409: "Conflict",
	410: "Gone",
	411: "Length Required",
	412: "Precondition Failed",
	413: "Payload Too Large",
	414: "URI Too Long",
	415: "Unsupported Media Type",
	416: "Range Not Satisfiable",
	417: "Expectation Failed",
	418: "I'm a Teapot",
	421: "Misdirected Request",
	422: "Unprocessable Entity",
	423: "Locked",
	424: "Failed Dependency",
	425: "Too Early",
	426: "Upgrade Required",
	428: "Precondition Required",
	429: "Too Many Requests",
	431: "Request Header Fields Too Large",
	451: "Unavailable For Legal Reasons",
	500: "Internal Server Error",
	501: "Not Implemented",
	502: "Bad Gateway",
	503: "Service Unavailable",
	504: "Gateway Timeout",
	505: "HTTP Version Not Supported",
	506: "Variant Also Negotiates",
	507: "Insufficient Storage",
	508: "Loop Detected",
	509: "Bandwidth Limit Exceeded",
	510: "Not Extended",
	511: "Network Authentication Required",
};

// src/workers/core/routing.ts
function matchRoutes(routes, url) {
	for (let route of routes) {
		if (route.protocol && route.protocol !== url.protocol) continue;
		if (route.allowHostnamePrefix) {
			if (!url.hostname.endsWith(route.hostname)) continue;
		} else if (url.hostname !== route.hostname) continue;
		let path = url.pathname + url.search;
		if (route.allowPathSuffix) {
			if (!path.startsWith(route.path)) continue;
		} else if (path !== route.path) continue;
		return route.target;
	}
	return null;
}

// src/workers/core/proxy.worker.ts
import assert2 from "node:assert";
import { Buffer as Buffer2 } from "node:buffer";

// ../../node_modules/.pnpm/devalue@4.3.2/node_modules/devalue/src/utils.js
var DevalueError = class extends Error {
	/**
	 * @param {string} message
	 * @param {string[]} keys
	 */
	constructor(message, keys) {
		super(message), (this.name = "DevalueError"), (this.path = keys.join(""));
	}
};
function is_primitive(thing) {
	return Object(thing) !== thing;
}
var object_proto_names = /* @__PURE__ */ Object.getOwnPropertyNames(Object.prototype)
	.sort()
	.join("\0");
function is_plain_object(thing) {
	let proto = Object.getPrototypeOf(thing);
	return (
		proto === Object.prototype ||
		proto === null ||
		Object.getOwnPropertyNames(proto).sort().join("\0") === object_proto_names
	);
}
function get_type(thing) {
	return Object.prototype.toString.call(thing).slice(8, -1);
}
function get_escaped_char(char) {
	switch (char) {
		case '"':
			return '\\"';
		case "<":
			return "\\u003C";
		case "\\":
			return "\\\\";
		case `
`:
			return "\\n";
		case "\r":
			return "\\r";
		case "	":
			return "\\t";
		case "\b":
			return "\\b";
		case "\f":
			return "\\f";
		case "\u2028":
			return "\\u2028";
		case "\u2029":
			return "\\u2029";
		default:
			return char < " " ? `\\u${char.charCodeAt(0).toString(16).padStart(4, "0")}` : "";
	}
}
function stringify_string(str) {
	let result = "",
		last_pos = 0,
		len = str.length;
	for (let i = 0; i < len; i += 1) {
		let char = str[i],
			replacement = get_escaped_char(char);
		replacement && ((result += str.slice(last_pos, i) + replacement), (last_pos = i + 1));
	}
	return `"${last_pos === 0 ? str : result + str.slice(last_pos)}"`;
}

// ../../node_modules/.pnpm/devalue@4.3.2/node_modules/devalue/src/parse.js
function parse(serialized, revivers) {
	return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
	if (typeof parsed == "number") return hydrate(parsed, !0);
	if (!Array.isArray(parsed) || parsed.length === 0) throw new Error("Invalid input");
	let values =
			/** @type {any[]} */
			parsed,
		hydrated = Array(values.length);
	function hydrate(index, standalone = !1) {
		if (index === -1) return;
		if (index === -3) return NaN;
		if (index === -4) return 1 / 0;
		if (index === -5) return -1 / 0;
		if (index === -6) return -0;
		if (standalone) throw new Error("Invalid input");
		if (index in hydrated) return hydrated[index];
		let value = values[index];
		if (!value || typeof value != "object") hydrated[index] = value;
		else if (Array.isArray(value))
			if (typeof value[0] == "string") {
				let type = value[0],
					reviver = revivers?.[type];
				if (reviver) return (hydrated[index] = reviver(hydrate(value[1])));
				switch (type) {
					case "Date":
						hydrated[index] = new Date(value[1]);
						break;
					case "Set":
						let set = /* @__PURE__ */ new Set();
						hydrated[index] = set;
						for (let i = 1; i < value.length; i += 1) set.add(hydrate(value[i]));
						break;
					case "Map":
						let map = /* @__PURE__ */ new Map();
						hydrated[index] = map;
						for (let i = 1; i < value.length; i += 2)
							map.set(hydrate(value[i]), hydrate(value[i + 1]));
						break;
					case "RegExp":
						hydrated[index] = new RegExp(value[1], value[2]);
						break;
					case "Object":
						hydrated[index] = Object(value[1]);
						break;
					case "BigInt":
						hydrated[index] = BigInt(value[1]);
						break;
					case "null":
						let obj = /* @__PURE__ */ Object.create(null);
						hydrated[index] = obj;
						for (let i = 1; i < value.length; i += 2)
							obj[value[i]] = hydrate(value[i + 1]);
						break;
					default:
						throw new Error(`Unknown type ${type}`);
				}
			} else {
				let array = new Array(value.length);
				hydrated[index] = array;
				for (let i = 0; i < value.length; i += 1) {
					let n = value[i];
					n !== -2 && (array[i] = hydrate(n));
				}
			}
		else {
			let object = {};
			hydrated[index] = object;
			for (let key in value) {
				let n = value[key];
				object[key] = hydrate(n);
			}
		}
		return hydrated[index];
	}
	return hydrate(0);
}

// ../../node_modules/.pnpm/devalue@4.3.2/node_modules/devalue/src/stringify.js
function stringify(value, reducers) {
	let stringified = [],
		indexes = /* @__PURE__ */ new Map(),
		custom = [];
	for (let key in reducers) custom.push({ key, fn: reducers[key] });
	let keys = [],
		p = 0;
	function flatten(thing) {
		if (typeof thing == "function") throw new DevalueError("Cannot stringify a function", keys);
		if (indexes.has(thing)) return indexes.get(thing);
		if (thing === void 0) return -1;
		if (Number.isNaN(thing)) return -3;
		if (thing === 1 / 0) return -4;
		if (thing === -1 / 0) return -5;
		if (thing === 0 && 1 / thing < 0) return -6;
		let index2 = p++;
		indexes.set(thing, index2);
		for (let { key, fn } of custom) {
			let value2 = fn(thing);
			if (value2) return (stringified[index2] = `["${key}",${flatten(value2)}]`), index2;
		}
		let str = "";
		if (is_primitive(thing)) str = stringify_primitive(thing);
		else
			switch (get_type(thing)) {
				case "Number":
				case "String":
				case "Boolean":
					str = `["Object",${stringify_primitive(thing)}]`;
					break;
				case "BigInt":
					str = `["BigInt",${thing}]`;
					break;
				case "Date":
					str = `["Date","${thing.toISOString()}"]`;
					break;
				case "RegExp":
					let { source, flags } = thing;
					str = flags
						? `["RegExp",${stringify_string(source)},"${flags}"]`
						: `["RegExp",${stringify_string(source)}]`;
					break;
				case "Array":
					str = "[";
					for (let i = 0; i < thing.length; i += 1)
						i > 0 && (str += ","),
							i in thing
								? (keys.push(`[${i}]`), (str += flatten(thing[i])), keys.pop())
								: (str += -2);
					str += "]";
					break;
				case "Set":
					str = '["Set"';
					for (let value2 of thing) str += `,${flatten(value2)}`;
					str += "]";
					break;
				case "Map":
					str = '["Map"';
					for (let [key, value2] of thing)
						keys.push(`.get(${is_primitive(key) ? stringify_primitive(key) : "..."})`),
							(str += `,${flatten(key)},${flatten(value2)}`);
					str += "]";
					break;
				default:
					if (!is_plain_object(thing))
						throw new DevalueError("Cannot stringify arbitrary non-POJOs", keys);
					if (Object.getOwnPropertySymbols(thing).length > 0)
						throw new DevalueError("Cannot stringify POJOs with symbolic keys", keys);
					if (Object.getPrototypeOf(thing) === null) {
						str = '["null"';
						for (let key in thing)
							keys.push(`.${key}`),
								(str += `,${stringify_string(key)},${flatten(thing[key])}`),
								keys.pop();
						str += "]";
					} else {
						str = "{";
						let started = !1;
						for (let key in thing)
							started && (str += ","),
								(started = !0),
								keys.push(`.${key}`),
								(str += `${stringify_string(key)}:${flatten(thing[key])}`),
								keys.pop();
						str += "}";
					}
			}
		return (stringified[index2] = str), index2;
	}
	let index = flatten(value);
	return index < 0 ? `${index}` : `[${stringified.join(",")}]`;
}
function stringify_primitive(thing) {
	let type = typeof thing;
	return type === "string"
		? stringify_string(thing)
		: thing instanceof String
			? stringify_string(thing.toString())
			: thing === void 0
				? (-1).toString()
				: thing === 0 && 1 / thing < 0
					? (-6).toString()
					: type === "bigint"
						? `["BigInt","${thing}"]`
						: String(thing);
}

// src/workers/core/proxy.worker.ts
import { readPrefix, reduceError } from "miniflare:shared";

// src/workers/core/devalue.ts
import assert from "node:assert";
import { Buffer } from "node:buffer";
var ALLOWED_ARRAY_BUFFER_VIEW_CONSTRUCTORS = [
		DataView,
		Int8Array,
		Uint8Array,
		Uint8ClampedArray,
		Int16Array,
		Uint16Array,
		Int32Array,
		Uint32Array,
		Float32Array,
		Float64Array,
		BigInt64Array,
		BigUint64Array,
	],
	ALLOWED_ERROR_CONSTRUCTORS = [
		EvalError,
		RangeError,
		ReferenceError,
		SyntaxError,
		TypeError,
		URIError,
		Error,
		// `Error` last so more specific error subclasses preferred
	],
	structuredSerializableReducers = {
		ArrayBuffer(value) {
			if (value instanceof ArrayBuffer) return [Buffer.from(value).toString("base64")];
		},
		ArrayBufferView(value) {
			if (ArrayBuffer.isView(value))
				return [value.constructor.name, value.buffer, value.byteOffset, value.byteLength];
		},
		Error(value) {
			for (let ctor of ALLOWED_ERROR_CONSTRUCTORS)
				if (value instanceof ctor && value.name === ctor.name)
					return [value.name, value.message, value.stack, value.cause];
			if (value instanceof Error) return ["Error", value.message, value.stack, value.cause];
		},
	},
	structuredSerializableRevivers = {
		ArrayBuffer(value) {
			assert(Array.isArray(value));
			let [encoded] = value;
			assert(typeof encoded == "string");
			let view = Buffer.from(encoded, "base64");
			return view.buffer.slice(view.byteOffset, view.byteOffset + view.byteLength);
		},
		ArrayBufferView(value) {
			assert(Array.isArray(value));
			let [name, buffer, byteOffset, byteLength] = value;
			assert(typeof name == "string"),
				assert(buffer instanceof ArrayBuffer),
				assert(typeof byteOffset == "number"),
				assert(typeof byteLength == "number");
			let ctor = globalThis[name];
			assert(ALLOWED_ARRAY_BUFFER_VIEW_CONSTRUCTORS.includes(ctor));
			let length = byteLength;
			return (
				"BYTES_PER_ELEMENT" in ctor && (length /= ctor.BYTES_PER_ELEMENT),
				new ctor(buffer, byteOffset, length)
			);
		},
		Error(value) {
			assert(Array.isArray(value));
			let [name, message, stack, cause] = value;
			assert(typeof name == "string"),
				assert(typeof message == "string"),
				assert(stack === void 0 || typeof stack == "string");
			let ctor = globalThis[name];
			assert(ALLOWED_ERROR_CONSTRUCTORS.includes(ctor));
			let error = new ctor(message, { cause });
			return (error.stack = stack), error;
		},
	};
function createHTTPReducers(impl) {
	return {
		Headers(val) {
			if (val instanceof impl.Headers) return Object.fromEntries(val);
		},
		Request(val) {
			if (val instanceof impl.Request)
				return [val.method, val.url, val.headers, val.cf, val.body];
		},
		Response(val) {
			if (val instanceof impl.Response)
				return [val.status, val.statusText, val.headers, val.cf, val.body];
		},
	};
}
function createHTTPRevivers(impl) {
	return {
		Headers(value) {
			return assert(typeof value == "object" && value !== null), new impl.Headers(value);
		},
		Request(value) {
			assert(Array.isArray(value));
			let [method, url, headers, cf, body] = value;
			return (
				assert(typeof method == "string"),
				assert(typeof url == "string"),
				assert(headers instanceof impl.Headers),
				assert(body === null || impl.isReadableStream(body)),
				new impl.Request(url, {
					method,
					headers,
					cf,
					// @ts-expect-error `duplex` is not required by `workerd` yet
					duplex: body === null ? void 0 : "half",
					body,
				})
			);
		},
		Response(value) {
			assert(Array.isArray(value));
			let [status, statusText, headers, cf, body] = value;
			return (
				assert(typeof status == "number"),
				assert(typeof statusText == "string"),
				assert(headers instanceof impl.Headers),
				assert(body === null || impl.isReadableStream(body)),
				new impl.Response(body, {
					status,
					statusText,
					headers,
					cf,
				})
			);
		},
	};
}
function stringifyWithStreams(impl, value, reducers, allowUnbufferedStream) {
	let unbufferedStream,
		bufferPromises = [],
		streamReducers = {
			ReadableStream(value2) {
				if (impl.isReadableStream(value2))
					return (
						allowUnbufferedStream && unbufferedStream === void 0
							? (unbufferedStream = value2)
							: bufferPromises.push(impl.bufferReadableStream(value2)),
						!0
					);
			},
			Blob(value2) {
				if (value2 instanceof impl.Blob)
					return bufferPromises.push(value2.arrayBuffer()), !0;
			},
			...reducers,
		};
	typeof value == "function" && (value = new __MiniflareFunctionWrapper(value));
	let stringifiedValue = stringify(value, streamReducers);
	return bufferPromises.length === 0
		? { value: stringifiedValue, unbufferedStream }
		: Promise.all(bufferPromises).then(
				(streamBuffers) => (
					(streamReducers.ReadableStream = function (value2) {
						if (impl.isReadableStream(value2))
							return value2 === unbufferedStream ? !0 : streamBuffers.shift();
					}),
					(streamReducers.Blob = function (value2) {
						if (value2 instanceof impl.Blob) {
							let array = [streamBuffers.shift(), value2.type];
							return (
								value2 instanceof impl.File &&
									array.push(value2.name, value2.lastModified),
								array
							);
						}
					}),
					{ value: stringify(value, streamReducers), unbufferedStream }
				),
			);
}
var __MiniflareFunctionWrapper = class {
	constructor(fnWithProps) {
		return new Proxy(this, {
			get: (_, key) =>
				key === "__miniflareWrappedFunction" ? fnWithProps : fnWithProps[key],
		});
	}
};
function parseWithReadableStreams(impl, stringified, revivers) {
	let streamRevivers = {
		ReadableStream(value) {
			return value === !0
				? (assert(stringified.unbufferedStream !== void 0), stringified.unbufferedStream)
				: (assert(value instanceof ArrayBuffer), impl.unbufferReadableStream(value));
		},
		Blob(value) {
			if ((assert(Array.isArray(value)), value.length === 2)) {
				let [buffer, type] = value;
				assert(buffer instanceof ArrayBuffer), assert(typeof type == "string");
				let opts = {};
				return type !== "" && (opts.type = type), new impl.Blob([buffer], opts);
			} else {
				assert(value.length === 4);
				let [buffer, type, name, lastModified] = value;
				assert(buffer instanceof ArrayBuffer),
					assert(typeof type == "string"),
					assert(typeof name == "string"),
					assert(typeof lastModified == "number");
				let opts = { lastModified };
				return type !== "" && (opts.type = type), new impl.File([buffer], name, opts);
			}
		},
		...revivers,
	};
	return parse(stringified.value, streamRevivers);
}

// src/workers/core/proxy.worker.ts
var ENCODER = new TextEncoder(),
	DECODER = new TextDecoder(),
	ALLOWED_HOSTNAMES = ["127.0.0.1", "[::1]", "localhost"],
	WORKERS_PLATFORM_IMPL = {
		Blob,
		File,
		Headers,
		Request,
		Response,
		isReadableStream(value) {
			return value instanceof ReadableStream;
		},
		bufferReadableStream(stream) {
			return new Response(stream).arrayBuffer();
		},
		unbufferReadableStream(buffer) {
			let body = new Response(buffer).body;
			return assert2(body !== null), body;
		},
	},
	objectProtoNames = Object.getOwnPropertyNames(Object.prototype).sort().join("\0");
function isPlainObject(value) {
	let proto = Object.getPrototypeOf(value);
	return value?.constructor?.name === "RpcStub" ||
		(isObject(value) && objectContainsFunctions(value))
		? !1
		: proto === Object.prototype ||
				proto === null ||
				Object.getOwnPropertyNames(proto).sort().join("\0") === objectProtoNames;
}
function objectContainsFunctions(obj) {
	let propertyNames = Object.getOwnPropertyNames(obj),
		propertySymbols = Object.getOwnPropertySymbols(obj),
		properties = [...propertyNames, ...propertySymbols];
	for (let property of properties) {
		let entry = obj[property];
		if (typeof entry == "function" || (isObject(entry) && objectContainsFunctions(entry)))
			return !0;
	}
	return !1;
}
function isObject(value) {
	return !!value && typeof value == "object";
}
function getType(value) {
	return Object.prototype.toString.call(value).slice(8, -1);
}
function isInternal(value) {
	return isObject(value) && value[Symbol.for("cloudflare:internal-class")];
}
var ProxyServer = class {
	constructor(_state, env) {
		this.env = env;
		this.heap.set(ProxyAddresses.GLOBAL, globalThis), this.heap.set(ProxyAddresses.ENV, env);
	}
	nextHeapAddress = ProxyAddresses.USER_START;
	heap = /* @__PURE__ */ new Map();
	reducers = {
		...structuredSerializableReducers,
		...createHTTPReducers(WORKERS_PLATFORM_IMPL),
		// Corresponding revivers in `ProxyClient`
		// `Native` reducer *MUST* be applied last
		Native: (value) => {
			let type = getType(value);
			if (
				((type === "Object" || isInternal(value)) && !isPlainObject(value)) ||
				type === "Promise"
			) {
				let address = this.nextHeapAddress++;
				this.heap.set(address, value), assert2(value !== null);
				let name = value?.constructor.name,
					isFunction = value instanceof __MiniflareFunctionWrapper;
				return [address, name, isFunction];
			}
		},
	};
	revivers = {
		...structuredSerializableRevivers,
		...createHTTPRevivers(WORKERS_PLATFORM_IMPL),
		// Corresponding reducers in `ProxyClient`
		Native: (value) => {
			assert2(Array.isArray(value));
			let [address] = value;
			assert2(typeof address == "number");
			let heapValue = this.heap.get(address);
			return (
				assert2(heapValue !== void 0),
				heapValue instanceof Promise && this.heap.delete(address),
				heapValue
			);
		},
	};
	nativeReviver = { Native: this.revivers.Native };
	async fetch(request) {
		try {
			return await this.#fetch(request);
		} catch (e) {
			let error = reduceError(e);
			return Response.json(error, {
				status: 500,
				headers: { [CoreHeaders.ERROR_STACK]: "true" },
			});
		}
	}
	async #fetch(request) {
		let hostHeader = request.headers.get("Host");
		if (hostHeader == null) return new Response(null, { status: 400 });
		try {
			let host = new URL(`http://${hostHeader}`);
			if (!ALLOWED_HOSTNAMES.includes(host.hostname))
				return new Response(null, { status: 401 });
		} catch {
			return new Response(null, { status: 400 });
		}
		let secretHex = request.headers.get(CoreHeaders.OP_SECRET);
		if (secretHex == null) return new Response(null, { status: 401 });
		let expectedSecret = this.env[CoreBindings.DATA_PROXY_SECRET],
			secretBuffer = Buffer2.from(secretHex, "hex");
		if (
			secretBuffer.byteLength !== expectedSecret.byteLength ||
			!crypto.subtle.timingSafeEqual(secretBuffer, expectedSecret)
		)
			return new Response(null, { status: 401 });
		let opHeader = request.headers.get(CoreHeaders.OP),
			targetHeader = request.headers.get(CoreHeaders.OP_TARGET),
			keyHeader = request.headers.get(CoreHeaders.OP_KEY),
			allowAsync = request.headers.get(CoreHeaders.OP_SYNC) === null,
			argsSizeHeader = request.headers.get(CoreHeaders.OP_STRINGIFIED_SIZE),
			contentLengthHeader = request.headers.get("Content-Length");
		if (targetHeader === null) return new Response(null, { status: 400 });
		if (opHeader === ProxyOps.FREE) {
			for (let targetValue of targetHeader.split(",")) {
				let targetAddress = parseInt(targetValue);
				assert2(!Number.isNaN(targetAddress)), this.heap.delete(targetAddress);
			}
			return new Response(null, { status: 204 });
		}
		let target = parse(targetHeader, this.nativeReviver),
			targetName = target.constructor.name,
			status = 200,
			result,
			unbufferedRest;
		if (opHeader === ProxyOps.GET) {
			if (
				((result = keyHeader === null ? target : target[keyHeader]),
				result?.constructor.name === "RpcProperty" && (result = await result),
				typeof result == "function")
			)
				return new Response(null, {
					status: 204,
					headers: { [CoreHeaders.OP_RESULT_TYPE]: "Function" },
				});
		} else if (opHeader === ProxyOps.GET_OWN_DESCRIPTOR) {
			if (keyHeader === null) return new Response(null, { status: 400 });
			let descriptor = Object.getOwnPropertyDescriptor(target, keyHeader);
			descriptor !== void 0 &&
				(result = {
					configurable: descriptor.configurable,
					enumerable: descriptor.enumerable,
					writable: descriptor.writable,
				});
		} else if (opHeader === ProxyOps.GET_OWN_KEYS) result = Object.getOwnPropertyNames(target);
		else if (opHeader === ProxyOps.CALL) {
			assert2(keyHeader !== null);
			let func = target[keyHeader];
			if ((assert2(typeof func == "function"), isFetcherFetch(targetName, keyHeader))) {
				let originalUrl = request.headers.get(CoreHeaders.ORIGINAL_URL),
					url = new URL(originalUrl ?? request.url);
				return (
					(request = new Request(url, request)),
					request.headers.delete(CoreHeaders.OP_SECRET),
					request.headers.delete(CoreHeaders.OP),
					request.headers.delete(CoreHeaders.OP_TARGET),
					request.headers.delete(CoreHeaders.OP_KEY),
					request.headers.delete(CoreHeaders.ORIGINAL_URL),
					request.headers.delete(CoreHeaders.DISABLE_PRETTY_ERROR),
					func.call(target, request)
				);
			}
			let args;
			if (argsSizeHeader === null || argsSizeHeader === contentLengthHeader)
				args = parseWithReadableStreams(
					WORKERS_PLATFORM_IMPL,
					{ value: await request.text() },
					this.revivers,
				);
			else {
				let argsSize = parseInt(argsSizeHeader);
				assert2(!Number.isNaN(argsSize)), assert2(request.body !== null);
				let [encodedArgs, rest] = await readPrefix(request.body, argsSize);
				unbufferedRest = rest;
				let stringifiedArgs = DECODER.decode(encodedArgs);
				args = parseWithReadableStreams(
					WORKERS_PLATFORM_IMPL,
					{ value: stringifiedArgs, unbufferedStream: rest },
					this.revivers,
				);
			}
			assert2(Array.isArray(args));
			try {
				["RpcProperty", "RpcStub"].includes(func.constructor.name)
					? (result = await func(...args))
					: (result = func.apply(target, args)),
					isR2ObjectWriteHttpMetadata(targetName, keyHeader) && (result = args[0]);
			} catch (e) {
				(status = 500), (result = e);
			}
		} else return new Response(null, { status: 404 });
		let headers = new Headers();
		if (allowAsync && result instanceof Promise) {
			try {
				result = await result;
			} catch (e) {
				(status = 500), (result = e);
			}
			headers.append(CoreHeaders.OP_RESULT_TYPE, "Promise");
		}
		if (unbufferedRest !== void 0 && !unbufferedRest.locked)
			try {
				await unbufferedRest.pipeTo(new WritableStream());
			} catch {}
		if (result instanceof ReadableStream)
			return (
				headers.append(CoreHeaders.OP_RESULT_TYPE, "ReadableStream"),
				new Response(result, { status, headers })
			);
		{
			let stringified = await stringifyWithStreams(
				WORKERS_PLATFORM_IMPL,
				result,
				this.reducers,
				/* allowUnbufferedStream */
				allowAsync,
			);
			if (stringified.unbufferedStream === void 0)
				return new Response(stringified.value, { status, headers });
			{
				let body = new IdentityTransformStream(),
					encodedValue = ENCODER.encode(stringified.value),
					encodedSize = encodedValue.byteLength.toString();
				return (
					headers.set(CoreHeaders.OP_STRINGIFIED_SIZE, encodedSize),
					this.#writeWithUnbufferedStream(
						body.writable,
						encodedValue,
						stringified.unbufferedStream,
					),
					new Response(body.readable, { status, headers })
				);
			}
		}
	}
	async #writeWithUnbufferedStream(writable, encodedValue, unbufferedStream) {
		let writer = writable.getWriter();
		await writer.write(encodedValue),
			writer.releaseLock(),
			await unbufferedStream.pipeTo(writable);
	}
};

// src/workers/core/entry.worker.ts
var encoder = new TextEncoder();
function getUserRequest(request, env) {
	let originalUrl = request.headers.get(CoreHeaders.ORIGINAL_URL),
		url = new URL(originalUrl ?? request.url),
		rewriteHeadersFromOriginalUrl = !1,
		proxySharedSecret = request.headers.get(CoreHeaders.PROXY_SHARED_SECRET);
	if (proxySharedSecret) {
		let secretFromHeader = encoder.encode(proxySharedSecret),
			configuredSecret = env[CoreBindings.DATA_PROXY_SHARED_SECRET];
		if (
			secretFromHeader.byteLength === configuredSecret?.byteLength &&
			crypto.subtle.timingSafeEqual(secretFromHeader, configuredSecret)
		)
			rewriteHeadersFromOriginalUrl = !0;
		else
			throw new HttpError(
				400,
				`Disallowed header in request: ${CoreHeaders.PROXY_SHARED_SECRET}=${proxySharedSecret}`,
			);
	}
	let upstreamUrl = env[CoreBindings.TEXT_UPSTREAM_URL];
	if (upstreamUrl !== void 0) {
		let path = url.pathname + url.search;
		path.startsWith("/") && (path = `./${path.substring(1)}`),
			(url = new URL(path, upstreamUrl)),
			(rewriteHeadersFromOriginalUrl = !0);
	}
	if (((request = new Request(url, request)), request.cf === void 0)) {
		let cf = {
			...env[CoreBindings.JSON_CF_BLOB],
			// Defaulting to empty string to preserve undefined `Accept-Encoding`
			// through Wrangler's proxy worker.
			clientAcceptEncoding: request.headers.get("Accept-Encoding") ?? "",
		};
		request = new Request(request, { cf });
	}
	return (
		request.headers.set("Accept-Encoding", "br, gzip"),
		rewriteHeadersFromOriginalUrl && request.headers.set("Host", url.host),
		request.headers.delete(CoreHeaders.PROXY_SHARED_SECRET),
		request.headers.delete(CoreHeaders.ORIGINAL_URL),
		request.headers.delete(CoreHeaders.DISABLE_PRETTY_ERROR),
		request
	);
}
function getTargetService(request, url, env) {
	let service = env[CoreBindings.SERVICE_USER_FALLBACK],
		override = request.headers.get(CoreHeaders.ROUTE_OVERRIDE);
	request.headers.delete(CoreHeaders.ROUTE_OVERRIDE);
	let route = override ?? matchRoutes(env[CoreBindings.JSON_ROUTES], url);
	return (
		route !== null && (service = env[`${CoreBindings.SERVICE_USER_ROUTE_PREFIX}${route}`]),
		service
	);
}
function maybePrettifyError(request, response, env) {
	return response.status !== 500 || response.headers.get(CoreHeaders.ERROR_STACK) === null
		? response
		: env[CoreBindings.SERVICE_LOOPBACK].fetch("http://localhost/core/error", {
				method: "POST",
				headers: request.headers,
				body: response.body,
				cf: { prettyErrorOriginalUrl: request.url },
			});
}
function maybeInjectLiveReload(response, env, ctx) {
	let liveReloadScript = env[CoreBindings.DATA_LIVE_RELOAD_SCRIPT];
	if (
		liveReloadScript === void 0 ||
		!response.headers.get("Content-Type")?.toLowerCase().includes("text/html")
	)
		return response;
	let headers = new Headers(response.headers),
		contentLength = parseInt(headers.get("content-length"));
	isNaN(contentLength) ||
		headers.set("content-length", String(contentLength + liveReloadScript.byteLength));
	let { readable, writable } = new IdentityTransformStream();
	return (
		ctx.waitUntil(
			(async () => {
				await response.body?.pipeTo(writable, { preventClose: !0 });
				let writer = writable.getWriter();
				await writer.write(liveReloadScript), await writer.close();
			})(),
		),
		new Response(readable, {
			status: response.status,
			statusText: response.statusText,
			headers,
		})
	);
}
var acceptEncodingElement = /^(?<coding>[a-z]+|\*)(?:\s*;\s*q=(?<weight>\d+(?:.\d+)?))?$/;
function maybeParseAcceptEncodingElement(element) {
	let match = acceptEncodingElement.exec(element);
	if (match?.groups != null)
		return {
			coding: match.groups.coding,
			weight: match.groups.weight === void 0 ? 1 : parseFloat(match.groups.weight),
		};
}
function parseAcceptEncoding(header) {
	let encodings = [];
	for (let element of header.split(",")) {
		let maybeEncoding = maybeParseAcceptEncodingElement(element.trim());
		maybeEncoding !== void 0 && encodings.push(maybeEncoding);
	}
	return encodings.sort((a, b) => b.weight - a.weight);
}
function ensureAcceptableEncoding(clientAcceptEncoding, response) {
	if (clientAcceptEncoding === null) return response;
	let encodings = parseAcceptEncoding(clientAcceptEncoding);
	if (encodings.length === 0) return response;
	let contentEncoding = response.headers.get("Content-Encoding"),
		contentType = response.headers.get("Content-Type");
	if (
		!isCompressedByCloudflareFL(contentType) ||
		(contentEncoding !== null && contentEncoding !== "gzip" && contentEncoding !== "br")
	)
		return response;
	let desiredEncoding,
		identityDisallowed = !1;
	for (let encoding of encodings)
		if (encoding.weight === 0)
			(encoding.coding === "identity" || encoding.coding === "*") &&
				(identityDisallowed = !0);
		else if (encoding.coding === "gzip" || encoding.coding === "br") {
			desiredEncoding = encoding.coding;
			break;
		} else if (encoding.coding === "identity") break;
	return desiredEncoding === void 0
		? identityDisallowed
			? new Response("Unsupported Media Type", {
					status: 415,
					headers: { "Accept-Encoding": "br, gzip" },
				})
			: (contentEncoding === null ||
					((response = new Response(response.body, response)),
					response.headers.delete("Content-Encoding")),
				response)
		: (contentEncoding === desiredEncoding ||
				((response = new Response(response.body, response)),
				response.headers.set("Content-Encoding", desiredEncoding)),
			response);
}
function colourFromHTTPStatus(status) {
	return 200 <= status && status < 300
		? green
		: 400 <= status && status < 500
			? yellow
			: 500 <= status
				? red
				: blue;
}
function maybeLogRequest(req, res, env, ctx, startTime) {
	if (env[CoreBindings.JSON_LOG_LEVEL] < LogLevel.INFO) return;
	let url = new URL(req.url),
		statusText = (res.statusText.trim() || STATUS_CODES[res.status]) ?? "",
		lines = [
			`${bold(req.method)} ${url.pathname} `,
			colourFromHTTPStatus(res.status)(`${bold(res.status)} ${statusText} `),
			grey(`(${Date.now() - startTime}ms)`),
		],
		message = reset(lines.join(""));
	ctx.waitUntil(
		env[CoreBindings.SERVICE_LOOPBACK].fetch("http://localhost/core/log", {
			method: "POST",
			headers: { [SharedHeaders.LOG_LEVEL]: LogLevel.INFO.toString() },
			body: message,
		}),
	);
}
function handleProxy(request, env) {
	let ns = env[CoreBindings.DURABLE_OBJECT_NAMESPACE_PROXY],
		id = ns.idFromName("");
	return ns.get(id).fetch(request);
}
async function handleScheduled(params, service) {
	let time = params.get("time"),
		scheduledTime = time ? new Date(parseInt(time)) : void 0,
		cron = params.get("cron") ?? void 0,
		result = await service.scheduled({
			scheduledTime,
			cron,
		});
	return new Response(result.outcome, {
		status: result.outcome === "ok" ? 200 : 500,
	});
}
var entry_worker_default = {
	async fetch(request, env, ctx) {
		let startTime = Date.now();
		if (request.headers.get(CoreHeaders.OP) !== null) return handleProxy(request, env);
		let disablePrettyErrorPage = request.headers.get(CoreHeaders.DISABLE_PRETTY_ERROR) !== null,
			clientAcceptEncoding = request.headers.get("Accept-Encoding");
		try {
			request = getUserRequest(request, env);
		} catch (e) {
			if (e instanceof HttpError) return e.toResponse();
			throw e;
		}
		let url = new URL(request.url),
			service = getTargetService(request, url, env);
		if (service === void 0) return new Response("No entrypoint worker found", { status: 404 });
		try {
			if (url.pathname === "/cdn-cgi/mf/scheduled")
				return await handleScheduled(url.searchParams, service);
			let response = await service.fetch(request);
			return (
				disablePrettyErrorPage ||
					(response = await maybePrettifyError(request, response, env)),
				(response = maybeInjectLiveReload(response, env, ctx)),
				(response = ensureAcceptableEncoding(clientAcceptEncoding, response)),
				maybeLogRequest(request, response, env, ctx, startTime),
				response
			);
		} catch (e) {
			return new Response(e?.stack ?? String(e), { status: 500 });
		}
	},
};
export { entry_worker_default as default, ProxyServer };
//# sourceMappingURL=entry.worker.js.map
