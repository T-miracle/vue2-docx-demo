export function exportFile({ instance, fileName = 'test' }) {
    instance.command.executeExportDocx({ fileName })
}

export function exportFileTmp({ instance, fileName = 'test' }) {
    instance.command.executeExportDocxTmp({ fileName })
}