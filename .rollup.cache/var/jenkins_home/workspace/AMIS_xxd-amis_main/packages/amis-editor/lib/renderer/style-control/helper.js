import { __read, __spreadArray } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
export var inputStateTpl = function (className, path) {
    if (path === void 0) { path = ''; }
    return __spreadArray(__spreadArray(__spreadArray([
        {
            type: 'select',
            name: 'editorState',
            label: '状态',
            selectFirst: true,
            options: [
                {
                    label: '常规',
                    value: 'default'
                },
                {
                    label: '悬浮',
                    value: 'hover'
                },
                {
                    label: '点击',
                    value: 'active'
                }
            ]
        }
    ], __read(inputStateFunc("${editorState == 'default' || !editorState}", 'default', className, path)), false), __read(inputStateFunc("${editorState == 'hover'}", 'hover', className, path)), false), __read(inputStateFunc("${editorState == 'active'}", 'active', className, path)), false);
};
export var inputStateFunc = function (visibleOn, state, className, path, options) {
    if (options === void 0) { options = []; }
    return __spreadArray([
        getSchemaTpl('theme:font', {
            label: '文字',
            name: "".concat(className, ".font:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.font")
        }),
        getSchemaTpl('theme:colorPicker', {
            label: '背景',
            name: "".concat(className, ".background:").concat(state),
            labelMode: 'input',
            needGradient: true,
            needImage: true,
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.bg-color")
        }),
        getSchemaTpl('theme:border', {
            name: "".concat(className, ".border:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.border")
        }),
        getSchemaTpl('theme:paddingAndMargin', {
            name: "".concat(className, ".padding-and-margin:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.padding-and-margin")
        }),
        getSchemaTpl('theme:radius', {
            name: "".concat(className, ".radius:").concat(state),
            visibleOn: visibleOn,
            editorThemePath: "".concat(path, ".").concat(state, ".body.border")
        })
    ], __read(options), false);
};
