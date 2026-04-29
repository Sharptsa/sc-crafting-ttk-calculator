import { computed, type Ref } from "vue";
import { useStorage } from '@vueuse/core'

export const accordionStateSaver = (readyState: Ref<boolean>, componentId:string, defaultState: boolean = true) => {
    const savedState: Ref<boolean> = useStorage(`pref:state:${componentId}`, defaultState);

    const toggleState = () => {
        savedState.value = !savedState.value
    };

    const accordionState = computed(():boolean => {
        if (readyState.value === false) {
            return false
        }
        return savedState.value;
    })

    return {
        accordionState,
        toggleState
    };
};
