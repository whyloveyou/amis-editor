/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { __assign, __rest, __spreadArray, __read } from 'tslib';
import flatten from 'lodash/flatten';
import { SUPPORT_STATIC_FORMITEM_CMPTS, getEventControlConfig } from '../renderer/event-control/helper.js';
import { isObject, getSchemaTpl, tipedLabel } from 'amis-editor-core';
import { i18n } from 'i18n-runtime';

/**
 * @file 基础控件集合
 */
var BUTTON_DEFAULT_ACTION = {
  onEvent: {
    click: {
      actions: []
    }
  }
};
/**
 * Label提示
 * 支持传入Schema或String，传入String则使用默认配置，如下：
 *
 * @default
 * ```
 * className: 'ae-BaseRemark',
 * icon: 'fa fa-question-circle',
 * trigger: ['hover', 'click'],
 * placement: 'left'
 * ```
 */
var BaseLabelMark = function (schema) {
  var base = {
    className: 'ae-BaseRemark',
    icon: 'fa fa-question-circle',
    trigger: ['hover', 'click'],
    placement: 'left',
    content: ''
  };
  if (!isObject(schema) || typeof schema === 'string') {
    return schema ? __assign(__assign({}, base), {
      content: schema.toString()
    }) : undefined;
  }
  var className = schema.className,
    content = schema.content,
    rest = __rest(schema, ["className", "content"]);
  return content ? __assign(__assign(__assign(__assign({}, base), rest), className ? {
    className: "".concat(base.className, " ").concat(rest.className)
  } : {}), {
    content: content
  }) : undefined;
};
var normalizCollapsedGroup = function (publicProps, body) {
  if (publicProps === void 0) {
    publicProps = {};
  }
  return body ? Array.isArray(body) ? body.filter(function (item) {
    return item;
  }).map(function (item, index) {
    return __assign(__assign(__assign(__assign({}, publicProps), {
      key: item.key || index.toString()
    }), item), {
      body: flatten(item.body)
    });
  }) : [__assign(__assign(__assign({}, publicProps), {
    key: '0'
  }), body)] : [];
};
/**
 * 更新/归一化处理表单项
 *
 * @param defaultBody 默认配置
 * @param body 输入配置
 * @param replace 是否完全替换
 * @returns
 */
var normalizeBodySchema = function (defaultBody, body, replace, reverse, order) {
  if (replace === void 0) {
    replace = false;
  }
  if (reverse === void 0) {
    reverse = false;
  }
  var normalizedBody = body ? Array.isArray(body) ? body.concat() : [body] : [];
  var schema = flatten(replace ? normalizedBody : reverse ? __spreadArray(__spreadArray([], __read(normalizedBody), false), __read(defaultBody), false) : __spreadArray(__spreadArray([], __read(defaultBody), false), __read(normalizedBody), false));
  return schema;
};
/**
 * 表单项组件面板
 *
 * @param {Object=} panels
 * @param {string=} key
 * `property` 属性
 *     `common` 基本
 *     `status` 状态
 *     `validation` 校验
 * `style` 样式
 * `event` 事件
 * @param {string=} panels.body - 配置面板Schema
 * @param {boolean=} panels.replace - 是否完全替换默认Schema，默认追加
 * @param {Array} panels.validation.validationType - 默认显示的校验类型
 */
