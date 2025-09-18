import exportDocx from './exportDocx'
import exportDocx2 from './exportDocxTmp'

export default function docxPlugin(editor) {
    const command = editor.command
    // 导出文档
    command.executeExportDocx = exportDocx(command)
    command.executeExportDocxTmp = exportDocx2(command)
}