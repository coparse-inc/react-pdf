"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.OutlineInternal = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireWildcard(require("react"));

var _makeCancellablePromise = _interopRequireDefault(require("make-cancellable-promise"));

var _makeEventProps = _interopRequireDefault(require("make-event-props"));

var _mergeClassNames = _interopRequireDefault(require("merge-class-names"));

var _DocumentContext = _interopRequireDefault(require("./DocumentContext"));

var _OutlineContext = _interopRequireDefault(require("./OutlineContext"));

var _OutlineItem = _interopRequireDefault(require("./OutlineItem"));

var _utils = require("./shared/utils");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

var OutlineInternal = /*#__PURE__*/function (_PureComponent) {
  (0, _inherits2["default"])(OutlineInternal, _PureComponent);

  var _super = _createSuper(OutlineInternal);

  function OutlineInternal() {
    var _this;

    (0, _classCallCheck2["default"])(this, OutlineInternal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "state", {
      outline: null
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "loadOutline", function () {
      var pdf = _this.props.pdf;

      _this.setState(function (prevState) {
        if (!prevState.outline) {
          return null;
        }

        return {
          outline: null
        };
      });

      var cancellable = (0, _makeCancellablePromise["default"])(pdf.getOutline());
      _this.runningTask = cancellable;
      cancellable.promise.then(function (outline) {
        _this.setState({
          outline: outline
        }, _this.onLoadSuccess);
      })["catch"](function (error) {
        _this.onLoadError(error);
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onLoadSuccess", function () {
      var onLoadSuccess = _this.props.onLoadSuccess;
      var outline = _this.state.outline;
      if (onLoadSuccess) onLoadSuccess(outline);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onLoadError", function (error) {
      _this.setState({
        outline: false
      });

      (0, _utils.errorOnDev)(error);
      var onLoadError = _this.props.onLoadError;
      if (onLoadError) onLoadError(error);
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onItemClick", function (_ref) {
      var pageIndex = _ref.pageIndex,
          pageNumber = _ref.pageNumber;
      var onItemClick = _this.props.onItemClick;

      if (onItemClick) {
        onItemClick({
          pageIndex: pageIndex,
          pageNumber: pageNumber
        });
      }
    });
    return _this;
  }

  (0, _createClass2["default"])(OutlineInternal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var pdf = this.props.pdf;

      if (!pdf) {
        throw new Error('Attempted to load an outline, but no document was specified.');
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
      (0, _utils.cancelRunningTask)(this.runningTask);
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

      // eslint-disable-next-line react/destructuring-assignment
      return (0, _makeEventProps["default"])(this.props, function () {
        return _this2.state.outline;
      });
    }
    /**
     * Called when an outline is read successfully
     */

  }, {
    key: "renderOutline",
    value: function renderOutline() {
      var outline = this.state.outline;
      return /*#__PURE__*/_react["default"].createElement("ul", null, outline.map(function (item, itemIndex) {
        return /*#__PURE__*/_react["default"].createElement(_OutlineItem["default"], {
          key: typeof item.destination === 'string' ? item.destination : itemIndex,
          item: item
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

      var _this$props = this.props,
          className = _this$props.className,
          inputRef = _this$props.inputRef;
      return /*#__PURE__*/_react["default"].createElement("div", (0, _extends2["default"])({
        className: (0, _mergeClassNames["default"])('react-pdf__Outline', className),
        ref: inputRef
      }, this.eventProps), /*#__PURE__*/_react["default"].createElement(_OutlineContext["default"].Provider, {
        value: this.childContext
      }, this.renderOutline()));
    }
  }]);
  return OutlineInternal;
}(_react.PureComponent);

exports.OutlineInternal = OutlineInternal;

function Outline(props, ref) {
  return /*#__PURE__*/_react["default"].createElement(_DocumentContext["default"].Consumer, null, function (context) {
    return /*#__PURE__*/_react["default"].createElement(OutlineInternal, (0, _extends2["default"])({
      ref: ref
    }, context, props));
  });
}

var _default = /*#__PURE__*/_react["default"].forwardRef(Outline);

exports["default"] = _default;