/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __extends, __assign, __spreadArray, __read, __decorate, __metadata } from 'tslib';
import React__default from 'react';
import cx from 'classnames';
import { autobind, setSchemaTpl, tipedLabel, getSchemaTpl } from 'amis-editor-core';
import { TooltipWrapper, Icon, FormItem } from 'amis';
import { i18n } from 'i18n-runtime';

/**
 * @file API 适配器
 */
var APIAdaptorControl = /** @class */function (_super) {
  __extends(APIAdaptorControl, _super);
  function APIAdaptorControl(props) {
    var _this = _super.call(this, props) || this;
    _this.state = {
      switch: !!_this.props.value
    };
    return _this;
  }
  APIAdaptorControl.prototype.onChange = function (value) {
    var _a, _b;
    if (value === void 0) {
      value = '';
    }
    (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
  };
  // 生成tooltip 的参数
  APIAdaptorControl.prototype.genTooltipProps = function (content, othersProps) {
    var render = this.props.render;
    return __assign(__assign(__assign({
      tooltipTheme: 'light',
      trigger: 'hover',
      rootClose: true,
      placement: 'top',
      tooltipClassName: 'ae-AdaptorControl-desc-tooltip'
    }, typeof content === 'string' ? {
      content: content
    } : {
      content: ' ',
      children: function () {
        return React__default.isValidElement(content) ? content : render('content', content);
      }
    }), this.props.tooltipProps || {}), othersProps || {});
  };
  APIAdaptorControl.prototype.renderEditor = function () {
    if (!this.state.switch) {
      return null;
    }
    var _a = this.props,
      render = _a.render,
      _b = _a.params,
      params = _b === void 0 ? [] : _b,
      allowFullscreen = _a.allowFullscreen,
      value = _a.value,
      editorPlaceholder = _a.editorPlaceholder,
      editorDesc = _a.editorDesc,
      mergeParams = _a.mergeParams,
      mode = _a.mode;
    return React__default.createElement(React__default.Fragment, null, render('api-adaptor-control-editor', {
      type: 'ae-functionEditorControl',
      name: 'functionEditorControl',
      placeholder: editorPlaceholder,
      desc: editorDesc,
      allowFullscreen: allowFullscreen,
      params: params,
      mode: mode || 'normal'
    }, {
      value: value,
      mergeParams: mergeParams,
      onChange: this.onChange
    }));
  };
  APIAdaptorControl.prototype.renderSwitch = function () {
    var _this = this;
    var _a = this.props,
      render = _a.render,
      _b = _a.defaultCode,
      defaultCode = _b === void 0 ? '' : _b,
      switchTip = _a.switchTip,
      name = _a.name,
      value = _a.value;
    return render('api-adaptor-control-switch', {
      type: 'flex',
      className: 'mb-2',
      alignItems: 'center',
      direction: 'row',
      justify: 'flex-start',
      items: __spreadArray([{
        type: 'switch',
        label: '',
        mode: 'inline',
        name: '__editorSwitch_' + name,
        key: 'switch',
        className: 'mb-1',
        value: this.state.switch,
        onChange: function (checked) {
          _this.setState({
            switch: checked
          }, function () {
            _this.onChange(!checked ? '' : value || defaultCode);
          });
        }
      }], __read(switchTip ? [React__default.createElement(TooltipWrapper, {
        key: "TooltipWrapper",
        tooltip: this.genTooltipProps(switchTip, {
          placement: 'right'
        })
      }, React__default.createElement("span", {
        className: "leading-3 cursor-pointer"
      }, React__default.createElement(Icon, {
        icon: "editor-help",
        className: "icon",
        color: "#84868c"
      })))] : []), false)
    });
  };
  APIAdaptorControl.prototype.render = function () {
    var className = this.props.className;
    return React__default.createElement("div", {
      className: cx('ae-ApiAdaptorControl', className)
    }, this.renderSwitch(), this.renderEditor());
  };
  APIAdaptorControl.defaultProps = {
    params: []
  };
  __decorate([autobind, __metadata("design:type", Function), __metadata("design:paramtypes", [Object]), __metadata("design:returntype", void 0)], APIAdaptorControl.prototype, "onChange", null);
  return APIAdaptorControl;
}(React__default.Component);
/** @class */(function (_super) {
  __extends(APIAdaptorControlRenderer, _super);
  function APIAdaptorControlRenderer() {
    return _super !== null && _super.apply(this, arguments) || this;
  }
  APIAdaptorControlRenderer = __decorate([FormItem({
    type: 'ae-apiAdaptorControl'
  })], APIAdaptorControlRenderer);
  return APIAdaptorControlRenderer;
})(APIAdaptorControl);
/**
 * 渲染 代码高亮 节点
 * @param code 代码字符串
 * @param size 渲染区域的width, height, 代码区域是异步渲染，tooltip时计算会偏移
 * @returns
 */
var genCodeSchema = function (code, size) {
  return __assign(__assign({
    type: 'container'
  }, !size ? {} : {
    style: {
      width: size[0],
      height: size[1]
    }
  }), {
    body: {
      type: 'code',
      language: 'typescript',
      className: 'bg-white text-xs m-0',
      value: code
    }
  });
};
// 请求适配器 示例代码
var requestAdaptorDefaultCode = "api.data.count = api.data.count + 1;\nreturn api;";
// 适配器 适配器 api 参数说明
var adaptorApiStruct = i18n("717b9f738e2da460071b1b5ae7cc0e06");
// 适配器 适配器 context 参数说明
var adaptorContextStruct = i18n("fd8f406e39d5c4b1f1f2251156eb34ef");
var adaptorApiStructTooltip = genCodeSchema(adaptorApiStruct, ['350px', '128px']);
var adaptorContextStructTooltip = genCodeSchema(adaptorContextStruct, ['350px', '128px']);
// 适配器 response 参数说明
var adaptorResponseStruct = i18n("d1bfe86cb1776358c5ed50bc137a2b7a");
var adaptorResponseStructTooltip = genCodeSchema(adaptorResponseStruct, ['345px', '144px']);
// 接收适配器 示例代码
var adaptorDefaultCode = i18n("d3b13672e0e24d1490b2564ae7f6da4e");
var validateApiAdaptorDefaultCode = i18n("36d7adab7769ff6741b2860f041e56d2");
// 接收适配器 正确返回格式 示例
var adaptorReturnStruct = i18n("0228c8f19830732b523a58a2ee0bbcfd");
// 接收适配器 正确返回格式说明
var adaptorEditorDescSchema = {
  type: 'container',
  className: 'text-xs',
  style: {
    width: '458px',
    height: '315px'
  },
  body: [i18n("6d8e3115be41a8a5690d6fefa637dac7"), genCodeSchema(adaptorReturnStruct), {
    type: 'table',
    className: 'mt-1 mb-0',
    data: {
      items: [{
        label: 'status',
        desc: i18n("09212e946a4d9b0f775700c46ef0dcd5")
      }, {
        label: 'msg',
        desc: i18n("7391774e57425e5d8e83de64100b5f2e")
      }, {
        label: 'data',
        desc: i18n("fa385c23820ee9999c82035086baa772")
      }]
    },
    columns: [{
      name: 'label',
      label: i18n("9caecd931b956381e0763d05aa42835c")
    }, {
      name: 'desc',
      label: i18n("f411d0f1f925d9b48d8c1d451bd809b1")
    }]
  }]
};
// 表单项校验接收适配器 正确返回格式说明
var validateApiAdaptorEditorDescSchema = {
  type: 'container',
  className: 'text-xs',
  body: [i18n("6494bc042d99f2f5de34a858b8a699c6"), {
    type: 'table',
    className: 'mt-1 mb-0',
    data: {
      items: [{
        label: 'status',
        desc: i18n("e6246c03148f553e5d6a66adbdabb9f8")
      }, {
        label: 'errors',
        desc: i18n("b8079b9d1e6d3e8a457787910a75cce4")
      }]
    },
    columns: [{
      name: 'label',
      label: i18n("9caecd931b956381e0763d05aa42835c")
    }, {
      name: 'desc',
      label: i18n("f411d0f1f925d9b48d8c1d451bd809b1")
    }]
  }]
};
setSchemaTpl('apiRequestAdaptor', {
  label: tipedLabel(i18n("417125a06b1d2bfff025e83a4e067bf0"), i18n("e83caa4c6ef82543603609c916cd804d")),
  name: 'requestAdaptor',
  type: 'ae-apiAdaptorControl',
  editorDesc: i18n("a59c65bea7d5065f19eb9c918a716c33"),
  editorPlaceholder: requestAdaptorDefaultCode,
  params: [{
    label: 'api',
    tip: adaptorApiStructTooltip
  }, {
    label: 'context',
    tip: adaptorContextStructTooltip
  }]
});
setSchemaTpl('apiAdaptor', {
  label: tipedLabel(i18n("05fb5edb84e41c19b0f5429fff20b834"), i18n("44af993b124817085dc2579a9f842d55")),
  type: 'ae-apiAdaptorControl',
  name: 'adaptor',
  params: [{
    label: 'payload',
    tip: i18n("98498eb59e87ec9a0eaf98ac55628da9")
  }, {
    label: 'response',
    tip: adaptorResponseStructTooltip
  }, {
    label: 'api',
    tip: adaptorApiStructTooltip
  }],
  editorPlaceholder: adaptorDefaultCode,
  switchTip: adaptorEditorDescSchema
});
setSchemaTpl('validateApiAdaptor', __assign(__assign({}, getSchemaTpl('apiAdaptor')), {
  editorPlaceholder: validateApiAdaptorDefaultCode,
  switchTip: validateApiAdaptorEditorDescSchema
}));

export { adaptorApiStruct, adaptorApiStructTooltip, adaptorContextStruct, adaptorContextStructTooltip, adaptorDefaultCode, adaptorEditorDescSchema, adaptorResponseStruct, adaptorResponseStructTooltip, adaptorReturnStruct, APIAdaptorControl as default, requestAdaptorDefaultCode, validateApiAdaptorDefaultCode, validateApiAdaptorEditorDescSchema };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
