// dist/esm/entry.js
import * as pdfjs3 from "pdfjs-dist";

// dist/esm/Document.js
import _extends from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import _classCallCheck2 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass2 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import React2, { PureComponent } from "react";
import makeEventProps from "make-event-props";
import makeCancellable from "make-cancellable-promise";
import mergeClassNames from "merge-class-names";
import {
  PDFDataRangeTransport,
  getDocument
} from "pdfjs-dist";

// dist/esm/DocumentContext.js
import { createContext } from "react";
var DocumentContext_default = /* @__PURE__ */ createContext(null);

// dist/esm/Message.js
import React from "react";
function Message(_ref) {
  var children = _ref.children, type = _ref.type;
  return /* @__PURE__ */ React.createElement("div", {
    className: "react-pdf__message react-pdf__message--".concat(type)
  }, children);
}

// dist/esm/LinkService.js
import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import { addLinkAttributes as _addLinkAttributes, LinkTarget } from "pdfjs-dist";
var LinkService = /* @__PURE__ */ function() {
  function LinkService2() {
    _classCallCheck(this, LinkService2);
    this.externalLinkTarget = null;
    this.externalLinkRel = null;
    this.externalLinkEnabled = true;
  }
  _createClass(LinkService2, [{
    key: "setDocument",
    value: function setDocument(pdfDocument) {
      this.pdfDocument = pdfDocument;
    }
  }, {
    key: "setViewer",
    value: function setViewer(pdfViewer) {
      this.pdfViewer = pdfViewer;
    }
  }, {
    key: "setHistory",
    value: function setHistory() {
    }
  }, {
    key: "pagesCount",
    get: function get() {
      return this.pdfDocument ? this.pdfDocument.numPages : 0;
    }
  }, {
    key: "page",
    get: function get() {
      return this.pdfViewer.currentPageNumber;
    },
    set: function set(value) {
      this.pdfViewer.currentPageNumber = value;
    }
  }, {
    key: "rotation",
    get: function get() {
      return 0;
    },
    set: function set(value) {
    }
  }, {
    key: "addLinkAttributes",
    value: function addLinkAttributes(link, url) {
      var newWindow = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      _addLinkAttributes(link, {
        url,
        target: newWindow ? LinkTarget.BLANK : this.externalLinkTarget,
        rel: this.externalLinkRel,
        enabled: this.externalLinkEnabled
      });
    }
  }, {
    key: "goToDestination",
    value: function goToDestination(dest) {
      var _this = this;
      new Promise(function(resolve) {
        if (typeof dest === "string") {
          _this.pdfDocument.getDestination(dest).then(resolve);
        } else {
          dest.then(resolve);
        }
      }).then(function(explicitDest) {
        if (!Array.isArray(explicitDest)) {
          throw new Error('"'.concat(explicitDest, '" is not a valid destination array.'));
        }
        var destRef = explicitDest[0];
        new Promise(function(resolve) {
          if (destRef instanceof Object) {
            _this.pdfDocument.getPageIndex(destRef).then(function(pageIndex) {
              resolve(pageIndex + 1);
            })["catch"](function() {
              throw new Error('"'.concat(destRef, '" is not a valid page reference.'));
            });
          } else if (typeof destRef === "number") {
            resolve(destRef + 1);
          } else {
            throw new Error('"'.concat(destRef, '" is not a valid destination reference.'));
          }
        }).then(function(pageNumber) {
          if (!pageNumber || pageNumber < 1 || pageNumber > _this.pagesCount) {
            throw new Error('"'.concat(pageNumber, '" is not a valid page number.'));
          }
          _this.pdfViewer.scrollPageIntoView({
            pageNumber
          });
        });
      });
    }
  }, {
    key: "navigateTo",
    value: function navigateTo(dest) {
      this.goToDestination(dest);
    }
  }, {
    key: "goToPage",
    value: function goToPage() {
    }
  }, {
    key: "getDestinationHash",
    value: function getDestinationHash() {
      return "#";
    }
  }, {
    key: "getAnchorUrl",
    value: function getAnchorUrl() {
      return "#";
    }
  }, {
    key: "setHash",
    value: function setHash() {
    }
  }, {
    key: "executeNamedAction",
    value: function executeNamedAction() {
    }
  }, {
    key: "cachePageRef",
    value: function cachePageRef() {
    }
  }, {
    key: "isPageVisible",
    value: function isPageVisible() {
      return true;
    }
  }, {
    key: "isPageCached",
    value: function isPageCached() {
      return true;
    }
  }]);
  return LinkService2;
}();

// dist/esm/PasswordResponses.js
var PasswordResponses = {
  NEED_PASSWORD: 1,
  INCORRECT_PASSWORD: 2
};
var PasswordResponses_default = PasswordResponses;

// dist/esm/shared/utils.js
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
var isBrowser = typeof window !== "undefined";
var isLocalFileSystem = isBrowser && window.location.protocol === "file:";
var isProduction = false;
function isDefined(variable) {
  return typeof variable !== "undefined";
}
function isProvided(variable) {
  return isDefined(variable) && variable !== null;
}
function isString(variable) {
  return typeof variable === "string";
}
function isArrayBuffer(variable) {
  return variable instanceof ArrayBuffer;
}
function isBlob(variable) {
  if (!isBrowser) {
    throw new Error("Attempted to check if a variable is a Blob on a non-browser environment.");
  }
  return variable instanceof Blob;
}
function isFile(variable) {
  if (!isBrowser) {
    throw new Error("Attempted to check if a variable is a File on a non-browser environment.");
  }
  return variable instanceof File;
}
function isDataURI(str) {
  return isString(str) && /^data:/.test(str);
}
function dataURItoByteString(dataURI) {
  if (!isDataURI(dataURI)) {
    throw new Error("Invalid data URI.");
  }
  var _dataURI$split = dataURI.split(","), _dataURI$split2 = _slicedToArray(_dataURI$split, 2), headersString = _dataURI$split2[0], dataString = _dataURI$split2[1];
  var headers = headersString.split(";");
  if (headers.indexOf("base64") !== -1) {
    return atob(dataString);
  }
  return unescape(dataString);
}
function getPixelRatio() {
  return isBrowser && window.devicePixelRatio || 1;
}
function consoleOnDev(method) {
  if (!isProduction) {
    var _console;
    for (var _len = arguments.length, message = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      message[_key - 1] = arguments[_key];
    }
    (_console = console)[method].apply(_console, message);
  }
}
function warnOnDev() {
  for (var _len2 = arguments.length, message = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    message[_key2] = arguments[_key2];
  }
  consoleOnDev.apply(void 0, ["warn"].concat(message));
}
function errorOnDev() {
  for (var _len3 = arguments.length, message = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    message[_key3] = arguments[_key3];
  }
  consoleOnDev.apply(void 0, ["error"].concat(message));
}
function displayCORSWarning() {
  if (isLocalFileSystem) {
    warnOnDev("Loading PDF as base64 strings/URLs might not work on protocols other than HTTP/HTTPS. On Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.");
  }
}
function cancelRunningTask(runningTask) {
  if (runningTask && runningTask.cancel)
    runningTask.cancel();
}
function makePageCallback(page, scale) {
  Object.defineProperty(page, "width", {
    get: function get() {
      return this.view[2] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "height", {
    get: function get() {
      return this.view[3] * scale;
    },
    configurable: true
  });
  Object.defineProperty(page, "originalWidth", {
    get: function get() {
      return this.view[2];
    },
    configurable: true
  });
  Object.defineProperty(page, "originalHeight", {
    get: function get() {
      return this.view[3];
    },
    configurable: true
  });
  return page;
}
function isCancelException(error) {
  return error.name === "RenderingCancelledException";
}
function loadFromFile(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.onload = function() {
      return resolve(new Uint8Array(reader.result));
    };
    reader.onerror = function(event) {
      switch (event.target.error.code) {
        case event.target.error.NOT_FOUND_ERR:
          return reject(new Error("Error while reading a file: File not found."));
        case event.target.error.NOT_READABLE_ERR:
          return reject(new Error("Error while reading a file: File not readable."));
        case event.target.error.SECURITY_ERR:
          return reject(new Error("Error while reading a file: Security error."));
        case event.target.error.ABORT_ERR:
          return reject(new Error("Error while reading a file: Aborted."));
        default:
          return reject(new Error("Error while reading a file."));
      }
    };
    reader.readAsArrayBuffer(file);
    return null;
  });
}

