/**
 * @file API 适配器
 */
import { __assign, __decorate, __extends, __metadata, __read, __spreadArray } from "tslib";
import React from 'react';
import cx from 'classnames';
import { autobind, getSchemaTpl, setSchemaTpl } from 'amis-editor-core';
import { tipedLabel } from 'amis-editor-core';
import { FormItem, Icon, TooltipWrapper } from 'amis';
var APIAdaptorControl = /** @class */ (function (_super) {
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
        if (value === void 0) { value = ''; }
        (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, value);
    };
    // 生成tooltip 的参数
    APIAdaptorControl.prototype.genTooltipProps = function (content, othersProps) {
        var render = this.props.render;
        return __assign(__assign(__assign({ tooltipTheme: 'light', trigger: 'hover', rootClose: true, placement: 'top', tooltipClassName: 'ae-AdaptorControl-desc-tooltip' }, (typeof content === 'string'
            ? { content: content }
            : {
                content: ' ',
                children: function () {
                    return React.isValidElement(content)
                        ? content
                        : render('content', content);
                }
            })), (this.props.tooltipProps || {})), (othersProps || {}));
    };
    APIAdaptorControl.prototype.renderEditor = function () {
        if (!this.state.switch) {
            return null;
        }
        var _a = this.props, render = _a.render, _b = _a.params, params = _b === void 0 ? [] : _b, allowFullscreen = _a.allowFullscreen, value = _a.value, editorPlaceholder = _a.editorPlaceholder, editorDesc = _a.editorDesc, mergeParams = _a.mergeParams, mode = _a.mode;
        return (React.createElement(React.Fragment, null, render('api-adaptor-control-editor', {
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
        })));
    };
    APIAdaptorControl.prototype.renderSwitch = function () {
        var _this = this;
        var _a = this.props, render = _a.render, _b = _a.defaultCode, defaultCode = _b === void 0 ? '' : _b, switchTip = _a.switchTip, name = _a.name, value = _a.value;
        return render('api-adaptor-control-switch', {
            type: 'flex',
            className: 'mb-2',
            alignItems: 'center',
            direction: 'row',
            justify: 'flex-start',
            items: __spreadArray([
                {
                    type: 'switch',
                    label: '',
                    mode: 'inline',
                    name: '__editorSwitch_' + name,
                    key: 'switch',
                    className: 'mb-1',
                    value: this.state.switch,
                    onChange: function (checked) {
                        _this.setState({ switch: checked }, function () {
                            _this.onChange(!checked ? '' : value || defaultCode);
                        });
                    }
                }
            ], __read((switchTip
                ? [
                    React.createElement(TooltipWrapper, { key: "TooltipWrapper", tooltip: this.genTooltipProps(switchTip, {
                            placement: 'right'
                        }) },
                        React.createElement("span", { className: "leading-3 cursor-pointer" },
                            React.createElement(Icon, { icon: "editor-help", className: "icon", color: "#84868c" })))
                ]
                : [])), false)
        });
    };
    APIAdaptorControl.prototype.render = function () {
        var className = this.props.className;
        return (React.createElement("div", { className: cx('ae-ApiAdaptorControl', className) },
            this.renderSwitch(),
            this.renderEditor()));
    };
    APIAdaptorControl.defaultProps = {
        params: []
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], APIAdaptorControl.prototype, "onChange", null);
    return APIAdaptorControl;
}(React.Component));
export default APIAdaptorControl;
var APIAdaptorControlRenderer = /** @class */ (function (_super) {
    __extends(APIAdaptorControlRenderer, _super);
    function APIAdaptorControlRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    APIAdaptorControlRenderer = __decorate([
        FormItem({
            type: 'ae-apiAdaptorControl'
        })
    ], APIAdaptorControlRenderer);
    return APIAdaptorControlRenderer;
}(APIAdaptorControl));
export { APIAdaptorControlRenderer };
/**
 * 渲染 代码高亮 节点
 * @param code 代码字符串
 * @param size 渲染区域的width, height, 代码区域是异步渲染，tooltip时计算会偏移
 * @returns
 */
var genCodeSchema = function (code, size) { return (__assign(__assign({ type: 'container' }, (!size
    ? {}
    : {
        style: {
            width: size[0],
            height: size[1]
        }
    })), { body: {
        type: 'code',
        language: 'typescript',
        className: 'bg-white text-xs m-0',
        value: code
    } })); };
