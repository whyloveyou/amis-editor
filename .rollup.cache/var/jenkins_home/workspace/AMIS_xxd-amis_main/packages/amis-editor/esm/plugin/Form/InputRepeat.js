import { __assign, __extends } from "tslib";
import { getSchemaTpl } from 'amis-editor-core';
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
var RepeatControlPlugin = /** @class */ (function (_super) {
    __extends(RepeatControlPlugin, _super);
    function RepeatControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-repeat';
        _this.$schema = '/schemas/RepeatControlSchema.json';
        // 组件名称
        _this.name = '重复周期选择';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-repeat';
        _this.pluginIcon = 'input-repeat-plugin';
        _this.description = '选择重复的频率，如每时、每天、每周等';
        _this.docLink = '/amis/zh-CN/components/form/input-repeat';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-repeat',
            label: '周期',
            name: 'repeat'
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = '周期';
        _this.panelBody = [
            getSchemaTpl('layout:originPosition', { value: 'left-top' }),
            getSchemaTpl('switchDefaultValue'),
            {
                type: 'input-text',
                name: 'value',
                label: '默认值',
                visibleOn: 'typeof this.value !== "undefined"'
            },
            {
                name: 'options',
                type: 'select',
                label: '启用单位',
                options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'.split(','),
                value: 'hourly,daily,weekly,monthly',
                multiple: true
            }
        ];
        return _this;
    }
    RepeatControlPlugin.id = 'RepeatControlPlugin';
    return RepeatControlPlugin;
}(BasePlugin));
export { RepeatControlPlugin };
registerEditorPlugin(RepeatControlPlugin);
