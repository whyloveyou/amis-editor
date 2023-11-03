import type { EditorManager } from 'amis-editor-core';
export interface OptionControlParams {
    manager: EditorManager;
    /** switch-more 控制器的配置 */
    controlSchema?: Record<string, any>;
    /** 子表单中的配置集合 */
    collections?: Record<string, any>[];
    /** 是否替换除了addControls以外的其他属性 */
    replace?: boolean;
}
