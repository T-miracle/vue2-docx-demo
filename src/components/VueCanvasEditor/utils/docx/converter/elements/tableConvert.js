import { AlignmentType, BorderStyle, ShadingType, Table, TableCell, TableRow, WidthType } from 'docx';
import { TableBorder } from '@hufe921/canvas-editor';
import { rowFlexToAlignmentType, verticalAlignEditorToVerticalAlignDocx } from '../utils/map';
import { paragraphAnalyzer } from '../paragraphAnalyzer';
import { convertPxToSize } from '../../utils';

/**
 * 转化成 docx 表格
 * @param element
 */
export function tableConvert(element) {
    const { borderType, colgroup, trList } = element;
    const borderDashed = {
        style: BorderStyle.DASHED,
        size: 1,
        color: '000000'
    };
    const borderEmpty = {
        style: BorderStyle.NONE,
        size: 0,
        color: '#ffffff'
    };
    const bordersAll = {
        top: borderDashed,
        bottom: borderDashed,
        left: borderDashed,
        right: borderDashed
    };
    const bordersEmpty = {
        top: borderEmpty,
        bottom: borderEmpty,
        left: borderEmpty,
        right: borderEmpty
    };
    const tableRowList = [];
    for (let r = 0; r < trList.length; r++) {
        const tdList = trList[r].tdList;
        const tableCellList = [];
        for (let c = 0; c < tdList.length; c++) {
            const td = tdList[c];
            let borders = undefined;
            if (borderType === TableBorder.ALL) {
                borders = JSON.parse(JSON.stringify(bordersAll));
            }
            if (borderType === TableBorder.EMPTY) {
                borders = JSON.parse(JSON.stringify(bordersEmpty));
            }
            if (borderType === TableBorder.EXTERNAL) {
                borders = JSON.parse(JSON.stringify(bordersEmpty));
                const lastTdIndex = tdList.length - 1;
                const isTdLast = c === lastTdIndex;
                const containColSpan = td.colspan > 1;
                const colSpan = c + td.colspan;
                const rowSpan = r + td.rowspan;
                if (r === 0) {
                    borders.top = borderDashed;
                }
                if (isTdLast || (containColSpan && colSpan === lastTdIndex)) {
                    borders.right = borderDashed;
                }
                if ((r === trList.length - 1) || (rowSpan === trList.length - 1)) {
                    borders.bottom = borderDashed;
                }
                if (c === 0) {
                    borders.left = borderDashed;
                }
            }
            if (td.borderTypes && Object.values(td.borderTypes).includes(TdBorder.BOTTOM)) {
                borders.bottom = borderDashed;
            }
            const verticalAlign = td.verticalAlign
                ? verticalAlignEditorToVerticalAlignDocx[td.verticalAlign]
                : undefined;
            let shading = undefined;
            if (td.backgroundColor) {
                shading = {
                    fill: td.backgroundColor,
                    type: ShadingType.CLEAR,
                    color: 'auto'
                };
            }
            const tdCell = {
                verticalAlign: verticalAlign,
                borders,
                shading,
                columnSpan: td.colspan,
                rowSpan: td.rowspan,
                children: paragraphAnalyzer(td.value) || []
            };
            tableCellList.push(new TableCell(tdCell));
        }
        tableRowList.push(new TableRow({
            children: tableCellList
        }));
    }
    const columnWidths = colgroup?.reduce((acumm, colWidth) => {
        const inches = convertPxToSize(colWidth.width);
        acumm.push(inches);
        return acumm;
    }, []);
    return new Table({
        rows: tableRowList,
        alignment: rowFlexToAlignmentType[element.rowFlex] ?? AlignmentType.LEFT,
        columnWidths: columnWidths,
        width: {
            size: '100%',
            type: WidthType.PERCENTAGE
        }
    });
}