var formItemControl = function (panels, context) {
  var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s;
  var type = ((_a = context === null || context === void 0 ? void 0 : context.schema) === null || _a === void 0 ? void 0 : _a.type) || '';
  var supportStatic = SUPPORT_STATIC_FORMITEM_CMPTS.includes(type);
  var collapseProps = {
    type: 'collapse',
    headingClassName: 'ae-formItemControl-header ae-Collapse-header',
    bodyClassName: 'ae-formItemControl-body'
  };
  // 已经配置了的属性
  Object.keys((_b = context === null || context === void 0 ? void 0 : context.schema) !== null && _b !== void 0 ? _b : {});
  // 选项面版内容，支持Option的组件才展示该面板
  var optionBody = normalizeBodySchema([], (_c = panels === null || panels === void 0 ? void 0 : panels.option) === null || _c === void 0 ? void 0 : _c.body, (_d = panels === null || panels === void 0 ? void 0 : panels.option) === null || _d === void 0 ? void 0 : _d.replace);
  // 属性面板配置
  var collapseGroupBody = (panels === null || panels === void 0 ? void 0 : panels.property) ? normalizCollapsedGroup(collapseProps, panels === null || panels === void 0 ? void 0 : panels.property) : __spreadArray(__spreadArray([__assign(__assign({}, collapseProps), {
    header: i18n("4092ed98e9035652d4c9ca9441701ed7"),
    key: 'common',
    body: normalizeBodySchema([getSchemaTpl('formItemName', {
      required: true
    }), getSchemaTpl('label'), getSchemaTpl('labelRemark'), getSchemaTpl('remark'), getSchemaTpl('placeholder'), getSchemaTpl('description')], (_e = panels === null || panels === void 0 ? void 0 : panels.common) === null || _e === void 0 ? void 0 : _e.body, (_f = panels === null || panels === void 0 ? void 0 : panels.common) === null || _f === void 0 ? void 0 : _f.replace, (_g = panels === null || panels === void 0 ? void 0 : panels.common) === null || _g === void 0 ? void 0 : _g.reverse)
  })], __read(optionBody.length !== 0 ? [__assign(__assign({}, collapseProps), {
    header: ((_h = panels === null || panels === void 0 ? void 0 : panels.option) === null || _h === void 0 ? void 0 : _h.title) || i18n("ea15ae2b7fba76c83eec6d0986d15197"),
    key: 'option',
    body: optionBody
  })] : []), false), [__assign(__assign({}, collapseProps), {
    header: i18n("3fea7ca76cdece641436d7ab0d02ab1b"),
    key: 'status',
    body: normalizeBodySchema([getSchemaTpl('hidden'), supportStatic ? getSchemaTpl('static') : null,
    // TODO: 下面的部分表单项才有，是不是判断一下是否是表单项
    getSchemaTpl('disabled'), getSchemaTpl('clearValueOnHidden')], (_j = panels === null || panels === void 0 ? void 0 : panels.status) === null || _j === void 0 ? void 0 : _j.body, (_k = panels === null || panels === void 0 ? void 0 : panels.status) === null || _k === void 0 ? void 0 : _k.replace, (_l = panels === null || panels === void 0 ? void 0 : panels.status) === null || _l === void 0 ? void 0 : _l.reverse)
  })], false);
  return [{
    type: 'tabs',
    tabsMode: 'line',
    className: 'editor-prop-config-tabs',
    linksClassName: 'editor-prop-config-tabs-links',
    contentClassName: 'no-border editor-prop-config-tabs-cont',
    tabs: __spreadArray([{
      title: i18n("24d67862f87f439db7ca957aecb77cce"),
      className: 'p-none',
      body: [{
        type: 'collapse-group',
        expandIconPosition: 'right',
        expandIcon: {
          type: 'icon',
          icon: 'chevron-right'
        },
        className: 'ae-formItemControl',
        activeKey: collapseGroupBody.map(function (group, index) {
          return group.key;
        }),
        body: collapseGroupBody
      }]
    }, {
      title: i18n("afcde2611bdd13c1e65b4fb6a2f13425"),
      body: normalizeBodySchema(__spreadArray([getSchemaTpl('formItemMode'), getSchemaTpl('horizontalMode'), getSchemaTpl('horizontal', {
        label: '',
        visibleOn: 'data.mode == "horizontal" && data.label !== false && data.horizontal'
      }),
      // renderer.sizeMutable !== false
      //   ? getSchemaTpl('formItemSize')
      //   : null,
      getSchemaTpl('formItemInline'), getSchemaTpl('className'), getSchemaTpl('className', {
        label: i18n("6d0034a2419e1f394dedab07994b9665"),
        name: 'labelClassName'
      }), getSchemaTpl('className', {
        label: i18n("2cadb6621afe19333b142faa541b0f91"),
        name: 'inputClassName'
      }), getSchemaTpl('className', {
        label: i18n("0e627e6a0ff773ee76bc4cc0871cb48d"),
        name: 'descriptionClassName',
        visibleOn: 'this.description'
      })], __read(!supportStatic ? [] : [getSchemaTpl('className', {
        label: i18n("3e573fd37473d789211ee44335d82fad"),
        name: 'staticClassName'
      })]), false), (_m = panels === null || panels === void 0 ? void 0 : panels.style) === null || _m === void 0 ? void 0 : _m.body, (_o = panels === null || panels === void 0 ? void 0 : panels.style) === null || _o === void 0 ? void 0 : _o.replace, (_p = panels === null || panels === void 0 ? void 0 : panels.style) === null || _p === void 0 ? void 0 : _p.reverse)
    }], __read(isObject(context) && !((_q = panels === null || panels === void 0 ? void 0 : panels.event) === null || _q === void 0 ? void 0 : _q.hidden) ? [{
      title: i18n("10b2761db5a8e089049df39675abc550"),
      className: 'p-none',
      body: normalizeBodySchema([getSchemaTpl('eventControl', __assign({
        name: 'onEvent'
      }, getEventControlConfig(context.info.plugin.manager, context)))], (_r = panels === null || panels === void 0 ? void 0 : panels.event) === null || _r === void 0 ? void 0 : _r.body, (_s = panels === null || panels === void 0 ? void 0 : panels.event) === null || _s === void 0 ? void 0 : _s.replace)
    }] : []), false)
  }];
};
/**
 * 信息提示组件模版
 */
