import { eventBus, EVENTS } from '../../../config/eventBus';

/**
 * change toolbar button active status mixin
 */
export default {
    data() {
        return {
            active: false
        }
    },
    created() {
        eventBus.$on(EVENTS.RANGE_STYLE_CHANGE, this.updateActiveStatus);
    },
    beforeDestroy() {
        eventBus.$off(EVENTS.RANGE_STYLE_CHANGE, this.updateActiveStatus);
    },
    methods: {
        updateActiveStatus(payload) {
            console.log('updateActiveStatus payload:', payload);
        }
    }
}