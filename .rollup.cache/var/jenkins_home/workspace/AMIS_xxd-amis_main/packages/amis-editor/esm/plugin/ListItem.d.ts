import { BasePlugin, BasicRendererInfo, InsertEventContext, PluginEvent, RegionConfig, RendererInfoResolveEventContext, VRendererConfig } from 'amis-editor-core';
export declare class ListItemPlugin extends BasePlugin {
    static id: string;
    static scene: string[];
    rendererName: string;
    isBaseComponent: boolean;
    $schema: string;
    regions: Array<RegionConfig>;
    panelTitle: string;
    panelBodyCreator: (context: BaseEventContext) => any;
    getRendererInfo({ renderer, schema }: RendererInfoResolveEventContext): BasicRendererInfo | void;
    fieldWrapperResolve: (dom: HTMLElement) => HTMLElement;
    overrides: {
        renderFeild: (this: any, region: string, field: any, index: any, props: any) => any;
    };
    vRendererConfig: VRendererConfig;
    beforeInsert(event: PluginEvent<InsertEventContext>): void;
}
