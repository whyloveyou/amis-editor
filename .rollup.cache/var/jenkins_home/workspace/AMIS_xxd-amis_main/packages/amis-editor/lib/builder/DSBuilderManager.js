/**
 * @file DSBuilderManager
 * @desc 数据源构造管理器
 */
import { __assign, __read, __values } from "tslib";
import { builderFactory } from './DSBuilder';
var DSBuilderManager = /** @class */ (function () {
    function DSBuilderManager(manager) {
        var _this = this;
        this.builders = new Map();
        builderFactory.forEach(function (Builder, key) {
            _this.builders.set(key, new Builder(manager));
        });
    }
    Object.defineProperty(DSBuilderManager.prototype, "size", {
        get: function () {
            return this.builders.size;
        },
        enumerable: false,
        configurable: true
    });
    DSBuilderManager.prototype.getBuilderByKey = function (key) {
        return this.builders.get(key);
    };
    DSBuilderManager.prototype.getBuilderByScaffoldSetting = function (scaffoldConfig) {
        return this.builders.get(scaffoldConfig.dsType);
    };
    DSBuilderManager.prototype.getBuilderBySchema = function (schema, sourceKey) {
        var e_1, _a;
        var builder;
        try {
            for (var _b = __values(Array.from(this.builders.entries())), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), key = _d[0], value = _d[1];
                if (value.match(schema, sourceKey)) {
                    builder = value;
                    break;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return builder ? builder : this.getDefaultBuilder();
    };
    /**
     * 获取默认构建器Key
     *
     * @returns 返回默认构建器Key
     */
    DSBuilderManager.prototype.getDefaultBuilderKey = function () {
        var _a, _b, _c;
        var collections = Array.from(this.builders.entries()).filter(function (_a) {
            var _b;
            var _c = __read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        });
        var _d = __read((_c = (_a = collections.find(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], builder = _b[1];
            return builder.isDefault === true;
        })) !== null && _a !== void 0 ? _a : (_b = collections.sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : [], 2), defaultKey = _d[0], _ = _d[1];
        return defaultKey;
    };
    /**
     * 获取默认构建器
     *
     * @returns {Object} 默认构建器
     */
    DSBuilderManager.prototype.getDefaultBuilder = function () {
        var _a, _b, _c;
        var collections = Array.from(this.builders.entries()).filter(function (_a) {
            var _b;
            var _c = __read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        });
        var _d = __read((_c = (_a = collections.find(function (_a) {
            var _b = __read(_a, 2), _ = _b[0], builder = _b[1];
            return builder.isDefault === true;
        })) !== null && _a !== void 0 ? _a : (_b = collections.sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        })) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : [], 2), _ = _d[0], defaultBuilder = _d[1];
        return defaultBuilder;
    };
    /**
     * 获取可用的构建器列表
     *
     * @returns 返回可用构建器的列表
     */
    DSBuilderManager.prototype.getAvailableBuilders = function () {
        return Array.from(this.builders.entries())
            .filter(function (_a) {
            var _b;
            var _c = __read(_a, 2), _ = _c[0], builder = _c[1];
            return ((_b = builder === null || builder === void 0 ? void 0 : builder.disabledOn) === null || _b === void 0 ? void 0 : _b.call(builder)) !== true;
        })
            .sort(function (lhs, rhs) {
            var _a, _b;
            return ((_a = lhs[1].order) !== null && _a !== void 0 ? _a : 0) - ((_b = rhs[1].order) !== null && _b !== void 0 ? _b : 0);
        });
    };
    /**
     * 获取数据选择器Schema
     *
     * @param patch - 需要进行补丁修复的配置对象
     * @param config - 包含运行上下文和源键的配置对象
     * @returns 返回一个对象，包含类型、标签、名称、可见性、选项、默认值和pipeIn等属性
     */
    DSBuilderManager.prototype.getDSSelectorSchema = function (patch, config) {
        var e_2, _a;
        var _b = config || {}, schema = _b.schema, sourceKey = _b.sourceKey, getDefautlValue = _b.getDefautlValue;
        var builders = this.getAvailableBuilders();
        var defaultValue = schema === null || schema === void 0 ? void 0 : schema.dsType;
        var options = [];
        try {
            for (var builders_1 = __values(builders), builders_1_1 = builders_1.next(); !builders_1_1.done; builders_1_1 = builders_1.next()) {
                var _c = __read(builders_1_1.value, 2), key = _c[0], builder = _c[1];
                if (schema && !defaultValue) {
                    if (getDefautlValue &&
                        typeof getDefautlValue === 'function' &&
                        getDefautlValue(key, builder)) {
                        defaultValue = key;
                    }
                    else if (builder.match(schema, sourceKey)) {
                        defaultValue = key;
                    }
                }
                options.push({
                    label: builder.name,
                    value: key
                });
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (builders_1_1 && !builders_1_1.done && (_a = builders_1.return)) _a.call(builders_1);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return __assign(__assign({ type: 'radios', label: '数据来源', name: 'dsType', visible: options.length > 0, options: options }, (defaultValue ? { value: defaultValue } : {})), patch);
    };
    /**
     * 从构建器中生成集合
     *
     * @param callback 回调函数，用于处理每个构建器、构建器键和索引
     * @returns 返回生成的集合
     */
    DSBuilderManager.prototype.buildCollectionFromBuilders = function (callback) {
        var builders = this.getAvailableBuilders();
        var collection = builders
            .map(function (_a, index) {
            var _b = __read(_a, 2), key = _b[0], builder = _b[1];
            return callback(builder, key, index);
        })
            .filter(Boolean);
        return collection;
    };
    return DSBuilderManager;
}());
export { DSBuilderManager };
