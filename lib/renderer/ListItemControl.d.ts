/**
 * @file 通用数组列表项的可视化编辑控件
 */
import React from 'react';
import Sortable from 'sortablejs';
import { FormControlProps } from 'amis-core';
import type { SchemaApi } from 'amis';
import type { PlainObject } from './style-control/types';
export type valueType = 'text' | 'boolean' | 'number';
export interface PopoverForm {
    optionLabel: string;
    optionValue: any;
    optionValueType: valueType;
}
export interface OptionControlProps extends FormControlProps {
    className?: string;
}
export type SourceType = 'custom' | 'api' | 'apicenter' | 'variable';
export interface OptionControlState {
    items: Array<PlainObject>;
    api: SchemaApi;
    labelField: string;
    valueField: string;
}
export default class ListItemControl extends React.Component<OptionControlProps, OptionControlState> {
    sortable?: Sortable;
    drag?: HTMLElement | null;
    target: HTMLElement | null;
    internalProps: string[];
    constructor(props: OptionControlProps);
    /**
     * 数据更新
     */
    componentWillReceiveProps(nextProps: OptionControlProps): void;
    /**
     * 处理填入输入框的值
     */
    transformOptionValue(value: any): string;
    transformOptions(props: OptionControlProps): any[];
    /**
     * 更新options字段的统一出口
     */
    onChange(): void;
    targetRef(ref: any): void;
    dragRef(ref: any): void;
    initDragging(): void;
    destroyDragging(): void;
    /**
     * 删除选项
     */
    handleDelete(index: number): void;
    /**
     * 编辑选项
     */
    toggleEdit(index: number): void;
    editItem(item: PlainObject, index: number): void;
    handleEditLabel(index: number, value: string): void;
    handleAdd(): void;
    handleValueChange(index: number, value: string): void;
    renderHeader(): React.JSX.Element;
    renderOption(props: any): React.JSX.Element;
    render(): React.JSX.Element;
}
export declare class ListItemControlRenderer extends ListItemControl {
}
