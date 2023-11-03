import { __assign, __extends } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
var JsonPlugin = /** @class */ (function (_super) {
    __extends(JsonPlugin, _super);
    function JsonPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'json';
        _this.$schema = '/schemas/JsonSchema.json';
        // 组件名称
        _this.name = 'JSON展示';
        _this.isBaseComponent = true;
        _this.description = '用来展示 JSON 数据。';
        _this.docLink = '/amis/zh-CN/components/json';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-code';
        _this.pluginIcon = 'json-view-plugin';
        _this.scaffold = {
            type: 'json'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { name: 'json', value: {
                a: 1,
                b: {
                    c: 2
                }
            } });
        _this.panelTitle = 'JSON';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    isUnderField
                                        ? {
                                            type: 'tpl',
                                            inline: false,
                                            className: 'text-info text-sm',
                                            tpl: '<p>当前为字段内容节点配置，选择上层还有更多配置</p>'
                                        }
                                        : null,
                                    {
                                        name: 'levelExpand',
                                        type: 'input-number',
                                        label: '默认展开级别',
                                        pipeIn: defaultValue(1)
                                    }
                                ]
                            },
                            getSchemaTpl('status')
                        ])
                    },
                    getSchemaTpl('onlyClassNameTab')
                ])
            ];
        };
        return _this;
    }
    JsonPlugin.id = 'JsonPlugin';
    return JsonPlugin;
}(BasePlugin));
export { JsonPlugin };
registerEditorPlugin(JsonPlugin);
