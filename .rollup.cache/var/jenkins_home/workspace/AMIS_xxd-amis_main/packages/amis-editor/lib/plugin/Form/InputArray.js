import { __assign, __extends } from "tslib";
import { Button } from 'amis';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl, valuePipeOut } from 'amis-editor-core';
import React from 'react';
import { diff, JSONPipeOut } from 'amis-editor-core';
var ArrayControlPlugin = /** @class */ (function (_super) {
    __extends(ArrayControlPlugin, _super);
    function ArrayControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-array';
        _this.$schema = '/schemas/ArrayControlSchema.json';
        _this.disabledRendererPlugin = true;
        // 组件名称
        _this.name = '数组输入框';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-bars';
        _this.pluginIcon = 'input-array-plugin';
        _this.description = 'Array 数组输入框，可自定义成员输入形式。其实是 Combo 的 flat 值打平的一种用法，可直接用 combo 代替。';
        _this.docLink = '/amis/zh-CN/components/form/input-array';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-array',
            label: '数组输入框',
            name: 'array',
            items: {
                type: 'input-text',
                placeholder: '请输入'
            }
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: [
                __assign(__assign({}, _this.scaffold), { value: ['row1', ''], draggable: true })
            ]
        };
        _this.panelTitle = '数组框';
        _this.panelBodyCreator = function (context) {
            return [
                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                getSchemaTpl('switchDefaultValue'),
                {
                    type: 'textarea',
                    name: 'value',
                    label: '默认值',
                    visibleOn: 'typeof this.value !== "undefined"',
                    pipeOut: valuePipeOut
                },
                {
                    children: (React.createElement(Button, { size: "sm", level: "danger", className: "m-b", block: true, onClick: _this.editDetail.bind(_this, context.id) }, "\u914D\u7F6E\u5B50\u8868\u5355\u9879"))
                },
                getSchemaTpl('switch', {
                    label: '是否可新增',
                    name: 'addable',
                    pipeIn: defaultValue(true)
                }),
                {
                    label: '新增按钮文字',
                    name: 'addButtonText',
                    type: 'input-text',
                    visibleOn: 'data.addable',
                    pipeIn: defaultValue('新增')
                },
                {
                    type: 'textarea',
                    name: 'scaffold',
                    label: '新增初始值',
                    visibleOn: 'this.addable !== false',
                    pipeOut: valuePipeOut,
                    pipeIn: defaultValue('')
                },
                getSchemaTpl('switch', {
                    label: '是否可删除',
                    name: 'removable',
                    pipeIn: defaultValue(true)
                }),
                getSchemaTpl('api', {
                    name: 'deleteApi',
                    label: '删除前的请求',
                    visibleOn: 'data.removable'
                }),
                {
                    label: '删除确认提示',
                    name: 'deleteConfirmText',
                    type: 'input-text',
                    visibleOn: 'data.deleteApi',
                    pipeIn: defaultValue('确认要删除')
                },
                getSchemaTpl('switch', {
                    name: 'draggable',
                    label: '启用拖拽排序'
                }),
                {
                    name: 'draggableTip',
                    visibleOn: 'data.draggable',
                    type: 'input-text',
                    label: '可拖拽排序提示文字',
                    pipeIn: defaultValue('可通过拖动每行中的【交换】按钮进行顺序调整')
                },
                {
                    name: 'addButtonText',
                    type: 'input-text',
                    label: '新增按钮文字',
                    pipeIn: defaultValue('新增')
                },
                getSchemaTpl('minLength'),
                getSchemaTpl('maxLength')
            ];
        };
        return _this;
    }
    ArrayControlPlugin.prototype.filterProps = function (props) {
        props = JSONPipeOut(props);
        // 至少显示一个成员，否则啥都不显示。
        if (!props.value) {
            props.value = [''];
        }
        return props;
    };
    ArrayControlPlugin.prototype.buildEditorToolbar = function (_a, toolbars) {
        var id = _a.id, info = _a.info;
        if (info.renderer.name === 'input-array') {
            toolbars.push({
                icon: 'fa fa-expand',
                order: 100,
                tooltip: '配置子表单项',
                onClick: this.editDetail.bind(this, id)
            });
        }
    };
    ArrayControlPlugin.prototype.buildEditorContextMenu = function (_a, menus) {
        var id = _a.id, schema = _a.schema, region = _a.region, info = _a.info;
        if (info.renderer.name === 'input-array') {
            menus.push('|', {
                label: '配置成员渲染器',
                onSelect: this.editDetail.bind(this, id)
            });
        }
    };
    ArrayControlPlugin.prototype.editDetail = function (id) {
        var manager = this.manager;
        var store = manager.store;
        var node = store.getNodeById(id);
        var value = store.getValueOf(id);
        node &&
            value &&
            this.manager.openSubEditor({
                title: '配置子表单项',
                value: value.items,
                slot: {
                    type: 'form',
                    mode: 'normal',
                    body: '$$',
                    wrapWithPanel: false,
                    className: 'wrapper'
                },
                onChange: function (newValue) {
                    newValue = __assign(__assign({}, value), { items: newValue });
                    manager.panelChangeValue(newValue, diff(value, newValue));
                }
            });
    };
    ArrayControlPlugin.id = 'ArrayControlPlugin';
    return ArrayControlPlugin;
}(BasePlugin));
export { ArrayControlPlugin };
registerEditorPlugin(ArrayControlPlugin);
