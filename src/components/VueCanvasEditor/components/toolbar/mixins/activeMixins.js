import { eventBus, EVENTS } from '../../../eventBus';

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