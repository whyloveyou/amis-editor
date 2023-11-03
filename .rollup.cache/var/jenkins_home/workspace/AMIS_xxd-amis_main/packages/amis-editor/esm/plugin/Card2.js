import { __assign, __extends } from "tslib";
import { BasePlugin, defaultValue, getSchemaTpl, tipedLabel, registerEditorPlugin } from 'amis-editor-core';
var Card2Plugin = /** @class */ (function (_super) {
    __extends(Card2Plugin, _super);
    function Card2Plugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'card2';
        _this.$schema = '/schemas/Card2Schema.json';
        // 组件名称
        _this.name = '卡片';
        _this.isBaseComponent = true;
        _this.disabledRendererPlugin = true;
        _this.description = '展示单个卡片。';
        _this.tags = ['展示'];
        _this.icon = '';
        _this.scaffold = {
            type: 'card2',
            body: '内容'
        };
        _this.previewSchema = __assign({}, _this.scaffold);
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                renderMethod: 'renderBody',
                preferTag: '展示'
            }
        ];
        _this.panelTitle = '卡片';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '属性',
                        body: getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    {
                                        type: 'button-group-select',
                                        label: tipedLabel('选择区域', '点击触发选中或取消选中的区域'),
                                        name: 'checkOnItemClick',
                                        options: [
                                            { label: '整个', value: true },
                                            { label: '选框', value: false }
                                        ],
                                        pipeIn: defaultValue(false)
                                    },
                                    getSchemaTpl('switch', {
                                        label: tipedLabel('隐藏选框', '不再显示选择框，可以通过自定义选中态外观实现选中样式'),
                                        name: 'hideCheckToggler',
                                        visibleOn: 'this.checkOnItemClick'
                                    })
                                ]
                            },
                            getSchemaTpl('status', { isFormItem: false })
                        ])
                    },
                    {
                        title: '外观',
                        body: getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:classNames', {
                                isFormItem: false,
                                schema: [
                                    getSchemaTpl('className', {
                                        name: 'bodyClassName',
                                        label: '内容区',
                                        visibleOn: 'this.icon'
                                    }),
                                    // TODO
                                    getSchemaTpl('className', {
                                        name: 'selectedClassName',
                                        label: '选中态',
                                        visibleOn: 'this.icon'
                                    })
                                ]
                            })
                        ])
                    }
                ])
            ];
        };
        return _this;
    }
    Card2Plugin.id = 'Card2Plugin';
    Card2Plugin.scene = ['layout'];
    return Card2Plugin;
}(BasePlugin));
export { Card2Plugin };
registerEditorPlugin(Card2Plugin);
