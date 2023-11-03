/**
 * @file constants.ts
 * @desc builder 相关常量
 */
/**
 * 数据源所需操作，目前是因为schema从后端来
 */
export var DSBehavior;
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
export var DSGrain;
(function (DSGrain) {
    /** 实体 */
    DSGrain["entity"] = "entity";
    /** 多条数据 */
    DSGrain["list"] = "list";
    /** 单条数据 */
    DSGrain["piece"] = "piece";
})(DSGrain || (DSGrain = {}));
/** 数据源所使用的功能场景 */
export var DSFeature = {
    List: {
        value: 'list',
        label: '列表'
    },
    Insert: {
        value: 'insert',
        label: '新增'
    },
    View: {
        value: 'view',
        label: '详情'
    },
    Edit: {
        value: 'edit',
        label: '编辑'
    },
    Delete: {
        value: 'delete',
        label: '删除'
    },
    BulkEdit: {
        value: 'bulkEdit',
        label: '批量编辑'
    },
    BulkDelete: {
        value: 'bulkDelete',
        label: '批量删除'
    },
    Import: {
        value: 'import',
        label: '导入'
    },
    Export: {
        value: 'export',
        label: '导出'
    },
    SimpleQuery: {
        value: 'simpleQuery',
        label: '简单查询'
    },
    FuzzyQuery: {
        value: 'fuzzyQuery',
        label: '模糊查询'
    },
    AdvancedQuery: {
        value: 'advancedQuery',
        label: '高级查询'
    }
};
export var DSFeatureEnum;
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
export var DSFeatureList = Object.keys(DSFeature);
export var FormOperatorMap = {
    cancel: {
        label: '取消',
        value: 'cancel',
        order: 0,
        schema: {
            level: 'default'
        }
    },
    reset: {
        label: '重置',
        value: 'reset',
        order: 1,
        schema: {
            level: 'default'
        }
    },
    submit: {
        label: '提交',
        value: 'submit',
        order: 2,
        schema: {
            level: 'primary'
        }
    }
};
export var ModelDSBuilderKey = 'model-entity';
export var ApiDSBuilderKey = 'api';
export var ApiCenterDSBuilderKey = 'apicenter';
