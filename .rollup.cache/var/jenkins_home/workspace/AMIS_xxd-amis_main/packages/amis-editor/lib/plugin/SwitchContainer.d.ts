import { BaseEventContext, LayoutBasePlugin, RegionConfig, RendererPluginEvent, VRendererConfig, BasicToolbarItem } from 'amis-editor-core';
export declare class SwitchContainerPlugin extends LayoutBasePlugin {
    static id: string;
    static scene: string[];
    rendererName: string;
    $schema: string;
    name: string;
    isBaseComponent: boolean;
    description: string;
    tags: string[];
    order: number;
    icon: string;
    pluginIcon: string;
    scaffold: {
        type: string;
        items: {
            title: string;
            body: {
                type: string;
                tpl: string;
                wrapperComponent: string;
            }[];
        }[];
        style: {
            position: string;
            display: string;
        };
    };
    previewSchema: {
        type: string;
        items: {
            title: string;
            body: {
                type: string;
                tpl: string;
                wrapperComponent: string;
            }[];
        }[];
        style: {
            position: string;
            display: string;
        };
    };
    regions: Array<RegionConfig>;
    panelTitle: string;
    panelJustify: boolean;
    vRendererConfig: VRendererConfig;
    wrapperProps: {
        unmountOnExit: boolean;
        mountOnEnter: boolean;
    };
    stateWrapperResolve: (dom: HTMLElement) => HTMLElement;
    overrides: {
        renderBody(this: any, item: any): any;
    };
    /**
     * 补充切换的 toolbar
     * @param context
     * @param toolbars
     */
    buildEditorToolbar(context: BaseEventContext, toolbars: Array<BasicToolbarItem>): void;
    events: RendererPluginEvent[];
    panelBodyCreator: (context: BaseEventContext) => any;
}
