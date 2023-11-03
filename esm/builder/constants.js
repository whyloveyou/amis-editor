/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import { i18n } from 'i18n-runtime';

/**
 * @file constants.ts
 * @desc builder 相关常量
 */
/**
 * 数据源所需操作，目前是因为schema从后端来
 */
var DSBehavior;
(function (DSBehavior) {
  /** 创建操作 */
  DSBehavior["create"] = "create";
  /** 查询操作 */
  DSBehavior["view"] = "view";
  /** 更新操作 */
  DSBehavior["update"] = "update";
  DSBehavior["table"] = "table";
  DSBehavior["filter"] = "filter";
})(DSBehavior || (DSBehavior = {}));
/** 数据粒度 */
var DSGrain;
(function (DSGrain) {
  /** 实体 */
  DSGrain["entity"] = "entity";
  /** 多条数据 */
  DSGrain["list"] = "list";
  /** 单条数据 */
  DSGrain["piece"] = "piece";
})(DSGrain || (DSGrain = {}));
/** 数据源所使用的功能场景 */
var DSFeature = {
  List: {
    value: 'list',
    label: i18n("3712972d84adf48acbd6ad24b4d75ad0")
  },
  Insert: {
    value: 'insert',
    label: i18n("66ab5e9f24c8f46012a25c89919fb191")
  },
  View: {
    value: 'view',
    label: i18n("f26225bde6a250894a04db4c53ea03d0")
  },
  Edit: {
    value: 'edit',
    label: i18n("95b351c86267f3aedf89520959bce689")
  },
  Delete: {
    value: 'delete',
    label: i18n("2f4aaddde33c9b93c36fd2503f3d122b")
  },
  BulkEdit: {
    value: 'bulkEdit',
    label: i18n("e73cefac9d030927da1618c7b15c98c9")
  },
  BulkDelete: {
    value: 'bulkDelete',
    label: i18n("7fb62b30119c3797a843a48368463314")
  },
  Import: {
    value: 'import',
    label: i18n("8d9a071ee2ef45e045968e117a205c07")
  },
  Export: {
    value: 'export',
    label: i18n("55405ea6ff6fd823ffab7e6b10ddfa95")
  },
  SimpleQuery: {
    value: 'simpleQuery',
    label: i18n("c26996a6506adf397f0668d376d0b40b")
  },
  FuzzyQuery: {
    value: 'fuzzyQuery',
    label: i18n("6ff4bf3d567e977aa4c90c27dff1e6db")
  },
  AdvancedQuery: {
    value: 'advancedQuery',
    label: i18n("9c4666fd08c2738eb9611a3721cb5f0f")
  }
};
var DSFeatureEnum;
(function (DSFeatureEnum) {
  DSFeatureEnum["List"] = "List";
  DSFeatureEnum["Insert"] = "Insert";
  DSFeatureEnum["View"] = "View";
  DSFeatureEnum["Edit"] = "Edit";
  DSFeatureEnum["Delete"] = "Delete";
  DSFeatureEnum["BulkEdit"] = "BulkEdit";
  DSFeatureEnum["BulkDelete"] = "BulkDelete";
  DSFeatureEnum["Import"] = "Import";
  DSFeatureEnum["Export"] = "Export";
  DSFeatureEnum["SimpleQuery"] = "SimpleQuery";
  DSFeatureEnum["FuzzyQuery"] = "FuzzyQuery";
  DSFeatureEnum["AdvancedQuery"] = "AdvancedQuery";
})(DSFeatureEnum || (DSFeatureEnum = {}));
var DSFeatureList = Object.keys(DSFeature);
var FormOperatorMap = {
  cancel: {
    label: i18n("625fb26b4b3340f7872b411f401e754c"),
    value: 'cancel',
    order: 0,
    schema: {
      level: 'default'
    }
  },
  reset: {
    label: i18n("4b9c3271dc2f299dc3aeffb369187513"),
    value: 'reset',
    order: 1,
    schema: {
      level: 'default'
    }
  },
  submit: {
    label: i18n("939d5345ad4345dbaabe14798f6ac0f1"),
    value: 'submit',
    order: 2,
    schema: {
      level: 'primary'
    }
  }
};
var ModelDSBuilderKey = 'model-entity';
var ApiDSBuilderKey = 'api';
var ApiCenterDSBuilderKey = 'apicenter';

export { ApiCenterDSBuilderKey, ApiDSBuilderKey, DSBehavior, DSFeature, DSFeatureEnum, DSFeatureList, DSGrain, FormOperatorMap, ModelDSBuilderKey };
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};
