(function (exports,d3) {
'use strict';

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();







var get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if ("value" in desc) {
    return desc.value;
  } else {
    var getter = desc.get;

    if (getter === undefined) {
      return undefined;
    }

    return getter.call(receiver);
  }
};

















var set = function set(object, property, value, receiver) {
  var desc = Object.getOwnPropertyDescriptor(object, property);

  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);

    if (parent !== null) {
      set(parent, property, value, receiver);
    }
  } else if ("value" in desc && desc.writable) {
    desc.value = value;
  } else {
    var setter = desc.set;

    if (setter !== undefined) {
      setter.call(receiver, value);
    }
  }

  return value;
};

var D3TextList = function () {
    function D3TextList() {
        var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        classCallCheck(this, D3TextList);

        this.set_value(param_obj);

        return this;
    }

    createClass(D3TextList, [{
        key: 'append_item',
        value: function append_item() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var self = this;

            try {
                this.set_value(param_obj);

                var el_item = this.el_list.append('li').attr('class', self.el_item_class).text(self.el_item_text);

                this._set_el_list_event();
            } catch (error) {
                console.error('D3TextList::append_text() ' + error);
            }

            return this;
        }
    }, {
        key: 'set_value',
        value: function set_value() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.el_container_id = param_obj.el_container_id ? param_obj.el_container_id : 'el_message_list';
            this.el_list_class = param_obj.el_list_class ? param_obj.el_list_class : 'w3-ul w3-border';
            this.el_item_class = param_obj.el_item_class ? param_obj.el_item_class : 'good-value';
            this.el_mouseover_class = param_obj.el_mouseover_class ? param_obj.el_mouseover_class : 'w3-large';
            this.el_item_text = param_obj.el_item_text ? param_obj.el_item_text : 'd3 es6 is good.';

            this._set_el_list();

            return this;
        }
    }, {
        key: '_set_el_list_event',
        value: function _set_el_list_event() {
            var self = this;

            this.el_list.selectAll('li').on('mouseover', function () {
                d3.select(this).classed(self.el_mouseover_class, true);
            }).on('mouseout', function () {
                d3.select(this).classed(self.el_mouseover_class, false);
            });
        }
    }, {
        key: '_set_el_list',
        value: function _set_el_list() {
            var self = this;

            if (!this.el_list) {
                var container_id = '#' + this.el_container_id;
                d3.select(container_id).selectAll('*').remove();

                this.el_list = d3.select(container_id).append('ul').attr('class', self.el_list_class);
            }
        }
    }]);
    return D3TextList;
}();

var param_obj = {};
param_obj.el_container_id = 'el_message_list';

var text_list_obj = new D3TextList();

// default
text_list_obj.append_item();

//
param_obj.el_item_class = 'ok-value';
param_obj.el_item_text = 'd3 es6 is ok.';
text_list_obj.append_item(param_obj);

