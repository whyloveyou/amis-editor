import { __assign, __extends } from "tslib";
import { registerEditorPlugin, getSchemaTpl } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
var UUIDControlPlugin = /** @class */ (function (_super) {
    __extends(UUIDControlPlugin, _super);
    function UUIDControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'uuid';
        _this.$schema = '/schemas/UUIDControlSchema.json';
        // 组件名称
        _this.name = 'UUID';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-eye-slash';
        _this.pluginIcon = 'uuid-plugin';
        _this.description = '自动生成的 UUID';
        _this.docLink = '/amis/zh-CN/components/form/uuid';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'uuid',
            name: 'uuid'
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'UUID';
        _this.panelBody = [
            getSchemaTpl('layout:originPosition', { value: 'left-top' }),
            { type: 'static', value: '自动按 UUID v4 格式生成，无需配置' }
        ];
        return _this;
    }
    UUIDControlPlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder('UUID（展现将隐藏）', props.key, props.style);
    };
    UUIDControlPlugin.id = 'UUIDControlPlugin';
    return UUIDControlPlugin;
}(BasePlugin));
export { UUIDControlPlugin };
registerEditorPlugin(UUIDControlPlugin);
