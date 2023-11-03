import { __assign, __extends } from "tslib";
import { getI18nEnabled, registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { defaultValue, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { mockValue } from 'amis-editor-core';
var ImagePlugin = /** @class */ (function (_super) {
    __extends(ImagePlugin, _super);
    function ImagePlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'image';
        _this.$schema = '/schemas/ImageSchema.json';
        // 组件名称
        _this.name = '图片展示';
        _this.isBaseComponent = true;
        _this.description = '可以用来展示一张图片，支持静态设置图片地址，也可以配置 <code>name</code> 与变量关联。';
        _this.tags = ['展示'];
        _this.icon = 'fa fa-photo';
        _this.pluginIcon = 'image-plugin';
        _this.scaffold = {
            type: 'image'
        };
        _this.previewSchema = __assign(__assign({}, _this.scaffold), { thumbMode: 'cover', value: mockValue({ type: 'image' }) });
        _this.panelTitle = '图片';
        _this.panelJustify = true;
        _this.panelBodyCreator = function (context) {
            var isUnderField = /\/field\/\w+$/.test(context.path);
            var i18nEnabled = getI18nEnabled();
            return getSchemaTpl('tabs', [
                {
                    title: '属性',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                {
                                    name: 'title',
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    label: '图片标题'
                                },
                                {
                                    name: 'imageCaption',
                                    type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                    label: '图片描述'
                                },
                                {
                                    name: 'imageMode',
                                    label: '展示模式',
                                    type: 'select',
                                    pipeIn: defaultValue('thumb'),
                                    options: [
                                        {
                                            label: '缩率图',
                                            value: 'thumb'
                                        },
                                        {
                                            label: '原图',
                                            value: 'original'
                                        }
                                    ]
                                },
                                {
                                    name: 'width',
                                    label: '宽度',
                                    type: 'input-number'
                                },
                                {
                                    name: 'height',
                                    label: '高度',
                                    type: 'input-number'
                                },
                                isUnderField
                                    ? null
                                    : getSchemaTpl('imageUrl', {
                                        name: 'src',
                                        label: '缩略图地址',
                                        description: '如果已绑定字段名，可以不用设置，支持用变量。'
                                    }),
                                getSchemaTpl('backgroundImageUrl', {
                                    name: 'editorSetting.mock.src',
                                    label: tipedLabel('假数据图片', '只在编辑区显示的模拟图片，运行时将显示图片实际内容')
                                }),
                                {
                                    type: 'ae-switch-more',
                                    mode: 'normal',
                                    name: 'enlargeAble',
                                    label: tipedLabel('图片放大功能', '放大功能和打开外部链接功能是冲突的，若要点击时打开外部链接请先关闭此功能'),
                                    value: false,
                                    hiddenOnDefault: false,
                                    formType: 'extend',
                                    pipeIn: function (value) { return !!value; },
                                    form: {
                                        body: [
                                            getSchemaTpl('imageUrl', {
                                                name: 'originalSrc',
                                                label: '原图地址',
                                                description: '如果不配置将默认使用缩略图地址。'
                                            })
                                        ]
                                    }
                                },
                                {
                                    type: 'input-text',
                                    label: '打开外部链接',
                                    name: 'href',
                                    hiddenOn: 'this.enlargeAble',
                                    clearValueOnHidden: true
                                },
                                getSchemaTpl('imageUrl', {
                                    name: 'defaultImage',
                                    label: tipedLabel('占位图', '无数据时显示的图片')
                                })
                            ]
                        },
                        getSchemaTpl('status')
                    ])
                },
                {
                    title: '外观',
                    body: getSchemaTpl('collapseGroup', [
                        {
                            title: '基本',
                            body: [
                                // amis 已废弃
                                // getSchemaTpl('switch', {
                                //   name: 'showDimensions',
                                //   label: '显示图片尺寸'
                                // }),
                                getSchemaTpl('layout:display', {
                                    flexHide: true,
                                    value: 'inline-block',
                                    label: '显示类型'
                                }),
                                {
                                    name: 'thumbMode',
                                    visibleOn: '${!imageMode || imageMode ===  "thumb"}',
                                    type: 'select',
                                    label: '展示模式',
                                    mode: 'horizontal',
                                    labelAlign: 'left',
                                    horizontal: {
                                        left: 5,
                                        right: 7
                                    },
                                    pipeIn: defaultValue('contain'),
                                    options: [
                                        {
                                            label: '宽度占满',
                                            value: 'w-full'
                                        },
                                        {
                                            label: '高度占满',
                                            value: 'h-full'
                                        },
                                        {
                                            label: '包含',
                                            value: 'contain'
                                        },
                                        {
                                            label: '铺满',
                                            value: 'cover'
                                        }
                                    ]
                                },
                                getSchemaTpl('theme:size', {
                                    label: '尺寸',
                                    name: 'themeCss.imageControlClassName.size:default'
                                })
                            ]
                        },
                        getSchemaTpl('theme:base', {
                            classname: 'imageControlClassName',
                            title: '图片'
                        }),
                        {
                            title: '其他',
                            body: [
                                getSchemaTpl('theme:font', {
                                    label: '标题文字',
                                    name: 'themeCss.titleControlClassName.font',
                                    editorThemePath: 'image.image.default.normal.body.font'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    label: '标题边距',
                                    name: 'themeCss.titleControlClassName.padding-and-margin'
                                }),
                                getSchemaTpl('theme:font', {
                                    label: '描述文字',
                                    name: 'themeCss.desControlClassName.font',
                                    editorThemePath: 'image.image.default.description.body.font'
                                }),
                                getSchemaTpl('theme:paddingAndMargin', {
                                    label: '描述边距',
                                    name: 'themeCss.desControlClassName.padding-and-margin'
                                }),
                                {
                                    name: 'themeCss.iconControlClassName.--image-image-normal-icon',
                                    label: '放大图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                {
                                    name: 'themeCss.galleryControlClassName.--image-images-prev-icon',
                                    label: '左切换图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                {
                                    name: 'themeCss.galleryControlClassName.--image-images-next-icon',
                                    label: '右切换图标',
                                    type: 'icon-select',
                                    returnSvg: true
                                },
                                getSchemaTpl('theme:select', {
                                    label: '切换图标大小',
                                    name: 'themeCss.galleryControlClassName.--image-images-item-size'
                                })
                            ]
                        },
                        getSchemaTpl('theme:cssCode')
                    ])
                }
            ]);
        };
        return _this;
    }
    ImagePlugin.prototype.onActive = function (event) {
        var _a;
        var context = event.context;
        if (((_a = context.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this || !context.node) {
            return;
        }
        var node = context.node;
        node.setHeightMutable(true);
        node.setWidthMutable(true);
    };
    ImagePlugin.prototype.onWidthChangeStart = function (event) {
        return this.onSizeChangeStart(event, 'horizontal');
    };
    ImagePlugin.prototype.onHeightChangeStart = function (event) {
        return this.onSizeChangeStart(event, 'vertical');
    };
    ImagePlugin.prototype.onSizeChangeStart = function (event, direction) {
        var _a;
        if (direction === void 0) { direction = 'both'; }
        var context = event.context;
        var node = context.node;
        if (((_a = node.info) === null || _a === void 0 ? void 0 : _a.plugin) !== this) {
            return;
        }
        var resizer = context.resizer;
        var dom = context.dom;
        var frameRect = dom.parentElement.getBoundingClientRect();
        var rect = dom.getBoundingClientRect();
        var startX = context.nativeEvent.pageX;
        var startY = context.nativeEvent.pageY;
        event.setData({
            onMove: function (e) {
                var dy = e.pageY - startY;
                var dx = e.pageX - startX;
                var height = Math.max(50, rect.height + dy);
                var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
                var state = {
                    width: width,
                    height: height
                };
                if (direction === 'both') {
                    resizer.setAttribute('data-value', "".concat(width, "px x ").concat(height, "px"));
                }
                else if (direction === 'vertical') {
                    resizer.setAttribute('data-value', "".concat(height, "px"));
                    delete state.width;
                }
                else {
                    resizer.setAttribute('data-value', "".concat(width, "px"));
                    delete state.height;
                }
                node.updateState(state);
                requestAnimationFrame(function () {
                    node.calculateHighlightBox();
                });
            },
            onEnd: function (e) {
                var dy = e.pageY - startY;
                var dx = e.pageX - startX;
                var height = Math.max(50, rect.height + dy);
                var width = Math.max(100, Math.min(rect.width + dx, frameRect.width));
                var state = {
                    width: width,
                    height: height
                };
                if (direction === 'vertical') {
                    delete state.width;
                }
                else if (direction === 'horizontal') {
                    delete state.height;
                }
                resizer.removeAttribute('data-value');
                node.updateSchema(state);
                requestAnimationFrame(function () {
                    node.calculateHighlightBox();
                });
            }
        });
    };
    ImagePlugin.id = 'ImagePlugin';
    ImagePlugin.scene = ['layout'];
    return ImagePlugin;
}(BasePlugin));
export { ImagePlugin };
registerEditorPlugin(ImagePlugin);
