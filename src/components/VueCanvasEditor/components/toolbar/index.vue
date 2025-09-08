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
    import { eventBus, EVENTS } from '@/components/VueCanvasEditor/eventBus';

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
            eventBus.$on(EVENTS.DISABLE_NON_EXCLUDE_TOOLBAR_BUTTONS, ({ isReadonly, exclude }) => {
                this.isReadonly = isReadonly;
                this.excludeDisableList = exclude;
            });
        },
        methods: {
            disableMenuRule(menu) {
                return this.isReadonly && (!menu || !this.excludeDisableList.includes(menu));
            }
        }
    };
</script>

<style scoped lang="scss">
</style>