// dist/esm/Document.js
var _excluded = ["url"];
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) {
      symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
    }
    keys.push.apply(keys, symbols);
  }
  return keys;
}
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(Object(source), true).forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function(key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn(this, result);
  };
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PDFDataRangeTransport2 = PDFDataRangeTransport;
var Document = /* @__PURE__ */ function(_PureComponent) {
  _inherits(Document2, _PureComponent);
  var _super = _createSuper(Document2);
  function Document2() {
    var _this;
    _classCallCheck2(this, Document2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty(_assertThisInitialized(_this), "state", {
      pdf: null
    });
    _defineProperty(_assertThisInitialized(_this), "viewer", {
      scrollPageIntoView: function scrollPageIntoView(_ref) {
        var pageNumber = _ref.pageNumber;
        var onItemClick = _this.props.onItemClick;
        if (onItemClick) {
          onItemClick({
            pageNumber
          });
          return;
        }
        var page = _this.pages[pageNumber - 1];
        if (page) {
          page.scrollIntoView();
          return;
        }
        warnOnDev("Warning: An internal link leading to page ".concat(pageNumber, " was clicked, but neither <Document> was provided with onItemClick nor it was able to find the page within itself. Either provide onItemClick to <Document> and handle navigating by yourself or ensure that all pages are rendered within <Document>."));
      }
    });
    _defineProperty(_assertThisInitialized(_this), "linkService", new LinkService());
    _defineProperty(_assertThisInitialized(_this), "loadDocument", function() {
      _this.findDocumentSource().then(function(source) {
        _this.onSourceSuccess();
        if (!source) {
          return;
        }
        _this.setState(function(prevState) {
          if (!prevState.pdf) {
            return null;
          }
          return {
            pdf: null
          };
        });
        var _this$props = _this.props, options = _this$props.options, onLoadProgress = _this$props.onLoadProgress, onPassword2 = _this$props.onPassword;
        cancelRunningTask(_this.runningTask);
        if (_this.loadingTask)
          _this.loadingTask.destroy();
        _this.loadingTask = getDocument(_objectSpread(_objectSpread({}, source), options));
        _this.loadingTask.onPassword = onPassword2;
        if (onLoadProgress) {
          _this.loadingTask.onProgress = onLoadProgress;
        }
        var cancellable = makeCancellable(_this.loadingTask.promise);
        _this.runningTask = cancellable;
        cancellable.promise.then(function(pdf) {
          _this.setState(function(prevState) {
            if (prevState.pdf && prevState.pdf.fingerprint === pdf.fingerprint) {
              return null;
            }
            return {
              pdf
            };
          }, _this.onLoadSuccess);
        })["catch"](function(error) {
          _this.onLoadError(error);
        });
      })["catch"](function(error) {
        _this.onSourceError(error);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "setupLinkService", function() {
      _this.linkService.setViewer(_this.viewer);
      var documentInstance = _assertThisInitialized(_this);
      Object.defineProperty(_this.linkService, "externalLinkTarget", {
        get: function get() {
          var externalLinkTarget = documentInstance.props.externalLinkTarget;
          switch (externalLinkTarget) {
            case "_self":
              return 1;
            case "_blank":
              return 2;
            case "_parent":
              return 3;
            case "_top":
              return 4;
            default:
              return 0;
          }
        }
      });
    });
    _defineProperty(_assertThisInitialized(_this), "onSourceSuccess", function() {
      var onSourceSuccess = _this.props.onSourceSuccess;
      if (onSourceSuccess)
        onSourceSuccess();
    });
    _defineProperty(_assertThisInitialized(_this), "onSourceError", function(error) {
      errorOnDev(error);
      var onSourceError = _this.props.onSourceError;
      if (onSourceError)
        onSourceError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadSuccess", function() {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var pdf = _this.state.pdf;
      if (onLoadSuccess)
        onLoadSuccess(pdf);
      _this.pages = new Array(pdf.numPages);
      _this.linkService.setDocument(pdf);
    });
    _defineProperty(_assertThisInitialized(_this), "onLoadError", function(error) {
      _this.setState({
        pdf: false
      });
      errorOnDev(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError)
        onLoadError(error);
    });
    _defineProperty(_assertThisInitialized(_this), "findDocumentSource", function() {
      return new Promise(function(resolve) {
        var file = _this.props.file;
        if (!file) {
          resolve(null);
        }
        if (typeof file === "string") {
          if (isDataURI(file)) {
            var fileByteString = dataURItoByteString(file);
            resolve({
              data: fileByteString
            });
          }
          displayCORSWarning();
          resolve({
            url: file
          });
        }
        if (file instanceof PDFDataRangeTransport2) {
          resolve({
            range: file
          });
        }
        if (isArrayBuffer(file)) {
          resolve({
            data: file
          });
        }
        if (isBrowser) {
          if (isBlob(file) || isFile(file)) {
            loadFromFile(file).then(function(data) {
              resolve({
                data
              });
            });
            return;
          }
        }
        if (_typeof(file) !== "object") {
          throw new Error("Invalid parameter in file, need either Uint8Array, string or a parameter object");
        }
        if (!file.url && !file.data && !file.range) {
          throw new Error("Invalid parameter object: need either .data, .range or .url");
        }
        if (typeof file.url === "string") {
          if (isDataURI(file.url)) {
            var url = file.url, otherParams = _objectWithoutProperties(file, _excluded);
            var _fileByteString = dataURItoByteString(url);
            resolve(_objectSpread({
              data: _fileByteString
            }, otherParams));
          }
          displayCORSWarning();
        }
        resolve(file);
      });
    });
    _defineProperty(_assertThisInitialized(_this), "registerPage", function(pageIndex, ref) {
      _this.pages[pageIndex] = ref;
    });
    _defineProperty(_assertThisInitialized(_this), "unregisterPage", function(pageIndex) {
      delete _this.pages[pageIndex];
    });
    return _this;
  }
  _createClass2(Document2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadDocument();
      this.setupLinkService();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var file = this.props.file;
      if (file !== prevProps.file) {
        this.loadDocument();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
      if (this.loadingTask)
        this.loadingTask.destroy();
    }
  }, {
    key: "childContext",
    get: function get() {
      var linkService = this.linkService, registerPage = this.registerPage, unregisterPage = this.unregisterPage;
      var _this$props2 = this.props, imageResourcesPath = _this$props2.imageResourcesPath, renderMode = _this$props2.renderMode, rotate = _this$props2.rotate;
      var pdf = this.state.pdf;
      return {
        imageResourcesPath,
        linkService,
        pdf,
        registerPage,
        renderMode,
        rotate,
        unregisterPage
      };
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;
      return makeEventProps(this.props, function() {
        return _this2.state.pdf;
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return /* @__PURE__ */ React2.createElement(DocumentContext_default.Provider, {
        value: this.childContext
      }, children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var file = this.props.file;
      var pdf = this.state.pdf;
      if (!file) {
        var noData = this.props.noData;
        return /* @__PURE__ */ React2.createElement(Message, {
          type: "no-data"
        }, typeof noData === "function" ? noData() : noData);
      }
      if (pdf === null) {
        var loading = this.props.loading;
        return /* @__PURE__ */ React2.createElement(Message, {
          type: "loading"
        }, typeof loading === "function" ? loading() : loading);
      }
      if (pdf === false) {
        var error = this.props.error;
        return /* @__PURE__ */ React2.createElement(Message, {
          type: "error"
        }, typeof error === "function" ? error() : error);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props3 = this.props, className = _this$props3.className, inputRef = _this$props3.inputRef;
      return /* @__PURE__ */ React2.createElement("div", _extends({
        className: mergeClassNames("react-pdf__Document", className),
        ref: inputRef
      }, this.eventProps), this.renderContent());
    }
  }]);
  return Document2;
}(PureComponent);
Document.defaultProps = {
  error: "Failed to load PDF file.",
  loading: "Loading PDF\u2026",
  noData: "No PDF file specified.",
  onPassword: function onPassword(callback, reason) {
    switch (reason) {
      case PasswordResponses_default.NEED_PASSWORD: {
        var password = prompt("Enter the password to open this PDF file.");
        callback(password);
        break;
      }
      case PasswordResponses_default.INCORRECT_PASSWORD: {
        var _password = prompt("Invalid password. Please try again.");
        callback(_password);
        break;
      }
      default:
    }
  }
};

// dist/esm/Outline.js
import _extends3 from "@babel/runtime/helpers/esm/extends";
import _classCallCheck5 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass5 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized3 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits3 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn3 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf3 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty3 from "@babel/runtime/helpers/esm/defineProperty";
import React4, { PureComponent as PureComponent3 } from "react";
import makeCancellable2 from "make-cancellable-promise";
import makeEventProps2 from "make-event-props";
import mergeClassNames2 from "merge-class-names";

// dist/esm/OutlineContext.js
import { createContext as createContext2 } from "react";
var OutlineContext_default = /* @__PURE__ */ createContext2(null);

// dist/esm/OutlineItem.js
import _extends2 from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties2 from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _slicedToArray2 from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck4 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass4 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized2 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits2 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn2 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf2 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty2 from "@babel/runtime/helpers/esm/defineProperty";
import React3, { PureComponent as PureComponent2 } from "react";

// dist/esm/Ref.js
import _classCallCheck3 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass3 from "@babel/runtime/helpers/esm/createClass";
var Ref = /* @__PURE__ */ function() {
  function Ref2(_ref) {
    var num = _ref.num, gen = _ref.gen;
    _classCallCheck3(this, Ref2);
    this.num = num;
    this.gen = gen;
  }
  _createClass3(Ref2, [{
    key: "toString",
    value: function toString() {
      var str = "".concat(this.num, "R");
      if (this.gen !== 0) {
        str += this.gen;
      }
      return str;
    }
  }]);
  return Ref2;
}();

// dist/esm/OutlineItem.js
var _excluded2 = ["item"];
function _createSuper2(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct2();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf2(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf2(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn2(this, result);
  };
}
function _isNativeReflectConstruct2() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var OutlineItemInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits2(OutlineItemInternal2, _PureComponent);
  var _super = _createSuper2(OutlineItemInternal2);
  function OutlineItemInternal2() {
    var _this;
    _classCallCheck4(this, OutlineItemInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty2(_assertThisInitialized2(_this), "getDestination", function() {
      return new Promise(function(resolve, reject) {
        var _this$props = _this.props, item = _this$props.item, pdf = _this$props.pdf;
        if (!isDefined(_this.destination)) {
          if (typeof item.dest === "string") {
            pdf.getDestination(item.dest).then(resolve)["catch"](reject);
          } else {
            resolve(item.dest);
          }
        }
        return _this.destination;
      }).then(function(destination) {
        _this.destination = destination;
        return destination;
      });
    });
    _defineProperty2(_assertThisInitialized2(_this), "getPageIndex", function() {
      return new Promise(function(resolve, reject) {
        var pdf = _this.props.pdf;
        if (isDefined(_this.pageIndex)) {
          resolve(_this.pageIndex);
        }
        _this.getDestination().then(function(destination) {
          if (!destination) {
            return;
          }
          var _destination = _slicedToArray2(destination, 1), ref = _destination[0];
          pdf.getPageIndex(new Ref(ref)).then(resolve)["catch"](reject);
        });
      }).then(function(pageIndex) {
        _this.pageIndex = pageIndex;
        return _this.pageIndex;
      });
    });
    _defineProperty2(_assertThisInitialized2(_this), "getPageNumber", function() {
      return new Promise(function(resolve, reject) {
        if (isDefined(_this.pageNumber)) {
          resolve(_this.pageNumber);
        }
        _this.getPageIndex().then(function(pageIndex) {
          resolve(pageIndex + 1);
        })["catch"](reject);
      }).then(function(pageNumber) {
        _this.pageNumber = pageNumber;
        return pageNumber;
      });
    });
    _defineProperty2(_assertThisInitialized2(_this), "onClick", function(event) {
      var onClick = _this.props.onClick;
      event.preventDefault();
      if (!onClick) {
        return false;
      }
      return Promise.all([_this.getPageIndex(), _this.getPageNumber()]).then(function(_ref) {
        var _ref2 = _slicedToArray2(_ref, 2), pageIndex = _ref2[0], pageNumber = _ref2[1];
        onClick({
          pageIndex,
          pageNumber
        });
      });
    });
    return _this;
  }
  _createClass4(OutlineItemInternal2, [{
    key: "renderSubitems",
    value: function renderSubitems() {
      var _this$props2 = this.props, item = _this$props2.item, otherProps = _objectWithoutProperties2(_this$props2, _excluded2);
      if (!item.items || !item.items.length) {
        return null;
      }
      var subitems = item.items;
      return /* @__PURE__ */ React3.createElement("ul", null, subitems.map(function(subitem, subitemIndex) {
        return /* @__PURE__ */ React3.createElement(OutlineItemInternal2, _extends2({
          key: typeof subitem.destination === "string" ? subitem.destination : subitemIndex,
          item: subitem
        }, otherProps));
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var item = this.props.item;
      return /* @__PURE__ */ React3.createElement("li", null, /* @__PURE__ */ React3.createElement("a", {
        href: "#",
        onClick: this.onClick
      }, item.title), this.renderSubitems());
    }
  }]);
  return OutlineItemInternal2;
}(PureComponent2);
var OutlineItem = function OutlineItem2(props) {
  return /* @__PURE__ */ React3.createElement(DocumentContext_default.Consumer, null, function(documentContext) {
    return /* @__PURE__ */ React3.createElement(OutlineContext_default.Consumer, null, function(outlineContext) {
      return /* @__PURE__ */ React3.createElement(OutlineItemInternal, _extends2({}, documentContext, outlineContext, props));
    });
  });
};
var OutlineItem_default = OutlineItem;

// dist/esm/Outline.js
function _createSuper3(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct3();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf3(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf3(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn3(this, result);
  };
}
function _isNativeReflectConstruct3() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var OutlineInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits3(OutlineInternal2, _PureComponent);
  var _super = _createSuper3(OutlineInternal2);
  function OutlineInternal2() {
    var _this;
    _classCallCheck5(this, OutlineInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty3(_assertThisInitialized3(_this), "state", {
      outline: null
    });
    _defineProperty3(_assertThisInitialized3(_this), "loadOutline", function() {
      var pdf = _this.props.pdf;
      _this.setState(function(prevState) {
        if (!prevState.outline) {
          return null;
        }
        return {
          outline: null
        };
      });
      var cancellable = makeCancellable2(pdf.getOutline());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(outline) {
        _this.setState({
          outline
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    _defineProperty3(_assertThisInitialized3(_this), "onLoadSuccess", function() {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var outline = _this.state.outline;
      if (onLoadSuccess)
        onLoadSuccess(outline);
    });
    _defineProperty3(_assertThisInitialized3(_this), "onLoadError", function(error) {
      _this.setState({
        outline: false
      });
      errorOnDev(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError)
        onLoadError(error);
    });
    _defineProperty3(_assertThisInitialized3(_this), "onItemClick", function(_ref) {
      var pageIndex = _ref.pageIndex, pageNumber = _ref.pageNumber;
      var onItemClick = _this.props.onItemClick;
      if (onItemClick) {
        onItemClick({
          pageIndex,
          pageNumber
        });
      }
    });
    return _this;
  }
  _createClass5(OutlineInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pdf = this.props.pdf;
      if (!pdf) {
        throw new Error("Attempted to load an outline, but no document was specified.");
      }
      this.loadOutline();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pdf = this.props.pdf;
      if (prevProps.pdf && pdf !== prevProps.pdf) {
        this.loadOutline();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "childContext",
    get: function get() {
      return {
        onClick: this.onItemClick
      };
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;
      return makeEventProps2(this.props, function() {
        return _this2.state.outline;
      });
    }
  }, {
    key: "renderOutline",
    value: function renderOutline() {
      var outline = this.state.outline;
      return /* @__PURE__ */ React4.createElement("ul", null, outline.map(function(item, itemIndex) {
        return /* @__PURE__ */ React4.createElement(OutlineItem_default, {
          key: typeof item.destination === "string" ? item.destination : itemIndex,
          item
        });
      }));
    }
  }, {
    key: "render",
    value: function render() {
      var pdf = this.props.pdf;
      var outline = this.state.outline;
      if (!pdf || !outline) {
        return null;
      }
      var _this$props = this.props, className = _this$props.className, inputRef = _this$props.inputRef;
      return /* @__PURE__ */ React4.createElement("div", _extends3({
        className: mergeClassNames2("react-pdf__Outline", className),
        ref: inputRef
      }, this.eventProps), /* @__PURE__ */ React4.createElement(OutlineContext_default.Provider, {
        value: this.childContext
      }, this.renderOutline()));
    }
  }]);
  return OutlineInternal2;
}(PureComponent3);
function Outline(props, ref) {
  return /* @__PURE__ */ React4.createElement(DocumentContext_default.Consumer, null, function(context) {
    return /* @__PURE__ */ React4.createElement(OutlineInternal, _extends3({
      ref
    }, context, props));
  });
}
var Outline_default = /* @__PURE__ */ React4.forwardRef(Outline);

// dist/esm/Page.js
import _extends8 from "@babel/runtime/helpers/esm/extends";
import _classCallCheck10 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass10 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized8 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits8 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn8 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf8 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty8 from "@babel/runtime/helpers/esm/defineProperty";
import React9, { PureComponent as PureComponent8 } from "react";
import makeCancellable5 from "make-cancellable-promise";
import makeEventProps3 from "make-event-props";
import mergeClassNames3 from "merge-class-names";
import mergeRefs2 from "merge-refs";

// dist/esm/PageContext.js
import { createContext as createContext3 } from "react";
var PageContext_default = /* @__PURE__ */ createContext3(null);

// dist/esm/Page/PageCanvas.js
import _extends4 from "@babel/runtime/helpers/esm/extends";
import _classCallCheck6 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass6 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized4 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits4 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn4 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf4 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty4 from "@babel/runtime/helpers/esm/defineProperty";
import React5, { PureComponent as PureComponent4 } from "react";
import mergeRefs from "merge-refs";
function _createSuper4(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct4();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf4(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf4(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn4(this, result);
  };
}
function _isNativeReflectConstruct4() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var PageCanvasInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits4(PageCanvasInternal2, _PureComponent);
  var _super = _createSuper4(PageCanvasInternal2);
  function PageCanvasInternal2() {
    var _this;
    _classCallCheck6(this, PageCanvasInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty4(_assertThisInitialized4(_this), "onRenderSuccess", function() {
      _this.renderer = null;
      var _this$props = _this.props, onRenderSuccess = _this$props.onRenderSuccess, page = _this$props.page, scale = _this$props.scale;
      if (onRenderSuccess)
        onRenderSuccess(makePageCallback(page, scale));
    });
    _defineProperty4(_assertThisInitialized4(_this), "onRenderError", function(error) {
      if (isCancelException(error)) {
        return;
      }
      errorOnDev(error);
      var onRenderError = _this.props.onRenderError;
      if (onRenderError)
        onRenderError(error);
    });
    _defineProperty4(_assertThisInitialized4(_this), "drawPageOnCanvas", function() {
      var _assertThisInitialize = _assertThisInitialized4(_this), canvas = _assertThisInitialize.canvasLayer;
      if (!canvas) {
        return null;
      }
      var _assertThisInitialize2 = _assertThisInitialized4(_this), renderViewport = _assertThisInitialize2.renderViewport, viewport = _assertThisInitialize2.viewport;
      var _this$props2 = _this.props, page = _this$props2.page, renderInteractiveForms = _this$props2.renderInteractiveForms;
      canvas.width = renderViewport.width;
      canvas.height = renderViewport.height;
      canvas.style.width = "".concat(Math.floor(viewport.width), "px");
      canvas.style.height = "".concat(Math.floor(viewport.height), "px");
      var renderContext = {
        get canvasContext() {
          return canvas.getContext("2d");
        },
        viewport: renderViewport,
        renderInteractiveForms
      };
      _this.cancelRenderingTask();
      _this.renderer = page.render(renderContext);
      return _this.renderer.promise.then(_this.onRenderSuccess)["catch"](_this.onRenderError);
    });
    return _this;
  }
  _createClass6(PageCanvasInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.drawPageOnCanvas();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props, page = _this$props3.page, renderInteractiveForms = _this$props3.renderInteractiveForms;
      if (renderInteractiveForms !== prevProps.renderInteractiveForms) {
        page.cleanup();
        this.drawPageOnCanvas();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRenderingTask();
      if (this.canvasLayer) {
        this.canvasLayer.width = 0;
        this.canvasLayer.height = 0;
        this.canvasLayer = null;
      }
    }
  }, {
    key: "cancelRenderingTask",
    value: function cancelRenderingTask() {
      if (this.renderer) {
        this.renderer.cancel();
        this.renderer = null;
      }
    }
  }, {
    key: "renderViewport",
    get: function get() {
      var _this$props4 = this.props, page = _this$props4.page, rotate = _this$props4.rotate, scale = _this$props4.scale;
      var pixelRatio = getPixelRatio();
      return page.getViewport({
        scale: scale * pixelRatio,
        rotation: rotate
      });
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props5 = this.props, page = _this$props5.page, rotate = _this$props5.rotate, scale = _this$props5.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      var canvasRef = this.props.canvasRef;
      return /* @__PURE__ */ React5.createElement("canvas", {
        className: "react-pdf__Page__canvas",
        dir: "ltr",
        ref: mergeRefs(canvasRef, function(ref) {
          _this2.canvasLayer = ref;
        }),
        style: {
          display: "block",
          userSelect: "none"
        }
      });
    }
  }]);
  return PageCanvasInternal2;
}(PureComponent4);
function PageCanvas(props) {
  return /* @__PURE__ */ React5.createElement(PageContext_default.Consumer, null, function(context) {
    return /* @__PURE__ */ React5.createElement(PageCanvasInternal, _extends4({}, context, props));
  });
}

// dist/esm/Page/TextLayer.js
import _extends6 from "@babel/runtime/helpers/esm/extends";
import _classCallCheck8 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass8 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized6 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits6 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn6 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf6 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty6 from "@babel/runtime/helpers/esm/defineProperty";
import React7, { PureComponent as PureComponent6 } from "react";
import makeCancellable3 from "make-cancellable-promise";

// dist/esm/Page/TextLayerItem.js
import _extends5 from "@babel/runtime/helpers/esm/extends";
import _slicedToArray3 from "@babel/runtime/helpers/esm/slicedToArray";
import _classCallCheck7 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass7 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized5 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits5 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn5 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf5 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty5 from "@babel/runtime/helpers/esm/defineProperty";
import React6, { PureComponent as PureComponent5 } from "react";
function _createSuper5(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct5();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf5(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf5(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn5(this, result);
  };
}
function _isNativeReflectConstruct5() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextLayerItemInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits5(TextLayerItemInternal2, _PureComponent);
  var _super = _createSuper5(TextLayerItemInternal2);
  function TextLayerItemInternal2() {
    var _this;
    _classCallCheck7(this, TextLayerItemInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty5(_assertThisInitialized5(_this), "getElementWidth", function(element) {
      var _assertThisInitialize = _assertThisInitialized5(_this), sideways = _assertThisInitialize.sideways;
      return element.getBoundingClientRect()[sideways ? "height" : "width"];
    });
    return _this;
  }
  _createClass7(TextLayerItemInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.alignTextItem();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.alignTextItem();
    }
  }, {
    key: "unrotatedViewport",
    get: function get() {
      var _this$props = this.props, page = _this$props.page, scale = _this$props.scale;
      return page.getViewport({
        scale
      });
    }
  }, {
    key: "rotate",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, rotate = _this$props2.rotate;
      return rotate - page.rotate;
    }
  }, {
    key: "sideways",
    get: function get() {
      var rotate = this.rotate;
      return rotate % 180 !== 0;
    }
  }, {
    key: "defaultSideways",
    get: function get() {
      var rotation = this.unrotatedViewport.rotation;
      return rotation % 180 !== 0;
    }
  }, {
    key: "fontSize",
    get: function get() {
      var transform = this.props.transform;
      var defaultSideways = this.defaultSideways;
      var _transform = _slicedToArray3(transform, 2), fontHeightPx = _transform[0], fontWidthPx = _transform[1];
      return defaultSideways ? fontWidthPx : fontHeightPx;
    }
  }, {
    key: "top",
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport, defaultSideways = this.defaultSideways;
      var _transform2 = _slicedToArray3(transform, 6), offsetX = _transform2[2], offsetY = _transform2[3], x = _transform2[4], y = _transform2[5];
      var _viewport$viewBox = _slicedToArray3(viewport.viewBox, 4), yMin = _viewport$viewBox[1], yMax = _viewport$viewBox[3];
      return defaultSideways ? x + offsetX + yMin : yMax - (y + offsetY);
    }
  }, {
    key: "left",
    get: function get() {
      var transform = this.props.transform;
      var viewport = this.unrotatedViewport, defaultSideways = this.defaultSideways;
      var _transform3 = _slicedToArray3(transform, 6), x = _transform3[4], y = _transform3[5];
      var _viewport$viewBox2 = _slicedToArray3(viewport.viewBox, 1), xMin = _viewport$viewBox2[0];
      return defaultSideways ? y - xMin : x - xMin;
    }
  }, {
    key: "getFontData",
    value: function getFontData(fontName) {
      var page = this.props.page;
      return new Promise(function(resolve) {
        page.commonObjs.get(fontName, resolve);
      });
    }
  }, {
    key: "alignTextItem",
    value: function alignTextItem() {
      var _this2 = this;
      var element = this.item;
      if (!element) {
        return;
      }
      element.style.transform = "";
      var _this$props3 = this.props, fontName = _this$props3.fontName, scale = _this$props3.scale, width = _this$props3.width;
      element.style.fontFamily = "".concat(fontName, ", sans-serif");
      this.getFontData(fontName).then(function(fontData) {
        var fallbackFontName = fontData ? fontData.fallbackName : "sans-serif";
        element.style.fontFamily = "".concat(fontName, ", ").concat(fallbackFontName);
        var targetWidth = width * scale;
        var actualWidth = _this2.getElementWidth(element);
        var transform = "scaleX(".concat(targetWidth / actualWidth, ")");
        var ascent = fontData ? fontData.ascent : 0;
        if (ascent) {
          transform += " translateY(".concat((1 - ascent) * 100, "%)");
        }
        element.style.transform = transform;
        element.style.WebkitTransform = transform;
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;
      var fontSize = this.fontSize, top = this.top, left = this.left;
      var _this$props4 = this.props, customTextRenderer = _this$props4.customTextRenderer, scale = _this$props4.scale, text = _this$props4.str;
      return /* @__PURE__ */ React6.createElement("span", {
        ref: function ref(_ref) {
          _this3.item = _ref;
        },
        style: {
          height: "1em",
          fontFamily: "sans-serif",
          fontSize: "".concat(fontSize * scale, "px"),
          position: "absolute",
          top: "".concat(top * scale, "px"),
          left: "".concat(left * scale, "px"),
          transformOrigin: "left bottom",
          whiteSpace: "pre",
          pointerEvents: "all"
        }
      }, customTextRenderer ? customTextRenderer(this.props) : text);
    }
  }]);
  return TextLayerItemInternal2;
}(PureComponent5);
function TextLayerItem(props) {
  return /* @__PURE__ */ React6.createElement(PageContext_default.Consumer, null, function(context) {
    return /* @__PURE__ */ React6.createElement(TextLayerItemInternal, _extends5({}, context, props));
  });
}

// dist/esm/Page/TextLayer.js
function _createSuper6(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct6();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf6(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf6(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn6(this, result);
  };
}
function _isNativeReflectConstruct6() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var TextLayerInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits6(TextLayerInternal2, _PureComponent);
  var _super = _createSuper6(TextLayerInternal2);
  function TextLayerInternal2() {
    var _this;
    _classCallCheck8(this, TextLayerInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty6(_assertThisInitialized6(_this), "state", {
      textItems: null
    });
    _defineProperty6(_assertThisInitialized6(_this), "loadTextItems", function() {
      var page = _this.props.page;
      var cancellable = makeCancellable3(page.getTextContent());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(_ref) {
        var textItems = _ref.items;
        _this.setState({
          textItems
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    _defineProperty6(_assertThisInitialized6(_this), "onLoadSuccess", function() {
      var onGetTextSuccess = _this.props.onGetTextSuccess;
      var textItems = _this.state.textItems;
      if (onGetTextSuccess)
        onGetTextSuccess(textItems);
    });
    _defineProperty6(_assertThisInitialized6(_this), "onLoadError", function(error) {
      _this.setState({
        textItems: false
      });
      errorOnDev(error);
      var onGetTextError = _this.props.onGetTextError;
      if (onGetTextError)
        onGetTextError(error);
    });
    return _this;
  }
  _createClass8(TextLayerInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var page = this.props.page;
      if (!page) {
        throw new Error("Attempted to load page text content, but no page was specified.");
      }
      this.loadTextItems();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var page = this.props.page;
      if (prevProps.page && page !== prevProps.page) {
        this.loadTextItems();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "unrotatedViewport",
    get: function get() {
      var _this$props = this.props, page = _this$props.page, scale = _this$props.scale;
      return page.getViewport({
        scale
      });
    }
  }, {
    key: "rotate",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, rotate = _this$props2.rotate;
      return rotate - page.rotate;
    }
  }, {
    key: "renderTextItems",
    value: function renderTextItems() {
      var textItems = this.state.textItems;
      if (!textItems) {
        return null;
      }
      return textItems.map(function(textItem, itemIndex) {
        return /* @__PURE__ */ React7.createElement(TextLayerItem, _extends6({
          key: itemIndex,
          itemIndex
        }, textItem));
      });
    }
  }, {
    key: "render",
    value: function render() {
      var viewport = this.unrotatedViewport, rotate = this.rotate;
      return /* @__PURE__ */ React7.createElement("div", {
        className: "react-pdf__Page__textContent",
        style: {
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "".concat(viewport.width, "px"),
          height: "".concat(viewport.height, "px"),
          color: "transparent",
          transform: "translate(-50%, -50%) rotate(".concat(rotate, "deg)"),
          WebkitTransform: "translate(-50%, -50%) rotate(".concat(rotate, "deg)"),
          pointerEvents: "none"
        }
      }, this.renderTextItems());
    }
  }]);
  return TextLayerInternal2;
}(PureComponent6);
function TextLayer(props) {
  return /* @__PURE__ */ React7.createElement(PageContext_default.Consumer, null, function(context) {
    return /* @__PURE__ */ React7.createElement(TextLayerInternal, _extends6({}, context, props));
  });
}

// dist/esm/Page/AnnotationLayer.js
import _extends7 from "@babel/runtime/helpers/esm/extends";
import _classCallCheck9 from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass9 from "@babel/runtime/helpers/esm/createClass";
import _assertThisInitialized7 from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits7 from "@babel/runtime/helpers/esm/inherits";
import _possibleConstructorReturn7 from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf7 from "@babel/runtime/helpers/esm/getPrototypeOf";
import _defineProperty7 from "@babel/runtime/helpers/esm/defineProperty";
import React8, { PureComponent as PureComponent7 } from "react";
import {
  AnnotationLayer
} from "pdfjs-dist";
import makeCancellable4 from "make-cancellable-promise";
function _createSuper7(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct7();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf7(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf7(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn7(this, result);
  };
}
function _isNativeReflectConstruct7() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var AnnotationLayerInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits7(AnnotationLayerInternal2, _PureComponent);
  var _super = _createSuper7(AnnotationLayerInternal2);
  function AnnotationLayerInternal2() {
    var _this;
    _classCallCheck9(this, AnnotationLayerInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty7(_assertThisInitialized7(_this), "state", {
      annotations: null
    });
    _defineProperty7(_assertThisInitialized7(_this), "loadAnnotations", function() {
      var page = _this.props.page;
      var cancellable = makeCancellable4(page.getAnnotations());
      _this.runningTask = cancellable;
      cancellable.promise.then(function(annotations) {
        _this.setState({
          annotations
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.onLoadError(error);
      });
    });
    _defineProperty7(_assertThisInitialized7(_this), "onLoadSuccess", function() {
      var onGetAnnotationsSuccess = _this.props.onGetAnnotationsSuccess;
      var annotations = _this.state.annotations;
      if (onGetAnnotationsSuccess)
        onGetAnnotationsSuccess(annotations);
    });
    _defineProperty7(_assertThisInitialized7(_this), "onLoadError", function(error) {
      _this.setState({
        annotations: false
      });
      errorOnDev(error);
      var onGetAnnotationsError = _this.props.onGetAnnotationsError;
      if (onGetAnnotationsError)
        onGetAnnotationsError(error);
    });
    _defineProperty7(_assertThisInitialized7(_this), "onRenderSuccess", function() {
      var onRenderAnnotationLayerSuccess = _this.props.onRenderAnnotationLayerSuccess;
      if (onRenderAnnotationLayerSuccess)
        onRenderAnnotationLayerSuccess();
    });
    _defineProperty7(_assertThisInitialized7(_this), "onRenderError", function(error) {
      errorOnDev(error);
      var onRenderAnnotationLayerError = _this.props.onRenderAnnotationLayerError;
      if (onRenderAnnotationLayerError)
        onRenderAnnotationLayerError(error);
    });
    return _this;
  }
  _createClass9(AnnotationLayerInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var page = this.props.page;
      if (!page) {
        throw new Error("Attempted to load page annotations, but no page was specified.");
      }
      this.loadAnnotations();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props = this.props, page = _this$props.page, renderInteractiveForms = _this$props.renderInteractiveForms;
      if (prevProps.page && page !== prevProps.page || renderInteractiveForms !== prevProps.renderInteractiveForms) {
        this.loadAnnotations();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "viewport",
    get: function get() {
      var _this$props2 = this.props, page = _this$props2.page, rotate = _this$props2.rotate, scale = _this$props2.scale;
      return page.getViewport({
        scale,
        rotation: rotate
      });
    }
  }, {
    key: "renderAnnotationLayer",
    value: function renderAnnotationLayer() {
      var annotations = this.state.annotations;
      if (!annotations) {
        return;
      }
      var _this$props3 = this.props, imageResourcesPath = _this$props3.imageResourcesPath, linkService = _this$props3.linkService, page = _this$props3.page, renderInteractiveForms = _this$props3.renderInteractiveForms;
      var viewport = this.viewport.clone({
        dontFlip: true
      });
      var parameters = {
        annotations,
        div: this.annotationLayer,
        imageResourcesPath,
        linkService,
        page,
        renderInteractiveForms,
        viewport
      };
      this.annotationLayer.innerHTML = "";
      try {
        AnnotationLayer.render(parameters);
        this.onRenderSuccess();
      } catch (error) {
        this.onRenderError(error);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;
      return /* @__PURE__ */ React8.createElement("div", {
        className: "react-pdf__Page__annotations annotationLayer",
        ref: function ref(_ref) {
          _this2.annotationLayer = _ref;
        }
      }, this.renderAnnotationLayer());
    }
  }]);
  return AnnotationLayerInternal2;
}(PureComponent7);
var AnnotationLayer2 = function AnnotationLayer3(props) {
  return /* @__PURE__ */ React8.createElement(DocumentContext_default.Consumer, null, function(documentContext) {
    return /* @__PURE__ */ React8.createElement(PageContext_default.Consumer, null, function(pageContext) {
      return /* @__PURE__ */ React8.createElement(AnnotationLayerInternal, _extends7({}, documentContext, pageContext, props));
    });
  });
};
var AnnotationLayer_default = AnnotationLayer2;

// dist/esm/Page.js
function _createSuper8(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct8();
  return function _createSuperInternal() {
    var Super = _getPrototypeOf8(Derived), result;
    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf8(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }
    return _possibleConstructorReturn8(this, result);
  };
}
function _isNativeReflectConstruct8() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
var defaultScale = 1;
var PageInternal = /* @__PURE__ */ function(_PureComponent) {
  _inherits8(PageInternal2, _PureComponent);
  var _super = _createSuper8(PageInternal2);
  function PageInternal2() {
    var _this;
    _classCallCheck10(this, PageInternal2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _defineProperty8(_assertThisInitialized8(_this), "state", {
      page: null
    });
    _defineProperty8(_assertThisInitialized8(_this), "onLoadSuccess", function() {
      var _this$props = _this.props, onLoadSuccess = _this$props.onLoadSuccess, registerPage = _this$props.registerPage;
      var page = _this.state.page;
      if (onLoadSuccess)
        onLoadSuccess(makePageCallback(page, _this.scale));
      if (registerPage)
        registerPage(_this.pageIndex, _this.ref);
    });
    _defineProperty8(_assertThisInitialized8(_this), "onLoadError", function(error) {
      errorOnDev(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError)
        onLoadError(error);
    });
    _defineProperty8(_assertThisInitialized8(_this), "loadPage", function() {
      var pdf = _this.props.pdf;
      var pageNumber = _this.getPageNumber();
      if (!pageNumber) {
        return;
      }
      _this.setState(function(prevState) {
        if (!prevState.page) {
          return null;
        }
        return {
          page: null
        };
      });
      var cancellable = makeCancellable5(pdf.getPage(pageNumber));
      _this.runningTask = cancellable;
      cancellable.promise.then(function(page) {
        _this.setState({
          page
        }, _this.onLoadSuccess);
      })["catch"](function(error) {
        _this.setState({
          page: false
        });
        _this.onLoadError(error);
      });
    });
    return _this;
  }
  _createClass10(PageInternal2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pdf = this.props.pdf;
      if (!pdf) {
        throw new Error("Attempted to load a page, but no document was specified.");
      }
      this.loadPage();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var pdf = this.props.pdf;
      if (prevProps.pdf && pdf !== prevProps.pdf || this.getPageNumber() !== this.getPageNumber(prevProps)) {
        var unregisterPage = this.props.unregisterPage;
        if (unregisterPage)
          unregisterPage(this.getPageIndex(prevProps));
        this.loadPage();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      var unregisterPage = this.props.unregisterPage;
      if (unregisterPage)
        unregisterPage(this.pageIndex);
      cancelRunningTask(this.runningTask);
    }
  }, {
    key: "childContext",
    get: function get() {
      var page = this.state.page;
      if (!page) {
        return {};
      }
      var _this$props2 = this.props, customTextRenderer = _this$props2.customTextRenderer, onGetAnnotationsError = _this$props2.onGetAnnotationsError, onGetAnnotationsSuccess = _this$props2.onGetAnnotationsSuccess, onGetTextError = _this$props2.onGetTextError, onGetTextSuccess = _this$props2.onGetTextSuccess, onRenderAnnotationLayerError = _this$props2.onRenderAnnotationLayerError, onRenderAnnotationLayerSuccess = _this$props2.onRenderAnnotationLayerSuccess, onRenderError = _this$props2.onRenderError, onRenderSuccess = _this$props2.onRenderSuccess, renderInteractiveForms = _this$props2.renderInteractiveForms;
      return {
        customTextRenderer,
        onGetAnnotationsError,
        onGetAnnotationsSuccess,
        onGetTextError,
        onGetTextSuccess,
        onRenderAnnotationLayerError,
        onRenderAnnotationLayerSuccess,
        onRenderError,
        onRenderSuccess,
        page,
        renderInteractiveForms,
        rotate: this.rotate,
        scale: this.scale
      };
    }
  }, {
    key: "getPageIndex",
    value: function getPageIndex() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      if (isProvided(props.pageNumber)) {
        return props.pageNumber - 1;
      }
      if (isProvided(props.pageIndex)) {
        return props.pageIndex;
      }
      return null;
    }
  }, {
    key: "getPageNumber",
    value: function getPageNumber() {
      var props = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.props;
      if (isProvided(props.pageNumber)) {
        return props.pageNumber;
      }
      if (isProvided(props.pageIndex)) {
        return props.pageIndex + 1;
      }
      return null;
    }
  }, {
    key: "pageIndex",
    get: function get() {
      return this.getPageIndex();
    }
  }, {
    key: "pageNumber",
    get: function get() {
      return this.getPageNumber();
    }
  }, {
    key: "rotate",
    get: function get() {
      var rotate = this.props.rotate;
      if (isProvided(rotate)) {
        return rotate;
      }
      var page = this.state.page;
      if (!page) {
        return null;
      }
      return page.rotate;
    }
  }, {
    key: "scale",
    get: function get() {
      var page = this.state.page;
      if (!page) {
        return null;
      }
      var _this$props3 = this.props, scale = _this$props3.scale, width = _this$props3.width, height = _this$props3.height;
      var rotate = this.rotate;
      var pageScale = 1;
      var scaleWithDefault = scale === null ? defaultScale : scale;
      if (width || height) {
        var viewport = page.getViewport({
          scale: 1,
          rotation: rotate
        });
        pageScale = width ? width / viewport.width : height / viewport.height;
      }
      return scaleWithDefault * pageScale;
    }
  }, {
    key: "eventProps",
    get: function get() {
      var _this2 = this;
      return makeEventProps3(this.props, function() {
        var page = _this2.state.page;
        if (!page) {
          return page;
        }
        return makePageCallback(page, _this2.scale);
      });
    }
  }, {
    key: "pageKey",
    get: function get() {
      var page = this.state.page;
      return "".concat(page.pageIndex, "@").concat(this.scale, "/").concat(this.rotate);
    }
  }, {
    key: "pageKeyNoScale",
    get: function get() {
      var page = this.state.page;
      return "".concat(page.pageIndex, "/").concat(this.rotate);
    }
  }, {
    key: "renderMainLayer",
    value: function renderMainLayer() {
      var _this$props4 = this.props, canvasRef = _this$props4.canvasRef, renderMode = _this$props4.renderMode;
      switch (renderMode) {
        case "none":
          return null;
        case "canvas":
        default:
          return /* @__PURE__ */ React9.createElement(PageCanvas, {
            key: "".concat(this.pageKey, "_canvas"),
            canvasRef
          });
      }
    }
  }, {
    key: "renderTextLayer",
    value: function renderTextLayer() {
      var renderTextLayer2 = this.props.renderTextLayer;
      if (!renderTextLayer2) {
        return null;
      }
      return /* @__PURE__ */ React9.createElement(TextLayer, {
        key: "".concat(this.pageKey, "_text")
      });
    }
  }, {
    key: "renderAnnotationLayer",
    value: function renderAnnotationLayer() {
      var renderAnnotationLayer2 = this.props.renderAnnotationLayer;
      if (!renderAnnotationLayer2) {
        return null;
      }
      return /* @__PURE__ */ React9.createElement(AnnotationLayer_default, {
        key: "".concat(this.pageKey, "_annotations")
      });
    }
  }, {
    key: "renderChildren",
    value: function renderChildren() {
      var children = this.props.children;
      return /* @__PURE__ */ React9.createElement(PageContext_default.Provider, {
        value: this.childContext
      }, this.renderMainLayer(), this.renderTextLayer(), this.renderAnnotationLayer(), children);
    }
  }, {
    key: "renderContent",
    value: function renderContent() {
      var pageNumber = this.pageNumber;
      var pdf = this.props.pdf;
      var page = this.state.page;
      if (!pageNumber) {
        var noData = this.props.noData;
        return /* @__PURE__ */ React9.createElement(Message, {
          type: "no-data"
        }, typeof noData === "function" ? noData() : noData);
      }
      if (pdf === null || page === null) {
        var loading = this.props.loading;
        return /* @__PURE__ */ React9.createElement(Message, {
          type: "loading"
        }, typeof loading === "function" ? loading() : loading);
      }
      if (pdf === false || page === false) {
        var error = this.props.error;
        return /* @__PURE__ */ React9.createElement(Message, {
          type: "error"
        }, typeof error === "function" ? error() : error);
      }
      return this.renderChildren();
    }
  }, {
    key: "render",
    value: function render() {
      var pageNumber = this.pageNumber;
      var _this$props5 = this.props, className = _this$props5.className, inputRef = _this$props5.inputRef;
      return /* @__PURE__ */ React9.createElement("div", _extends8({
        className: mergeClassNames3("react-pdf__Page", className),
        "data-page-number": pageNumber,
        ref: mergeRefs2(inputRef, this.ref),
        style: {
          position: "relative"
        }
      }, this.eventProps), this.renderContent());
    }
  }]);
  return PageInternal2;
}(PureComponent8);
PageInternal.defaultProps = {
  error: "Failed to load the page.",
  loading: "Loading page\u2026",
  noData: "No page specified.",
  renderAnnotationLayer: true,
  renderInteractiveForms: false,
  renderMode: "canvas",
  renderTextLayer: true,
  scale: defaultScale
};
function Page(props, ref) {
  return /* @__PURE__ */ React9.createElement(DocumentContext_default.Consumer, null, function(context) {
    return /* @__PURE__ */ React9.createElement(PageInternal, _extends8({
      ref
    }, context, props));
  });
}
var Page_default = /* @__PURE__ */ React9.forwardRef(Page);

// dist/esm/entry.js
if (isLocalFileSystem) {
  warnOnDev("You are running React-PDF from your local file system. PDF.js Worker may fail to load due to browser's security policies. If you're on Google Chrome, you can use --allow-file-access-from-files flag for debugging purposes.");
}
pdfjs3.GlobalWorkerOptions.workerSrc = "pdf.worker.js";
export {
  Document,
  Outline_default as Outline,
  Page_default as Page,
  pdfjs3 as pdfjs
};
