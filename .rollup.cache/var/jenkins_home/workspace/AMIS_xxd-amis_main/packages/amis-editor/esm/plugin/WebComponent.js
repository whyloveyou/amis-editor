import { __assign, __extends } from "tslib";
import { registerEditorPlugin, BasePlugin, getSchemaTpl } from 'amis-editor-core';
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
// 需要一个示例，不然默认的没有高度都无法选中
var WebComponentDemo = /** @class */ (function (_super) {
    __extends(WebComponentDemo, _super);
    function WebComponentDemo() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    WebComponentDemo.prototype.connectedCallback = function () {
        var shadow = this.attachShadow({ mode: 'open' });
        shadow.textContent = 'web-component-demo';
    };
    return WebComponentDemo;
}(HTMLElement));
try {
    customElements.define('web-component-demo', WebComponentDemo);
}
catch (error) {
    console.log('[amis-editor]', error);
}
var WebComponentPlugin = /** @class */ (function (_super) {
    __extends(WebComponentPlugin, _super);
    function WebComponentPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'web-component';
        _this.$schema = '/schemas/WebComponentSchema.json';
        // 组件名称
        _this.name = 'Web Component';
        _this.isBaseComponent = true;
        _this.description = '用于渲染 Web Component 组件';
        _this.docLink = '/amis/zh-CN/components/web-component';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-square-o';
        _this.pluginIcon = 'web-component-plugin';
        _this.scaffold = {
            type: 'web-component',
            tag: 'web-component-demo'
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.panelTitle = '包裹';
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                className: 'p-none',
                                title: '基本',
                                body: [
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    {
                                        type: 'input-text',
                                        label: '标签',
                                        name: 'tag'
                                    },
                                    getSchemaTpl('combo-container', {
                                        type: 'input-kv',
                                        mode: 'normal',
                                        name: 'props',
                                        label: '属性'
                                    })
                                ]
                            }
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    WebComponentPlugin.id = 'WebComponentPlugin';
    return WebComponentPlugin;
}(BasePlugin));
export { WebComponentPlugin };
registerEditorPlugin(WebComponentPlugin);
