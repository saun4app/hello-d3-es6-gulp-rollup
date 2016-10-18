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

        this._init_param(param_obj);

        return this;
    }

    createClass(D3TextList, [{
        key: 'show_list',
        value: function show_list() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            var self = this;

            this._init_param(param_obj);

            var container_id = '#' + this.el_container_id;
            d3.select(container_id).selectAll('*').remove();

            this.list_obj = d3.select(container_id).append('ul');

            this.list_obj.attr('class', self.el_list_class).selectAll('li').data(self.item_array).enter().append('li').each(function (d) {
                d3.select(this).attr('class', d.item_class);
                d3.select(this).text(d.label);
            });

            this._set_event();
        }
    }, {
        key: '_set_event',
        value: function _set_event() {
            var self = this;

            this.list_obj.selectAll('li').on('mouseover', function () {
                d3.select(this).classed(self.el_mouseover_class, true);
            }).on('mouseout', function () {
                d3.select(this).classed(self.el_mouseover_class, false);
            });
        }
    }, {
        key: '_init_param',
        value: function _init_param() {
            var param_obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            this.el_container_id = param_obj.el_container_id ? param_obj.el_container_id : 'el_message_list';
            this.el_list_class = param_obj.el_list_class ? param_obj.el_list_class : 'w3-ul w3-border';
            this.el_mouseover_class = param_obj.el_mouseover_class ? param_obj.el_mouseover_class : 'w3-large';
            this.item_array = param_obj.item_array ? param_obj.item_array : [];
        }
    }]);
    return D3TextList;
}();

var item_array = [{ "label": "d3 es6 is good.", "item_class": "good-value" }, { "label": "d3 es6 is ok.", "item_class": "ok-value" }, { "label": "d3 es6 is not so good.", "item_class": "w3-red" }];

var param_obj = {};
param_obj.el_container_id = 'el_message_list';
param_obj.item_array = item_array;

