import { __assign, __extends } from "tslib";
import { getI18nEnabled, jsonToJsonSchema, registerEditorPlugin } from 'amis-editor-core';
import { BasePlugin } from 'amis-editor-core';
import { getSchemaTpl } from 'amis-editor-core';
import React from 'react';
import { VRenderer } from 'amis-editor-core';
import { mapReactElement } from 'amis-editor-core';
import { RegionWrapper as Region } from 'amis-editor-core';
import { getArgsWrapper, getEventControlConfig } from '../renderer/event-control/helper';
var WizardPlugin = /** @class */ (function (_super) {
    __extends(WizardPlugin, _super);
    function WizardPlugin() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        // 关联渲染器名字
        _this.rendererName = 'wizard';
        _this.$schema = '/schemas/WizardSchema.json';
        _this.name = '向导';
        _this.isBaseComponent = true;
        _this.description = '表单向导，可以将复杂的多个表单项拆分成多个步骤，一步一步指引用户完成填写。';
        _this.docLink = '/amis/zh-CN/components/wizard';
        _this.tags = ['功能'];
        _this.icon = 'fa fa-list-ol';
        _this.pluginIcon = 'wizard-plugin';
        _this.scaffold = {
            type: 'wizard',
            steps: [
                {
                    title: '第一步',
                    body: [
                        {
                            type: 'input-text',
                            label: '文本',
                            name: 'var1'
                        }
                    ]
                },
                {
                    title: '第二步',
                    body: [
                        {
                            type: 'input-text',
                            label: '文本2',
                            name: 'var2'
                        }
                    ]
                }
            ]
        };
        _this.previewSchema = {
            type: 'wizard',
            className: 'text-left m-b-none',
            steps: [
                {
                    title: '第一步',
                    body: [
                        {
                            type: 'input-text',
                            label: '文本',
                            name: 'var1'
                        }
                    ]
                },
                {
                    title: '第二步',
                    body: []
                }
            ]
        };
        // 事件定义
        _this.events = [
            {
                eventName: 'inited',
                eventLabel: '初始化数据接口请求完成',
                description: '远程初始化数据接口请求完成时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    responseData: {
                                        type: 'object',
                                        title: '响应数据'
                                    },
                                    responseStatus: {
                                        type: 'number',
                                        title: '响应状态(0表示成功)'
                                    },
                                    responseMsg: {
                                        type: 'string',
                                        title: '响应消息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'finished',
                eventLabel: '点击完成',
                description: '最终提交时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                description: '当前数据域，可以通过.字段名读取对应的值'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'stepChange',
                eventLabel: '步骤切换',
                description: '切换步骤时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    step: {
                                        type: 'string',
                                        title: '步骤索引'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'change',
                eventLabel: '数值变化',
                description: '表单值变化时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据'
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'submitSucc',
                eventLabel: '提交成功',
                description: '最终提交成功时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    result: {
                                        type: 'object',
                                        title: '提交成功后返回的数据'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'submitFail',
                eventLabel: '提交失败',
                description: '最终提交失败时触发',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    error: {
                                        type: 'object',
                                        title: '提交失败后返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            },
            {
                eventName: 'stepSubmitSucc',
                eventLabel: '步骤提交成功',
                description: '单个步骤提交成功'
            },
            {
                eventName: 'stepSubmitFail',
                eventLabel: '步骤提交失败',
                description: '单个步骤提交失败',
                dataSchema: [
                    {
                        type: 'object',
                        properties: {
                            data: {
                                type: 'object',
                                title: '数据',
                                properties: {
                                    error: {
                                        type: 'object',
                                        title: '单个步骤提交失败后返回的错误信息'
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        ];
        // 动作定义
        _this.actions = [
            {
                actionType: 'submit',
                actionLabel: '全部提交',
                description: '提交全部数据'
            },
            {
                actionType: 'stepSubmit',
                actionLabel: '分步提交',
                description: '提交当前步骤数据',
                descDetail: function (info) {
                    return (React.createElement("div", null,
                        React.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u63D0\u4EA4\u5F53\u524D\u6B65\u9AA4\u6570\u636E"));
                }
            },
            {
                actionType: 'prev',
                actionLabel: '上一步',
                description: '返回上一步'
            },
            {
                actionType: 'next',
                actionLabel: '下一步',
                description: '提交当前步骤数据'
            },
            {
                actionType: 'goto-step',
                actionLabel: '定位步骤',
                description: '切换到指定步骤',
                innerArgs: ['step'],
                descDetail: function (info) {
                    var _a;
                    return (React.createElement("div", null,
                        React.createElement("span", { className: "variable-right" }, info === null || info === void 0 ? void 0 : info.__rendererLabel),
                        "\u5207\u6362\u5230\u7B2C",
                        React.createElement("span", { className: "variable-left variable-right" }, (_a = info === null || info === void 0 ? void 0 : info.args) === null || _a === void 0 ? void 0 : _a.step),
                        "\u6B65"));
                },
                schema: getArgsWrapper([
                    getSchemaTpl('formulaControl', {
                        name: 'step',
                        label: '目标步骤',
                        variables: '${variables}',
                        size: 'lg',
                        mode: 'horizontal',
                        required: true
                    })
                ])
            },
            {
                actionType: 'reload',
                actionLabel: '重新加载',
                description: '触发组件数据刷新并重新渲染'
            },
            {
                actionType: 'setValue',
                actionLabel: '变量赋值',
                description: '触发组件数据更新'
            }
        ];
        _this.panelTitle = '向导';
        _this.panelBodyCreator = function (context) {
            var i18nEnabled = getI18nEnabled();
            return [
                getSchemaTpl('tabs', [
                    {
                        title: '常规',
                        body: [
                            getSchemaTpl('layout:originPosition', { value: 'left-top' }),
                            {
                                name: 'steps',
                                label: '步骤设置',
                                type: 'combo',
                                multiple: true,
                                multiLine: true,
                                addButtonText: '新增一步',
                                scaffold: {
                                    title: '标题',
                                    items: [
                                        {
                                            type: 'input-text',
                                            name: 'var1',
                                            label: '文本'
                                        }
                                    ]
                                },
                                items: [
                                    {
                                        name: 'title',
                                        type: i18nEnabled ? 'input-text-i18n' : 'input-text',
                                        label: '标题',
                                        pipeIn: function (value, data) { return value || data.label; }
                                    },
                                    {
                                        type: 'fieldSet',
                                        title: '其他设置',
                                        collapsed: true,
                                        collapsable: true,
                                        className: 'fieldset m-b-none',
                                        body: [
                                            {
                                                name: 'mode',
                                                label: '展示模式',
                                                type: 'button-group-select',
                                                size: 'xs',
                                                mode: 'inline',
                                                className: 'w-full',
                                                value: 'normal',
                                                options: [
                                                    {
                                                        label: '默认',
                                                        value: 'normal'
                                                    },
                                                    {
                                                        label: '左右摆放',
                                                        value: 'horizontal'
                                                    },
                                                    {
                                                        label: '内联',
                                                        value: 'inline'
                                                    }
                                                ]
                                            },
                                            getSchemaTpl('horizontal', {
                                                visibleOn: 'data.mode == "horizontal"'
                                            }),
                                            getSchemaTpl('api', {
                                                label: '保存接口',
                                                description: '如果接口返回了 <code>step</code> 变量，且数值是数字类型，比如 <code>3</code>，提交完后回跳到第 3 步'
                                            }),
                                            getSchemaTpl('switch', {
                                                label: '采用异步方式?',
                                                name: 'asyncApi',
                                                visibleOn: 'data.api',
                                                labelRemark: {
                                                    trigger: 'click',
                                                    rootClose: true,
                                                    title: '什么是异步方式？',
                                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                                    placement: 'left'
                                                },
                                                pipeIn: function (value) { return value != null; },
                                                pipeOut: function (value) { return (value ? '' : undefined); }
                                            }),
                                            getSchemaTpl('api', {
                                                name: 'asyncApi',
                                                label: '异步检测接口',
                                                visibleOn: 'data.asyncApi != null',
                                                description: '设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                                            }),
                                            {
                                                type: 'divider'
                                            },
                                            getSchemaTpl('api', {
                                                name: 'initApi',
                                                label: '初始化接口',
                                                description: '用来初始化表单数据'
                                            }),
                                            getSchemaTpl('switch', {
                                                label: '采用异步方式？',
                                                name: 'initAsyncApi',
                                                visibleOn: 'data.initApi',
                                                labelRemark: {
                                                    trigger: 'click',
                                                    rootClose: true,
                                                    title: '什么是异步方式？',
                                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                                    placement: 'left'
                                                },
                                                pipeIn: function (value) { return value != null; },
                                                pipeOut: function (value) { return (value ? '' : undefined); }
                                            }),
                                            getSchemaTpl('api', {
                                                name: 'initAsyncApi',
                                                label: '异步检测接口',
                                                visibleOn: 'data.initAsyncApi != null',
                                                description: '设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                                            }),
                                            getSchemaTpl('initFetch'),
                                            {
                                                label: '是否可被点开',
                                                type: 'input-text',
                                                name: 'jumpableOn',
                                                description: '用表达式来决定，当前步骤是否可被点开。额外可用变量：currentStep 表示当前步骤。'
                                            }
                                        ]
                                    }
                                ]
                            },
                            {
                                type: 'input-text',
                                name: 'startStep',
                                label: '起始默认值',
                                description: '从第几步开始。可支持模版，但是只有在组件创建时渲染模版并设置当前步数，在之后组件被刷新时，当前step不会根据startStep改变'
                            }
                        ]
                    },
                    {
                        title: '接口',
                        body: [
                            getSchemaTpl('api', {
                                name: 'initApi',
                                label: '初始化接口',
                                description: '用来初始化向导数据，当接口中返回 <code>step</code> 字段时，可以控制默认跳转到第几步，注意数值一定得是数字类型。当返回 <code>submiting</code> 并且当前步骤中存在异步保存接口时，可以让 wizard 初始进入异步提交状态。'
                            }),
                            getSchemaTpl('switch', {
                                label: '采用异步方式？',
                                name: 'initAsyncApi',
                                visibleOn: 'data.initApi',
                                labelRemark: {
                                    trigger: 'click',
                                    rootClose: true,
                                    title: '什么是异步方式？',
                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                    placement: 'left'
                                },
                                pipeIn: function (value) { return value != null; },
                                pipeOut: function (value) { return (value ? '' : undefined); }
                            }),
                            getSchemaTpl('api', {
                                name: 'initAsyncApi',
                                label: '异步检测接口',
                                visibleOn: 'data.initAsyncApi != null',
                                description: '设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                            }),
                            {
                                name: 'initFetch',
                                type: 'radios',
                                label: '是否初始拉取',
                                inline: true,
                                onChange: function () { },
                                options: [
                                    {
                                        label: '是',
                                        value: true
                                    },
                                    {
                                        label: '否',
                                        value: false
                                    },
                                    {
                                        label: '表达式',
                                        value: ''
                                    }
                                ]
                            },
                            {
                                name: 'initFetchOn',
                                autoComplete: false,
                                visibleOn: 'typeof this.initFetch !== "boolean"',
                                type: 'input-text',
                                placeholder: '',
                                className: 'm-t-n-sm'
                            },
                            {
                                type: 'divider'
                            },
                            getSchemaTpl('api', {
                                label: '保存接口',
                                description: '用来保存表单数据, 最后一步点击完成触发，<code>如果最后一步中已经设置保存接口，则此处设置无效。</code>'
                            }),
                            getSchemaTpl('switch', {
                                label: '采用异步方式?',
                                name: 'asyncApi',
                                visibleOn: 'data.api',
                                labelRemark: {
                                    trigger: 'click',
                                    rootClose: true,
                                    title: '什么是异步方式？',
                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                    placement: 'left'
                                },
                                pipeIn: function (value) { return value != null; },
                                pipeOut: function (value) { return (value ? '' : undefined); }
                            }),
                            getSchemaTpl('api', {
                                name: 'asyncApi',
                                label: '异步检测接口',
                                visibleOn: 'data.asyncApi != null',
                                description: '设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                            }),
                            {
                                type: 'divider'
                            },
                            getSchemaTpl('loadingConfig', {}, { context: context })
                        ]
                    },
                    {
                        title: '外观',
                        body: [
                            {
                                name: 'mode',
                                label: '展示模式',
                                type: 'button-group-select',
                                size: 'sm',
                                mode: 'inline',
                                className: 'w-full',
                                value: 'horizontal',
                                options: [
                                    {
                                        label: '水平',
                                        value: 'horizontal'
                                    },
                                    {
                                        label: '垂直',
                                        value: 'vertical'
                                    }
                                ]
                            },
                            getSchemaTpl('actionPrevLabel'),
                            getSchemaTpl('actionNextLabel'),
                            getSchemaTpl('actionNextSaveLabel'),
                            getSchemaTpl('actionFinishLabel'),
                            // {
                            //   type: 'alert',
                            //   level: 'info',
                            //   body: `温馨提示：操作按钮每个步骤可以单独配置，请在右侧切换到需要单独配置的步骤后，点击下方的【自定义按钮】定制。`
                            // },
                            getSchemaTpl('className'),
                            getSchemaTpl('className', {
                                name: 'actionClassName',
                                label: '按钮 CSS 类名'
                            })
                        ]
                    },
                    {
                        title: '其他',
                        body: [
                            getSchemaTpl('ref'),
                            getSchemaTpl('name'),
                            getSchemaTpl('reload'),
                            {
                                label: '跳转',
                                name: 'redirect',
                                type: 'input-text',
                                description: '当设置此值后，表单提交完后跳转到目标地址。'
                            },
                            getSchemaTpl('visible')
                        ]
                    },
                    {
                        title: '事件',
                        className: 'p-none',
                        body: [
                            getSchemaTpl('eventControl', __assign({ name: 'onEvent' }, getEventControlConfig(_this.manager, context)))
                        ]
                    }
                ])
            ];
        };
        _this.patchContainers = ['steps.body'];
        _this.vRendererConfig = {
            regions: {
                body: {
                    key: 'body',
                    label: '表单集合',
                    wrapperResolve: function (dom) { return dom; }
                },
                actions: {
                    label: '按钮组',
                    key: 'actions',
                    preferTag: '按钮',
                    wrapperResolve: function (dom) { return dom; }
                }
            },
            panelTitle: '步骤',
            panelBodyCreator: function (context) {
                return getSchemaTpl('tabs', [
                    {
                        title: '常规',
                        body: [
                            getSchemaTpl('title', {
                                pipeIn: function (value, data) { return value || data.label; }
                            }),
                            getSchemaTpl('api', {
                                label: '保存接口',
                                description: '如果接口返回了 <code>step</code> 变量，且数值是数字类型，比如 <code>3</code>，提交完后回跳到第 3 步'
                            }),
                            getSchemaTpl('switch', {
                                label: '采用异步方式?',
                                name: 'asyncApi',
                                visibleOn: 'data.api',
                                labelRemark: {
                                    trigger: 'click',
                                    rootClose: true,
                                    title: '什么是异步方式？',
                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                    placement: 'left'
                                },
                                pipeIn: function (value) { return value != null; },
                                pipeOut: function (value) { return (value ? '' : undefined); }
                            }),
                            getSchemaTpl('api', {
                                name: 'asyncApi',
                                label: '异步检测接口',
                                visibleOn: 'data.asyncApi != null',
                                description: '设置此属性后，表单提交发送保存接口后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                            }),
                            {
                                type: 'divider'
                            },
                            getSchemaTpl('api', {
                                name: 'initApi',
                                label: '初始化接口',
                                description: '用来初始化表单数据'
                            }),
                            getSchemaTpl('switch', {
                                label: '采用异步方式？',
                                name: 'initAsyncApi',
                                visibleOn: 'data.initApi',
                                labelRemark: {
                                    trigger: 'click',
                                    rootClose: true,
                                    title: '什么是异步方式？',
                                    content: '异步方式主要用来解决请求超时问题，启用异步方式后，程序会在请求完后，定时轮询请求额外的接口用来咨询操作是否完成。所以接口可以快速的返回，而不需要等待流程真正完成。',
                                    placement: 'left'
                                },
                                pipeIn: function (value) { return value != null; },
                                pipeOut: function (value) { return (value ? '' : undefined); }
                            }),
                            getSchemaTpl('api', {
                                name: 'initAsyncApi',
                                label: '异步检测接口',
                                visibleOn: 'data.initAsyncApi != null',
                                description: '设置此属性后，表单请求 initApi 后，还会继续轮训请求该接口，直到返回 finished 属性为 true 才 结束'
                            }),
                            getSchemaTpl('initFetch')
                        ]
                    },
                    {
                        title: '外观',
                        body: [
                            {
                                name: 'mode',
                                label: '展示模式',
                                type: 'button-group-select',
                                size: 'xs',
                                mode: 'inline',
                                className: 'w-full',
                                value: 'normal',
                                options: [
                                    {
                                        label: '默认',
                                        value: 'normal'
                                    },
                                    {
                                        label: '左右摆放',
                                        value: 'horizontal'
                                    },
                                    {
                                        label: '内联',
                                        value: 'inline'
                                    }
                                ]
                            },
                            getSchemaTpl('horizontal', {
                                visibleOn: 'data.mode == "horizontal"'
                            })
                            // getSchemaTpl('className', {
                            //   name: 'tabClassName',
                            //   label: '选项卡成员 CSS 类名'
                            // })
                        ]
                    },
                    {
                        title: '其他',
                        body: [
                            {
                                label: '是否可被点开',
                                type: 'input-text',
                                name: 'jumpableOn',
                                description: '用表达式来决定，当前步骤是否可被点开。额外可用变量：currentStep 表示当前步骤。'
                            }
                        ]
                    }
                ]);
            }
        };
        _this.wizardWrapperResolve = function (dom) {
            return [].slice.call(dom.querySelectorAll('[role="wizard-body"],[role="wizard-footer"]'));
        };
        _this.overrides = {
            renderWizard: function () {
                var _this = this;
                var info = this.props.$$editor;
                var steps = this.props.steps;
                var currentStep = this.state.currentStep;
                var dom = this.super();
                if (!info || !(steps === null || steps === void 0 ? void 0 : steps[currentStep - 1])) {
                    return dom;
                }
                var index = currentStep - 1;
                var step = steps[index];
                var id = step.$$id;
                var plugin = info.plugin;
                return mapReactElement(dom, function (child) {
                    if (/Wizard-step\b/.test(child.props.className)) {
                        return (React.createElement(VRenderer, { key: id, type: info.type, plugin: info.plugin, renderer: info.renderer, "$schema": "/schemas/WizardStepSchema.json", hostId: info.id, memberIndex: index, name: step.title || "\u6B65\u9AA4".concat(index + 1), id: id, draggable: false, wrapperResolve: plugin.wizardWrapperResolve, schemaPath: "".concat(info.schemaPath, "/steps/").concat(index), path: "".concat(_this.props.$path, "/").concat(index), data: _this.props.data }, mapReactElement(child, function (child2, index) {
                            var _a, _b, _c;
                            if (((_a = child2.props.schema) === null || _a === void 0 ? void 0 : _a.body) && child2.props.schema.$$id) {
                                var region = (_c = (_b = plugin.vRendererConfig) === null || _b === void 0 ? void 0 : _b.regions) === null || _c === void 0 ? void 0 : _c.body;
                                if (!region) {
                                    return child2;
                                }
                                var schema = __assign({}, child2.props.schema);
                                delete schema.$$id;
                                return (React.createElement(Region, { key: region.key, preferTag: region.preferTag, name: region.key, label: region.label, regionConfig: region, placeholder: region.placeholder, editorStore: plugin.manager.store, manager: plugin.manager, children: React.cloneElement(child2, {
                                        schema: schema
                                    }), wrapperResolve: region.wrapperResolve, rendererName: info.renderer.name }));
                            }
                            return child2;
                        })));
                    }
                    return child;
                });
            },
            renderFooter: function () {
                var _a, _b;
                var info = this.props.$$editor;
                var steps = this.props.steps;
                var currentStep = this.state.currentStep;
                var dom = this.super();
                if (!info || !(steps === null || steps === void 0 ? void 0 : steps[currentStep - 1])) {
                    return dom;
                }
                var plugin = info.plugin;
                var region = (_b = (_a = plugin.vRendererConfig) === null || _a === void 0 ? void 0 : _a.regions) === null || _b === void 0 ? void 0 : _b.actions;
                if (!region) {
                    return dom;
                }
                return (React.createElement(Region, { key: region.key, preferTag: region.preferTag, name: region.key, label: region.label, regionConfig: region, placeholder: region.placeholder, editorStore: plugin.manager.store, manager: plugin.manager, children: dom, wrapperResolve: region.wrapperResolve, rendererName: info.renderer.name }));
            }
        };
        return _this;
    }
    /**
     * 补充切换的 toolbar
     * @param context
     * @param toolbars
     */
    WizardPlugin.prototype.buildEditorToolbar = function (context, toolbars) {
        if (context.info.plugin === this &&
            context.info.renderer.name === this.rendererName &&
            !context.info.hostId) {
            var node_1 = context.node;
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-left',
                tooltip: '上个步骤',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.gotoStep) {
                        var currentIndex = control.state.currentStep;
                        control.gotoStep(currentIndex - 1);
                    }
                }
            });
            toolbars.push({
                level: 'secondary',
                icon: 'fa fa-chevron-right',
                tooltip: '下个步骤',
                onClick: function () {
                    var control = node_1.getComponent();
                    if (control === null || control === void 0 ? void 0 : control.gotoStep) {
                        var currentIndex = control.state.currentStep;
                        control.gotoStep(currentIndex + 1);
                    }
                }
            });
        }
    };
    WizardPlugin.prototype.filterProps = function (props) {
        props.affixFooter = false;
        return props;
    };
    WizardPlugin.prototype.rendererBeforeDispatchEvent = function (node, e, data) {
        if (e === 'inited') {
            var scope = this.manager.dataSchema.getScope("".concat(node.id, "-").concat(node.type));
            var jsonschema = __assign({ $id: 'wizardInitedData' }, jsonToJsonSchema(data.responseData));
            scope === null || scope === void 0 ? void 0 : scope.removeSchema(jsonschema.$id);
            scope === null || scope === void 0 ? void 0 : scope.addSchema(jsonschema);
        }
    };
    WizardPlugin.id = 'WizardPlugin';
    return WizardPlugin;
}(BasePlugin));
export { WizardPlugin };
registerEditorPlugin(WizardPlugin);
