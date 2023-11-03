import { __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { FlexPluginBase, defaultFlexColumnSchema } from './FlexPluginBase';
var Layout_fixed_top = /** @class */ (function (_super) {
    __extends(Layout_fixed_top, _super);
    function Layout_fixed_top() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '吸附容器';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'layout-fixed-top';
        _this.description = '吸附容器: 可设置成吸顶或者吸顶展示。';
        _this.order = -1;
        _this.scaffold = {
            type: 'flex',
            isSorptionContainer: true,
            sorptionPosition: 'top',
            className: 'p-1',
            items: [
                defaultFlexColumnSchema(),
                defaultFlexColumnSchema(),
                defaultFlexColumnSchema(),
                defaultFlexColumnSchema()
            ],
            style: {
                position: 'fixed',
                inset: '0 auto auto 0',
                zIndex: 10,
                width: '100%',
                overflowX: 'auto',
                margin: '0',
                overflowY: 'auto'
            },
            isFixedWidth: true,
            isFixedHeight: false,
            originPosition: 'right-bottom'
        };
        _this.panelTitle = '吸附容器';
        return _this;
    }
    Layout_fixed_top.id = 'Layout_fixed_top';
    Layout_fixed_top.scene = ['layout'];
    return Layout_fixed_top;
}(FlexPluginBase));
export default Layout_fixed_top;
registerEditorPlugin(Layout_fixed_top);