//
param_obj.el_item_class = 'w3-red';
param_obj.el_item_text = 'd3 es6 is not so good.';
text_list_obj.append_item(param_obj);

}((this.demo_app = this.demo_app || {}),d3));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9saWIvRDNUZXh0TGlzdC5qcyIsIi4uLy4uL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcclxuXHJcbmV4cG9ydCBjbGFzcyBEM1RleHRMaXN0IHtcclxuICAgIGNvbnN0cnVjdG9yKHBhcmFtX29iaiA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5zZXRfdmFsdWUocGFyYW1fb2JqKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwZW5kX2l0ZW0ocGFyYW1fb2JqID0ge30pIHtcclxuICAgICAgICBsZXQgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0X3ZhbHVlKHBhcmFtX29iaik7XHJcblxyXG4gICAgICAgICAgICBsZXQgZWxfaXRlbSA9IHRoaXMuZWxfbGlzdC5hcHBlbmQoJ2xpJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHNlbGYuZWxfaXRlbV9jbGFzcylcclxuICAgICAgICAgICAgICAgIC50ZXh0KHNlbGYuZWxfaXRlbV90ZXh0KTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3NldF9lbF9saXN0X2V2ZW50KCk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRDNUZXh0TGlzdDo6YXBwZW5kX3RleHQoKSAnICsgZXJyb3IpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0X3ZhbHVlKHBhcmFtX29iaiA9IHt9KSB7XHJcbiAgICAgICAgdGhpcy5lbF9jb250YWluZXJfaWQgPSBwYXJhbV9vYmouZWxfY29udGFpbmVyX2lkID8gcGFyYW1fb2JqLmVsX2NvbnRhaW5lcl9pZCA6ICdlbF9tZXNzYWdlX2xpc3QnO1xyXG4gICAgICAgIHRoaXMuZWxfbGlzdF9jbGFzcyA9IHBhcmFtX29iai5lbF9saXN0X2NsYXNzID8gcGFyYW1fb2JqLmVsX2xpc3RfY2xhc3MgOiAndzMtdWwgdzMtYm9yZGVyJztcclxuICAgICAgICB0aGlzLmVsX2l0ZW1fY2xhc3MgPSBwYXJhbV9vYmouZWxfaXRlbV9jbGFzcyA/IHBhcmFtX29iai5lbF9pdGVtX2NsYXNzIDogJ2dvb2QtdmFsdWUnO1xyXG4gICAgICAgIHRoaXMuZWxfbW91c2VvdmVyX2NsYXNzID0gcGFyYW1fb2JqLmVsX21vdXNlb3Zlcl9jbGFzcyA/IHBhcmFtX29iai5lbF9tb3VzZW92ZXJfY2xhc3MgOiAndzMtbGFyZ2UnO1xyXG4gICAgICAgIHRoaXMuZWxfaXRlbV90ZXh0ID0gcGFyYW1fb2JqLmVsX2l0ZW1fdGV4dCA/IHBhcmFtX29iai5lbF9pdGVtX3RleHQgOiAnZDMgZXM2IGlzIGdvb2QuJztcclxuXHJcbiAgICAgICAgdGhpcy5fc2V0X2VsX2xpc3QoKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldF9lbF9saXN0X2V2ZW50KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5lbF9saXN0LnNlbGVjdEFsbCgnbGknKVxyXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS5jbGFzc2VkKHNlbGYuZWxfbW91c2VvdmVyX2NsYXNzLCB0cnVlKTtcclxuICAgICAgICAgICAgfSkub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoc2VsZi5lbF9tb3VzZW92ZXJfY2xhc3MsIGZhbHNlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgX3NldF9lbF9saXN0KCkge1xyXG4gICAgICAgIGxldCBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgaWYgKCEodGhpcy5lbF9saXN0KSkge1xyXG4gICAgICAgICAgICBsZXQgY29udGFpbmVyX2lkID0gJyMnICsgdGhpcy5lbF9jb250YWluZXJfaWQ7XHJcbiAgICAgICAgICAgIGQzLnNlbGVjdChjb250YWluZXJfaWQpLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbF9saXN0ID0gZDMuc2VsZWN0KGNvbnRhaW5lcl9pZClcclxuICAgICAgICAgICAgICAgIC5hcHBlbmQoJ3VsJylcclxuICAgICAgICAgICAgICAgIC5hdHRyKCdjbGFzcycsIHNlbGYuZWxfbGlzdF9jbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtEM1RleHRMaXN0fSBmcm9tICcuL2xpYi9EM1RleHRMaXN0JztcblxubGV0IHBhcmFtX29iaiA9IHt9O1xucGFyYW1fb2JqLmVsX2NvbnRhaW5lcl9pZCA9ICdlbF9tZXNzYWdlX2xpc3QnO1xuXG5sZXQgdGV4dF9saXN0X29iaiA9IG5ldyBEM1RleHRMaXN0KCk7XG5cbi8vIGRlZmF1bHRcbnRleHRfbGlzdF9vYmouYXBwZW5kX2l0ZW0oKTtcblxuLy9cbnBhcmFtX29iai5lbF9pdGVtX2NsYXNzID0gJ29rLXZhbHVlJztcbnBhcmFtX29iai5lbF9pdGVtX3RleHQgPSAnZDMgZXM2IGlzIG9rLic7XG50ZXh0X2xpc3Rfb2JqLmFwcGVuZF9pdGVtKHBhcmFtX29iaik7XG5cbi8vXG5wYXJhbV9vYmouZWxfaXRlbV9jbGFzcyA9ICd3My1yZWQnO1xucGFyYW1fb2JqLmVsX2l0ZW1fdGV4dCA9ICdkMyBlczYgaXMgbm90IHNvIGdvb2QuJztcbnRleHRfbGlzdF9vYmouYXBwZW5kX2l0ZW0ocGFyYW1fb2JqKTtcblxuIl0sIm5hbWVzIjpbIkQzVGV4dExpc3QiLCJwYXJhbV9vYmoiLCJzZXRfdmFsdWUiLCJzZWxmIiwiZWxfaXRlbSIsImVsX2xpc3QiLCJhcHBlbmQiLCJhdHRyIiwiZWxfaXRlbV9jbGFzcyIsInRleHQiLCJlbF9pdGVtX3RleHQiLCJfc2V0X2VsX2xpc3RfZXZlbnQiLCJlcnJvciIsImVsX2NvbnRhaW5lcl9pZCIsImVsX2xpc3RfY2xhc3MiLCJlbF9tb3VzZW92ZXJfY2xhc3MiLCJfc2V0X2VsX2xpc3QiLCJzZWxlY3RBbGwiLCJvbiIsImNsYXNzZWQiLCJjb250YWluZXJfaWQiLCJyZW1vdmUiLCJkMyIsInRleHRfbGlzdF9vYmoiLCJhcHBlbmRfaXRlbSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBRWFBLFVBQWI7MEJBQ2dDO1lBQWhCQyxTQUFnQix1RUFBSixFQUFJOzs7YUFDbkJDLFNBQUwsQ0FBZUQsU0FBZjs7ZUFFTyxJQUFQOzs7OztzQ0FHd0I7Z0JBQWhCQSxTQUFnQix1RUFBSixFQUFJOztnQkFDcEJFLE9BQU8sSUFBWDs7Z0JBRUk7cUJBQ0tELFNBQUwsQ0FBZUQsU0FBZjs7b0JBRUlHLFVBQVUsS0FBS0MsT0FBTCxDQUFhQyxNQUFiLENBQW9CLElBQXBCLEVBQ1RDLElBRFMsQ0FDSixPQURJLEVBQ0tKLEtBQUtLLGFBRFYsRUFFVEMsSUFGUyxDQUVKTixLQUFLTyxZQUZELENBQWQ7O3FCQUlLQyxrQkFBTDthQVBKLENBUUUsT0FBT0MsS0FBUCxFQUFjO3dCQUNKQSxLQUFSLENBQWMsK0JBQStCQSxLQUE3Qzs7O21CQUdHLElBQVA7Ozs7b0NBR3NCO2dCQUFoQlgsU0FBZ0IsdUVBQUosRUFBSTs7aUJBQ2pCWSxlQUFMLEdBQXVCWixVQUFVWSxlQUFWLEdBQTRCWixVQUFVWSxlQUF0QyxHQUF3RCxpQkFBL0U7aUJBQ0tDLGFBQUwsR0FBcUJiLFVBQVVhLGFBQVYsR0FBMEJiLFVBQVVhLGFBQXBDLEdBQW9ELGlCQUF6RTtpQkFDS04sYUFBTCxHQUFxQlAsVUFBVU8sYUFBVixHQUEwQlAsVUFBVU8sYUFBcEMsR0FBb0QsWUFBekU7aUJBQ0tPLGtCQUFMLEdBQTBCZCxVQUFVYyxrQkFBVixHQUErQmQsVUFBVWMsa0JBQXpDLEdBQThELFVBQXhGO2lCQUNLTCxZQUFMLEdBQW9CVCxVQUFVUyxZQUFWLEdBQXlCVCxVQUFVUyxZQUFuQyxHQUFrRCxpQkFBdEU7O2lCQUVLTSxZQUFMOzttQkFFTyxJQUFQOzs7OzZDQUdpQjtnQkFDYmIsT0FBTyxJQUFYOztpQkFFS0UsT0FBTCxDQUFhWSxTQUFiLENBQXVCLElBQXZCLEVBQ0tDLEVBREwsQ0FDUSxXQURSLEVBQ3FCLFlBQVk7eUJBQ3pCLENBQVUsSUFBVixFQUFnQkMsT0FBaEIsQ0FBd0JoQixLQUFLWSxrQkFBN0IsRUFBaUQsSUFBakQ7YUFGUixFQUdPRyxFQUhQLENBR1UsVUFIVixFQUdzQixZQUFZO3lCQUMxQixDQUFVLElBQVYsRUFBZ0JDLE9BQWhCLENBQXdCaEIsS0FBS1ksa0JBQTdCLEVBQWlELEtBQWpEO2FBSlI7Ozs7dUNBUVc7Z0JBQ1BaLE9BQU8sSUFBWDs7Z0JBRUksQ0FBRSxLQUFLRSxPQUFYLEVBQXFCO29CQUNiZSxlQUFlLE1BQU0sS0FBS1AsZUFBOUI7eUJBQ0EsQ0FBVU8sWUFBVixFQUF3QkgsU0FBeEIsQ0FBa0MsR0FBbEMsRUFBdUNJLE1BQXZDOztxQkFFS2hCLE9BQUwsR0FBZWlCLFNBQUEsQ0FBVUYsWUFBVixFQUNWZCxNQURVLENBQ0gsSUFERyxFQUVWQyxJQUZVLENBRUwsT0FGSyxFQUVJSixLQUFLVyxhQUZULENBQWY7Ozs7Ozs7QUN2RFosSUFBSWIsWUFBWSxFQUFoQjtBQUNBQSxVQUFVWSxlQUFWLEdBQTRCLGlCQUE1Qjs7QUFFQSxJQUFJVSxnQkFBZ0IsSUFBSXZCLFVBQUosRUFBcEI7OztBQUdBdUIsY0FBY0MsV0FBZDs7O0FBR0F2QixVQUFVTyxhQUFWLEdBQTBCLFVBQTFCO0FBQ0FQLFVBQVVTLFlBQVYsR0FBeUIsZUFBekI7QUFDQWEsY0FBY0MsV0FBZCxDQUEwQnZCLFNBQTFCOzs7QUFHQUEsVUFBVU8sYUFBVixHQUEwQixRQUExQjtBQUNBUCxVQUFVUyxZQUFWLEdBQXlCLHdCQUF6QjtBQUNBYSxjQUFjQyxXQUFkLENBQTBCdkIsU0FBMUI7OyJ9
