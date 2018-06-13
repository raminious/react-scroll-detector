var _class, _temp;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import PropTypes from 'prop-types';
import debounce from 'debounce';

var ReactScrollDetector = (_temp = _class = function (_React$Component) {
  _inherits(ReactScrollDetector, _React$Component);

  function ReactScrollDetector(props) {
    _classCallCheck(this, ReactScrollDetector);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.onScroll = debounce(_this.onScroll, _this.props.debounceTime);
    return _this;
  }

  ReactScrollDetector.prototype.onScroll = function onScroll(el) {
    var _props = this.props,
        accuracy = _props.accuracy,
        onScrollBottom = _props.onScrollBottom,
        onScrollTop = _props.onScrollTop;

    var top = el.scrollTop - el.clientTop;
    var end = el.scrollHeight - el.offsetHeight;

    if (top >= end - accuracy) {
      this.lastScrollTop = top;

      return onScrollBottom(top);
    }

    var isScrolledToTop = top < this.lastScrollTop;

    this.lastScrollTop = top;

    if (isScrolledToTop && top <= accuracy) {
      onScrollTop(top);
    }
  };

  ReactScrollDetector.prototype.render = function render() {
    var _this2 = this;

    return React.createElement(
      'div',
      { onScroll: function onScroll(e) {
          return _this2.onScroll(e.target);
        } },
      this.props.children
    );
  };

  return ReactScrollDetector;
}(React.Component), _class.defaultProps = {
  onScrollTop: function onScrollTop() {},
  onScrollBottom: function onScrollBottom() {},
  accuracy: 90,
  debounceTime: 500
}, _temp);
export { ReactScrollDetector as default };
ReactScrollDetector.propTypes = process.env.NODE_ENV !== "production" ? {
  onScrollTop: PropTypes.func,
  onScrollBottom: PropTypes.func,
  accuracy: PropTypes.number,
  debounceTime: PropTypes.number
} : {};