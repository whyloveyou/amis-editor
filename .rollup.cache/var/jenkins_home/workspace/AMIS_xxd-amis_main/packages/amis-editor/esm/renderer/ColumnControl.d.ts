/**
 * @file 表格自定义列可视化编辑控件
 */
import React from 'react';
import { FormControlProps } from 'amis';
export interface ColumnControlProps extends FormControlProps {
    className?: string;
}
export interface ColumnsControlState {
    columns: Array<any>;
}
export default class ColumnControl extends React.Component<ColumnControlProps, ColumnsControlState> {
    constructor(props: any);
    transformColumns(props: any): any;
    onChange(value: Array<any>): void;
    render(): React.JSX.Element;
}
export declare class ColumnControlRenderer extends ColumnControl {
}
