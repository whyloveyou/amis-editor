/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { i18n } from 'i18n-runtime';

/**
 * @file constants.ts
 * @desc CRUD 配置相关常量
 */
var ToolsConfig = {
  groupName: 'tools',
  options: [{
    label: i18n("a4313469fd7361486fe47076629c76ac"),
    value: 'Insert',
    align: 'left',
    icon: 'fa fa-layer-group',
    order: 10
  }, {
    label: i18n("e73cefac9d030927da1618c7b15c98c9"),
    value: 'BulkEdit',
    align: 'left',
    icon: 'fa fa-layer-group',
    order: 20
  }, {
    label: i18n("7fb62b30119c3797a843a48368463314"),
    value: 'BulkDelete',
    align: 'left',
    icon: 'fa fa-layer-group',
    order: 30
  }]
};
var FiltersConfig = {
  groupName: 'filters',
  options: [{
    label: i18n("6ff4bf3d567e977aa4c90c27dff1e6db"),
    value: 'FuzzyQuery',
    icon: 'fa fa-search',
    order: 10
  }, {
    label: i18n("c26996a6506adf397f0668d376d0b40b"),
    value: 'SimpleQuery',
    icon: 'fa fa-search',
    order: 20
  }, {
    label: i18n("9c4666fd08c2738eb9611a3721cb5f0f"),
    value: 'AdvancedQuery',
    icon: 'fa fa-search',
    order: 30
  }]
};
var OperatorsConfig = {
  groupName: 'operators',
  options: [{
    label: i18n("5b48dbb8dc710cffe6313bb56a7f6d47"),
    value: 'View',
    icon: 'fa fa-database',
    order: 10
  }, {
    label: i18n("e22b59b6bda1cf9a58f8979fd0a0b43c"),
    value: 'Edit',
    icon: 'fa fa-database',
    order: 20
  }, {
    label: i18n("a790208cafd5c95a18dd9a168319ecf8"),
    value: 'Delete',
    icon: 'fa fa-database',
    order: 30
  }]
};

export { FiltersConfig, OperatorsConfig, ToolsConfig };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
