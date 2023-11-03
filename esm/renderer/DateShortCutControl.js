/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import Sortable from 'sortablejs';
import { findDOMNode } from 'react-dom';
import { FormItem, Icon } from 'amis';
import { getSchemaTpl, autobind } from 'amis-editor-core';
import { FormulaDateType } from './FormulaControl.js';
import { i18n } from 'i18n-runtime';

var DefaultValue = ['yesterday', '7daysago', 'thismonth', 'prevmonth', 'prevquarter'];
var CertainPresetShorcut = {
  today: i18n("800dfdd90200bd47bb4bb83def4fea56"),
  yesterday: i18n("2f8d6f1584b73bfc6dada44526abb502"),
  thisweek: i18n("0dc86a275145ad5a7774e594f0d94a06"),
  prevweek: i18n("79abd4ee3661ff70c7d79716c8aaed83"),
  thismonth: i18n("8f2a5a5f6e3777c7a0e1ce9484a2f7d7"),
  prevmonth: i18n("d5578d93388a5b2552316418cd1124da"),
  thisquarter: i18n("ffb2b7fbf227d9d21e03d0f160fb2a34"),
  prevquarter: i18n("dd657784cc0d5511d2f25459e49ead1a"),
  thisyear: i18n("d3dbc7a7fd9fc5ccd168084c8579c1ec")
};
var ModifyPresetShorcut = {
  $hoursago: i18n("6de215632addbb664d254e00532d92aa"),
  $daysago: i18n("fd312ae2f1c24b8a14d9412bb3c6bb76"),
  $dayslater: i18n("68cba5f27ab003cfada5eb4c1f29eb21"),
  $weeksago: i18n("34b06708894a178c440e6f6539e95e9e"),
  $weekslater: i18n("f0e1b8d8a6e731360d7348bc8301d44a"),
  $monthsago: i18n("5cad2778bb8f01d1a1b1226082eb2117"),
  $monthslater: i18n("ff76f60b3da86a0d2c6663b170a7955a"),
  $quartersago: i18n("9ff9b56c9ed633ee09396830e93113ad"),
  $quarterslater: i18n("2b80b20008b3ae81136217ae10a1fbaf"),
  $yearsago: i18n("84752114d27119dc50d8a7b9ac0b788b"),
  $yearslater: i18n("5df2352afebd73d1f568ebaa81e2db28")
};
var OptionType;
(function (OptionType) {
  OptionType[OptionType["Custom"] = 1] = "Custom";
  OptionType[OptionType["Certain"] = 2] = "Certain";
  OptionType[OptionType["Modify"] = 3] = "Modify";
})(OptionType || (OptionType = {}));
var ShortCutItemWrap = function (props) {
  return React__default.createElement(React__default.Fragment, null, React__default.createElement("a", {
    className: klass + 'Item-dragBar'
  }, React__default.createElement(Icon, {
    icon: "drag-bar",
    className: "icon"
  })), React__default.createElement("span", {
    className: klass + 'Item-content'
  }, props.children), React__default.createElement("span", {
    className: klass + 'Item-close',
    onClick: function (e) {
      return props.handleDelete(props.index, e);
    }
  }, React__default.createElement(Icon, {
    icon: "status-close",
    className: "icon"
  })));
};
var klass = 'ae-DateShortCutControl';
var DateShortCutControl = /** @class */function (_super) {
  __extends(DateShortCutControl, _super);
  function DateShortCutControl(props) {
    var _this = this;
    var _a, _b;
    _this = _super.call(this, props) || this;
    // 初始化下拉选项
    var certainOptions = props.certainOptions,
      modifyOptions = props.modifyOptions,
      data = props.data;
    _this.certainDropDownOptions = certainOptions.map(function (key) {
      return {
        label: CertainPresetShorcut[key],
        value: key
      };
    });
    _this.modifyDropDownOptions = modifyOptions.map(function (key) {
      return {
        label: ModifyPresetShorcut[key],
        value: key
      };
    });
    // 初始化原始组件配置的快捷键
    /** amis 3.1.0之后ranges属性废弃，此处兼容 */
    var initData = (_b = (_a = data === null || data === void 0 ? void 0 : data.ranges) !== null && _a !== void 0 ? _a : data === null || data === void 0 ? void 0 : data.shortcuts) !== null && _b !== void 0 ? _b : DefaultValue;
    initData = Array.isArray(initData) ? initData : initData.split(',');
    _this.state = {
      options: initData.map(function (item) {
        if (!item) {
          return null;
        }
        // 完全自定义的快捷键
        if (typeof item != 'string' && item.label && item.startDate && item.endDate) {
          return {
            type: OptionType.Custom,
            data: item
          };
        }
        // amis中提供的可灵活配置数字的自定义快捷键
        var arr = item.match(/^([a-zA-Z]*)(\d+)([a-zA-Z]*)$/);
        if (arr) {
          return {
            data: {
              value: arr[2],
              key: "".concat(arr[1], "$").concat(arr[3])
            },
            type: OptionType.Modify
          };
        }
        // 固定值的快捷键
        return {
          data: item,
          type: OptionType.Certain
        };
      }).filter(Boolean)
    };
    return _this;
  }
  DateShortCutControl.prototype.dragRef = function (ref) {
    if (!this.drag && ref) {
      this.initDragging();
    } else if (this.drag && !ref) {
      this.destroyDragging();
    }
    this.drag = ref;
  };
  /*
   * 滚动到底部
   */
  DateShortCutControl.prototype.scrollToBottom = function () {
    var _a, _b;
    this.drag && ((_b = (_a = this.drag) === null || _a === void 0 ? void 0 : _a.lastElementChild) === null || _b === void 0 ? void 0 : _b.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    }));
  };
  /**
   * 初始化拖动
   */
  DateShortCutControl.prototype.initDragging = function () {
    var _this = this;
    var dom = findDOMNode(this);
    this.sortable = new Sortable(dom.querySelector(".".concat(klass, "-content")), {
      group: 'OptionControlGroup',
      animation: 150,
      handle: ".".concat(klass, "Item-dragBar"),
      ghostClass: "".concat(klass, "Item-dragging"),
      onEnd: function (e) {
        // 没有移动
        if (e.newIndex === e.oldIndex) {
          return;
        }
        // 换回来
        var parent = e.to;
        if (e.newIndex < e.oldIndex && e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
        } else if (e.oldIndex < parent.childNodes.length - 1) {
          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
        } else {
          parent.appendChild(e.item);
        }
        var options = _this.state.options.concat();
        options[e.oldIndex] = options.splice(e.newIndex, 1, options[e.oldIndex])[0];
        _this.setState({
          options: options
        }, function () {
          return _this.onChangeOptions();
        });
      }
    });
  };
  /**
   * 拖动的销毁
   */
  DateShortCutControl.prototype.destroyDragging = function () {
    this.sortable && this.sortable.destroy();
  };
  /**
   * 生成快捷键项的配置
   */
  DateShortCutControl.prototype.renderOption = function (option, index) {
    var _this = this;
    var _a;
    var _b = this.props,
      render = _b.render,
      schema = _b.data;
    if (option.type === OptionType.Certain) {
      return React__default.createElement("span", {
        className: klass + 'Item-content-label'
      }, CertainPresetShorcut[option.data]);
    }
    if (option.type === OptionType.Custom) {
      var data = option === null || option === void 0 ? void 0 : option.data;
      return render('inner', {
        type: 'form',
        wrapWithPanel: false,
        body: [{
          type: 'input-text',
          mode: 'normal',
          placeholder: i18n("a6a93b404bc039cded728683af5d625d"),
          name: 'label'
        }, getSchemaTpl('valueFormula', {
          name: 'startDate',
          header: i18n("98229308e2e9484583fde4ae363a979f"),
          DateTimeType: FormulaDateType.IsDate,
          rendererSchema: __assign(__assign({}, schema), {
            type: 'input-date'
          }),
          placeholder: i18n("592c59589144ddc68d05d528da17dcdc"),
          needDeleteProps: ['ranges', 'shortcuts', 'maxDate', 'id', 'minDuration'],
          label: false
        }), getSchemaTpl('valueFormula', {
          name: 'endDate',
          header: i18n("98229308e2e9484583fde4ae363a979f"),
          DateTimeType: FormulaDateType.IsDate,
          rendererSchema: __assign(__assign({}, schema), {
            type: 'input-date'
          }),
          placeholder: i18n("f782779e8b5d709462c8e71e0d9019f2"),
          needDeleteProps: ['ranges', 'shortcuts', 'maxDate', 'id', 'minDuration'],
          label: false
        })],
        onChange: function (value) {
          _this.handleOptionChange(value, index);
        }
      }, {
        data: data
      });
    }
    var key = option.data.key;
    var label = ((_a = ModifyPresetShorcut[key]) === null || _a === void 0 ? void 0 : _a.split('n')) || [];
    return render('inner', {
      type: 'form',
      wrapWithPanel: false,
      body: [{
        name: 'value',
        type: 'input-text',
        prefix: label[0] || undefined,
        suffix: label[1] || undefined,
        mode: 'normal',
        placeholder: 'n'
      }],
      onChange: function (value) {
        return _this.handleOptionChange(value, index);
      }
    }, {
      data: option.data
    });
  };
  /**
   * 生成内容体
   */
  DateShortCutControl.prototype.renderContent = function () {
    var _this = this;
    var options = this.state.options;
    return React__default.createElement("div", {
      className: klass + '-wrapper'
    }, options && options.length ? React__default.createElement("ul", {
      className: klass + '-content',
      ref: this.dragRef
    }, options.map(function (option, index) {
      return React__default.createElement("li", {
        className: klass + 'Item',
        key: index
      }, React__default.createElement(ShortCutItemWrap, {
        index: index,
        handleDelete: _this.handleDelete
      }, _this.renderOption(option, index)));
    })) : React__default.createElement("div", {
      className: klass + '-content ' + klass + '-empty'
    }, i18n("71dc8feb597052ecd0e73c9062eecdeb")));
  };
  /**
   * 自定义跨度变化
   */
  DateShortCutControl.prototype.handleOptionChange = function (data, index) {
    var _this = this;
    var options = __spreadArray([], __read(this.state.options), false);
    options[index].data = data;
    this.setState({
      options: options
    }, function () {
      return _this.onChangeOptions();
    });
  };
  /**
   * option添加
   */
  DateShortCutControl.prototype.addItem = function (item, type) {
    var _this = this;
    this.setState({
      options: this.state.options.concat({
        type: type,
        data: type === OptionType.Certain ? item.value : type === OptionType.Modify ? {
          key: item.value,
          value: undefined
        } : {
          label: undefined,
          startDate: undefined,
          endDate: undefined
        }
      })
    }, function () {
      _this.onChangeOptions();
      _this.scrollToBottom();
    });
  };
  /**
   * 删除选项
   */
  DateShortCutControl.prototype.handleDelete = function (index, e) {
    var _this = this;
    var options = this.state.options.concat();
    options.splice(index, 1);
    this.setState({
      options: options
    }, function () {
      return _this.onChangeOptions();
    });
  };
  /**
   * 更新options字段的统一出口
   */
  DateShortCutControl.prototype.onChangeOptions = function () {
    var _a;
    var options = this.state.options;
    var _b = this.props,
      onBulkChange = _b.onBulkChange,
      name = _b.name;
    var newRanges = [];
    options.forEach(function (item) {
      if (item.type === OptionType.Certain) {
        newRanges.push(item.data);
      }
      if (item.type === OptionType.Modify) {
        var data = item.data;
        var value = data.value;
        /^\d+$/.test(value) && newRanges.push(data.key.replace('$', value));
      }
      if (item.type === OptionType.Custom) {
        var data = item.data;
        data.label && data.startDate && data.endDate && newRanges.push(__assign({}, data));
      }
    });
    /** amis 3.1.0之后ranges属性废弃 */
    onBulkChange && onBulkChange((_a = {}, _a[name !== null && name !== void 0 ? name : 'shortcuts'] = newRanges, _a.ranges = undefined, _a));
  };
  DateShortCutControl.prototype.render = function () {
    var _this = this;
    var _a = this.props,
      className = _a.className,
      label = _a.label,
      render = _a.render;
    return React__default.createElement("div", {
      className: cx(klass, className)
    }, React__default.createElement("header", {
      className: klass + '-header'
    }, React__default.createElement("label", null, label)), this.renderContent(), React__default.createElement("div", {
      className: klass + '-footer'
    }, React__default.createElement("div", {
      className: klass + '-footer-btn'
    }, render('inner', {
      type: 'dropdown-button',
      label: i18n("279d93f2d745ed08e9034022941510dc"),
      closeOnClick: true,
      closeOnOutside: true,
      level: 'enhance',
      buttons: this.certainDropDownOptions.map(function (item) {
        return __assign(__assign({}, item), {
          type: 'button',
          onAction: function (e, action) {
            return _this.addItem(item, OptionType.Certain);
          }
        });
      })
    }, {
      popOverContainer: null
    })), React__default.createElement("div", {
      className: klass + '-footer-btn'
    }, render('inner', {
      type: 'dropdown-button',
      label: i18n("7a1e5f93e362d371519bcb2bfdb0fc9a"),
      closeOnClick: true,
      closeOnOutside: true,
      buttons: this.modifyDropDownOptions.map(function (item) {
        return __assign(__assign({}, item), {
          type: 'button',
          onAction: function (e, action) {
            return _this.addItem(item, OptionType.Modify);
          }
        });
      }).concat([{
        type: 'button',
        label: i18n("0d98c74797e49d00bcc4c17c9d557a2b"),
        onAction: function (e, action) {
          return _this.addItem({
            value: {
              label: undefined,
              startDate: undefined,
              endData: undefined
            }
          }, OptionType.Custom);
        }
      }])
    }, {
      popOverContainer: null
    }))));
  };
  DateShortCutControl.defaultProps = {
    label: i18n("f7d2996639d97b4a03fc0e40e2eb853a")
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], DateShortCutControl.prototype, "dragRef", null);
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Number, Object]), __metadata("design:returntype", void 0)], DateShortCutControl.prototype, "handleDelete", null);
  return DateShortCutControl;
}(React__default.PureComponent);
/** @class */(function (_super) {
  __extends(DateShortCutControlRender, _super);
  function DateShortCutControlRender() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  DateShortCutControlRender = __decorate([FormItem({
    type: klass,
    renderLabel: false
  })], DateShortCutControlRender);
  return DateShortCutControlRender;
})(DateShortCutControl);

export { DateShortCutControl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
