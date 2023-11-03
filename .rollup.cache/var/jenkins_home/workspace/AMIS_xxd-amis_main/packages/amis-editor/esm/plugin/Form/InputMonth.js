import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { DateControlPlugin } from './InputDate';
var MonthControlPlugin = /** @class */ (function (_super) {
    __extends(MonthControlPlugin, _super);
    function MonthControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-month';
        _this.$schema = '/schemas/MonthControlSchema.json';
        // 组件名称
        _this.name = '日期';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'inputMonth-plugin';
        _this.icon = 'fa fa-calendar';
        _this.description = '月份选择';
        _this.docLink = '/amis/zh-CN/components/form/input-month';
        _this.tags = ['表单项'];
        // @ts-ignore
        _this.scaffold = {
            type: 'input-month',
            name: 'month'
        };
        _this.disabledRendererPlugin = true;
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'Month';
        return _this;
    }
    MonthControlPlugin.id = 'MonthControlPlugin';
    return MonthControlPlugin;
}(DateControlPlugin));
export { MonthControlPlugin };
registerEditorPlugin(MonthControlPlugin);
