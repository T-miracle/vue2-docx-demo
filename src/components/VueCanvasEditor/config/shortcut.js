import { KeyMap } from '@hufe921/canvas-editor';
import { eventBus, EVENTS } from './eventBus';

export default [
    {
        key: KeyMap.P,
        mod: true,
        isGlobal: true,
        callback: (command) => {
            command.executePrint();
        }
    },
    {
        key: KeyMap.F,
        mod: true,
        isGlobal: true,
        callback: (command) => {
            const text = command.getRangeText();
            eventBus.$emit(EVENTS.SEARCH_BY_TEXT, text)
        }
    },
    {
        key: KeyMap.MINUS,
        ctrl: true,
        isGlobal: true,
        callback: (command) => {
            command.executePageScaleMinus();
        }
    },
    {
        key: KeyMap.EQUAL,
        ctrl: true,
        isGlobal: true,
        callback: (command) => {
            command.executePageScaleAdd();
        }
    },
    {
        key: KeyMap.ZERO,
        ctrl: true,
        isGlobal: true,
        callback: (command) => {
            command.executePageScaleRecovery();
        }
    }
];