import { __extends } from "tslib";
/**
 * @file Flex 布局
 */
import { registerEditorPlugin } from 'amis-editor-core';
import { FlexPluginBase } from './Layout/FlexPluginBase';
var FlexPlugin = /** @class */ (function (_super) {
    __extends(FlexPlugin, _super);
    function FlexPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = 'Flex 布局';
        _this.pluginIcon = 'flex-container-plugin';
        _this.description = '布局容器主要用于设计复杂布局的容器组件，基于 CSS Flex 实现的布局效果，比 Grid 和 HBox 对子节点位置的可控性更强，比用 CSS 类的方式更简单易用';
        return _this;
    }
    FlexPlugin.id = 'FlexPlugin';
    FlexPlugin.scene = ['layout'];
    return FlexPlugin;
}(FlexPluginBase));
export { FlexPlugin };
registerEditorPlugin(FlexPlugin);
