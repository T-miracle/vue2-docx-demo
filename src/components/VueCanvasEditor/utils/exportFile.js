export function exportFile({ instance, fileName = 'test' }) {
    instance.command.executeExportDocx({ fileName })
}