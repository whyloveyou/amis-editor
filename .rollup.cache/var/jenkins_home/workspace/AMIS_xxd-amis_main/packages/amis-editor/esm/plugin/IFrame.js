import { __extends, __read, __spreadArray } from "tslib";
import { registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin, tipedLabel } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
var IFramePlugin = /** @class */ (function (_super) {
    __extends(IFramePlugin, _super);
    function IFramePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'iframe';
        _this.$schema = '/schemas/IFrameSchema.json';
        // 组件名称
        _this.name = 'iFrame';
        _this.isBaseComponent = true;
        _this.description = '可以用来嵌入现有页面。';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-window-maximize';
        _this.pluginIcon = 'iframe-plugin';
        _this.scaffold = {
            type: 'iframe',
            src: '//www.baidu.com'
        };
        _this.previewSchema = {
            type: 'tpl',
            tpl: 'iFrame'
        };
        _this.panelTitle = 'iFrame';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                                getSchemaTpl('textareaFormulaControl', {
                                    name: 'src',
                                    mode: 'normal',
                                    label: '页面地址'
                                })
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: [
                        getSchemaTpl('collapseGroup', __spreadArray([
                            {
                                title: '基本',
                                body: [
                                    getSchemaTpl('style:widthHeight', {
                                        widthSchema: {
                                            label: tipedLabel('宽度', '默认宽度为父容器宽度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: defaultValue('100%')
                                        },
                                        heightSchema: {
                                            label: tipedLabel('高度', '默认高度为父容器高度，值单位默认为 px，也支持百分比等单位 ，如：100%'),
                                            pipeIn: defaultValue('100%')
                                        }
                                    })
                                ]
                            }
                        ], __read(getSchemaTpl('theme:common', { exclude: ['layout'] })), false))
                    ]
                }
            ]);
        };
        return _this;
    }
    IFramePlugin.prototype.renderRenderer = function (props) {
        return this.renderPlaceholder("IFrame \u9875\u9762\uFF08".concat(props.src, "\uFF09"), props.key, props.style);
    };
    IFramePlugin.id = 'IFramePlugin';
    return IFramePlugin;
}(BasePlugin));
export { IFramePlugin };
registerEditorPlugin(IFramePlugin);
