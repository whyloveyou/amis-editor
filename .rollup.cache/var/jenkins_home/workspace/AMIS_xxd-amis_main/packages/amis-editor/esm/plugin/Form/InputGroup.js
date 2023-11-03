import { __assign, __extends } from "tslib";
import { defaultValue, getSchemaTpl, registerEditorPlugin, BasePlugin } from 'amis-editor-core';
import { ValidatorTag } from '../../validator';
var InputGroupControlPlugin = /** @class */ (function (_super) {
    __extends(InputGroupControlPlugin, _super);
    function InputGroupControlPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'input-group';
        _this.$schema = '/schemas/InputGroupControlSchema.json';
        // 组件名称
        _this.name = '输入组合';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-object-group';
        _this.pluginIcon = 'input-group-plugin';
        _this.description = '输入组合，支持多种类型的控件组合';
        _this.docLink = '/amis/zh-CN/components/form/input-group';
        _this.tags = ['表单项'];
        _this.scaffold = {
            type: 'input-group',
            name: 'input-group',
            label: 'input 组合',
            body: [
                {
                    type: 'input-text',
                    inputClassName: 'b-r-none p-r-none',
                    name: 'input-group'
                },
                {
                    type: 'submit',
                    label: '提交',
                    level: 'primary'
                }
            ]
        };
        _this.previewSchema = {
            type: 'form',
            className: 'text-left',
            mode: 'horizontal',
            wrapWithPanel: false,
            body: [
                __assign({}, _this.scaffold)
            ]
        };
        _this.panelTitle = 'Input 组合';
        _this.regions = [
            {
                key: 'body',
                label: '内容区',
                preferTag: '内容区',
                renderMethod: 'render',
                matchRegion: function (elem) { return !!elem; }
            }
        ];
        _this.notRenderFormZone = true;
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('label'),
                                getSchemaTpl('labelRemark'),
                                getSchemaTpl('remark'),
                                getSchemaTpl('description')
                            ]
                        },
                        getSchemaTpl('status', { isFormItem: true }),
                        getSchemaTpl('validation', { tag: ValidatorTag.MultiSelect })
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', [
                            getSchemaTpl('style:formItem', {
                                renderer: context.info.renderer,
                                schema: [
                                    getSchemaTpl('switch', {
                                        label: '内联模式',
                                        name: 'inline',
                                        pipeIn: defaultValue(false)
                                    })
                                ]
                            }),
                            getSchemaTpl('style:classNames')
                        ])
                    ]
                }
            ]);
        };
        return _this;
    }
    InputGroupControlPlugin.id = 'InputGroupControlPlugin';
    InputGroupControlPlugin.scene = ['layout'];
    return InputGroupControlPlugin;
}(BasePlugin));
export { InputGroupControlPlugin };
registerEditorPlugin(InputGroupControlPlugin);
