var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf,
	__hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) =>
	key in obj
		? __defProp(obj, key, { enumerable: !0, configurable: !0, writable: !0, value })
		: (obj[key] = value);
var __require = /* @__PURE__ */ ((x) =>
	typeof require < "u"
		? require
		: typeof Proxy < "u"
			? new Proxy(x, {
					get: (a, b) => (typeof require < "u" ? require : a)[b],
				})
			: x)(function (x) {
	if (typeof require < "u") return require.apply(this, arguments);
	throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) =>
	function () {
		return (
			mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
			mod.exports
		);
	};
var __copyProps = (to, from, except, desc) => {
	if ((from && typeof from == "object") || typeof from == "function")
		for (let key of __getOwnPropNames(from))
			!__hasOwnProp.call(to, key) &&
				key !== except &&
				__defProp(to, key, {
					get: () => from[key],
					enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable,
				});
	return to;
};
var __toESM = (mod, isNodeMode, target) => (
	(target = mod != null ? __create(__getProtoOf(mod)) : {}),
	__copyProps(
		// If the importer is in node compatibility mode or this is not an ESM
		// file that has been converted to a CommonJS file using a Babel-
		// compatible transform (i.e. "__esModule" has not been set), then set
		// "default" to the CommonJS "module.exports" for node compatibility.
		isNodeMode || !mod || !mod.__esModule
			? __defProp(target, "default", { value: mod, enumerable: !0 })
			: target,
		mod,
	)
);
var __publicField = (obj, key, value) => (
		__defNormalProp(obj, typeof key != "symbol" ? key + "" : key, value), value
	),
	__accessCheck = (obj, member, msg) => {
		if (!member.has(obj)) throw TypeError("Cannot " + msg);
	};
var __privateGet = (obj, member, getter) => (
		__accessCheck(obj, member, "read from private field"),
		getter ? getter.call(obj) : member.get(obj)
	),
	__privateAdd = (obj, member, value) => {
		if (member.has(obj)) throw TypeError("Cannot add the same private member more than once");
		member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
	},
	__privateSet = (obj, member, value, setter) => (
		__accessCheck(obj, member, "write to private field"),
		setter ? setter.call(obj, value) : member.set(obj, value),
		value
	);

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/is.js
var require_is = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/is.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var objectToString = Object.prototype.toString;
		function isError(wat) {
			switch (objectToString.call(wat)) {
				case "[object Error]":
				case "[object Exception]":
				case "[object DOMException]":
					return !0;
				default:
					return isInstanceOf(wat, Error);
			}
		}
		function isBuiltin(wat, className) {
			return objectToString.call(wat) === `[object ${className}]`;
		}
		function isErrorEvent(wat) {
			return isBuiltin(wat, "ErrorEvent");
		}
		function isDOMError(wat) {
			return isBuiltin(wat, "DOMError");
		}
		function isDOMException(wat) {
			return isBuiltin(wat, "DOMException");
		}
		function isString(wat) {
			return isBuiltin(wat, "String");
		}
		function isPrimitive(wat) {
			return wat === null || (typeof wat != "object" && typeof wat != "function");
		}
		function isPlainObject(wat) {
			return isBuiltin(wat, "Object");
		}
		function isEvent(wat) {
			return typeof Event < "u" && isInstanceOf(wat, Event);
		}
		function isElement(wat) {
			return typeof Element < "u" && isInstanceOf(wat, Element);
		}
		function isRegExp(wat) {
			return isBuiltin(wat, "RegExp");
		}
		function isThenable(wat) {
			return !!(wat && wat.then && typeof wat.then == "function");
		}
		function isSyntheticEvent(wat) {
			return (
				isPlainObject(wat) &&
				"nativeEvent" in wat &&
				"preventDefault" in wat &&
				"stopPropagation" in wat
			);
		}
		function isNaN2(wat) {
			return typeof wat == "number" && wat !== wat;
		}
		function isInstanceOf(wat, base) {
			try {
				return wat instanceof base;
			} catch {
				return !1;
			}
		}
		function isVueViewModel(wat) {
			return !!(typeof wat == "object" && wat !== null && (wat.__isVue || wat._isVue));
		}
		exports.isDOMError = isDOMError;
		exports.isDOMException = isDOMException;
		exports.isElement = isElement;
		exports.isError = isError;
		exports.isErrorEvent = isErrorEvent;
		exports.isEvent = isEvent;
		exports.isInstanceOf = isInstanceOf;
		exports.isNaN = isNaN2;
		exports.isPlainObject = isPlainObject;
		exports.isPrimitive = isPrimitive;
		exports.isRegExp = isRegExp;
		exports.isString = isString;
		exports.isSyntheticEvent = isSyntheticEvent;
		exports.isThenable = isThenable;
		exports.isVueViewModel = isVueViewModel;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/string.js
var require_string = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/string.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is();
		function truncate(str, max = 0) {
			return typeof str != "string" || max === 0 || str.length <= max
				? str
				: `${str.slice(0, max)}...`;
		}
		function snipLine(line, colno) {
			let newLine = line,
				lineLength = newLine.length;
			if (lineLength <= 150) return newLine;
			colno > lineLength && (colno = lineLength);
			let start = Math.max(colno - 60, 0);
			start < 5 && (start = 0);
			let end = Math.min(start + 140, lineLength);
			return (
				end > lineLength - 5 && (end = lineLength),
				end === lineLength && (start = Math.max(end - 140, 0)),
				(newLine = newLine.slice(start, end)),
				start > 0 && (newLine = `'{snip} ${newLine}`),
				end < lineLength && (newLine += " {snip}"),
				newLine
			);
		}
		function safeJoin(input, delimiter) {
			if (!Array.isArray(input)) return "";
			let output = [];
			for (let i = 0; i < input.length; i++) {
				let value = input[i];
				try {
					is.isVueViewModel(value)
						? output.push("[VueViewModel]")
						: output.push(String(value));
				} catch {
					output.push("[value cannot be serialized]");
				}
			}
			return output.join(delimiter);
		}
		function isMatchingPattern(value, pattern, requireExactStringMatch = !1) {
			return is.isString(value)
				? is.isRegExp(pattern)
					? pattern.test(value)
					: is.isString(pattern)
						? requireExactStringMatch
							? value === pattern
							: value.includes(pattern)
						: !1
				: !1;
		}
		function stringMatchesSomePattern(testString, patterns = [], requireExactStringMatch = !1) {
			return patterns.some((pattern) =>
				isMatchingPattern(testString, pattern, requireExactStringMatch),
			);
		}
		exports.isMatchingPattern = isMatchingPattern;
		exports.safeJoin = safeJoin;
		exports.snipLine = snipLine;
		exports.stringMatchesSomePattern = stringMatchesSomePattern;
		exports.truncate = truncate;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/aggregate-errors.js
var require_aggregate_errors = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/aggregate-errors.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			string = require_string();
		function applyAggregateErrorsToEvent(
			exceptionFromErrorImplementation,
			parser,
			maxValueLimit = 250,
			key,
			limit,
			event,
			hint,
		) {
			if (
				!event.exception ||
				!event.exception.values ||
				!hint ||
				!is.isInstanceOf(hint.originalException, Error)
			)
				return;
			let originalException =
				event.exception.values.length > 0
					? event.exception.values[event.exception.values.length - 1]
					: void 0;
			originalException &&
				(event.exception.values = truncateAggregateExceptions(
					aggregateExceptionsFromError(
						exceptionFromErrorImplementation,
						parser,
						limit,
						hint.originalException,
						key,
						event.exception.values,
						originalException,
						0,
					),
					maxValueLimit,
				));
		}
		function aggregateExceptionsFromError(
			exceptionFromErrorImplementation,
			parser,
			limit,
			error,
			key,
			prevExceptions,
			exception,
			exceptionId,
		) {
			if (prevExceptions.length >= limit + 1) return prevExceptions;
			let newExceptions = [...prevExceptions];
			if (is.isInstanceOf(error[key], Error)) {
				applyExceptionGroupFieldsForParentException(exception, exceptionId);
				let newException = exceptionFromErrorImplementation(parser, error[key]),
					newExceptionId = newExceptions.length;
				applyExceptionGroupFieldsForChildException(
					newException,
					key,
					newExceptionId,
					exceptionId,
				),
					(newExceptions = aggregateExceptionsFromError(
						exceptionFromErrorImplementation,
						parser,
						limit,
						error[key],
						key,
						[newException, ...newExceptions],
						newException,
						newExceptionId,
					));
			}
			return (
				Array.isArray(error.errors) &&
					error.errors.forEach((childError, i) => {
						if (is.isInstanceOf(childError, Error)) {
							applyExceptionGroupFieldsForParentException(exception, exceptionId);
							let newException = exceptionFromErrorImplementation(parser, childError),
								newExceptionId = newExceptions.length;
							applyExceptionGroupFieldsForChildException(
								newException,
								`errors[${i}]`,
								newExceptionId,
								exceptionId,
							),
								(newExceptions = aggregateExceptionsFromError(
									exceptionFromErrorImplementation,
									parser,
									limit,
									childError,
									key,
									[newException, ...newExceptions],
									newException,
									newExceptionId,
								));
						}
					}),
				newExceptions
			);
		}
		function applyExceptionGroupFieldsForParentException(exception, exceptionId) {
			(exception.mechanism = exception.mechanism || { type: "generic", handled: !0 }),
				(exception.mechanism = {
					...exception.mechanism,
					is_exception_group: !0,
					exception_id: exceptionId,
				});
		}
		function applyExceptionGroupFieldsForChildException(
			exception,
			source,
			exceptionId,
			parentId,
		) {
			(exception.mechanism = exception.mechanism || { type: "generic", handled: !0 }),
				(exception.mechanism = {
					...exception.mechanism,
					type: "chained",
					source,
					exception_id: exceptionId,
					parent_id: parentId,
				});
		}
		function truncateAggregateExceptions(exceptions, maxValueLength) {
			return exceptions.map(
				(exception) => (
					exception.value &&
						(exception.value = string.truncate(exception.value, maxValueLength)),
					exception
				),
			);
		}
		exports.applyAggregateErrorsToEvent = applyAggregateErrorsToEvent;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/worldwide.js
var require_worldwide = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/worldwide.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function isGlobalObj(obj) {
			return obj && obj.Math == Math ? obj : void 0;
		}
		var GLOBAL_OBJ =
			(typeof globalThis == "object" && isGlobalObj(globalThis)) || // eslint-disable-next-line no-restricted-globals
			(typeof window == "object" && isGlobalObj(window)) ||
			(typeof self == "object" && isGlobalObj(self)) ||
			(typeof global == "object" && isGlobalObj(global)) ||
			(function () {
				return this;
			})() ||
			{};
		function getGlobalObject() {
			return GLOBAL_OBJ;
		}
		function getGlobalSingleton(name, creator, obj) {
			let gbl = obj || GLOBAL_OBJ,
				__SENTRY__ = (gbl.__SENTRY__ = gbl.__SENTRY__ || {});
			return __SENTRY__[name] || (__SENTRY__[name] = creator());
		}
		exports.GLOBAL_OBJ = GLOBAL_OBJ;
		exports.getGlobalObject = getGlobalObject;
		exports.getGlobalSingleton = getGlobalSingleton;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/browser.js
var require_browser = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/browser.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			worldwide = require_worldwide(),
			WINDOW = worldwide.getGlobalObject(),
			DEFAULT_MAX_STRING_LENGTH = 80;
		function htmlTreeAsString(elem, options = {}) {
			if (!elem) return "<unknown>";
			try {
				let currentElem = elem,
					MAX_TRAVERSE_HEIGHT = 5,
					out = [],
					height = 0,
					len = 0,
					separator = " > ",
					sepLength = separator.length,
					nextStr,
					keyAttrs = Array.isArray(options) ? options : options.keyAttrs,
					maxStringLength =
						(!Array.isArray(options) && options.maxStringLength) ||
						DEFAULT_MAX_STRING_LENGTH;
				for (
					;
					currentElem &&
					height++ < MAX_TRAVERSE_HEIGHT &&
					((nextStr = _htmlElementAsString(currentElem, keyAttrs)),
					!(
						nextStr === "html" ||
						(height > 1 &&
							len + out.length * sepLength + nextStr.length >= maxStringLength)
					));

				)
					out.push(nextStr),
						(len += nextStr.length),
						(currentElem = currentElem.parentNode);
				return out.reverse().join(separator);
			} catch {
				return "<unknown>";
			}
		}
		function _htmlElementAsString(el, keyAttrs) {
			let elem = el,
				out = [],
				className,
				classes,
				key,
				attr,
				i;
			if (!elem || !elem.tagName) return "";
			out.push(elem.tagName.toLowerCase());
			let keyAttrPairs =
				keyAttrs && keyAttrs.length
					? keyAttrs
							.filter((keyAttr) => elem.getAttribute(keyAttr))
							.map((keyAttr) => [keyAttr, elem.getAttribute(keyAttr)])
					: null;
			if (keyAttrPairs && keyAttrPairs.length)
				keyAttrPairs.forEach((keyAttrPair) => {
					out.push(`[${keyAttrPair[0]}="${keyAttrPair[1]}"]`);
				});
			else if (
				(elem.id && out.push(`#${elem.id}`),
				(className = elem.className),
				className && is.isString(className))
			)
				for (classes = className.split(/\s+/), i = 0; i < classes.length; i++)
					out.push(`.${classes[i]}`);
			let allowedAttrs = ["aria-label", "type", "name", "title", "alt"];
			for (i = 0; i < allowedAttrs.length; i++)
				(key = allowedAttrs[i]),
					(attr = elem.getAttribute(key)),
					attr && out.push(`[${key}="${attr}"]`);
			return out.join("");
		}
		function getLocationHref() {
			try {
				return WINDOW.document.location.href;
			} catch {
				return "";
			}
		}
		function getDomElement(selector) {
			return WINDOW.document && WINDOW.document.querySelector
				? WINDOW.document.querySelector(selector)
				: null;
		}
		exports.getDomElement = getDomElement;
		exports.getLocationHref = getLocationHref;
		exports.htmlTreeAsString = htmlTreeAsString;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/logger.js
var require_logger = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/logger.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var worldwide = require_worldwide(),
			PREFIX = "Sentry Logger ",
			CONSOLE_LEVELS = ["debug", "info", "warn", "error", "log", "assert", "trace"],
			originalConsoleMethods = {};
		function consoleSandbox(callback) {
			if (!("console" in worldwide.GLOBAL_OBJ)) return callback();
			let console2 = worldwide.GLOBAL_OBJ.console,
				wrappedFuncs = {},
				wrappedLevels = Object.keys(originalConsoleMethods);
			wrappedLevels.forEach((level) => {
				let originalConsoleMethod = originalConsoleMethods[level];
				(wrappedFuncs[level] = console2[level]), (console2[level] = originalConsoleMethod);
			});
			try {
				return callback();
			} finally {
				wrappedLevels.forEach((level) => {
					console2[level] = wrappedFuncs[level];
				});
			}
		}
		function makeLogger() {
			let enabled = !1,
				logger2 = {
					enable: () => {
						enabled = !0;
					},
					disable: () => {
						enabled = !1;
					},
					isEnabled: () => enabled,
				};
			return (
				typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__
					? CONSOLE_LEVELS.forEach((name) => {
							logger2[name] = (...args) => {
								enabled &&
									consoleSandbox(() => {
										worldwide.GLOBAL_OBJ.console[name](
											`${PREFIX}[${name}]:`,
											...args,
										);
									});
							};
						})
					: CONSOLE_LEVELS.forEach((name) => {
							logger2[name] = () => {};
						}),
				logger2
			);
		}
		var logger = makeLogger();
		exports.CONSOLE_LEVELS = CONSOLE_LEVELS;
		exports.consoleSandbox = consoleSandbox;
		exports.logger = logger;
		exports.originalConsoleMethods = originalConsoleMethods;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/dsn.js
var require_dsn = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/dsn.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var logger = require_logger(),
			DSN_REGEX = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+)?)?@)([\w.-]+)(?::(\d+))?\/(.+)/;
		function isValidProtocol(protocol) {
			return protocol === "http" || protocol === "https";
		}
		function dsnToString(dsn, withPassword = !1) {
			let { host, path, pass, port, projectId, protocol, publicKey } = dsn;
			return `${protocol}://${publicKey}${withPassword && pass ? `:${pass}` : ""}@${host}${port ? `:${port}` : ""}/${path && `${path}/`}${projectId}`;
		}
		function dsnFromString(str) {
			let match = DSN_REGEX.exec(str);
			if (!match) {
				console.error(`Invalid Sentry Dsn: ${str}`);
				return;
			}
			let [protocol, publicKey, pass = "", host, port = "", lastPath] = match.slice(1),
				path = "",
				projectId = lastPath,
				split = projectId.split("/");
			if (
				(split.length > 1 &&
					((path = split.slice(0, -1).join("/")), (projectId = split.pop())),
				projectId)
			) {
				let projectMatch = projectId.match(/^\d+/);
				projectMatch && (projectId = projectMatch[0]);
			}
			return dsnFromComponents({ host, pass, path, projectId, port, protocol, publicKey });
		}
		function dsnFromComponents(components) {
			return {
				protocol: components.protocol,
				publicKey: components.publicKey || "",
				pass: components.pass || "",
				host: components.host,
				port: components.port || "",
				path: components.path || "",
				projectId: components.projectId,
			};
		}
		function validateDsn(dsn) {
			if (!(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__)) return !0;
			let { port, projectId, protocol } = dsn;
			return ["protocol", "publicKey", "host", "projectId"].find((component) =>
				dsn[component]
					? !1
					: (logger.logger.error(`Invalid Sentry Dsn: ${component} missing`), !0),
			)
				? !1
				: projectId.match(/^\d+$/)
					? isValidProtocol(protocol)
						? port && isNaN(parseInt(port, 10))
							? (logger.logger.error(`Invalid Sentry Dsn: Invalid port ${port}`), !1)
							: !0
						: (logger.logger.error(`Invalid Sentry Dsn: Invalid protocol ${protocol}`),
							!1)
					: (logger.logger.error(`Invalid Sentry Dsn: Invalid projectId ${projectId}`),
						!1);
		}
		function makeDsn(from) {
			let components =
				typeof from == "string" ? dsnFromString(from) : dsnFromComponents(from);
			if (!(!components || !validateDsn(components))) return components;
		}
		exports.dsnFromString = dsnFromString;
		exports.dsnToString = dsnToString;
		exports.makeDsn = makeDsn;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/error.js
var require_error = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/error.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var SentryError = class extends Error {
			/** Display name of this error instance. */
			constructor(message, logLevel = "warn") {
				super(message),
					(this.message = message),
					(this.name = new.target.prototype.constructor.name),
					Object.setPrototypeOf(this, new.target.prototype),
					(this.logLevel = logLevel);
			}
		};
		exports.SentryError = SentryError;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/object.js
var require_object = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/object.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var browser = require_browser(),
			is = require_is(),
			logger = require_logger(),
			string = require_string();
		function fill(source, name, replacementFactory) {
			if (!(name in source)) return;
			let original = source[name],
				wrapped = replacementFactory(original);
			typeof wrapped == "function" && markFunctionWrapped(wrapped, original),
				(source[name] = wrapped);
		}
		function addNonEnumerableProperty(obj, name, value) {
			try {
				Object.defineProperty(obj, name, {
					// enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
					value,
					writable: !0,
					configurable: !0,
				});
			} catch {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					logger.logger.log(
						`Failed to add non-enumerable property "${name}" to object`,
						obj,
					);
			}
		}
		function markFunctionWrapped(wrapped, original) {
			try {
				let proto = original.prototype || {};
				(wrapped.prototype = original.prototype = proto),
					addNonEnumerableProperty(wrapped, "__sentry_original__", original);
			} catch {}
		}
		function getOriginalFunction(func) {
			return func.__sentry_original__;
		}
		function urlEncode(object) {
			return Object.keys(object)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(object[key])}`)
				.join("&");
		}
		function convertToPlainObject(value) {
			if (is.isError(value))
				return {
					message: value.message,
					name: value.name,
					stack: value.stack,
					...getOwnProperties(value),
				};
			if (is.isEvent(value)) {
				let newObj = {
					type: value.type,
					target: serializeEventTarget(value.target),
					currentTarget: serializeEventTarget(value.currentTarget),
					...getOwnProperties(value),
				};
				return (
					typeof CustomEvent < "u" &&
						is.isInstanceOf(value, CustomEvent) &&
						(newObj.detail = value.detail),
					newObj
				);
			} else return value;
		}
		function serializeEventTarget(target) {
			try {
				return is.isElement(target)
					? browser.htmlTreeAsString(target)
					: Object.prototype.toString.call(target);
			} catch {
				return "<unknown>";
			}
		}
		function getOwnProperties(obj) {
			if (typeof obj == "object" && obj !== null) {
				let extractedProps = {};
				for (let property in obj)
					Object.prototype.hasOwnProperty.call(obj, property) &&
						(extractedProps[property] = obj[property]);
				return extractedProps;
			} else return {};
		}
		function extractExceptionKeysForMessage(exception, maxLength = 40) {
			let keys = Object.keys(convertToPlainObject(exception));
			if ((keys.sort(), !keys.length)) return "[object has no keys]";
			if (keys[0].length >= maxLength) return string.truncate(keys[0], maxLength);
			for (let includedKeys = keys.length; includedKeys > 0; includedKeys--) {
				let serialized = keys.slice(0, includedKeys).join(", ");
				if (!(serialized.length > maxLength))
					return includedKeys === keys.length
						? serialized
						: string.truncate(serialized, maxLength);
			}
			return "";
		}
		function dropUndefinedKeys(inputValue) {
			return _dropUndefinedKeys(inputValue, /* @__PURE__ */ new Map());
		}
		function _dropUndefinedKeys(inputValue, memoizationMap) {
			if (is.isPlainObject(inputValue)) {
				let memoVal = memoizationMap.get(inputValue);
				if (memoVal !== void 0) return memoVal;
				let returnValue = {};
				memoizationMap.set(inputValue, returnValue);
				for (let key of Object.keys(inputValue))
					typeof inputValue[key] < "u" &&
						(returnValue[key] = _dropUndefinedKeys(inputValue[key], memoizationMap));
				return returnValue;
			}
			if (Array.isArray(inputValue)) {
				let memoVal = memoizationMap.get(inputValue);
				if (memoVal !== void 0) return memoVal;
				let returnValue = [];
				return (
					memoizationMap.set(inputValue, returnValue),
					inputValue.forEach((item) => {
						returnValue.push(_dropUndefinedKeys(item, memoizationMap));
					}),
					returnValue
				);
			}
			return inputValue;
		}
		function objectify(wat) {
			let objectified;
			switch (!0) {
				case wat == null:
					objectified = new String(wat);
					break;
				case typeof wat == "symbol" || typeof wat == "bigint":
					objectified = Object(wat);
					break;
				case is.isPrimitive(wat):
					objectified = new wat.constructor(wat);
					break;
				default:
					objectified = wat;
					break;
			}
			return objectified;
		}
		exports.addNonEnumerableProperty = addNonEnumerableProperty;
		exports.convertToPlainObject = convertToPlainObject;
		exports.dropUndefinedKeys = dropUndefinedKeys;
		exports.extractExceptionKeysForMessage = extractExceptionKeysForMessage;
		exports.fill = fill;
		exports.getOriginalFunction = getOriginalFunction;
		exports.markFunctionWrapped = markFunctionWrapped;
		exports.objectify = objectify;
		exports.urlEncode = urlEncode;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/node-stack-trace.js
var require_node_stack_trace = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/node-stack-trace.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function filenameIsInApp(filename, isNative = !1) {
			return (
				!(
					isNative ||
					(filename && // It's not internal if it's an absolute linux path
						!filename.startsWith("/") && // It's not internal if it's an absolute windows path
						!filename.includes(":\\") && // It's not internal if the path is starting with a dot
						!filename.startsWith(".") && // It's not internal if the frame has a protocol. In node, this is usually the case if the file got pre-processed with a bundler like webpack
						!filename.match(/^[a-zA-Z]([a-zA-Z0-9.\-+])*:\/\//))
				) &&
				filename !== void 0 &&
				!filename.includes("node_modules/")
			);
		}
		function node(getModule) {
			let FILENAME_MATCH = /^\s*[-]{4,}$/,
				FULL_MATCH = /at (?:async )?(?:(.+?)\s+\()?(?:(.+):(\d+):(\d+)?|([^)]+))\)?/;
			return (line) => {
				let lineMatch = line.match(FULL_MATCH);
				if (lineMatch) {
					let object, method, functionName, typeName, methodName;
					if (lineMatch[1]) {
						functionName = lineMatch[1];
						let methodStart = functionName.lastIndexOf(".");
						if (
							(functionName[methodStart - 1] === "." && methodStart--,
							methodStart > 0)
						) {
							(object = functionName.slice(0, methodStart)),
								(method = functionName.slice(methodStart + 1));
							let objectEnd = object.indexOf(".Module");
							objectEnd > 0 &&
								((functionName = functionName.slice(objectEnd + 1)),
								(object = object.slice(0, objectEnd)));
						}
						typeName = void 0;
					}
					method && ((typeName = object), (methodName = method)),
						method === "<anonymous>" &&
							((methodName = void 0), (functionName = void 0)),
						functionName === void 0 &&
							((methodName = methodName || "<anonymous>"),
							(functionName = typeName ? `${typeName}.${methodName}` : methodName));
					let filename =
							lineMatch[2] && lineMatch[2].startsWith("file://")
								? lineMatch[2].slice(7)
								: lineMatch[2],
						isNative = lineMatch[5] === "native";
					return (
						!filename && lineMatch[5] && !isNative && (filename = lineMatch[5]),
						{
							filename,
							module: getModule ? getModule(filename) : void 0,
							function: functionName,
							lineno: parseInt(lineMatch[3], 10) || void 0,
							colno: parseInt(lineMatch[4], 10) || void 0,
							in_app: filenameIsInApp(filename, isNative),
						}
					);
				}
				if (line.match(FILENAME_MATCH))
					return {
						filename: line,
					};
			};
		}
		exports.filenameIsInApp = filenameIsInApp;
		exports.node = node;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/stacktrace.js
var require_stacktrace = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/stacktrace.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var nodeStackTrace = require_node_stack_trace(),
			STACKTRACE_FRAME_LIMIT = 50,
			WEBPACK_ERROR_REGEXP = /\(error: (.*)\)/,
			STRIP_FRAME_REGEXP = /captureMessage|captureException/;
		function createStackParser(...parsers) {
			let sortedParsers = parsers.sort((a, b) => a[0] - b[0]).map((p) => p[1]);
			return (stack, skipFirst = 0) => {
				let frames = [],
					lines = stack.split(`
`);
				for (let i = skipFirst; i < lines.length; i++) {
					let line = lines[i];
					if (line.length > 1024) continue;
					let cleanedLine = WEBPACK_ERROR_REGEXP.test(line)
						? line.replace(WEBPACK_ERROR_REGEXP, "$1")
						: line;
					if (!cleanedLine.match(/\S*Error: /)) {
						for (let parser of sortedParsers) {
							let frame = parser(cleanedLine);
							if (frame) {
								frames.push(frame);
								break;
							}
						}
						if (frames.length >= STACKTRACE_FRAME_LIMIT) break;
					}
				}
				return stripSentryFramesAndReverse(frames);
			};
		}
		function stackParserFromStackParserOptions(stackParser) {
			return Array.isArray(stackParser) ? createStackParser(...stackParser) : stackParser;
		}
		function stripSentryFramesAndReverse(stack) {
			if (!stack.length) return [];
			let localStack = Array.from(stack);
			return (
				/sentryWrapped/.test(localStack[localStack.length - 1].function || "") &&
					localStack.pop(),
				localStack.reverse(),
				STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "") &&
					(localStack.pop(),
					STRIP_FRAME_REGEXP.test(localStack[localStack.length - 1].function || "") &&
						localStack.pop()),
				localStack.slice(0, STACKTRACE_FRAME_LIMIT).map((frame) => ({
					...frame,
					filename: frame.filename || localStack[localStack.length - 1].filename,
					function: frame.function || "?",
				}))
			);
		}
		var defaultFunctionName = "<anonymous>";
		function getFunctionName(fn) {
			try {
				return !fn || typeof fn != "function"
					? defaultFunctionName
					: fn.name || defaultFunctionName;
			} catch {
				return defaultFunctionName;
			}
		}
		function nodeStackLineParser(getModule) {
			return [90, nodeStackTrace.node(getModule)];
		}
		exports.filenameIsInApp = nodeStackTrace.filenameIsInApp;
		exports.createStackParser = createStackParser;
		exports.getFunctionName = getFunctionName;
		exports.nodeStackLineParser = nodeStackLineParser;
		exports.stackParserFromStackParserOptions = stackParserFromStackParserOptions;
		exports.stripSentryFramesAndReverse = stripSentryFramesAndReverse;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/supports.js
var require_supports = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/supports.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var logger = require_logger(),
			worldwide = require_worldwide(),
			WINDOW = worldwide.getGlobalObject();
		function supportsErrorEvent() {
			try {
				return new ErrorEvent(""), !0;
			} catch {
				return !1;
			}
		}
		function supportsDOMError() {
			try {
				return new DOMError(""), !0;
			} catch {
				return !1;
			}
		}
		function supportsDOMException() {
			try {
				return new DOMException(""), !0;
			} catch {
				return !1;
			}
		}
		function supportsFetch() {
			if (!("fetch" in WINDOW)) return !1;
			try {
				return new Headers(), new Request("http://www.example.com"), new Response(), !0;
			} catch {
				return !1;
			}
		}
		function isNativeFetch(func) {
			return func && /^function fetch\(\)\s+\{\s+\[native code\]\s+\}$/.test(func.toString());
		}
		function supportsNativeFetch() {
			if (!supportsFetch()) return !1;
			if (isNativeFetch(WINDOW.fetch)) return !0;
			let result = !1,
				doc = WINDOW.document;
			if (doc && typeof doc.createElement == "function")
				try {
					let sandbox = doc.createElement("iframe");
					(sandbox.hidden = !0),
						doc.head.appendChild(sandbox),
						sandbox.contentWindow &&
							sandbox.contentWindow.fetch &&
							(result = isNativeFetch(sandbox.contentWindow.fetch)),
						doc.head.removeChild(sandbox);
				} catch (err) {
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						logger.logger.warn(
							"Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ",
							err,
						);
				}
			return result;
		}
		function supportsReportingObserver() {
			return "ReportingObserver" in WINDOW;
		}
		function supportsReferrerPolicy() {
			if (!supportsFetch()) return !1;
			try {
				return (
					new Request("_", {
						referrerPolicy: "origin",
					}),
					!0
				);
			} catch {
				return !1;
			}
		}
		exports.isNativeFetch = isNativeFetch;
		exports.supportsDOMError = supportsDOMError;
		exports.supportsDOMException = supportsDOMException;
		exports.supportsErrorEvent = supportsErrorEvent;
		exports.supportsFetch = supportsFetch;
		exports.supportsNativeFetch = supportsNativeFetch;
		exports.supportsReferrerPolicy = supportsReferrerPolicy;
		exports.supportsReportingObserver = supportsReportingObserver;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/vendor/supportsHistory.js
var require_supportsHistory = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/vendor/supportsHistory.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var worldwide = require_worldwide(),
			WINDOW = worldwide.getGlobalObject();
		function supportsHistory() {
			let chrome = WINDOW.chrome,
				isChromePackagedApp = chrome && chrome.app && chrome.app.runtime,
				hasHistoryApi =
					"history" in WINDOW &&
					!!WINDOW.history.pushState &&
					!!WINDOW.history.replaceState;
			return !isChromePackagedApp && hasHistoryApi;
		}
		exports.supportsHistory = supportsHistory;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/instrument.js
var require_instrument = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/instrument.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			logger = require_logger(),
			object = require_object(),
			stacktrace = require_stacktrace(),
			supports = require_supports(),
			worldwide = require_worldwide(),
			supportsHistory = require_supportsHistory(),
			WINDOW = worldwide.getGlobalObject(),
			SENTRY_XHR_DATA_KEY = "__sentry_xhr_v2__",
			handlers = {},
			instrumented = {};
		function instrument(type) {
			if (!instrumented[type])
				switch (((instrumented[type] = !0), type)) {
					case "console":
						instrumentConsole();
						break;
					case "dom":
						instrumentDOM();
						break;
					case "xhr":
						instrumentXHR();
						break;
					case "fetch":
						instrumentFetch();
						break;
					case "history":
						instrumentHistory();
						break;
					case "error":
						instrumentError();
						break;
					case "unhandledrejection":
						instrumentUnhandledRejection();
						break;
					default:
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							logger.logger.warn("unknown instrumentation type:", type);
						return;
				}
		}
		function addInstrumentationHandler(type, callback) {
			(handlers[type] = handlers[type] || []),
				handlers[type].push(callback),
				instrument(type);
		}
		function resetInstrumentationHandlers() {
			Object.keys(handlers).forEach((key) => {
				handlers[key] = void 0;
			});
		}
		function triggerHandlers(type, data) {
			if (!(!type || !handlers[type]))
				for (let handler of handlers[type] || [])
					try {
						handler(data);
					} catch (e) {
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							logger.logger.error(
								`Error while triggering instrumentation handler.
Type: ${type}
Name: ${stacktrace.getFunctionName(handler)}
Error:`,
								e,
							);
					}
		}
		function instrumentConsole() {
			"console" in worldwide.GLOBAL_OBJ &&
				logger.CONSOLE_LEVELS.forEach(function (level) {
					level in worldwide.GLOBAL_OBJ.console &&
						object.fill(
							worldwide.GLOBAL_OBJ.console,
							level,
							function (originalConsoleMethod) {
								return (
									(logger.originalConsoleMethods[level] = originalConsoleMethod),
									function (...args) {
										triggerHandlers("console", { args, level });
										let log = logger.originalConsoleMethods[level];
										log && log.apply(worldwide.GLOBAL_OBJ.console, args);
									}
								);
							},
						);
				});
		}
		function instrumentFetch() {
			supports.supportsNativeFetch() &&
				object.fill(worldwide.GLOBAL_OBJ, "fetch", function (originalFetch) {
					return function (...args) {
						let { method, url } = parseFetchArgs(args),
							handlerData = {
								args,
								fetchData: {
									method,
									url,
								},
								startTimestamp: Date.now(),
							};
						return (
							triggerHandlers("fetch", {
								...handlerData,
							}),
							originalFetch.apply(worldwide.GLOBAL_OBJ, args).then(
								(response) => (
									triggerHandlers("fetch", {
										...handlerData,
										endTimestamp: Date.now(),
										response,
									}),
									response
								),
								(error) => {
									throw (
										(triggerHandlers("fetch", {
											...handlerData,
											endTimestamp: Date.now(),
											error,
										}),
										error)
									);
								},
							)
						);
					};
				});
		}
		function hasProp(obj, prop) {
			return !!obj && typeof obj == "object" && !!obj[prop];
		}
		function getUrlFromResource(resource) {
			return typeof resource == "string"
				? resource
				: resource
					? hasProp(resource, "url")
						? resource.url
						: resource.toString
							? resource.toString()
							: ""
					: "";
		}
		function parseFetchArgs(fetchArgs) {
			if (fetchArgs.length === 0) return { method: "GET", url: "" };
			if (fetchArgs.length === 2) {
				let [url, options] = fetchArgs;
				return {
					url: getUrlFromResource(url),
					method: hasProp(options, "method")
						? String(options.method).toUpperCase()
						: "GET",
				};
			}
			let arg = fetchArgs[0];
			return {
				url: getUrlFromResource(arg),
				method: hasProp(arg, "method") ? String(arg.method).toUpperCase() : "GET",
			};
		}
		function instrumentXHR() {
			if (!WINDOW.XMLHttpRequest) return;
			let xhrproto = XMLHttpRequest.prototype;
			object.fill(xhrproto, "open", function (originalOpen) {
				return function (...args) {
					let startTimestamp = Date.now(),
						url = args[1],
						xhrInfo = (this[SENTRY_XHR_DATA_KEY] = {
							// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
							method: is.isString(args[0]) ? args[0].toUpperCase() : args[0],
							url: args[1],
							request_headers: {},
						});
					is.isString(url) &&
						xhrInfo.method === "POST" &&
						url.match(/sentry_key/) &&
						(this.__sentry_own_request__ = !0);
					let onreadystatechangeHandler = () => {
						let xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
						if (xhrInfo2 && this.readyState === 4) {
							try {
								xhrInfo2.status_code = this.status;
							} catch {}
							triggerHandlers("xhr", {
								args,
								endTimestamp: Date.now(),
								startTimestamp,
								xhr: this,
							});
						}
					};
					return (
						"onreadystatechange" in this && typeof this.onreadystatechange == "function"
							? object.fill(this, "onreadystatechange", function (original) {
									return function (...readyStateArgs) {
										return (
											onreadystatechangeHandler(),
											original.apply(this, readyStateArgs)
										);
									};
								})
							: this.addEventListener("readystatechange", onreadystatechangeHandler),
						object.fill(this, "setRequestHeader", function (original) {
							return function (...setRequestHeaderArgs) {
								let [header, value] = setRequestHeaderArgs,
									xhrInfo2 = this[SENTRY_XHR_DATA_KEY];
								return (
									xhrInfo2 &&
										(xhrInfo2.request_headers[header.toLowerCase()] = value),
									original.apply(this, setRequestHeaderArgs)
								);
							};
						}),
						originalOpen.apply(this, args)
					);
				};
			}),
				object.fill(xhrproto, "send", function (originalSend) {
					return function (...args) {
						let sentryXhrData = this[SENTRY_XHR_DATA_KEY];
						return (
							sentryXhrData && args[0] !== void 0 && (sentryXhrData.body = args[0]),
							triggerHandlers("xhr", {
								args,
								startTimestamp: Date.now(),
								xhr: this,
							}),
							originalSend.apply(this, args)
						);
					};
				});
		}
		var lastHref;
		function instrumentHistory() {
			if (!supportsHistory.supportsHistory()) return;
			let oldOnPopState = WINDOW.onpopstate;
			WINDOW.onpopstate = function (...args) {
				let to = WINDOW.location.href,
					from = lastHref;
				if (
					((lastHref = to),
					triggerHandlers("history", {
						from,
						to,
					}),
					oldOnPopState)
				)
					try {
						return oldOnPopState.apply(this, args);
					} catch {}
			};
			function historyReplacementFunction(originalHistoryFunction) {
				return function (...args) {
					let url = args.length > 2 ? args[2] : void 0;
					if (url) {
						let from = lastHref,
							to = String(url);
						(lastHref = to),
							triggerHandlers("history", {
								from,
								to,
							});
					}
					return originalHistoryFunction.apply(this, args);
				};
			}
			object.fill(WINDOW.history, "pushState", historyReplacementFunction),
				object.fill(WINDOW.history, "replaceState", historyReplacementFunction);
		}
		var DEBOUNCE_DURATION = 1e3,
			debounceTimerID,
			lastCapturedEvent;
		function areSimilarDomEvents(a, b) {
			if (a.type !== b.type) return !1;
			try {
				if (a.target !== b.target) return !1;
			} catch {}
			return !0;
		}
		function shouldSkipDOMEvent(event) {
			if (event.type !== "keypress") return !1;
			try {
				let target = event.target;
				if (!target || !target.tagName) return !0;
				if (
					target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA" ||
					target.isContentEditable
				)
					return !1;
			} catch {}
			return !0;
		}
		function makeDOMEventHandler(handler, globalListener = !1) {
			return (event) => {
				if (!event || event._sentryCaptured || shouldSkipDOMEvent(event)) return;
				object.addNonEnumerableProperty(event, "_sentryCaptured", !0);
				let name = event.type === "keypress" ? "input" : event.type;
				(lastCapturedEvent === void 0 || !areSimilarDomEvents(lastCapturedEvent, event)) &&
					(handler({
						event,
						name,
						global: globalListener,
					}),
					(lastCapturedEvent = event)),
					clearTimeout(debounceTimerID),
					(debounceTimerID = WINDOW.setTimeout(() => {
						lastCapturedEvent = void 0;
					}, DEBOUNCE_DURATION));
			};
		}
		function instrumentDOM() {
			if (!WINDOW.document) return;
			let triggerDOMHandler = triggerHandlers.bind(null, "dom"),
				globalDOMEventHandler = makeDOMEventHandler(triggerDOMHandler, !0);
			WINDOW.document.addEventListener("click", globalDOMEventHandler, !1),
				WINDOW.document.addEventListener("keypress", globalDOMEventHandler, !1),
				["EventTarget", "Node"].forEach((target) => {
					let proto = WINDOW[target] && WINDOW[target].prototype;
					!proto ||
						!proto.hasOwnProperty ||
						!proto.hasOwnProperty("addEventListener") ||
						(object.fill(
							proto,
							"addEventListener",
							function (originalAddEventListener) {
								return function (type, listener, options) {
									if (type === "click" || type == "keypress")
										try {
											let el = this,
												handlers2 =
													(el.__sentry_instrumentation_handlers__ =
														el.__sentry_instrumentation_handlers__ ||
														{}),
												handlerForType = (handlers2[type] = handlers2[
													type
												] || { refCount: 0 });
											if (!handlerForType.handler) {
												let handler =
													makeDOMEventHandler(triggerDOMHandler);
												(handlerForType.handler = handler),
													originalAddEventListener.call(
														this,
														type,
														handler,
														options,
													);
											}
											handlerForType.refCount++;
										} catch {}
									return originalAddEventListener.call(
										this,
										type,
										listener,
										options,
									);
								};
							},
						),
						object.fill(
							proto,
							"removeEventListener",
							function (originalRemoveEventListener) {
								return function (type, listener, options) {
									if (type === "click" || type == "keypress")
										try {
											let el = this,
												handlers2 =
													el.__sentry_instrumentation_handlers__ || {},
												handlerForType = handlers2[type];
											handlerForType &&
												(handlerForType.refCount--,
												handlerForType.refCount <= 0 &&
													(originalRemoveEventListener.call(
														this,
														type,
														handlerForType.handler,
														options,
													),
													(handlerForType.handler = void 0),
													delete handlers2[type]),
												Object.keys(handlers2).length === 0 &&
													delete el.__sentry_instrumentation_handlers__);
										} catch {}
									return originalRemoveEventListener.call(
										this,
										type,
										listener,
										options,
									);
								};
							},
						));
				});
		}
		var _oldOnErrorHandler = null;
		function instrumentError() {
			(_oldOnErrorHandler = WINDOW.onerror),
				(WINDOW.onerror = function (msg, url, line, column, error) {
					return (
						triggerHandlers("error", {
							column,
							error,
							line,
							msg,
							url,
						}),
						_oldOnErrorHandler && !_oldOnErrorHandler.__SENTRY_LOADER__
							? _oldOnErrorHandler.apply(this, arguments)
							: !1
					);
				}),
				(WINDOW.onerror.__SENTRY_INSTRUMENTED__ = !0);
		}
		var _oldOnUnhandledRejectionHandler = null;
		function instrumentUnhandledRejection() {
			(_oldOnUnhandledRejectionHandler = WINDOW.onunhandledrejection),
				(WINDOW.onunhandledrejection = function (e) {
					return (
						triggerHandlers("unhandledrejection", e),
						_oldOnUnhandledRejectionHandler &&
						!_oldOnUnhandledRejectionHandler.__SENTRY_LOADER__
							? _oldOnUnhandledRejectionHandler.apply(this, arguments)
							: !0
					);
				}),
				(WINDOW.onunhandledrejection.__SENTRY_INSTRUMENTED__ = !0);
		}
		exports.SENTRY_XHR_DATA_KEY = SENTRY_XHR_DATA_KEY;
		exports.addInstrumentationHandler = addInstrumentationHandler;
		exports.instrumentDOM = instrumentDOM;
		exports.instrumentXHR = instrumentXHR;
		exports.parseFetchArgs = parseFetchArgs;
		exports.resetInstrumentationHandlers = resetInstrumentationHandlers;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/env.js
var require_env = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/env.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function isBrowserBundle() {
			return typeof __SENTRY_BROWSER_BUNDLE__ < "u" && !!__SENTRY_BROWSER_BUNDLE__;
		}
		function getSDKSource() {
			return "npm";
		}
		exports.getSDKSource = getSDKSource;
		exports.isBrowserBundle = isBrowserBundle;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/node.js
var require_node = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/node.js"(
		exports,
		module,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var env = require_env();
		function isNodeEnv() {
			return (
				!env.isBrowserBundle() &&
				Object.prototype.toString.call(typeof process < "u" ? process : 0) ===
					"[object process]"
			);
		}
		function dynamicRequire(mod, request) {
			return mod.require(request);
		}
		function loadModule(moduleName) {
			let mod;
			try {
				mod = dynamicRequire(module, moduleName);
			} catch {}
			try {
				let { cwd } = dynamicRequire(module, "process");
				mod = dynamicRequire(module, `${cwd()}/node_modules/${moduleName}`);
			} catch {}
			return mod;
		}
		exports.dynamicRequire = dynamicRequire;
		exports.isNodeEnv = isNodeEnv;
		exports.loadModule = loadModule;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/isBrowser.js
var require_isBrowser = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/isBrowser.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var node = require_node(),
			worldwide = require_worldwide();
		function isBrowser() {
			return typeof window < "u" && (!node.isNodeEnv() || isElectronNodeRenderer());
		}
		function isElectronNodeRenderer() {
			return (
				// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-explicit-any
				worldwide.GLOBAL_OBJ.process !== void 0 &&
				worldwide.GLOBAL_OBJ.process.type === "renderer"
			);
		}
		exports.isBrowser = isBrowser;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/memo.js
var require_memo = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/memo.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function memoBuilder() {
			let hasWeakSet = typeof WeakSet == "function",
				inner = hasWeakSet ? /* @__PURE__ */ new WeakSet() : [];
			function memoize(obj) {
				if (hasWeakSet) return inner.has(obj) ? !0 : (inner.add(obj), !1);
				for (let i = 0; i < inner.length; i++) if (inner[i] === obj) return !0;
				return inner.push(obj), !1;
			}
			function unmemoize(obj) {
				if (hasWeakSet) inner.delete(obj);
				else
					for (let i = 0; i < inner.length; i++)
						if (inner[i] === obj) {
							inner.splice(i, 1);
							break;
						}
			}
			return [memoize, unmemoize];
		}
		exports.memoBuilder = memoBuilder;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/misc.js
var require_misc = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/misc.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var object = require_object(),
			string = require_string(),
			worldwide = require_worldwide();
		function uuid4() {
			let gbl = worldwide.GLOBAL_OBJ,
				crypto2 = gbl.crypto || gbl.msCrypto,
				getRandomByte = () => Math.random() * 16;
			try {
				if (crypto2 && crypto2.randomUUID) return crypto2.randomUUID().replace(/-/g, "");
				crypto2 &&
					crypto2.getRandomValues &&
					(getRandomByte = () => crypto2.getRandomValues(new Uint8Array(1))[0]);
			} catch {}
			return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(/[018]/g, (c) =>
				// eslint-disable-next-line no-bitwise
				(c ^ ((getRandomByte() & 15) >> (c / 4))).toString(16),
			);
		}
		function getFirstException(event) {
			return event.exception && event.exception.values ? event.exception.values[0] : void 0;
		}
		function getEventDescription(event) {
			let { message, event_id: eventId } = event;
			if (message) return message;
			let firstException = getFirstException(event);
			return firstException
				? firstException.type && firstException.value
					? `${firstException.type}: ${firstException.value}`
					: firstException.type || firstException.value || eventId || "<unknown>"
				: eventId || "<unknown>";
		}
		function addExceptionTypeValue(event, value, type) {
			let exception = (event.exception = event.exception || {}),
				values = (exception.values = exception.values || []),
				firstException = (values[0] = values[0] || {});
			firstException.value || (firstException.value = value || ""),
				firstException.type || (firstException.type = type || "Error");
		}
		function addExceptionMechanism(event, newMechanism) {
			let firstException = getFirstException(event);
			if (!firstException) return;
			let defaultMechanism = { type: "generic", handled: !0 },
				currentMechanism = firstException.mechanism;
			if (
				((firstException.mechanism = {
					...defaultMechanism,
					...currentMechanism,
					...newMechanism,
				}),
				newMechanism && "data" in newMechanism)
			) {
				let mergedData = {
					...(currentMechanism && currentMechanism.data),
					...newMechanism.data,
				};
				firstException.mechanism.data = mergedData;
			}
		}
		var SEMVER_REGEXP =
			/^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
		function parseSemver(input) {
			let match = input.match(SEMVER_REGEXP) || [],
				major = parseInt(match[1], 10),
				minor = parseInt(match[2], 10),
				patch = parseInt(match[3], 10);
			return {
				buildmetadata: match[5],
				major: isNaN(major) ? void 0 : major,
				minor: isNaN(minor) ? void 0 : minor,
				patch: isNaN(patch) ? void 0 : patch,
				prerelease: match[4],
			};
		}
		function addContextToFrame(lines, frame, linesOfContext = 5) {
			if (frame.lineno === void 0) return;
			let maxLines = lines.length,
				sourceLine = Math.max(Math.min(maxLines - 1, frame.lineno - 1), 0);
			(frame.pre_context = lines
				.slice(Math.max(0, sourceLine - linesOfContext), sourceLine)
				.map((line) => string.snipLine(line, 0))),
				(frame.context_line = string.snipLine(
					lines[Math.min(maxLines - 1, sourceLine)],
					frame.colno || 0,
				)),
				(frame.post_context = lines
					.slice(Math.min(sourceLine + 1, maxLines), sourceLine + 1 + linesOfContext)
					.map((line) => string.snipLine(line, 0)));
		}
		function checkOrSetAlreadyCaught(exception) {
			if (exception && exception.__sentry_captured__) return !0;
			try {
				object.addNonEnumerableProperty(exception, "__sentry_captured__", !0);
			} catch {}
			return !1;
		}
		function arrayify(maybeArray) {
			return Array.isArray(maybeArray) ? maybeArray : [maybeArray];
		}
		exports.addContextToFrame = addContextToFrame;
		exports.addExceptionMechanism = addExceptionMechanism;
		exports.addExceptionTypeValue = addExceptionTypeValue;
		exports.arrayify = arrayify;
		exports.checkOrSetAlreadyCaught = checkOrSetAlreadyCaught;
		exports.getEventDescription = getEventDescription;
		exports.parseSemver = parseSemver;
		exports.uuid4 = uuid4;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/normalize.js
var require_normalize = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/normalize.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			memo = require_memo(),
			object = require_object(),
			stacktrace = require_stacktrace();
		function normalize(input, depth = 100, maxProperties = 1 / 0) {
			try {
				return visit("", input, depth, maxProperties);
			} catch (err) {
				return { ERROR: `**non-serializable** (${err})` };
			}
		}
		function normalizeToSize(object2, depth = 3, maxSize = 100 * 1024) {
			let normalized = normalize(object2, depth);
			return jsonSize(normalized) > maxSize
				? normalizeToSize(object2, depth - 1, maxSize)
				: normalized;
		}
		function visit(
			key,
			value,
			depth = 1 / 0,
			maxProperties = 1 / 0,
			memo$1 = memo.memoBuilder(),
		) {
			let [memoize, unmemoize] = memo$1;
			if (
				value == null || // this matches null and undefined -> eqeq not eqeqeq
				(["number", "boolean", "string"].includes(typeof value) && !is.isNaN(value))
			)
				return value;
			let stringified = stringifyValue(key, value);
			if (!stringified.startsWith("[object ")) return stringified;
			if (value.__sentry_skip_normalization__) return value;
			let remainingDepth =
				typeof value.__sentry_override_normalization_depth__ == "number"
					? value.__sentry_override_normalization_depth__
					: depth;
			if (remainingDepth === 0) return stringified.replace("object ", "");
			if (memoize(value)) return "[Circular ~]";
			let valueWithToJSON = value;
			if (valueWithToJSON && typeof valueWithToJSON.toJSON == "function")
				try {
					let jsonValue = valueWithToJSON.toJSON();
					return visit("", jsonValue, remainingDepth - 1, maxProperties, memo$1);
				} catch {}
			let normalized = Array.isArray(value) ? [] : {},
				numAdded = 0,
				visitable = object.convertToPlainObject(value);
			for (let visitKey in visitable) {
				if (!Object.prototype.hasOwnProperty.call(visitable, visitKey)) continue;
				if (numAdded >= maxProperties) {
					normalized[visitKey] = "[MaxProperties ~]";
					break;
				}
				let visitValue = visitable[visitKey];
				(normalized[visitKey] = visit(
					visitKey,
					visitValue,
					remainingDepth - 1,
					maxProperties,
					memo$1,
				)),
					numAdded++;
			}
			return unmemoize(value), normalized;
		}
		function stringifyValue(key, value) {
			try {
				if (key === "domain" && value && typeof value == "object" && value._events)
					return "[Domain]";
				if (key === "domainEmitter") return "[DomainEmitter]";
				if (typeof global < "u" && value === global) return "[Global]";
				if (typeof window < "u" && value === window) return "[Window]";
				if (typeof document < "u" && value === document) return "[Document]";
				if (is.isVueViewModel(value)) return "[VueViewModel]";
				if (is.isSyntheticEvent(value)) return "[SyntheticEvent]";
				if (typeof value == "number" && value !== value) return "[NaN]";
				if (typeof value == "function")
					return `[Function: ${stacktrace.getFunctionName(value)}]`;
				if (typeof value == "symbol") return `[${String(value)}]`;
				if (typeof value == "bigint") return `[BigInt: ${String(value)}]`;
				let objName = getConstructorName(value);
				return /^HTML(\w*)Element$/.test(objName)
					? `[HTMLElement: ${objName}]`
					: `[object ${objName}]`;
			} catch (err) {
				return `**non-serializable** (${err})`;
			}
		}
		function getConstructorName(value) {
			let prototype = Object.getPrototypeOf(value);
			return prototype ? prototype.constructor.name : "null prototype";
		}
		function utf8Length(value) {
			return ~-encodeURI(value).split(/%..|./).length;
		}
		function jsonSize(value) {
			return utf8Length(JSON.stringify(value));
		}
		exports.normalize = normalize;
		exports.normalizeToSize = normalizeToSize;
		exports.walk = visit;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/path.js
var require_path = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/path.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function normalizeArray(parts, allowAboveRoot) {
			let up = 0;
			for (let i = parts.length - 1; i >= 0; i--) {
				let last = parts[i];
				last === "."
					? parts.splice(i, 1)
					: last === ".."
						? (parts.splice(i, 1), up++)
						: up && (parts.splice(i, 1), up--);
			}
			if (allowAboveRoot) for (; up--; up) parts.unshift("..");
			return parts;
		}
		var splitPathRe = /^(\S+:\\|\/?)([\s\S]*?)((?:\.{1,2}|[^/\\]+?|)(\.[^./\\]*|))(?:[/\\]*)$/;
		function splitPath(filename) {
			let truncated =
					filename.length > 1024 ? `<truncated>${filename.slice(-1024)}` : filename,
				parts = splitPathRe.exec(truncated);
			return parts ? parts.slice(1) : [];
		}
		function resolve(...args) {
			let resolvedPath = "",
				resolvedAbsolute = !1;
			for (let i = args.length - 1; i >= -1 && !resolvedAbsolute; i--) {
				let path = i >= 0 ? args[i] : "/";
				path &&
					((resolvedPath = `${path}/${resolvedPath}`),
					(resolvedAbsolute = path.charAt(0) === "/"));
			}
			return (
				(resolvedPath = normalizeArray(
					resolvedPath.split("/").filter((p) => !!p),
					!resolvedAbsolute,
				).join("/")),
				(resolvedAbsolute ? "/" : "") + resolvedPath || "."
			);
		}
		function trim(arr) {
			let start = 0;
			for (; start < arr.length && arr[start] === ""; start++);
			let end = arr.length - 1;
			for (; end >= 0 && arr[end] === ""; end--);
			return start > end ? [] : arr.slice(start, end - start + 1);
		}
		function relative(from, to) {
			(from = resolve(from).slice(1)), (to = resolve(to).slice(1));
			let fromParts = trim(from.split("/")),
				toParts = trim(to.split("/")),
				length = Math.min(fromParts.length, toParts.length),
				samePartsLength = length;
			for (let i = 0; i < length; i++)
				if (fromParts[i] !== toParts[i]) {
					samePartsLength = i;
					break;
				}
			let outputParts = [];
			for (let i = samePartsLength; i < fromParts.length; i++) outputParts.push("..");
			return (
				(outputParts = outputParts.concat(toParts.slice(samePartsLength))),
				outputParts.join("/")
			);
		}
		function normalizePath(path) {
			let isPathAbsolute = isAbsolute(path),
				trailingSlash = path.slice(-1) === "/",
				normalizedPath = normalizeArray(
					path.split("/").filter((p) => !!p),
					!isPathAbsolute,
				).join("/");
			return (
				!normalizedPath && !isPathAbsolute && (normalizedPath = "."),
				normalizedPath && trailingSlash && (normalizedPath += "/"),
				(isPathAbsolute ? "/" : "") + normalizedPath
			);
		}
		function isAbsolute(path) {
			return path.charAt(0) === "/";
		}
		function join(...args) {
			return normalizePath(args.join("/"));
		}
		function dirname(path) {
			let result = splitPath(path),
				root = result[0],
				dir = result[1];
			return !root && !dir ? "." : (dir && (dir = dir.slice(0, dir.length - 1)), root + dir);
		}
		function basename(path, ext) {
			let f = splitPath(path)[2];
			return (
				ext && f.slice(ext.length * -1) === ext && (f = f.slice(0, f.length - ext.length)),
				f
			);
		}
		exports.basename = basename;
		exports.dirname = dirname;
		exports.isAbsolute = isAbsolute;
		exports.join = join;
		exports.normalizePath = normalizePath;
		exports.relative = relative;
		exports.resolve = resolve;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/syncpromise.js
var require_syncpromise = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/syncpromise.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			States;
		(function (States2) {
			States2[(States2.PENDING = 0)] = "PENDING";
			let RESOLVED = 1;
			States2[(States2.RESOLVED = RESOLVED)] = "RESOLVED";
			let REJECTED = 2;
			States2[(States2.REJECTED = REJECTED)] = "REJECTED";
		})(States || (States = {}));
		function resolvedSyncPromise(value) {
			return new SyncPromise((resolve) => {
				resolve(value);
			});
		}
		function rejectedSyncPromise(reason) {
			return new SyncPromise((_, reject) => {
				reject(reason);
			});
		}
		var SyncPromise = class {
			constructor(executor) {
				SyncPromise.prototype.__init.call(this),
					SyncPromise.prototype.__init2.call(this),
					SyncPromise.prototype.__init3.call(this),
					SyncPromise.prototype.__init4.call(this),
					(this._state = States.PENDING),
					(this._handlers = []);
				try {
					executor(this._resolve, this._reject);
				} catch (e) {
					this._reject(e);
				}
			}
			/** JSDoc */
			then(onfulfilled, onrejected) {
				return new SyncPromise((resolve, reject) => {
					this._handlers.push([
						!1,
						(result) => {
							if (!onfulfilled) resolve(result);
							else
								try {
									resolve(onfulfilled(result));
								} catch (e) {
									reject(e);
								}
						},
						(reason) => {
							if (!onrejected) reject(reason);
							else
								try {
									resolve(onrejected(reason));
								} catch (e) {
									reject(e);
								}
						},
					]),
						this._executeHandlers();
				});
			}
			/** JSDoc */
			catch(onrejected) {
				return this.then((val) => val, onrejected);
			}
			/** JSDoc */
			finally(onfinally) {
				return new SyncPromise((resolve, reject) => {
					let val, isRejected;
					return this.then(
						(value) => {
							(isRejected = !1), (val = value), onfinally && onfinally();
						},
						(reason) => {
							(isRejected = !0), (val = reason), onfinally && onfinally();
						},
					).then(() => {
						if (isRejected) {
							reject(val);
							return;
						}
						resolve(val);
					});
				});
			}
			/** JSDoc */
			__init() {
				this._resolve = (value) => {
					this._setResult(States.RESOLVED, value);
				};
			}
			/** JSDoc */
			__init2() {
				this._reject = (reason) => {
					this._setResult(States.REJECTED, reason);
				};
			}
			/** JSDoc */
			__init3() {
				this._setResult = (state, value) => {
					if (this._state === States.PENDING) {
						if (is.isThenable(value)) {
							value.then(this._resolve, this._reject);
							return;
						}
						(this._state = state), (this._value = value), this._executeHandlers();
					}
				};
			}
			/** JSDoc */
			__init4() {
				this._executeHandlers = () => {
					if (this._state === States.PENDING) return;
					let cachedHandlers = this._handlers.slice();
					(this._handlers = []),
						cachedHandlers.forEach((handler) => {
							handler[0] ||
								(this._state === States.RESOLVED && handler[1](this._value),
								this._state === States.REJECTED && handler[2](this._value),
								(handler[0] = !0));
						});
				};
			}
		};
		exports.SyncPromise = SyncPromise;
		exports.rejectedSyncPromise = rejectedSyncPromise;
		exports.resolvedSyncPromise = resolvedSyncPromise;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/promisebuffer.js
var require_promisebuffer = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/promisebuffer.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var error = require_error(),
			syncpromise = require_syncpromise();
		function makePromiseBuffer(limit) {
			let buffer = [];
			function isReady() {
				return limit === void 0 || buffer.length < limit;
			}
			function remove(task) {
				return buffer.splice(buffer.indexOf(task), 1)[0];
			}
			function add(taskProducer) {
				if (!isReady())
					return syncpromise.rejectedSyncPromise(
						new error.SentryError(
							"Not adding Promise because buffer limit was reached.",
						),
					);
				let task = taskProducer();
				return (
					buffer.indexOf(task) === -1 && buffer.push(task),
					task
						.then(() => remove(task))
						.then(null, () => remove(task).then(null, () => {})),
					task
				);
			}
			function drain(timeout) {
				return new syncpromise.SyncPromise((resolve, reject) => {
					let counter = buffer.length;
					if (!counter) return resolve(!0);
					let capturedSetTimeout = setTimeout(() => {
						timeout && timeout > 0 && resolve(!1);
					}, timeout);
					buffer.forEach((item) => {
						syncpromise.resolvedSyncPromise(item).then(() => {
							--counter || (clearTimeout(capturedSetTimeout), resolve(!0));
						}, reject);
					});
				});
			}
			return {
				$: buffer,
				add,
				drain,
			};
		}
		exports.makePromiseBuffer = makePromiseBuffer;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/url.js
var require_url = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/url.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function parseUrl(url) {
			if (!url) return {};
			let match = url.match(/^(([^:/?#]+):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
			if (!match) return {};
			let query = match[6] || "",
				fragment = match[8] || "";
			return {
				host: match[4],
				path: match[5],
				protocol: match[2],
				search: query,
				hash: fragment,
				relative: match[5] + query + fragment,
				// everything minus origin
			};
		}
		function stripUrlQueryAndFragment(urlPath) {
			return urlPath.split(/[\?#]/, 1)[0];
		}
		function getNumberOfUrlSegments(url) {
			return url.split(/\\?\//).filter((s) => s.length > 0 && s !== ",").length;
		}
		function getSanitizedUrlString(url) {
			let { protocol, host, path } = url,
				filteredHost =
					(host &&
						host
							.replace(/^.*@/, "[filtered]:[filtered]@")
							.replace(":80", "")
							.replace(":443", "")) ||
					"";
			return `${protocol ? `${protocol}://` : ""}${filteredHost}${path}`;
		}
		exports.getNumberOfUrlSegments = getNumberOfUrlSegments;
		exports.getSanitizedUrlString = getSanitizedUrlString;
		exports.parseUrl = parseUrl;
		exports.stripUrlQueryAndFragment = stripUrlQueryAndFragment;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/requestdata.js
var require_requestdata = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/requestdata.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			normalize = require_normalize(),
			url = require_url(),
			DEFAULT_INCLUDES = {
				ip: !1,
				request: !0,
				transaction: !0,
				user: !0,
			},
			DEFAULT_REQUEST_INCLUDES = [
				"cookies",
				"data",
				"headers",
				"method",
				"query_string",
				"url",
			],
			DEFAULT_USER_INCLUDES = ["id", "username", "email"];
		function addRequestDataToTransaction(transaction, req, deps) {
			transaction &&
				((!transaction.metadata.source || transaction.metadata.source === "url") &&
					transaction.setName(
						...extractPathForTransaction(req, { path: !0, method: !0 }),
					),
				transaction.setData("url", req.originalUrl || req.url),
				req.baseUrl && transaction.setData("baseUrl", req.baseUrl),
				transaction.setData("query", extractQueryParams(req, deps)));
		}
		function extractPathForTransaction(req, options = {}) {
			let method = req.method && req.method.toUpperCase(),
				path = "",
				source = "url";
			options.customRoute || req.route
				? ((path =
						options.customRoute ||
						`${req.baseUrl || ""}${req.route && req.route.path}`),
					(source = "route"))
				: (req.originalUrl || req.url) &&
					(path = url.stripUrlQueryAndFragment(req.originalUrl || req.url || ""));
			let name = "";
			return (
				options.method && method && (name += method),
				options.method && options.path && (name += " "),
				options.path && path && (name += path),
				[name, source]
			);
		}
		function extractTransaction(req, type) {
			switch (type) {
				case "path":
					return extractPathForTransaction(req, { path: !0 })[0];
				case "handler":
					return (
						(req.route &&
							req.route.stack &&
							req.route.stack[0] &&
							req.route.stack[0].name) ||
						"<anonymous>"
					);
				case "methodPath":
				default:
					return extractPathForTransaction(req, { path: !0, method: !0 })[0];
			}
		}
		function extractUserData(user, keys) {
			let extractedUser = {};
			return (
				(Array.isArray(keys) ? keys : DEFAULT_USER_INCLUDES).forEach((key) => {
					user && key in user && (extractedUser[key] = user[key]);
				}),
				extractedUser
			);
		}
		function extractRequestData(req, options) {
			let { include = DEFAULT_REQUEST_INCLUDES, deps } = options || {},
				requestData = {},
				headers = req.headers || {},
				method = req.method,
				host = req.hostname || req.host || headers.host || "<no host>",
				protocol =
					req.protocol === "https" || (req.socket && req.socket.encrypted)
						? "https"
						: "http",
				originalUrl = req.originalUrl || req.url || "",
				absoluteUrl = `${protocol}://${host}${originalUrl}`;
			return (
				include.forEach((key) => {
					switch (key) {
						case "headers": {
							requestData.headers = headers;
							break;
						}
						case "method": {
							requestData.method = method;
							break;
						}
						case "url": {
							requestData.url = absoluteUrl;
							break;
						}
						case "cookies": {
							requestData.cookies = // TODO (v8 / #5257): We're only sending the empty object for backwards compatibility, so the last bit can
								// come off in v8
								req.cookies ||
								(headers.cookie &&
									deps &&
									deps.cookie &&
									deps.cookie.parse(headers.cookie)) ||
								{};
							break;
						}
						case "query_string": {
							requestData.query_string = extractQueryParams(req, deps);
							break;
						}
						case "data": {
							if (method === "GET" || method === "HEAD") break;
							req.body !== void 0 &&
								(requestData.data = is.isString(req.body)
									? req.body
									: JSON.stringify(normalize.normalize(req.body)));
							break;
						}
						default:
							({}).hasOwnProperty.call(req, key) && (requestData[key] = req[key]);
					}
				}),
				requestData
			);
		}
		function addRequestDataToEvent(event, req, options) {
			let include = {
				...DEFAULT_INCLUDES,
				...(options && options.include),
			};
			if (include.request) {
				let extractedRequestData = Array.isArray(include.request)
					? extractRequestData(req, {
							include: include.request,
							deps: options && options.deps,
						})
					: extractRequestData(req, { deps: options && options.deps });
				event.request = {
					...event.request,
					...extractedRequestData,
				};
			}
			if (include.user) {
				let extractedUser =
					req.user && is.isPlainObject(req.user)
						? extractUserData(req.user, include.user)
						: {};
				Object.keys(extractedUser).length &&
					(event.user = {
						...event.user,
						...extractedUser,
					});
			}
			if (include.ip) {
				let ip = req.ip || (req.socket && req.socket.remoteAddress);
				ip &&
					(event.user = {
						...event.user,
						ip_address: ip,
					});
			}
			return (
				include.transaction &&
					!event.transaction &&
					(event.transaction = extractTransaction(req, include.transaction)),
				event
			);
		}
		function extractQueryParams(req, deps) {
			let originalUrl = req.originalUrl || req.url || "";
			if (originalUrl)
				return (
					originalUrl.startsWith("/") &&
						(originalUrl = `http://dogs.are.great${originalUrl}`),
					req.query ||
						(typeof URL !== void 0 && new URL(originalUrl).search.replace("?", "")) || // In Node 8, `URL` isn't in the global scope, so we have to use the built-in module from Node
						(deps && deps.url && deps.url.parse(originalUrl).query) ||
						void 0
				);
		}
		exports.addRequestDataToEvent = addRequestDataToEvent;
		exports.addRequestDataToTransaction = addRequestDataToTransaction;
		exports.extractPathForTransaction = extractPathForTransaction;
		exports.extractRequestData = extractRequestData;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/severity.js
var require_severity = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/severity.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var validSeverityLevels = ["fatal", "error", "warning", "log", "info", "debug"];
		function severityFromString(level) {
			return severityLevelFromString(level);
		}
		function severityLevelFromString(level) {
			return level === "warn"
				? "warning"
				: validSeverityLevels.includes(level)
					? level
					: "log";
		}
		exports.severityFromString = severityFromString;
		exports.severityLevelFromString = severityLevelFromString;
		exports.validSeverityLevels = validSeverityLevels;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/time.js
var require_time = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/time.js"(
		exports,
		module,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var node = require_node(),
			worldwide = require_worldwide(),
			WINDOW = worldwide.getGlobalObject(),
			dateTimestampSource = {
				nowSeconds: () => Date.now() / 1e3,
			};
		function getBrowserPerformance() {
			let { performance } = WINDOW;
			if (!performance || !performance.now) return;
			let timeOrigin = Date.now() - performance.now();
			return {
				now: () => performance.now(),
				timeOrigin,
			};
		}
		function getNodePerformance() {
			try {
				return node.dynamicRequire(module, "perf_hooks").performance;
			} catch {
				return;
			}
		}
		var platformPerformance = node.isNodeEnv() ? getNodePerformance() : getBrowserPerformance(),
			timestampSource =
				platformPerformance === void 0
					? dateTimestampSource
					: {
							nowSeconds: () =>
								(platformPerformance.timeOrigin + platformPerformance.now()) / 1e3,
						},
			dateTimestampInSeconds = dateTimestampSource.nowSeconds.bind(dateTimestampSource),
			timestampInSeconds = timestampSource.nowSeconds.bind(timestampSource),
			timestampWithMs = timestampInSeconds,
			usingPerformanceAPI = platformPerformance !== void 0;
		exports._browserPerformanceTimeOriginMode = void 0;
		var browserPerformanceTimeOrigin = (() => {
			let { performance } = WINDOW;
			if (!performance || !performance.now) {
				exports._browserPerformanceTimeOriginMode = "none";
				return;
			}
			let threshold = 3600 * 1e3,
				performanceNow = performance.now(),
				dateNow = Date.now(),
				timeOriginDelta = performance.timeOrigin
					? Math.abs(performance.timeOrigin + performanceNow - dateNow)
					: threshold,
				timeOriginIsReliable = timeOriginDelta < threshold,
				navigationStart = performance.timing && performance.timing.navigationStart,
				navigationStartDelta =
					typeof navigationStart == "number"
						? Math.abs(navigationStart + performanceNow - dateNow)
						: threshold,
				navigationStartIsReliable = navigationStartDelta < threshold;
			return timeOriginIsReliable || navigationStartIsReliable
				? timeOriginDelta <= navigationStartDelta
					? ((exports._browserPerformanceTimeOriginMode = "timeOrigin"),
						performance.timeOrigin)
					: ((exports._browserPerformanceTimeOriginMode = "navigationStart"),
						navigationStart)
				: ((exports._browserPerformanceTimeOriginMode = "dateNow"), dateNow);
		})();
		exports.browserPerformanceTimeOrigin = browserPerformanceTimeOrigin;
		exports.dateTimestampInSeconds = dateTimestampInSeconds;
		exports.timestampInSeconds = timestampInSeconds;
		exports.timestampWithMs = timestampWithMs;
		exports.usingPerformanceAPI = usingPerformanceAPI;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/baggage.js
var require_baggage = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/baggage.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			logger = require_logger(),
			BAGGAGE_HEADER_NAME = "baggage",
			SENTRY_BAGGAGE_KEY_PREFIX = "sentry-",
			SENTRY_BAGGAGE_KEY_PREFIX_REGEX = /^sentry-/,
			MAX_BAGGAGE_STRING_LENGTH = 8192;
		function baggageHeaderToDynamicSamplingContext(baggageHeader) {
			if (!is.isString(baggageHeader) && !Array.isArray(baggageHeader)) return;
			let baggageObject = {};
			if (Array.isArray(baggageHeader))
				baggageObject = baggageHeader.reduce((acc, curr) => {
					let currBaggageObject = baggageHeaderToObject(curr);
					return {
						...acc,
						...currBaggageObject,
					};
				}, {});
			else {
				if (!baggageHeader) return;
				baggageObject = baggageHeaderToObject(baggageHeader);
			}
			let dynamicSamplingContext = Object.entries(baggageObject).reduce(
				(acc, [key, value]) => {
					if (key.match(SENTRY_BAGGAGE_KEY_PREFIX_REGEX)) {
						let nonPrefixedKey = key.slice(SENTRY_BAGGAGE_KEY_PREFIX.length);
						acc[nonPrefixedKey] = value;
					}
					return acc;
				},
				{},
			);
			if (Object.keys(dynamicSamplingContext).length > 0) return dynamicSamplingContext;
		}
		function dynamicSamplingContextToSentryBaggageHeader(dynamicSamplingContext) {
			if (!dynamicSamplingContext) return;
			let sentryPrefixedDSC = Object.entries(dynamicSamplingContext).reduce(
				(acc, [dscKey, dscValue]) => (
					dscValue && (acc[`${SENTRY_BAGGAGE_KEY_PREFIX}${dscKey}`] = dscValue), acc
				),
				{},
			);
			return objectToBaggageHeader(sentryPrefixedDSC);
		}
		function baggageHeaderToObject(baggageHeader) {
			return baggageHeader
				.split(",")
				.map((baggageEntry) =>
					baggageEntry
						.split("=")
						.map((keyOrValue) => decodeURIComponent(keyOrValue.trim())),
				)
				.reduce((acc, [key, value]) => ((acc[key] = value), acc), {});
		}
		function objectToBaggageHeader(object) {
			if (Object.keys(object).length !== 0)
				return Object.entries(object).reduce(
					(baggageHeader, [objectKey, objectValue], currentIndex) => {
						let baggageEntry = `${encodeURIComponent(objectKey)}=${encodeURIComponent(objectValue)}`,
							newBaggageHeader =
								currentIndex === 0
									? baggageEntry
									: `${baggageHeader},${baggageEntry}`;
						return newBaggageHeader.length > MAX_BAGGAGE_STRING_LENGTH
							? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									logger.logger.warn(
										`Not adding key: ${objectKey} with val: ${objectValue} to baggage header due to exceeding baggage size limits.`,
									),
								baggageHeader)
							: newBaggageHeader;
					},
					"",
				);
		}
		exports.BAGGAGE_HEADER_NAME = BAGGAGE_HEADER_NAME;
		exports.MAX_BAGGAGE_STRING_LENGTH = MAX_BAGGAGE_STRING_LENGTH;
		exports.SENTRY_BAGGAGE_KEY_PREFIX = SENTRY_BAGGAGE_KEY_PREFIX;
		exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
		exports.baggageHeaderToDynamicSamplingContext = baggageHeaderToDynamicSamplingContext;
		exports.dynamicSamplingContextToSentryBaggageHeader =
			dynamicSamplingContextToSentryBaggageHeader;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/tracing.js
var require_tracing = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/tracing.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var baggage = require_baggage(),
			misc = require_misc(),
			TRACEPARENT_REGEXP = new RegExp(
				"^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$",
				// whitespace
			);
		function extractTraceparentData(traceparent) {
			if (!traceparent) return;
			let matches = traceparent.match(TRACEPARENT_REGEXP);
			if (!matches) return;
			let parentSampled;
			return (
				matches[3] === "1"
					? (parentSampled = !0)
					: matches[3] === "0" && (parentSampled = !1),
				{
					traceId: matches[1],
					parentSampled,
					parentSpanId: matches[2],
				}
			);
		}
		function tracingContextFromHeaders(sentryTrace, baggage$1) {
			let traceparentData = extractTraceparentData(sentryTrace),
				dynamicSamplingContext = baggage.baggageHeaderToDynamicSamplingContext(baggage$1),
				{ traceId, parentSpanId, parentSampled } = traceparentData || {},
				propagationContext = {
					traceId: traceId || misc.uuid4(),
					spanId: misc.uuid4().substring(16),
					sampled: parentSampled,
				};
			return (
				parentSpanId && (propagationContext.parentSpanId = parentSpanId),
				dynamicSamplingContext && (propagationContext.dsc = dynamicSamplingContext),
				{
					traceparentData,
					dynamicSamplingContext,
					propagationContext,
				}
			);
		}
		function generateSentryTraceHeader(
			traceId = misc.uuid4(),
			spanId = misc.uuid4().substring(16),
			sampled,
		) {
			let sampledString = "";
			return (
				sampled !== void 0 && (sampledString = sampled ? "-1" : "-0"),
				`${traceId}-${spanId}${sampledString}`
			);
		}
		exports.TRACEPARENT_REGEXP = TRACEPARENT_REGEXP;
		exports.extractTraceparentData = extractTraceparentData;
		exports.generateSentryTraceHeader = generateSentryTraceHeader;
		exports.tracingContextFromHeaders = tracingContextFromHeaders;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/envelope.js
var require_envelope = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/envelope.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var dsn = require_dsn(),
			normalize = require_normalize(),
			object = require_object();
		function createEnvelope(headers, items = []) {
			return [headers, items];
		}
		function addItemToEnvelope(envelope, newItem) {
			let [headers, items] = envelope;
			return [headers, [...items, newItem]];
		}
		function forEachEnvelopeItem(envelope, callback) {
			let envelopeItems = envelope[1];
			for (let envelopeItem of envelopeItems) {
				let envelopeItemType = envelopeItem[0].type;
				if (callback(envelopeItem, envelopeItemType)) return !0;
			}
			return !1;
		}
		function envelopeContainsItemType(envelope, types) {
			return forEachEnvelopeItem(envelope, (_, type) => types.includes(type));
		}
		function encodeUTF8(input, textEncoder) {
			return (textEncoder || new TextEncoder()).encode(input);
		}
		function serializeEnvelope(envelope, textEncoder) {
			let [envHeaders, items] = envelope,
				parts = JSON.stringify(envHeaders);
			function append(next) {
				typeof parts == "string"
					? (parts =
							typeof next == "string"
								? parts + next
								: [encodeUTF8(parts, textEncoder), next])
					: parts.push(typeof next == "string" ? encodeUTF8(next, textEncoder) : next);
			}
			for (let item of items) {
				let [itemHeaders, payload] = item;
				if (
					(append(`
${JSON.stringify(itemHeaders)}
`),
					typeof payload == "string" || payload instanceof Uint8Array)
				)
					append(payload);
				else {
					let stringifiedPayload;
					try {
						stringifiedPayload = JSON.stringify(payload);
					} catch {
						stringifiedPayload = JSON.stringify(normalize.normalize(payload));
					}
					append(stringifiedPayload);
				}
			}
			return typeof parts == "string" ? parts : concatBuffers(parts);
		}
		function concatBuffers(buffers) {
			let totalLength = buffers.reduce((acc, buf) => acc + buf.length, 0),
				merged = new Uint8Array(totalLength),
				offset = 0;
			for (let buffer of buffers) merged.set(buffer, offset), (offset += buffer.length);
			return merged;
		}
		function parseEnvelope(env, textEncoder, textDecoder) {
			let buffer = typeof env == "string" ? textEncoder.encode(env) : env;
			function readBinary(length) {
				let bin = buffer.subarray(0, length);
				return (buffer = buffer.subarray(length + 1)), bin;
			}
			function readJson() {
				let i = buffer.indexOf(10);
				return i < 0 && (i = buffer.length), JSON.parse(textDecoder.decode(readBinary(i)));
			}
			let envelopeHeader = readJson(),
				items = [];
			for (; buffer.length; ) {
				let itemHeader = readJson(),
					binaryLength =
						typeof itemHeader.length == "number" ? itemHeader.length : void 0;
				items.push([itemHeader, binaryLength ? readBinary(binaryLength) : readJson()]);
			}
			return [envelopeHeader, items];
		}
		function createAttachmentEnvelopeItem(attachment, textEncoder) {
			let buffer =
				typeof attachment.data == "string"
					? encodeUTF8(attachment.data, textEncoder)
					: attachment.data;
			return [
				object.dropUndefinedKeys({
					type: "attachment",
					length: buffer.length,
					filename: attachment.filename,
					content_type: attachment.contentType,
					attachment_type: attachment.attachmentType,
				}),
				buffer,
			];
		}
		var ITEM_TYPE_TO_DATA_CATEGORY_MAP = {
			session: "session",
			sessions: "session",
			attachment: "attachment",
			transaction: "transaction",
			event: "error",
			client_report: "internal",
			user_report: "default",
			profile: "profile",
			replay_event: "replay",
			replay_recording: "replay",
			check_in: "monitor",
			// TODO: This is a temporary workaround until we have a proper data category for metrics
			statsd: "unknown",
		};
		function envelopeItemTypeToDataCategory(type) {
			return ITEM_TYPE_TO_DATA_CATEGORY_MAP[type];
		}
		function getSdkMetadataForEnvelopeHeader(metadataOrEvent) {
			if (!metadataOrEvent || !metadataOrEvent.sdk) return;
			let { name, version } = metadataOrEvent.sdk;
			return { name, version };
		}
		function createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn$1) {
			let dynamicSamplingContext =
				event.sdkProcessingMetadata && event.sdkProcessingMetadata.dynamicSamplingContext;
			return {
				event_id: event.event_id,
				sent_at: /* @__PURE__ */ new Date().toISOString(),
				...(sdkInfo && { sdk: sdkInfo }),
				...(!!tunnel && dsn$1 && { dsn: dsn.dsnToString(dsn$1) }),
				...(dynamicSamplingContext && {
					trace: object.dropUndefinedKeys({ ...dynamicSamplingContext }),
				}),
			};
		}
		exports.addItemToEnvelope = addItemToEnvelope;
		exports.createAttachmentEnvelopeItem = createAttachmentEnvelopeItem;
		exports.createEnvelope = createEnvelope;
		exports.createEventEnvelopeHeaders = createEventEnvelopeHeaders;
		exports.envelopeContainsItemType = envelopeContainsItemType;
		exports.envelopeItemTypeToDataCategory = envelopeItemTypeToDataCategory;
		exports.forEachEnvelopeItem = forEachEnvelopeItem;
		exports.getSdkMetadataForEnvelopeHeader = getSdkMetadataForEnvelopeHeader;
		exports.parseEnvelope = parseEnvelope;
		exports.serializeEnvelope = serializeEnvelope;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/clientreport.js
var require_clientreport = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/clientreport.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var envelope = require_envelope(),
			time = require_time();
		function createClientReportEnvelope(discarded_events, dsn, timestamp) {
			let clientReportItem = [
				{ type: "client_report" },
				{
					timestamp: timestamp || time.dateTimestampInSeconds(),
					discarded_events,
				},
			];
			return envelope.createEnvelope(dsn ? { dsn } : {}, [clientReportItem]);
		}
		exports.createClientReportEnvelope = createClientReportEnvelope;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/ratelimit.js
var require_ratelimit = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/ratelimit.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var DEFAULT_RETRY_AFTER = 60 * 1e3;
		function parseRetryAfterHeader(header, now = Date.now()) {
			let headerDelay = parseInt(`${header}`, 10);
			if (!isNaN(headerDelay)) return headerDelay * 1e3;
			let headerDate = Date.parse(`${header}`);
			return isNaN(headerDate) ? DEFAULT_RETRY_AFTER : headerDate - now;
		}
		function disabledUntil(limits, category) {
			return limits[category] || limits.all || 0;
		}
		function isRateLimited(limits, category, now = Date.now()) {
			return disabledUntil(limits, category) > now;
		}
		function updateRateLimits(limits, { statusCode, headers }, now = Date.now()) {
			let updatedRateLimits = {
					...limits,
				},
				rateLimitHeader = headers && headers["x-sentry-rate-limits"],
				retryAfterHeader = headers && headers["retry-after"];
			if (rateLimitHeader)
				for (let limit of rateLimitHeader.trim().split(",")) {
					let [retryAfter, categories] = limit.split(":", 2),
						headerDelay = parseInt(retryAfter, 10),
						delay = (isNaN(headerDelay) ? 60 : headerDelay) * 1e3;
					if (!categories) updatedRateLimits.all = now + delay;
					else
						for (let category of categories.split(";"))
							updatedRateLimits[category] = now + delay;
				}
			else
				retryAfterHeader
					? (updatedRateLimits.all = now + parseRetryAfterHeader(retryAfterHeader, now))
					: statusCode === 429 && (updatedRateLimits.all = now + 60 * 1e3);
			return updatedRateLimits;
		}
		exports.DEFAULT_RETRY_AFTER = DEFAULT_RETRY_AFTER;
		exports.disabledUntil = disabledUntil;
		exports.isRateLimited = isRateLimited;
		exports.parseRetryAfterHeader = parseRetryAfterHeader;
		exports.updateRateLimits = updateRateLimits;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/userIntegrations.js
var require_userIntegrations = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/userIntegrations.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function setNestedKey(obj, keyPath, value) {
			let match = keyPath.match(/([a-z_]+)\.(.*)/i);
			if (match === null) obj[keyPath] = value;
			else {
				let innerObj = obj[match[1]];
				setNestedKey(innerObj, match[2], value);
			}
		}
		function addOrUpdateIntegration(
			defaultIntegrationInstance,
			userIntegrations,
			forcedOptions = {},
		) {
			return Array.isArray(userIntegrations)
				? addOrUpdateIntegrationInArray(
						defaultIntegrationInstance,
						userIntegrations,
						forcedOptions,
					)
				: addOrUpdateIntegrationInFunction(
						defaultIntegrationInstance,
						// Somehow TS can't figure out that not being an array makes this necessarily a function
						userIntegrations,
						forcedOptions,
					);
		}
		function addOrUpdateIntegrationInArray(
			defaultIntegrationInstance,
			userIntegrations,
			forcedOptions,
		) {
			let userInstance = userIntegrations.find(
				(integration) => integration.name === defaultIntegrationInstance.name,
			);
			if (userInstance) {
				for (let [keyPath, value] of Object.entries(forcedOptions))
					setNestedKey(userInstance, keyPath, value);
				return userIntegrations;
			}
			return [...userIntegrations, defaultIntegrationInstance];
		}
		function addOrUpdateIntegrationInFunction(
			defaultIntegrationInstance,
			userIntegrationsFunc,
			forcedOptions,
		) {
			return (defaultIntegrations) => {
				let userFinalIntegrations = userIntegrationsFunc(defaultIntegrations);
				return defaultIntegrationInstance.allowExclusionByUser &&
					!userFinalIntegrations.find(
						(integration) => integration.name === defaultIntegrationInstance.name,
					)
					? userFinalIntegrations
					: addOrUpdateIntegrationInArray(
							defaultIntegrationInstance,
							userFinalIntegrations,
							forcedOptions,
						);
			};
		}
		exports.addOrUpdateIntegration = addOrUpdateIntegration;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/cache.js
var require_cache = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/cache.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function makeFifoCache(size) {
			let evictionOrder = [],
				cache = {};
			return {
				add(key, value) {
					for (; evictionOrder.length >= size; ) {
						let evictCandidate = evictionOrder.shift();
						evictCandidate !== void 0 && delete cache[evictCandidate];
					}
					cache[key] && this.delete(key), evictionOrder.push(key), (cache[key] = value);
				},
				clear() {
					(cache = {}), (evictionOrder = []);
				},
				get(key) {
					return cache[key];
				},
				size() {
					return evictionOrder.length;
				},
				// Delete cache key and return true if it existed, false otherwise.
				delete(key) {
					if (!cache[key]) return !1;
					delete cache[key];
					for (let i = 0; i < evictionOrder.length; i++)
						if (evictionOrder[i] === key) {
							evictionOrder.splice(i, 1);
							break;
						}
					return !0;
				},
			};
		}
		exports.makeFifoCache = makeFifoCache;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/eventbuilder.js
var require_eventbuilder = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/eventbuilder.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var is = require_is(),
			misc = require_misc(),
			normalize = require_normalize(),
			object = require_object();
		function parseStackFrames(stackParser, error) {
			return stackParser(error.stack || "", 1);
		}
		function exceptionFromError(stackParser, error) {
			let exception = {
					type: error.name || error.constructor.name,
					value: error.message,
				},
				frames = parseStackFrames(stackParser, error);
			return frames.length && (exception.stacktrace = { frames }), exception;
		}
		function getMessageForObject(exception) {
			if ("name" in exception && typeof exception.name == "string") {
				let message = `'${exception.name}' captured as exception`;
				return (
					"message" in exception &&
						typeof exception.message == "string" &&
						(message += ` with message '${exception.message}'`),
					message
				);
			} else
				return "message" in exception && typeof exception.message == "string"
					? exception.message
					: `Object captured as exception with keys: ${object.extractExceptionKeysForMessage(
							exception,
						)}`;
		}
		function eventFromUnknownInput(getCurrentHub, stackParser, exception, hint) {
			let ex = exception,
				mechanism = (hint && hint.data && hint.data.mechanism) || {
					handled: !0,
					type: "generic",
				};
			if (!is.isError(exception)) {
				if (is.isPlainObject(exception)) {
					let hub = getCurrentHub(),
						client = hub.getClient(),
						normalizeDepth = client && client.getOptions().normalizeDepth;
					hub.configureScope((scope) => {
						scope.setExtra(
							"__serialized__",
							normalize.normalizeToSize(exception, normalizeDepth),
						);
					});
					let message = getMessageForObject(exception);
					(ex = (hint && hint.syntheticException) || new Error(message)),
						(ex.message = message);
				} else
					(ex = (hint && hint.syntheticException) || new Error(exception)),
						(ex.message = exception);
				mechanism.synthetic = !0;
			}
			let event = {
				exception: {
					values: [exceptionFromError(stackParser, ex)],
				},
			};
			return (
				misc.addExceptionTypeValue(event, void 0, void 0),
				misc.addExceptionMechanism(event, mechanism),
				{
					...event,
					event_id: hint && hint.event_id,
				}
			);
		}
		function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
			let event = {
				event_id: hint && hint.event_id,
				level,
				message,
			};
			if (attachStacktrace && hint && hint.syntheticException) {
				let frames = parseStackFrames(stackParser, hint.syntheticException);
				frames.length &&
					(event.exception = {
						values: [
							{
								value: message,
								stacktrace: { frames },
							},
						],
					});
			}
			return event;
		}
		exports.eventFromMessage = eventFromMessage;
		exports.eventFromUnknownInput = eventFromUnknownInput;
		exports.exceptionFromError = exceptionFromError;
		exports.parseStackFrames = parseStackFrames;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/anr.js
var require_anr = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/anr.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var object = require_object(),
			stacktrace = require_stacktrace(),
			nodeStackTrace = require_node_stack_trace();
		function watchdogTimer(createTimer, pollInterval, anrThreshold, callback) {
			let timer = createTimer(),
				triggered = !1,
				enabled = !0;
			return (
				setInterval(() => {
					let diffMs = timer.getTimeMs();
					triggered === !1 &&
						diffMs > pollInterval + anrThreshold &&
						((triggered = !0), enabled && callback()),
						diffMs < pollInterval + anrThreshold && (triggered = !1);
				}, 20),
				{
					poll: () => {
						timer.reset();
					},
					enabled: (state) => {
						enabled = state;
					},
				}
			);
		}
		function callFrameToStackFrame(frame, url, getModuleFromFilename) {
			let filename = url ? url.replace(/^file:\/\//, "") : void 0,
				colno = frame.location.columnNumber ? frame.location.columnNumber + 1 : void 0,
				lineno = frame.location.lineNumber ? frame.location.lineNumber + 1 : void 0;
			return object.dropUndefinedKeys({
				filename,
				module: getModuleFromFilename(filename),
				function: frame.functionName || "?",
				colno,
				lineno,
				in_app: filename ? nodeStackTrace.filenameIsInApp(filename) : void 0,
			});
		}
		function createDebugPauseMessageHandler(
			sendCommand,
			getModuleFromFilename,
			pausedStackFrames,
		) {
			let scripts = /* @__PURE__ */ new Map();
			return (message) => {
				if (message.method === "Debugger.scriptParsed")
					scripts.set(message.params.scriptId, message.params.url);
				else if (message.method === "Debugger.paused") {
					let callFrames = [...message.params.callFrames];
					sendCommand("Debugger.resume"), sendCommand("Debugger.disable");
					let stackFrames = stacktrace.stripSentryFramesAndReverse(
						callFrames.map((frame) =>
							callFrameToStackFrame(
								frame,
								scripts.get(frame.location.scriptId),
								getModuleFromFilename,
							),
						),
					);
					pausedStackFrames(stackFrames);
				}
			};
		}
		exports.createDebugPauseMessageHandler = createDebugPauseMessageHandler;
		exports.watchdogTimer = watchdogTimer;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/lru.js
var require_lru = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/lru.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var LRUMap = class {
			constructor(_maxSize) {
				(this._maxSize = _maxSize), (this._cache = /* @__PURE__ */ new Map());
			}
			/** Get the current size of the cache */
			get size() {
				return this._cache.size;
			}
			/** Get an entry or undefined if it was not in the cache. Re-inserts to update the recently used order */
			get(key) {
				let value = this._cache.get(key);
				if (value !== void 0)
					return this._cache.delete(key), this._cache.set(key, value), value;
			}
			/** Insert an entry and evict an older entry if we've reached maxSize */
			set(key, value) {
				this._cache.size >= this._maxSize &&
					this._cache.delete(this._cache.keys().next().value),
					this._cache.set(key, value);
			}
			/** Remove an entry and return the entry if it was in the cache */
			remove(key) {
				let value = this._cache.get(key);
				return value && this._cache.delete(key), value;
			}
			/** Clear all entries */
			clear() {
				this._cache.clear();
			}
			/** Get all the keys */
			keys() {
				return Array.from(this._cache.keys());
			}
			/** Get all the values */
			values() {
				let values = [];
				return this._cache.forEach((value) => values.push(value)), values;
			}
		};
		exports.LRUMap = LRUMap;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js
var require_escapeStringForRegex = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/vendor/escapeStringForRegex.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function escapeStringForRegex(regexString) {
			return regexString.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
		}
		exports.escapeStringForRegex = escapeStringForRegex;
	},
});

// ../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/index.js
var require_cjs = __commonJS({
	"../../node_modules/.pnpm/@sentry+utils@7.76.0/node_modules/@sentry/utils/cjs/index.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var aggregateErrors = require_aggregate_errors(),
			browser = require_browser(),
			dsn = require_dsn(),
			error = require_error(),
			worldwide = require_worldwide(),
			instrument = require_instrument(),
			is = require_is(),
			isBrowser = require_isBrowser(),
			logger = require_logger(),
			memo = require_memo(),
			misc = require_misc(),
			node = require_node(),
			normalize = require_normalize(),
			object = require_object(),
			path = require_path(),
			promisebuffer = require_promisebuffer(),
			requestdata = require_requestdata(),
			severity = require_severity(),
			stacktrace = require_stacktrace(),
			string = require_string(),
			supports = require_supports(),
			syncpromise = require_syncpromise(),
			time = require_time(),
			tracing = require_tracing(),
			env = require_env(),
			envelope = require_envelope(),
			clientreport = require_clientreport(),
			ratelimit = require_ratelimit(),
			baggage = require_baggage(),
			url = require_url(),
			userIntegrations = require_userIntegrations(),
			cache = require_cache(),
			eventbuilder = require_eventbuilder(),
			anr = require_anr(),
			lru = require_lru(),
			nodeStackTrace = require_node_stack_trace(),
			escapeStringForRegex = require_escapeStringForRegex(),
			supportsHistory = require_supportsHistory();
		exports.applyAggregateErrorsToEvent = aggregateErrors.applyAggregateErrorsToEvent;
		exports.getDomElement = browser.getDomElement;
		exports.getLocationHref = browser.getLocationHref;
		exports.htmlTreeAsString = browser.htmlTreeAsString;
		exports.dsnFromString = dsn.dsnFromString;
		exports.dsnToString = dsn.dsnToString;
		exports.makeDsn = dsn.makeDsn;
		exports.SentryError = error.SentryError;
		exports.GLOBAL_OBJ = worldwide.GLOBAL_OBJ;
		exports.getGlobalObject = worldwide.getGlobalObject;
		exports.getGlobalSingleton = worldwide.getGlobalSingleton;
		exports.SENTRY_XHR_DATA_KEY = instrument.SENTRY_XHR_DATA_KEY;
		exports.addInstrumentationHandler = instrument.addInstrumentationHandler;
		exports.instrumentDOM = instrument.instrumentDOM;
		exports.instrumentXHR = instrument.instrumentXHR;
		exports.parseFetchArgs = instrument.parseFetchArgs;
		exports.resetInstrumentationHandlers = instrument.resetInstrumentationHandlers;
		exports.isDOMError = is.isDOMError;
		exports.isDOMException = is.isDOMException;
		exports.isElement = is.isElement;
		exports.isError = is.isError;
		exports.isErrorEvent = is.isErrorEvent;
		exports.isEvent = is.isEvent;
		exports.isInstanceOf = is.isInstanceOf;
		exports.isNaN = is.isNaN;
		exports.isPlainObject = is.isPlainObject;
		exports.isPrimitive = is.isPrimitive;
		exports.isRegExp = is.isRegExp;
		exports.isString = is.isString;
		exports.isSyntheticEvent = is.isSyntheticEvent;
		exports.isThenable = is.isThenable;
		exports.isVueViewModel = is.isVueViewModel;
		exports.isBrowser = isBrowser.isBrowser;
		exports.CONSOLE_LEVELS = logger.CONSOLE_LEVELS;
		exports.consoleSandbox = logger.consoleSandbox;
		exports.logger = logger.logger;
		exports.originalConsoleMethods = logger.originalConsoleMethods;
		exports.memoBuilder = memo.memoBuilder;
		exports.addContextToFrame = misc.addContextToFrame;
		exports.addExceptionMechanism = misc.addExceptionMechanism;
		exports.addExceptionTypeValue = misc.addExceptionTypeValue;
		exports.arrayify = misc.arrayify;
		exports.checkOrSetAlreadyCaught = misc.checkOrSetAlreadyCaught;
		exports.getEventDescription = misc.getEventDescription;
		exports.parseSemver = misc.parseSemver;
		exports.uuid4 = misc.uuid4;
		exports.dynamicRequire = node.dynamicRequire;
		exports.isNodeEnv = node.isNodeEnv;
		exports.loadModule = node.loadModule;
		exports.normalize = normalize.normalize;
		exports.normalizeToSize = normalize.normalizeToSize;
		exports.walk = normalize.walk;
		exports.addNonEnumerableProperty = object.addNonEnumerableProperty;
		exports.convertToPlainObject = object.convertToPlainObject;
		exports.dropUndefinedKeys = object.dropUndefinedKeys;
		exports.extractExceptionKeysForMessage = object.extractExceptionKeysForMessage;
		exports.fill = object.fill;
		exports.getOriginalFunction = object.getOriginalFunction;
		exports.markFunctionWrapped = object.markFunctionWrapped;
		exports.objectify = object.objectify;
		exports.urlEncode = object.urlEncode;
		exports.basename = path.basename;
		exports.dirname = path.dirname;
		exports.isAbsolute = path.isAbsolute;
		exports.join = path.join;
		exports.normalizePath = path.normalizePath;
		exports.relative = path.relative;
		exports.resolve = path.resolve;
		exports.makePromiseBuffer = promisebuffer.makePromiseBuffer;
		exports.addRequestDataToEvent = requestdata.addRequestDataToEvent;
		exports.addRequestDataToTransaction = requestdata.addRequestDataToTransaction;
		exports.extractPathForTransaction = requestdata.extractPathForTransaction;
		exports.extractRequestData = requestdata.extractRequestData;
		exports.severityFromString = severity.severityFromString;
		exports.severityLevelFromString = severity.severityLevelFromString;
		exports.validSeverityLevels = severity.validSeverityLevels;
		exports.createStackParser = stacktrace.createStackParser;
		exports.getFunctionName = stacktrace.getFunctionName;
		exports.nodeStackLineParser = stacktrace.nodeStackLineParser;
		exports.stackParserFromStackParserOptions = stacktrace.stackParserFromStackParserOptions;
		exports.stripSentryFramesAndReverse = stacktrace.stripSentryFramesAndReverse;
		exports.isMatchingPattern = string.isMatchingPattern;
		exports.safeJoin = string.safeJoin;
		exports.snipLine = string.snipLine;
		exports.stringMatchesSomePattern = string.stringMatchesSomePattern;
		exports.truncate = string.truncate;
		exports.isNativeFetch = supports.isNativeFetch;
		exports.supportsDOMError = supports.supportsDOMError;
		exports.supportsDOMException = supports.supportsDOMException;
		exports.supportsErrorEvent = supports.supportsErrorEvent;
		exports.supportsFetch = supports.supportsFetch;
		exports.supportsNativeFetch = supports.supportsNativeFetch;
		exports.supportsReferrerPolicy = supports.supportsReferrerPolicy;
		exports.supportsReportingObserver = supports.supportsReportingObserver;
		exports.SyncPromise = syncpromise.SyncPromise;
		exports.rejectedSyncPromise = syncpromise.rejectedSyncPromise;
		exports.resolvedSyncPromise = syncpromise.resolvedSyncPromise;
		Object.defineProperty(exports, "_browserPerformanceTimeOriginMode", {
			enumerable: !0,
			get: () => time._browserPerformanceTimeOriginMode,
		});
		exports.browserPerformanceTimeOrigin = time.browserPerformanceTimeOrigin;
		exports.dateTimestampInSeconds = time.dateTimestampInSeconds;
		exports.timestampInSeconds = time.timestampInSeconds;
		exports.timestampWithMs = time.timestampWithMs;
		exports.usingPerformanceAPI = time.usingPerformanceAPI;
		exports.TRACEPARENT_REGEXP = tracing.TRACEPARENT_REGEXP;
		exports.extractTraceparentData = tracing.extractTraceparentData;
		exports.generateSentryTraceHeader = tracing.generateSentryTraceHeader;
		exports.tracingContextFromHeaders = tracing.tracingContextFromHeaders;
		exports.getSDKSource = env.getSDKSource;
		exports.isBrowserBundle = env.isBrowserBundle;
		exports.addItemToEnvelope = envelope.addItemToEnvelope;
		exports.createAttachmentEnvelopeItem = envelope.createAttachmentEnvelopeItem;
		exports.createEnvelope = envelope.createEnvelope;
		exports.createEventEnvelopeHeaders = envelope.createEventEnvelopeHeaders;
		exports.envelopeContainsItemType = envelope.envelopeContainsItemType;
		exports.envelopeItemTypeToDataCategory = envelope.envelopeItemTypeToDataCategory;
		exports.forEachEnvelopeItem = envelope.forEachEnvelopeItem;
		exports.getSdkMetadataForEnvelopeHeader = envelope.getSdkMetadataForEnvelopeHeader;
		exports.parseEnvelope = envelope.parseEnvelope;
		exports.serializeEnvelope = envelope.serializeEnvelope;
		exports.createClientReportEnvelope = clientreport.createClientReportEnvelope;
		exports.DEFAULT_RETRY_AFTER = ratelimit.DEFAULT_RETRY_AFTER;
		exports.disabledUntil = ratelimit.disabledUntil;
		exports.isRateLimited = ratelimit.isRateLimited;
		exports.parseRetryAfterHeader = ratelimit.parseRetryAfterHeader;
		exports.updateRateLimits = ratelimit.updateRateLimits;
		exports.BAGGAGE_HEADER_NAME = baggage.BAGGAGE_HEADER_NAME;
		exports.MAX_BAGGAGE_STRING_LENGTH = baggage.MAX_BAGGAGE_STRING_LENGTH;
		exports.SENTRY_BAGGAGE_KEY_PREFIX = baggage.SENTRY_BAGGAGE_KEY_PREFIX;
		exports.SENTRY_BAGGAGE_KEY_PREFIX_REGEX = baggage.SENTRY_BAGGAGE_KEY_PREFIX_REGEX;
		exports.baggageHeaderToDynamicSamplingContext =
			baggage.baggageHeaderToDynamicSamplingContext;
		exports.dynamicSamplingContextToSentryBaggageHeader =
			baggage.dynamicSamplingContextToSentryBaggageHeader;
		exports.getNumberOfUrlSegments = url.getNumberOfUrlSegments;
		exports.getSanitizedUrlString = url.getSanitizedUrlString;
		exports.parseUrl = url.parseUrl;
		exports.stripUrlQueryAndFragment = url.stripUrlQueryAndFragment;
		exports.addOrUpdateIntegration = userIntegrations.addOrUpdateIntegration;
		exports.makeFifoCache = cache.makeFifoCache;
		exports.eventFromMessage = eventbuilder.eventFromMessage;
		exports.eventFromUnknownInput = eventbuilder.eventFromUnknownInput;
		exports.exceptionFromError = eventbuilder.exceptionFromError;
		exports.parseStackFrames = eventbuilder.parseStackFrames;
		exports.createDebugPauseMessageHandler = anr.createDebugPauseMessageHandler;
		exports.watchdogTimer = anr.watchdogTimer;
		exports.LRUMap = lru.LRUMap;
		exports.filenameIsInApp = nodeStackTrace.filenameIsInApp;
		exports.escapeStringForRegex = escapeStringForRegex.escapeStringForRegex;
		exports.supportsHistory = supportsHistory.supportsHistory;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/captureconsole.js
var require_captureconsole = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/captureconsole.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			CaptureConsole = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "CaptureConsole";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				constructor(options = {}) {
					(this.name = CaptureConsole.id),
						(this._levels = options.levels || utils.CONSOLE_LEVELS);
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_, getCurrentHub) {
					if (!("console" in utils.GLOBAL_OBJ)) return;
					let levels = this._levels;
					utils.addInstrumentationHandler("console", ({ args, level }) => {
						if (!levels.includes(level)) return;
						let hub = getCurrentHub();
						hub.getIntegration(CaptureConsole) && consoleHandler(hub, args, level);
					});
				}
			};
		CaptureConsole.__initStatic();
		function consoleHandler(hub, args, level) {
			hub.withScope((scope) => {
				scope.setLevel(utils.severityLevelFromString(level)),
					scope.setExtra("arguments", args),
					scope.addEventProcessor(
						(event) => (
							(event.logger = "console"),
							utils.addExceptionMechanism(event, {
								handled: !1,
								type: "console",
							}),
							event
						),
					);
				let message = utils.safeJoin(args, " "),
					error = args.find((arg) => arg instanceof Error);
				level === "assert"
					? args[0] === !1 &&
						((message = `Assertion failed: ${utils.safeJoin(args.slice(1), " ") || "console.assert"}`),
						scope.setExtra("arguments", args.slice(1)),
						hub.captureMessage(message))
					: level === "error" && error
						? hub.captureException(error)
						: hub.captureMessage(message);
			});
		}
		exports.CaptureConsole = CaptureConsole;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/debug.js
var require_debug = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/debug.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			Debug = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "Debug";
				}
				/**
				 * @inheritDoc
				 */
				constructor(options) {
					(this.name = Debug.id),
						(this._options = {
							debugger: !1,
							stringify: !1,
							...options,
						});
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_addGlobalEventProcessor, getCurrentHub) {
					let client = getCurrentHub().getClient();
					client &&
						client.on &&
						client.on("beforeSendEvent", (event, hint) => {
							if (this._options.debugger) debugger;
							utils.consoleSandbox(() => {
								this._options.stringify
									? (console.log(JSON.stringify(event, null, 2)),
										hint &&
											Object.keys(hint).length &&
											console.log(JSON.stringify(hint, null, 2)))
									: (console.log(event),
										hint && Object.keys(hint).length && console.log(hint));
							});
						});
				}
			};
		Debug.__initStatic();
		exports.Debug = Debug;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/dedupe.js
var require_dedupe = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/dedupe.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			Dedupe = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "Dedupe";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				constructor() {
					this.name = Dedupe.id;
				}
				/** @inheritDoc */
				setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
				/**
				 * @inheritDoc
				 */
				processEvent(currentEvent) {
					if (currentEvent.type) return currentEvent;
					try {
						if (_shouldDropEvent(currentEvent, this._previousEvent))
							return (
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.warn(
										"Event dropped due to being a duplicate of previously captured event.",
									),
								null
							);
					} catch {
						return (this._previousEvent = currentEvent);
					}
					return (this._previousEvent = currentEvent);
				}
			};
		Dedupe.__initStatic();
		function _shouldDropEvent(currentEvent, previousEvent) {
			return previousEvent
				? !!(
						_isSameMessageEvent(currentEvent, previousEvent) ||
						_isSameExceptionEvent(currentEvent, previousEvent)
					)
				: !1;
		}
		function _isSameMessageEvent(currentEvent, previousEvent) {
			let currentMessage = currentEvent.message,
				previousMessage = previousEvent.message;
			return !(
				(!currentMessage && !previousMessage) ||
				(currentMessage && !previousMessage) ||
				(!currentMessage && previousMessage) ||
				currentMessage !== previousMessage ||
				!_isSameFingerprint(currentEvent, previousEvent) ||
				!_isSameStacktrace(currentEvent, previousEvent)
			);
		}
		function _isSameExceptionEvent(currentEvent, previousEvent) {
			let previousException = _getExceptionFromEvent(previousEvent),
				currentException = _getExceptionFromEvent(currentEvent);
			return !(
				!previousException ||
				!currentException ||
				previousException.type !== currentException.type ||
				previousException.value !== currentException.value ||
				!_isSameFingerprint(currentEvent, previousEvent) ||
				!_isSameStacktrace(currentEvent, previousEvent)
			);
		}
		function _isSameStacktrace(currentEvent, previousEvent) {
			let currentFrames = _getFramesFromEvent(currentEvent),
				previousFrames = _getFramesFromEvent(previousEvent);
			if (!currentFrames && !previousFrames) return !0;
			if (
				(currentFrames && !previousFrames) ||
				(!currentFrames && previousFrames) ||
				((currentFrames = currentFrames),
				(previousFrames = previousFrames),
				previousFrames.length !== currentFrames.length)
			)
				return !1;
			for (let i = 0; i < previousFrames.length; i++) {
				let frameA = previousFrames[i],
					frameB = currentFrames[i];
				if (
					frameA.filename !== frameB.filename ||
					frameA.lineno !== frameB.lineno ||
					frameA.colno !== frameB.colno ||
					frameA.function !== frameB.function
				)
					return !1;
			}
			return !0;
		}
		function _isSameFingerprint(currentEvent, previousEvent) {
			let currentFingerprint = currentEvent.fingerprint,
				previousFingerprint = previousEvent.fingerprint;
			if (!currentFingerprint && !previousFingerprint) return !0;
			if (
				(currentFingerprint && !previousFingerprint) ||
				(!currentFingerprint && previousFingerprint)
			)
				return !1;
			(currentFingerprint = currentFingerprint), (previousFingerprint = previousFingerprint);
			try {
				return currentFingerprint.join("") === previousFingerprint.join("");
			} catch {
				return !1;
			}
		}
		function _getExceptionFromEvent(event) {
			return event.exception && event.exception.values && event.exception.values[0];
		}
		function _getFramesFromEvent(event) {
			let exception = event.exception;
			if (exception)
				try {
					return exception.values[0].stacktrace.frames;
				} catch {
					return;
				}
		}
		exports.Dedupe = Dedupe;
		exports._shouldDropEvent = _shouldDropEvent;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/extraerrordata.js
var require_extraerrordata = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/extraerrordata.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			ExtraErrorData = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "ExtraErrorData";
				}
				/**
				 * @inheritDoc
				 */
				/** JSDoc */
				/**
				 * @inheritDoc
				 */
				constructor(options) {
					(this.name = ExtraErrorData.id),
						(this._options = {
							depth: 3,
							...options,
						});
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
				/** @inheritDoc */
				processEvent(event, hint) {
					return this.enhanceEventWithErrorData(event, hint);
				}
				/**
				 * Attaches extracted information from the Error object to extra field in the Event.
				 *
				 * TODO (v8): Drop this public function.
				 */
				enhanceEventWithErrorData(event, hint = {}) {
					return _enhanceEventWithErrorData(event, hint, this._options.depth);
				}
			};
		ExtraErrorData.__initStatic();
		function _enhanceEventWithErrorData(event, hint = {}, depth) {
			if (!hint.originalException || !utils.isError(hint.originalException)) return event;
			let exceptionName =
					hint.originalException.name || hint.originalException.constructor.name,
				errorData = _extractErrorData(hint.originalException);
			if (errorData) {
				let contexts = {
						...event.contexts,
					},
					normalizedErrorData = utils.normalize(errorData, depth);
				return (
					utils.isPlainObject(normalizedErrorData) &&
						(utils.addNonEnumerableProperty(
							normalizedErrorData,
							"__sentry_skip_normalization__",
							!0,
						),
						(contexts[exceptionName] = normalizedErrorData)),
					{
						...event,
						contexts,
					}
				);
			}
			return event;
		}
		function _extractErrorData(error) {
			try {
				let nativeKeys = [
						"name",
						"message",
						"stack",
						"line",
						"column",
						"fileName",
						"lineNumber",
						"columnNumber",
						"toJSON",
					],
					extraErrorInfo = {};
				for (let key of Object.keys(error)) {
					if (nativeKeys.indexOf(key) !== -1) continue;
					let value = error[key];
					extraErrorInfo[key] = utils.isError(value) ? value.toString() : value;
				}
				if (typeof error.toJSON == "function") {
					let serializedError = error.toJSON();
					for (let key of Object.keys(serializedError)) {
						let value = serializedError[key];
						extraErrorInfo[key] = utils.isError(value) ? value.toString() : value;
					}
				}
				return extraErrorInfo;
			} catch (oO) {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.error("Unable to extract extra data from the Error object:", oO);
			}
			return null;
		}
		exports.ExtraErrorData = ExtraErrorData;
	},
});

// ../../node_modules/.pnpm/localforage@1.10.0/node_modules/localforage/dist/localforage.js
var require_localforage = __commonJS({
	"../../node_modules/.pnpm/localforage@1.10.0/node_modules/localforage/dist/localforage.js"(
		exports,
		module,
	) {
		(function (f) {
			if (typeof exports == "object" && typeof module < "u") module.exports = f();
			else if (typeof define == "function" && define.amd) define([], f);
			else {
				var g;
				typeof window < "u"
					? (g = window)
					: typeof global < "u"
						? (g = global)
						: typeof self < "u"
							? (g = self)
							: (g = this),
					(g.localforage = f());
			}
		})(function () {
			var define2, module2, exports2;
			return (function e(t, n, r) {
				function s(o2, u) {
					if (!n[o2]) {
						if (!t[o2]) {
							var a = typeof __require == "function" && __require;
							if (!u && a) return a(o2, !0);
							if (i) return i(o2, !0);
							var f = new Error("Cannot find module '" + o2 + "'");
							throw ((f.code = "MODULE_NOT_FOUND"), f);
						}
						var l = (n[o2] = { exports: {} });
						t[o2][0].call(
							l.exports,
							function (e2) {
								var n2 = t[o2][1][e2];
								return s(n2 || e2);
							},
							l,
							l.exports,
							e,
							t,
							n,
							r,
						);
					}
					return n[o2].exports;
				}
				for (var i = typeof __require == "function" && __require, o = 0; o < r.length; o++)
					s(r[o]);
				return s;
			})(
				{
					1: [
						function (_dereq_, module3, exports3) {
							(function (global2) {
								"use strict";
								var Mutation =
										global2.MutationObserver || global2.WebKitMutationObserver,
									scheduleDrain;
								if (Mutation) {
									var called = 0,
										observer = new Mutation(nextTick),
										element = global2.document.createTextNode("");
									observer.observe(element, {
										characterData: !0,
									}),
										(scheduleDrain = function () {
											element.data = called = ++called % 2;
										});
								} else if (
									!global2.setImmediate &&
									typeof global2.MessageChannel < "u"
								) {
									var channel = new global2.MessageChannel();
									(channel.port1.onmessage = nextTick),
										(scheduleDrain = function () {
											channel.port2.postMessage(0);
										});
								} else
									"document" in global2 &&
									"onreadystatechange" in global2.document.createElement("script")
										? (scheduleDrain = function () {
												var scriptEl =
													global2.document.createElement("script");
												(scriptEl.onreadystatechange = function () {
													nextTick(),
														(scriptEl.onreadystatechange = null),
														scriptEl.parentNode.removeChild(scriptEl),
														(scriptEl = null);
												}),
													global2.document.documentElement.appendChild(
														scriptEl,
													);
											})
										: (scheduleDrain = function () {
												setTimeout(nextTick, 0);
											});
								var draining,
									queue = [];
								function nextTick() {
									draining = !0;
									for (var i, oldQueue, len = queue.length; len; ) {
										for (oldQueue = queue, queue = [], i = -1; ++i < len; )
											oldQueue[i]();
										len = queue.length;
									}
									draining = !1;
								}
								module3.exports = immediate;
								function immediate(task) {
									queue.push(task) === 1 && !draining && scheduleDrain();
								}
							}).call(
								this,
								typeof global < "u"
									? global
									: typeof self < "u"
										? self
										: typeof window < "u"
											? window
											: {},
							);
						},
						{},
					],
					2: [
						function (_dereq_, module3, exports3) {
							"use strict";
							var immediate = _dereq_(1);
							function INTERNAL() {}
							var handlers = {},
								REJECTED = ["REJECTED"],
								FULFILLED = ["FULFILLED"],
								PENDING = ["PENDING"];
							module3.exports = Promise2;
							function Promise2(resolver) {
								if (typeof resolver != "function")
									throw new TypeError("resolver must be a function");
								(this.state = PENDING),
									(this.queue = []),
									(this.outcome = void 0),
									resolver !== INTERNAL && safelyResolveThenable(this, resolver);
							}
							(Promise2.prototype.catch = function (onRejected) {
								return this.then(null, onRejected);
							}),
								(Promise2.prototype.then = function (onFulfilled, onRejected) {
									if (
										(typeof onFulfilled != "function" &&
											this.state === FULFILLED) ||
										(typeof onRejected != "function" && this.state === REJECTED)
									)
										return this;
									var promise = new this.constructor(INTERNAL);
									if (this.state !== PENDING) {
										var resolver =
											this.state === FULFILLED ? onFulfilled : onRejected;
										unwrap(promise, resolver, this.outcome);
									} else
										this.queue.push(
											new QueueItem(promise, onFulfilled, onRejected),
										);
									return promise;
								});
							function QueueItem(promise, onFulfilled, onRejected) {
								(this.promise = promise),
									typeof onFulfilled == "function" &&
										((this.onFulfilled = onFulfilled),
										(this.callFulfilled = this.otherCallFulfilled)),
									typeof onRejected == "function" &&
										((this.onRejected = onRejected),
										(this.callRejected = this.otherCallRejected));
							}
							(QueueItem.prototype.callFulfilled = function (value) {
								handlers.resolve(this.promise, value);
							}),
								(QueueItem.prototype.otherCallFulfilled = function (value) {
									unwrap(this.promise, this.onFulfilled, value);
								}),
								(QueueItem.prototype.callRejected = function (value) {
									handlers.reject(this.promise, value);
								}),
								(QueueItem.prototype.otherCallRejected = function (value) {
									unwrap(this.promise, this.onRejected, value);
								});
							function unwrap(promise, func, value) {
								immediate(function () {
									var returnValue;
									try {
										returnValue = func(value);
									} catch (e) {
										return handlers.reject(promise, e);
									}
									returnValue === promise
										? handlers.reject(
												promise,
												new TypeError("Cannot resolve promise with itself"),
											)
										: handlers.resolve(promise, returnValue);
								});
							}
							(handlers.resolve = function (self2, value) {
								var result = tryCatch(getThen, value);
								if (result.status === "error")
									return handlers.reject(self2, result.value);
								var thenable = result.value;
								if (thenable) safelyResolveThenable(self2, thenable);
								else {
									(self2.state = FULFILLED), (self2.outcome = value);
									for (var i = -1, len = self2.queue.length; ++i < len; )
										self2.queue[i].callFulfilled(value);
								}
								return self2;
							}),
								(handlers.reject = function (self2, error) {
									(self2.state = REJECTED), (self2.outcome = error);
									for (var i = -1, len = self2.queue.length; ++i < len; )
										self2.queue[i].callRejected(error);
									return self2;
								});
							function getThen(obj) {
								var then = obj && obj.then;
								if (
									obj &&
									(typeof obj == "object" || typeof obj == "function") &&
									typeof then == "function"
								)
									return function () {
										then.apply(obj, arguments);
									};
							}
							function safelyResolveThenable(self2, thenable) {
								var called = !1;
								function onError(value) {
									called || ((called = !0), handlers.reject(self2, value));
								}
								function onSuccess(value) {
									called || ((called = !0), handlers.resolve(self2, value));
								}
								function tryToUnwrap() {
									thenable(onSuccess, onError);
								}
								var result = tryCatch(tryToUnwrap);
								result.status === "error" && onError(result.value);
							}
							function tryCatch(func, value) {
								var out = {};
								try {
									(out.value = func(value)), (out.status = "success");
								} catch (e) {
									(out.status = "error"), (out.value = e);
								}
								return out;
							}
							Promise2.resolve = resolve;
							function resolve(value) {
								return value instanceof this
									? value
									: handlers.resolve(new this(INTERNAL), value);
							}
							Promise2.reject = reject;
							function reject(reason) {
								var promise = new this(INTERNAL);
								return handlers.reject(promise, reason);
							}
							Promise2.all = all;
							function all(iterable) {
								var self2 = this;
								if (Object.prototype.toString.call(iterable) !== "[object Array]")
									return this.reject(new TypeError("must be an array"));
								var len = iterable.length,
									called = !1;
								if (!len) return this.resolve([]);
								for (
									var values = new Array(len),
										resolved = 0,
										i = -1,
										promise = new this(INTERNAL);
									++i < len;

								)
									allResolver(iterable[i], i);
								return promise;
								function allResolver(value, i2) {
									self2.resolve(value).then(resolveFromAll, function (error) {
										called || ((called = !0), handlers.reject(promise, error));
									});
									function resolveFromAll(outValue) {
										(values[i2] = outValue),
											++resolved === len &&
												!called &&
												((called = !0), handlers.resolve(promise, values));
									}
								}
							}
							Promise2.race = race;
							function race(iterable) {
								var self2 = this;
								if (Object.prototype.toString.call(iterable) !== "[object Array]")
									return this.reject(new TypeError("must be an array"));
								var len = iterable.length,
									called = !1;
								if (!len) return this.resolve([]);
								for (var i = -1, promise = new this(INTERNAL); ++i < len; )
									resolver(iterable[i]);
								return promise;
								function resolver(value) {
									self2.resolve(value).then(
										function (response) {
											called ||
												((called = !0),
												handlers.resolve(promise, response));
										},
										function (error) {
											called ||
												((called = !0), handlers.reject(promise, error));
										},
									);
								}
							}
						},
						{ 1: 1 },
					],
					3: [
						function (_dereq_, module3, exports3) {
							(function (global2) {
								"use strict";
								typeof global2.Promise != "function" &&
									(global2.Promise = _dereq_(2));
							}).call(
								this,
								typeof global < "u"
									? global
									: typeof self < "u"
										? self
										: typeof window < "u"
											? window
											: {},
							);
						},
						{ 2: 2 },
					],
					4: [
						function (_dereq_, module3, exports3) {
							"use strict";
							var _typeof =
								typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
									? function (obj) {
											return typeof obj;
										}
									: function (obj) {
											return obj &&
												typeof Symbol == "function" &&
												obj.constructor === Symbol &&
												obj !== Symbol.prototype
												? "symbol"
												: typeof obj;
										};
							function _classCallCheck(instance, Constructor) {
								if (!(instance instanceof Constructor))
									throw new TypeError("Cannot call a class as a function");
							}
							function getIDB() {
								try {
									if (typeof indexedDB < "u") return indexedDB;
									if (typeof webkitIndexedDB < "u") return webkitIndexedDB;
									if (typeof mozIndexedDB < "u") return mozIndexedDB;
									if (typeof OIndexedDB < "u") return OIndexedDB;
									if (typeof msIndexedDB < "u") return msIndexedDB;
								} catch {
									return;
								}
							}
							var idb = getIDB();
							function isIndexedDBValid() {
								try {
									if (!idb || !idb.open) return !1;
									var isSafari =
											typeof openDatabase < "u" &&
											/(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) &&
											!/Chrome/.test(navigator.userAgent) &&
											!/BlackBerry/.test(navigator.platform),
										hasFetch =
											typeof fetch == "function" &&
											fetch.toString().indexOf("[native code") !== -1;
									return (
										(!isSafari || hasFetch) &&
										typeof indexedDB < "u" && // some outdated implementations of IDB that appear on Samsung
										// and HTC Android devices <4.4 are missing IDBKeyRange
										// See: https://github.com/mozilla/localForage/issues/128
										// See: https://github.com/mozilla/localForage/issues/272
										typeof IDBKeyRange < "u"
									);
								} catch {
									return !1;
								}
							}
							function createBlob(parts, properties) {
								(parts = parts || []), (properties = properties || {});
								try {
									return new Blob(parts, properties);
								} catch (e) {
									if (e.name !== "TypeError") throw e;
									for (
										var Builder =
												typeof BlobBuilder < "u"
													? BlobBuilder
													: typeof MSBlobBuilder < "u"
														? MSBlobBuilder
														: typeof MozBlobBuilder < "u"
															? MozBlobBuilder
															: WebKitBlobBuilder,
											builder = new Builder(),
											i = 0;
										i < parts.length;
										i += 1
									)
										builder.append(parts[i]);
									return builder.getBlob(properties.type);
								}
							}
							typeof Promise > "u" && _dereq_(3);
							var Promise$1 = Promise;
							function executeCallback(promise, callback) {
								callback &&
									promise.then(
										function (result) {
											callback(null, result);
										},
										function (error) {
											callback(error);
										},
									);
							}
							function executeTwoCallbacks(promise, callback, errorCallback) {
								typeof callback == "function" && promise.then(callback),
									typeof errorCallback == "function" &&
										promise.catch(errorCallback);
							}
							function normalizeKey(key2) {
								return (
									typeof key2 != "string" &&
										(console.warn(
											key2 + " used as a key, but it is not a string.",
										),
										(key2 = String(key2))),
									key2
								);
							}
							function getCallback() {
								if (
									arguments.length &&
									typeof arguments[arguments.length - 1] == "function"
								)
									return arguments[arguments.length - 1];
							}
							var DETECT_BLOB_SUPPORT_STORE = "local-forage-detect-blob-support",
								supportsBlobs = void 0,
								dbContexts = {},
								toString = Object.prototype.toString,
								READ_ONLY = "readonly",
								READ_WRITE = "readwrite";
							function _binStringToArrayBuffer(bin) {
								for (
									var length2 = bin.length,
										buf = new ArrayBuffer(length2),
										arr = new Uint8Array(buf),
										i = 0;
									i < length2;
									i++
								)
									arr[i] = bin.charCodeAt(i);
								return buf;
							}
							function _checkBlobSupportWithoutCaching(idb2) {
								return new Promise$1(function (resolve) {
									var txn = idb2.transaction(
											DETECT_BLOB_SUPPORT_STORE,
											READ_WRITE,
										),
										blob = createBlob([""]);
									txn.objectStore(DETECT_BLOB_SUPPORT_STORE).put(blob, "key"),
										(txn.onabort = function (e) {
											e.preventDefault(), e.stopPropagation(), resolve(!1);
										}),
										(txn.oncomplete = function () {
											var matchedChrome =
													navigator.userAgent.match(/Chrome\/(\d+)/),
												matchedEdge = navigator.userAgent.match(/Edge\//);
											resolve(
												matchedEdge ||
													!matchedChrome ||
													parseInt(matchedChrome[1], 10) >= 43,
											);
										});
								}).catch(function () {
									return !1;
								});
							}
							function _checkBlobSupport(idb2) {
								return typeof supportsBlobs == "boolean"
									? Promise$1.resolve(supportsBlobs)
									: _checkBlobSupportWithoutCaching(idb2).then(function (value) {
											return (supportsBlobs = value), supportsBlobs;
										});
							}
							function _deferReadiness(dbInfo) {
								var dbContext = dbContexts[dbInfo.name],
									deferredOperation = {};
								(deferredOperation.promise = new Promise$1(function (
									resolve,
									reject,
								) {
									(deferredOperation.resolve = resolve),
										(deferredOperation.reject = reject);
								})),
									dbContext.deferredOperations.push(deferredOperation),
									dbContext.dbReady
										? (dbContext.dbReady = dbContext.dbReady.then(function () {
												return deferredOperation.promise;
											}))
										: (dbContext.dbReady = deferredOperation.promise);
							}
							function _advanceReadiness(dbInfo) {
								var dbContext = dbContexts[dbInfo.name],
									deferredOperation = dbContext.deferredOperations.pop();
								if (deferredOperation)
									return deferredOperation.resolve(), deferredOperation.promise;
							}
							function _rejectReadiness(dbInfo, err) {
								var dbContext = dbContexts[dbInfo.name],
									deferredOperation = dbContext.deferredOperations.pop();
								if (deferredOperation)
									return deferredOperation.reject(err), deferredOperation.promise;
							}
							function _getConnection(dbInfo, upgradeNeeded) {
								return new Promise$1(function (resolve, reject) {
									if (
										((dbContexts[dbInfo.name] =
											dbContexts[dbInfo.name] || createDbContext()),
										dbInfo.db)
									)
										if (upgradeNeeded)
											_deferReadiness(dbInfo), dbInfo.db.close();
										else return resolve(dbInfo.db);
									var dbArgs = [dbInfo.name];
									upgradeNeeded && dbArgs.push(dbInfo.version);
									var openreq = idb.open.apply(idb, dbArgs);
									upgradeNeeded &&
										(openreq.onupgradeneeded = function (e) {
											var db = openreq.result;
											try {
												db.createObjectStore(dbInfo.storeName),
													e.oldVersion <= 1 &&
														db.createObjectStore(
															DETECT_BLOB_SUPPORT_STORE,
														);
											} catch (ex) {
												if (ex.name === "ConstraintError")
													console.warn(
														'The database "' +
															dbInfo.name +
															'" has been upgraded from version ' +
															e.oldVersion +
															" to version " +
															e.newVersion +
															', but the storage "' +
															dbInfo.storeName +
															'" already exists.',
													);
												else throw ex;
											}
										}),
										(openreq.onerror = function (e) {
											e.preventDefault(), reject(openreq.error);
										}),
										(openreq.onsuccess = function () {
											var db = openreq.result;
											(db.onversionchange = function (e) {
												e.target.close();
											}),
												resolve(db),
												_advanceReadiness(dbInfo);
										});
								});
							}
							function _getOriginalConnection(dbInfo) {
								return _getConnection(dbInfo, !1);
							}
							function _getUpgradedConnection(dbInfo) {
								return _getConnection(dbInfo, !0);
							}
							function _isUpgradeNeeded(dbInfo, defaultVersion) {
								if (!dbInfo.db) return !0;
								var isNewStore = !dbInfo.db.objectStoreNames.contains(
										dbInfo.storeName,
									),
									isDowngrade = dbInfo.version < dbInfo.db.version,
									isUpgrade = dbInfo.version > dbInfo.db.version;
								if (
									(isDowngrade &&
										(dbInfo.version !== defaultVersion &&
											console.warn(
												'The database "' +
													dbInfo.name +
													`" can't be downgraded from version ` +
													dbInfo.db.version +
													" to version " +
													dbInfo.version +
													".",
											),
										(dbInfo.version = dbInfo.db.version)),
									isUpgrade || isNewStore)
								) {
									if (isNewStore) {
										var incVersion = dbInfo.db.version + 1;
										incVersion > dbInfo.version &&
											(dbInfo.version = incVersion);
									}
									return !0;
								}
								return !1;
							}
							function _encodeBlob(blob) {
								return new Promise$1(function (resolve, reject) {
									var reader = new FileReader();
									(reader.onerror = reject),
										(reader.onloadend = function (e) {
											var base64 = btoa(e.target.result || "");
											resolve({
												__local_forage_encoded_blob: !0,
												data: base64,
												type: blob.type,
											});
										}),
										reader.readAsBinaryString(blob);
								});
							}
							function _decodeBlob(encodedBlob) {
								var arrayBuff = _binStringToArrayBuffer(atob(encodedBlob.data));
								return createBlob([arrayBuff], { type: encodedBlob.type });
							}
							function _isEncodedBlob(value) {
								return value && value.__local_forage_encoded_blob;
							}
							function _fullyReady(callback) {
								var self2 = this,
									promise = self2._initReady().then(function () {
										var dbContext = dbContexts[self2._dbInfo.name];
										if (dbContext && dbContext.dbReady)
											return dbContext.dbReady;
									});
								return executeTwoCallbacks(promise, callback, callback), promise;
							}
							function _tryReconnect(dbInfo) {
								_deferReadiness(dbInfo);
								for (
									var dbContext = dbContexts[dbInfo.name],
										forages = dbContext.forages,
										i = 0;
									i < forages.length;
									i++
								) {
									var forage = forages[i];
									forage._dbInfo.db &&
										(forage._dbInfo.db.close(), (forage._dbInfo.db = null));
								}
								return (
									(dbInfo.db = null),
									_getOriginalConnection(dbInfo)
										.then(function (db) {
											return (
												(dbInfo.db = db),
												_isUpgradeNeeded(dbInfo)
													? _getUpgradedConnection(dbInfo)
													: db
											);
										})
										.then(function (db) {
											dbInfo.db = dbContext.db = db;
											for (var i2 = 0; i2 < forages.length; i2++)
												forages[i2]._dbInfo.db = db;
										})
										.catch(function (err) {
											throw (_rejectReadiness(dbInfo, err), err);
										})
								);
							}
							function createTransaction(dbInfo, mode, callback, retries) {
								retries === void 0 && (retries = 1);
								try {
									var tx = dbInfo.db.transaction(dbInfo.storeName, mode);
									callback(null, tx);
								} catch (err) {
									if (
										retries > 0 &&
										(!dbInfo.db ||
											err.name === "InvalidStateError" ||
											err.name === "NotFoundError")
									)
										return Promise$1.resolve()
											.then(function () {
												if (
													!dbInfo.db ||
													(err.name === "NotFoundError" &&
														!dbInfo.db.objectStoreNames.contains(
															dbInfo.storeName,
														) &&
														dbInfo.version <= dbInfo.db.version)
												)
													return (
														dbInfo.db &&
															(dbInfo.version =
																dbInfo.db.version + 1),
														_getUpgradedConnection(dbInfo)
													);
											})
											.then(function () {
												return _tryReconnect(dbInfo).then(function () {
													createTransaction(
														dbInfo,
														mode,
														callback,
														retries - 1,
													);
												});
											})
											.catch(callback);
									callback(err);
								}
							}
							function createDbContext() {
								return {
									// Running localForages sharing a database.
									forages: [],
									// Shared database.
									db: null,
									// Database readiness (promise).
									dbReady: null,
									// Deferred operations on the database.
									deferredOperations: [],
								};
							}
							function _initStorage(options) {
								var self2 = this,
									dbInfo = {
										db: null,
									};
								if (options) for (var i in options) dbInfo[i] = options[i];
								var dbContext = dbContexts[dbInfo.name];
								dbContext ||
									((dbContext = createDbContext()),
									(dbContexts[dbInfo.name] = dbContext)),
									dbContext.forages.push(self2),
									self2._initReady ||
										((self2._initReady = self2.ready),
										(self2.ready = _fullyReady));
								var initPromises = [];
								function ignoreErrors() {
									return Promise$1.resolve();
								}
								for (var j = 0; j < dbContext.forages.length; j++) {
									var forage = dbContext.forages[j];
									forage !== self2 &&
										initPromises.push(forage._initReady().catch(ignoreErrors));
								}
								var forages = dbContext.forages.slice(0);
								return Promise$1.all(initPromises)
									.then(function () {
										return (
											(dbInfo.db = dbContext.db),
											_getOriginalConnection(dbInfo)
										);
									})
									.then(function (db) {
										return (
											(dbInfo.db = db),
											_isUpgradeNeeded(dbInfo, self2._defaultConfig.version)
												? _getUpgradedConnection(dbInfo)
												: db
										);
									})
									.then(function (db) {
										(dbInfo.db = dbContext.db = db), (self2._dbInfo = dbInfo);
										for (var k = 0; k < forages.length; k++) {
											var forage2 = forages[k];
											forage2 !== self2 &&
												((forage2._dbInfo.db = dbInfo.db),
												(forage2._dbInfo.version = dbInfo.version));
										}
									});
							}
							function getItem(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									self2
										.ready()
										.then(function () {
											createTransaction(
												self2._dbInfo,
												READ_ONLY,
												function (err, transaction) {
													if (err) return reject(err);
													try {
														var store = transaction.objectStore(
																self2._dbInfo.storeName,
															),
															req = store.get(key2);
														(req.onsuccess = function () {
															var value = req.result;
															value === void 0 && (value = null),
																_isEncodedBlob(value) &&
																	(value = _decodeBlob(value)),
																resolve(value);
														}),
															(req.onerror = function () {
																reject(req.error);
															});
													} catch (e) {
														reject(e);
													}
												},
											);
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function iterate(iterator, callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												createTransaction(
													self2._dbInfo,
													READ_ONLY,
													function (err, transaction) {
														if (err) return reject(err);
														try {
															var store = transaction.objectStore(
																	self2._dbInfo.storeName,
																),
																req = store.openCursor(),
																iterationNumber = 1;
															(req.onsuccess = function () {
																var cursor = req.result;
																if (cursor) {
																	var value = cursor.value;
																	_isEncodedBlob(value) &&
																		(value =
																			_decodeBlob(value));
																	var result = iterator(
																		value,
																		cursor.key,
																		iterationNumber++,
																	);
																	result !== void 0
																		? resolve(result)
																		: cursor.continue();
																} else resolve();
															}),
																(req.onerror = function () {
																	reject(req.error);
																});
														} catch (e) {
															reject(e);
														}
													},
												);
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function setItem(key2, value, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									var dbInfo;
									self2
										.ready()
										.then(function () {
											return (
												(dbInfo = self2._dbInfo),
												toString.call(value) === "[object Blob]"
													? _checkBlobSupport(dbInfo.db).then(
															function (blobSupport) {
																return blobSupport
																	? value
																	: _encodeBlob(value);
															},
														)
													: value
											);
										})
										.then(function (value2) {
											createTransaction(
												self2._dbInfo,
												READ_WRITE,
												function (err, transaction) {
													if (err) return reject(err);
													try {
														var store = transaction.objectStore(
															self2._dbInfo.storeName,
														);
														value2 === null && (value2 = void 0);
														var req = store.put(value2, key2);
														(transaction.oncomplete = function () {
															value2 === void 0 && (value2 = null),
																resolve(value2);
														}),
															(transaction.onabort =
																transaction.onerror =
																	function () {
																		var err2 = req.error
																			? req.error
																			: req.transaction.error;
																		reject(err2);
																	});
													} catch (e) {
														reject(e);
													}
												},
											);
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function removeItem(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									self2
										.ready()
										.then(function () {
											createTransaction(
												self2._dbInfo,
												READ_WRITE,
												function (err, transaction) {
													if (err) return reject(err);
													try {
														var store = transaction.objectStore(
																self2._dbInfo.storeName,
															),
															req = store.delete(key2);
														(transaction.oncomplete = function () {
															resolve();
														}),
															(transaction.onerror = function () {
																reject(req.error);
															}),
															(transaction.onabort = function () {
																var err2 = req.error
																	? req.error
																	: req.transaction.error;
																reject(err2);
															});
													} catch (e) {
														reject(e);
													}
												},
											);
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function clear(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												createTransaction(
													self2._dbInfo,
													READ_WRITE,
													function (err, transaction) {
														if (err) return reject(err);
														try {
															var store = transaction.objectStore(
																	self2._dbInfo.storeName,
																),
																req = store.clear();
															(transaction.oncomplete = function () {
																resolve();
															}),
																(transaction.onabort =
																	transaction.onerror =
																		function () {
																			var err2 = req.error
																				? req.error
																				: req.transaction
																						.error;
																			reject(err2);
																		});
														} catch (e) {
															reject(e);
														}
													},
												);
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function length(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												createTransaction(
													self2._dbInfo,
													READ_ONLY,
													function (err, transaction) {
														if (err) return reject(err);
														try {
															var store = transaction.objectStore(
																	self2._dbInfo.storeName,
																),
																req = store.count();
															(req.onsuccess = function () {
																resolve(req.result);
															}),
																(req.onerror = function () {
																	reject(req.error);
																});
														} catch (e) {
															reject(e);
														}
													},
												);
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function key(n, callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										if (n < 0) {
											resolve(null);
											return;
										}
										self2
											.ready()
											.then(function () {
												createTransaction(
													self2._dbInfo,
													READ_ONLY,
													function (err, transaction) {
														if (err) return reject(err);
														try {
															var store = transaction.objectStore(
																	self2._dbInfo.storeName,
																),
																advanced = !1,
																req = store.openKeyCursor();
															(req.onsuccess = function () {
																var cursor = req.result;
																if (!cursor) {
																	resolve(null);
																	return;
																}
																n === 0 || advanced
																	? resolve(cursor.key)
																	: ((advanced = !0),
																		cursor.advance(n));
															}),
																(req.onerror = function () {
																	reject(req.error);
																});
														} catch (e) {
															reject(e);
														}
													},
												);
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function keys(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												createTransaction(
													self2._dbInfo,
													READ_ONLY,
													function (err, transaction) {
														if (err) return reject(err);
														try {
															var store = transaction.objectStore(
																	self2._dbInfo.storeName,
																),
																req = store.openKeyCursor(),
																keys2 = [];
															(req.onsuccess = function () {
																var cursor = req.result;
																if (!cursor) {
																	resolve(keys2);
																	return;
																}
																keys2.push(cursor.key),
																	cursor.continue();
															}),
																(req.onerror = function () {
																	reject(req.error);
																});
														} catch (e) {
															reject(e);
														}
													},
												);
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function dropInstance(options, callback) {
								callback = getCallback.apply(this, arguments);
								var currentConfig = this.config();
								(options = (typeof options != "function" && options) || {}),
									options.name ||
										((options.name = options.name || currentConfig.name),
										(options.storeName =
											options.storeName || currentConfig.storeName));
								var self2 = this,
									promise;
								if (!options.name) promise = Promise$1.reject("Invalid arguments");
								else {
									var isCurrentDb =
											options.name === currentConfig.name && self2._dbInfo.db,
										dbPromise = isCurrentDb
											? Promise$1.resolve(self2._dbInfo.db)
											: _getOriginalConnection(options).then(function (db) {
													var dbContext = dbContexts[options.name],
														forages = dbContext.forages;
													dbContext.db = db;
													for (var i = 0; i < forages.length; i++)
														forages[i]._dbInfo.db = db;
													return db;
												});
									options.storeName
										? (promise = dbPromise.then(function (db) {
												if (
													db.objectStoreNames.contains(options.storeName)
												) {
													var newVersion = db.version + 1;
													_deferReadiness(options);
													var dbContext = dbContexts[options.name],
														forages = dbContext.forages;
													db.close();
													for (var i = 0; i < forages.length; i++) {
														var forage = forages[i];
														(forage._dbInfo.db = null),
															(forage._dbInfo.version = newVersion);
													}
													var dropObjectPromise = new Promise$1(function (
														resolve,
														reject,
													) {
														var req = idb.open(
															options.name,
															newVersion,
														);
														(req.onerror = function (err) {
															var db2 = req.result;
															db2.close(), reject(err);
														}),
															(req.onupgradeneeded = function () {
																var db2 = req.result;
																db2.deleteObjectStore(
																	options.storeName,
																);
															}),
															(req.onsuccess = function () {
																var db2 = req.result;
																db2.close(), resolve(db2);
															});
													});
													return dropObjectPromise
														.then(function (db2) {
															dbContext.db = db2;
															for (
																var j = 0;
																j < forages.length;
																j++
															) {
																var _forage2 = forages[j];
																(_forage2._dbInfo.db = db2),
																	_advanceReadiness(
																		_forage2._dbInfo,
																	);
															}
														})
														.catch(function (err) {
															throw (
																((
																	_rejectReadiness(
																		options,
																		err,
																	) || Promise$1.resolve()
																).catch(function () {}),
																err)
															);
														});
												}
											}))
										: (promise = dbPromise.then(function (db) {
												_deferReadiness(options);
												var dbContext = dbContexts[options.name],
													forages = dbContext.forages;
												db.close();
												for (var i = 0; i < forages.length; i++) {
													var forage = forages[i];
													forage._dbInfo.db = null;
												}
												var dropDBPromise = new Promise$1(function (
													resolve,
													reject,
												) {
													var req = idb.deleteDatabase(options.name);
													(req.onerror = function () {
														var db2 = req.result;
														db2 && db2.close(), reject(req.error);
													}),
														(req.onblocked = function () {
															console.warn(
																'dropInstance blocked for database "' +
																	options.name +
																	'" until all open connections are closed',
															);
														}),
														(req.onsuccess = function () {
															var db2 = req.result;
															db2 && db2.close(), resolve(db2);
														});
												});
												return dropDBPromise
													.then(function (db2) {
														dbContext.db = db2;
														for (
															var i2 = 0;
															i2 < forages.length;
															i2++
														) {
															var _forage = forages[i2];
															_advanceReadiness(_forage._dbInfo);
														}
													})
													.catch(function (err) {
														throw (
															((
																_rejectReadiness(options, err) ||
																Promise$1.resolve()
															).catch(function () {}),
															err)
														);
													});
											}));
								}
								return executeCallback(promise, callback), promise;
							}
							var asyncStorage = {
								_driver: "asyncStorage",
								_initStorage,
								_support: isIndexedDBValid(),
								iterate,
								getItem,
								setItem,
								removeItem,
								clear,
								length,
								key,
								keys,
								dropInstance,
							};
							function isWebSQLValid() {
								return typeof openDatabase == "function";
							}
							var BASE_CHARS =
									"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
								BLOB_TYPE_PREFIX = "~~local_forage_type~",
								BLOB_TYPE_PREFIX_REGEX = /^~~local_forage_type~([^~]+)~/,
								SERIALIZED_MARKER = "__lfsc__:",
								SERIALIZED_MARKER_LENGTH = SERIALIZED_MARKER.length,
								TYPE_ARRAYBUFFER = "arbf",
								TYPE_BLOB = "blob",
								TYPE_INT8ARRAY = "si08",
								TYPE_UINT8ARRAY = "ui08",
								TYPE_UINT8CLAMPEDARRAY = "uic8",
								TYPE_INT16ARRAY = "si16",
								TYPE_INT32ARRAY = "si32",
								TYPE_UINT16ARRAY = "ur16",
								TYPE_UINT32ARRAY = "ui32",
								TYPE_FLOAT32ARRAY = "fl32",
								TYPE_FLOAT64ARRAY = "fl64",
								TYPE_SERIALIZED_MARKER_LENGTH =
									SERIALIZED_MARKER_LENGTH + TYPE_ARRAYBUFFER.length,
								toString$1 = Object.prototype.toString;
							function stringToBuffer(serializedString) {
								var bufferLength = serializedString.length * 0.75,
									len = serializedString.length,
									i,
									p = 0,
									encoded1,
									encoded2,
									encoded3,
									encoded4;
								serializedString[serializedString.length - 1] === "=" &&
									(bufferLength--,
									serializedString[serializedString.length - 2] === "=" &&
										bufferLength--);
								var buffer = new ArrayBuffer(bufferLength),
									bytes = new Uint8Array(buffer);
								for (i = 0; i < len; i += 4)
									(encoded1 = BASE_CHARS.indexOf(serializedString[i])),
										(encoded2 = BASE_CHARS.indexOf(serializedString[i + 1])),
										(encoded3 = BASE_CHARS.indexOf(serializedString[i + 2])),
										(encoded4 = BASE_CHARS.indexOf(serializedString[i + 3])),
										(bytes[p++] = (encoded1 << 2) | (encoded2 >> 4)),
										(bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2)),
										(bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63));
								return buffer;
							}
							function bufferToString(buffer) {
								var bytes = new Uint8Array(buffer),
									base64String = "",
									i;
								for (i = 0; i < bytes.length; i += 3)
									(base64String += BASE_CHARS[bytes[i] >> 2]),
										(base64String +=
											BASE_CHARS[
												((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)
											]),
										(base64String +=
											BASE_CHARS[
												((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)
											]),
										(base64String += BASE_CHARS[bytes[i + 2] & 63]);
								return (
									bytes.length % 3 === 2
										? (base64String =
												base64String.substring(0, base64String.length - 1) +
												"=")
										: bytes.length % 3 === 1 &&
											(base64String =
												base64String.substring(0, base64String.length - 2) +
												"=="),
									base64String
								);
							}
							function serialize(value, callback) {
								var valueType = "";
								if (
									(value && (valueType = toString$1.call(value)),
									value &&
										(valueType === "[object ArrayBuffer]" ||
											(value.buffer &&
												toString$1.call(value.buffer) ===
													"[object ArrayBuffer]")))
								) {
									var buffer,
										marker = SERIALIZED_MARKER;
									value instanceof ArrayBuffer
										? ((buffer = value), (marker += TYPE_ARRAYBUFFER))
										: ((buffer = value.buffer),
											valueType === "[object Int8Array]"
												? (marker += TYPE_INT8ARRAY)
												: valueType === "[object Uint8Array]"
													? (marker += TYPE_UINT8ARRAY)
													: valueType === "[object Uint8ClampedArray]"
														? (marker += TYPE_UINT8CLAMPEDARRAY)
														: valueType === "[object Int16Array]"
															? (marker += TYPE_INT16ARRAY)
															: valueType === "[object Uint16Array]"
																? (marker += TYPE_UINT16ARRAY)
																: valueType ===
																	  "[object Int32Array]"
																	? (marker += TYPE_INT32ARRAY)
																	: valueType ===
																		  "[object Uint32Array]"
																		? (marker +=
																				TYPE_UINT32ARRAY)
																		: valueType ===
																			  "[object Float32Array]"
																			? (marker +=
																					TYPE_FLOAT32ARRAY)
																			: valueType ===
																				  "[object Float64Array]"
																				? (marker +=
																						TYPE_FLOAT64ARRAY)
																				: callback(
																						new Error(
																							"Failed to get type for BinaryArray",
																						),
																					)),
										callback(marker + bufferToString(buffer));
								} else if (valueType === "[object Blob]") {
									var fileReader = new FileReader();
									(fileReader.onload = function () {
										var str =
											BLOB_TYPE_PREFIX +
											value.type +
											"~" +
											bufferToString(this.result);
										callback(SERIALIZED_MARKER + TYPE_BLOB + str);
									}),
										fileReader.readAsArrayBuffer(value);
								} else
									try {
										callback(JSON.stringify(value));
									} catch (e) {
										console.error(
											"Couldn't convert value into a JSON string: ",
											value,
										),
											callback(null, e);
									}
							}
							function deserialize(value) {
								if (
									value.substring(0, SERIALIZED_MARKER_LENGTH) !==
									SERIALIZED_MARKER
								)
									return JSON.parse(value);
								var serializedString = value.substring(
										TYPE_SERIALIZED_MARKER_LENGTH,
									),
									type = value.substring(
										SERIALIZED_MARKER_LENGTH,
										TYPE_SERIALIZED_MARKER_LENGTH,
									),
									blobType;
								if (
									type === TYPE_BLOB &&
									BLOB_TYPE_PREFIX_REGEX.test(serializedString)
								) {
									var matcher = serializedString.match(BLOB_TYPE_PREFIX_REGEX);
									(blobType = matcher[1]),
										(serializedString = serializedString.substring(
											matcher[0].length,
										));
								}
								var buffer = stringToBuffer(serializedString);
								switch (type) {
									case TYPE_ARRAYBUFFER:
										return buffer;
									case TYPE_BLOB:
										return createBlob([buffer], { type: blobType });
									case TYPE_INT8ARRAY:
										return new Int8Array(buffer);
									case TYPE_UINT8ARRAY:
										return new Uint8Array(buffer);
									case TYPE_UINT8CLAMPEDARRAY:
										return new Uint8ClampedArray(buffer);
									case TYPE_INT16ARRAY:
										return new Int16Array(buffer);
									case TYPE_UINT16ARRAY:
										return new Uint16Array(buffer);
									case TYPE_INT32ARRAY:
										return new Int32Array(buffer);
									case TYPE_UINT32ARRAY:
										return new Uint32Array(buffer);
									case TYPE_FLOAT32ARRAY:
										return new Float32Array(buffer);
									case TYPE_FLOAT64ARRAY:
										return new Float64Array(buffer);
									default:
										throw new Error("Unkown type: " + type);
								}
							}
							var localforageSerializer = {
								serialize,
								deserialize,
								stringToBuffer,
								bufferToString,
							};
							function createDbTable(t, dbInfo, callback, errorCallback) {
								t.executeSql(
									"CREATE TABLE IF NOT EXISTS " +
										dbInfo.storeName +
										" (id INTEGER PRIMARY KEY, key unique, value)",
									[],
									callback,
									errorCallback,
								);
							}
							function _initStorage$1(options) {
								var self2 = this,
									dbInfo = {
										db: null,
									};
								if (options)
									for (var i in options)
										dbInfo[i] =
											typeof options[i] != "string"
												? options[i].toString()
												: options[i];
								var dbInfoPromise = new Promise$1(function (resolve, reject) {
									try {
										dbInfo.db = openDatabase(
											dbInfo.name,
											String(dbInfo.version),
											dbInfo.description,
											dbInfo.size,
										);
									} catch (e) {
										return reject(e);
									}
									dbInfo.db.transaction(function (t) {
										createDbTable(
											t,
											dbInfo,
											function () {
												(self2._dbInfo = dbInfo), resolve();
											},
											function (t2, error) {
												reject(error);
											},
										);
									}, reject);
								});
								return (dbInfo.serializer = localforageSerializer), dbInfoPromise;
							}
							function tryExecuteSql(
								t,
								dbInfo,
								sqlStatement,
								args,
								callback,
								errorCallback,
							) {
								t.executeSql(
									sqlStatement,
									args,
									callback,
									function (t2, error) {
										error.code === error.SYNTAX_ERR
											? t2.executeSql(
													"SELECT name FROM sqlite_master WHERE type='table' AND name = ?",
													[dbInfo.storeName],
													function (t3, results) {
														results.rows.length
															? errorCallback(t3, error)
															: createDbTable(
																	t3,
																	dbInfo,
																	function () {
																		t3.executeSql(
																			sqlStatement,
																			args,
																			callback,
																			errorCallback,
																		);
																	},
																	errorCallback,
																);
													},
													errorCallback,
												)
											: errorCallback(t2, error);
									},
									errorCallback,
								);
							}
							function getItem$1(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									self2
										.ready()
										.then(function () {
											var dbInfo = self2._dbInfo;
											dbInfo.db.transaction(function (t) {
												tryExecuteSql(
													t,
													dbInfo,
													"SELECT * FROM " +
														dbInfo.storeName +
														" WHERE key = ? LIMIT 1",
													[key2],
													function (t2, results) {
														var result = results.rows.length
															? results.rows.item(0).value
															: null;
														result &&
															(result =
																dbInfo.serializer.deserialize(
																	result,
																)),
															resolve(result);
													},
													function (t2, error) {
														reject(error);
													},
												);
											});
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function iterate$1(iterator, callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												var dbInfo = self2._dbInfo;
												dbInfo.db.transaction(function (t) {
													tryExecuteSql(
														t,
														dbInfo,
														"SELECT * FROM " + dbInfo.storeName,
														[],
														function (t2, results) {
															for (
																var rows = results.rows,
																	length2 = rows.length,
																	i = 0;
																i < length2;
																i++
															) {
																var item = rows.item(i),
																	result = item.value;
																if (
																	(result &&
																		(result =
																			dbInfo.serializer.deserialize(
																				result,
																			)),
																	(result = iterator(
																		result,
																		item.key,
																		i + 1,
																	)),
																	result !== void 0)
																) {
																	resolve(result);
																	return;
																}
															}
															resolve();
														},
														function (t2, error) {
															reject(error);
														},
													);
												});
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function _setItem(key2, value, callback, retriesLeft) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									self2
										.ready()
										.then(function () {
											value === void 0 && (value = null);
											var originalValue = value,
												dbInfo = self2._dbInfo;
											dbInfo.serializer.serialize(
												value,
												function (value2, error) {
													error
														? reject(error)
														: dbInfo.db.transaction(
																function (t) {
																	tryExecuteSql(
																		t,
																		dbInfo,
																		"INSERT OR REPLACE INTO " +
																			dbInfo.storeName +
																			" (key, value) VALUES (?, ?)",
																		[key2, value2],
																		function () {
																			resolve(originalValue);
																		},
																		function (t2, error2) {
																			reject(error2);
																		},
																	);
																},
																function (sqlError) {
																	if (
																		sqlError.code ===
																		sqlError.QUOTA_ERR
																	) {
																		if (retriesLeft > 0) {
																			resolve(
																				_setItem.apply(
																					self2,
																					[
																						key2,
																						originalValue,
																						callback,
																						retriesLeft -
																							1,
																					],
																				),
																			);
																			return;
																		}
																		reject(sqlError);
																	}
																},
															);
												},
											);
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function setItem$1(key2, value, callback) {
								return _setItem.apply(this, [key2, value, callback, 1]);
							}
							function removeItem$1(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = new Promise$1(function (resolve, reject) {
									self2
										.ready()
										.then(function () {
											var dbInfo = self2._dbInfo;
											dbInfo.db.transaction(function (t) {
												tryExecuteSql(
													t,
													dbInfo,
													"DELETE FROM " +
														dbInfo.storeName +
														" WHERE key = ?",
													[key2],
													function () {
														resolve();
													},
													function (t2, error) {
														reject(error);
													},
												);
											});
										})
										.catch(reject);
								});
								return executeCallback(promise, callback), promise;
							}
							function clear$1(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												var dbInfo = self2._dbInfo;
												dbInfo.db.transaction(function (t) {
													tryExecuteSql(
														t,
														dbInfo,
														"DELETE FROM " + dbInfo.storeName,
														[],
														function () {
															resolve();
														},
														function (t2, error) {
															reject(error);
														},
													);
												});
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function length$1(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												var dbInfo = self2._dbInfo;
												dbInfo.db.transaction(function (t) {
													tryExecuteSql(
														t,
														dbInfo,
														"SELECT COUNT(key) as c FROM " +
															dbInfo.storeName,
														[],
														function (t2, results) {
															var result = results.rows.item(0).c;
															resolve(result);
														},
														function (t2, error) {
															reject(error);
														},
													);
												});
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function key$1(n, callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												var dbInfo = self2._dbInfo;
												dbInfo.db.transaction(function (t) {
													tryExecuteSql(
														t,
														dbInfo,
														"SELECT key FROM " +
															dbInfo.storeName +
															" WHERE id = ? LIMIT 1",
														[n + 1],
														function (t2, results) {
															var result = results.rows.length
																? results.rows.item(0).key
																: null;
															resolve(result);
														},
														function (t2, error) {
															reject(error);
														},
													);
												});
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function keys$1(callback) {
								var self2 = this,
									promise = new Promise$1(function (resolve, reject) {
										self2
											.ready()
											.then(function () {
												var dbInfo = self2._dbInfo;
												dbInfo.db.transaction(function (t) {
													tryExecuteSql(
														t,
														dbInfo,
														"SELECT key FROM " + dbInfo.storeName,
														[],
														function (t2, results) {
															for (
																var keys2 = [], i = 0;
																i < results.rows.length;
																i++
															)
																keys2.push(
																	results.rows.item(i).key,
																);
															resolve(keys2);
														},
														function (t2, error) {
															reject(error);
														},
													);
												});
											})
											.catch(reject);
									});
								return executeCallback(promise, callback), promise;
							}
							function getAllStoreNames(db) {
								return new Promise$1(function (resolve, reject) {
									db.transaction(
										function (t) {
											t.executeSql(
												"SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'",
												[],
												function (t2, results) {
													for (
														var storeNames = [], i = 0;
														i < results.rows.length;
														i++
													)
														storeNames.push(results.rows.item(i).name);
													resolve({
														db,
														storeNames,
													});
												},
												function (t2, error) {
													reject(error);
												},
											);
										},
										function (sqlError) {
											reject(sqlError);
										},
									);
								});
							}
							function dropInstance$1(options, callback) {
								callback = getCallback.apply(this, arguments);
								var currentConfig = this.config();
								(options = (typeof options != "function" && options) || {}),
									options.name ||
										((options.name = options.name || currentConfig.name),
										(options.storeName =
											options.storeName || currentConfig.storeName));
								var self2 = this,
									promise;
								return (
									options.name
										? (promise = new Promise$1(function (resolve) {
												var db;
												options.name === currentConfig.name
													? (db = self2._dbInfo.db)
													: (db = openDatabase(options.name, "", "", 0)),
													options.storeName
														? resolve({
																db,
																storeNames: [options.storeName],
															})
														: resolve(getAllStoreNames(db));
											}).then(function (operationInfo) {
												return new Promise$1(function (resolve, reject) {
													operationInfo.db.transaction(
														function (t) {
															function dropTable(storeName) {
																return new Promise$1(function (
																	resolve2,
																	reject2,
																) {
																	t.executeSql(
																		"DROP TABLE IF EXISTS " +
																			storeName,
																		[],
																		function () {
																			resolve2();
																		},
																		function (t2, error) {
																			reject2(error);
																		},
																	);
																});
															}
															for (
																var operations = [],
																	i = 0,
																	len =
																		operationInfo.storeNames
																			.length;
																i < len;
																i++
															)
																operations.push(
																	dropTable(
																		operationInfo.storeNames[i],
																	),
																);
															Promise$1.all(operations)
																.then(function () {
																	resolve();
																})
																.catch(function (e) {
																	reject(e);
																});
														},
														function (sqlError) {
															reject(sqlError);
														},
													);
												});
											}))
										: (promise = Promise$1.reject("Invalid arguments")),
									executeCallback(promise, callback),
									promise
								);
							}
							var webSQLStorage = {
								_driver: "webSQLStorage",
								_initStorage: _initStorage$1,
								_support: isWebSQLValid(),
								iterate: iterate$1,
								getItem: getItem$1,
								setItem: setItem$1,
								removeItem: removeItem$1,
								clear: clear$1,
								length: length$1,
								key: key$1,
								keys: keys$1,
								dropInstance: dropInstance$1,
							};
							function isLocalStorageValid() {
								try {
									return (
										typeof localStorage < "u" &&
										"setItem" in localStorage && // in IE8 typeof localStorage.setItem === 'object'
										!!localStorage.setItem
									);
								} catch {
									return !1;
								}
							}
							function _getKeyPrefix(options, defaultConfig) {
								var keyPrefix = options.name + "/";
								return (
									options.storeName !== defaultConfig.storeName &&
										(keyPrefix += options.storeName + "/"),
									keyPrefix
								);
							}
							function checkIfLocalStorageThrows() {
								var localStorageTestKey = "_localforage_support_test";
								try {
									return (
										localStorage.setItem(localStorageTestKey, !0),
										localStorage.removeItem(localStorageTestKey),
										!1
									);
								} catch {
									return !0;
								}
							}
							function _isLocalStorageUsable() {
								return !checkIfLocalStorageThrows() || localStorage.length > 0;
							}
							function _initStorage$2(options) {
								var self2 = this,
									dbInfo = {};
								if (options) for (var i in options) dbInfo[i] = options[i];
								return (
									(dbInfo.keyPrefix = _getKeyPrefix(
										options,
										self2._defaultConfig,
									)),
									_isLocalStorageUsable()
										? ((self2._dbInfo = dbInfo),
											(dbInfo.serializer = localforageSerializer),
											Promise$1.resolve())
										: Promise$1.reject()
								);
							}
							function clear$2(callback) {
								var self2 = this,
									promise = self2.ready().then(function () {
										for (
											var keyPrefix = self2._dbInfo.keyPrefix,
												i = localStorage.length - 1;
											i >= 0;
											i--
										) {
											var key2 = localStorage.key(i);
											key2.indexOf(keyPrefix) === 0 &&
												localStorage.removeItem(key2);
										}
									});
								return executeCallback(promise, callback), promise;
							}
							function getItem$2(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = self2.ready().then(function () {
									var dbInfo = self2._dbInfo,
										result = localStorage.getItem(dbInfo.keyPrefix + key2);
									return (
										result && (result = dbInfo.serializer.deserialize(result)),
										result
									);
								});
								return executeCallback(promise, callback), promise;
							}
							function iterate$2(iterator, callback) {
								var self2 = this,
									promise = self2.ready().then(function () {
										for (
											var dbInfo = self2._dbInfo,
												keyPrefix = dbInfo.keyPrefix,
												keyPrefixLength = keyPrefix.length,
												length2 = localStorage.length,
												iterationNumber = 1,
												i = 0;
											i < length2;
											i++
										) {
											var key2 = localStorage.key(i);
											if (key2.indexOf(keyPrefix) === 0) {
												var value = localStorage.getItem(key2);
												if (
													(value &&
														(value =
															dbInfo.serializer.deserialize(value)),
													(value = iterator(
														value,
														key2.substring(keyPrefixLength),
														iterationNumber++,
													)),
													value !== void 0)
												)
													return value;
											}
										}
									});
								return executeCallback(promise, callback), promise;
							}
							function key$2(n, callback) {
								var self2 = this,
									promise = self2.ready().then(function () {
										var dbInfo = self2._dbInfo,
											result;
										try {
											result = localStorage.key(n);
										} catch {
											result = null;
										}
										return (
											result &&
												(result = result.substring(
													dbInfo.keyPrefix.length,
												)),
											result
										);
									});
								return executeCallback(promise, callback), promise;
							}
							function keys$2(callback) {
								var self2 = this,
									promise = self2.ready().then(function () {
										for (
											var dbInfo = self2._dbInfo,
												length2 = localStorage.length,
												keys2 = [],
												i = 0;
											i < length2;
											i++
										) {
											var itemKey = localStorage.key(i);
											itemKey.indexOf(dbInfo.keyPrefix) === 0 &&
												keys2.push(
													itemKey.substring(dbInfo.keyPrefix.length),
												);
										}
										return keys2;
									});
								return executeCallback(promise, callback), promise;
							}
							function length$2(callback) {
								var self2 = this,
									promise = self2.keys().then(function (keys2) {
										return keys2.length;
									});
								return executeCallback(promise, callback), promise;
							}
							function removeItem$2(key2, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = self2.ready().then(function () {
									var dbInfo = self2._dbInfo;
									localStorage.removeItem(dbInfo.keyPrefix + key2);
								});
								return executeCallback(promise, callback), promise;
							}
							function setItem$2(key2, value, callback) {
								var self2 = this;
								key2 = normalizeKey(key2);
								var promise = self2.ready().then(function () {
									value === void 0 && (value = null);
									var originalValue = value;
									return new Promise$1(function (resolve, reject) {
										var dbInfo = self2._dbInfo;
										dbInfo.serializer.serialize(
											value,
											function (value2, error) {
												if (error) reject(error);
												else
													try {
														localStorage.setItem(
															dbInfo.keyPrefix + key2,
															value2,
														),
															resolve(originalValue);
													} catch (e) {
														(e.name === "QuotaExceededError" ||
															e.name ===
																"NS_ERROR_DOM_QUOTA_REACHED") &&
															reject(e),
															reject(e);
													}
											},
										);
									});
								});
								return executeCallback(promise, callback), promise;
							}
							function dropInstance$2(options, callback) {
								if (
									((callback = getCallback.apply(this, arguments)),
									(options = (typeof options != "function" && options) || {}),
									!options.name)
								) {
									var currentConfig = this.config();
									(options.name = options.name || currentConfig.name),
										(options.storeName =
											options.storeName || currentConfig.storeName);
								}
								var self2 = this,
									promise;
								return (
									options.name
										? (promise = new Promise$1(function (resolve) {
												options.storeName
													? resolve(
															_getKeyPrefix(
																options,
																self2._defaultConfig,
															),
														)
													: resolve(options.name + "/");
											}).then(function (keyPrefix) {
												for (var i = localStorage.length - 1; i >= 0; i--) {
													var key2 = localStorage.key(i);
													key2.indexOf(keyPrefix) === 0 &&
														localStorage.removeItem(key2);
												}
											}))
										: (promise = Promise$1.reject("Invalid arguments")),
									executeCallback(promise, callback),
									promise
								);
							}
							var localStorageWrapper = {
									_driver: "localStorageWrapper",
									_initStorage: _initStorage$2,
									_support: isLocalStorageValid(),
									iterate: iterate$2,
									getItem: getItem$2,
									setItem: setItem$2,
									removeItem: removeItem$2,
									clear: clear$2,
									length: length$2,
									key: key$2,
									keys: keys$2,
									dropInstance: dropInstance$2,
								},
								sameValue = function (x, y) {
									return (
										x === y ||
										(typeof x == "number" &&
											typeof y == "number" &&
											isNaN(x) &&
											isNaN(y))
									);
								},
								includes = function (array, searchElement) {
									for (var len = array.length, i = 0; i < len; ) {
										if (sameValue(array[i], searchElement)) return !0;
										i++;
									}
									return !1;
								},
								isArray =
									Array.isArray ||
									function (arg) {
										return (
											Object.prototype.toString.call(arg) === "[object Array]"
										);
									},
								DefinedDrivers = {},
								DriverSupport = {},
								DefaultDrivers = {
									INDEXEDDB: asyncStorage,
									WEBSQL: webSQLStorage,
									LOCALSTORAGE: localStorageWrapper,
								},
								DefaultDriverOrder = [
									DefaultDrivers.INDEXEDDB._driver,
									DefaultDrivers.WEBSQL._driver,
									DefaultDrivers.LOCALSTORAGE._driver,
								],
								OptionalDriverMethods = ["dropInstance"],
								LibraryMethods = [
									"clear",
									"getItem",
									"iterate",
									"key",
									"keys",
									"length",
									"removeItem",
									"setItem",
								].concat(OptionalDriverMethods),
								DefaultConfig = {
									description: "",
									driver: DefaultDriverOrder.slice(),
									name: "localforage",
									// Default DB size is _JUST UNDER_ 5MB, as it's the highest size
									// we can use without a prompt.
									size: 4980736,
									storeName: "keyvaluepairs",
									version: 1,
								};
							function callWhenReady(localForageInstance, libraryMethod) {
								localForageInstance[libraryMethod] = function () {
									var _args = arguments;
									return localForageInstance.ready().then(function () {
										return localForageInstance[libraryMethod].apply(
											localForageInstance,
											_args,
										);
									});
								};
							}
							function extend() {
								for (var i = 1; i < arguments.length; i++) {
									var arg = arguments[i];
									if (arg)
										for (var _key in arg)
											arg.hasOwnProperty(_key) &&
												(isArray(arg[_key])
													? (arguments[0][_key] = arg[_key].slice())
													: (arguments[0][_key] = arg[_key]));
								}
								return arguments[0];
							}
							var LocalForage = (function () {
									function LocalForage2(options) {
										_classCallCheck(this, LocalForage2);
										for (var driverTypeKey in DefaultDrivers)
											if (DefaultDrivers.hasOwnProperty(driverTypeKey)) {
												var driver = DefaultDrivers[driverTypeKey],
													driverName = driver._driver;
												(this[driverTypeKey] = driverName),
													DefinedDrivers[driverName] ||
														this.defineDriver(driver);
											}
										(this._defaultConfig = extend({}, DefaultConfig)),
											(this._config = extend(
												{},
												this._defaultConfig,
												options,
											)),
											(this._driverSet = null),
											(this._initDriver = null),
											(this._ready = !1),
											(this._dbInfo = null),
											this._wrapLibraryMethodsWithReady(),
											this.setDriver(this._config.driver).catch(
												function () {},
											);
									}
									return (
										(LocalForage2.prototype.config = function (options) {
											if (
												(typeof options > "u"
													? "undefined"
													: _typeof(options)) === "object"
											) {
												if (this._ready)
													return new Error(
														"Can't call config() after localforage has been used.",
													);
												for (var i in options) {
													if (
														(i === "storeName" &&
															(options[i] = options[i].replace(
																/\W/g,
																"_",
															)),
														i === "version" &&
															typeof options[i] != "number")
													)
														return new Error(
															"Database version must be a number.",
														);
													this._config[i] = options[i];
												}
												return "driver" in options && options.driver
													? this.setDriver(this._config.driver)
													: !0;
											} else
												return typeof options == "string"
													? this._config[options]
													: this._config;
										}),
										(LocalForage2.prototype.defineDriver = function (
											driverObject,
											callback,
											errorCallback,
										) {
											var promise = new Promise$1(function (resolve, reject) {
												try {
													var driverName = driverObject._driver,
														complianceError = new Error(
															"Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver",
														);
													if (!driverObject._driver) {
														reject(complianceError);
														return;
													}
													for (
														var driverMethods =
																LibraryMethods.concat(
																	"_initStorage",
																),
															i = 0,
															len = driverMethods.length;
														i < len;
														i++
													) {
														var driverMethodName = driverMethods[i],
															isRequired = !includes(
																OptionalDriverMethods,
																driverMethodName,
															);
														if (
															(isRequired ||
																driverObject[driverMethodName]) &&
															typeof driverObject[driverMethodName] !=
																"function"
														) {
															reject(complianceError);
															return;
														}
													}
													var configureMissingMethods = function () {
														for (
															var methodNotImplementedFactory =
																	function (methodName) {
																		return function () {
																			var error = new Error(
																					"Method " +
																						methodName +
																						" is not implemented by the current driver",
																				),
																				promise2 =
																					Promise$1.reject(
																						error,
																					);
																			return (
																				executeCallback(
																					promise2,
																					arguments[
																						arguments.length -
																							1
																					],
																				),
																				promise2
																			);
																		};
																	},
																_i = 0,
																_len = OptionalDriverMethods.length;
															_i < _len;
															_i++
														) {
															var optionalDriverMethod =
																OptionalDriverMethods[_i];
															driverObject[optionalDriverMethod] ||
																(driverObject[
																	optionalDriverMethod
																] =
																	methodNotImplementedFactory(
																		optionalDriverMethod,
																	));
														}
													};
													configureMissingMethods();
													var setDriverSupport = function (support) {
														DefinedDrivers[driverName] &&
															console.info(
																"Redefining LocalForage driver: " +
																	driverName,
															),
															(DefinedDrivers[driverName] =
																driverObject),
															(DriverSupport[driverName] = support),
															resolve();
													};
													"_support" in driverObject
														? driverObject._support &&
															typeof driverObject._support ==
																"function"
															? driverObject
																	._support()
																	.then(setDriverSupport, reject)
															: setDriverSupport(
																	!!driverObject._support,
																)
														: setDriverSupport(!0);
												} catch (e) {
													reject(e);
												}
											});
											return (
												executeTwoCallbacks(
													promise,
													callback,
													errorCallback,
												),
												promise
											);
										}),
										(LocalForage2.prototype.driver = function () {
											return this._driver || null;
										}),
										(LocalForage2.prototype.getDriver = function (
											driverName,
											callback,
											errorCallback,
										) {
											var getDriverPromise = DefinedDrivers[driverName]
												? Promise$1.resolve(DefinedDrivers[driverName])
												: Promise$1.reject(new Error("Driver not found."));
											return (
												executeTwoCallbacks(
													getDriverPromise,
													callback,
													errorCallback,
												),
												getDriverPromise
											);
										}),
										(LocalForage2.prototype.getSerializer = function (
											callback,
										) {
											var serializerPromise =
												Promise$1.resolve(localforageSerializer);
											return (
												executeTwoCallbacks(serializerPromise, callback),
												serializerPromise
											);
										}),
										(LocalForage2.prototype.ready = function (callback) {
											var self2 = this,
												promise = self2._driverSet.then(function () {
													return (
														self2._ready === null &&
															(self2._ready = self2._initDriver()),
														self2._ready
													);
												});
											return (
												executeTwoCallbacks(promise, callback, callback),
												promise
											);
										}),
										(LocalForage2.prototype.setDriver = function (
											drivers,
											callback,
											errorCallback,
										) {
											var self2 = this;
											isArray(drivers) || (drivers = [drivers]);
											var supportedDrivers =
												this._getSupportedDrivers(drivers);
											function setDriverToConfig() {
												self2._config.driver = self2.driver();
											}
											function extendSelfWithDriver(driver) {
												return (
													self2._extend(driver),
													setDriverToConfig(),
													(self2._ready = self2._initStorage(
														self2._config,
													)),
													self2._ready
												);
											}
											function initDriver(supportedDrivers2) {
												return function () {
													var currentDriverIndex = 0;
													function driverPromiseLoop() {
														for (
															;
															currentDriverIndex <
															supportedDrivers2.length;

														) {
															var driverName =
																supportedDrivers2[
																	currentDriverIndex
																];
															return (
																currentDriverIndex++,
																(self2._dbInfo = null),
																(self2._ready = null),
																self2
																	.getDriver(driverName)
																	.then(extendSelfWithDriver)
																	.catch(driverPromiseLoop)
															);
														}
														setDriverToConfig();
														var error = new Error(
															"No available storage method found.",
														);
														return (
															(self2._driverSet =
																Promise$1.reject(error)),
															self2._driverSet
														);
													}
													return driverPromiseLoop();
												};
											}
											var oldDriverSetDone =
												this._driverSet !== null
													? this._driverSet.catch(function () {
															return Promise$1.resolve();
														})
													: Promise$1.resolve();
											return (
												(this._driverSet = oldDriverSetDone
													.then(function () {
														var driverName = supportedDrivers[0];
														return (
															(self2._dbInfo = null),
															(self2._ready = null),
															self2
																.getDriver(driverName)
																.then(function (driver) {
																	(self2._driver =
																		driver._driver),
																		setDriverToConfig(),
																		self2._wrapLibraryMethodsWithReady(),
																		(self2._initDriver =
																			initDriver(
																				supportedDrivers,
																			));
																})
														);
													})
													.catch(function () {
														setDriverToConfig();
														var error = new Error(
															"No available storage method found.",
														);
														return (
															(self2._driverSet =
																Promise$1.reject(error)),
															self2._driverSet
														);
													})),
												executeTwoCallbacks(
													this._driverSet,
													callback,
													errorCallback,
												),
												this._driverSet
											);
										}),
										(LocalForage2.prototype.supports = function (driverName) {
											return !!DriverSupport[driverName];
										}),
										(LocalForage2.prototype._extend = function (
											libraryMethodsAndProperties,
										) {
											extend(this, libraryMethodsAndProperties);
										}),
										(LocalForage2.prototype._getSupportedDrivers = function (
											drivers,
										) {
											for (
												var supportedDrivers = [],
													i = 0,
													len = drivers.length;
												i < len;
												i++
											) {
												var driverName = drivers[i];
												this.supports(driverName) &&
													supportedDrivers.push(driverName);
											}
											return supportedDrivers;
										}),
										(LocalForage2.prototype._wrapLibraryMethodsWithReady =
											function () {
												for (
													var i = 0, len = LibraryMethods.length;
													i < len;
													i++
												)
													callWhenReady(this, LibraryMethods[i]);
											}),
										(LocalForage2.prototype.createInstance = function (
											options,
										) {
											return new LocalForage2(options);
										}),
										LocalForage2
									);
								})(),
								localforage_js = new LocalForage();
							module3.exports = localforage_js;
						},
						{ 3: 3 },
					],
				},
				{},
				[4],
			)(4);
		});
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/offline.js
var require_offline = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/offline.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			localForage = require_localforage(),
			WINDOW = utils.GLOBAL_OBJ,
			Offline = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "Offline";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * the current hub instance
				 */
				/**
				 * maximum number of events to store while offline
				 */
				/**
				 * event cache
				 */
				/**
				 * @inheritDoc
				 */
				constructor(options = {}) {
					(this.name = Offline.id),
						(this.maxStoredEvents = options.maxStoredEvents || 30),
						(this.offlineEventStore = localForage.default.createInstance({
							name: "sentry/offlineEventStore",
						}));
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(addGlobalEventProcessor, getCurrentHub) {
					(this.hub = getCurrentHub()),
						"addEventListener" in WINDOW &&
							WINDOW.addEventListener("online", () => {
								this._sendEvents().catch(() => {
									(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.warn("could not send cached events");
								});
							});
					let eventProcessor = (event) =>
						this.hub &&
						this.hub.getIntegration(Offline) &&
						"navigator" in WINDOW &&
						"onLine" in WINDOW.navigator &&
						!WINDOW.navigator.onLine
							? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.log(
										"Event dropped due to being a offline - caching instead",
									),
								this._cacheEvent(event)
									.then((_event) => this._enforceMaxEvents())
									.catch((_error) => {
										(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
											utils.logger.warn(
												"could not cache event while offline",
											);
									}),
								null)
							: event;
					(eventProcessor.id = this.name),
						addGlobalEventProcessor(eventProcessor),
						"navigator" in WINDOW &&
							"onLine" in WINDOW.navigator &&
							WINDOW.navigator.onLine &&
							this._sendEvents().catch(() => {
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.warn("could not send cached events");
							});
				}
				/**
				 * cache an event to send later
				 * @param event an event
				 */
				async _cacheEvent(event) {
					return this.offlineEventStore.setItem(utils.uuid4(), utils.normalize(event));
				}
				/**
				 * purge excess events if necessary
				 */
				async _enforceMaxEvents() {
					let events = [];
					return this.offlineEventStore
						.iterate((event, cacheKey, _index) => {
							events.push({ cacheKey, event });
						})
						.then(() =>
							// this promise resolves when the iteration is finished
							this._purgeEvents(
								// purge all events past maxStoredEvents in reverse chronological order
								events
									.sort(
										(a, b) =>
											(b.event.timestamp || 0) - (a.event.timestamp || 0),
									)
									.slice(
										this.maxStoredEvents < events.length
											? this.maxStoredEvents
											: events.length,
									)
									.map((event) => event.cacheKey),
							),
						)
						.catch((_error) => {
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn("could not enforce max events");
						});
				}
				/**
				 * purge event from cache
				 */
				async _purgeEvent(cacheKey) {
					return this.offlineEventStore.removeItem(cacheKey);
				}
				/**
				 * purge events from cache
				 */
				async _purgeEvents(cacheKeys) {
					return Promise.all(
						cacheKeys.map((cacheKey) => this._purgeEvent(cacheKey)),
					).then();
				}
				/**
				 * send all events
				 */
				async _sendEvents() {
					return this.offlineEventStore.iterate((event, cacheKey, _index) => {
						this.hub
							? (this.hub.captureEvent(event),
								this._purgeEvent(cacheKey).catch((_error) => {
									(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.warn("could not purge event from cache");
								}))
							: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn("no hub found - could not send cached event");
					});
				}
			};
		Offline.__initStatic();
		exports.Offline = Offline;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/reportingobserver.js
var require_reportingobserver = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/reportingobserver.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			WINDOW = utils.GLOBAL_OBJ,
			ReportingObserver = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "ReportingObserver";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * Returns current hub.
				 */
				/**
				 * @inheritDoc
				 */
				constructor(options = {}) {
					(this.name = ReportingObserver.id),
						(this._types = options.types || ["crash", "deprecation", "intervention"]);
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_, getCurrentHub) {
					if (!utils.supportsReportingObserver()) return;
					(this._getCurrentHub = getCurrentHub),
						new WINDOW.ReportingObserver(this.handler.bind(this), {
							buffered: !0,
							types: this._types,
						}).observe();
				}
				/**
				 * @inheritDoc
				 */
				handler(reports) {
					let hub = this._getCurrentHub && this._getCurrentHub();
					if (!(!hub || !hub.getIntegration(ReportingObserver)))
						for (let report of reports)
							hub.withScope((scope) => {
								scope.setExtra("url", report.url);
								let label = `ReportingObserver [${report.type}]`,
									details = "No details available";
								if (report.body) {
									let plainBody = {};
									for (let prop in report.body)
										plainBody[prop] = report.body[prop];
									if (
										(scope.setExtra("body", plainBody), report.type === "crash")
									) {
										let body = report.body;
										details =
											[body.crashId || "", body.reason || ""]
												.join(" ")
												.trim() || details;
									} else details = report.body.message || details;
								}
								hub.captureMessage(`${label}: ${details}`);
							});
				}
			};
		ReportingObserver.__initStatic();
		exports.ReportingObserver = ReportingObserver;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/rewriteframes.js
var require_rewriteframes = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/rewriteframes.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			RewriteFrames = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "RewriteFrames";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				constructor(options = {}) {
					RewriteFrames.prototype.__init.call(this),
						(this.name = RewriteFrames.id),
						options.root && (this._root = options.root),
						(this._prefix = options.prefix || "app:///"),
						options.iteratee && (this._iteratee = options.iteratee);
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
				/** @inheritDoc */
				processEvent(event) {
					return this.process(event);
				}
				/**
				 * TODO (v8): Make this private/internal
				 */
				process(originalEvent) {
					let processedEvent = originalEvent;
					return (
						originalEvent.exception &&
							Array.isArray(originalEvent.exception.values) &&
							(processedEvent = this._processExceptionsEvent(processedEvent)),
						processedEvent
					);
				}
				/**
				 * @inheritDoc
				 */
				__init() {
					this._iteratee = (frame) => {
						if (!frame.filename) return frame;
						let isWindowsFrame =
								/^[a-zA-Z]:\\/.test(frame.filename) || // or the presence of a backslash without a forward slash (which are not allowed on Windows)
								(frame.filename.includes("\\") && !frame.filename.includes("/")),
							startsWithSlash = /^\//.test(frame.filename);
						if (isWindowsFrame || startsWithSlash) {
							let filename = isWindowsFrame
									? frame.filename.replace(/^[a-zA-Z]:/, "").replace(/\\/g, "/")
									: frame.filename,
								base = this._root
									? utils.relative(this._root, filename)
									: utils.basename(filename);
							frame.filename = `${this._prefix}${base}`;
						}
						return frame;
					};
				}
				/** JSDoc */
				_processExceptionsEvent(event) {
					try {
						return {
							...event,
							exception: {
								...event.exception,
								// The check for this is performed inside `process` call itself, safe to skip here
								// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
								values: event.exception.values.map((value) => ({
									...value,
									...(value.stacktrace && {
										stacktrace: this._processStacktrace(value.stacktrace),
									}),
								})),
							},
						};
					} catch {
						return event;
					}
				}
				/** JSDoc */
				_processStacktrace(stacktrace) {
					return {
						...stacktrace,
						frames:
							stacktrace &&
							stacktrace.frames &&
							stacktrace.frames.map((f) => this._iteratee(f)),
					};
				}
			};
		RewriteFrames.__initStatic();
		exports.RewriteFrames = RewriteFrames;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/sessiontiming.js
var require_sessiontiming = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/sessiontiming.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var SessionTiming = class {
			/**
			 * @inheritDoc
			 */
			static __initStatic() {
				this.id = "SessionTiming";
			}
			/**
			 * @inheritDoc
			 */
			/** Exact time Client was initialized expressed in milliseconds since Unix Epoch. */
			constructor() {
				(this.name = SessionTiming.id), (this._startTime = Date.now());
			}
			/**
			 * @inheritDoc
			 */
			setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
			/** @inheritDoc */
			processEvent(event) {
				return this.process(event);
			}
			/**
			 * TODO (v8): make this private/internal
			 */
			process(event) {
				let now = Date.now();
				return {
					...event,
					extra: {
						...event.extra,
						["session:start"]: this._startTime,
						["session:duration"]: now - this._startTime,
						["session:end"]: now,
					},
				};
			}
		};
		SessionTiming.__initStatic();
		exports.SessionTiming = SessionTiming;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/transaction.js
var require_transaction = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/transaction.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var Transaction = class {
			/**
			 * @inheritDoc
			 */
			static __initStatic() {
				this.id = "Transaction";
			}
			/**
			 * @inheritDoc
			 */
			constructor() {
				this.name = Transaction.id;
			}
			/**
			 * @inheritDoc
			 */
			setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
			/** @inheritDoc */
			processEvent(event) {
				return this.process(event);
			}
			/**
			 * TODO (v8): Make this private/internal
			 */
			process(event) {
				let frames = _getFramesFromEvent(event);
				for (let i = frames.length - 1; i >= 0; i--) {
					let frame = frames[i];
					if (frame.in_app === !0) {
						event.transaction = _getTransaction(frame);
						break;
					}
				}
				return event;
			}
		};
		Transaction.__initStatic();
		function _getFramesFromEvent(event) {
			let exception = event.exception && event.exception.values && event.exception.values[0];
			return (exception && exception.stacktrace && exception.stacktrace.frames) || [];
		}
		function _getTransaction(frame) {
			return frame.module || frame.function
				? `${frame.module || "?"}/${frame.function || "?"}`
				: "<unknown>";
		}
		exports.Transaction = Transaction;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/constants.js
var require_constants = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/constants.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var DEFAULT_ENVIRONMENT = "production";
		exports.DEFAULT_ENVIRONMENT = DEFAULT_ENVIRONMENT;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/eventProcessors.js
var require_eventProcessors = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/eventProcessors.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs();
		function getGlobalEventProcessors() {
			return utils.getGlobalSingleton("globalEventProcessors", () => []);
		}
		function addGlobalEventProcessor(callback) {
			getGlobalEventProcessors().push(callback);
		}
		function notifyEventProcessors(processors, event, hint, index = 0) {
			return new utils.SyncPromise((resolve, reject) => {
				let processor = processors[index];
				if (event === null || typeof processor != "function") resolve(event);
				else {
					let result = processor({ ...event }, hint);
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						processor.id &&
						result === null &&
						utils.logger.log(`Event processor "${processor.id}" dropped event`),
						utils.isThenable(result)
							? result
									.then((final) =>
										notifyEventProcessors(
											processors,
											final,
											hint,
											index + 1,
										).then(resolve),
									)
									.then(null, reject)
							: notifyEventProcessors(processors, result, hint, index + 1)
									.then(resolve)
									.then(null, reject);
				}
			});
		}
		exports.addGlobalEventProcessor = addGlobalEventProcessor;
		exports.getGlobalEventProcessors = getGlobalEventProcessors;
		exports.notifyEventProcessors = notifyEventProcessors;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/session.js
var require_session = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/session.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs();
		function makeSession(context) {
			let startingTime = utils.timestampInSeconds(),
				session = {
					sid: utils.uuid4(),
					init: !0,
					timestamp: startingTime,
					started: startingTime,
					duration: 0,
					status: "ok",
					errors: 0,
					ignoreDuration: !1,
					toJSON: () => sessionToJSON(session),
				};
			return context && updateSession(session, context), session;
		}
		function updateSession(session, context = {}) {
			if (
				(context.user &&
					(!session.ipAddress &&
						context.user.ip_address &&
						(session.ipAddress = context.user.ip_address),
					!session.did &&
						!context.did &&
						(session.did =
							context.user.id || context.user.email || context.user.username)),
				(session.timestamp = context.timestamp || utils.timestampInSeconds()),
				context.abnormal_mechanism &&
					(session.abnormal_mechanism = context.abnormal_mechanism),
				context.ignoreDuration && (session.ignoreDuration = context.ignoreDuration),
				context.sid &&
					(session.sid = context.sid.length === 32 ? context.sid : utils.uuid4()),
				context.init !== void 0 && (session.init = context.init),
				!session.did && context.did && (session.did = `${context.did}`),
				typeof context.started == "number" && (session.started = context.started),
				session.ignoreDuration)
			)
				session.duration = void 0;
			else if (typeof context.duration == "number") session.duration = context.duration;
			else {
				let duration = session.timestamp - session.started;
				session.duration = duration >= 0 ? duration : 0;
			}
			context.release && (session.release = context.release),
				context.environment && (session.environment = context.environment),
				!session.ipAddress && context.ipAddress && (session.ipAddress = context.ipAddress),
				!session.userAgent && context.userAgent && (session.userAgent = context.userAgent),
				typeof context.errors == "number" && (session.errors = context.errors),
				context.status && (session.status = context.status);
		}
		function closeSession(session, status) {
			let context = {};
			status
				? (context = { status })
				: session.status === "ok" && (context = { status: "exited" }),
				updateSession(session, context);
		}
		function sessionToJSON(session) {
			return utils.dropUndefinedKeys({
				sid: `${session.sid}`,
				init: session.init,
				// Make sure that sec is converted to ms for date constructor
				started: new Date(session.started * 1e3).toISOString(),
				timestamp: new Date(session.timestamp * 1e3).toISOString(),
				status: session.status,
				errors: session.errors,
				did:
					typeof session.did == "number" || typeof session.did == "string"
						? `${session.did}`
						: void 0,
				duration: session.duration,
				abnormal_mechanism: session.abnormal_mechanism,
				attrs: {
					release: session.release,
					environment: session.environment,
					ip_address: session.ipAddress,
					user_agent: session.userAgent,
				},
			});
		}
		exports.closeSession = closeSession;
		exports.makeSession = makeSession;
		exports.updateSession = updateSession;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/scope.js
var require_scope = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/scope.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			eventProcessors = require_eventProcessors(),
			session = require_session(),
			DEFAULT_MAX_BREADCRUMBS = 100,
			Scope = class {
				/** Flag if notifying is happening. */
				/** Callback for client to receive scope changes. */
				/** Callback list that will be called after {@link applyToEvent}. */
				/** Array of breadcrumbs. */
				/** User */
				/** Tags */
				/** Extra */
				/** Contexts */
				/** Attachments */
				/** Propagation Context for distributed tracing */
				/**
				 * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
				 * sent to Sentry
				 */
				/** Fingerprint */
				/** Severity */
				// eslint-disable-next-line deprecation/deprecation
				/** Transaction Name */
				/** Span */
				/** Session */
				/** Request Mode Session Status */
				// NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
				constructor() {
					(this._notifyingListeners = !1),
						(this._scopeListeners = []),
						(this._eventProcessors = []),
						(this._breadcrumbs = []),
						(this._attachments = []),
						(this._user = {}),
						(this._tags = {}),
						(this._extra = {}),
						(this._contexts = {}),
						(this._sdkProcessingMetadata = {}),
						(this._propagationContext = generatePropagationContext());
				}
				/**
				 * Inherit values from the parent scope.
				 * @param scope to clone.
				 */
				static clone(scope) {
					let newScope = new Scope();
					return (
						scope &&
							((newScope._breadcrumbs = [...scope._breadcrumbs]),
							(newScope._tags = { ...scope._tags }),
							(newScope._extra = { ...scope._extra }),
							(newScope._contexts = { ...scope._contexts }),
							(newScope._user = scope._user),
							(newScope._level = scope._level),
							(newScope._span = scope._span),
							(newScope._session = scope._session),
							(newScope._transactionName = scope._transactionName),
							(newScope._fingerprint = scope._fingerprint),
							(newScope._eventProcessors = [...scope._eventProcessors]),
							(newScope._requestSession = scope._requestSession),
							(newScope._attachments = [...scope._attachments]),
							(newScope._sdkProcessingMetadata = { ...scope._sdkProcessingMetadata }),
							(newScope._propagationContext = { ...scope._propagationContext })),
						newScope
					);
				}
				/**
				 * Add internal on change listener. Used for sub SDKs that need to store the scope.
				 * @hidden
				 */
				addScopeListener(callback) {
					this._scopeListeners.push(callback);
				}
				/**
				 * @inheritDoc
				 */
				addEventProcessor(callback) {
					return this._eventProcessors.push(callback), this;
				}
				/**
				 * @inheritDoc
				 */
				setUser(user) {
					return (
						(this._user = user || {}),
						this._session && session.updateSession(this._session, { user }),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				getUser() {
					return this._user;
				}
				/**
				 * @inheritDoc
				 */
				getRequestSession() {
					return this._requestSession;
				}
				/**
				 * @inheritDoc
				 */
				setRequestSession(requestSession) {
					return (this._requestSession = requestSession), this;
				}
				/**
				 * @inheritDoc
				 */
				setTags(tags) {
					return (
						(this._tags = {
							...this._tags,
							...tags,
						}),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setTag(key, value) {
					return (
						(this._tags = { ...this._tags, [key]: value }),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setExtras(extras) {
					return (
						(this._extra = {
							...this._extra,
							...extras,
						}),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setExtra(key, extra) {
					return (
						(this._extra = { ...this._extra, [key]: extra }),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setFingerprint(fingerprint) {
					return (this._fingerprint = fingerprint), this._notifyScopeListeners(), this;
				}
				/**
				 * @inheritDoc
				 */
				setLevel(level) {
					return (this._level = level), this._notifyScopeListeners(), this;
				}
				/**
				 * @inheritDoc
				 */
				setTransactionName(name) {
					return (this._transactionName = name), this._notifyScopeListeners(), this;
				}
				/**
				 * @inheritDoc
				 */
				setContext(key, context) {
					return (
						context === null
							? delete this._contexts[key]
							: (this._contexts[key] = context),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setSpan(span) {
					return (this._span = span), this._notifyScopeListeners(), this;
				}
				/**
				 * @inheritDoc
				 */
				getSpan() {
					return this._span;
				}
				/**
				 * @inheritDoc
				 */
				getTransaction() {
					let span = this.getSpan();
					return span && span.transaction;
				}
				/**
				 * @inheritDoc
				 */
				setSession(session2) {
					return (
						session2 ? (this._session = session2) : delete this._session,
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				getSession() {
					return this._session;
				}
				/**
				 * @inheritDoc
				 */
				update(captureContext) {
					if (!captureContext) return this;
					if (typeof captureContext == "function") {
						let updatedScope = captureContext(this);
						return updatedScope instanceof Scope ? updatedScope : this;
					}
					return (
						captureContext instanceof Scope
							? ((this._tags = { ...this._tags, ...captureContext._tags }),
								(this._extra = { ...this._extra, ...captureContext._extra }),
								(this._contexts = {
									...this._contexts,
									...captureContext._contexts,
								}),
								captureContext._user &&
									Object.keys(captureContext._user).length &&
									(this._user = captureContext._user),
								captureContext._level && (this._level = captureContext._level),
								captureContext._fingerprint &&
									(this._fingerprint = captureContext._fingerprint),
								captureContext._requestSession &&
									(this._requestSession = captureContext._requestSession),
								captureContext._propagationContext &&
									(this._propagationContext = captureContext._propagationContext))
							: utils.isPlainObject(captureContext) &&
								((captureContext = captureContext),
								(this._tags = { ...this._tags, ...captureContext.tags }),
								(this._extra = { ...this._extra, ...captureContext.extra }),
								(this._contexts = {
									...this._contexts,
									...captureContext.contexts,
								}),
								captureContext.user && (this._user = captureContext.user),
								captureContext.level && (this._level = captureContext.level),
								captureContext.fingerprint &&
									(this._fingerprint = captureContext.fingerprint),
								captureContext.requestSession &&
									(this._requestSession = captureContext.requestSession),
								captureContext.propagationContext &&
									(this._propagationContext = captureContext.propagationContext)),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				clear() {
					return (
						(this._breadcrumbs = []),
						(this._tags = {}),
						(this._extra = {}),
						(this._user = {}),
						(this._contexts = {}),
						(this._level = void 0),
						(this._transactionName = void 0),
						(this._fingerprint = void 0),
						(this._requestSession = void 0),
						(this._span = void 0),
						(this._session = void 0),
						this._notifyScopeListeners(),
						(this._attachments = []),
						(this._propagationContext = generatePropagationContext()),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				addBreadcrumb(breadcrumb, maxBreadcrumbs) {
					let maxCrumbs =
						typeof maxBreadcrumbs == "number"
							? maxBreadcrumbs
							: DEFAULT_MAX_BREADCRUMBS;
					if (maxCrumbs <= 0) return this;
					let mergedBreadcrumb = {
							timestamp: utils.dateTimestampInSeconds(),
							...breadcrumb,
						},
						breadcrumbs = this._breadcrumbs;
					return (
						breadcrumbs.push(mergedBreadcrumb),
						(this._breadcrumbs =
							breadcrumbs.length > maxCrumbs
								? breadcrumbs.slice(-maxCrumbs)
								: breadcrumbs),
						this._notifyScopeListeners(),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				getLastBreadcrumb() {
					return this._breadcrumbs[this._breadcrumbs.length - 1];
				}
				/**
				 * @inheritDoc
				 */
				clearBreadcrumbs() {
					return (this._breadcrumbs = []), this._notifyScopeListeners(), this;
				}
				/**
				 * @inheritDoc
				 */
				addAttachment(attachment) {
					return this._attachments.push(attachment), this;
				}
				/**
				 * @inheritDoc
				 */
				getAttachments() {
					return this._attachments;
				}
				/**
				 * @inheritDoc
				 */
				clearAttachments() {
					return (this._attachments = []), this;
				}
				/**
				 * Applies data from the scope to the event and runs all event processors on it.
				 *
				 * @param event Event
				 * @param hint Object containing additional information about the original exception, for use by the event processors.
				 * @hidden
				 */
				applyToEvent(event, hint = {}, additionalEventProcessors) {
					if (
						(this._extra &&
							Object.keys(this._extra).length &&
							(event.extra = { ...this._extra, ...event.extra }),
						this._tags &&
							Object.keys(this._tags).length &&
							(event.tags = { ...this._tags, ...event.tags }),
						this._user &&
							Object.keys(this._user).length &&
							(event.user = { ...this._user, ...event.user }),
						this._contexts &&
							Object.keys(this._contexts).length &&
							(event.contexts = { ...this._contexts, ...event.contexts }),
						this._level && (event.level = this._level),
						this._transactionName && (event.transaction = this._transactionName),
						this._span)
					) {
						event.contexts = { trace: this._span.getTraceContext(), ...event.contexts };
						let transaction = this._span.transaction;
						if (transaction) {
							event.sdkProcessingMetadata = {
								dynamicSamplingContext: transaction.getDynamicSamplingContext(),
								...event.sdkProcessingMetadata,
							};
							let transactionName = transaction.name;
							transactionName &&
								(event.tags = { transaction: transactionName, ...event.tags });
						}
					}
					this._applyFingerprint(event);
					let scopeBreadcrumbs = this._getBreadcrumbs(),
						breadcrumbs = [...(event.breadcrumbs || []), ...scopeBreadcrumbs];
					return (
						(event.breadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : void 0),
						(event.sdkProcessingMetadata = {
							...event.sdkProcessingMetadata,
							...this._sdkProcessingMetadata,
							propagationContext: this._propagationContext,
						}),
						eventProcessors.notifyEventProcessors(
							[
								...(additionalEventProcessors || []),
								...eventProcessors.getGlobalEventProcessors(),
								...this._eventProcessors,
							],
							event,
							hint,
						)
					);
				}
				/**
				 * Add data which will be accessible during event processing but won't get sent to Sentry
				 */
				setSDKProcessingMetadata(newData) {
					return (
						(this._sdkProcessingMetadata = {
							...this._sdkProcessingMetadata,
							...newData,
						}),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				setPropagationContext(context) {
					return (this._propagationContext = context), this;
				}
				/**
				 * @inheritDoc
				 */
				getPropagationContext() {
					return this._propagationContext;
				}
				/**
				 * Get the breadcrumbs for this scope.
				 */
				_getBreadcrumbs() {
					return this._breadcrumbs;
				}
				/**
				 * This will be called on every set call.
				 */
				_notifyScopeListeners() {
					this._notifyingListeners ||
						((this._notifyingListeners = !0),
						this._scopeListeners.forEach((callback) => {
							callback(this);
						}),
						(this._notifyingListeners = !1));
				}
				/**
				 * Applies fingerprint from the scope to the event if there's one,
				 * uses message if there's one instead or get rid of empty fingerprint
				 */
				_applyFingerprint(event) {
					(event.fingerprint = event.fingerprint
						? utils.arrayify(event.fingerprint)
						: []),
						this._fingerprint &&
							(event.fingerprint = event.fingerprint.concat(this._fingerprint)),
						event.fingerprint && !event.fingerprint.length && delete event.fingerprint;
				}
			};
		function generatePropagationContext() {
			return {
				traceId: utils.uuid4(),
				spanId: utils.uuid4().substring(16),
			};
		}
		exports.Scope = Scope;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/hub.js
var require_hub = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/hub.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			constants = require_constants(),
			scope = require_scope(),
			session = require_session(),
			API_VERSION = 4,
			DEFAULT_BREADCRUMBS = 100,
			Hub = class {
				/** Is a {@link Layer}[] containing the client and scope */
				/** Contains the last event id of a captured event.  */
				/**
				 * Creates a new instance of the hub, will push one {@link Layer} into the
				 * internal stack on creation.
				 *
				 * @param client bound to the hub.
				 * @param scope bound to the hub.
				 * @param version number, higher number means higher priority.
				 */
				constructor(client, scope$1 = new scope.Scope(), _version = API_VERSION) {
					(this._version = _version),
						(this._stack = [{ scope: scope$1 }]),
						client && this.bindClient(client);
				}
				/**
				 * @inheritDoc
				 */
				isOlderThan(version) {
					return this._version < version;
				}
				/**
				 * @inheritDoc
				 */
				bindClient(client) {
					let top = this.getStackTop();
					(top.client = client),
						client && client.setupIntegrations && client.setupIntegrations();
				}
				/**
				 * @inheritDoc
				 */
				pushScope() {
					let scope$1 = scope.Scope.clone(this.getScope());
					return (
						this.getStack().push({
							client: this.getClient(),
							scope: scope$1,
						}),
						scope$1
					);
				}
				/**
				 * @inheritDoc
				 */
				popScope() {
					return this.getStack().length <= 1 ? !1 : !!this.getStack().pop();
				}
				/**
				 * @inheritDoc
				 */
				withScope(callback) {
					let scope2 = this.pushScope();
					try {
						callback(scope2);
					} finally {
						this.popScope();
					}
				}
				/**
				 * @inheritDoc
				 */
				getClient() {
					return this.getStackTop().client;
				}
				/** Returns the scope of the top stack. */
				getScope() {
					return this.getStackTop().scope;
				}
				/** Returns the scope stack for domains or the process. */
				getStack() {
					return this._stack;
				}
				/** Returns the topmost scope layer in the order domain > local > process. */
				getStackTop() {
					return this._stack[this._stack.length - 1];
				}
				/**
				 * @inheritDoc
				 */
				captureException(exception, hint) {
					let eventId = (this._lastEventId =
							hint && hint.event_id ? hint.event_id : utils.uuid4()),
						syntheticException = new Error("Sentry syntheticException");
					return (
						this._withClient((client, scope2) => {
							client.captureException(
								exception,
								{
									originalException: exception,
									syntheticException,
									...hint,
									event_id: eventId,
								},
								scope2,
							);
						}),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				captureMessage(message, level, hint) {
					let eventId = (this._lastEventId =
							hint && hint.event_id ? hint.event_id : utils.uuid4()),
						syntheticException = new Error(message);
					return (
						this._withClient((client, scope2) => {
							client.captureMessage(
								message,
								level,
								{
									originalException: message,
									syntheticException,
									...hint,
									event_id: eventId,
								},
								scope2,
							);
						}),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				captureEvent(event, hint) {
					let eventId = hint && hint.event_id ? hint.event_id : utils.uuid4();
					return (
						event.type || (this._lastEventId = eventId),
						this._withClient((client, scope2) => {
							client.captureEvent(event, { ...hint, event_id: eventId }, scope2);
						}),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				lastEventId() {
					return this._lastEventId;
				}
				/**
				 * @inheritDoc
				 */
				addBreadcrumb(breadcrumb, hint) {
					let { scope: scope2, client } = this.getStackTop();
					if (!client) return;
					let { beforeBreadcrumb = null, maxBreadcrumbs = DEFAULT_BREADCRUMBS } =
						(client.getOptions && client.getOptions()) || {};
					if (maxBreadcrumbs <= 0) return;
					let mergedBreadcrumb = {
							timestamp: utils.dateTimestampInSeconds(),
							...breadcrumb,
						},
						finalBreadcrumb = beforeBreadcrumb
							? utils.consoleSandbox(() => beforeBreadcrumb(mergedBreadcrumb, hint))
							: mergedBreadcrumb;
					finalBreadcrumb !== null &&
						(client.emit && client.emit("beforeAddBreadcrumb", finalBreadcrumb, hint),
						scope2.addBreadcrumb(finalBreadcrumb, maxBreadcrumbs));
				}
				/**
				 * @inheritDoc
				 */
				setUser(user) {
					this.getScope().setUser(user);
				}
				/**
				 * @inheritDoc
				 */
				setTags(tags) {
					this.getScope().setTags(tags);
				}
				/**
				 * @inheritDoc
				 */
				setExtras(extras) {
					this.getScope().setExtras(extras);
				}
				/**
				 * @inheritDoc
				 */
				setTag(key, value) {
					this.getScope().setTag(key, value);
				}
				/**
				 * @inheritDoc
				 */
				setExtra(key, extra) {
					this.getScope().setExtra(key, extra);
				}
				/**
				 * @inheritDoc
				 */
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				setContext(name, context) {
					this.getScope().setContext(name, context);
				}
				/**
				 * @inheritDoc
				 */
				configureScope(callback) {
					let { scope: scope2, client } = this.getStackTop();
					client && callback(scope2);
				}
				/**
				 * @inheritDoc
				 */
				run(callback) {
					let oldHub = makeMain(this);
					try {
						callback(this);
					} finally {
						makeMain(oldHub);
					}
				}
				/**
				 * @inheritDoc
				 */
				getIntegration(integration) {
					let client = this.getClient();
					if (!client) return null;
					try {
						return client.getIntegration(integration);
					} catch {
						return (
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn(
									`Cannot retrieve integration ${integration.id} from the current Hub`,
								),
							null
						);
					}
				}
				/**
				 * @inheritDoc
				 */
				startTransaction(context, customSamplingContext) {
					let result = this._callExtensionMethod(
						"startTransaction",
						context,
						customSamplingContext,
					);
					if ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && !result) {
						let client = this.getClient();
						console.warn(
							client
								? `Tracing extension 'startTransaction' has not been added. Call 'addTracingExtensions' before calling 'init':
Sentry.addTracingExtensions();
Sentry.init({...});
`
								: "Tracing extension 'startTransaction' is missing. You should 'init' the SDK before calling 'startTransaction'",
						);
					}
					return result;
				}
				/**
				 * @inheritDoc
				 */
				traceHeaders() {
					return this._callExtensionMethod("traceHeaders");
				}
				/**
				 * @inheritDoc
				 */
				captureSession(endSession = !1) {
					if (endSession) return this.endSession();
					this._sendSessionUpdate();
				}
				/**
				 * @inheritDoc
				 */
				endSession() {
					let scope2 = this.getStackTop().scope,
						session$1 = scope2.getSession();
					session$1 && session.closeSession(session$1),
						this._sendSessionUpdate(),
						scope2.setSession();
				}
				/**
				 * @inheritDoc
				 */
				startSession(context) {
					let { scope: scope2, client } = this.getStackTop(),
						{ release, environment = constants.DEFAULT_ENVIRONMENT } =
							(client && client.getOptions()) || {},
						{ userAgent } = utils.GLOBAL_OBJ.navigator || {},
						session$1 = session.makeSession({
							release,
							environment,
							user: scope2.getUser(),
							...(userAgent && { userAgent }),
							...context,
						}),
						currentSession = scope2.getSession && scope2.getSession();
					return (
						currentSession &&
							currentSession.status === "ok" &&
							session.updateSession(currentSession, { status: "exited" }),
						this.endSession(),
						scope2.setSession(session$1),
						session$1
					);
				}
				/**
				 * Returns if default PII should be sent to Sentry and propagated in ourgoing requests
				 * when Tracing is used.
				 */
				shouldSendDefaultPii() {
					let client = this.getClient(),
						options = client && client.getOptions();
					return !!(options && options.sendDefaultPii);
				}
				/**
				 * Sends the current Session on the scope
				 */
				_sendSessionUpdate() {
					let { scope: scope2, client } = this.getStackTop(),
						session2 = scope2.getSession();
					session2 && client && client.captureSession && client.captureSession(session2);
				}
				/**
				 * Internal helper function to call a method on the top client if it exists.
				 *
				 * @param method The method to call on the client.
				 * @param args Arguments to pass to the client function.
				 */
				_withClient(callback) {
					let { scope: scope2, client } = this.getStackTop();
					client && callback(client, scope2);
				}
				/**
				 * Calls global extension method and binding current instance to the function call
				 */
				// @ts-expect-error Function lacks ending return statement and return type does not include 'undefined'. ts(2366)
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				_callExtensionMethod(method, ...args) {
					let sentry = getMainCarrier().__SENTRY__;
					if (
						sentry &&
						sentry.extensions &&
						typeof sentry.extensions[method] == "function"
					)
						return sentry.extensions[method].apply(this, args);
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(
							`Extension method ${method} couldn't be found, doing nothing.`,
						);
				}
			};
		function getMainCarrier() {
			return (
				(utils.GLOBAL_OBJ.__SENTRY__ = utils.GLOBAL_OBJ.__SENTRY__ || {
					extensions: {},
					hub: void 0,
				}),
				utils.GLOBAL_OBJ
			);
		}
		function makeMain(hub) {
			let registry = getMainCarrier(),
				oldHub = getHubFromCarrier(registry);
			return setHubOnCarrier(registry, hub), oldHub;
		}
		function getCurrentHub() {
			let registry = getMainCarrier();
			if (registry.__SENTRY__ && registry.__SENTRY__.acs) {
				let hub = registry.__SENTRY__.acs.getCurrentHub();
				if (hub) return hub;
			}
			return getGlobalHub(registry);
		}
		function getGlobalHub(registry = getMainCarrier()) {
			return (
				(!hasHubOnCarrier(registry) ||
					getHubFromCarrier(registry).isOlderThan(API_VERSION)) &&
					setHubOnCarrier(registry, new Hub()),
				getHubFromCarrier(registry)
			);
		}
		function ensureHubOnCarrier(carrier, parent = getGlobalHub()) {
			if (!hasHubOnCarrier(carrier) || getHubFromCarrier(carrier).isOlderThan(API_VERSION)) {
				let globalHubTopStack = parent.getStackTop();
				setHubOnCarrier(
					carrier,
					new Hub(globalHubTopStack.client, scope.Scope.clone(globalHubTopStack.scope)),
				);
			}
		}
		function setAsyncContextStrategy(strategy) {
			let registry = getMainCarrier();
			(registry.__SENTRY__ = registry.__SENTRY__ || {}), (registry.__SENTRY__.acs = strategy);
		}
		function runWithAsyncContext(callback, options = {}) {
			let registry = getMainCarrier();
			return registry.__SENTRY__ && registry.__SENTRY__.acs
				? registry.__SENTRY__.acs.runWithAsyncContext(callback, options)
				: callback();
		}
		function hasHubOnCarrier(carrier) {
			return !!(carrier && carrier.__SENTRY__ && carrier.__SENTRY__.hub);
		}
		function getHubFromCarrier(carrier) {
			return utils.getGlobalSingleton("hub", () => new Hub(), carrier);
		}
		function setHubOnCarrier(carrier, hub) {
			if (!carrier) return !1;
			let __SENTRY__ = (carrier.__SENTRY__ = carrier.__SENTRY__ || {});
			return (__SENTRY__.hub = hub), !0;
		}
		exports.API_VERSION = API_VERSION;
		exports.Hub = Hub;
		exports.ensureHubOnCarrier = ensureHubOnCarrier;
		exports.getCurrentHub = getCurrentHub;
		exports.getHubFromCarrier = getHubFromCarrier;
		exports.getMainCarrier = getMainCarrier;
		exports.makeMain = makeMain;
		exports.runWithAsyncContext = runWithAsyncContext;
		exports.setAsyncContextStrategy = setAsyncContextStrategy;
		exports.setHubOnCarrier = setHubOnCarrier;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/utils.js
var require_utils = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/utils.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var hub = require_hub(),
			utils = require_cjs();
		function getActiveTransaction(maybeHub) {
			return (maybeHub || hub.getCurrentHub()).getScope().getTransaction();
		}
		exports.TRACEPARENT_REGEXP = utils.TRACEPARENT_REGEXP;
		exports.extractTraceparentData = utils.extractTraceparentData;
		exports.stripUrlQueryAndFragment = utils.stripUrlQueryAndFragment;
		exports.getActiveTransaction = getActiveTransaction;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/errors.js
var require_errors = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/errors.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			utils$1 = require_utils(),
			errorsInstrumented = !1;
		function registerErrorInstrumentation() {
			errorsInstrumented ||
				((errorsInstrumented = !0),
				utils.addInstrumentationHandler("error", errorCallback),
				utils.addInstrumentationHandler("unhandledrejection", errorCallback));
		}
		function errorCallback() {
			let activeTransaction = utils$1.getActiveTransaction();
			if (activeTransaction) {
				let status = "internal_error";
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.log(`[Tracing] Transaction: ${status} -> Global error occured`),
					activeTransaction.setStatus(status);
			}
		}
		errorCallback.tag = "sentry_tracingErrorCallback";
		exports.registerErrorInstrumentation = registerErrorInstrumentation;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/span.js
var require_span = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/span.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			SpanRecorder = class {
				constructor(maxlen = 1e3) {
					(this._maxlen = maxlen), (this.spans = []);
				}
				/**
				 * This is just so that we don't run out of memory while recording a lot
				 * of spans. At some point we just stop and flush out the start of the
				 * trace tree (i.e.the first n spans with the smallest
				 * start_timestamp).
				 */
				add(span) {
					this.spans.length > this._maxlen
						? (span.spanRecorder = void 0)
						: this.spans.push(span);
				}
			},
			Span = class {
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * Internal keeper of the status
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * Timestamp in seconds when the span was created.
				 */
				/**
				 * Timestamp in seconds when the span ended.
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * @inheritDoc
				 */
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				/**
				 * List of spans that were finalized
				 */
				/**
				 * @inheritDoc
				 */
				/**
				 * The instrumenter that created this span.
				 */
				/**
				 * The origin of the span, giving context about what created the span.
				 */
				/**
				 * You should never call the constructor manually, always use `Sentry.startTransaction()`
				 * or call `startChild()` on an existing span.
				 * @internal
				 * @hideconstructor
				 * @hidden
				 */
				constructor(spanContext = {}) {
					(this.traceId = spanContext.traceId || utils.uuid4()),
						(this.spanId = spanContext.spanId || utils.uuid4().substring(16)),
						(this.startTimestamp =
							spanContext.startTimestamp || utils.timestampInSeconds()),
						(this.tags = spanContext.tags || {}),
						(this.data = spanContext.data || {}),
						(this.instrumenter = spanContext.instrumenter || "sentry"),
						(this.origin = spanContext.origin || "manual"),
						spanContext.parentSpanId && (this.parentSpanId = spanContext.parentSpanId),
						"sampled" in spanContext && (this.sampled = spanContext.sampled),
						spanContext.op && (this.op = spanContext.op),
						spanContext.description && (this.description = spanContext.description),
						spanContext.name && (this.description = spanContext.name),
						spanContext.status && (this.status = spanContext.status),
						spanContext.endTimestamp && (this.endTimestamp = spanContext.endTimestamp);
				}
				/** An alias for `description` of the Span. */
				get name() {
					return this.description || "";
				}
				/** Update the name of the span. */
				set name(name) {
					this.setName(name);
				}
				/**
				 * @inheritDoc
				 */
				startChild(spanContext) {
					let childSpan = new Span({
						...spanContext,
						parentSpanId: this.spanId,
						sampled: this.sampled,
						traceId: this.traceId,
					});
					if (
						((childSpan.spanRecorder = this.spanRecorder),
						childSpan.spanRecorder && childSpan.spanRecorder.add(childSpan),
						(childSpan.transaction = this.transaction),
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							childSpan.transaction)
					) {
						let opStr = (spanContext && spanContext.op) || "< unknown op >",
							nameStr = childSpan.transaction.name || "< unknown name >",
							idStr = childSpan.transaction.spanId,
							logMessage = `[Tracing] Starting '${opStr}' span on transaction '${nameStr}' (${idStr}).`;
						(childSpan.transaction.metadata.spanMetadata[childSpan.spanId] = {
							logMessage,
						}),
							utils.logger.log(logMessage);
					}
					return childSpan;
				}
				/**
				 * @inheritDoc
				 */
				setTag(key, value) {
					return (this.tags = { ...this.tags, [key]: value }), this;
				}
				/**
				 * @inheritDoc
				 */
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
				setData(key, value) {
					return (this.data = { ...this.data, [key]: value }), this;
				}
				/**
				 * @inheritDoc
				 */
				setStatus(value) {
					return (this.status = value), this;
				}
				/**
				 * @inheritDoc
				 */
				setHttpStatus(httpStatus) {
					this.setTag("http.status_code", String(httpStatus)),
						this.setData("http.response.status_code", httpStatus);
					let spanStatus = spanStatusfromHttpCode(httpStatus);
					return spanStatus !== "unknown_error" && this.setStatus(spanStatus), this;
				}
				/**
				 * @inheritDoc
				 */
				setName(name) {
					this.description = name;
				}
				/**
				 * @inheritDoc
				 */
				isSuccess() {
					return this.status === "ok";
				}
				/**
				 * @inheritDoc
				 */
				finish(endTimestamp) {
					if (
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) && // Don't call this for transactions
						this.transaction &&
						this.transaction.spanId !== this.spanId
					) {
						let { logMessage } = this.transaction.metadata.spanMetadata[this.spanId];
						logMessage && utils.logger.log(logMessage.replace("Starting", "Finishing"));
					}
					this.endTimestamp =
						typeof endTimestamp == "number" ? endTimestamp : utils.timestampInSeconds();
				}
				/**
				 * @inheritDoc
				 */
				toTraceparent() {
					return utils.generateSentryTraceHeader(this.traceId, this.spanId, this.sampled);
				}
				/**
				 * @inheritDoc
				 */
				toContext() {
					return utils.dropUndefinedKeys({
						data: this.data,
						description: this.description,
						endTimestamp: this.endTimestamp,
						op: this.op,
						parentSpanId: this.parentSpanId,
						sampled: this.sampled,
						spanId: this.spanId,
						startTimestamp: this.startTimestamp,
						status: this.status,
						tags: this.tags,
						traceId: this.traceId,
					});
				}
				/**
				 * @inheritDoc
				 */
				updateWithContext(spanContext) {
					return (
						(this.data = spanContext.data || {}),
						(this.description = spanContext.description),
						(this.endTimestamp = spanContext.endTimestamp),
						(this.op = spanContext.op),
						(this.parentSpanId = spanContext.parentSpanId),
						(this.sampled = spanContext.sampled),
						(this.spanId = spanContext.spanId || this.spanId),
						(this.startTimestamp = spanContext.startTimestamp || this.startTimestamp),
						(this.status = spanContext.status),
						(this.tags = spanContext.tags || {}),
						(this.traceId = spanContext.traceId || this.traceId),
						this
					);
				}
				/**
				 * @inheritDoc
				 */
				getTraceContext() {
					return utils.dropUndefinedKeys({
						data: Object.keys(this.data).length > 0 ? this.data : void 0,
						description: this.description,
						op: this.op,
						parent_span_id: this.parentSpanId,
						span_id: this.spanId,
						status: this.status,
						tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
						trace_id: this.traceId,
					});
				}
				/**
				 * @inheritDoc
				 */
				toJSON() {
					return utils.dropUndefinedKeys({
						data: Object.keys(this.data).length > 0 ? this.data : void 0,
						description: this.description,
						op: this.op,
						parent_span_id: this.parentSpanId,
						span_id: this.spanId,
						start_timestamp: this.startTimestamp,
						status: this.status,
						tags: Object.keys(this.tags).length > 0 ? this.tags : void 0,
						timestamp: this.endTimestamp,
						trace_id: this.traceId,
						origin: this.origin,
					});
				}
			};
		function spanStatusfromHttpCode(httpStatus) {
			if (httpStatus < 400 && httpStatus >= 100) return "ok";
			if (httpStatus >= 400 && httpStatus < 500)
				switch (httpStatus) {
					case 401:
						return "unauthenticated";
					case 403:
						return "permission_denied";
					case 404:
						return "not_found";
					case 409:
						return "already_exists";
					case 413:
						return "failed_precondition";
					case 429:
						return "resource_exhausted";
					default:
						return "invalid_argument";
				}
			if (httpStatus >= 500 && httpStatus < 600)
				switch (httpStatus) {
					case 501:
						return "unimplemented";
					case 503:
						return "unavailable";
					case 504:
						return "deadline_exceeded";
					default:
						return "internal_error";
				}
			return "unknown_error";
		}
		exports.Span = Span;
		exports.SpanRecorder = SpanRecorder;
		exports.spanStatusfromHttpCode = spanStatusfromHttpCode;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js
var require_dynamicSamplingContext = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/dynamicSamplingContext.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			constants = require_constants();
		function getDynamicSamplingContextFromClient(trace_id, client, scope) {
			let options = client.getOptions(),
				{ publicKey: public_key } = client.getDsn() || {},
				{ segment: user_segment } = (scope && scope.getUser()) || {},
				dsc = utils.dropUndefinedKeys({
					environment: options.environment || constants.DEFAULT_ENVIRONMENT,
					release: options.release,
					user_segment,
					public_key,
					trace_id,
				});
			return client.emit && client.emit("createDsc", dsc), dsc;
		}
		exports.getDynamicSamplingContextFromClient = getDynamicSamplingContextFromClient;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/transaction.js
var require_transaction2 = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/transaction.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub(),
			dynamicSamplingContext = require_dynamicSamplingContext(),
			span = require_span(),
			Transaction = class extends span.Span {
				/**
				 * The reference to the current hub.
				 */
				/**
				 * This constructor should never be called manually. Those instrumenting tracing should use
				 * `Sentry.startTransaction()`, and internal methods should use `hub.startTransaction()`.
				 * @internal
				 * @hideconstructor
				 * @hidden
				 */
				constructor(transactionContext, hub$1) {
					super(transactionContext),
						delete this.description,
						(this._measurements = {}),
						(this._contexts = {}),
						(this._hub = hub$1 || hub.getCurrentHub()),
						(this._name = transactionContext.name || ""),
						(this.metadata = {
							source: "custom",
							...transactionContext.metadata,
							spanMetadata: {},
						}),
						(this._trimEnd = transactionContext.trimEnd),
						(this.transaction = this);
					let incomingDynamicSamplingContext = this.metadata.dynamicSamplingContext;
					incomingDynamicSamplingContext &&
						(this._frozenDynamicSamplingContext = {
							...incomingDynamicSamplingContext,
						});
				}
				/** Getter for `name` property */
				get name() {
					return this._name;
				}
				/** Setter for `name` property, which also sets `source` as custom */
				set name(newName) {
					this.setName(newName);
				}
				/**
				 * JSDoc
				 */
				setName(name, source = "custom") {
					(this._name = name), (this.metadata.source = source);
				}
				/**
				 * Attaches SpanRecorder to the span itself
				 * @param maxlen maximum number of spans that can be recorded
				 */
				initSpanRecorder(maxlen = 1e3) {
					this.spanRecorder || (this.spanRecorder = new span.SpanRecorder(maxlen)),
						this.spanRecorder.add(this);
				}
				/**
				 * @inheritDoc
				 */
				setContext(key, context) {
					context === null ? delete this._contexts[key] : (this._contexts[key] = context);
				}
				/**
				 * @inheritDoc
				 */
				setMeasurement(name, value, unit = "") {
					this._measurements[name] = { value, unit };
				}
				/**
				 * @inheritDoc
				 */
				setMetadata(newMetadata) {
					this.metadata = { ...this.metadata, ...newMetadata };
				}
				/**
				 * @inheritDoc
				 */
				finish(endTimestamp) {
					let transaction = this._finishTransaction(endTimestamp);
					if (transaction) return this._hub.captureEvent(transaction);
				}
				/**
				 * @inheritDoc
				 */
				toContext() {
					let spanContext = super.toContext();
					return utils.dropUndefinedKeys({
						...spanContext,
						name: this.name,
						trimEnd: this._trimEnd,
					});
				}
				/**
				 * @inheritDoc
				 */
				updateWithContext(transactionContext) {
					return (
						super.updateWithContext(transactionContext),
						(this.name = transactionContext.name || ""),
						(this._trimEnd = transactionContext.trimEnd),
						this
					);
				}
				/**
				 * @inheritdoc
				 *
				 * @experimental
				 */
				getDynamicSamplingContext() {
					if (this._frozenDynamicSamplingContext)
						return this._frozenDynamicSamplingContext;
					let hub$1 = this._hub || hub.getCurrentHub(),
						client = hub$1.getClient();
					if (!client) return {};
					let scope = hub$1.getScope(),
						dsc = dynamicSamplingContext.getDynamicSamplingContextFromClient(
							this.traceId,
							client,
							scope,
						),
						maybeSampleRate = this.metadata.sampleRate;
					maybeSampleRate !== void 0 && (dsc.sample_rate = `${maybeSampleRate}`);
					let source = this.metadata.source;
					return (
						source && source !== "url" && (dsc.transaction = this.name),
						this.sampled !== void 0 && (dsc.sampled = String(this.sampled)),
						dsc
					);
				}
				/**
				 * Override the current hub with a new one.
				 * Used if you want another hub to finish the transaction.
				 *
				 * @internal
				 */
				setHub(hub2) {
					this._hub = hub2;
				}
				/**
				 * Finish the transaction & prepare the event to send to Sentry.
				 */
				_finishTransaction(endTimestamp) {
					if (this.endTimestamp !== void 0) return;
					this.name ||
						((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn(
								"Transaction has no name, falling back to `<unlabeled transaction>`.",
							),
						(this.name = "<unlabeled transaction>")),
						super.finish(endTimestamp);
					let client = this._hub.getClient();
					if (
						(client && client.emit && client.emit("finishTransaction", this),
						this.sampled !== !0)
					) {
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(
								"[Tracing] Discarding transaction because its trace was not chosen to be sampled.",
							),
							client && client.recordDroppedEvent("sample_rate", "transaction");
						return;
					}
					let finishedSpans = this.spanRecorder
						? this.spanRecorder.spans.filter((s) => s !== this && s.endTimestamp)
						: [];
					this._trimEnd &&
						finishedSpans.length > 0 &&
						(this.endTimestamp = finishedSpans.reduce((prev, current) =>
							prev.endTimestamp && current.endTimestamp
								? prev.endTimestamp > current.endTimestamp
									? prev
									: current
								: prev,
						).endTimestamp);
					let metadata = this.metadata,
						transaction = {
							contexts: {
								...this._contexts,
								// We don't want to override trace context
								trace: this.getTraceContext(),
							},
							spans: finishedSpans,
							start_timestamp: this.startTimestamp,
							tags: this.tags,
							timestamp: this.endTimestamp,
							transaction: this.name,
							type: "transaction",
							sdkProcessingMetadata: {
								...metadata,
								dynamicSamplingContext: this.getDynamicSamplingContext(),
							},
							...(metadata.source && {
								transaction_info: {
									source: metadata.source,
								},
							}),
						};
					return (
						Object.keys(this._measurements).length > 0 &&
							((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log(
									"[Measurements] Adding measurements to transaction",
									JSON.stringify(this._measurements, void 0, 2),
								),
							(transaction.measurements = this._measurements)),
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(
								`[Tracing] Finishing ${this.op} transaction: ${this.name}.`,
							),
						transaction
					);
				}
			};
		exports.Transaction = Transaction;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/idletransaction.js
var require_idletransaction = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/idletransaction.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			span = require_span(),
			transaction = require_transaction2(),
			TRACING_DEFAULTS = {
				idleTimeout: 1e3,
				finalTimeout: 3e4,
				heartbeatInterval: 5e3,
			},
			FINISH_REASON_TAG = "finishReason",
			IDLE_TRANSACTION_FINISH_REASONS = [
				"heartbeatFailed",
				"idleTimeout",
				"documentHidden",
				"finalTimeout",
				"externalFinish",
				"cancelled",
			],
			IdleTransactionSpanRecorder = class extends span.SpanRecorder {
				constructor(_pushActivity, _popActivity, transactionSpanId, maxlen) {
					super(maxlen),
						(this._pushActivity = _pushActivity),
						(this._popActivity = _popActivity),
						(this.transactionSpanId = transactionSpanId);
				}
				/**
				 * @inheritDoc
				 */
				add(span2) {
					span2.spanId !== this.transactionSpanId &&
						((span2.finish = (endTimestamp) => {
							(span2.endTimestamp =
								typeof endTimestamp == "number"
									? endTimestamp
									: utils.timestampInSeconds()),
								this._popActivity(span2.spanId);
						}),
						span2.endTimestamp === void 0 && this._pushActivity(span2.spanId)),
						super.add(span2);
				}
			},
			IdleTransaction = class extends transaction.Transaction {
				// Activities store a list of active spans
				// Track state of activities in previous heartbeat
				// Amount of times heartbeat has counted. Will cause transaction to finish after 3 beats.
				// We should not use heartbeat if we finished a transaction
				// Idle timeout was canceled and we should finish the transaction with the last span end.
				/**
				 * Timer that tracks Transaction idleTimeout
				 */
				constructor(
					transactionContext,
					_idleHub,
					_idleTimeout = TRACING_DEFAULTS.idleTimeout,
					_finalTimeout = TRACING_DEFAULTS.finalTimeout,
					_heartbeatInterval = TRACING_DEFAULTS.heartbeatInterval,
					_onScope = !1,
				) {
					super(transactionContext, _idleHub),
						(this._idleHub = _idleHub),
						(this._idleTimeout = _idleTimeout),
						(this._finalTimeout = _finalTimeout),
						(this._heartbeatInterval = _heartbeatInterval),
						(this._onScope = _onScope),
						(this.activities = {}),
						(this._heartbeatCounter = 0),
						(this._finished = !1),
						(this._idleTimeoutCanceledPermanently = !1),
						(this._beforeFinishCallbacks = []),
						(this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[4]),
						_onScope &&
							((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log(
									`Setting idle transaction on scope. Span ID: ${this.spanId}`,
								),
							_idleHub.configureScope((scope) => scope.setSpan(this))),
						this._restartIdleTimeout(),
						setTimeout(() => {
							this._finished ||
								(this.setStatus("deadline_exceeded"),
								(this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[3]),
								this.finish());
						}, this._finalTimeout);
				}
				/** {@inheritDoc} */
				finish(endTimestamp = utils.timestampInSeconds()) {
					if (
						((this._finished = !0),
						(this.activities = {}),
						this.op === "ui.action.click" &&
							this.setTag(FINISH_REASON_TAG, this._finishReason),
						this.spanRecorder)
					) {
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(
								"[Tracing] finishing IdleTransaction",
								new Date(endTimestamp * 1e3).toISOString(),
								this.op,
							);
						for (let callback of this._beforeFinishCallbacks)
							callback(this, endTimestamp);
						(this.spanRecorder.spans = this.spanRecorder.spans.filter((span2) => {
							if (span2.spanId === this.spanId) return !0;
							span2.endTimestamp ||
								((span2.endTimestamp = endTimestamp),
								span2.setStatus("cancelled"),
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.log(
										"[Tracing] cancelling span since transaction ended early",
										JSON.stringify(span2, void 0, 2),
									));
							let spanStartedBeforeTransactionFinish =
									span2.startTimestamp < endTimestamp,
								timeoutWithMarginOfError =
									(this._finalTimeout + this._idleTimeout) / 1e3,
								spanEndedBeforeFinalTimeout =
									span2.endTimestamp - this.startTimestamp <
									timeoutWithMarginOfError;
							if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
								let stringifiedSpan = JSON.stringify(span2, void 0, 2);
								spanStartedBeforeTransactionFinish
									? spanEndedBeforeFinalTimeout ||
										utils.logger.log(
											"[Tracing] discarding Span since it finished after Transaction final timeout",
											stringifiedSpan,
										)
									: utils.logger.log(
											"[Tracing] discarding Span since it happened after Transaction was finished",
											stringifiedSpan,
										);
							}
							return (
								spanStartedBeforeTransactionFinish && spanEndedBeforeFinalTimeout
							);
						})),
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log("[Tracing] flushing IdleTransaction");
					} else
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log("[Tracing] No active IdleTransaction");
					if (this._onScope) {
						let scope = this._idleHub.getScope();
						scope.getTransaction() === this && scope.setSpan(void 0);
					}
					return super.finish(endTimestamp);
				}
				/**
				 * Register a callback function that gets excecuted before the transaction finishes.
				 * Useful for cleanup or if you want to add any additional spans based on current context.
				 *
				 * This is exposed because users have no other way of running something before an idle transaction
				 * finishes.
				 */
				registerBeforeFinishCallback(callback) {
					this._beforeFinishCallbacks.push(callback);
				}
				/**
				 * @inheritDoc
				 */
				initSpanRecorder(maxlen) {
					if (!this.spanRecorder) {
						let pushActivity = (id) => {
								this._finished || this._pushActivity(id);
							},
							popActivity = (id) => {
								this._finished || this._popActivity(id);
							};
						(this.spanRecorder = new IdleTransactionSpanRecorder(
							pushActivity,
							popActivity,
							this.spanId,
							maxlen,
						)),
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log("Starting heartbeat"),
							this._pingHeartbeat();
					}
					this.spanRecorder.add(this);
				}
				/**
				 * Cancels the existing idle timeout, if there is one.
				 * @param restartOnChildSpanChange Default is `true`.
				 *                                 If set to false the transaction will end
				 *                                 with the last child span.
				 */
				cancelIdleTimeout(
					endTimestamp,
					{ restartOnChildSpanChange } = {
						restartOnChildSpanChange: !0,
					},
				) {
					(this._idleTimeoutCanceledPermanently = restartOnChildSpanChange === !1),
						this._idleTimeoutID &&
							(clearTimeout(this._idleTimeoutID),
							(this._idleTimeoutID = void 0),
							Object.keys(this.activities).length === 0 &&
								this._idleTimeoutCanceledPermanently &&
								((this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5]),
								this.finish(endTimestamp)));
				}
				/**
				 * Temporary method used to externally set the transaction's `finishReason`
				 *
				 * ** WARNING**
				 * This is for the purpose of experimentation only and will be removed in the near future, do not use!
				 *
				 * @internal
				 *
				 */
				setFinishReason(reason) {
					this._finishReason = reason;
				}
				/**
				 * Restarts idle timeout, if there is no running idle timeout it will start one.
				 */
				_restartIdleTimeout(endTimestamp) {
					this.cancelIdleTimeout(),
						(this._idleTimeoutID = setTimeout(() => {
							!this._finished &&
								Object.keys(this.activities).length === 0 &&
								((this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[1]),
								this.finish(endTimestamp));
						}, this._idleTimeout));
				}
				/**
				 * Start tracking a specific activity.
				 * @param spanId The span id that represents the activity
				 */
				_pushActivity(spanId) {
					this.cancelIdleTimeout(void 0, {
						restartOnChildSpanChange: !this._idleTimeoutCanceledPermanently,
					}),
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(`[Tracing] pushActivity: ${spanId}`),
						(this.activities[spanId] = !0),
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(
								"[Tracing] new activities count",
								Object.keys(this.activities).length,
							);
				}
				/**
				 * Remove an activity from usage
				 * @param spanId The span id that represents the activity
				 */
				_popActivity(spanId) {
					if (
						(this.activities[spanId] &&
							((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log(`[Tracing] popActivity ${spanId}`),
							delete this.activities[spanId],
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log(
									"[Tracing] new activities count",
									Object.keys(this.activities).length,
								)),
						Object.keys(this.activities).length === 0)
					) {
						let endTimestamp = utils.timestampInSeconds();
						this._idleTimeoutCanceledPermanently
							? ((this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[5]),
								this.finish(endTimestamp))
							: this._restartIdleTimeout(endTimestamp + this._idleTimeout / 1e3);
					}
				}
				/**
				 * Checks when entries of this.activities are not changing for 3 beats.
				 * If this occurs we finish the transaction.
				 */
				_beat() {
					if (this._finished) return;
					let heartbeatString = Object.keys(this.activities).join("");
					heartbeatString === this._prevHeartbeatString
						? this._heartbeatCounter++
						: (this._heartbeatCounter = 1),
						(this._prevHeartbeatString = heartbeatString),
						this._heartbeatCounter >= 3
							? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.log(
										"[Tracing] Transaction finished because of no change for 3 heart beats",
									),
								this.setStatus("deadline_exceeded"),
								(this._finishReason = IDLE_TRANSACTION_FINISH_REASONS[0]),
								this.finish())
							: this._pingHeartbeat();
				}
				/**
				 * Pings the heartbeat
				 */
				_pingHeartbeat() {
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.log(
							`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`,
						),
						setTimeout(() => {
							this._beat();
						}, this._heartbeatInterval);
				}
			};
		exports.IdleTransaction = IdleTransaction;
		exports.IdleTransactionSpanRecorder = IdleTransactionSpanRecorder;
		exports.TRACING_DEFAULTS = TRACING_DEFAULTS;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js
var require_hasTracingEnabled = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/hasTracingEnabled.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var hub = require_hub();
		function hasTracingEnabled(maybeOptions) {
			if (typeof __SENTRY_TRACING__ == "boolean" && !__SENTRY_TRACING__) return !1;
			let client = hub.getCurrentHub().getClient(),
				options = maybeOptions || (client && client.getOptions());
			return (
				!!options &&
				(options.enableTracing ||
					"tracesSampleRate" in options ||
					"tracesSampler" in options)
			);
		}
		exports.hasTracingEnabled = hasTracingEnabled;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/sampling.js
var require_sampling = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/sampling.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hasTracingEnabled = require_hasTracingEnabled();
		function sampleTransaction(transaction, options, samplingContext) {
			if (!hasTracingEnabled.hasTracingEnabled(options))
				return (transaction.sampled = !1), transaction;
			if (transaction.sampled !== void 0)
				return (
					transaction.setMetadata({
						sampleRate: Number(transaction.sampled),
					}),
					transaction
				);
			let sampleRate;
			return (
				typeof options.tracesSampler == "function"
					? ((sampleRate = options.tracesSampler(samplingContext)),
						transaction.setMetadata({
							sampleRate: Number(sampleRate),
						}))
					: samplingContext.parentSampled !== void 0
						? (sampleRate = samplingContext.parentSampled)
						: typeof options.tracesSampleRate < "u"
							? ((sampleRate = options.tracesSampleRate),
								transaction.setMetadata({
									sampleRate: Number(sampleRate),
								}))
							: ((sampleRate = 1),
								transaction.setMetadata({
									sampleRate,
								})),
				isValidSampleRate(sampleRate)
					? sampleRate
						? ((transaction.sampled = Math.random() < sampleRate),
							transaction.sampled
								? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.log(
											`[Tracing] starting ${transaction.op} transaction - ${transaction.name}`,
										),
									transaction)
								: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.log(
											`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(
												sampleRate,
											)})`,
										),
									transaction))
						: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.log(
									`[Tracing] Discarding transaction because ${typeof options.tracesSampler == "function" ? "tracesSampler returned 0 or false" : "a negative sampling decision was inherited or tracesSampleRate is set to 0"}`,
								),
							(transaction.sampled = !1),
							transaction)
					: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn(
								"[Tracing] Discarding transaction because of invalid sample rate.",
							),
						(transaction.sampled = !1),
						transaction)
			);
		}
		function isValidSampleRate(rate) {
			return utils.isNaN(rate) || !(typeof rate == "number" || typeof rate == "boolean")
				? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(
							`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(
								rate,
							)} of type ${JSON.stringify(typeof rate)}.`,
						),
					!1)
				: rate < 0 || rate > 1
					? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn(
								`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${rate}.`,
							),
						!1)
					: !0;
		}
		exports.sampleTransaction = sampleTransaction;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/hubextensions.js
var require_hubextensions = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/hubextensions.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub(),
			errors = require_errors(),
			idletransaction = require_idletransaction(),
			sampling = require_sampling(),
			transaction = require_transaction2();
		function traceHeaders() {
			let span = this.getScope().getSpan();
			return span
				? {
						"sentry-trace": span.toTraceparent(),
					}
				: {};
		}
		function _startTransaction(transactionContext, customSamplingContext) {
			let client = this.getClient(),
				options = (client && client.getOptions()) || {},
				configInstrumenter = options.instrumenter || "sentry",
				transactionInstrumenter = transactionContext.instrumenter || "sentry";
			configInstrumenter !== transactionInstrumenter &&
				((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.error(
						`A transaction was started with instrumenter=\`${transactionInstrumenter}\`, but the SDK is configured with the \`${configInstrumenter}\` instrumenter.
The transaction will not be sampled. Please use the ${configInstrumenter} instrumentation to start transactions.`,
					),
				(transactionContext.sampled = !1));
			let transaction$1 = new transaction.Transaction(transactionContext, this);
			return (
				(transaction$1 = sampling.sampleTransaction(transaction$1, options, {
					parentSampled: transactionContext.parentSampled,
					transactionContext,
					...customSamplingContext,
				})),
				transaction$1.sampled &&
					transaction$1.initSpanRecorder(
						options._experiments && options._experiments.maxSpans,
					),
				client && client.emit && client.emit("startTransaction", transaction$1),
				transaction$1
			);
		}
		function startIdleTransaction(
			hub2,
			transactionContext,
			idleTimeout,
			finalTimeout,
			onScope,
			customSamplingContext,
			heartbeatInterval,
		) {
			let client = hub2.getClient(),
				options = (client && client.getOptions()) || {},
				transaction2 = new idletransaction.IdleTransaction(
					transactionContext,
					hub2,
					idleTimeout,
					finalTimeout,
					heartbeatInterval,
					onScope,
				);
			return (
				(transaction2 = sampling.sampleTransaction(transaction2, options, {
					parentSampled: transactionContext.parentSampled,
					transactionContext,
					...customSamplingContext,
				})),
				transaction2.sampled &&
					transaction2.initSpanRecorder(
						options._experiments && options._experiments.maxSpans,
					),
				client && client.emit && client.emit("startTransaction", transaction2),
				transaction2
			);
		}
		function addTracingExtensions() {
			let carrier = hub.getMainCarrier();
			carrier.__SENTRY__ &&
				((carrier.__SENTRY__.extensions = carrier.__SENTRY__.extensions || {}),
				carrier.__SENTRY__.extensions.startTransaction ||
					(carrier.__SENTRY__.extensions.startTransaction = _startTransaction),
				carrier.__SENTRY__.extensions.traceHeaders ||
					(carrier.__SENTRY__.extensions.traceHeaders = traceHeaders),
				errors.registerErrorInstrumentation());
		}
		exports.addTracingExtensions = addTracingExtensions;
		exports.startIdleTransaction = startIdleTransaction;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/spanstatus.js
var require_spanstatus = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/spanstatus.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		exports.SpanStatus = void 0;
		(function (SpanStatus) {
			let Ok = "ok";
			SpanStatus.Ok = Ok;
			let DeadlineExceeded = "deadline_exceeded";
			SpanStatus.DeadlineExceeded = DeadlineExceeded;
			let Unauthenticated = "unauthenticated";
			SpanStatus.Unauthenticated = Unauthenticated;
			let PermissionDenied = "permission_denied";
			SpanStatus.PermissionDenied = PermissionDenied;
			let NotFound = "not_found";
			SpanStatus.NotFound = NotFound;
			let ResourceExhausted = "resource_exhausted";
			SpanStatus.ResourceExhausted = ResourceExhausted;
			let InvalidArgument = "invalid_argument";
			SpanStatus.InvalidArgument = InvalidArgument;
			let Unimplemented = "unimplemented";
			SpanStatus.Unimplemented = Unimplemented;
			let Unavailable = "unavailable";
			SpanStatus.Unavailable = Unavailable;
			let InternalError = "internal_error";
			SpanStatus.InternalError = InternalError;
			let UnknownError = "unknown_error";
			SpanStatus.UnknownError = UnknownError;
			let Cancelled = "cancelled";
			SpanStatus.Cancelled = Cancelled;
			let AlreadyExists = "already_exists";
			SpanStatus.AlreadyExists = AlreadyExists;
			let FailedPrecondition = "failed_precondition";
			SpanStatus.FailedPrecondition = FailedPrecondition;
			let Aborted = "aborted";
			SpanStatus.Aborted = Aborted;
			let OutOfRange = "out_of_range";
			SpanStatus.OutOfRange = OutOfRange;
			let DataLoss = "data_loss";
			SpanStatus.DataLoss = DataLoss;
		})(exports.SpanStatus || (exports.SpanStatus = {}));
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/trace.js
var require_trace = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/trace.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub(),
			hasTracingEnabled = require_hasTracingEnabled();
		function trace(context, callback, onError = () => {}) {
			let ctx = normalizeContext(context),
				hub$1 = hub.getCurrentHub(),
				scope = hub$1.getScope(),
				parentSpan = scope.getSpan(),
				activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
			scope.setSpan(activeSpan);
			function finishAndSetSpan() {
				activeSpan && activeSpan.finish(), hub$1.getScope().setSpan(parentSpan);
			}
			let maybePromiseResult;
			try {
				maybePromiseResult = callback(activeSpan);
			} catch (e) {
				throw (
					(activeSpan && activeSpan.setStatus("internal_error"),
					onError(e),
					finishAndSetSpan(),
					e)
				);
			}
			return (
				utils.isThenable(maybePromiseResult)
					? Promise.resolve(maybePromiseResult).then(
							() => {
								finishAndSetSpan();
							},
							(e) => {
								activeSpan && activeSpan.setStatus("internal_error"),
									onError(e),
									finishAndSetSpan();
							},
						)
					: finishAndSetSpan(),
				maybePromiseResult
			);
		}
		function startSpan(context, callback) {
			let ctx = normalizeContext(context),
				hub$1 = hub.getCurrentHub(),
				scope = hub$1.getScope(),
				parentSpan = scope.getSpan(),
				activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
			scope.setSpan(activeSpan);
			function finishAndSetSpan() {
				activeSpan && activeSpan.finish(), hub$1.getScope().setSpan(parentSpan);
			}
			let maybePromiseResult;
			try {
				maybePromiseResult = callback(activeSpan);
			} catch (e) {
				throw (activeSpan && activeSpan.setStatus("internal_error"), finishAndSetSpan(), e);
			}
			return (
				utils.isThenable(maybePromiseResult)
					? Promise.resolve(maybePromiseResult).then(
							() => {
								finishAndSetSpan();
							},
							() => {
								activeSpan && activeSpan.setStatus("internal_error"),
									finishAndSetSpan();
							},
						)
					: finishAndSetSpan(),
				maybePromiseResult
			);
		}
		var startActiveSpan = startSpan;
		function startSpanManual(context, callback) {
			let ctx = normalizeContext(context),
				hub$1 = hub.getCurrentHub(),
				scope = hub$1.getScope(),
				parentSpan = scope.getSpan(),
				activeSpan = createChildSpanOrTransaction(hub$1, parentSpan, ctx);
			scope.setSpan(activeSpan);
			function finishAndSetSpan() {
				activeSpan && activeSpan.finish(), hub$1.getScope().setSpan(parentSpan);
			}
			let maybePromiseResult;
			try {
				maybePromiseResult = callback(activeSpan, finishAndSetSpan);
			} catch (e) {
				throw (activeSpan && activeSpan.setStatus("internal_error"), e);
			}
			return (
				utils.isThenable(maybePromiseResult) &&
					Promise.resolve(maybePromiseResult).then(void 0, () => {
						activeSpan && activeSpan.setStatus("internal_error");
					}),
				maybePromiseResult
			);
		}
		function startInactiveSpan(context) {
			if (!hasTracingEnabled.hasTracingEnabled()) return;
			let ctx = { ...context };
			ctx.name !== void 0 && ctx.description === void 0 && (ctx.description = ctx.name);
			let hub$1 = hub.getCurrentHub(),
				parentSpan = getActiveSpan();
			return parentSpan ? parentSpan.startChild(ctx) : hub$1.startTransaction(ctx);
		}
		function getActiveSpan() {
			return hub.getCurrentHub().getScope().getSpan();
		}
		function continueTrace({ sentryTrace, baggage }, callback) {
			let currentScope = hub.getCurrentHub().getScope(),
				{ traceparentData, dynamicSamplingContext, propagationContext } =
					utils.tracingContextFromHeaders(sentryTrace, baggage);
			currentScope.setPropagationContext(propagationContext),
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					traceparentData &&
					utils.logger.log(`[Tracing] Continuing trace ${traceparentData.traceId}.`);
			let transactionContext = {
				...traceparentData,
				metadata: utils.dropUndefinedKeys({
					dynamicSamplingContext:
						traceparentData && !dynamicSamplingContext ? {} : dynamicSamplingContext,
				}),
			};
			return callback(transactionContext);
		}
		function createChildSpanOrTransaction(hub2, parentSpan, ctx) {
			if (hasTracingEnabled.hasTracingEnabled())
				return parentSpan ? parentSpan.startChild(ctx) : hub2.startTransaction(ctx);
		}
		function normalizeContext(context) {
			let ctx = { ...context };
			return (
				ctx.name !== void 0 && ctx.description === void 0 && (ctx.description = ctx.name),
				ctx
			);
		}
		exports.continueTrace = continueTrace;
		exports.getActiveSpan = getActiveSpan;
		exports.startActiveSpan = startActiveSpan;
		exports.startInactiveSpan = startInactiveSpan;
		exports.startSpan = startSpan;
		exports.startSpanManual = startSpanManual;
		exports.trace = trace;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/measurement.js
var require_measurement = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/tracing/measurement.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_utils();
		function setMeasurement(name, value, unit) {
			let transaction = utils.getActiveTransaction();
			transaction && transaction.setMeasurement(name, value, unit);
		}
		exports.setMeasurement = setMeasurement;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/exports.js
var require_exports = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/exports.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub();
		function captureException(exception, captureContext) {
			return hub.getCurrentHub().captureException(exception, { captureContext });
		}
		function captureMessage(message, captureContext) {
			let level = typeof captureContext == "string" ? captureContext : void 0,
				context = typeof captureContext != "string" ? { captureContext } : void 0;
			return hub.getCurrentHub().captureMessage(message, level, context);
		}
		function captureEvent(event, hint) {
			return hub.getCurrentHub().captureEvent(event, hint);
		}
		function configureScope(callback) {
			hub.getCurrentHub().configureScope(callback);
		}
		function addBreadcrumb(breadcrumb) {
			hub.getCurrentHub().addBreadcrumb(breadcrumb);
		}
		function setContext(name, context) {
			hub.getCurrentHub().setContext(name, context);
		}
		function setExtras(extras) {
			hub.getCurrentHub().setExtras(extras);
		}
		function setExtra(key, extra) {
			hub.getCurrentHub().setExtra(key, extra);
		}
		function setTags(tags) {
			hub.getCurrentHub().setTags(tags);
		}
		function setTag(key, value) {
			hub.getCurrentHub().setTag(key, value);
		}
		function setUser(user) {
			hub.getCurrentHub().setUser(user);
		}
		function withScope(callback) {
			hub.getCurrentHub().withScope(callback);
		}
		function startTransaction(context, customSamplingContext) {
			return hub.getCurrentHub().startTransaction({ ...context }, customSamplingContext);
		}
		function captureCheckIn(checkIn, upsertMonitorConfig) {
			let hub$1 = hub.getCurrentHub(),
				scope = hub$1.getScope(),
				client = hub$1.getClient();
			if (!client)
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.warn("Cannot capture check-in. No client defined.");
			else if (!client.captureCheckIn)
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.warn(
						"Cannot capture check-in. Client does not support sending check-ins.",
					);
			else return client.captureCheckIn(checkIn, upsertMonitorConfig, scope);
			return utils.uuid4();
		}
		function withMonitor(monitorSlug, callback, upsertMonitorConfig) {
			let checkInId = captureCheckIn(
					{ monitorSlug, status: "in_progress" },
					upsertMonitorConfig,
				),
				now = utils.timestampInSeconds();
			function finishCheckIn(status) {
				captureCheckIn({
					monitorSlug,
					status,
					checkInId,
					duration: utils.timestampInSeconds() - now,
				});
			}
			let maybePromiseResult;
			try {
				maybePromiseResult = callback();
			} catch (e) {
				throw (finishCheckIn("error"), e);
			}
			return (
				utils.isThenable(maybePromiseResult)
					? Promise.resolve(maybePromiseResult).then(
							() => {
								finishCheckIn("ok");
							},
							() => {
								finishCheckIn("error");
							},
						)
					: finishCheckIn("ok"),
				maybePromiseResult
			);
		}
		async function flush(timeout) {
			let client = hub.getCurrentHub().getClient();
			return client
				? client.flush(timeout)
				: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn("Cannot flush events. No client defined."),
					Promise.resolve(!1));
		}
		async function close(timeout) {
			let client = hub.getCurrentHub().getClient();
			return client
				? client.close(timeout)
				: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(
							"Cannot flush events and disable SDK. No client defined.",
						),
					Promise.resolve(!1));
		}
		function lastEventId() {
			return hub.getCurrentHub().lastEventId();
		}
		exports.addBreadcrumb = addBreadcrumb;
		exports.captureCheckIn = captureCheckIn;
		exports.captureEvent = captureEvent;
		exports.captureException = captureException;
		exports.captureMessage = captureMessage;
		exports.close = close;
		exports.configureScope = configureScope;
		exports.flush = flush;
		exports.lastEventId = lastEventId;
		exports.setContext = setContext;
		exports.setExtra = setExtra;
		exports.setExtras = setExtras;
		exports.setTag = setTag;
		exports.setTags = setTags;
		exports.setUser = setUser;
		exports.startTransaction = startTransaction;
		exports.withMonitor = withMonitor;
		exports.withScope = withScope;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/sessionflusher.js
var require_sessionflusher = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/sessionflusher.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub(),
			SessionFlusher = class {
				constructor(client, attrs) {
					(this._client = client),
						(this.flushTimeout = 60),
						(this._pendingAggregates = {}),
						(this._isEnabled = !0),
						(this._intervalId = setInterval(
							() => this.flush(),
							this.flushTimeout * 1e3,
						)),
						(this._sessionAttrs = attrs);
				}
				/** Checks if `pendingAggregates` has entries, and if it does flushes them by calling `sendSession` */
				flush() {
					let sessionAggregates = this.getSessionAggregates();
					sessionAggregates.aggregates.length !== 0 &&
						((this._pendingAggregates = {}),
						this._client.sendSession(sessionAggregates));
				}
				/** Massages the entries in `pendingAggregates` and returns aggregated sessions */
				getSessionAggregates() {
					let aggregates = Object.keys(this._pendingAggregates).map(
							(key) => this._pendingAggregates[parseInt(key)],
						),
						sessionAggregates = {
							attrs: this._sessionAttrs,
							aggregates,
						};
					return utils.dropUndefinedKeys(sessionAggregates);
				}
				/** JSDoc */
				close() {
					clearInterval(this._intervalId), (this._isEnabled = !1), this.flush();
				}
				/**
				 * Wrapper function for _incrementSessionStatusCount that checks if the instance of SessionFlusher is enabled then
				 * fetches the session status of the request from `Scope.getRequestSession().status` on the scope and passes them to
				 * `_incrementSessionStatusCount` along with the start date
				 */
				incrementSessionStatusCount() {
					if (!this._isEnabled) return;
					let scope = hub.getCurrentHub().getScope(),
						requestSession = scope.getRequestSession();
					requestSession &&
						requestSession.status &&
						(this._incrementSessionStatusCount(
							requestSession.status,
							/* @__PURE__ */ new Date(),
						),
						scope.setRequestSession(void 0));
				}
				/**
				 * Increments status bucket in pendingAggregates buffer (internal state) corresponding to status of
				 * the session received
				 */
				_incrementSessionStatusCount(status, date) {
					let sessionStartedTrunc = new Date(date).setSeconds(0, 0);
					this._pendingAggregates[sessionStartedTrunc] =
						this._pendingAggregates[sessionStartedTrunc] || {};
					let aggregationCounts = this._pendingAggregates[sessionStartedTrunc];
					switch (
						(aggregationCounts.started ||
							(aggregationCounts.started = new Date(
								sessionStartedTrunc,
							).toISOString()),
						status)
					) {
						case "errored":
							return (
								(aggregationCounts.errored = (aggregationCounts.errored || 0) + 1),
								aggregationCounts.errored
							);
						case "ok":
							return (
								(aggregationCounts.exited = (aggregationCounts.exited || 0) + 1),
								aggregationCounts.exited
							);
						default:
							return (
								(aggregationCounts.crashed = (aggregationCounts.crashed || 0) + 1),
								aggregationCounts.crashed
							);
					}
				}
			};
		exports.SessionFlusher = SessionFlusher;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/api.js
var require_api = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/api.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			SENTRY_API_VERSION = "7";
		function getBaseApiEndpoint(dsn) {
			let protocol = dsn.protocol ? `${dsn.protocol}:` : "",
				port = dsn.port ? `:${dsn.port}` : "";
			return `${protocol}//${dsn.host}${port}${dsn.path ? `/${dsn.path}` : ""}/api/`;
		}
		function _getIngestEndpoint(dsn) {
			return `${getBaseApiEndpoint(dsn)}${dsn.projectId}/envelope/`;
		}
		function _encodedAuth(dsn, sdkInfo) {
			return utils.urlEncode({
				// We send only the minimum set of required information. See
				// https://github.com/getsentry/sentry-javascript/issues/2572.
				sentry_key: dsn.publicKey,
				sentry_version: SENTRY_API_VERSION,
				...(sdkInfo && { sentry_client: `${sdkInfo.name}/${sdkInfo.version}` }),
			});
		}
		function getEnvelopeEndpointWithUrlEncodedAuth(dsn, tunnelOrOptions = {}) {
			let tunnel =
					typeof tunnelOrOptions == "string" ? tunnelOrOptions : tunnelOrOptions.tunnel,
				sdkInfo =
					typeof tunnelOrOptions == "string" || !tunnelOrOptions._metadata
						? void 0
						: tunnelOrOptions._metadata.sdk;
			return tunnel || `${_getIngestEndpoint(dsn)}?${_encodedAuth(dsn, sdkInfo)}`;
		}
		function getReportDialogEndpoint(dsnLike, dialogOptions) {
			let dsn = utils.makeDsn(dsnLike);
			if (!dsn) return "";
			let endpoint = `${getBaseApiEndpoint(dsn)}embed/error-page/`,
				encodedOptions = `dsn=${utils.dsnToString(dsn)}`;
			for (let key in dialogOptions)
				if (key !== "dsn")
					if (key === "user") {
						let user = dialogOptions.user;
						if (!user) continue;
						user.name && (encodedOptions += `&name=${encodeURIComponent(user.name)}`),
							user.email &&
								(encodedOptions += `&email=${encodeURIComponent(user.email)}`);
					} else
						encodedOptions += `&${encodeURIComponent(key)}=${encodeURIComponent(dialogOptions[key])}`;
			return `${endpoint}?${encodedOptions}`;
		}
		exports.getEnvelopeEndpointWithUrlEncodedAuth = getEnvelopeEndpointWithUrlEncodedAuth;
		exports.getReportDialogEndpoint = getReportDialogEndpoint;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/envelope.js
var require_envelope2 = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/envelope.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs();
		function enhanceEventWithSdkInfo(event, sdkInfo) {
			return (
				sdkInfo &&
					((event.sdk = event.sdk || {}),
					(event.sdk.name = event.sdk.name || sdkInfo.name),
					(event.sdk.version = event.sdk.version || sdkInfo.version),
					(event.sdk.integrations = [
						...(event.sdk.integrations || []),
						...(sdkInfo.integrations || []),
					]),
					(event.sdk.packages = [
						...(event.sdk.packages || []),
						...(sdkInfo.packages || []),
					])),
				event
			);
		}
		function createSessionEnvelope(session, dsn, metadata, tunnel) {
			let sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata),
				envelopeHeaders = {
					sent_at: /* @__PURE__ */ new Date().toISOString(),
					...(sdkInfo && { sdk: sdkInfo }),
					...(!!tunnel && dsn && { dsn: utils.dsnToString(dsn) }),
				},
				envelopeItem =
					"aggregates" in session
						? [{ type: "sessions" }, session]
						: [{ type: "session" }, session.toJSON()];
			return utils.createEnvelope(envelopeHeaders, [envelopeItem]);
		}
		function createEventEnvelope(event, dsn, metadata, tunnel) {
			let sdkInfo = utils.getSdkMetadataForEnvelopeHeader(metadata),
				eventType = event.type && event.type !== "replay_event" ? event.type : "event";
			enhanceEventWithSdkInfo(event, metadata && metadata.sdk);
			let envelopeHeaders = utils.createEventEnvelopeHeaders(event, sdkInfo, tunnel, dsn);
			delete event.sdkProcessingMetadata;
			let eventItem = [{ type: eventType }, event];
			return utils.createEnvelope(envelopeHeaders, [eventItem]);
		}
		exports.createEventEnvelope = createEventEnvelope;
		exports.createSessionEnvelope = createSessionEnvelope;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integration.js
var require_integration = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integration.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			eventProcessors = require_eventProcessors(),
			hub = require_hub(),
			installedIntegrations = [];
		function filterDuplicates(integrations) {
			let integrationsByName = {};
			return (
				integrations.forEach((currentInstance) => {
					let { name } = currentInstance,
						existingInstance = integrationsByName[name];
					(existingInstance &&
						!existingInstance.isDefaultInstance &&
						currentInstance.isDefaultInstance) ||
						(integrationsByName[name] = currentInstance);
				}),
				Object.keys(integrationsByName).map((k) => integrationsByName[k])
			);
		}
		function getIntegrationsToSetup(options) {
			let defaultIntegrations = options.defaultIntegrations || [],
				userIntegrations = options.integrations;
			defaultIntegrations.forEach((integration) => {
				integration.isDefaultInstance = !0;
			});
			let integrations;
			Array.isArray(userIntegrations)
				? (integrations = [...defaultIntegrations, ...userIntegrations])
				: typeof userIntegrations == "function"
					? (integrations = utils.arrayify(userIntegrations(defaultIntegrations)))
					: (integrations = defaultIntegrations);
			let finalIntegrations = filterDuplicates(integrations),
				debugIndex = findIndex(
					finalIntegrations,
					(integration) => integration.name === "Debug",
				);
			if (debugIndex !== -1) {
				let [debugInstance] = finalIntegrations.splice(debugIndex, 1);
				finalIntegrations.push(debugInstance);
			}
			return finalIntegrations;
		}
		function setupIntegrations(client, integrations) {
			let integrationIndex = {};
			return (
				integrations.forEach((integration) => {
					integration && setupIntegration(client, integration, integrationIndex);
				}),
				integrationIndex
			);
		}
		function setupIntegration(client, integration, integrationIndex) {
			if (
				((integrationIndex[integration.name] = integration),
				installedIntegrations.indexOf(integration.name) === -1 &&
					(integration.setupOnce(
						eventProcessors.addGlobalEventProcessor,
						hub.getCurrentHub,
					),
					installedIntegrations.push(integration.name)),
				client.on && typeof integration.preprocessEvent == "function")
			) {
				let callback = integration.preprocessEvent.bind(integration);
				client.on("preprocessEvent", (event, hint) => callback(event, hint, client));
			}
			if (client.addEventProcessor && typeof integration.processEvent == "function") {
				let callback = integration.processEvent.bind(integration),
					processor = Object.assign((event, hint) => callback(event, hint, client), {
						id: integration.name,
					});
				client.addEventProcessor(processor);
			}
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				utils.logger.log(`Integration installed: ${integration.name}`);
		}
		function addIntegration(integration) {
			let client = hub.getCurrentHub().getClient();
			if (!client || !client.addIntegration) {
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					utils.logger.warn(
						`Cannot add integration "${integration.name}" because no SDK Client is available.`,
					);
				return;
			}
			client.addIntegration(integration);
		}
		function findIndex(arr, callback) {
			for (let i = 0; i < arr.length; i++) if (callback(arr[i]) === !0) return i;
			return -1;
		}
		exports.addIntegration = addIntegration;
		exports.getIntegrationsToSetup = getIntegrationsToSetup;
		exports.installedIntegrations = installedIntegrations;
		exports.setupIntegration = setupIntegration;
		exports.setupIntegrations = setupIntegrations;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/prepareEvent.js
var require_prepareEvent = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/prepareEvent.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			constants = require_constants(),
			eventProcessors = require_eventProcessors(),
			scope = require_scope();
		function prepareEvent(options, event, hint, scope$1, client) {
			let { normalizeDepth = 3, normalizeMaxBreadth = 1e3 } = options,
				prepared = {
					...event,
					event_id: event.event_id || hint.event_id || utils.uuid4(),
					timestamp: event.timestamp || utils.dateTimestampInSeconds(),
				},
				integrations = hint.integrations || options.integrations.map((i) => i.name);
			applyClientOptions(prepared, options),
				applyIntegrationsMetadata(prepared, integrations),
				event.type === void 0 && applyDebugIds(prepared, options.stackParser);
			let finalScope = scope$1;
			hint.captureContext &&
				(finalScope = scope.Scope.clone(finalScope).update(hint.captureContext));
			let result = utils.resolvedSyncPromise(prepared),
				clientEventProcessors =
					client && client.getEventProcessors ? client.getEventProcessors() : [];
			if (finalScope) {
				if (finalScope.getAttachments) {
					let attachments = [...(hint.attachments || []), ...finalScope.getAttachments()];
					attachments.length && (hint.attachments = attachments);
				}
				result = finalScope.applyToEvent(prepared, hint, clientEventProcessors);
			} else
				result = eventProcessors.notifyEventProcessors(
					[...clientEventProcessors, ...eventProcessors.getGlobalEventProcessors()],
					prepared,
					hint,
				);
			return result.then(
				(evt) => (
					evt && applyDebugMeta(evt),
					typeof normalizeDepth == "number" && normalizeDepth > 0
						? normalizeEvent(evt, normalizeDepth, normalizeMaxBreadth)
						: evt
				),
			);
		}
		function applyClientOptions(event, options) {
			let { environment, release, dist, maxValueLength = 250 } = options;
			"environment" in event ||
				(event.environment =
					"environment" in options ? environment : constants.DEFAULT_ENVIRONMENT),
				event.release === void 0 && release !== void 0 && (event.release = release),
				event.dist === void 0 && dist !== void 0 && (event.dist = dist),
				event.message && (event.message = utils.truncate(event.message, maxValueLength));
			let exception = event.exception && event.exception.values && event.exception.values[0];
			exception &&
				exception.value &&
				(exception.value = utils.truncate(exception.value, maxValueLength));
			let request = event.request;
			request && request.url && (request.url = utils.truncate(request.url, maxValueLength));
		}
		var debugIdStackParserCache = /* @__PURE__ */ new WeakMap();
		function applyDebugIds(event, stackParser) {
			let debugIdMap = utils.GLOBAL_OBJ._sentryDebugIds;
			if (!debugIdMap) return;
			let debugIdStackFramesCache,
				cachedDebugIdStackFrameCache = debugIdStackParserCache.get(stackParser);
			cachedDebugIdStackFrameCache
				? (debugIdStackFramesCache = cachedDebugIdStackFrameCache)
				: ((debugIdStackFramesCache = /* @__PURE__ */ new Map()),
					debugIdStackParserCache.set(stackParser, debugIdStackFramesCache));
			let filenameDebugIdMap = Object.keys(debugIdMap).reduce((acc, debugIdStackTrace) => {
				let parsedStack,
					cachedParsedStack = debugIdStackFramesCache.get(debugIdStackTrace);
				cachedParsedStack
					? (parsedStack = cachedParsedStack)
					: ((parsedStack = stackParser(debugIdStackTrace)),
						debugIdStackFramesCache.set(debugIdStackTrace, parsedStack));
				for (let i = parsedStack.length - 1; i >= 0; i--) {
					let stackFrame = parsedStack[i];
					if (stackFrame.filename) {
						acc[stackFrame.filename] = debugIdMap[debugIdStackTrace];
						break;
					}
				}
				return acc;
			}, {});
			try {
				event.exception.values.forEach((exception) => {
					exception.stacktrace.frames.forEach((frame) => {
						frame.filename && (frame.debug_id = filenameDebugIdMap[frame.filename]);
					});
				});
			} catch {}
		}
		function applyDebugMeta(event) {
			let filenameDebugIdMap = {};
			try {
				event.exception.values.forEach((exception) => {
					exception.stacktrace.frames.forEach((frame) => {
						frame.debug_id &&
							(frame.abs_path
								? (filenameDebugIdMap[frame.abs_path] = frame.debug_id)
								: frame.filename &&
									(filenameDebugIdMap[frame.filename] = frame.debug_id),
							delete frame.debug_id);
					});
				});
			} catch {}
			if (Object.keys(filenameDebugIdMap).length === 0) return;
			(event.debug_meta = event.debug_meta || {}),
				(event.debug_meta.images = event.debug_meta.images || []);
			let images = event.debug_meta.images;
			Object.keys(filenameDebugIdMap).forEach((filename) => {
				images.push({
					type: "sourcemap",
					code_file: filename,
					debug_id: filenameDebugIdMap[filename],
				});
			});
		}
		function applyIntegrationsMetadata(event, integrationNames) {
			integrationNames.length > 0 &&
				((event.sdk = event.sdk || {}),
				(event.sdk.integrations = [
					...(event.sdk.integrations || []),
					...integrationNames,
				]));
		}
		function normalizeEvent(event, depth, maxBreadth) {
			if (!event) return null;
			let normalized = {
				...event,
				...(event.breadcrumbs && {
					breadcrumbs: event.breadcrumbs.map((b) => ({
						...b,
						...(b.data && {
							data: utils.normalize(b.data, depth, maxBreadth),
						}),
					})),
				}),
				...(event.user && {
					user: utils.normalize(event.user, depth, maxBreadth),
				}),
				...(event.contexts && {
					contexts: utils.normalize(event.contexts, depth, maxBreadth),
				}),
				...(event.extra && {
					extra: utils.normalize(event.extra, depth, maxBreadth),
				}),
			};
			return (
				event.contexts &&
					event.contexts.trace &&
					normalized.contexts &&
					((normalized.contexts.trace = event.contexts.trace),
					event.contexts.trace.data &&
						(normalized.contexts.trace.data = utils.normalize(
							event.contexts.trace.data,
							depth,
							maxBreadth,
						))),
				event.spans &&
					(normalized.spans = event.spans.map(
						(span) => (
							span.data &&
								(span.data = utils.normalize(span.data, depth, maxBreadth)),
							span
						),
					)),
				normalized
			);
		}
		exports.applyDebugIds = applyDebugIds;
		exports.applyDebugMeta = applyDebugMeta;
		exports.prepareEvent = prepareEvent;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/baseclient.js
var require_baseclient = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/baseclient.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			api = require_api(),
			envelope = require_envelope2(),
			integration = require_integration(),
			session = require_session(),
			dynamicSamplingContext = require_dynamicSamplingContext(),
			prepareEvent = require_prepareEvent(),
			ALREADY_SEEN_ERROR = "Not capturing exception because it's already been captured.",
			BaseClient = class {
				/** Options passed to the SDK. */
				/** The client Dsn, if specified in options. Without this Dsn, the SDK will be disabled. */
				/** Array of set up integrations. */
				/** Indicates whether this client's integrations have been set up. */
				/** Number of calls being processed */
				/** Holds flushable  */
				// eslint-disable-next-line @typescript-eslint/ban-types
				/**
				 * Initializes this client instance.
				 *
				 * @param options Options for the client.
				 */
				constructor(options) {
					if (
						((this._options = options),
						(this._integrations = {}),
						(this._integrationsInitialized = !1),
						(this._numProcessing = 0),
						(this._outcomes = {}),
						(this._hooks = {}),
						(this._eventProcessors = []),
						options.dsn
							? (this._dsn = utils.makeDsn(options.dsn))
							: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn("No DSN provided, client will not send events."),
						this._dsn)
					) {
						let url = api.getEnvelopeEndpointWithUrlEncodedAuth(this._dsn, options);
						this._transport = options.transport({
							recordDroppedEvent: this.recordDroppedEvent.bind(this),
							...options.transportOptions,
							url,
						});
					}
				}
				/**
				 * @inheritDoc
				 */
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
				captureException(exception, hint, scope) {
					if (utils.checkOrSetAlreadyCaught(exception)) {
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(ALREADY_SEEN_ERROR);
						return;
					}
					let eventId = hint && hint.event_id;
					return (
						this._process(
							this.eventFromException(exception, hint)
								.then((event) => this._captureEvent(event, hint, scope))
								.then((result) => {
									eventId = result;
								}),
						),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				captureMessage(message, level, hint, scope) {
					let eventId = hint && hint.event_id,
						promisedEvent = utils.isPrimitive(message)
							? this.eventFromMessage(String(message), level, hint)
							: this.eventFromException(message, hint);
					return (
						this._process(
							promisedEvent
								.then((event) => this._captureEvent(event, hint, scope))
								.then((result) => {
									eventId = result;
								}),
						),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				captureEvent(event, hint, scope) {
					if (
						hint &&
						hint.originalException &&
						utils.checkOrSetAlreadyCaught(hint.originalException)
					) {
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(ALREADY_SEEN_ERROR);
						return;
					}
					let eventId = hint && hint.event_id;
					return (
						this._process(
							this._captureEvent(event, hint, scope).then((result) => {
								eventId = result;
							}),
						),
						eventId
					);
				}
				/**
				 * @inheritDoc
				 */
				captureSession(session$1) {
					typeof session$1.release != "string"
						? (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn(
								"Discarded session because of missing or non-string release",
							)
						: (this.sendSession(session$1),
							session.updateSession(session$1, { init: !1 }));
				}
				/**
				 * @inheritDoc
				 */
				getDsn() {
					return this._dsn;
				}
				/**
				 * @inheritDoc
				 */
				getOptions() {
					return this._options;
				}
				/**
				 * @see SdkMetadata in @sentry/types
				 *
				 * @return The metadata of the SDK
				 */
				getSdkMetadata() {
					return this._options._metadata;
				}
				/**
				 * @inheritDoc
				 */
				getTransport() {
					return this._transport;
				}
				/**
				 * @inheritDoc
				 */
				flush(timeout) {
					let transport = this._transport;
					return transport
						? this._isClientDoneProcessing(timeout).then((clientFinished) =>
								transport
									.flush(timeout)
									.then((transportFlushed) => clientFinished && transportFlushed),
							)
						: utils.resolvedSyncPromise(!0);
				}
				/**
				 * @inheritDoc
				 */
				close(timeout) {
					return this.flush(timeout).then(
						(result) => ((this.getOptions().enabled = !1), result),
					);
				}
				/** Get all installed event processors. */
				getEventProcessors() {
					return this._eventProcessors;
				}
				/** @inheritDoc */
				addEventProcessor(eventProcessor) {
					this._eventProcessors.push(eventProcessor);
				}
				/**
				 * Sets up the integrations
				 */
				setupIntegrations(forceInitialize) {
					((forceInitialize && !this._integrationsInitialized) ||
						(this._isEnabled() && !this._integrationsInitialized)) &&
						((this._integrations = integration.setupIntegrations(
							this,
							this._options.integrations,
						)),
						(this._integrationsInitialized = !0));
				}
				/**
				 * Gets an installed integration by its `id`.
				 *
				 * @returns The installed integration or `undefined` if no integration with that `id` was installed.
				 */
				getIntegrationById(integrationId) {
					return this._integrations[integrationId];
				}
				/**
				 * @inheritDoc
				 */
				getIntegration(integration2) {
					try {
						return this._integrations[integration2.id] || null;
					} catch {
						return (
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn(
									`Cannot retrieve integration ${integration2.id} from the current Client`,
								),
							null
						);
					}
				}
				/**
				 * @inheritDoc
				 */
				addIntegration(integration$1) {
					integration.setupIntegration(this, integration$1, this._integrations);
				}
				/**
				 * @inheritDoc
				 */
				sendEvent(event, hint = {}) {
					this.emit("beforeSendEvent", event, hint);
					let env = envelope.createEventEnvelope(
						event,
						this._dsn,
						this._options._metadata,
						this._options.tunnel,
					);
					for (let attachment of hint.attachments || [])
						env = utils.addItemToEnvelope(
							env,
							utils.createAttachmentEnvelopeItem(
								attachment,
								this._options.transportOptions &&
									this._options.transportOptions.textEncoder,
							),
						);
					let promise = this._sendEnvelope(env);
					promise &&
						promise.then(
							(sendResponse) => this.emit("afterSendEvent", event, sendResponse),
							null,
						);
				}
				/**
				 * @inheritDoc
				 */
				sendSession(session2) {
					let env = envelope.createSessionEnvelope(
						session2,
						this._dsn,
						this._options._metadata,
						this._options.tunnel,
					);
					this._sendEnvelope(env);
				}
				/**
				 * @inheritDoc
				 */
				recordDroppedEvent(reason, category, _event) {
					if (this._options.sendClientReports) {
						let key = `${reason}:${category}`;
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.log(`Adding outcome: "${key}"`),
							(this._outcomes[key] = this._outcomes[key] + 1 || 1);
					}
				}
				// Keep on() & emit() signatures in sync with types' client.ts interface
				/* eslint-disable @typescript-eslint/unified-signatures */
				/** @inheritdoc */
				/** @inheritdoc */
				on(hook, callback) {
					this._hooks[hook] || (this._hooks[hook] = []), this._hooks[hook].push(callback);
				}
				/** @inheritdoc */
				/** @inheritdoc */
				emit(hook, ...rest) {
					this._hooks[hook] && this._hooks[hook].forEach((callback) => callback(...rest));
				}
				/* eslint-enable @typescript-eslint/unified-signatures */
				/** Updates existing session based on the provided event */
				_updateSessionFromEvent(session$1, event) {
					let crashed = !1,
						errored = !1,
						exceptions = event.exception && event.exception.values;
					if (exceptions) {
						errored = !0;
						for (let ex of exceptions) {
							let mechanism = ex.mechanism;
							if (mechanism && mechanism.handled === !1) {
								crashed = !0;
								break;
							}
						}
					}
					let sessionNonTerminal = session$1.status === "ok";
					((sessionNonTerminal && session$1.errors === 0) ||
						(sessionNonTerminal && crashed)) &&
						(session.updateSession(session$1, {
							...(crashed && { status: "crashed" }),
							errors: session$1.errors || Number(errored || crashed),
						}),
						this.captureSession(session$1));
				}
				/**
				 * Determine if the client is finished processing. Returns a promise because it will wait `timeout` ms before saying
				 * "no" (resolving to `false`) in order to give the client a chance to potentially finish first.
				 *
				 * @param timeout The time, in ms, after which to resolve to `false` if the client is still busy. Passing `0` (or not
				 * passing anything) will make the promise wait as long as it takes for processing to finish before resolving to
				 * `true`.
				 * @returns A promise which will resolve to `true` if processing is already done or finishes before the timeout, and
				 * `false` otherwise
				 */
				_isClientDoneProcessing(timeout) {
					return new utils.SyncPromise((resolve) => {
						let ticked = 0,
							tick = 1,
							interval = setInterval(() => {
								this._numProcessing == 0
									? (clearInterval(interval), resolve(!0))
									: ((ticked += tick),
										timeout &&
											ticked >= timeout &&
											(clearInterval(interval), resolve(!1)));
							}, tick);
					});
				}
				/** Determines whether this SDK is enabled and a transport is present. */
				_isEnabled() {
					return this.getOptions().enabled !== !1 && this._transport !== void 0;
				}
				/**
				 * Adds common information to events.
				 *
				 * The information includes release and environment from `options`,
				 * breadcrumbs and context (extra, tags and user) from the scope.
				 *
				 * Information that is already present in the event is never overwritten. For
				 * nested objects, such as the context, keys are merged.
				 *
				 * @param event The original event.
				 * @param hint May contain additional information about the original exception.
				 * @param scope A scope containing event metadata.
				 * @returns A new event with more information.
				 */
				_prepareEvent(event, hint, scope) {
					let options = this.getOptions(),
						integrations = Object.keys(this._integrations);
					return (
						!hint.integrations &&
							integrations.length > 0 &&
							(hint.integrations = integrations),
						this.emit("preprocessEvent", event, hint),
						prepareEvent.prepareEvent(options, event, hint, scope, this).then((evt) => {
							if (evt === null) return evt;
							let { propagationContext } = evt.sdkProcessingMetadata || {};
							if (!(evt.contexts && evt.contexts.trace) && propagationContext) {
								let {
									traceId: trace_id,
									spanId,
									parentSpanId,
									dsc,
								} = propagationContext;
								evt.contexts = {
									trace: {
										trace_id,
										span_id: spanId,
										parent_span_id: parentSpanId,
									},
									...evt.contexts,
								};
								let dynamicSamplingContext$1 =
									dsc ||
									dynamicSamplingContext.getDynamicSamplingContextFromClient(
										trace_id,
										this,
										scope,
									);
								evt.sdkProcessingMetadata = {
									dynamicSamplingContext: dynamicSamplingContext$1,
									...evt.sdkProcessingMetadata,
								};
							}
							return evt;
						})
					);
				}
				/**
				 * Processes the event and logs an error in case of rejection
				 * @param event
				 * @param hint
				 * @param scope
				 */
				_captureEvent(event, hint = {}, scope) {
					return this._processEvent(event, hint, scope).then(
						(finalEvent) => finalEvent.event_id,
						(reason) => {
							if (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) {
								let sentryError = reason;
								sentryError.logLevel === "log"
									? utils.logger.log(sentryError.message)
									: utils.logger.warn(sentryError);
							}
						},
					);
				}
				/**
				 * Processes an event (either error or message) and sends it to Sentry.
				 *
				 * This also adds breadcrumbs and context information to the event. However,
				 * platform specific meta data (such as the User's IP address) must be added
				 * by the SDK implementor.
				 *
				 *
				 * @param event The event to send to Sentry.
				 * @param hint May contain additional information about the original exception.
				 * @param scope A scope containing event metadata.
				 * @returns A SyncPromise that resolves with the event or rejects in case event was/will not be send.
				 */
				_processEvent(event, hint, scope) {
					let options = this.getOptions(),
						{ sampleRate } = options,
						isTransaction = isTransactionEvent(event),
						isError = isErrorEvent(event),
						eventType = event.type || "error",
						beforeSendLabel = `before send for type \`${eventType}\``;
					if (isError && typeof sampleRate == "number" && Math.random() > sampleRate)
						return (
							this.recordDroppedEvent("sample_rate", "error", event),
							utils.rejectedSyncPromise(
								new utils.SentryError(
									`Discarding event because it's not included in the random sample (sampling rate = ${sampleRate})`,
									"log",
								),
							)
						);
					let dataCategory = eventType === "replay_event" ? "replay" : eventType;
					return this._prepareEvent(event, hint, scope)
						.then((prepared) => {
							if (prepared === null)
								throw (
									(this.recordDroppedEvent(
										"event_processor",
										dataCategory,
										event,
									),
									new utils.SentryError(
										"An event processor returned `null`, will not send event.",
										"log",
									))
								);
							if (hint.data && hint.data.__sentry__ === !0) return prepared;
							let result = processBeforeSend(options, prepared, hint);
							return _validateBeforeSendResult(result, beforeSendLabel);
						})
						.then((processedEvent) => {
							if (processedEvent === null)
								throw (
									(this.recordDroppedEvent("before_send", dataCategory, event),
									new utils.SentryError(
										`${beforeSendLabel} returned \`null\`, will not send event.`,
										"log",
									))
								);
							let session2 = scope && scope.getSession();
							!isTransaction &&
								session2 &&
								this._updateSessionFromEvent(session2, processedEvent);
							let transactionInfo = processedEvent.transaction_info;
							if (
								isTransaction &&
								transactionInfo &&
								processedEvent.transaction !== event.transaction
							) {
								let source = "custom";
								processedEvent.transaction_info = {
									...transactionInfo,
									source,
								};
							}
							return this.sendEvent(processedEvent, hint), processedEvent;
						})
						.then(null, (reason) => {
							throw reason instanceof utils.SentryError
								? reason
								: (this.captureException(reason, {
										data: {
											__sentry__: !0,
										},
										originalException: reason,
									}),
									new utils.SentryError(
										`Event processing pipeline threw an error, original event will not be sent. Details have been sent as a new event.
Reason: ${reason}`,
									));
						});
				}
				/**
				 * Occupies the client with processing and event
				 */
				_process(promise) {
					this._numProcessing++,
						promise.then(
							(value) => (this._numProcessing--, value),
							(reason) => (this._numProcessing--, reason),
						);
				}
				/**
				 * @inheritdoc
				 */
				_sendEnvelope(envelope2) {
					if (
						(this.emit("beforeEnvelope", envelope2),
						this._isEnabled() && this._transport)
					)
						return this._transport.send(envelope2).then(null, (reason) => {
							(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.error("Error while sending event:", reason);
						});
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.error("Transport disabled");
				}
				/**
				 * Clears outcomes on this client and returns them.
				 */
				_clearOutcomes() {
					let outcomes = this._outcomes;
					return (
						(this._outcomes = {}),
						Object.keys(outcomes).map((key) => {
							let [reason, category] = key.split(":");
							return {
								reason,
								category,
								quantity: outcomes[key],
							};
						})
					);
				}
				/**
				 * @inheritDoc
				 */
				// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
			};
		function _validateBeforeSendResult(beforeSendResult, beforeSendLabel) {
			let invalidValueError = `${beforeSendLabel} must return \`null\` or a valid event.`;
			if (utils.isThenable(beforeSendResult))
				return beforeSendResult.then(
					(event) => {
						if (!utils.isPlainObject(event) && event !== null)
							throw new utils.SentryError(invalidValueError);
						return event;
					},
					(e) => {
						throw new utils.SentryError(`${beforeSendLabel} rejected with ${e}`);
					},
				);
			if (!utils.isPlainObject(beforeSendResult) && beforeSendResult !== null)
				throw new utils.SentryError(invalidValueError);
			return beforeSendResult;
		}
		function processBeforeSend(options, event, hint) {
			let { beforeSend, beforeSendTransaction } = options;
			return isErrorEvent(event) && beforeSend
				? beforeSend(event, hint)
				: isTransactionEvent(event) && beforeSendTransaction
					? beforeSendTransaction(event, hint)
					: event;
		}
		function isErrorEvent(event) {
			return event.type === void 0;
		}
		function isTransactionEvent(event) {
			return event.type === "transaction";
		}
		exports.BaseClient = BaseClient;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/checkin.js
var require_checkin = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/checkin.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs();
		function createCheckInEnvelope(checkIn, dynamicSamplingContext, metadata, tunnel, dsn) {
			let headers = {
				sent_at: /* @__PURE__ */ new Date().toISOString(),
			};
			metadata &&
				metadata.sdk &&
				(headers.sdk = {
					name: metadata.sdk.name,
					version: metadata.sdk.version,
				}),
				tunnel && dsn && (headers.dsn = utils.dsnToString(dsn)),
				dynamicSamplingContext &&
					(headers.trace = utils.dropUndefinedKeys(dynamicSamplingContext));
			let item = createCheckInEnvelopeItem(checkIn);
			return utils.createEnvelope(headers, [item]);
		}
		function createCheckInEnvelopeItem(checkIn) {
			return [
				{
					type: "check_in",
				},
				checkIn,
			];
		}
		exports.createCheckInEnvelope = createCheckInEnvelope;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/server-runtime-client.js
var require_server_runtime_client = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/server-runtime-client.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			baseclient = require_baseclient(),
			checkin = require_checkin(),
			hub = require_hub(),
			sessionflusher = require_sessionflusher(),
			hubextensions = require_hubextensions(),
			dynamicSamplingContext = require_dynamicSamplingContext();
		require_spanstatus();
		var ServerRuntimeClient = class extends baseclient.BaseClient {
			/**
			 * Creates a new Edge SDK instance.
			 * @param options Configuration options for this SDK.
			 */
			constructor(options) {
				hubextensions.addTracingExtensions(), super(options);
			}
			/**
			 * @inheritDoc
			 */
			eventFromException(exception, hint) {
				return utils.resolvedSyncPromise(
					utils.eventFromUnknownInput(
						hub.getCurrentHub,
						this._options.stackParser,
						exception,
						hint,
					),
				);
			}
			/**
			 * @inheritDoc
			 */
			eventFromMessage(message, level = "info", hint) {
				return utils.resolvedSyncPromise(
					utils.eventFromMessage(
						this._options.stackParser,
						message,
						level,
						hint,
						this._options.attachStacktrace,
					),
				);
			}
			/**
			 * @inheritDoc
			 */
			// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
			captureException(exception, hint, scope) {
				if (this._options.autoSessionTracking && this._sessionFlusher && scope) {
					let requestSession = scope.getRequestSession();
					requestSession &&
						requestSession.status === "ok" &&
						(requestSession.status = "errored");
				}
				return super.captureException(exception, hint, scope);
			}
			/**
			 * @inheritDoc
			 */
			captureEvent(event, hint, scope) {
				if (
					this._options.autoSessionTracking &&
					this._sessionFlusher &&
					scope &&
					(event.type || "exception") === "exception" &&
					event.exception &&
					event.exception.values &&
					event.exception.values.length > 0
				) {
					let requestSession = scope.getRequestSession();
					requestSession &&
						requestSession.status === "ok" &&
						(requestSession.status = "errored");
				}
				return super.captureEvent(event, hint, scope);
			}
			/**
			 *
			 * @inheritdoc
			 */
			close(timeout) {
				return this._sessionFlusher && this._sessionFlusher.close(), super.close(timeout);
			}
			/** Method that initialises an instance of SessionFlusher on Client */
			initSessionFlusher() {
				let { release, environment } = this._options;
				release
					? (this._sessionFlusher = new sessionflusher.SessionFlusher(this, {
							release,
							environment,
						}))
					: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(
							"Cannot initialise an instance of SessionFlusher if no release is provided!",
						);
			}
			/**
			 * Create a cron monitor check in and send it to Sentry.
			 *
			 * @param checkIn An object that describes a check in.
			 * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
			 * to create a monitor automatically when sending a check in.
			 */
			captureCheckIn(checkIn, monitorConfig, scope) {
				let id =
					checkIn.status !== "in_progress" && checkIn.checkInId
						? checkIn.checkInId
						: utils.uuid4();
				if (!this._isEnabled())
					return (
						(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn("SDK not enabled, will not capture checkin."),
						id
					);
				let options = this.getOptions(),
					{ release, environment, tunnel } = options,
					serializedCheckIn = {
						check_in_id: id,
						monitor_slug: checkIn.monitorSlug,
						status: checkIn.status,
						release,
						environment,
					};
				checkIn.status !== "in_progress" && (serializedCheckIn.duration = checkIn.duration),
					monitorConfig &&
						(serializedCheckIn.monitor_config = {
							schedule: monitorConfig.schedule,
							checkin_margin: monitorConfig.checkinMargin,
							max_runtime: monitorConfig.maxRuntime,
							timezone: monitorConfig.timezone,
						});
				let [dynamicSamplingContext2, traceContext] = this._getTraceInfoFromScope(scope);
				traceContext &&
					(serializedCheckIn.contexts = {
						trace: traceContext,
					});
				let envelope = checkin.createCheckInEnvelope(
					serializedCheckIn,
					dynamicSamplingContext2,
					this.getSdkMetadata(),
					tunnel,
					this.getDsn(),
				);
				return (
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.info("Sending checkin:", checkIn.monitorSlug, checkIn.status),
					this._sendEnvelope(envelope),
					id
				);
			}
			/**
			 * Method responsible for capturing/ending a request session by calling `incrementSessionStatusCount` to increment
			 * appropriate session aggregates bucket
			 */
			_captureRequestSession() {
				this._sessionFlusher
					? this._sessionFlusher.incrementSessionStatusCount()
					: (typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(
							"Discarded request mode session because autoSessionTracking option was disabled",
						);
			}
			/**
			 * @inheritDoc
			 */
			_prepareEvent(event, hint, scope) {
				return (
					this._options.platform &&
						(event.platform = event.platform || this._options.platform),
					this._options.runtime &&
						(event.contexts = {
							...event.contexts,
							runtime: (event.contexts || {}).runtime || this._options.runtime,
						}),
					this._options.serverName &&
						(event.server_name = event.server_name || this._options.serverName),
					super._prepareEvent(event, hint, scope)
				);
			}
			/** Extract trace information from scope */
			_getTraceInfoFromScope(scope) {
				if (!scope) return [void 0, void 0];
				let span = scope.getSpan();
				if (span)
					return [
						span.transaction ? span.transaction.getDynamicSamplingContext() : void 0,
						span.getTraceContext(),
					];
				let { traceId, spanId, parentSpanId, dsc } = scope.getPropagationContext(),
					traceContext = {
						trace_id: traceId,
						span_id: spanId,
						parent_span_id: parentSpanId,
					};
				return dsc
					? [dsc, traceContext]
					: [
							dynamicSamplingContext.getDynamicSamplingContextFromClient(
								traceId,
								this,
								scope,
							),
							traceContext,
						];
			}
		};
		exports.ServerRuntimeClient = ServerRuntimeClient;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/sdk.js
var require_sdk = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/sdk.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			hub = require_hub();
		function initAndBind(clientClass, options) {
			options.debug === !0 &&
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__
					? utils.logger.enable()
					: console.warn(
							"[Sentry] Cannot initialize SDK with `debug` option using a non-debug bundle.",
						));
			let hub$1 = hub.getCurrentHub();
			hub$1.getScope().update(options.initialScope);
			let client = new clientClass(options);
			hub$1.bindClient(client);
		}
		exports.initAndBind = initAndBind;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/base.js
var require_base = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/base.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			DEFAULT_TRANSPORT_BUFFER_SIZE = 30;
		function createTransport(
			options,
			makeRequest,
			buffer = utils.makePromiseBuffer(options.bufferSize || DEFAULT_TRANSPORT_BUFFER_SIZE),
		) {
			let rateLimits = {},
				flush = (timeout) => buffer.drain(timeout);
			function send(envelope) {
				let filteredEnvelopeItems = [];
				if (
					(utils.forEachEnvelopeItem(envelope, (item, type) => {
						let envelopeItemDataCategory = utils.envelopeItemTypeToDataCategory(type);
						if (utils.isRateLimited(rateLimits, envelopeItemDataCategory)) {
							let event = getEventForEnvelopeItem(item, type);
							options.recordDroppedEvent(
								"ratelimit_backoff",
								envelopeItemDataCategory,
								event,
							);
						} else filteredEnvelopeItems.push(item);
					}),
					filteredEnvelopeItems.length === 0)
				)
					return utils.resolvedSyncPromise();
				let filteredEnvelope = utils.createEnvelope(envelope[0], filteredEnvelopeItems),
					recordEnvelopeLoss = (reason) => {
						utils.forEachEnvelopeItem(filteredEnvelope, (item, type) => {
							let event = getEventForEnvelopeItem(item, type);
							options.recordDroppedEvent(
								reason,
								utils.envelopeItemTypeToDataCategory(type),
								event,
							);
						});
					},
					requestTask = () =>
						makeRequest({
							body: utils.serializeEnvelope(filteredEnvelope, options.textEncoder),
						}).then(
							(response) => (
								response.statusCode !== void 0 &&
									(response.statusCode < 200 || response.statusCode >= 300) &&
									(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.warn(
										`Sentry responded with status code ${response.statusCode} to sent event.`,
									),
								(rateLimits = utils.updateRateLimits(rateLimits, response)),
								response
							),
							(error) => {
								throw (recordEnvelopeLoss("network_error"), error);
							},
						);
				return buffer.add(requestTask).then(
					(result) => result,
					(error) => {
						if (error instanceof utils.SentryError)
							return (
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.error(
										"Skipped sending event because buffer is full.",
									),
								recordEnvelopeLoss("queue_overflow"),
								utils.resolvedSyncPromise()
							);
						throw error;
					},
				);
			}
			return (
				(send.__sentry__baseTransport__ = !0),
				{
					send,
					flush,
				}
			);
		}
		function getEventForEnvelopeItem(item, type) {
			if (!(type !== "event" && type !== "transaction"))
				return Array.isArray(item) ? item[1] : void 0;
		}
		exports.DEFAULT_TRANSPORT_BUFFER_SIZE = DEFAULT_TRANSPORT_BUFFER_SIZE;
		exports.createTransport = createTransport;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/offline.js
var require_offline2 = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/offline.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			MIN_DELAY = 100,
			START_DELAY = 5e3,
			MAX_DELAY = 36e5;
		function log(msg, error) {
			(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
				utils.logger.info(`[Offline]: ${msg}`, error);
		}
		function makeOfflineTransport(createTransport) {
			return (options) => {
				let transport = createTransport(options),
					store = options.createStore ? options.createStore(options) : void 0,
					retryDelay = START_DELAY,
					flushTimer;
				function shouldQueue(env, error, retryDelay2) {
					return utils.envelopeContainsItemType(env, [
						"replay_event",
						"replay_recording",
						"client_report",
					])
						? !1
						: options.shouldStore
							? options.shouldStore(env, error, retryDelay2)
							: !0;
				}
				function flushIn(delay) {
					store &&
						(flushTimer && clearTimeout(flushTimer),
						(flushTimer = setTimeout(async () => {
							flushTimer = void 0;
							let found = await store.pop();
							found &&
								(log("Attempting to send previously queued event"),
								send(found).catch((e) => {
									log("Failed to retry sending", e);
								}));
						}, delay)),
						typeof flushTimer != "number" && flushTimer.unref && flushTimer.unref());
				}
				function flushWithBackOff() {
					flushTimer ||
						(flushIn(retryDelay), (retryDelay = Math.min(retryDelay * 2, MAX_DELAY)));
				}
				async function send(envelope) {
					try {
						let result = await transport.send(envelope),
							delay = MIN_DELAY;
						if (result) {
							if (result.headers && result.headers["retry-after"])
								delay = utils.parseRetryAfterHeader(result.headers["retry-after"]);
							else if ((result.statusCode || 0) >= 400) return result;
						}
						return flushIn(delay), (retryDelay = START_DELAY), result;
					} catch (e) {
						if (store && (await shouldQueue(envelope, e, retryDelay)))
							return (
								await store.insert(envelope),
								flushWithBackOff(),
								log("Error sending. Event queued", e),
								{}
							);
						throw e;
					}
				}
				return (
					options.flushAtStartup && flushWithBackOff(),
					{
						send,
						flush: (t) => transport.flush(t),
					}
				);
			};
		}
		exports.MIN_DELAY = MIN_DELAY;
		exports.START_DELAY = START_DELAY;
		exports.makeOfflineTransport = makeOfflineTransport;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/multiplexed.js
var require_multiplexed = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/transports/multiplexed.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			api = require_api();
		function eventFromEnvelope(env, types) {
			let event;
			return (
				utils.forEachEnvelopeItem(
					env,
					(item, type) => (
						types.includes(type) && (event = Array.isArray(item) ? item[1] : void 0),
						!!event
					),
				),
				event
			);
		}
		function makeOverrideReleaseTransport(createTransport, release) {
			return (options) => {
				let transport = createTransport(options);
				return {
					send: async (envelope) => {
						let event = eventFromEnvelope(envelope, [
							"event",
							"transaction",
							"profile",
							"replay_event",
						]);
						return event && (event.release = release), transport.send(envelope);
					},
					flush: (timeout) => transport.flush(timeout),
				};
			};
		}
		function makeMultiplexedTransport(createTransport, matcher) {
			return (options) => {
				let fallbackTransport = createTransport(options),
					otherTransports = {};
				function getTransport(dsn, release) {
					let key = release ? `${dsn}:${release}` : dsn;
					if (!otherTransports[key]) {
						let validatedDsn = utils.dsnFromString(dsn);
						if (!validatedDsn) return;
						let url = api.getEnvelopeEndpointWithUrlEncodedAuth(validatedDsn);
						otherTransports[key] = release
							? makeOverrideReleaseTransport(
									createTransport,
									release,
								)({ ...options, url })
							: createTransport({ ...options, url });
					}
					return otherTransports[key];
				}
				async function send(envelope) {
					function getEvent(types) {
						let eventTypes = types && types.length ? types : ["event"];
						return eventFromEnvelope(envelope, eventTypes);
					}
					let transports = matcher({ envelope, getEvent })
						.map((result) =>
							typeof result == "string"
								? getTransport(result, void 0)
								: getTransport(result.dsn, result.release),
						)
						.filter((t) => !!t);
					return (
						transports.length === 0 && transports.push(fallbackTransport),
						(
							await Promise.all(
								transports.map((transport) => transport.send(envelope)),
							)
						)[0]
					);
				}
				async function flush(timeout) {
					let allTransports = [
						...Object.keys(otherTransports).map((dsn) => otherTransports[dsn]),
						fallbackTransport,
					];
					return (
						await Promise.all(
							allTransports.map((transport) => transport.flush(timeout)),
						)
					).every((r) => r);
				}
				return {
					send,
					flush,
				};
			};
		}
		exports.eventFromEnvelope = eventFromEnvelope;
		exports.makeMultiplexedTransport = makeMultiplexedTransport;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/version.js
var require_version = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/version.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var SDK_VERSION = "7.76.0";
		exports.SDK_VERSION = SDK_VERSION;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/functiontostring.js
var require_functiontostring = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/functiontostring.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			originalFunctionToString,
			FunctionToString = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "FunctionToString";
				}
				/**
				 * @inheritDoc
				 */
				constructor() {
					this.name = FunctionToString.id;
				}
				/**
				 * @inheritDoc
				 */
				setupOnce() {
					originalFunctionToString = Function.prototype.toString;
					try {
						Function.prototype.toString = function (...args) {
							let context = utils.getOriginalFunction(this) || this;
							return originalFunctionToString.apply(context, args);
						};
					} catch {}
				}
			};
		FunctionToString.__initStatic();
		exports.FunctionToString = FunctionToString;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/inboundfilters.js
var require_inboundfilters = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/inboundfilters.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			DEFAULT_IGNORE_ERRORS = [
				/^Script error\.?$/,
				/^Javascript error: Script error\.? on line 0$/,
			],
			DEFAULT_IGNORE_TRANSACTIONS = [
				/^.*\/healthcheck$/,
				/^.*\/healthy$/,
				/^.*\/live$/,
				/^.*\/ready$/,
				/^.*\/heartbeat$/,
				/^.*\/health$/,
				/^.*\/healthz$/,
			],
			InboundFilters = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "InboundFilters";
				}
				/**
				 * @inheritDoc
				 */
				constructor(options = {}) {
					(this.name = InboundFilters.id), (this._options = options);
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
				/** @inheritDoc */
				processEvent(event, _eventHint, client) {
					let clientOptions = client.getOptions(),
						options = _mergeOptions(this._options, clientOptions);
					return _shouldDropEvent(event, options) ? null : event;
				}
			};
		InboundFilters.__initStatic();
		function _mergeOptions(internalOptions = {}, clientOptions = {}) {
			return {
				allowUrls: [
					...(internalOptions.allowUrls || []),
					...(clientOptions.allowUrls || []),
				],
				denyUrls: [...(internalOptions.denyUrls || []), ...(clientOptions.denyUrls || [])],
				ignoreErrors: [
					...(internalOptions.ignoreErrors || []),
					...(clientOptions.ignoreErrors || []),
					...(internalOptions.disableErrorDefaults ? [] : DEFAULT_IGNORE_ERRORS),
				],
				ignoreTransactions: [
					...(internalOptions.ignoreTransactions || []),
					...(clientOptions.ignoreTransactions || []),
					...(internalOptions.disableTransactionDefaults
						? []
						: DEFAULT_IGNORE_TRANSACTIONS),
				],
				ignoreInternal:
					internalOptions.ignoreInternal !== void 0 ? internalOptions.ignoreInternal : !0,
			};
		}
		function _shouldDropEvent(event, options) {
			return options.ignoreInternal && _isSentryError(event)
				? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.warn(`Event dropped due to being internal Sentry Error.
Event: ${utils.getEventDescription(event)}`),
					!0)
				: _isIgnoredError(event, options.ignoreErrors)
					? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
							utils.logger.warn(
								`Event dropped due to being matched by \`ignoreErrors\` option.
Event: ${utils.getEventDescription(event)}`,
							),
						!0)
					: _isIgnoredTransaction(event, options.ignoreTransactions)
						? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
								utils.logger.warn(
									`Event dropped due to being matched by \`ignoreTransactions\` option.
Event: ${utils.getEventDescription(event)}`,
								),
							!0)
						: _isDeniedUrl(event, options.denyUrls)
							? ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.warn(
										`Event dropped due to being matched by \`denyUrls\` option.
Event: ${utils.getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`,
									),
								!0)
							: _isAllowedUrl(event, options.allowUrls)
								? !1
								: ((typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.warn(
											`Event dropped due to not being matched by \`allowUrls\` option.
Event: ${utils.getEventDescription(event)}.
Url: ${_getEventFilterUrl(event)}`,
										),
									!0);
		}
		function _isIgnoredError(event, ignoreErrors) {
			return event.type || !ignoreErrors || !ignoreErrors.length
				? !1
				: _getPossibleEventMessages(event).some((message) =>
						utils.stringMatchesSomePattern(message, ignoreErrors),
					);
		}
		function _isIgnoredTransaction(event, ignoreTransactions) {
			if (event.type !== "transaction" || !ignoreTransactions || !ignoreTransactions.length)
				return !1;
			let name = event.transaction;
			return name ? utils.stringMatchesSomePattern(name, ignoreTransactions) : !1;
		}
		function _isDeniedUrl(event, denyUrls) {
			if (!denyUrls || !denyUrls.length) return !1;
			let url = _getEventFilterUrl(event);
			return url ? utils.stringMatchesSomePattern(url, denyUrls) : !1;
		}
		function _isAllowedUrl(event, allowUrls) {
			if (!allowUrls || !allowUrls.length) return !0;
			let url = _getEventFilterUrl(event);
			return url ? utils.stringMatchesSomePattern(url, allowUrls) : !0;
		}
		function _getPossibleEventMessages(event) {
			let possibleMessages = [];
			event.message && possibleMessages.push(event.message);
			let lastException;
			try {
				lastException = event.exception.values[event.exception.values.length - 1];
			} catch {}
			return (
				lastException &&
					lastException.value &&
					(possibleMessages.push(lastException.value),
					lastException.type &&
						possibleMessages.push(`${lastException.type}: ${lastException.value}`)),
				(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
					possibleMessages.length === 0 &&
					utils.logger.error(
						`Could not extract message for event ${utils.getEventDescription(event)}`,
					),
				possibleMessages
			);
		}
		function _isSentryError(event) {
			try {
				return event.exception.values[0].type === "SentryError";
			} catch {}
			return !1;
		}
		function _getLastValidUrl(frames = []) {
			for (let i = frames.length - 1; i >= 0; i--) {
				let frame = frames[i];
				if (frame && frame.filename !== "<anonymous>" && frame.filename !== "[native code]")
					return frame.filename || null;
			}
			return null;
		}
		function _getEventFilterUrl(event) {
			try {
				let frames;
				try {
					frames = event.exception.values[0].stacktrace.frames;
				} catch {}
				return frames ? _getLastValidUrl(frames) : null;
			} catch {
				return (
					(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
						utils.logger.error(
							`Cannot extract url for event ${utils.getEventDescription(event)}`,
						),
					null
				);
			}
		}
		exports.InboundFilters = InboundFilters;
		exports._mergeOptions = _mergeOptions;
		exports._shouldDropEvent = _shouldDropEvent;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/index.js
var require_integrations = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/index.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var functiontostring = require_functiontostring(),
			inboundfilters = require_inboundfilters();
		exports.FunctionToString = functiontostring.FunctionToString;
		exports.InboundFilters = inboundfilters.InboundFilters;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/isSentryRequestUrl.js
var require_isSentryRequestUrl = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/utils/isSentryRequestUrl.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		function isSentryRequestUrl(url, hub) {
			let client = hub.getClient(),
				dsn = client && client.getDsn(),
				tunnel = client && client.getOptions().tunnel;
			return checkDsn(url, dsn) || checkTunnel(url, tunnel);
		}
		function checkTunnel(url, tunnel) {
			return tunnel ? removeTrailingSlash(url) === removeTrailingSlash(tunnel) : !1;
		}
		function checkDsn(url, dsn) {
			return dsn ? url.includes(dsn.host) : !1;
		}
		function removeTrailingSlash(str) {
			return str[str.length - 1] === "/" ? str.slice(0, -1) : str;
		}
		exports.isSentryRequestUrl = isSentryRequestUrl;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/metadata.js
var require_metadata = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/metadata.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			filenameMetadataMap = /* @__PURE__ */ new Map(),
			parsedStacks = /* @__PURE__ */ new Set();
		function ensureMetadataStacksAreParsed(parser) {
			if (utils.GLOBAL_OBJ._sentryModuleMetadata)
				for (let stack of Object.keys(utils.GLOBAL_OBJ._sentryModuleMetadata)) {
					let metadata = utils.GLOBAL_OBJ._sentryModuleMetadata[stack];
					if (parsedStacks.has(stack)) continue;
					parsedStacks.add(stack);
					let frames = parser(stack);
					for (let frame of frames.reverse())
						if (frame.filename) {
							filenameMetadataMap.set(frame.filename, metadata);
							break;
						}
				}
		}
		function getMetadataForUrl(parser, filename) {
			return ensureMetadataStacksAreParsed(parser), filenameMetadataMap.get(filename);
		}
		function addMetadataToStackFrames(parser, event) {
			try {
				event.exception.values.forEach((exception) => {
					if (exception.stacktrace)
						for (let frame of exception.stacktrace.frames || []) {
							if (!frame.filename) continue;
							let metadata = getMetadataForUrl(parser, frame.filename);
							metadata && (frame.module_metadata = metadata);
						}
				});
			} catch {}
		}
		function stripMetadataFromStackFrames(event) {
			try {
				event.exception.values.forEach((exception) => {
					if (exception.stacktrace)
						for (let frame of exception.stacktrace.frames || [])
							delete frame.module_metadata;
				});
			} catch {}
		}
		exports.addMetadataToStackFrames = addMetadataToStackFrames;
		exports.getMetadataForUrl = getMetadataForUrl;
		exports.stripMetadataFromStackFrames = stripMetadataFromStackFrames;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/metadata.js
var require_metadata2 = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/integrations/metadata.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			metadata = require_metadata(),
			ModuleMetadata = class {
				/*
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "ModuleMetadata";
				}
				/**
				 * @inheritDoc
				 */
				constructor() {
					this.name = ModuleMetadata.id;
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(addGlobalEventProcessor, getCurrentHub) {
					let client = getCurrentHub().getClient();
					if (!client || typeof client.on != "function") return;
					client.on("beforeEnvelope", (envelope) => {
						utils.forEachEnvelopeItem(envelope, (item, type) => {
							if (type === "event") {
								let event = Array.isArray(item) ? item[1] : void 0;
								event &&
									(metadata.stripMetadataFromStackFrames(event),
									(item[1] = event));
							}
						});
					});
					let stackParser = client.getOptions().stackParser;
					addGlobalEventProcessor(
						(event) => (metadata.addMetadataToStackFrames(stackParser, event), event),
					);
				}
			};
		ModuleMetadata.__initStatic();
		exports.ModuleMetadata = ModuleMetadata;
	},
});

// ../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/index.js
var require_cjs2 = __commonJS({
	"../../node_modules/.pnpm/@sentry+core@7.76.0/node_modules/@sentry/core/cjs/index.js"(exports) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var hubextensions = require_hubextensions(),
			idletransaction = require_idletransaction(),
			span = require_span(),
			transaction = require_transaction2(),
			utils$1 = require_utils(),
			spanstatus = require_spanstatus(),
			trace = require_trace(),
			dynamicSamplingContext = require_dynamicSamplingContext(),
			measurement = require_measurement(),
			exports$1 = require_exports(),
			hub = require_hub(),
			session = require_session(),
			sessionflusher = require_sessionflusher(),
			scope = require_scope(),
			eventProcessors = require_eventProcessors(),
			api = require_api(),
			baseclient = require_baseclient(),
			serverRuntimeClient = require_server_runtime_client(),
			sdk = require_sdk(),
			base = require_base(),
			offline = require_offline2(),
			multiplexed = require_multiplexed(),
			version = require_version(),
			integration = require_integration(),
			index = require_integrations(),
			prepareEvent = require_prepareEvent(),
			checkin = require_checkin(),
			hasTracingEnabled = require_hasTracingEnabled(),
			isSentryRequestUrl = require_isSentryRequestUrl(),
			constants = require_constants(),
			metadata = require_metadata2(),
			functiontostring = require_functiontostring(),
			inboundfilters = require_inboundfilters(),
			utils = require_cjs();
		exports.addTracingExtensions = hubextensions.addTracingExtensions;
		exports.startIdleTransaction = hubextensions.startIdleTransaction;
		exports.IdleTransaction = idletransaction.IdleTransaction;
		exports.TRACING_DEFAULTS = idletransaction.TRACING_DEFAULTS;
		exports.Span = span.Span;
		exports.spanStatusfromHttpCode = span.spanStatusfromHttpCode;
		exports.Transaction = transaction.Transaction;
		exports.getActiveTransaction = utils$1.getActiveTransaction;
		Object.defineProperty(exports, "SpanStatus", {
			enumerable: !0,
			get: () => spanstatus.SpanStatus,
		});
		exports.continueTrace = trace.continueTrace;
		exports.getActiveSpan = trace.getActiveSpan;
		exports.startActiveSpan = trace.startActiveSpan;
		exports.startInactiveSpan = trace.startInactiveSpan;
		exports.startSpan = trace.startSpan;
		exports.startSpanManual = trace.startSpanManual;
		exports.trace = trace.trace;
		exports.getDynamicSamplingContextFromClient =
			dynamicSamplingContext.getDynamicSamplingContextFromClient;
		exports.setMeasurement = measurement.setMeasurement;
		exports.addBreadcrumb = exports$1.addBreadcrumb;
		exports.captureCheckIn = exports$1.captureCheckIn;
		exports.captureEvent = exports$1.captureEvent;
		exports.captureException = exports$1.captureException;
		exports.captureMessage = exports$1.captureMessage;
		exports.close = exports$1.close;
		exports.configureScope = exports$1.configureScope;
		exports.flush = exports$1.flush;
		exports.lastEventId = exports$1.lastEventId;
		exports.setContext = exports$1.setContext;
		exports.setExtra = exports$1.setExtra;
		exports.setExtras = exports$1.setExtras;
		exports.setTag = exports$1.setTag;
		exports.setTags = exports$1.setTags;
		exports.setUser = exports$1.setUser;
		exports.startTransaction = exports$1.startTransaction;
		exports.withMonitor = exports$1.withMonitor;
		exports.withScope = exports$1.withScope;
		exports.Hub = hub.Hub;
		exports.ensureHubOnCarrier = hub.ensureHubOnCarrier;
		exports.getCurrentHub = hub.getCurrentHub;
		exports.getHubFromCarrier = hub.getHubFromCarrier;
		exports.getMainCarrier = hub.getMainCarrier;
		exports.makeMain = hub.makeMain;
		exports.runWithAsyncContext = hub.runWithAsyncContext;
		exports.setAsyncContextStrategy = hub.setAsyncContextStrategy;
		exports.setHubOnCarrier = hub.setHubOnCarrier;
		exports.closeSession = session.closeSession;
		exports.makeSession = session.makeSession;
		exports.updateSession = session.updateSession;
		exports.SessionFlusher = sessionflusher.SessionFlusher;
		exports.Scope = scope.Scope;
		exports.addGlobalEventProcessor = eventProcessors.addGlobalEventProcessor;
		exports.getEnvelopeEndpointWithUrlEncodedAuth = api.getEnvelopeEndpointWithUrlEncodedAuth;
		exports.getReportDialogEndpoint = api.getReportDialogEndpoint;
		exports.BaseClient = baseclient.BaseClient;
		exports.ServerRuntimeClient = serverRuntimeClient.ServerRuntimeClient;
		exports.initAndBind = sdk.initAndBind;
		exports.createTransport = base.createTransport;
		exports.makeOfflineTransport = offline.makeOfflineTransport;
		exports.makeMultiplexedTransport = multiplexed.makeMultiplexedTransport;
		exports.SDK_VERSION = version.SDK_VERSION;
		exports.addIntegration = integration.addIntegration;
		exports.getIntegrationsToSetup = integration.getIntegrationsToSetup;
		exports.Integrations = index;
		exports.prepareEvent = prepareEvent.prepareEvent;
		exports.createCheckInEnvelope = checkin.createCheckInEnvelope;
		exports.hasTracingEnabled = hasTracingEnabled.hasTracingEnabled;
		exports.isSentryRequestUrl = isSentryRequestUrl.isSentryRequestUrl;
		exports.DEFAULT_ENVIRONMENT = constants.DEFAULT_ENVIRONMENT;
		exports.ModuleMetadata = metadata.ModuleMetadata;
		exports.FunctionToString = functiontostring.FunctionToString;
		exports.InboundFilters = inboundfilters.InboundFilters;
		exports.extractTraceparentData = utils.extractTraceparentData;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/httpclient.js
var require_httpclient = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/httpclient.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var core = require_cjs2(),
			utils = require_cjs(),
			HttpClient = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "HttpClient";
				}
				/**
				 * @inheritDoc
				 */
				/**
				 * Returns current hub.
				 */
				/**
				 * @inheritDoc
				 *
				 * @param options
				 */
				constructor(options) {
					(this.name = HttpClient.id),
						(this._options = {
							failedRequestStatusCodes: [[500, 599]],
							failedRequestTargets: [/.*/],
							...options,
						});
				}
				/**
				 * @inheritDoc
				 *
				 * @param options
				 */
				setupOnce(_, getCurrentHub) {
					(this._getCurrentHub = getCurrentHub), this._wrapFetch(), this._wrapXHR();
				}
				/**
				 * Interceptor function for fetch requests
				 *
				 * @param requestInfo The Fetch API request info
				 * @param response The Fetch API response
				 * @param requestInit The request init object
				 */
				_fetchResponseHandler(requestInfo, response, requestInit) {
					if (
						this._getCurrentHub &&
						this._shouldCaptureResponse(response.status, response.url)
					) {
						let request = _getRequest(requestInfo, requestInit),
							hub = this._getCurrentHub(),
							requestHeaders,
							responseHeaders,
							requestCookies,
							responseCookies;
						hub.shouldSendDefaultPii() &&
							([
								{ headers: requestHeaders, cookies: requestCookies },
								{ headers: responseHeaders, cookies: responseCookies },
							] = [
								{ cookieHeader: "Cookie", obj: request },
								{ cookieHeader: "Set-Cookie", obj: response },
							].map(({ cookieHeader, obj }) => {
								let headers = this._extractFetchHeaders(obj.headers),
									cookies;
								try {
									let cookieString =
										headers[cookieHeader] ||
										headers[cookieHeader.toLowerCase()] ||
										void 0;
									cookieString &&
										(cookies = this._parseCookieString(cookieString));
								} catch {
									(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.log(
											`Could not extract cookies from header ${cookieHeader}`,
										);
								}
								return {
									headers,
									cookies,
								};
							}));
						let event = this._createEvent({
							url: request.url,
							method: request.method,
							status: response.status,
							requestHeaders,
							responseHeaders,
							requestCookies,
							responseCookies,
						});
						hub.captureEvent(event);
					}
				}
				/**
				 * Interceptor function for XHR requests
				 *
				 * @param xhr The XHR request
				 * @param method The HTTP method
				 * @param headers The HTTP headers
				 */
				_xhrResponseHandler(xhr, method, headers) {
					if (
						this._getCurrentHub &&
						this._shouldCaptureResponse(xhr.status, xhr.responseURL)
					) {
						let requestHeaders,
							responseCookies,
							responseHeaders,
							hub = this._getCurrentHub();
						if (hub.shouldSendDefaultPii()) {
							try {
								let cookieString =
									xhr.getResponseHeader("Set-Cookie") ||
									xhr.getResponseHeader("set-cookie") ||
									void 0;
								cookieString &&
									(responseCookies = this._parseCookieString(cookieString));
							} catch {
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.log(
										"Could not extract cookies from response headers",
									);
							}
							try {
								responseHeaders = this._getXHRResponseHeaders(xhr);
							} catch {
								(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
									utils.logger.log("Could not extract headers from response");
							}
							requestHeaders = headers;
						}
						let event = this._createEvent({
							url: xhr.responseURL,
							method,
							status: xhr.status,
							requestHeaders,
							// Can't access request cookies from XHR
							responseHeaders,
							responseCookies,
						});
						hub.captureEvent(event);
					}
				}
				/**
				 * Extracts response size from `Content-Length` header when possible
				 *
				 * @param headers
				 * @returns The response size in bytes or undefined
				 */
				_getResponseSizeFromHeaders(headers) {
					if (headers) {
						let contentLength = headers["Content-Length"] || headers["content-length"];
						if (contentLength) return parseInt(contentLength, 10);
					}
				}
				/**
				 * Creates an object containing cookies from the given cookie string
				 *
				 * @param cookieString The cookie string to parse
				 * @returns The parsed cookies
				 */
				_parseCookieString(cookieString) {
					return cookieString.split("; ").reduce((acc, cookie) => {
						let [key, value] = cookie.split("=");
						return (acc[key] = value), acc;
					}, {});
				}
				/**
				 * Extracts the headers as an object from the given Fetch API request or response object
				 *
				 * @param headers The headers to extract
				 * @returns The extracted headers as an object
				 */
				_extractFetchHeaders(headers) {
					let result = {};
					return (
						headers.forEach((value, key) => {
							result[key] = value;
						}),
						result
					);
				}
				/**
				 * Extracts the response headers as an object from the given XHR object
				 *
				 * @param xhr The XHR object to extract the response headers from
				 * @returns The response headers as an object
				 */
				_getXHRResponseHeaders(xhr) {
					let headers = xhr.getAllResponseHeaders();
					return headers
						? headers
								.split(
									`\r
`,
								)
								.reduce((acc, line) => {
									let [key, value] = line.split(": ");
									return (acc[key] = value), acc;
								}, {})
						: {};
				}
				/**
				 * Checks if the given target url is in the given list of targets
				 *
				 * @param target The target url to check
				 * @returns true if the target url is in the given list of targets, false otherwise
				 */
				_isInGivenRequestTargets(target) {
					return this._options.failedRequestTargets
						? this._options.failedRequestTargets.some((givenRequestTarget) =>
								typeof givenRequestTarget == "string"
									? target.includes(givenRequestTarget)
									: givenRequestTarget.test(target),
							)
						: !1;
				}
				/**
				 * Checks if the given status code is in the given range
				 *
				 * @param status The status code to check
				 * @returns true if the status code is in the given range, false otherwise
				 */
				_isInGivenStatusRanges(status) {
					return this._options.failedRequestStatusCodes
						? this._options.failedRequestStatusCodes.some((range) =>
								typeof range == "number"
									? range === status
									: status >= range[0] && status <= range[1],
							)
						: !1;
				}
				/**
				 * Wraps `fetch` function to capture request and response data
				 */
				_wrapFetch() {
					utils.supportsNativeFetch() &&
						utils.addInstrumentationHandler("fetch", (handlerData) => {
							let { response, args } = handlerData,
								[requestInfo, requestInit] = args;
							response &&
								this._fetchResponseHandler(requestInfo, response, requestInit);
						});
				}
				/**
				 * Wraps XMLHttpRequest to capture request and response data
				 */
				_wrapXHR() {
					"XMLHttpRequest" in utils.GLOBAL_OBJ &&
						utils.addInstrumentationHandler("xhr", (handlerData) => {
							let { xhr } = handlerData,
								sentryXhrData = xhr[utils.SENTRY_XHR_DATA_KEY];
							if (!sentryXhrData) return;
							let { method, request_headers: headers } = sentryXhrData;
							if (method)
								try {
									this._xhrResponseHandler(xhr, method, headers);
								} catch (e) {
									(typeof __SENTRY_DEBUG__ > "u" || __SENTRY_DEBUG__) &&
										utils.logger.warn(
											"Error while extracting response event form XHR response",
											e,
										);
								}
						});
				}
				/**
				 * Checks whether to capture given response as an event
				 *
				 * @param status response status code
				 * @param url response url
				 */
				_shouldCaptureResponse(status, url) {
					return (
						this._isInGivenStatusRanges(status) &&
						this._isInGivenRequestTargets(url) &&
						!core.isSentryRequestUrl(url, core.getCurrentHub())
					);
				}
				/**
				 * Creates a synthetic Sentry event from given response data
				 *
				 * @param data response data
				 * @returns event
				 */
				_createEvent(data) {
					let message = `HTTP Client Error with status code: ${data.status}`,
						event = {
							message,
							exception: {
								values: [
									{
										type: "Error",
										value: message,
									},
								],
							},
							request: {
								url: data.url,
								method: data.method,
								headers: data.requestHeaders,
								cookies: data.requestCookies,
							},
							contexts: {
								response: {
									status_code: data.status,
									headers: data.responseHeaders,
									cookies: data.responseCookies,
									body_size: this._getResponseSizeFromHeaders(
										data.responseHeaders,
									),
								},
							},
						};
					return (
						utils.addExceptionMechanism(event, {
							type: "http.client",
							handled: !1,
						}),
						event
					);
				}
			};
		HttpClient.__initStatic();
		function _getRequest(requestInfo, requestInit) {
			return (!requestInit && requestInfo instanceof Request) ||
				(requestInfo instanceof Request && requestInfo.bodyUsed)
				? requestInfo
				: new Request(requestInfo, requestInit);
		}
		exports.HttpClient = HttpClient;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/contextlines.js
var require_contextlines = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/contextlines.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var utils = require_cjs(),
			WINDOW = utils.GLOBAL_OBJ,
			DEFAULT_LINES_OF_CONTEXT = 7,
			ContextLines = class {
				/**
				 * @inheritDoc
				 */
				static __initStatic() {
					this.id = "ContextLines";
				}
				/**
				 * @inheritDoc
				 */
				constructor(_options = {}) {
					(this._options = _options), (this.name = ContextLines.id);
				}
				/**
				 * @inheritDoc
				 */
				setupOnce(_addGlobaleventProcessor, _getCurrentHub) {}
				/** @inheritDoc */
				processEvent(event) {
					return this.addSourceContext(event);
				}
				/**
				 * Processes an event and adds context lines.
				 *
				 * TODO (v8): Make this internal/private
				 */
				addSourceContext(event) {
					let doc = WINDOW.document,
						htmlFilename =
							WINDOW.location && utils.stripUrlQueryAndFragment(WINDOW.location.href);
					if (!doc || !htmlFilename) return event;
					let exceptions = event.exception && event.exception.values;
					if (!exceptions || !exceptions.length) return event;
					let html = doc.documentElement.innerHTML;
					if (!html) return event;
					let htmlLines = [
						"<!DOCTYPE html>",
						"<html>",
						...html.split(`
`),
						"</html>",
					];
					return (
						exceptions.forEach((exception) => {
							let stacktrace = exception.stacktrace;
							stacktrace &&
								stacktrace.frames &&
								(stacktrace.frames = stacktrace.frames.map((frame) =>
									applySourceContextToFrame(
										frame,
										htmlLines,
										htmlFilename,
										this._options.frameContextLines != null
											? this._options.frameContextLines
											: DEFAULT_LINES_OF_CONTEXT,
									),
								));
						}),
						event
					);
				}
			};
		ContextLines.__initStatic();
		function applySourceContextToFrame(frame, htmlLines, htmlFilename, linesOfContext) {
			return (
				frame.filename !== htmlFilename ||
					!frame.lineno ||
					!htmlLines.length ||
					utils.addContextToFrame(htmlLines, frame, linesOfContext),
				frame
			);
		}
		exports.ContextLines = ContextLines;
		exports.applySourceContextToFrame = applySourceContextToFrame;
	},
});

// ../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/index.js
var require_cjs3 = __commonJS({
	"../../node_modules/.pnpm/@sentry+integrations@7.76.0/node_modules/@sentry/integrations/cjs/index.js"(
		exports,
	) {
		Object.defineProperty(exports, "__esModule", { value: !0 });
		var captureconsole = require_captureconsole(),
			debug = require_debug(),
			dedupe = require_dedupe(),
			extraerrordata = require_extraerrordata(),
			offline = require_offline(),
			reportingobserver = require_reportingobserver(),
			rewriteframes = require_rewriteframes(),
			sessiontiming = require_sessiontiming(),
			transaction = require_transaction(),
			httpclient = require_httpclient(),
			contextlines = require_contextlines();
		exports.CaptureConsole = captureconsole.CaptureConsole;
		exports.Debug = debug.Debug;
		exports.Dedupe = dedupe.Dedupe;
		exports.ExtraErrorData = extraerrordata.ExtraErrorData;
		exports.Offline = offline.Offline;
		exports.ReportingObserver = reportingobserver.ReportingObserver;
		exports.RewriteFrames = rewriteframes.RewriteFrames;
		exports.SessionTiming = sessiontiming.SessionTiming;
		exports.Transaction = transaction.Transaction;
		exports.HttpClient = httpclient.HttpClient;
		exports.ContextLines = contextlines.ContextLines;
	},
});

// ../../node_modules/.pnpm/toucan-js@3.3.1_patch_hash=b5gffumfuckaq3c77sda2gdfuq/node_modules/toucan-js/dist/index.cjs.js
var require_index_cjs = __commonJS({
	"../../node_modules/.pnpm/toucan-js@3.3.1_patch_hash=b5gffumfuckaq3c77sda2gdfuq/node_modules/toucan-js/dist/index.cjs.js"(
		exports,
	) {
		"use strict";
		var utils = require_cjs(),
			integrations = require_cjs3(),
			core = require_cjs2();
		function isObject(value) {
			return typeof value == "object" && value !== null;
		}
		function isMechanism(value) {
			return (
				isObject(value) &&
				"handled" in value &&
				typeof value.handled == "boolean" &&
				"type" in value &&
				typeof value.type == "string"
			);
		}
		function containsMechanism(value) {
			return isObject(value) && "mechanism" in value && isMechanism(value.mechanism);
		}
		function getSentryRelease() {
			if (utils.GLOBAL_OBJ.SENTRY_RELEASE && utils.GLOBAL_OBJ.SENTRY_RELEASE.id)
				return utils.GLOBAL_OBJ.SENTRY_RELEASE.id;
		}
		function setOnOptional(target, entry) {
			return target !== void 0
				? ((target[entry[0]] = entry[1]), target)
				: { [entry[0]]: entry[1] };
		}
		function parseStackFrames(stackParser, error) {
			return stackParser(error.stack || "", 1);
		}
		function extractMessage(ex) {
			let message = ex && ex.message;
			return message
				? message.error && typeof message.error.message == "string"
					? message.error.message
					: message
				: "No error message";
		}
		function exceptionFromError(stackParser, error) {
			let exception = {
					type: error.name || error.constructor.name,
					value: extractMessage(error),
				},
				frames = parseStackFrames(stackParser, error);
			return (
				frames.length && (exception.stacktrace = { frames }),
				exception.type === void 0 &&
					exception.value === "" &&
					(exception.value = "Unrecoverable error caught"),
				exception
			);
		}
		function eventFromUnknownInput(sdk, stackParser, exception, hint) {
			let ex,
				mechanism = (hint && hint.data && containsMechanism(hint.data)
					? hint.data.mechanism
					: void 0) ?? {
					handled: !0,
					type: "generic",
				};
			if (utils.isError(exception)) ex = exception;
			else {
				if (utils.isPlainObject(exception)) {
					let message = `Non-Error exception captured with keys: ${utils.extractExceptionKeysForMessage(exception)}`,
						client = sdk?.getClient(),
						normalizeDepth = client && client.getOptions().normalizeDepth;
					sdk?.configureScope((scope) => {
						scope.setExtra(
							"__serialized__",
							utils.normalizeToSize(exception, normalizeDepth),
						);
					}),
						(ex = (hint && hint.syntheticException) || new Error(message)),
						(ex.message = message);
				} else
					(ex = (hint && hint.syntheticException) || new Error(exception)),
						(ex.message = exception);
				mechanism.synthetic = !0;
			}
			let event = {
				exception: {
					values: [exceptionFromError(stackParser, ex)],
				},
			};
			return (
				utils.addExceptionTypeValue(event, void 0, void 0),
				utils.addExceptionMechanism(event, mechanism),
				{
					...event,
					event_id: hint && hint.event_id,
				}
			);
		}
		function eventFromMessage(stackParser, message, level = "info", hint, attachStacktrace) {
			let event = {
				event_id: hint && hint.event_id,
				level,
				message,
			};
			if (attachStacktrace && hint && hint.syntheticException) {
				let frames = parseStackFrames(stackParser, hint.syntheticException);
				frames.length &&
					(event.exception = {
						values: [
							{
								value: message,
								stacktrace: { frames },
							},
						],
					});
			}
			return event;
		}
		var DEFAULT_LIMIT = 5,
			_LinkedErrors = class {
				name = _LinkedErrors.id;
				limit;
				constructor(options = {}) {
					this.limit = options.limit || DEFAULT_LIMIT;
				}
				setupOnce(addGlobalEventProcessor, getCurrentHub) {
					let client = getCurrentHub().getClient();
					client &&
						addGlobalEventProcessor((event, hint) => {
							let self2 = getCurrentHub().getIntegration(_LinkedErrors);
							return self2
								? handler(client.getOptions().stackParser, self2.limit, event, hint)
								: event;
						});
				}
			},
			LinkedErrors = _LinkedErrors;
		__publicField(LinkedErrors, "id", "LinkedErrors");
		function handler(parser, limit, event, hint) {
			if (
				!event.exception ||
				!event.exception.values ||
				!hint ||
				!utils.isInstanceOf(hint.originalException, Error)
			)
				return event;
			let linkedErrors = walkErrorTree(parser, limit, hint.originalException);
			return (event.exception.values = [...linkedErrors, ...event.exception.values]), event;
		}
		function walkErrorTree(parser, limit, error, stack = []) {
			if (!utils.isInstanceOf(error.cause, Error) || stack.length + 1 >= limit) return stack;
			let exception = exceptionFromError(parser, error.cause);
			return walkErrorTree(parser, limit, error.cause, [exception, ...stack]);
		}
		var defaultRequestDataOptions = {
				allowedHeaders: ["CF-RAY", "CF-Worker"],
			},
			_options,
			_RequestData = class {
				constructor(options = {}) {
					__publicField(this, "name", _RequestData.id);
					__privateAdd(this, _options, void 0);
					__privateSet(this, _options, { ...defaultRequestDataOptions, ...options });
				}
				setupOnce(addGlobalEventProcessor, getCurrentHub) {
					getCurrentHub().getClient() &&
						addGlobalEventProcessor((event) => {
							let { sdkProcessingMetadata } = event;
							return (
								!getCurrentHub().getIntegration(_RequestData) ||
									!sdkProcessingMetadata ||
									("request" in sdkProcessingMetadata &&
										sdkProcessingMetadata.request instanceof Request &&
										((event.request = toEventRequest(
											sdkProcessingMetadata.request,
											__privateGet(this, _options),
										)),
										(event.user = toEventUser(
											event.user ?? {},
											sdkProcessingMetadata.request,
											__privateGet(this, _options),
										))),
									"requestData" in sdkProcessingMetadata &&
										(event.request
											? (event.request.data =
													sdkProcessingMetadata.requestData)
											: (event.request = {
													data: sdkProcessingMetadata.requestData,
												}))),
								event
							);
						});
				}
			},
			RequestData = _RequestData;
		(_options = new WeakMap()), __publicField(RequestData, "id", "RequestData");
		function toEventUser(user, request, options) {
			let ip_address = request.headers.get("CF-Connecting-IP"),
				{ allowedIps } = options,
				newUser = { ...user };
			return (
				!("ip_address" in user) && // If ip_address is already set from explicitly called setUser, we don't want to overwrite it
					ip_address &&
					allowedIps !== void 0 &&
					testAllowlist(ip_address, allowedIps) &&
					(newUser.ip_address = ip_address),
				Object.keys(newUser).length > 0 ? newUser : void 0
			);
		}
		function toEventRequest(request, options) {
			let cookieString = request.headers.get("cookie"),
				cookies;
			if (cookieString)
				try {
					cookies = parseCookie(cookieString);
				} catch {}
			let headers = {};
			for (let [k, v] of request.headers.entries()) k !== "cookie" && (headers[k] = v);
			let eventRequest = {
				method: request.method,
				cookies,
				headers,
			};
			try {
				let url = new URL(request.url);
				(eventRequest.url = `${url.protocol}//${url.hostname}${url.pathname}`),
					(eventRequest.query_string = url.search);
			} catch {
				let qi = request.url.indexOf("?");
				qi < 0
					? (eventRequest.url = request.url)
					: ((eventRequest.url = request.url.substr(0, qi)),
						(eventRequest.query_string = request.url.substr(qi + 1)));
			}
			let { allowedHeaders, allowedCookies, allowedSearchParams } = options;
			if (
				(allowedHeaders !== void 0 && eventRequest.headers
					? ((eventRequest.headers = applyAllowlistToObject(
							eventRequest.headers,
							allowedHeaders,
						)),
						Object.keys(eventRequest.headers).length === 0 &&
							delete eventRequest.headers)
					: delete eventRequest.headers,
				allowedCookies !== void 0 && eventRequest.cookies
					? ((eventRequest.cookies = applyAllowlistToObject(
							eventRequest.cookies,
							allowedCookies,
						)),
						Object.keys(eventRequest.cookies).length === 0 &&
							delete eventRequest.cookies)
					: delete eventRequest.cookies,
				allowedSearchParams !== void 0)
			) {
				let params = Object.fromEntries(new URLSearchParams(eventRequest.query_string)),
					allowedParams = new URLSearchParams();
				Object.keys(applyAllowlistToObject(params, allowedSearchParams)).forEach(
					(allowedKey) => {
						allowedParams.set(allowedKey, params[allowedKey]);
					},
				),
					(eventRequest.query_string = allowedParams.toString());
			} else delete eventRequest.query_string;
			return eventRequest;
		}
		function testAllowlist(target, allowlist) {
			return typeof allowlist == "boolean"
				? allowlist
				: allowlist instanceof RegExp
					? allowlist.test(target)
					: Array.isArray(allowlist)
						? allowlist.map((item) => item.toLowerCase()).includes(target)
						: !1;
		}
		function applyAllowlistToObject(target, allowlist) {
			let predicate = () => !1;
			if (typeof allowlist == "boolean") return allowlist ? target : {};
			if (allowlist instanceof RegExp) predicate = (item) => allowlist.test(item);
			else if (Array.isArray(allowlist)) {
				let allowlistLowercased = allowlist.map((item) => item.toLowerCase());
				predicate = (item) => allowlistLowercased.includes(item.toLowerCase());
			} else return {};
			return Object.keys(target)
				.filter(predicate)
				.reduce((allowed, key) => ((allowed[key] = target[key]), allowed), {});
		}
		function parseCookie(cookieString) {
			if (typeof cookieString != "string") return {};
			try {
				return cookieString
					.split(";")
					.map((part) => part.split("="))
					.reduce(
						(acc, [cookieKey, cookieValue]) => (
							(acc[decodeURIComponent(cookieKey.trim())] = decodeURIComponent(
								cookieValue.trim(),
							)),
							acc
						),
						{},
					);
			} catch {
				return {};
			}
		}
		function setupIntegrations(integrations2, sdk) {
			let integrationIndex = {};
			return (
				integrations2.forEach((integration) => {
					(integrationIndex[integration.name] = integration),
						integration.setupOnce(
							(callback) => {
								sdk.getScope()?.addEventProcessor(callback);
							},
							() => sdk,
						);
				}),
				integrationIndex
			);
		}
		var ToucanClient = class extends core.ServerRuntimeClient {
			/**
			 * Some functions need to access the Hub (Toucan instance) this client is bound to,
			 * but calling 'getCurrentHub()' is unsafe because it uses globals.
			 * So we store a reference to the Hub after binding to it and provide it to methods that need it.
			 */
			#sdk = null;
			/**
			 * Creates a new Toucan SDK instance.
			 * @param options Configuration options for this SDK.
			 */
			constructor(options) {
				(options._metadata = options._metadata || {}),
					(options._metadata.sdk = options._metadata.sdk || {
						name: "toucan-js",
						packages: [
							{
								name: "npm:toucan-js",
								version: "3.3.1",
							},
						],
						version: "3.3.1",
					}),
					super(options);
			}
			/**
			 * By default, integrations are stored in a global. We want to store them in a local instance because they may have contextual data, such as event request.
			 */
			setupIntegrations() {
				this._isEnabled() &&
					!this._integrationsInitialized &&
					this.#sdk &&
					((this._integrations = setupIntegrations(
						this._options.integrations,
						this.#sdk,
					)),
					(this._integrationsInitialized = !0));
			}
			eventFromException(exception, hint) {
				return utils.resolvedSyncPromise(
					eventFromUnknownInput(this.#sdk, this._options.stackParser, exception, hint),
				);
			}
			eventFromMessage(message, level = "info", hint) {
				return utils.resolvedSyncPromise(
					eventFromMessage(
						this._options.stackParser,
						message,
						level,
						hint,
						this._options.attachStacktrace,
					),
				);
			}
			_prepareEvent(event, hint, scope) {
				return (
					(event.platform = event.platform || "javascript"),
					this.getOptions().request &&
						(event.sdkProcessingMetadata = setOnOptional(event.sdkProcessingMetadata, [
							"request",
							this.getOptions().request,
						])),
					this.getOptions().requestData &&
						(event.sdkProcessingMetadata = setOnOptional(event.sdkProcessingMetadata, [
							"requestData",
							this.getOptions().requestData,
						])),
					super._prepareEvent(event, hint, scope)
				);
			}
			getSdk() {
				return this.#sdk;
			}
			setSdk(sdk) {
				this.#sdk = sdk;
			}
			/**
			 * Sets the request body context on all future events.
			 *
			 * @param body Request body.
			 * @example
			 * const body = await request.text();
			 * toucan.setRequestBody(body);
			 */
			setRequestBody(body) {
				this.getOptions().requestData = body;
			}
			/**
			 * Enable/disable the SDK.
			 *
			 * @param enabled
			 */
			setEnabled(enabled) {
				this.getOptions().enabled = enabled;
			}
		};
		function workersStackLineParser(getModule2) {
			let [arg1, arg2] = utils.nodeStackLineParser(getModule2);
			return [
				arg1,
				(line) => {
					let result = arg2(line);
					if (result) {
						let filename = result.filename;
						(result.abs_path =
							filename !== void 0 && !filename.startsWith("/")
								? `/${filename}`
								: filename),
							(result.in_app = filename !== void 0);
					}
					return result;
				},
			];
		}
		function getModule(filename) {
			if (filename) return utils.basename(filename, ".js");
		}
		var defaultStackParser = utils.createStackParser(workersStackLineParser(getModule));
		function makeFetchTransport(options) {
			function makeRequest({ body }) {
				try {
					let request = (options.fetcher ?? fetch)(options.url, {
						method: "POST",
						headers: options.headers,
						body,
					}).then((response) => ({
						statusCode: response.status,
						headers: {
							"retry-after": response.headers.get("Retry-After"),
							"x-sentry-rate-limits": response.headers.get("X-Sentry-Rate-Limits"),
						},
					}));
					return options.context && options.context.waitUntil(request), request;
				} catch (e) {
					return utils.rejectedSyncPromise(e);
				}
			}
			return core.createTransport(options, makeRequest);
		}
		var Toucan2 = class extends core.Hub {
			constructor(options) {
				if (
					((options.defaultIntegrations =
						options.defaultIntegrations === !1
							? []
							: [
									...(Array.isArray(options.defaultIntegrations)
										? options.defaultIntegrations
										: [
												new RequestData(options.requestDataOptions),
												new LinkedErrors(),
											]),
								]),
					options.release === void 0)
				) {
					let detectedRelease = getSentryRelease();
					detectedRelease !== void 0 && (options.release = detectedRelease);
				}
				let client = new ToucanClient({
					...options,
					transport: makeFetchTransport,
					integrations: core.getIntegrationsToSetup(options),
					stackParser: utils.stackParserFromStackParserOptions(
						options.stackParser || defaultStackParser,
					),
					transportOptions: {
						...options.transportOptions,
						context: options.context,
					},
				});
				super(client), client.setSdk(this), client.setupIntegrations();
			}
			/**
			 * Sets the request body context on all future events.
			 *
			 * @param body Request body.
			 * @example
			 * const body = await request.text();
			 * toucan.setRequestBody(body);
			 */
			setRequestBody(body) {
				this.getClient()?.setRequestBody(body);
			}
			/**
			 * Enable/disable the SDK.
			 *
			 * @param enabled
			 */
			setEnabled(enabled) {
				this.getClient()?.setEnabled(enabled);
			}
			/**
			 * Create a cron monitor check in and send it to Sentry.
			 *
			 * @param checkIn An object that describes a check in.
			 * @param upsertMonitorConfig An optional object that describes a monitor config. Use this if you want
			 * to create a monitor automatically when sending a check in.
			 */
			captureCheckIn(checkIn, monitorConfig, scope) {
				return (
					checkIn.status === "in_progress" &&
						this.setContext("monitor", { slug: checkIn.monitorSlug }),
					this.getClient().captureCheckIn(checkIn, monitorConfig, scope)
				);
			}
		};
		Object.defineProperty(exports, "Dedupe", {
			enumerable: !0,
			get: function () {
				return integrations.Dedupe;
			},
		});
		Object.defineProperty(exports, "ExtraErrorData", {
			enumerable: !0,
			get: function () {
				return integrations.ExtraErrorData;
			},
		});
		Object.defineProperty(exports, "RewriteFrames", {
			enumerable: !0,
			get: function () {
				return integrations.RewriteFrames;
			},
		});
		Object.defineProperty(exports, "SessionTiming", {
			enumerable: !0,
			get: function () {
				return integrations.SessionTiming;
			},
		});
		Object.defineProperty(exports, "Transaction", {
			enumerable: !0,
			get: function () {
				return integrations.Transaction;
			},
		});
		exports.LinkedErrors = LinkedErrors;
		exports.RequestData = RequestData;
		exports.Toucan = Toucan2;
	},
});

// ../workers-shared/asset-worker/src/index.ts
import { WorkerEntrypoint } from "cloudflare:workers";

// ../workers-shared/utils/performance.ts
var PerformanceTimer = class {
	performanceTimer;
	constructor(performanceTimer) {
		this.performanceTimer = performanceTimer;
	}
	now() {
		return this.performanceTimer
			? this.performanceTimer.timeOrigin + this.performanceTimer.now()
			: Date.now();
	}
};

// ../workers-shared/utils/sentry.ts
var import_toucan_js = __toESM(require_index_cjs());
function setupSentry(request, context, dsn, clientId, clientSecret) {
	if (!(dsn && clientId && clientSecret)) return;
	let sentry = new import_toucan_js.Toucan({
			dsn,
			request,
			context,
			sampleRate: 1,
			requestDataOptions: {
				allowedHeaders: [
					"user-agent",
					"cf-challenge",
					"accept-encoding",
					"accept-language",
					"cf-ray",
					"content-length",
					"content-type",
					"host",
				],
				allowedSearchParams: /(.*)/,
			},
			transportOptions: {
				headers: {
					"CF-Access-Client-ID": clientId,
					"CF-Access-Client-Secret": clientSecret,
				},
			},
		}),
		colo = request.cf?.colo ?? "UNKNOWN";
	sentry.setTag("colo", colo);
	let userAgent = request.headers.get("user-agent") ?? "UA UNKNOWN";
	return sentry.setUser({ userAgent, colo }), sentry;
}

// ../workers-shared/asset-worker/src/analytics.ts
var Analytics = class {
	data = {};
	readyAnalytics;
	constructor(readyAnalytics) {
		this.readyAnalytics = readyAnalytics;
	}
	setData(newData) {
		this.data = { ...this.data, ...newData };
	}
	getData(key) {
		return this.data[key];
	}
	write() {
		this.readyAnalytics &&
			this.readyAnalytics.logEvent({
				version: 1,
				accountId: 0,
				// TODO: need to plumb through
				indexId: this.data.hostname?.substring(0, 96),
				doubles: [
					this.data.requestTime ?? -1,
					// double1
					this.data.coloId ?? -1,
					// double2
					this.data.metalId ?? -1,
					// double3
					this.data.coloTier ?? -1,
					// double4
				],
				blobs: [
					this.data.hostname?.substring(0, 256),
					// blob1 - trim to 256 bytes
					this.data.userAgent?.substring(0, 256),
					// blob2 - trim to 256 bytes
					this.data.htmlHandling,
					// blob3
					this.data.notFoundHandling,
					// blob4
					this.data.error?.substring(0, 256),
					// blob5 - trim to 256 bytes
					this.data.version,
					// blob6
					this.data.coloRegion,
					// blob7
				],
			});
	}
};

// ../workers-shared/asset-worker/src/assets-manifest.ts
var AssetsManifest = class {
		data;
		constructor(data) {
			this.data = data;
		}
		async get(pathname) {
			let pathHash = await hashPath(pathname),
				entry = binarySearch(new Uint8Array(this.data, 20), pathHash);
			return entry ? contentHashToKey(entry) : null;
		}
	},
	hashPath = async (path) => {
		let data = new TextEncoder().encode(path),
			hashBuffer = await crypto.subtle.digest("SHA-256", data.buffer);
		return new Uint8Array(hashBuffer, 0, 16);
	},
	binarySearch = (arr, searchValue) => {
		if (arr.byteLength === 0) return !1;
		let offset = arr.byteOffset + ((arr.byteLength / 40) >> 1) * 40,
			current = new Uint8Array(arr.buffer, offset, 16);
		if (current.byteLength !== searchValue.byteLength)
			throw new TypeError("Search value and current value are of different lengths");
		let cmp = compare(searchValue, current);
		if (cmp < 0) {
			let nextOffset = arr.byteOffset,
				nextLength = offset - arr.byteOffset;
			return binarySearch(new Uint8Array(arr.buffer, nextOffset, nextLength), searchValue);
		} else if (cmp > 0) {
			let nextOffset = offset + 40,
				nextLength = arr.buffer.byteLength - offset - 40;
			return binarySearch(new Uint8Array(arr.buffer, nextOffset, nextLength), searchValue);
		} else return new Uint8Array(arr.buffer, offset, 40);
	},
	compare = (a, b) => {
		if (a.byteLength < b.byteLength) return -1;
		if (a.byteLength > b.byteLength) return 1;
		for (let [i, v] of a.entries()) {
			if (v < b[i]) return -1;
			if (v > b[i]) return 1;
		}
		return 0;
	},
	contentHashToKey = (buffer) =>
		[...buffer.slice(16, 16 + 16)].map((b) => b.toString(16).padStart(2, "0")).join("");

// ../workers-shared/asset-worker/src/configuration.ts
var applyConfigurationDefaults = (configuration) => ({
	html_handling: configuration?.html_handling ?? "auto-trailing-slash",
	not_found_handling: configuration?.not_found_handling ?? "none",
});

// ../workers-shared/asset-worker/src/responses.ts
var OkResponse = class extends Response {
		constructor(body, init) {
			super(body, {
				...init,
				status: 200,
			});
		}
	},
	NotFoundResponse = class extends Response {
		constructor(...[body, init]) {
			super(body, {
				...init,
				status: 404,
				statusText: "Not Found",
			});
		}
	},
	MethodNotAllowedResponse = class extends Response {
		constructor(...[body, init]) {
			super(body, {
				...init,
				status: 405,
				statusText: "Method Not Allowed",
			});
		}
	},
	InternalServerErrorResponse = class extends Response {
		constructor(err, init) {
			super(null, {
				...init,
				status: 500,
			});
		}
	},
	NotModifiedResponse = class extends Response {
		constructor(...[_body, init]) {
			super(null, {
				...init,
				status: 304,
				statusText: "Not Modified",
			});
		}
	},
	TemporaryRedirectResponse = class extends Response {
		constructor(location, init) {
			super(null, {
				...init,
				status: 307,
				statusText: "Temporary Redirect",
				headers: {
					...init?.headers,
					Location: location,
				},
			});
		}
	};

// ../workers-shared/asset-worker/src/constants.ts
var CACHE_CONTROL_BROWSER = "public, max-age=0, must-revalidate";

// ../workers-shared/asset-worker/src/utils/headers.ts
function getHeaders(eTag, contentType, request) {
	let headers = new Headers({
		"Content-Type": contentType,
		ETag: `"${eTag}"`,
	});
	return isCacheable(request) && headers.append("Cache-Control", CACHE_CONTROL_BROWSER), headers;
}
function isCacheable(request) {
	return !request.headers.has("Authorization") && !request.headers.has("Range");
}

// ../workers-shared/asset-worker/src/handler.ts
var handleRequest = async (request, configuration, exists, getByETag) => {
		let { pathname, search } = new URL(request.url),
			decodedPathname = decodePath(pathname),
			intent = await getIntent(decodedPathname, configuration, exists);
		if (!intent) return new NotFoundResponse();
		let method = request.method.toUpperCase();
		if (!["GET", "HEAD"].includes(method)) return new MethodNotAllowedResponse();
		let decodedDestination = intent.redirect ?? decodedPathname,
			encodedDestination = encodePath(decodedDestination);
		if (encodedDestination !== pathname || intent.redirect)
			return new TemporaryRedirectResponse(encodedDestination + search);
		if (!intent.asset) return new InternalServerErrorResponse(new Error("Unknown action"));
		let asset = await getByETag(intent.asset.eTag),
			headers = getHeaders(intent.asset.eTag, asset.contentType, request),
			strongETag = `"${intent.asset.eTag}"`,
			weakETag = `W/${strongETag}`,
			ifNoneMatch = request.headers.get("If-None-Match") || "";
		if ([weakETag, strongETag].includes(ifNoneMatch))
			return new NotModifiedResponse(null, { headers });
		let body = method === "HEAD" ? null : asset.readableStream;
		switch (intent.asset.status) {
			case 404:
				return new NotFoundResponse(body, { headers });
			case 200:
				return new OkResponse(body, { headers });
		}
	},
	getIntent = async (pathname, configuration, exists, skipRedirects = !1) => {
		switch (configuration.html_handling) {
			case "auto-trailing-slash":
				return htmlHandlingAutoTrailingSlash(
					pathname,
					configuration,
					exists,
					skipRedirects,
				);
			case "force-trailing-slash":
				return htmlHandlingForceTrailingSlash(
					pathname,
					configuration,
					exists,
					skipRedirects,
				);
			case "drop-trailing-slash":
				return htmlHandlingDropTrailingSlash(
					pathname,
					configuration,
					exists,
					skipRedirects,
				);
			case "none":
				return htmlHandlingNone(pathname, configuration, exists);
		}
	},
	htmlHandlingAutoTrailingSlash = async (pathname, configuration, exists, skipRedirects) => {
		let redirectResult = null,
			eTagResult = null,
			exactETag = await exists(pathname);
		if (pathname.endsWith("/index")) {
			if (exactETag)
				return {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				};
			if (
				(redirectResult = await safeRedirect(
					`${pathname}.html`,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -6)}.html`,
					pathname.slice(0, -6),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		} else if (pathname.endsWith("/index.html")) {
			if (
				(redirectResult = await safeRedirect(
					pathname,
					pathname.slice(0, -10),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -11)}.html`,
					pathname.slice(0, -11),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		} else if (pathname.endsWith("/")) {
			if ((eTagResult = await exists(`${pathname}index.html`)))
				return {
					asset: { eTag: eTagResult, status: 200 },
					redirect: null,
				};
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -1)}.html`,
					pathname.slice(0, -1),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		} else if (pathname.endsWith(".html")) {
			if (
				(redirectResult = await safeRedirect(
					pathname,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -5)}/index.html`,
					`${pathname.slice(0, -5)}/`,
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		}
		return exactETag
			? {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				}
			: (eTagResult = await exists(`${pathname}.html`))
				? {
						asset: { eTag: eTagResult, status: 200 },
						redirect: null,
					}
				: (redirectResult = await safeRedirect(
							`${pathname}/index.html`,
							`${pathname}/`,
							configuration,
							exists,
							skipRedirects,
					  ))
					? redirectResult
					: notFound(pathname, configuration, exists);
	},
	htmlHandlingForceTrailingSlash = async (pathname, configuration, exists, skipRedirects) => {
		let redirectResult = null,
			eTagResult = null,
			exactETag = await exists(pathname);
		if (pathname.endsWith("/index")) {
			if (exactETag)
				return {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				};
			if (
				(redirectResult = await safeRedirect(
					`${pathname}.html`,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -6)}.html`,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		} else if (pathname.endsWith("/index.html")) {
			if (
				(redirectResult = await safeRedirect(
					pathname,
					pathname.slice(0, -10),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -11)}.html`,
					pathname.slice(0, -10),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		} else if (pathname.endsWith("/")) {
			if ((eTagResult = await exists(`${pathname}index.html`)))
				return {
					asset: { eTag: eTagResult, status: 200 },
					redirect: null,
				};
			if ((eTagResult = await exists(`${pathname.slice(0, -1)}.html`)))
				return {
					asset: { eTag: eTagResult, status: 200 },
					redirect: null,
				};
		} else if (pathname.endsWith(".html")) {
			if (
				(redirectResult = await safeRedirect(
					pathname,
					`${pathname.slice(0, -5)}/`,
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (exactETag)
				return {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				};
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -5)}/index.html`,
					`${pathname.slice(0, -5)}/`,
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		}
		return exactETag
			? {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				}
			: (redirectResult = await safeRedirect(
						`${pathname}.html`,
						`${pathname}/`,
						configuration,
						exists,
						skipRedirects,
				  )) ||
				  (redirectResult = await safeRedirect(
						`${pathname}/index.html`,
						`${pathname}/`,
						configuration,
						exists,
						skipRedirects,
				  ))
				? redirectResult
				: notFound(pathname, configuration, exists);
	},
	htmlHandlingDropTrailingSlash = async (pathname, configuration, exists, skipRedirects) => {
		let redirectResult = null,
			eTagResult = null,
			exactETag = await exists(pathname);
		if (pathname.endsWith("/index")) {
			if (exactETag)
				return {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				};
			if (pathname === "/index") {
				if (
					(redirectResult = await safeRedirect(
						"/index.html",
						"/",
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
			} else {
				if (
					(redirectResult = await safeRedirect(
						`${pathname.slice(0, -6)}.html`,
						pathname.slice(0, -6),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
				if (
					(redirectResult = await safeRedirect(
						`${pathname}.html`,
						pathname.slice(0, -6),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
			}
		} else if (pathname.endsWith("/index.html"))
			if (pathname === "/index.html") {
				if (
					(redirectResult = await safeRedirect(
						"/index.html",
						"/",
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
			} else {
				if (
					(redirectResult = await safeRedirect(
						pathname,
						pathname.slice(0, -11),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
				if (exactETag)
					return {
						asset: { eTag: exactETag, status: 200 },
						redirect: null,
					};
				if (
					(redirectResult = await safeRedirect(
						`${pathname.slice(0, -11)}.html`,
						pathname.slice(0, -11),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
			}
		else if (pathname.endsWith("/"))
			if (pathname === "/") {
				if ((eTagResult = await exists("/index.html")))
					return {
						asset: { eTag: eTagResult, status: 200 },
						redirect: null,
					};
			} else {
				if (
					(redirectResult = await safeRedirect(
						`${pathname.slice(0, -1)}.html`,
						pathname.slice(0, -1),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
				if (
					(redirectResult = await safeRedirect(
						`${pathname.slice(0, -1)}/index.html`,
						pathname.slice(0, -1),
						configuration,
						exists,
						skipRedirects,
					))
				)
					return redirectResult;
			}
		else if (pathname.endsWith(".html")) {
			if (
				(redirectResult = await safeRedirect(
					pathname,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
			if (
				(redirectResult = await safeRedirect(
					`${pathname.slice(0, -5)}/index.html`,
					pathname.slice(0, -5),
					configuration,
					exists,
					skipRedirects,
				))
			)
				return redirectResult;
		}
		return exactETag
			? {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				}
			: (eTagResult = await exists(`${pathname}.html`))
				? {
						asset: { eTag: eTagResult, status: 200 },
						redirect: null,
					}
				: (eTagResult = await exists(`${pathname}/index.html`))
					? {
							asset: { eTag: eTagResult, status: 200 },
							redirect: null,
						}
					: notFound(pathname, configuration, exists);
	},
	htmlHandlingNone = async (pathname, configuration, exists) => {
		let exactETag = await exists(pathname);
		return exactETag
			? {
					asset: { eTag: exactETag, status: 200 },
					redirect: null,
				}
			: notFound(pathname, configuration, exists);
	},
	notFound = async (pathname, configuration, exists) => {
		switch (configuration.not_found_handling) {
			case "single-page-application": {
				let eTag = await exists("/index.html");
				return eTag
					? {
							asset: { eTag, status: 200 },
							redirect: null,
						}
					: null;
			}
			case "404-page": {
				let cwd = pathname;
				for (; cwd; ) {
					cwd = cwd.slice(0, cwd.lastIndexOf("/"));
					let eTag = await exists(`${cwd}/404.html`);
					if (eTag)
						return {
							asset: { eTag, status: 404 },
							redirect: null,
						};
				}
				return null;
			}
			case "none":
			default:
				return null;
		}
	},
	safeRedirect = async (file, destination, configuration, exists, skip) => {
		if (skip) return null;
		if (!(await exists(destination))) {
			let intent = await getIntent(destination, configuration, exists, !0);
			if (intent?.asset && intent.asset.eTag === (await exists(file)))
				return {
					asset: null,
					redirect: destination,
				};
		}
		return null;
	},
	decodePath = (pathname) =>
		pathname
			.split("/")
			.map((x) => decodeURIComponent(x))
			.join("/"),
	encodePath = (pathname) =>
		pathname
			.split("/")
			.map((x) => encodeURIComponent(x))
			.join("/");

// ../workers-shared/asset-worker/src/utils/kv.ts
async function getAssetWithMetadataFromKV(assetsKVNamespace, assetKey, retries = 1) {
	let attempts = 0;
	for (; attempts <= retries; )
		try {
			return await assetsKVNamespace.getWithMetadata(assetKey, {
				type: "stream",
				cacheTtl: 31536e3,
				// 1 year
			});
		} catch {
			if (attempts >= retries)
				throw new Error(
					`Requested asset ${assetKey} could not be fetched from KV namespace.`,
				);
			await new Promise((resolvePromise) =>
				setTimeout(resolvePromise, Math.pow(2, attempts++) * 1e3),
			);
		}
}

// ../workers-shared/asset-worker/src/index.ts
var src_default = class extends WorkerEntrypoint {
	async fetch(request) {
		let sentry,
			analytics = new Analytics(this.env.ANALYTICS),
			performance = new PerformanceTimer(this.env.UNSAFE_PERFORMANCE),
			startTimeMs = performance.now();
		try {
			sentry = setupSentry(
				request,
				this.ctx,
				this.env.SENTRY_DSN,
				this.env.SENTRY_ACCESS_CLIENT_ID,
				this.env.SENTRY_ACCESS_CLIENT_SECRET,
			);
			let config = applyConfigurationDefaults(this.env.CONFIG),
				userAgent = request.headers.get("user-agent") ?? "UA UNKNOWN";
			if (sentry) {
				let colo = this.env.COLO_METADATA.coloId;
				sentry.setTag("colo", this.env.COLO_METADATA.coloId),
					sentry.setTag("metal", this.env.COLO_METADATA.metalId),
					sentry.setUser({ userAgent, colo });
			}
			if (this.env.COLO_METADATA && this.env.VERSION_METADATA) {
				let url = new URL(request.url);
				analytics.setData({
					coloId: this.env.COLO_METADATA.coloId,
					metalId: this.env.COLO_METADATA.metalId,
					coloTier: this.env.COLO_METADATA.coloTier,
					coloRegion: this.env.COLO_METADATA.coloRegion,
					version: this.env.VERSION_METADATA.id,
					hostname: url.hostname,
					htmlHandling: config.html_handling,
					notFoundHandling: config.not_found_handling,
					userAgent,
				});
			}
			return handleRequest(
				request,
				config,
				this.unstable_exists.bind(this),
				this.unstable_getByETag.bind(this),
			);
		} catch (err) {
			let response = new InternalServerErrorResponse(err);
			return (
				sentry && sentry.captureException(err),
				err instanceof Error && analytics.setData({ error: err.message }),
				response
			);
		} finally {
			analytics.setData({ requestTime: performance.now() - startTimeMs }), analytics.write();
		}
	}
	async unstable_canFetch(request) {
		let url = new URL(request.url),
			method = request.method.toUpperCase(),
			decodedPathname = decodePath(url.pathname),
			intent = await getIntent(
				decodedPathname,
				{
					...applyConfigurationDefaults(this.env.CONFIG),
					not_found_handling: "none",
				},
				this.unstable_exists.bind(this),
			);
		return intent && ["GET", "HEAD"].includes(method)
			? new MethodNotAllowedResponse()
			: intent !== null;
	}
	async unstable_getByETag(eTag) {
		let asset = await getAssetWithMetadataFromKV(this.env.ASSETS_KV_NAMESPACE, eTag);
		if (!asset || !asset.value)
			throw new Error(
				`Requested asset ${eTag} exists in the asset manifest but not in the KV namespace.`,
			);
		return {
			readableStream: asset.value,
			contentType: asset.metadata?.contentType ?? "application/octet-stream",
		};
	}
	async unstable_getByPathname(pathname) {
		let eTag = await this.unstable_exists(pathname);
		return eTag ? this.unstable_getByETag(eTag) : null;
	}
	async unstable_exists(pathname) {
		return await new AssetsManifest(this.env.ASSETS_MANIFEST).get(pathname);
	}
};

// src/workers/assets/assets.worker.ts
var assets_worker_default = src_default;
export { assets_worker_default as default };
/*! Bundled license information:

localforage/dist/localforage.js:
  (*!
      localForage -- Offline Storage, Improved
      Version 1.10.0
      https://localforage.github.io/localForage
      (c) 2013-2017 Mozilla, Apache License 2.0
  *)
*/
//# sourceMappingURL=assets.worker.js.map
