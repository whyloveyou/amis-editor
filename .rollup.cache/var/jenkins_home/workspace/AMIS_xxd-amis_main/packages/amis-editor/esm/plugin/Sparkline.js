/**
 * @file 走势图
 */
import { __assign, __extends, __read, __spreadArray } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
var SparklinePlugin = /** @class */ (function (_super) {
    __extends(SparklinePlugin, _super);
    function SparklinePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'sparkline';
        _this.$schema = '/schemas/SparklineSchema.json';
        // 组件名称
        _this.name = '走势图';
        _this.isBaseComponent = true;
        _this.description = '用于内嵌展示简单图表';
        _this.docLink = '/amis/zh-CN/components/sparkline';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-area-chart';
        _this.pluginIcon = 'sparkline-plugin';
        _this.scaffold = {
            type: 'sparkline',
            height: 30,
            value: [3, 5, 2, 4, 1, 8, 3, 7]
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.panelTitle = '走势图';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: [
                            getSchemaTpl('collapseGroup', [
                                {
                                    title: '基本',
                                    body: [
                                        getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                        getSchemaTpl('name')
                                    ]
                                },
                                {
                                    title: '宽高设置',
                                    body: [
                                        {
                                            name: 'width',
                                            type: 'input-number',
                                            label: '宽度'
                                        },
                                        {
                                            name: 'height',
                                            type: 'input-number',
                                            label: '高度'
                                        }
                                    ]
                                },
                                getSchemaTpl('status')
                            ])
                        ]
                    },
                    {
                        title: '外观',
                        body: getSchemaTpl('collapseGroup', __spreadArray([], __read(getSchemaTpl('theme:common', { exclude: ['layout'] })), false))
                    }
                ])
            ];
        };
        return _this;
    }
    SparklinePlugin.id = 'SparklinePlugin';
    return SparklinePlugin;
}(BasePlugin));
export { SparklinePlugin };
registerEditorPlugin(SparklinePlugin);
