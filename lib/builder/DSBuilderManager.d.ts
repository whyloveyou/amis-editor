/**
 * @file DSBuilderManager
 * @desc 数据源构造管理器
 */
import { DSBuilderInterface } from './DSBuilder';
import type { EditorManager } from 'amis-editor-core';
import type { GenericSchema } from './type';
export declare class DSBuilderManager {
    private builders;
    constructor(manager: EditorManager);
    get size(): number;
    getBuilderByKey(key: string): DSBuilderInterface<import("./DSBuilder").DSBuilderBaseOptions> | undefined;
    getBuilderByScaffoldSetting(scaffoldConfig: any): DSBuilderInterface<import("./DSBuilder").DSBuilderBaseOptions> | undefined;
    getBuilderBySchema(schema: any, sourceKey?: string): DSBuilderInterface<import("./DSBuilder").DSBuilderBaseOptions>;
    /**
     * 获取默认构建器Key
     *
     * @returns 返回默认构建器Key
     */
    getDefaultBuilderKey(): string;
    /**
     * 获取默认构建器
     *
     * @returns {Object} 默认构建器
     */
    getDefaultBuilder(): DSBuilderInterface<import("./DSBuilder").DSBuilderBaseOptions>;
    /**
     * 获取可用的构建器列表
     *
     * @returns 返回可用构建器的列表
     */
    getAvailableBuilders(): [string, DSBuilderInterface<import("./DSBuilder").DSBuilderBaseOptions>][];
    /**
     * 获取数据选择器Schema
     *
     * @param patch - 需要进行补丁修复的配置对象
     * @param config - 包含运行上下文和源键的配置对象
     * @returns 返回一个对象，包含类型、标签、名称、可见性、选项、默认值和pipeIn等属性
     */
    getDSSelectorSchema(patch: Record<string, any>, config?: {
        /** 组件 Schema */
        schema: GenericSchema;
        /** 组件数据源 Key */
        sourceKey: string;
        /** 获取默认值函数 */
        getDefautlValue?: (key: string, builder: DSBuilderInterface) => Boolean;
    }): {
        value?: string | undefined;
        type: string;
        label: string;
        name: string;
        visible: boolean;
        options: Option[];
    };
    /**
     * 从构建器中生成集合
     *
     * @param callback 回调函数，用于处理每个构建器、构建器键和索引
     * @returns 返回生成的集合
     */
    buildCollectionFromBuilders(callback: (builder: DSBuilderInterface, builderKey: string, index: number) => any): any[];
}
