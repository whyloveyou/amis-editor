import { __assign, __extends } from "tslib";
import { registerEditorPlugin, BasePlugin, getSchemaTpl, tipedLabel } from 'amis-editor-core';
var LinkPlugin = /** @class */ (function (_super) {
    __extends(LinkPlugin, _super);
    function LinkPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'link';
        _this.$schema = '/schemas/LinkSchema.json';
        // 组件名称
        _this.name = '链接';
        _this.isBaseComponent = true;
        _this.description = '用来展示文字链接';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-link';
        _this.pluginIcon = 'url-plugin';
        _this.scaffold = {
            type: 'link',
            value: 'http://www.baidu.com/'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { label: _this.name });
        _this.panelTitle = '链接';
        _this.panelJustify = true;
        _this.panelBody = [
            getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                getSchemaTpl('valueFormula', {
                                    name: 'href',
                                    label: tipedLabel('目标地址', '支持取变量，如果已绑定字段名，可以不用设置'),
                                    rendererSchema: {
                                        type: 'input-text'
                                    }
                                }),
                                {
                                    label: tipedLabel('内容', '不填写时，自动使用目标地址值'),
                                    type: 'ae-textareaFormulaControl',
                                    mode: 'normal',
                                    pipeIn: function (value, data) { return value || (data && data.html); },
                                    name: 'body'
                                },
                                getSchemaTpl('switch', {
                                    name: 'blank',
                                    label: '在新窗口打开'
                                }),
                                getSchemaTpl('iconLink', {
                                    name: 'icon',
                                    label: '左侧图标'
                                }),
                                getSchemaTpl('iconLink', {
                                    name: 'rightIcon',
                                    label: '右侧图标'
                                })
                            ]
                        },
                        getSchemaTpl('status', {
                            disabled: true
                        }),
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '高级设置',
                                body: [
                                    {
                                        name: 'htmlTarget',
                                        type: 'input-text',
                                        label: tipedLabel('锚点', 'HTML &lt;a&gt; 元素的target属性，该属性指定在何处显示链接的资源')
                                    }
                                ]
                            }
                        ])
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        getSchemaTpl('style:classNames', {
                            isFormItem: false,
                            schema: [
                                getSchemaTpl('className', {
                                    name: 'iconClassName',
                                    label: '左侧图标',
                                    visibleOn: 'this.icon'
                                }),
                                getSchemaTpl('className', {
                                    name: 'rightIconClassName',
                                    label: '右侧图标',
                                    visibleOn: 'this.rightIcon'
                                })
                            ]
                        })
                    ])
                }
            ])
        ];
        return _this;
    }
    LinkPlugin.id = 'LinkPlugin';
    LinkPlugin.scene = ['layout'];
    return LinkPlugin;
}(BasePlugin));
export { LinkPlugin };
registerEditorPlugin(LinkPlugin);
