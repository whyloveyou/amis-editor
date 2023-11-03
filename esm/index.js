/**
 * xxd-amis-editor v1.1.2
 * build time: 2023-10-27
 * Copyright 2018-2023 @fex
 */

import 'amis';
import './locale/en-US.js';
import './locale/zh-CN.js';
export * from 'amis-editor-core';
export { Icon } from 'amis-editor-core';
export { ApiCenterDSBuilderKey, ApiDSBuilderKey, DSBehavior, DSFeature, DSFeatureEnum, DSFeatureList, DSGrain, FormOperatorMap, ModelDSBuilderKey } from './builder/constants.js';
export { displayType2inputType, getFeatLabelByKey, getFeatValueByKey, traverseSchemaDeep } from './builder/utils.js';
export { DSBuilder, builderFactory, registerDSBuilder } from './builder/DSBuilder.js';
export { DSBuilderManager } from './builder/DSBuilderManager.js';
import './builder/ApiDSBuilder.js';
import './tpl/common.js';
import './tpl/remark.js';
import './tpl/horizontal.js';
import './tpl/api.js';
import './tpl/options.js';
import './tpl/validations.js';
import './tpl/style.js';
import './tpl/layout.js';
export { FlexPlugin } from './plugin/Flex.js';
export { GridPlugin } from './plugin/Grid.js';
export { ContainerPlugin } from './plugin/Container.js';
import './plugin/Layout/Layout_free_container.js';
import './plugin/Layout/Layout_sorption_container.js';
import './plugin/Layout/Layout_fixed.js';
export { CollapseGroupPlugin } from './plugin/CollapseGroup.js';
export { PanelPlugin } from './plugin/Panel.js';
export { TabsPlugin } from './plugin/Tabs.js';
export { SwitchContainerPlugin } from './plugin/SwitchContainer.js';
export { CRUDPlugin } from './plugin/CRUD.js';
export { CRUDTablePlugin } from './plugin/CRUD2/CRUDTable.js';
export { addSchema2Toolbar, deepRemove, findAndUpdate, findObj, findSchema } from './plugin/CRUD2/utils.js';
export { FormPlugin } from './plugin/Form/Form.js';
export { ServicePlugin } from './plugin/Service.js';
export { TextControlPlugin } from './plugin/Form/InputText.js';
export { TextareaControlPlugin } from './plugin/Form/Textarea.js';
export { NumberControlPlugin } from './plugin/Form/InputNumber.js';
export { SelectControlPlugin } from './plugin/Form/Select.js';
export { NestedSelectControlPlugin } from './plugin/Form/NestedSelect.js';
export { ChainedSelectControlPlugin } from './plugin/Form/ChainedSelect.js';
export { DropDownButtonPlugin } from './plugin/DropDownButton.js';
export { CheckboxesControlPlugin } from './plugin/Form/Checkboxes.js';
export { RadiosControlPlugin } from './plugin/Form/Radios.js';
export { CheckboxControlPlugin } from './plugin/Form/Checkbox.js';
export { DateControlPlugin } from './plugin/Form/InputDate.js';
export { DateRangeControlPlugin } from './plugin/Form/InputDateRange.js';
export { FileControlPlugin } from './plugin/Form/InputFile.js';
export { ImageControlPlugin } from './plugin/Form/InputImage.js';
export { ExcelControlPlugin } from './plugin/Form/InputExcel.js';
export { TreeControlPlugin } from './plugin/Form/InputTree.js';
export { TagControlPlugin } from './plugin/Form/InputTag.js';
export { ListControlPlugin } from './plugin/Form/ListSelect.js';
export { ButtonGroupControlPlugin } from './plugin/Form/ButtonGroupSelect.js';
export { ButtonToolbarControlPlugin } from './plugin/Form/ButtonToolbar.js';
export { PickerControlPlugin } from './plugin/Form/Picker.js';
export { SwitchControlPlugin } from './plugin/Form/Switch.js';
export { RangeControlPlugin } from './plugin/Form/InputRange.js';
export { RateControlPlugin } from './plugin/Form/InputRating.js';
export { CityControlPlugin } from './plugin/Form/InputCity.js';
export { TransferPlugin } from './plugin/Form/Transfer.js';
export { TabsTransferPlugin } from './plugin/Form/TabsTransfer.js';
export { ColorControlPlugin } from './plugin/Form/InputColor.js';
export { ConditionBilderPlugin } from './plugin/Form/ConditionBuilder.js';
export { FieldSetControlPlugin } from './plugin/Form/FieldSet.js';
export { ComboControlPlugin } from './plugin/Form/Combo.js';
export { InputGroupControlPlugin } from './plugin/Form/InputGroup.js';
export { TableControlPlugin } from './plugin/Form/InputTable.js';
export { MatrixControlPlugin } from './plugin/Form/MatrixCheckboxes.js';
export { RichTextControlPlugin } from './plugin/Form/InputRichText.js';
export { DiffEditorControlPlugin } from './plugin/Form/DiffEditor.js';
export { CodeEditorControlPlugin } from './plugin/Form/CodeEditor.js';
export { SearchBoxPlugin } from './plugin/SearchBox.js';
export { KVControlPlugin } from './plugin/Form/InputKV.js';
export { RepeatControlPlugin } from './plugin/Form/InputRepeat.js';
export { UUIDControlPlugin } from './plugin/Form/UUID.js';
export { LocationControlPlugin } from './plugin/Form/LocationPicker.js';
export { SubFormControlPlugin } from './plugin/Form/InputSubForm.js';
export { HiddenControlPlugin } from './plugin/Form/Hidden.js';
export { ButtonPlugin } from './plugin/Button.js';
export { ButtonGroupPlugin } from './plugin/ButtonGroup.js';
export { NavPlugin } from './plugin/Nav.js';
export { AnchorNavPlugin } from './plugin/AnchorNav.js';
export { TooltipWrapperPlugin } from './plugin/TooltipWrapper.js';
export { AlertPlugin } from './plugin/Alert.js';
export { WizardPlugin } from './plugin/Wizard.js';
export { TableViewPlugin } from './plugin/TableView.js';
export { WebComponentPlugin } from './plugin/WebComponent.js';
export { AudioPlugin } from './plugin/Audio.js';
export { VideoPlugin } from './plugin/Video.js';
export { CustomPlugin } from './plugin/Custom.js';
export { TasksPlugin } from './plugin/Tasks.js';
export { EachPlugin } from './plugin/Each.js';
export { PropertyPlugin } from './plugin/Property.js';
export { IFramePlugin } from './plugin/IFrame.js';
export { QRCodePlugin } from './plugin/QRCode.js';
export { TplPlugin } from './plugin/Tpl.js';
export { IconPlugin } from './plugin/Icon.js';
export { LinkPlugin } from './plugin/Link.js';
export { ListPlugin } from './plugin/List.js';
export { List2Plugin } from './plugin/List2.js';
export { MappingPlugin } from './plugin/Mapping.js';
export { AvatarPlugin } from './plugin/Avatar.js';
export { CardPlugin } from './plugin/Card.js';
export { Card2Plugin } from './plugin/Card2.js';
export { CardsPlugin } from './plugin/Cards.js';
export { TablePlugin } from './plugin/Table.js';
export { Table2Plugin, Table2RendererAction, Table2RenderereEvent } from './plugin/Table2.js';
export { TableCell2Plugin } from './plugin/TableCell2.js';
export { ChartPlugin } from './plugin/Chart.js';
export { SparklinePlugin } from './plugin/Sparkline.js';
export { CarouselPlugin } from './plugin/Carousel.js';
export { ImagePlugin } from './plugin/Image.js';
export { ImagesPlugin } from './plugin/Images.js';
export { TimePlugin } from './plugin/Time.js';
export { DatePlugin } from './plugin/Date.js';
export { DatetimePlugin } from './plugin/Datetime.js';
export { TagPlugin } from './plugin/Tag.js';
export { JsonPlugin } from './plugin/Json.js';
export { ProgressPlugin } from './plugin/Progress.js';
export { StatusPlugin } from './plugin/Status.js';
export { StepsPlugin } from './plugin/Steps.js';
export { TimelinePlugin } from './plugin/Timeline.js';
export { DividerPlugin } from './plugin/Divider.js';
export { CodeViewPlugin } from './plugin/CodeView.js';
export { MarkdownPlugin } from './plugin/Markdown.js';
export { CollapsePlugin } from './plugin/Collapse.js';
export { OfficeViewerPlugin } from './plugin/OfficeViewer.js';
export { LogPlugin } from './plugin/Log.js';
export { ActionPlugin } from './plugin/Others/Action.js';
export { TableCellPlugin } from './plugin/Others/TableCell.js';
export { ArrayControlPlugin } from './plugin/Form/InputArray.js';
export { ControlPlugin } from './plugin/Form/Control.js';
export { DateTimeControlPlugin } from './plugin/Form/InputDateTime.js';
export { DateTimeRangeControlPlugin } from './plugin/Form/InputDateTimeRange.js';
export { EmailControlPlugin } from './plugin/Form/InputEmail.js';
export { FormulaControlPlugin } from './plugin/Form/Formula.js';
export { GroupControlPlugin } from './plugin/Form/Group.js';
export { ItemPlugin } from './plugin/Form/Item.js';
export { MonthControlPlugin } from './plugin/Form/InputMonth.js';
export { MonthRangeControlPlugin } from './plugin/Form/InputMonthRange.js';
export { PasswordControlPlugin } from './plugin/Form/InputPassword.js';
export { InputQuarterPlugin } from './plugin/Form/InputQuarter.js';
export { QuarterRangePlugin } from './plugin/Form/InputQuarterRange.js';
export { StaticControlPlugin } from './plugin/Form/Static.js';
export { TimeControlPlugin } from './plugin/Form/InputTime.js';
export { TimeRangeControlPlugin } from './plugin/Form/InputTimeRange.js';
export { TreeSelectControlPlugin } from './plugin/Form/TreeSelect.js';
export { URLControlPlugin } from './plugin/Form/InputURL.js';
export { YearControlPlugin } from './plugin/Form/InputYear.js';
export { YearRangeControlPlugin } from './plugin/Form/InputYearRange.js';
export { BreadcrumbPlugin } from './plugin/Breadcrumb.js';
export { CustomPlugin as CustomRegionPlugin } from './plugin/CustomRegion.js';
export { DialogPlugin, InlineModal } from './plugin/Dialog.js';
export { DrawerPlugin } from './plugin/Drawer.js';
export { HBoxPlugin } from './plugin/HBox.js';
export { ListItemPlugin } from './plugin/ListItem.js';
export { OperationPlugin } from './plugin/Operation.js';
export { PagePlugin } from './plugin/Page.js';
export { PaginationPlugin } from './plugin/Pagination.js';
export { PlainPlugin } from './plugin/Plain.js';
export { ResetPlugin } from './plugin/Reset.js';
export { SubmitPlugin } from './plugin/Submit.js';
export { WrapperPlugin } from './plugin/Wrapper.js';
export { ColumnToggler } from './plugin/ColumnToggler.js';
import './renderer/OptionControl.js';
import './renderer/NavSourceControl.js';
import './renderer/NavBadgeControl.js';
import './renderer/NavDefaultActive.js';
import './renderer/MapSourceControl.js';
import './renderer/TimelineItemControl.js';
import './renderer/APIControl.js';
import './renderer/APIAdaptorControl.js';
import './renderer/ValidationControl.js';
import './renderer/ValidationItem.js';
import './renderer/SwitchMoreControl.js';
import './renderer/StatusControl.js';
import './renderer/FormulaControl.js';
import './renderer/ExpressionFormulaControl.js';
import './renderer/textarea-formula/TextareaFormulaControl.js';
import './renderer/TplFormulaControl.js';
import './renderer/DateShortCutControl.js';
import './renderer/BadgeControl.js';
import './renderer/style-control/BoxModel.js';
import './renderer/style-control/Font.js';
import './renderer/style-control/Border.js';
import './renderer/style-control/BoxShadow.js';
import './renderer/style-control/Background.js';
import './renderer/style-control/Display.js';
import './renderer/style-control/InsetBoxModel.js';
import './renderer/RangePartsControl.js';
import './renderer/DataBindingControl.js';
import './renderer/DataMappingControl.js';
import './renderer/DataPickerControl.js';
import './renderer/FeatureControl.js';
import './renderer/event-control/index.js';
import './renderer/TreeOptionControl.js';
import './renderer/TransferTableControl.js';
import './renderer/style-control/ThemeCssCode.js';
import './renderer/ButtonGroupControl.js';
import './renderer/FlexSettingControl.js';
import './renderer/FieldSetting.js';
import './renderer/TableColumnWidthControl.js';
import './renderer/crud2-control/CRUDColumnControl.js';
import './renderer/crud2-control/CRUDToolbarControl.js';
import './renderer/crud2-control/CRUDFiltersControl.js';
import './renderer/InputRangeValueControl.js';
import './renderer/FunctionEditorControl.js';
import './renderer/ListItemControl.js';
import 'amis-theme-editor/lib/locale/zh-CN';
import 'amis-theme-editor/lib/locale/en-US';
import 'amis-theme-editor/lib/renderers/Border';
import 'amis-theme-editor/lib/renderers/ColorPicker';
import 'amis-theme-editor/lib/renderers/Font';
import 'amis-theme-editor/lib/renderers/PaddingAndMargin';
import 'amis-theme-editor/lib/renderers/Radius';
import 'amis-theme-editor/lib/renderers/Shadow';
import 'amis-theme-editor/lib/renderers/Size';
import 'amis-theme-editor/lib/renderers.css';
export { BUTTON_DEFAULT_ACTION, BaseLabelMark, formItemControl, remarkTpl } from './component/BaseControl.js';
import './icons/index.js';
window.amisEditorVersionInfo={version:'1.1.2',buildTime:'2023-10-27'};