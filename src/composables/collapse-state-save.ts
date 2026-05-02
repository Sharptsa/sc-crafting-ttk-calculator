import { computed, type Ref } from "vue";
import { useStorage } from "@vueuse/core";

export const collapseStateSaver = (
    componentId: string,
    readyState: Ref<boolean>|null = null,
    defaultState: boolean = true,
) => {
    const savedState: Ref<boolean> = useStorage(`pref:state:${componentId}`, defaultState);

    const toggleState = () => {
        savedState.value = !savedState.value;
    };

    const collapseState = computed((): boolean => {
        if (readyState !== null && readyState.value === false) {
            return false;
        }
        return savedState.value;
    });

    return {
        collapseState,
        toggleState,
    };
};
