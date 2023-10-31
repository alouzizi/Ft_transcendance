"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/use-callback-ref";
exports.ids = ["vendor-chunks/use-callback-ref"];
exports.modules = {

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js":
/*!*************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/assignRef.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.assignRef = void 0;\n/**\n * Assigns a value for a given ref, no matter of the ref format\n * @param {RefObject} ref - a callback function or ref object\n * @param value - a new value\n *\n * @see https://github.com/theKashey/use-callback-ref#assignref\n * @example\n * const refObject = useRef();\n * const refFn = (ref) => {....}\n *\n * assignRef(refObject, \"refValue\");\n * assignRef(refFn, \"refValue\");\n */\nfunction assignRef(ref, value) {\n    if (typeof ref === 'function') {\n        ref(value);\n    }\n    else if (ref) {\n        ref.current = value;\n    }\n    return ref;\n}\nexports.assignRef = assignRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9hc3NpZ25SZWYuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsaUJBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxXQUFXLFdBQVc7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYW5zY2VuZGFuY2UvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9hc3NpZ25SZWYuanM/ZTlmZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuYXNzaWduUmVmID0gdm9pZCAwO1xuLyoqXG4gKiBBc3NpZ25zIGEgdmFsdWUgZm9yIGEgZ2l2ZW4gcmVmLCBubyBtYXR0ZXIgb2YgdGhlIHJlZiBmb3JtYXRcbiAqIEBwYXJhbSB7UmVmT2JqZWN0fSByZWYgLSBhIGNhbGxiYWNrIGZ1bmN0aW9uIG9yIHJlZiBvYmplY3RcbiAqIEBwYXJhbSB2YWx1ZSAtIGEgbmV3IHZhbHVlXG4gKlxuICogQHNlZSBodHRwczovL2dpdGh1Yi5jb20vdGhlS2FzaGV5L3VzZS1jYWxsYmFjay1yZWYjYXNzaWducmVmXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmT2JqZWN0ID0gdXNlUmVmKCk7XG4gKiBjb25zdCByZWZGbiA9IChyZWYpID0+IHsuLi4ufVxuICpcbiAqIGFzc2lnblJlZihyZWZPYmplY3QsIFwicmVmVmFsdWVcIik7XG4gKiBhc3NpZ25SZWYocmVmRm4sIFwicmVmVmFsdWVcIik7XG4gKi9cbmZ1bmN0aW9uIGFzc2lnblJlZihyZWYsIHZhbHVlKSB7XG4gICAgaWYgKHR5cGVvZiByZWYgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmVmKHZhbHVlKTtcbiAgICB9XG4gICAgZWxzZSBpZiAocmVmKSB7XG4gICAgICAgIHJlZi5jdXJyZW50ID0gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiByZWY7XG59XG5leHBvcnRzLmFzc2lnblJlZiA9IGFzc2lnblJlZjtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/createRef.js":
/*!*************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/createRef.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.createCallbackRef = void 0;\n/**\n * creates a Ref object with on change callback\n * @param callback\n * @returns {RefObject}\n *\n * @see {@link useCallbackRef}\n * @see https://reactjs.org/docs/refs-and-the-dom.html#creating-refs\n */\nfunction createCallbackRef(callback) {\n    var current = null;\n    return {\n        get current() {\n            return current;\n        },\n        set current(value) {\n            var last = current;\n            if (last !== value) {\n                current = value;\n                callback(value, last);\n            }\n        },\n    };\n}\nexports.createCallbackRef = createCallbackRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9jcmVhdGVSZWYuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QseUJBQXlCO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLHlCQUF5QiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYW5zY2VuZGFuY2UvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9jcmVhdGVSZWYuanM/MWE3ZCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMuY3JlYXRlQ2FsbGJhY2tSZWYgPSB2b2lkIDA7XG4vKipcbiAqIGNyZWF0ZXMgYSBSZWYgb2JqZWN0IHdpdGggb24gY2hhbmdlIGNhbGxiYWNrXG4gKiBAcGFyYW0gY2FsbGJhY2tcbiAqIEByZXR1cm5zIHtSZWZPYmplY3R9XG4gKlxuICogQHNlZSB7QGxpbmsgdXNlQ2FsbGJhY2tSZWZ9XG4gKiBAc2VlIGh0dHBzOi8vcmVhY3Rqcy5vcmcvZG9jcy9yZWZzLWFuZC10aGUtZG9tLmh0bWwjY3JlYXRpbmctcmVmc1xuICovXG5mdW5jdGlvbiBjcmVhdGVDYWxsYmFja1JlZihjYWxsYmFjaykge1xuICAgIHZhciBjdXJyZW50ID0gbnVsbDtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXQgY3VycmVudCh2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGxhc3QgPSBjdXJyZW50O1xuICAgICAgICAgICAgaWYgKGxhc3QgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKHZhbHVlLCBsYXN0KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9O1xufVxuZXhwb3J0cy5jcmVhdGVDYWxsYmFja1JlZiA9IGNyZWF0ZUNhbGxiYWNrUmVmO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/createRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/index.js":
/*!*********************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/index.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useRefToCallback = exports.refToCallback = exports.transformRef = exports.useTransformRef = exports.useMergeRefs = exports.mergeRefs = exports.createCallbackRef = exports.useCallbackRef = exports.assignRef = void 0;\nvar assignRef_1 = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\");\nObject.defineProperty(exports, \"assignRef\", ({ enumerable: true, get: function () { return assignRef_1.assignRef; } }));\n// callback ref\nvar useRef_1 = __webpack_require__(/*! ./useRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/useRef.js\");\nObject.defineProperty(exports, \"useCallbackRef\", ({ enumerable: true, get: function () { return useRef_1.useCallbackRef; } }));\nvar createRef_1 = __webpack_require__(/*! ./createRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/createRef.js\");\nObject.defineProperty(exports, \"createCallbackRef\", ({ enumerable: true, get: function () { return createRef_1.createCallbackRef; } }));\n// merge ref\nvar mergeRef_1 = __webpack_require__(/*! ./mergeRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/mergeRef.js\");\nObject.defineProperty(exports, \"mergeRefs\", ({ enumerable: true, get: function () { return mergeRef_1.mergeRefs; } }));\nvar useMergeRef_1 = __webpack_require__(/*! ./useMergeRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/useMergeRef.js\");\nObject.defineProperty(exports, \"useMergeRefs\", ({ enumerable: true, get: function () { return useMergeRef_1.useMergeRefs; } }));\n// transform ref\nvar useTransformRef_1 = __webpack_require__(/*! ./useTransformRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/useTransformRef.js\");\nObject.defineProperty(exports, \"useTransformRef\", ({ enumerable: true, get: function () { return useTransformRef_1.useTransformRef; } }));\nvar transformRef_1 = __webpack_require__(/*! ./transformRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/transformRef.js\");\nObject.defineProperty(exports, \"transformRef\", ({ enumerable: true, get: function () { return transformRef_1.transformRef; } }));\n// refToCallback\nvar refToCallback_1 = __webpack_require__(/*! ./refToCallback */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/refToCallback.js\");\nObject.defineProperty(exports, \"refToCallback\", ({ enumerable: true, get: function () { return refToCallback_1.refToCallback; } }));\nObject.defineProperty(exports, \"useRefToCallback\", ({ enumerable: true, get: function () { return refToCallback_1.useRefToCallback; } }));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCx3QkFBd0IsR0FBRyxxQkFBcUIsR0FBRyxvQkFBb0IsR0FBRyx1QkFBdUIsR0FBRyxvQkFBb0IsR0FBRyxpQkFBaUIsR0FBRyx5QkFBeUIsR0FBRyxzQkFBc0IsR0FBRyxpQkFBaUI7QUFDck4sa0JBQWtCLG1CQUFPLENBQUMsZ0ZBQWE7QUFDdkMsNkNBQTRDLEVBQUUscUNBQXFDLGlDQUFpQyxFQUFDO0FBQ3JIO0FBQ0EsZUFBZSxtQkFBTyxDQUFDLDBFQUFVO0FBQ2pDLGtEQUFpRCxFQUFFLHFDQUFxQyxtQ0FBbUMsRUFBQztBQUM1SCxrQkFBa0IsbUJBQU8sQ0FBQyxnRkFBYTtBQUN2QyxxREFBb0QsRUFBRSxxQ0FBcUMseUNBQXlDLEVBQUM7QUFDckk7QUFDQSxpQkFBaUIsbUJBQU8sQ0FBQyw4RUFBWTtBQUNyQyw2Q0FBNEMsRUFBRSxxQ0FBcUMsZ0NBQWdDLEVBQUM7QUFDcEgsb0JBQW9CLG1CQUFPLENBQUMsb0ZBQWU7QUFDM0MsZ0RBQStDLEVBQUUscUNBQXFDLHNDQUFzQyxFQUFDO0FBQzdIO0FBQ0Esd0JBQXdCLG1CQUFPLENBQUMsNEZBQW1CO0FBQ25ELG1EQUFrRCxFQUFFLHFDQUFxQyw2Q0FBNkMsRUFBQztBQUN2SSxxQkFBcUIsbUJBQU8sQ0FBQyxzRkFBZ0I7QUFDN0MsZ0RBQStDLEVBQUUscUNBQXFDLHVDQUF1QyxFQUFDO0FBQzlIO0FBQ0Esc0JBQXNCLG1CQUFPLENBQUMsd0ZBQWlCO0FBQy9DLGlEQUFnRCxFQUFFLHFDQUFxQyx5Q0FBeUMsRUFBQztBQUNqSSxvREFBbUQsRUFBRSxxQ0FBcUMsNENBQTRDLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFuc2NlbmRhbmNlLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczUvaW5kZXguanM/MGY4MiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlUmVmVG9DYWxsYmFjayA9IGV4cG9ydHMucmVmVG9DYWxsYmFjayA9IGV4cG9ydHMudHJhbnNmb3JtUmVmID0gZXhwb3J0cy51c2VUcmFuc2Zvcm1SZWYgPSBleHBvcnRzLnVzZU1lcmdlUmVmcyA9IGV4cG9ydHMubWVyZ2VSZWZzID0gZXhwb3J0cy5jcmVhdGVDYWxsYmFja1JlZiA9IGV4cG9ydHMudXNlQ2FsbGJhY2tSZWYgPSBleHBvcnRzLmFzc2lnblJlZiA9IHZvaWQgMDtcbnZhciBhc3NpZ25SZWZfMSA9IHJlcXVpcmUoXCIuL2Fzc2lnblJlZlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcImFzc2lnblJlZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gYXNzaWduUmVmXzEuYXNzaWduUmVmOyB9IH0pO1xuLy8gY2FsbGJhY2sgcmVmXG52YXIgdXNlUmVmXzEgPSByZXF1aXJlKFwiLi91c2VSZWZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ1c2VDYWxsYmFja1JlZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXNlUmVmXzEudXNlQ2FsbGJhY2tSZWY7IH0gfSk7XG52YXIgY3JlYXRlUmVmXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVSZWZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJjcmVhdGVDYWxsYmFja1JlZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gY3JlYXRlUmVmXzEuY3JlYXRlQ2FsbGJhY2tSZWY7IH0gfSk7XG4vLyBtZXJnZSByZWZcbnZhciBtZXJnZVJlZl8xID0gcmVxdWlyZShcIi4vbWVyZ2VSZWZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJtZXJnZVJlZnNcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG1lcmdlUmVmXzEubWVyZ2VSZWZzOyB9IH0pO1xudmFyIHVzZU1lcmdlUmVmXzEgPSByZXF1aXJlKFwiLi91c2VNZXJnZVJlZlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInVzZU1lcmdlUmVmc1wiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdXNlTWVyZ2VSZWZfMS51c2VNZXJnZVJlZnM7IH0gfSk7XG4vLyB0cmFuc2Zvcm0gcmVmXG52YXIgdXNlVHJhbnNmb3JtUmVmXzEgPSByZXF1aXJlKFwiLi91c2VUcmFuc2Zvcm1SZWZcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJ1c2VUcmFuc2Zvcm1SZWZcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHVzZVRyYW5zZm9ybVJlZl8xLnVzZVRyYW5zZm9ybVJlZjsgfSB9KTtcbnZhciB0cmFuc2Zvcm1SZWZfMSA9IHJlcXVpcmUoXCIuL3RyYW5zZm9ybVJlZlwiKTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInRyYW5zZm9ybVJlZlwiLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZnVuY3Rpb24gKCkgeyByZXR1cm4gdHJhbnNmb3JtUmVmXzEudHJhbnNmb3JtUmVmOyB9IH0pO1xuLy8gcmVmVG9DYWxsYmFja1xudmFyIHJlZlRvQ2FsbGJhY2tfMSA9IHJlcXVpcmUoXCIuL3JlZlRvQ2FsbGJhY2tcIik7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJyZWZUb0NhbGxiYWNrXCIsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBmdW5jdGlvbiAoKSB7IHJldHVybiByZWZUb0NhbGxiYWNrXzEucmVmVG9DYWxsYmFjazsgfSB9KTtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcInVzZVJlZlRvQ2FsbGJhY2tcIiwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHJlZlRvQ2FsbGJhY2tfMS51c2VSZWZUb0NhbGxiYWNrOyB9IH0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/index.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/mergeRef.js":
/*!************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/mergeRef.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.mergeRefs = void 0;\nvar assignRef_1 = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\");\nvar createRef_1 = __webpack_require__(/*! ./createRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/createRef.js\");\n/**\n * Merges two or more refs together providing a single interface to set their value\n * @param {RefObject|Ref} refs\n * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}\n *\n * @see {@link useMergeRefs} to be used in ReactComponents\n * @example\n * const Component = React.forwardRef((props, ref) => {\n *   const ownRef = useRef();\n *   const domRef = mergeRefs([ref, ownRef]); // 👈 merge together\n *   return <div ref={domRef}>...</div>\n * }\n */\nfunction mergeRefs(refs) {\n    return (0, createRef_1.createCallbackRef)(function (newValue) { return refs.forEach(function (ref) { return (0, assignRef_1.assignRef)(ref, newValue); }); });\n}\nexports.mergeRefs = mergeRefs;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9tZXJnZVJlZi5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxpQkFBaUI7QUFDakIsa0JBQWtCLG1CQUFPLENBQUMsZ0ZBQWE7QUFDdkMsa0JBQWtCLG1CQUFPLENBQUMsZ0ZBQWE7QUFDdkM7QUFDQTtBQUNBLFdBQVcsZUFBZTtBQUMxQixhQUFhLGtCQUFrQiw4Q0FBOEM7QUFDN0U7QUFDQSxTQUFTLG9CQUFvQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEM7QUFDOUMsc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0VBQW9FLHFDQUFxQyxtREFBbUQsSUFBSTtBQUNoSztBQUNBLGlCQUFpQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYW5zY2VuZGFuY2UvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9tZXJnZVJlZi5qcz9jYjdjIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy5tZXJnZVJlZnMgPSB2b2lkIDA7XG52YXIgYXNzaWduUmVmXzEgPSByZXF1aXJlKFwiLi9hc3NpZ25SZWZcIik7XG52YXIgY3JlYXRlUmVmXzEgPSByZXF1aXJlKFwiLi9jcmVhdGVSZWZcIik7XG4vKipcbiAqIE1lcmdlcyB0d28gb3IgbW9yZSByZWZzIHRvZ2V0aGVyIHByb3ZpZGluZyBhIHNpbmdsZSBpbnRlcmZhY2UgdG8gc2V0IHRoZWlyIHZhbHVlXG4gKiBAcGFyYW0ge1JlZk9iamVjdHxSZWZ9IHJlZnNcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fSAtIGEgbmV3IHJlZiwgd2hpY2ggdHJhbnNsYXRlcyBhbGwgY2hhbmdlcyB0byB7cmVmc31cbiAqXG4gKiBAc2VlIHtAbGluayB1c2VNZXJnZVJlZnN9IHRvIGJlIHVzZWQgaW4gUmVhY3RDb21wb25lbnRzXG4gKiBAZXhhbXBsZVxuICogY29uc3QgQ29tcG9uZW50ID0gUmVhY3QuZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT4ge1xuICogICBjb25zdCBvd25SZWYgPSB1c2VSZWYoKTtcbiAqICAgY29uc3QgZG9tUmVmID0gbWVyZ2VSZWZzKFtyZWYsIG93blJlZl0pOyAvLyDwn5GIIG1lcmdlIHRvZ2V0aGVyXG4gKiAgIHJldHVybiA8ZGl2IHJlZj17ZG9tUmVmfT4uLi48L2Rpdj5cbiAqIH1cbiAqL1xuZnVuY3Rpb24gbWVyZ2VSZWZzKHJlZnMpIHtcbiAgICByZXR1cm4gKDAsIGNyZWF0ZVJlZl8xLmNyZWF0ZUNhbGxiYWNrUmVmKShmdW5jdGlvbiAobmV3VmFsdWUpIHsgcmV0dXJuIHJlZnMuZm9yRWFjaChmdW5jdGlvbiAocmVmKSB7IHJldHVybiAoMCwgYXNzaWduUmVmXzEuYXNzaWduUmVmKShyZWYsIG5ld1ZhbHVlKTsgfSk7IH0pO1xufVxuZXhwb3J0cy5tZXJnZVJlZnMgPSBtZXJnZVJlZnM7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/mergeRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/refToCallback.js":
/*!*****************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/refToCallback.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useRefToCallback = exports.refToCallback = void 0;\n/**\n * Unmemoized version of {@link useRefToCallback}\n * @see {@link useRefToCallback}\n * @param ref\n */\nfunction refToCallback(ref) {\n    return function (newValue) {\n        if (typeof ref === 'function') {\n            ref(newValue);\n        }\n        else if (ref) {\n            ref.current = newValue;\n        }\n    };\n}\nexports.refToCallback = refToCallback;\nvar nullCallback = function () { return null; };\n// lets maintain a weak ref to, well, ref :)\n// not using `kashe` to keep this package small\nvar weakMem = new WeakMap();\nvar weakMemoize = function (ref) {\n    var usedRef = ref || nullCallback;\n    var storedRef = weakMem.get(usedRef);\n    if (storedRef) {\n        return storedRef;\n    }\n    var cb = refToCallback(usedRef);\n    weakMem.set(usedRef, cb);\n    return cb;\n};\n/**\n * Transforms a given `ref` into `callback`.\n *\n * To transform `callback` into ref use {@link useCallbackRef|useCallbackRef(undefined, callback)}\n *\n * @param {ReactRef} ref\n * @returns {Function}\n *\n * @see https://github.com/theKashey/use-callback-ref#reftocallback\n *\n * @example\n * const ref = useRef(0);\n * const setRef = useRefToCallback(ref);\n * 👉 setRef(10);\n * ✅ ref.current === 10\n */\nfunction useRefToCallback(ref) {\n    return weakMemoize(ref);\n}\nexports.useRefToCallback = useRefToCallback;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS9yZWZUb0NhbGxiYWNrLmpzIiwibWFwcGluZ3MiOiJBQUFhO0FBQ2IsOENBQTZDLEVBQUUsYUFBYSxFQUFDO0FBQzdELHdCQUF3QixHQUFHLHFCQUFxQjtBQUNoRDtBQUNBLDBCQUEwQjtBQUMxQixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCLGlDQUFpQztBQUNqQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdHJhbnNjZW5kYW5jZS8uL25vZGVfbW9kdWxlcy91c2UtY2FsbGJhY2stcmVmL2Rpc3QvZXM1L3JlZlRvQ2FsbGJhY2suanM/OGVlYiJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlUmVmVG9DYWxsYmFjayA9IGV4cG9ydHMucmVmVG9DYWxsYmFjayA9IHZvaWQgMDtcbi8qKlxuICogVW5tZW1vaXplZCB2ZXJzaW9uIG9mIHtAbGluayB1c2VSZWZUb0NhbGxiYWNrfVxuICogQHNlZSB7QGxpbmsgdXNlUmVmVG9DYWxsYmFja31cbiAqIEBwYXJhbSByZWZcbiAqL1xuZnVuY3Rpb24gcmVmVG9DYWxsYmFjayhyZWYpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVmID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZWYobmV3VmFsdWUpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlZikge1xuICAgICAgICAgICAgcmVmLmN1cnJlbnQgPSBuZXdWYWx1ZTtcbiAgICAgICAgfVxuICAgIH07XG59XG5leHBvcnRzLnJlZlRvQ2FsbGJhY2sgPSByZWZUb0NhbGxiYWNrO1xudmFyIG51bGxDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIG51bGw7IH07XG4vLyBsZXRzIG1haW50YWluIGEgd2VhayByZWYgdG8sIHdlbGwsIHJlZiA6KVxuLy8gbm90IHVzaW5nIGBrYXNoZWAgdG8ga2VlcCB0aGlzIHBhY2thZ2Ugc21hbGxcbnZhciB3ZWFrTWVtID0gbmV3IFdlYWtNYXAoKTtcbnZhciB3ZWFrTWVtb2l6ZSA9IGZ1bmN0aW9uIChyZWYpIHtcbiAgICB2YXIgdXNlZFJlZiA9IHJlZiB8fCBudWxsQ2FsbGJhY2s7XG4gICAgdmFyIHN0b3JlZFJlZiA9IHdlYWtNZW0uZ2V0KHVzZWRSZWYpO1xuICAgIGlmIChzdG9yZWRSZWYpIHtcbiAgICAgICAgcmV0dXJuIHN0b3JlZFJlZjtcbiAgICB9XG4gICAgdmFyIGNiID0gcmVmVG9DYWxsYmFjayh1c2VkUmVmKTtcbiAgICB3ZWFrTWVtLnNldCh1c2VkUmVmLCBjYik7XG4gICAgcmV0dXJuIGNiO1xufTtcbi8qKlxuICogVHJhbnNmb3JtcyBhIGdpdmVuIGByZWZgIGludG8gYGNhbGxiYWNrYC5cbiAqXG4gKiBUbyB0cmFuc2Zvcm0gYGNhbGxiYWNrYCBpbnRvIHJlZiB1c2Uge0BsaW5rIHVzZUNhbGxiYWNrUmVmfHVzZUNhbGxiYWNrUmVmKHVuZGVmaW5lZCwgY2FsbGJhY2spfVxuICpcbiAqIEBwYXJhbSB7UmVhY3RSZWZ9IHJlZlxuICogQHJldHVybnMge0Z1bmN0aW9ufVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3JlZnRvY2FsbGJhY2tcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgcmVmID0gdXNlUmVmKDApO1xuICogY29uc3Qgc2V0UmVmID0gdXNlUmVmVG9DYWxsYmFjayhyZWYpO1xuICog8J+RiSBzZXRSZWYoMTApO1xuICog4pyFIHJlZi5jdXJyZW50ID09PSAxMFxuICovXG5mdW5jdGlvbiB1c2VSZWZUb0NhbGxiYWNrKHJlZikge1xuICAgIHJldHVybiB3ZWFrTWVtb2l6ZShyZWYpO1xufVxuZXhwb3J0cy51c2VSZWZUb0NhbGxiYWNrID0gdXNlUmVmVG9DYWxsYmFjaztcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/refToCallback.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/transformRef.js":
/*!****************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/transformRef.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.transformRef = void 0;\nvar assignRef_1 = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\");\nvar createRef_1 = __webpack_require__(/*! ./createRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/createRef.js\");\n/**\n * Transforms one ref to another\n * @example\n * ```tsx\n * const ResizableWithRef = forwardRef((props, ref) =>\n *   <Resizable {...props} ref={transformRef(ref, i => i ? i.resizable : null)}/>\n * );\n * ```\n */\nfunction transformRef(ref, transformer) {\n    return (0, createRef_1.createCallbackRef)(function (value) { return (0, assignRef_1.assignRef)(ref, transformer(value)); });\n}\nexports.transformRef = transformRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS90cmFuc2Zvcm1SZWYuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsb0JBQW9CO0FBQ3BCLGtCQUFrQixtQkFBTyxDQUFDLGdGQUFhO0FBQ3ZDLGtCQUFrQixtQkFBTyxDQUFDLGdGQUFhO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsVUFBVSxLQUFLLCtDQUErQztBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSw2REFBNkQ7QUFDOUg7QUFDQSxvQkFBb0IiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFuc2NlbmRhbmNlLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczUvdHJhbnNmb3JtUmVmLmpzPzAwYTYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnRyYW5zZm9ybVJlZiA9IHZvaWQgMDtcbnZhciBhc3NpZ25SZWZfMSA9IHJlcXVpcmUoXCIuL2Fzc2lnblJlZlwiKTtcbnZhciBjcmVhdGVSZWZfMSA9IHJlcXVpcmUoXCIuL2NyZWF0ZVJlZlwiKTtcbi8qKlxuICogVHJhbnNmb3JtcyBvbmUgcmVmIHRvIGFub3RoZXJcbiAqIEBleGFtcGxlXG4gKiBgYGB0c3hcbiAqIGNvbnN0IFJlc2l6YWJsZVdpdGhSZWYgPSBmb3J3YXJkUmVmKChwcm9wcywgcmVmKSA9PlxuICogICA8UmVzaXphYmxlIHsuLi5wcm9wc30gcmVmPXt0cmFuc2Zvcm1SZWYocmVmLCBpID0+IGkgPyBpLnJlc2l6YWJsZSA6IG51bGwpfS8+XG4gKiApO1xuICogYGBgXG4gKi9cbmZ1bmN0aW9uIHRyYW5zZm9ybVJlZihyZWYsIHRyYW5zZm9ybWVyKSB7XG4gICAgcmV0dXJuICgwLCBjcmVhdGVSZWZfMS5jcmVhdGVDYWxsYmFja1JlZikoZnVuY3Rpb24gKHZhbHVlKSB7IHJldHVybiAoMCwgYXNzaWduUmVmXzEuYXNzaWduUmVmKShyZWYsIHRyYW5zZm9ybWVyKHZhbHVlKSk7IH0pO1xufVxuZXhwb3J0cy50cmFuc2Zvcm1SZWYgPSB0cmFuc2Zvcm1SZWY7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/transformRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/useMergeRef.js":
/*!***************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/useMergeRef.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useMergeRefs = void 0;\nvar assignRef_1 = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\");\nvar useRef_1 = __webpack_require__(/*! ./useRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/useRef.js\");\n/**\n * Merges two or more refs together providing a single interface to set their value\n * @param {RefObject|Ref} refs\n * @returns {MutableRefObject} - a new ref, which translates all changes to {refs}\n *\n * @see {@link mergeRefs} a version without buit-in memoization\n * @see https://github.com/theKashey/use-callback-ref#usemergerefs\n * @example\n * const Component = React.forwardRef((props, ref) => {\n *   const ownRef = useRef();\n *   const domRef = useMergeRefs([ref, ownRef]); // 👈 merge together\n *   return <div ref={domRef}>...</div>\n * }\n */\nfunction useMergeRefs(refs, defaultValue) {\n    return (0, useRef_1.useCallbackRef)(defaultValue || null, function (newValue) { return refs.forEach(function (ref) { return (0, assignRef_1.assignRef)(ref, newValue); }); });\n}\nexports.useMergeRefs = useMergeRefs;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS91c2VNZXJnZVJlZi5qcyIsIm1hcHBpbmdzIjoiQUFBYTtBQUNiLDhDQUE2QyxFQUFFLGFBQWEsRUFBQztBQUM3RCxvQkFBb0I7QUFDcEIsa0JBQWtCLG1CQUFPLENBQUMsZ0ZBQWE7QUFDdkMsZUFBZSxtQkFBTyxDQUFDLDBFQUFVO0FBQ2pDO0FBQ0E7QUFDQSxXQUFXLGVBQWU7QUFDMUIsYUFBYSxrQkFBa0IsOENBQThDO0FBQzdFO0FBQ0EsU0FBUyxpQkFBaUI7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpREFBaUQ7QUFDakQsc0JBQXNCLE9BQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0Esb0ZBQW9GLHFDQUFxQyxtREFBbUQsSUFBSTtBQUNoTDtBQUNBLG9CQUFvQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYW5zY2VuZGFuY2UvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS91c2VNZXJnZVJlZi5qcz8yOWI5Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuZXhwb3J0cy51c2VNZXJnZVJlZnMgPSB2b2lkIDA7XG52YXIgYXNzaWduUmVmXzEgPSByZXF1aXJlKFwiLi9hc3NpZ25SZWZcIik7XG52YXIgdXNlUmVmXzEgPSByZXF1aXJlKFwiLi91c2VSZWZcIik7XG4vKipcbiAqIE1lcmdlcyB0d28gb3IgbW9yZSByZWZzIHRvZ2V0aGVyIHByb3ZpZGluZyBhIHNpbmdsZSBpbnRlcmZhY2UgdG8gc2V0IHRoZWlyIHZhbHVlXG4gKiBAcGFyYW0ge1JlZk9iamVjdHxSZWZ9IHJlZnNcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fSAtIGEgbmV3IHJlZiwgd2hpY2ggdHJhbnNsYXRlcyBhbGwgY2hhbmdlcyB0byB7cmVmc31cbiAqXG4gKiBAc2VlIHtAbGluayBtZXJnZVJlZnN9IGEgdmVyc2lvbiB3aXRob3V0IGJ1aXQtaW4gbWVtb2l6YXRpb25cbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZW1lcmdlcmVmc1xuICogQGV4YW1wbGVcbiAqIGNvbnN0IENvbXBvbmVudCA9IFJlYWN0LmZvcndhcmRSZWYoKHByb3BzLCByZWYpID0+IHtcbiAqICAgY29uc3Qgb3duUmVmID0gdXNlUmVmKCk7XG4gKiAgIGNvbnN0IGRvbVJlZiA9IHVzZU1lcmdlUmVmcyhbcmVmLCBvd25SZWZdKTsgLy8g8J+RiCBtZXJnZSB0b2dldGhlclxuICogICByZXR1cm4gPGRpdiByZWY9e2RvbVJlZn0+Li4uPC9kaXY+XG4gKiB9XG4gKi9cbmZ1bmN0aW9uIHVzZU1lcmdlUmVmcyhyZWZzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICByZXR1cm4gKDAsIHVzZVJlZl8xLnVzZUNhbGxiYWNrUmVmKShkZWZhdWx0VmFsdWUgfHwgbnVsbCwgZnVuY3Rpb24gKG5ld1ZhbHVlKSB7IHJldHVybiByZWZzLmZvckVhY2goZnVuY3Rpb24gKHJlZikgeyByZXR1cm4gKDAsIGFzc2lnblJlZl8xLmFzc2lnblJlZikocmVmLCBuZXdWYWx1ZSk7IH0pOyB9KTtcbn1cbmV4cG9ydHMudXNlTWVyZ2VSZWZzID0gdXNlTWVyZ2VSZWZzO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/useMergeRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/useRef.js":
/*!**********************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/useRef.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useCallbackRef = void 0;\nvar react_1 = __webpack_require__(/*! react */ \"(ssr)/./node_modules/next/dist/server/future/route-modules/app-page/vendored/ssr/react.js\");\n/**\n * creates a MutableRef with ref change callback\n * @param initialValue - initial ref value\n * @param {Function} callback - a callback to run when value changes\n *\n * @example\n * const ref = useCallbackRef(0, (newValue, oldValue) => console.log(oldValue, '->', newValue);\n * ref.current = 1;\n * // prints 0 -> 1\n *\n * @see https://reactjs.org/docs/hooks-reference.html#useref\n * @see https://github.com/theKashey/use-callback-ref#usecallbackref---to-replace-reactuseref\n * @returns {MutableRefObject}\n */\nfunction useCallbackRef(initialValue, callback) {\n    var ref = (0, react_1.useState)(function () { return ({\n        // value\n        value: initialValue,\n        // last callback\n        callback: callback,\n        // \"memoized\" public interface\n        facade: {\n            get current() {\n                return ref.value;\n            },\n            set current(value) {\n                var last = ref.value;\n                if (last !== value) {\n                    ref.value = value;\n                    ref.callback(value, last);\n                }\n            },\n        },\n    }); })[0];\n    // update callback\n    ref.callback = callback;\n    return ref.facade;\n}\nexports.useCallbackRef = useCallbackRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS91c2VSZWYuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0Qsc0JBQXNCO0FBQ3RCLGNBQWMsbUJBQU8sQ0FBQyx3R0FBTztBQUM3QjtBQUNBO0FBQ0E7QUFDQSxXQUFXLFVBQVU7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0Esa0RBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiLFNBQVM7QUFDVCxLQUFLLElBQUk7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQiIsInNvdXJjZXMiOlsid2VicGFjazovL3RyYW5zY2VuZGFuY2UvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS91c2VSZWYuanM/OTdmMSJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMudXNlQ2FsbGJhY2tSZWYgPSB2b2lkIDA7XG52YXIgcmVhY3RfMSA9IHJlcXVpcmUoXCJyZWFjdFwiKTtcbi8qKlxuICogY3JlYXRlcyBhIE11dGFibGVSZWYgd2l0aCByZWYgY2hhbmdlIGNhbGxiYWNrXG4gKiBAcGFyYW0gaW5pdGlhbFZhbHVlIC0gaW5pdGlhbCByZWYgdmFsdWVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIC0gYSBjYWxsYmFjayB0byBydW4gd2hlbiB2YWx1ZSBjaGFuZ2VzXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHJlZiA9IHVzZUNhbGxiYWNrUmVmKDAsIChuZXdWYWx1ZSwgb2xkVmFsdWUpID0+IGNvbnNvbGUubG9nKG9sZFZhbHVlLCAnLT4nLCBuZXdWYWx1ZSk7XG4gKiByZWYuY3VycmVudCA9IDE7XG4gKiAvLyBwcmludHMgMCAtPiAxXG4gKlxuICogQHNlZSBodHRwczovL3JlYWN0anMub3JnL2RvY3MvaG9va3MtcmVmZXJlbmNlLmh0bWwjdXNlcmVmXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90aGVLYXNoZXkvdXNlLWNhbGxiYWNrLXJlZiN1c2VjYWxsYmFja3JlZi0tLXRvLXJlcGxhY2UtcmVhY3R1c2VyZWZcbiAqIEByZXR1cm5zIHtNdXRhYmxlUmVmT2JqZWN0fVxuICovXG5mdW5jdGlvbiB1c2VDYWxsYmFja1JlZihpbml0aWFsVmFsdWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIHJlZiA9ICgwLCByZWFjdF8xLnVzZVN0YXRlKShmdW5jdGlvbiAoKSB7IHJldHVybiAoe1xuICAgICAgICAvLyB2YWx1ZVxuICAgICAgICB2YWx1ZTogaW5pdGlhbFZhbHVlLFxuICAgICAgICAvLyBsYXN0IGNhbGxiYWNrXG4gICAgICAgIGNhbGxiYWNrOiBjYWxsYmFjayxcbiAgICAgICAgLy8gXCJtZW1vaXplZFwiIHB1YmxpYyBpbnRlcmZhY2VcbiAgICAgICAgZmFjYWRlOiB7XG4gICAgICAgICAgICBnZXQgY3VycmVudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVmLnZhbHVlO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldCBjdXJyZW50KHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdmFyIGxhc3QgPSByZWYudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGxhc3QgIT09IHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlZi52YWx1ZSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgICAgICByZWYuY2FsbGJhY2sodmFsdWUsIGxhc3QpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgfSk7IH0pWzBdO1xuICAgIC8vIHVwZGF0ZSBjYWxsYmFja1xuICAgIHJlZi5jYWxsYmFjayA9IGNhbGxiYWNrO1xuICAgIHJldHVybiByZWYuZmFjYWRlO1xufVxuZXhwb3J0cy51c2VDYWxsYmFja1JlZiA9IHVzZUNhbGxiYWNrUmVmO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/useRef.js\n");

