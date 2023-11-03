import { __assign, __extends } from "tslib";
import { registerEditorPlugin, tipedLabel } from 'amis-editor-core';
import { defaultValue, getSchemaTpl } from 'amis-editor-core';
import { DatePlugin } from './Date';
var dateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    },
    {
        label: 'x(毫秒时间戳)',
        value: 'x'
    },
    {
        label: 'YYYY-MM-DD HH:mm:ss',
        value: 'YYYY-MM-DD HH:mm:ss'
    },
    {
        label: 'YYYY/MM/DD HH:mm:ss',
        value: 'YYYY/MM/DD HH:mm:ss'
    },
    {
        label: 'YYYY年MM月DD日 HH时mm分ss秒',
        value: 'YYYY年MM月DD日 HH时mm分ss秒'
    }
];
var valueDateFormatOptions = [
    {
        label: 'X(时间戳)',
        value: 'X'
    }
];
var DatetimePlugin = /** @class */ (function (_super) {
    __extends(DatetimePlugin, _super);
    function DatetimePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'datetime';
        _this.scaffold = {
            type: 'datetime',
            value: Math.round(Date.now() / 1000)
        };
        _this.name = '日期时间展示';
        _this.isBaseComponent = true;
        _this.pluginIcon = 'datetime-plugin';
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { format: 'YYYY-MM-DD HH:mm:ss', value: Math.round(Date.now() / 1000) });
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
                                        type: 'input-datetime',
                                        name: 'value',
                                        label: '日期时间值'
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'format',
                                        label: tipedLabel('显示格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: dateFormatOptions,
                                        pipeIn: defaultValue('YYYY-MM-DD HH:mm:ss')
                                    },
                                    {
                                        type: 'input-text',
                                        name: 'valueFormat',
                                        label: tipedLabel('值格式', '请参考 <a href="https://momentjs.com/" target="_blank">moment</a> 中的格式用法。'),
                                        clearable: true,
                                        options: valueDateFormatOptions,
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
    DatetimePlugin.id = 'DatetimePlugin';
    DatetimePlugin.scene = ['layout'];
    return DatetimePlugin;
}(DatePlugin));
export { DatetimePlugin };
registerEditorPlugin(DatetimePlugin);
