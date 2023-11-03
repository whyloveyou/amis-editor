/**
 * @file CRUDList.tsx
 * @desc 列表模式的 CRUD2
 */
import { EditorManager, BuildPanelEventContext } from 'amis-editor-core';
import { BaseCRUDPlugin } from './BaseCRUD';
export declare class CRUDListPlugin extends BaseCRUDPlugin {
    static id: string;
    disabledRendererPlugin: boolean;
    name: string;
    panelTitle: '列表';
    icon: string;
    panelIcon: string;
    subPanelIcon: string;
    pluginIcon: string;
    panelJustify: boolean;
    multifactor: boolean;
    isBaseComponent: boolean;
    description: string;
    order: number;
    $schema: string;
    docLink: string;
    previewSchema: Record<string, any>;
    scaffold: any;
    constructor(manager: EditorManager);
    /** 非实体数据源走默认构建 */
    panelBodyCreator: (context: BuildPanelEventContext) => any;
    renderColumnsControl(context: BuildPanelEventContext): {
        title: string;
        order: number;
        body: {
            type: string;
            name: string;
            nodeId: any;
            builder: import("../../builder").DSBuilderInterface<import("../../builder").DSBuilderBaseOptions>;
        }[];
    };
    renderToolbarCollapse(context: BuildPanelEventContext): {
        order: number;
        title: string;
        body: {
            type: string;
            name: string;
            nodeId: any;
            builder: import("../../builder").DSBuilderInterface<import("../../builder").DSBuilderBaseOptions>;
        }[];
    };
    renderFiltersCollapse(context: BuildPanelEventContext): {
        order: number;
        title: string;
        body: any[];
    } | undefined;
}