var text_list_obj = new D3TextList();
text_list_obj.show_list(param_obj);

}((this.demo_app = this.demo_app || {}),d3));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjpudWxsLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9qcy9saWIvRDNUZXh0TGlzdC5qcyIsIi4uLy4uL3NyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGQzIGZyb20gJ2QzJztcblxuZXhwb3J0IGNsYXNzIEQzVGV4dExpc3Qge1xuICAgIGNvbnN0cnVjdG9yKHBhcmFtX29iaiA9IHt9KSB7XG4gICAgICAgIHRoaXMuX2luaXRfcGFyYW0ocGFyYW1fb2JqKTtcblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzaG93X2xpc3QocGFyYW1fb2JqID0ge30pIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMuX2luaXRfcGFyYW0ocGFyYW1fb2JqKTtcblxuICAgICAgICBsZXQgY29udGFpbmVyX2lkID0gJyMnICsgdGhpcy5lbF9jb250YWluZXJfaWQ7XG4gICAgICAgIGQzLnNlbGVjdChjb250YWluZXJfaWQpLnNlbGVjdEFsbCgnKicpLnJlbW92ZSgpO1xuXG4gICAgICAgIHRoaXMubGlzdF9vYmogPSBkMy5zZWxlY3QoY29udGFpbmVyX2lkKS5hcHBlbmQoJ3VsJyk7XG5cbiAgICAgICAgdGhpcy5saXN0X29iai5hdHRyKCdjbGFzcycsIHNlbGYuZWxfbGlzdF9jbGFzcylcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJ2xpJylcbiAgICAgICAgICAgIC5kYXRhKHNlbGYuaXRlbV9hcnJheSlcbiAgICAgICAgICAgIC5lbnRlcigpXG4gICAgICAgICAgICAuYXBwZW5kKCdsaScpLmVhY2goZnVuY3Rpb24gKGQpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuYXR0cignY2xhc3MnLCBkLml0ZW1fY2xhc3MpO1xuICAgICAgICAgICAgICAgIGQzLnNlbGVjdCh0aGlzKS50ZXh0KGQubGFiZWwpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5fc2V0X2V2ZW50KCk7XG4gICAgfVxuXG4gICAgX3NldF9ldmVudCgpIHtcbiAgICAgICAgbGV0IHNlbGYgPSB0aGlzO1xuXG4gICAgICAgIHRoaXMubGlzdF9vYmouc2VsZWN0QWxsKCdsaScpXG4gICAgICAgICAgICAub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBkMy5zZWxlY3QodGhpcykuY2xhc3NlZChzZWxmLmVsX21vdXNlb3Zlcl9jbGFzcywgdHJ1ZSk7XG4gICAgICAgICAgICB9KS5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgZDMuc2VsZWN0KHRoaXMpLmNsYXNzZWQoc2VsZi5lbF9tb3VzZW92ZXJfY2xhc3MsIGZhbHNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIF9pbml0X3BhcmFtKHBhcmFtX29iaiA9IHt9KSB7XG4gICAgICAgIHRoaXMuZWxfY29udGFpbmVyX2lkID0gcGFyYW1fb2JqLmVsX2NvbnRhaW5lcl9pZCA/IHBhcmFtX29iai5lbF9jb250YWluZXJfaWQgOiAnZWxfbWVzc2FnZV9saXN0JztcbiAgICAgICAgdGhpcy5lbF9saXN0X2NsYXNzID0gcGFyYW1fb2JqLmVsX2xpc3RfY2xhc3MgPyBwYXJhbV9vYmouZWxfbGlzdF9jbGFzcyA6ICd3My11bCB3My1ib3JkZXInO1xuICAgICAgICB0aGlzLmVsX21vdXNlb3Zlcl9jbGFzcyA9IHBhcmFtX29iai5lbF9tb3VzZW92ZXJfY2xhc3MgPyBwYXJhbV9vYmouZWxfbW91c2VvdmVyX2NsYXNzIDogJ3czLWxhcmdlJztcbiAgICAgICAgdGhpcy5pdGVtX2FycmF5ID0gcGFyYW1fb2JqLml0ZW1fYXJyYXkgPyBwYXJhbV9vYmouaXRlbV9hcnJheSA6IFtdO1xuICAgIH1cbn1cbiIsImltcG9ydCB7RDNUZXh0TGlzdH0gZnJvbSAnLi9saWIvRDNUZXh0TGlzdCc7XG5cbmxldCBpdGVtX2FycmF5ID0gW1xuICAgIHtcImxhYmVsXCI6IFwiZDMgZXM2IGlzIGdvb2QuXCIsIFwiaXRlbV9jbGFzc1wiOiBcImdvb2QtdmFsdWVcIn0sXG4gICAge1wibGFiZWxcIjogXCJkMyBlczYgaXMgb2suXCIsIFwiaXRlbV9jbGFzc1wiOiBcIm9rLXZhbHVlXCJ9LFxuICAgIHtcImxhYmVsXCI6IFwiZDMgZXM2IGlzIG5vdCBzbyBnb29kLlwiLCBcIml0ZW1fY2xhc3NcIjogXCJ3My1yZWRcIn1cbl07XG5cbmxldCBwYXJhbV9vYmogPSB7fTtcbnBhcmFtX29iai5lbF9jb250YWluZXJfaWQgPSAnZWxfbWVzc2FnZV9saXN0JztcbnBhcmFtX29iai5pdGVtX2FycmF5ID0gaXRlbV9hcnJheTtcblxubGV0IHRleHRfbGlzdF9vYmogPSBuZXcgRDNUZXh0TGlzdCgpO1xudGV4dF9saXN0X29iai5zaG93X2xpc3QocGFyYW1fb2JqKTtcbiJdLCJuYW1lcyI6WyJEM1RleHRMaXN0IiwicGFyYW1fb2JqIiwiX2luaXRfcGFyYW0iLCJzZWxmIiwiY29udGFpbmVyX2lkIiwiZWxfY29udGFpbmVyX2lkIiwic2VsZWN0QWxsIiwicmVtb3ZlIiwibGlzdF9vYmoiLCJkMyIsImFwcGVuZCIsImF0dHIiLCJlbF9saXN0X2NsYXNzIiwiZGF0YSIsIml0ZW1fYXJyYXkiLCJlbnRlciIsImVhY2giLCJkIiwiaXRlbV9jbGFzcyIsInRleHQiLCJsYWJlbCIsIl9zZXRfZXZlbnQiLCJvbiIsImNsYXNzZWQiLCJlbF9tb3VzZW92ZXJfY2xhc3MiLCJ0ZXh0X2xpc3Rfb2JqIiwic2hvd19saXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFYUEsVUFBYjswQkFDZ0M7WUFBaEJDLFNBQWdCLHVFQUFKLEVBQUk7OzthQUNuQkMsV0FBTCxDQUFpQkQsU0FBakI7O2VBRU8sSUFBUDs7Ozs7b0NBR3NCO2dCQUFoQkEsU0FBZ0IsdUVBQUosRUFBSTs7Z0JBQ2xCRSxPQUFPLElBQVg7O2lCQUVLRCxXQUFMLENBQWlCRCxTQUFqQjs7Z0JBRUlHLGVBQWUsTUFBTSxLQUFLQyxlQUE5QjtxQkFDQSxDQUFVRCxZQUFWLEVBQXdCRSxTQUF4QixDQUFrQyxHQUFsQyxFQUF1Q0MsTUFBdkM7O2lCQUVLQyxRQUFMLEdBQWdCQyxTQUFBLENBQVVMLFlBQVYsRUFBd0JNLE1BQXhCLENBQStCLElBQS9CLENBQWhCOztpQkFFS0YsUUFBTCxDQUFjRyxJQUFkLENBQW1CLE9BQW5CLEVBQTRCUixLQUFLUyxhQUFqQyxFQUNLTixTQURMLENBQ2UsSUFEZixFQUVLTyxJQUZMLENBRVVWLEtBQUtXLFVBRmYsRUFHS0MsS0FITCxHQUlLTCxNQUpMLENBSVksSUFKWixFQUlrQk0sSUFKbEIsQ0FJdUIsVUFBVUMsQ0FBVixFQUFhO3lCQUM1QixDQUFVLElBQVYsRUFBZ0JOLElBQWhCLENBQXFCLE9BQXJCLEVBQThCTSxFQUFFQyxVQUFoQzt5QkFDQSxDQUFVLElBQVYsRUFBZ0JDLElBQWhCLENBQXFCRixFQUFFRyxLQUF2QjthQU5SOztpQkFTS0MsVUFBTDs7OztxQ0FHUztnQkFDTGxCLE9BQU8sSUFBWDs7aUJBRUtLLFFBQUwsQ0FBY0YsU0FBZCxDQUF3QixJQUF4QixFQUNLZ0IsRUFETCxDQUNRLFdBRFIsRUFDcUIsWUFBWTt5QkFDekIsQ0FBVSxJQUFWLEVBQWdCQyxPQUFoQixDQUF3QnBCLEtBQUtxQixrQkFBN0IsRUFBaUQsSUFBakQ7YUFGUixFQUdPRixFQUhQLENBR1UsVUFIVixFQUdzQixZQUFZO3lCQUMxQixDQUFVLElBQVYsRUFBZ0JDLE9BQWhCLENBQXdCcEIsS0FBS3FCLGtCQUE3QixFQUFpRCxLQUFqRDthQUpSOzs7O3NDQVF3QjtnQkFBaEJ2QixTQUFnQix1RUFBSixFQUFJOztpQkFDbkJJLGVBQUwsR0FBdUJKLFVBQVVJLGVBQVYsR0FBNEJKLFVBQVVJLGVBQXRDLEdBQXdELGlCQUEvRTtpQkFDS08sYUFBTCxHQUFxQlgsVUFBVVcsYUFBVixHQUEwQlgsVUFBVVcsYUFBcEMsR0FBb0QsaUJBQXpFO2lCQUNLWSxrQkFBTCxHQUEwQnZCLFVBQVV1QixrQkFBVixHQUErQnZCLFVBQVV1QixrQkFBekMsR0FBOEQsVUFBeEY7aUJBQ0tWLFVBQUwsR0FBa0JiLFVBQVVhLFVBQVYsR0FBdUJiLFVBQVVhLFVBQWpDLEdBQThDLEVBQWhFOzs7Ozs7QUM1Q1IsSUFBSUEsYUFBYSxDQUNiLEVBQUMsU0FBUyxpQkFBVixFQUE2QixjQUFjLFlBQTNDLEVBRGEsRUFFYixFQUFDLFNBQVMsZUFBVixFQUEyQixjQUFjLFVBQXpDLEVBRmEsRUFHYixFQUFDLFNBQVMsd0JBQVYsRUFBb0MsY0FBYyxRQUFsRCxFQUhhLENBQWpCOztBQU1BLElBQUliLFlBQVksRUFBaEI7QUFDQUEsVUFBVUksZUFBVixHQUE0QixpQkFBNUI7QUFDQUosVUFBVWEsVUFBVixHQUF1QkEsVUFBdkI7O0FBRUEsSUFBSVcsZ0JBQWdCLElBQUl6QixVQUFKLEVBQXBCO0FBQ0F5QixjQUFjQyxTQUFkLENBQXdCekIsU0FBeEI7OyJ9
