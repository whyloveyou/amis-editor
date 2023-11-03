import { __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { FlexPluginBase } from './FlexPluginBase';
var Layout1_2_v4 = /** @class */ (function (_super) {
    __extends(Layout1_2_v4, _super);
    function Layout1_2_v4() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = '经典布局';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'layout-3-1-plugin';
        _this.description = '常见布局：经典布局（基于 CSS Flex 实现的布局容器）。';
        _this.order = 307;
        _this.scaffold = {
            type: 'flex',
            className: 'p-1',
            items: [
                {
                    type: 'container',
                    size: 'xs',
                    body: [],
                    wrapperBody: false,
                    style: {
                        flex: '0 0 auto',
                        display: 'block'
                    }
                },
                {
                    type: 'flex',
                    items: [
                        {
                            type: 'container',
                            size: 'xs',
                            body: [],
                            wrapperBody: false,
                            style: {
                                flex: '0 0 auto',
                                flexBasis: '250px',
                                display: 'block'
                            }
                        },
                        {
                            type: 'flex',
                            items: [
                                {
                                    type: 'container',
                                    size: 'xs',
                                    body: [],
                                    wrapperBody: false,
                                    style: {
                                        flex: '1 1 auto',
                                        flexBasis: 'auto',
                                        flexGrow: 1,
                                        display: 'block'
                                    }
                                },
                                {
                                    type: 'container',
                                    size: 'xs',
                                    body: [],
                                    wrapperBody: false,
                                    style: {
                                        flex: '1 1 auto',
                                        flexBasis: 'auto',
                                        flexGrow: 1,
                                        display: 'block'
                                    }
                                }
                            ],
                            style: {
                                position: 'static',
                                overflowX: 'auto',
                                overflowY: 'auto',
                                margin: '0',
                                flex: '1 1 auto',
                                flexGrow: 1,
                                flexBasis: 'auto'
                            },
                            alignItems: 'stretch',
                            direction: 'column',
                            justify: 'center',
                            isFixedHeight: false,
                            isFixedWidth: false
                        }
                    ],
                    style: {
                        flex: '1 1 auto',
                        overflowX: 'auto',
                        margin: '0',
                        maxWidth: 'auto',
                        overflowY: 'auto',
                        position: 'static',
                        minWidth: 'auto',
                        width: 'auto',
                        maxHeight: 'auto',
                        minHeight: '300px'
                    },
                    direction: 'row',
                    justify: 'flex-start',
                    alignItems: 'stretch',
                    isFixedHeight: false,
                    isFixedWidth: false
                }
            ],
            direction: 'column',
            justify: 'center',
            alignItems: 'stretch'
        };
        return _this;
    }
    Layout1_2_v4.id = 'Layout1_2_v4';
    Layout1_2_v4.scene = ['layout'];
    return Layout1_2_v4;
}(FlexPluginBase));
export default Layout1_2_v4;
registerEditorPlugin(Layout1_2_v4);