function remarkTpl(config) {
  return {
    type: 'ae-switch-more',
    formType: 'dialog',
    className: 'ae-switch-more-flex',
    label: config.labelRemark ? tipedLabel(config.label, config.labelRemark) : config.label,
    bulk: false,
    name: config.name,
    pipeIn: function (value) {
      return !!value;
    },
    pipeOut: function (value) {
      // 更新内容
      if (isObject(value)) {
        return value;
      }
      // 关到开
      if (value) {
        return {
          icon: 'fa fa-question-circle',
          trigger: ['hover'],
          className: 'Remark--warning',
          placement: 'top'
        };
      }
      // 开到关
      return undefined;
    },
    form: {
      size: 'md',
      className: 'mb-8',
      mode: 'horizontal',
      horizontal: {
        left: 4,
        right: 8,
        justify: true
      },
      body: {
        type: 'grid',
        className: 'pt-4 right-panel-pop AMISCSSWrapper',
        gap: 'lg',
        columns: [{
          md: '6',
          body: [{
            name: 'title',
            type: !config.i18nEnabled ? 'input-text' : 'input-text-i18n',
            label: i18n("dc19704991f1476fa4dcbb80c50bedd6"),
            placeholder: i18n("55713166f8bddcc0aefc3a32464746f1")
          }, {
            name: 'content',
            type: !config.i18nEnabled ? 'textarea' : 'textarea-i18n',
            label: i18n("2d711b09bd0db0ad240cc83b30dd8014")
          }]
        }, {
          md: '6',
          body: [{
            name: 'placement',
            type: 'button-group-select',
            size: 'md',
            label: i18n("59b9e2022323a63079c6ddab63fec112"),
            options: [{
              label: i18n("af767b7e4ae069d54f9ea839858d4c6d"),
              value: 'top'
            }, {
              label: i18n("3850a186c3235bc646d4c2f79cebac36"),
              value: 'bottom'
            }, {
              label: i18n("d2aff1417831aa621c16cd5b95306b4b"),
              value: 'left'
            }, {
              label: i18n("4d9c32c23df5d234e629c922c58d8e12"),
              value: 'right'
            }]
          }, getSchemaTpl('icon'), {
            name: 'className',
            label: i18n("4434b33a8731a73613ba5fa1eb984efb"),
            type: 'input-text',
            labelRemark: BaseLabelMark(i18n("f10b676db977ae808af8d96b327be7f3"))
          }, {
            name: 'trigger',
            type: 'select',
            label: i18n("159dbc2fafd57b9d3652f16659b1b519"),
            labelRemark: BaseLabelMark(i18n("45a51525391d4a3771b22f2cf1aa96b3")),
            multiple: true,
            pipeIn: function (value) {
              return Array.isArray(value) ? value.join(',') : [];
            },
            pipeOut: function (value) {
              return value && value.length ? value.split(',') : ['hover'];
            },
            options: [{
              label: i18n("728c7cdfa431821d291b5108394ec65a"),
              value: 'hover'
            }, {
              label: i18n("4363c17ebb346b646af55bd8c8075915"),
              value: 'click'
            }]
          }, {
            name: 'rootClose',
            visibleOn: '~this.trigger.indexOf("click")',
            label: i18n("5632c68dac780bd766f740830481f4b0"),
            type: 'switch',
            mode: 'row',
            inputClassName: 'inline-flex justify-between flex-row-reverse'
          }]
        }]
      }
    }
  };
}

export { BUTTON_DEFAULT_ACTION, BaseLabelMark, formItemControl, remarkTpl };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
