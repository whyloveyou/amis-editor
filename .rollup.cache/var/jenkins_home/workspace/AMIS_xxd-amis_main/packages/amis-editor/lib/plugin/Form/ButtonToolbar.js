import { __assign, __extends } from "tslib";
import { registerEditorPlugin, translateSchema } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import { BUTTON_DEFAULT_ACTION } from '../../component/BaseControl';
var ButtonToolbarControlPlugin = /** @class */ (function (_super) {
    __extends(ButtonToolbarControlPlugin, _super);
    function ButtonToolbarControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'button-toolbar';
        _this.$schema = '/schemas/ButtonToolbarControlSchema.json';
        // 组件名称
        _this.name = '按钮工具栏';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-ellipsis-h';
        _this.pluginIcon = 'btn-toolbar-plugin';
        _this.description = '可以用来放置多个按钮或者按钮组，按钮之间会存在一定的间隔';
        _this.docLink = '/amis/zh-CN/components/form/button-toolbar';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'button-toolbar',
            label: '按钮工具栏',
            buttons: [
                __assign({ type: 'button', label: '按钮1' }, BUTTON_DEFAULT_ACTION),
                __assign({ type: 'button', label: '按钮2' }, BUTTON_DEFAULT_ACTION)
            ]
        };
        _this.previewSchema = {
            type: 'form',
            wrapWithPanel: false,
            mode: 'horizontal',
            body: __assign({}, _this.scaffold)
        };
        // 容器配置
        _this.regions = [
            {
                key: 'buttons',
                label: '按钮集合',
                preferTag: '按钮',
                renderMethod: 'renderButtons'
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelTitle = '工具栏';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                    getSchemaTpl('label'),
                                    getSchemaTpl('labelRemark'),
                                    getSchemaTpl('remark'),
                                    getSchemaTpl('description'),
                                    getSchemaTpl('combo-container', {
                                        type: 'combo',
                                        label: '按钮管理',
                                        name: 'buttons',
                                        mode: 'normal',
                                        multiple: true,
                                        addable: true,
                                        minLength: 1,
                                        draggable: true,
                                        editable: false,
                                        pipeIn: function (value) { return translateSchema(value); },
                                        items: [
                                            {
                                                type: 'tpl',
                                                inline: false,
                                                className: 'p-t-xs',
                                                tpl: "<span class=\"label label-default\"><% if (data.type === \"button-group\") { %> ".concat('按钮组', " <% } else { %><%= data.label %><% if (data.icon) { %><i class=\"<%= data.icon %>\"/><% }%><% } %></span>")
                                            }
                                        ],
                                        addButtonText: '新增按钮',
                                        scaffold: {
                                            type: 'button',
                                            label: '按钮'
                                        }
                                    })
                                ]
                            },
                            getSchemaTpl('status')
                        ])
                    ]
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('formItemMode'),
                                    getSchemaTpl('horizontal', {
                                        label: '',
                                        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
                                    })
                                ]
                            },
                            getSchemaTpl('style:classNames', {
                                isFormItem: true,
                                unsupportStatic: true,
                                schema: [
                                    getSchemaTpl('className', {
                                        label: '描述',
                                        name: 'descriptionClassName',
                                        visibleOn: 'this.description'
                                    })
                                ]
                            })
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    ButtonToolbarControlPlugin.id = 'ButtonToolbarControlPlugin';
    ButtonToolbarControlPlugin.scene = ['layout'];
    return ButtonToolbarControlPlugin;
}(BasePlugin));
export { ButtonToolbarControlPlugin };
registerEditorPlugin(ButtonToolbarControlPlugin);
