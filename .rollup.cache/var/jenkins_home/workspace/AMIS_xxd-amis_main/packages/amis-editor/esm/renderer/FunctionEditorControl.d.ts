/**
 * @file 函数编辑器
 */
import React from 'react';
import { FormControlProps } from 'amis-core';
import { TooltipObject } from 'amis-ui/lib/components/TooltipWrapper';
interface FuncParam {
    label: string;
    tip?: string | TooltipObject;
}
export interface FunctionEditorControlProps extends FormControlProps {
    /**
     * 适配器函数参数
     */
    params?: FuncParam[];
    /**
     * 复用适配器 函数参数提示
     */
    mergeParams?: (params: FuncParam[]) => FuncParam[];
    /**
     * 代码编辑器底部的 description
     */
    desc?: any;
    /**
     * 代码编辑器的placeholder
     */
    placeholder?: string;
    /**
     * 自定义提示参数
     */
    tooltipProps?: TooltipObject;
}
export default class FunctionEditorControl extends React.Component<FunctionEditorControlProps, {}> {
    static defaultProps: Pick<FunctionEditorControlProps, 'params'>;
    onChange(value?: any): void;
    genTooltipProps(content: any, othersProps?: TooltipObject): {
        title?: string | undefined;
        content: string;
        placement: string;
        tooltipTheme: string;
        offset?: [number, number] | undefined;
        style?: React.CSSProperties | undefined;
        enterable?: boolean | undefined;
        showArrow?: boolean | undefined;
        disabled?: boolean | undefined;
        mouseEnterDelay?: number | undefined;
        mouseLeaveDelay?: number | undefined;
        children?: (() => JSX.Element) | undefined;
        container?: HTMLElement | (() => HTMLElement | null | undefined) | undefined;
        trigger: string | import("amis-ui/lib/components/TooltipWrapper").Trigger[];
        rootClose: boolean;
        tooltipClassName: string;
        tooltipBodyClassName?: string | undefined;
        filterHtml?: ((input: string) => string) | undefined;
    } | {
        title?: string | undefined;
        content: string;
        placement: string;
        tooltipTheme: string;
        offset?: [number, number] | undefined;
        style?: React.CSSProperties | undefined;
        enterable?: boolean | undefined;
        showArrow?: boolean | undefined;
        disabled?: boolean | undefined;
        mouseEnterDelay?: number | undefined;
        mouseLeaveDelay?: number | undefined;
        children: () => any;
        container?: HTMLElement | (() => HTMLElement | null | undefined) | undefined;
        trigger: string | import("amis-ui/lib/components/TooltipWrapper").Trigger[];
        rootClose: boolean;
        tooltipClassName: string;
        tooltipBodyClassName?: string | undefined;
        filterHtml?: ((input: string) => string) | undefined;
    };
    render(): React.JSX.Element;
}
export declare class FunctionEditorControlRenderer extends FunctionEditorControl {
}
export {};
