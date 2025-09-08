<template>
    <div class="menu-item">
        <div class="menu-item__table" @click="clickHandler">
            <i title="表格"></i>
        </div>
        <div ref="tablePanelContainer" class="menu-item__table__collapse">
            <div class="table-close" @click="closeHandler">×</div>
            <div class="table-title">
                <span class="table-select">{{ tableTitle }}</span>
                <span>表格</span>
            </div>
            <table
                ref="tablePanel"
                class="table-panel"
                @click="tablePanelClickHandler"
                @mousemove.prevent="mousemoveTableCellHandler"
            >
                <!-- 绘制行列 -->
                <tr
                    v-for="(item, rowIndex) in tableCellList"
                    :key="rowIndex"
                    class="table-row"
                >
                    <td
                        v-for="(cel, celIndex) in item"
                        :key="celIndex"
                        class="table-cel"
                        :class="{ active: cel.active }"
                        :data-row="rowIndex"
                        :data-col="celIndex"
                    ></td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Table',
        inject: [ 'editorInstance', 'isApple' ],
        data() {
            return {
                tableCellList: [],
                colIndex: 0,
                rowIndex: 0,
                tableTitle: '插入',
                lastCell: null
            };
        },
        mounted() {
            this.$nextTick(() => {
                this.initTableCellList();
            });
        },
        methods: {
            clickHandler() {
                this.$refs.tablePanelContainer.style.display = 'block';
            },
            /* 绘制行列 */
            initTableCellList() {
                this.tableCellList = [];
                for (let i = 0; i < 10; i++) {
                    const trCellList = [];
                    for (let j = 0; j < 10; j++) {
                        const cell = { active: false };
                        trCellList.push(cell);
                    }
                    this.tableCellList.push(trCellList);
                }
            },
            /* 移除所有格选择 */
            removeAllTableCellSelect() {
                this.tableCellList.forEach(tr => {
                    tr.forEach(td => {
                        td.active = false;
                    });
                });
            },
            /* 设置标题内容 */
            setTableTitle(payload) {
                this.tableTitle = payload;
            },
            /* 恢复初始状态 */
            recoveryTable() {
                // 还原选择样式、标题、选择行列
                this.removeAllTableCellSelect();
                this.setTableTitle('插入');
                this.colIndex = 0;
                this.rowIndex = 0;
                // 隐藏panel
                this.$refs.tablePanelContainer.style.display = 'none';
            },
            /* 鼠标移入格子事件 */
            mousemoveTableCellHandler(evt) {
                const target = evt.target;

                if (target && target.classList.contains('table-cel')) {
                    if (this.lastCell === target) {
                        return; // 鼠标还在同一个单元格，不重复执行
                    }
                    this.lastCell = target;
                    // 移除所有选择
                    this.removeAllTableCellSelect();
                    const { row = 0, col = 0 } = target.dataset;
                    this.rowIndex = Number(row) + 1;
                    this.colIndex = Number(col) + 1;
                    // 高亮该单元格
                    for (let i = 0; i <= row; i++) {
                        for (let j = 0; j <= col; j++) {
                            this.tableCellList[i][j].active = true;
                        }
                    }
                    // 改变表格标题
                    this.setTableTitle(`${ this.rowIndex }×${ this.colIndex }`);
                }
            },
            /* 关闭按钮事件 */
            closeHandler() {
                this.recoveryTable();
            },
            /* panel点击事件 */
            tablePanelClickHandler() {
                this.editorInstance().command.executeInsertTable(this.rowIndex, this.colIndex);
                this.recoveryTable();
            }
        }
    };
</script>

<style scoped lang="scss">

</style>