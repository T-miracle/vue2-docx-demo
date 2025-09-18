import { paragraphChildrenConvert } from '../paragraphChildrenConvert';
import { Paragraph } from 'docx';
import { rowFlexToAlignmentType, titleLevelToHeadingLevel } from '../utils/map';
import { RowFlex } from '@hufe921/canvas-editor';

export function titleConvert(element) {
    return new Paragraph({
        heading: titleLevelToHeadingLevel[element.level],
        alignment: rowFlexToAlignmentType[element.valueList?.[0]?.rowFlex ?? RowFlex.LEFT],
        children: element.valueList?.map(item => paragraphChildrenConvert(item)) ?? []
    });
}