/***/ }),

/***/ "(ssr)/./node_modules/use-callback-ref/dist/es5/useTransformRef.js":
/*!*******************************************************************!*\
  !*** ./node_modules/use-callback-ref/dist/es5/useTransformRef.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useTransformRef = void 0;\nvar assignRef_1 = __webpack_require__(/*! ./assignRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/assignRef.js\");\nvar useRef_1 = __webpack_require__(/*! ./useRef */ \"(ssr)/./node_modules/use-callback-ref/dist/es5/useRef.js\");\n/**\n * Create a _lense_ on Ref, making it possible to transform ref value\n * @param {ReactRef} ref\n * @param {Function} transformer. 👉 Ref would be __NOT updated__ on `transformer` update.\n * @returns {RefObject}\n *\n * @see https://github.com/theKashey/use-callback-ref#usetransformref-to-replace-reactuseimperativehandle\n * @example\n *\n * const ResizableWithRef = forwardRef((props, ref) =>\n *  <Resizable {...props} ref={useTransformRef(ref, i => i ? i.resizable : null)}/>\n * );\n */\nfunction useTransformRef(ref, transformer) {\n    return (0, useRef_1.useCallbackRef)(null, function (value) { return (0, assignRef_1.assignRef)(ref, transformer(value)); });\n}\nexports.useTransformRef = useTransformRef;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvdXNlLWNhbGxiYWNrLXJlZi9kaXN0L2VzNS91c2VUcmFuc2Zvcm1SZWYuanMiLCJtYXBwaW5ncyI6IkFBQWE7QUFDYiw4Q0FBNkMsRUFBRSxhQUFhLEVBQUM7QUFDN0QsdUJBQXVCO0FBQ3ZCLGtCQUFrQixtQkFBTyxDQUFDLGdGQUFhO0FBQ3ZDLGVBQWUsbUJBQU8sQ0FBQywwRUFBVTtBQUNqQztBQUNBO0FBQ0EsV0FBVyxVQUFVO0FBQ3JCLFdBQVcsVUFBVTtBQUNyQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixVQUFVLEtBQUssa0RBQWtEO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLGlFQUFpRSw2REFBNkQ7QUFDOUg7QUFDQSx1QkFBdUIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90cmFuc2NlbmRhbmNlLy4vbm9kZV9tb2R1bGVzL3VzZS1jYWxsYmFjay1yZWYvZGlzdC9lczUvdXNlVHJhbnNmb3JtUmVmLmpzPzg1ZDYiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnVzZVRyYW5zZm9ybVJlZiA9IHZvaWQgMDtcbnZhciBhc3NpZ25SZWZfMSA9IHJlcXVpcmUoXCIuL2Fzc2lnblJlZlwiKTtcbnZhciB1c2VSZWZfMSA9IHJlcXVpcmUoXCIuL3VzZVJlZlwiKTtcbi8qKlxuICogQ3JlYXRlIGEgX2xlbnNlXyBvbiBSZWYsIG1ha2luZyBpdCBwb3NzaWJsZSB0byB0cmFuc2Zvcm0gcmVmIHZhbHVlXG4gKiBAcGFyYW0ge1JlYWN0UmVmfSByZWZcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybWVyLiDwn5GJIFJlZiB3b3VsZCBiZSBfX05PVCB1cGRhdGVkX18gb24gYHRyYW5zZm9ybWVyYCB1cGRhdGUuXG4gKiBAcmV0dXJucyB7UmVmT2JqZWN0fVxuICpcbiAqIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3RoZUthc2hleS91c2UtY2FsbGJhY2stcmVmI3VzZXRyYW5zZm9ybXJlZi10by1yZXBsYWNlLXJlYWN0dXNlaW1wZXJhdGl2ZWhhbmRsZVxuICogQGV4YW1wbGVcbiAqXG4gKiBjb25zdCBSZXNpemFibGVXaXRoUmVmID0gZm9yd2FyZFJlZigocHJvcHMsIHJlZikgPT5cbiAqICA8UmVzaXphYmxlIHsuLi5wcm9wc30gcmVmPXt1c2VUcmFuc2Zvcm1SZWYocmVmLCBpID0+IGkgPyBpLnJlc2l6YWJsZSA6IG51bGwpfS8+XG4gKiApO1xuICovXG5mdW5jdGlvbiB1c2VUcmFuc2Zvcm1SZWYocmVmLCB0cmFuc2Zvcm1lcikge1xuICAgIHJldHVybiAoMCwgdXNlUmVmXzEudXNlQ2FsbGJhY2tSZWYpKG51bGwsIGZ1bmN0aW9uICh2YWx1ZSkgeyByZXR1cm4gKDAsIGFzc2lnblJlZl8xLmFzc2lnblJlZikocmVmLCB0cmFuc2Zvcm1lcih2YWx1ZSkpOyB9KTtcbn1cbmV4cG9ydHMudXNlVHJhbnNmb3JtUmVmID0gdXNlVHJhbnNmb3JtUmVmO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/use-callback-ref/dist/es5/useTransformRef.js\n");

/***/ })

};
;