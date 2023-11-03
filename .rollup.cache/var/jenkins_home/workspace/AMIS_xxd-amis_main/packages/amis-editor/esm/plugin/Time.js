import { __assign, __extends } from "tslib";
import { registerEditorPlugin, tipedLabel } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { DatePlugin } from './Date';
var timeFormatOptions = [
    {
        label: 'HH:mm',
        value: 'HH:mm',
        timeFormat: 'HH:mm'
    },
    {
        label: 'HH:mm:ss',
        value: 'HH:mm:ss',
        timeFormat: 'HH:mm:ss'
    },
    {
        label: 'HH时mm分',
        value: 'HH时mm分',
        timeFormat: 'HH:mm'
    },
    {
        label: 'HH时mm分ss秒',
        value: 'HH时mm分ss秒',
        timeFormat: 'HH:mm:ss'
    }
];
// 暂仅提示时间戳，待input-time的timeFormat支持表达式后增加其他类型
var dateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    }
];
var TimePlugin = /** @class */ (function (_super) {
    __extends(TimePlugin, _super);
    function TimePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'time';
        _this.name = '时间展示';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'time-plugin';
        _this.scaffold = {
            type: 'time',
            value: Math.round(Date.now() / 1000),
            format: 'HH:mm:ss'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { format: 'HH:mm:ss', value: Math.round(Date.now() / 1000) });
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
                                    {
                                        type: 'input-time',
                                        name: 'value',
                                        inputFormat: 'HH:mm:ss',
                                        timeFormat: 'HH:mm:ss',
                                        label: '时间值'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        label: tipedLabel('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: timeFormatOptions,
                                        pipeIn: defaultValue('HH:mm:ss')
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'valueFormat',
                                        label: tipedLabel('值格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: dateFormatOptions,
                                        pipeIn: defaultValue('X')
                                    },
                                    getSchemaTpl('placeholder', {
                                        pipeIn: defaultValue('-'),
                                        label: '占位符'
                                    })
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
    TimePlugin.id = 'TimePlugin';
    return TimePlugin;
}(DatePlugin));
export { TimePlugin };
registerEditorPlugin(TimePlugin);
