import { __assign, __extends, __read, __spreadArray } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl, setSchemaTpl } from 'amis-editor-core';
import { tipedLabel } from 'amis-editor-core';
import { getEventControlConfig } from '../renderer/event-control/helper';
setSchemaTpl('tpl:content', getSchemaTpl('textareaFormulaControl', {
    label: '文字内容',
    mode: 'normal',
    visibleOn: 'data.wrapperComponent !== undefined',
    pipeIn: function (value, data) { return value || (data && data.html); },
    name: 'tpl'
}));
setSchemaTpl('tpl:rich-text', {
    label: '内容',
    type: 'input-rich-text',
    mode: 'normal',
    buttons: [
        'paragraphFormat',
        'quote',
        'textColor',
        'backgroundColor',
        '|',
        'bold',
        'italic',
        'underline',
        'strikeThrough',
        '|',
        'formatOL',
        'formatUL',
        'align',
        '|',
        'insertLink',
        'insertImage',
        'insertTable',
        '|',
        'undo',
        'redo',
        'fullscreen'
    ],
    minRows: 5,
    language: 'html',
    visibleOn: 'data.wrapperComponent === undefined',
    pipeIn: function (value, data) { return value || (data && data.html); },
    name: 'tpl'
});
setSchemaTpl('tpl:wrapperComponent', {
    name: 'wrapperComponent',
    type: 'select',
    pipeIn: function (value) { return (value === undefined ? 'rich-text' : value); },
    pipeOut: function (value) { return (value === 'rich-text' ? undefined : value); },
    label: '文字格式',
    options: [
        {
            label: '普通文字',
            value: ''
        },
        {
            label: '段落',
            value: 'p'
        },
        {
            label: '一级标题',
            value: 'h1'
        },
        {
            label: '二级标题',
            value: 'h2'
        },
        {
            label: '三级标题',
            value: 'h3'
        },
        {
            label: '四级标题',
            value: 'h4'
        },
        {
            label: '五级标题',
            value: 'h5'
        },
        {
            label: '六级标题',
            value: 'h6'
        },
        {
            label: '富文本',
            value: 'rich-text'
        }
    ],
    onChange: function (value, oldValue, model, form) {
        (value === undefined || oldValue === undefined) &&
            form.setValueByName('tpl', '');
    }
});
var TplPlugin = /** @class */ (function (_super) {
    __extends(TplPlugin, _super);
    function TplPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'tpl';
        _this.$schema = '/schemas/TplSchema.json';
        _this.order = -200;
        // 组件名称
        _this.name = '文字';
        _this.isBaseComponent = true;
        _this.icon = 'fa fa-file-o';
        _this.pluginIcon = 'plain-plugin'; // 使用文字 icon
        _this.description = '用来展示文字或者段落，支持模板语法可用来关联动态数据。';
        _this.docLink = '/amis/zh-CN/components/tpl';
        _this.tags = ['展示'];
        _this.previewSchema = {
            type: 'tpl',
            tpl: '这是模板内容当前时间<%- new Date() %>'
        };
        _this.scaffold = {
            type: 'tpl',
            tpl: '请编辑内容',
            inline: true,
            wrapperComponent: ''
        };
        _this.panelTitle = '文字';
        _this.panelJustify = true;
        // 事件定义
        _this.events = [
            {
                eventName: 'click',
                eventLabel: '点击',
                description: '点击时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseenter',
                eventLabel: '鼠标移入',
                description: '鼠标移入时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'mouseleave',
                eventLabel: '鼠标移出',
                description: '鼠标移出时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            context: {
                                type: 'object',
                                title: '上下文',
                                properties: {
                                    nativeEvent: {
                                        type: 'object',
                                        title: '鼠标事件对象'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [];
        _this.panelBodyCreator = function (context) {
            // 在表格/CRUD/模型列表的一列里边
            var isInTable = /\/cell\/field\/tpl$/.test(context.path);
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                !isInTable ? getSchemaTpl('tpl:wrapperComponent') : null,
                                getSchemaTpl('switch', {
                                    label: tipedLabel('内联模式', '内联模式默认采用 <code>span</code> 标签包裹内容、非内联将默认采用 <code>div</code> 标签作为容器。'),
                                    name: 'inline',
                                    pipeIn: defaultValue(true),
                                    hiddenOn: 'data.wrapperComponent !== ""'
                                }),
                                {
                                    type: 'input-number',
                                    label: '最大显示行数',
                                    name: 'maxLine',
                                    min: 0
                                },
                                getSchemaTpl('tpl:content'),
                                {
                                    type: 'textarea',
                                    name: 'editorSetting.mock.tpl',
                                    mode: 'vertical',
                                    label: tipedLabel('填充假数据', '只在编辑区显示的假数据文本，运行时将显示文本实际内容'),
                                    pipeOut: function (value) { return (value === '' ? undefined : value); }
                                },
                                getSchemaTpl('tpl:rich-text')
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', __spreadArray([], __read(getSchemaTpl('theme:common', {
                        exclude: ['layout'],
                        baseExtra: [
                            getSchemaTpl('theme:font', {
                                label: '文字',
                                name: 'themeCss.baseControlClassName.font'
                            })
                        ]
                    })), false))
                },
                {
                    title: '事件',
                    className: 'p-none',
                    body: [
                        getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                    ]
                }
            ]);
        };
        _this.popOverBody = [
            getSchemaTpl('tpl:content'),
            getSchemaTpl('tpl:rich-text'),
            getSchemaTpl('tpl:wrapperComponent')
        ];
        return _this;
    }
    TplPlugin.id = 'TplPlugin';
    TplPlugin.scene = ['layout'];
    return TplPlugin;
}(BasePlugin));
export { TplPlugin };
registerEditorPlugin(TplPlugin);
