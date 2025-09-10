<template>
    <div class="menu" editor-component="menu">
        <template v-for="(item, key) in menus">
            <template v-if="!Array.isArray(item)">
                <component
                    :key="key"
                    :is="toolbarMenuList[item]"
                    :class="{ 'disable': disableMenuRule(item) }"
                />
            </template>
            <div v-else :key="key" class="menu-item">
                <component
                    v-for="(it, i) in item"
                    :key="i"
                    :is="toolbarMenuList[it]"
                    :class="{ 'disable': disableMenuRule(it) }"
                />
            </div>
        </template>
    </div>
</template>

<script>
    import { toolbarMenuList, toolbarMenu } from './defaultToolbarMenu';
    import { eventBus, EVENTS } from '../../eventBus';
    import { ControlState } from '@hufe921/canvas-editor';

    export default {
        name: 'Toolbar',
        data() {
            return {
                toolbarMenuList,
                isReadonly: false,
                excludeDisableList: []
            };
        },
        computed: {
            menus() {
                return toolbarMenu;
            }
        },
        created() {
            eventBus.$on(EVENTS.DISABLE_NON_EXCLUDE_TOOLBAR_BUTTONS, this.disableNonExcludeToolbarButtons);
            eventBus.$on(EVENTS.CONTROL_CHANGE, this.controlChange);
        },
        beforeDestroy() {
            eventBus.$off(EVENTS.DISABLE_NON_EXCLUDE_TOOLBAR_BUTTONS, this.disableNonExcludeToolbarButtons);
            eventBus.$off(EVENTS.CONTROL_CHANGE, this.controlChange);
        },
        methods: {
            disableMenuRule(menu) {
                return this.isReadonly && (!menu || !this.excludeDisableList.includes(menu));
            },
            disableNonExcludeToolbarButtons({ isReadonly, exclude }) {
                this.isReadonly = isReadonly;
                this.excludeDisableList = exclude;
            },
            controlChange(payload) {
                const disableMenusInControlContext = [
                    'table',
                    'hyperlink',
                    'separator',
                    'page-break',
                    'control'
                ];
                console.log('state -->', payload.state);
                // 菜单操作权限
                disableMenusInControlContext.forEach(menu => {
                    const menuDom = this.$el.querySelector(`.menu-item__${ menu }`);
                    payload.state === ControlState.ACTIVE
                        ? menuDom.classList.add('disable')
                        : menuDom.classList.remove('disable');
                });
            }
        }
    };
</script>

<style scoped lang="scss">
</style>