// 请求适配器 示例代码
export var requestAdaptorDefaultCode = "api.data.count = api.data.count + 1;\nreturn api;";
// 适配器 适配器 api 参数说明
export var adaptorApiStruct = "{\n  url: string; // \u5F53\u524D\u63A5\u53E3\u5730\u5740\n  method: 'get' | 'post' | 'put' | 'delete';\n  data?: Object; // \u8BF7\u6C42\u4F53\n  headers?: Object; // \u8BF7\u6C42\u5934\n  ...\n}";
// 适配器 适配器 context 参数说明
export var adaptorContextStruct = "{\n  // \u4E0A\u4E0B\u6587\u6570\u636E\n  [key: string]: any;\n}";
export var adaptorApiStructTooltip = genCodeSchema(adaptorApiStruct, [
    '350px',
    '128px'
]);
export var adaptorContextStructTooltip = genCodeSchema(adaptorContextStruct, [
    '350px',
    '128px'
]);
// 适配器 response 参数说明
export var adaptorResponseStruct = "{\n  data: Object; // \u63A5\u53E3\u8FD4\u56DE\u6570\u636E,\n  request: XMLHttpRequest;\n  headers?: Object; // \u8BF7\u6C42\u5934\n  status: number; // \u72B6\u6001\u7801 200, 404, 500..\n  statusText: string; // \u72B6\u6001\u4FE1\u606F\n  ...\n}";
export var adaptorResponseStructTooltip = genCodeSchema(adaptorResponseStruct, ['345px', '144px']);
// 接收适配器 示例代码
export var adaptorDefaultCode = "// API\u54CD\u5E94\u6216\u81EA\u5B9A\u4E49\u5904\u7406\u540E\u9700\u8981\u7B26\u5408\u4EE5\u4E0B\u683C\u5F0F\nreturn {\n    status: 0, // 0 \u8868\u793A\u8BF7\u6C42\u6210\u529F\uFF0C\u5426\u5219\u6309\u9519\u8BEF\u5904\u7406\n    msg: '\u8BF7\u6C42\u6210\u529F',\n    data: {\n        text: 'world',\n        items: [\n            {label: '\u5F20\u4E09', value: 1}\n        ]\n    }\n}";
export var validateApiAdaptorDefaultCode = "// \u6821\u9A8C\u6210\u529F\nreturn {\n    status: 0\n};\n\n// \u6821\u9A8C\u5931\u8D25\nreturn {\n  status: 422,\n  errors: '\u5F53\u524D\u7528\u6237\u5DF2\u5B58\u5728'\n}";
// 接收适配器 正确返回格式 示例
export var adaptorReturnStruct = "{\n  \"status\": 0,\n  \"msg\": \"\",\n  \"data\": {\n    // ...\u5176\u4ED6\u5B57\u6BB5\n  }\n}";
// 接收适配器 正确返回格式说明
export var adaptorEditorDescSchema = {
    type: 'container',
    className: 'text-xs',
    style: {
        width: '458px',
        height: '315px'
    },
    body: [
        '接口返回数据需要符合以下格式, status、msg、data 为必要字段',
        genCodeSchema(adaptorReturnStruct),
        {
            type: 'table',
            className: 'mt-1 mb-0',
            data: {
                items: [
                    {
                        label: 'status',
                        desc: '返回 0 表示当前接口正确返回，否则按错误请求处理'
                    },
                    {
                        label: 'msg',
                        desc: '返回接口处理信息，主要用于表单提交或请求失败时的 toast 显示'
                    },
                    {
                        label: 'data',
                        desc: '必须返回一个具有 key-value 结构的对象'
                    }
                ]
            },
            columns: [
                {
                    name: 'label',
                    label: '字段'
                },
                {
                    name: 'desc',
                    label: '说明'
                }
            ]
        }
    ]
};
// 表单项校验接收适配器 正确返回格式说明
export var validateApiAdaptorEditorDescSchema = {
    type: 'container',
    className: 'text-xs',
    body: [
        '校验接口返回格式字段说明：',
        {
            type: 'table',
            className: 'mt-1 mb-0',
            data: {
                items: [
                    {
                        label: 'status',
                        desc: '返回 0 表示校验成功，422 表示校验失败'
                    },
                    {
                        label: 'errors',
                        desc: '返回 status 为 422 时，显示的校验失败信息'
                    }
                ]
            },
            columns: [
                {
                    name: 'label',
                    label: '字段'
                },
                {
                    name: 'desc',
                    label: '说明'
                }
            ]
        }
    ]
};
setSchemaTpl('apiRequestAdaptor', {
    label: tipedLabel('发送适配器', "\u53EF\u57FA\u4E8E JavaScript \u8BED\u8A00\u76F4\u63A5\u5F55\u5165\u53D1\u9001\u9002\u914D\u5668\u7684\u51FD\u6570\u4F53\uFF0C\u5728\u8BE5\u51FD\u6570\u4F53\u5185\uFF0C\u60A8\u53EF\u4EE5\u5BF9 <span style=\"color: #108CEE\">api</span> \u8FDB\u884C\u5904\u7406\u6216\u8005\u8FD4\u56DE\u65B0\u7684\u5185\u5BB9\uFF0C\u6700\u540E\u9700\u8981 <span style=\"color: #108CEE\">return</span> <span style=\"color: #108CEE\">api</span>\u3002<br><br/>\n    \u51FD\u6570\u4F53\u5185\u53EF\u8BBF\u95EE\u7684\u53D8\u91CF\u5982\u4E0B\uFF1A<br/>\n    &nbsp;1. <span style=\"color: #108CEE\">api</span>\uFF1A\u63A5\u53E3\u7684schema\u914D\u7F6E\u5BF9\u8C61<br/>\n    &nbsp;2. <span style=\"color: #108CEE\">api.data</span>\uFF1A\u8BF7\u6C42\u6570\u636E<br/>\n    &nbsp;3. <span style=\"color: #108CEE\">api.query</span>\uFF1A\u8BF7\u6C42\u67E5\u8BE2\u53C2\u6570<br/>\n    &nbsp;4. <span style=\"color: #108CEE\">api.headers</span>\uFF1A\u8BF7\u6C42\u5934<br/>\n    &nbsp;5. <span style=\"color: #108CEE\">api.url</span>\uFF1A\u8BF7\u6C42\u5730\u5740<br/>"),
    name: 'requestAdaptor',
    type: 'ae-apiAdaptorControl',
    editorDesc: '必须将修改好的 api 对象 return 出去。',
    editorPlaceholder: requestAdaptorDefaultCode,
    params: [
        {
            label: 'api',
            tip: adaptorApiStructTooltip
        },
        {
            label: 'context',
            tip: adaptorContextStructTooltip
        }
    ]
});
setSchemaTpl('apiAdaptor', {
    label: tipedLabel('返回适配器', "\u53EF\u57FA\u4E8E JavaScript \u8BED\u8A00\u76F4\u63A5\u5F55\u5165\u8FD4\u56DE\u9002\u914D\u5668\u7684\u51FD\u6570\u4F53\uFF0C\u5728\u51FD\u6570\u4F53\u5185\uFF0C\u60A8\u53EF\u4EE5\u5BF9 <span style=\"color: #108CEE\">payload</span> \u8FDB\u884C\u5904\u7406\u6216\u8005\u8FD4\u56DE\u65B0\u7684\u5185\u5BB9\uFF0C\u6700\u540E\u9700\u8981 <span style=\"color: #108CEE\">return</span> \u63A5\u53E3\u6700\u7EC8\u7684\u8FD4\u56DE\u7ED3\u679C\u3002<br><br/>\n    \u51FD\u6570\u4F53\u5185\u53EF\u8BBF\u95EE\u7684\u53D8\u91CF\u5982\u4E0B\uFF1A<br/>\n    &nbsp;1. <span style=\"color: #108CEE\">payload</span>\uFF1A\u63A5\u53E3\u7684\u8FD4\u56DE\u7ED3\u679C<br/>\n    &nbsp;2. <span style=\"color: #108CEE\">response</span>\uFF1A\u63A5\u53E3\u7684response\u5BF9\u8C61<br/>\n    &nbsp;3. <span style=\"color: #108CEE\">api</span>\uFF1A\u63A5\u53E3\u7684schema\u914D\u7F6E\u5BF9\u8C61<br/>"),
    type: 'ae-apiAdaptorControl',
    name: 'adaptor',
    params: [
        {
            label: 'payload',
            tip: '当前请求的响应 payload，即 response.data'
        },
        {
            label: 'response',
            tip: adaptorResponseStructTooltip
        },
        {
            label: 'api',
            tip: adaptorApiStructTooltip
        }
    ],
    editorPlaceholder: adaptorDefaultCode,
    switchTip: adaptorEditorDescSchema
});
setSchemaTpl('validateApiAdaptor', __assign(__assign({}, getSchemaTpl('apiAdaptor')), { editorPlaceholder: validateApiAdaptorDefaultCode, switchTip: validateApiAdaptorEditorDescSchema }));
