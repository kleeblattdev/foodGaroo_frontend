


import create from 'zustand'






export const useInfinityScrollCategoryZuFilter = create((set, get) => ({
    neuLimit: 20,
    neuOffset: 0,
   
    setNeuLimit: (value) => set({ neuLimit: value }),
    setNeuOffset: (value) => set({ neuOffset: value }),
   
    plusNeuLimit: () => set((state) => ({ neuLimit: state.neuLimit + 20 })),
    minusNeuLimit: () => set((state) => ({ neuLimit: state.neuLimit - 20 })),
    
    plusNeuOffset: () => set((state) => ({ neuOffset: state.neuOffset + 20 })),
    minusNeuOffset: () => set((state) => ({ neuOffset: state.neuOffset - 20 })),

    resetNeuLimit: () => set({ neuLimit: 0 }),
    resetNeuOffset: () => set({ neuOffset: 0 })
}))

export const {
    setNeuLimit,
    setNeuOffset,
    plusNeuLimit,
    minusNeuLimit,
    plusNeuOffset,
    minusNeuOffset,
    resetNeuLimit,
    resetNeuOffset } = useInfinityScrollCategoryZuFilter //.getState()


/*
//  import für die verschiedenen Dateien in denen die Funktionen benutzt werden sollen:

import {useInfinityScrollCategoryZuFilter }  from '../store/useInfinityScrollCategoryZuFilter.jsx'
import {  setNeuLimit,    setNeuOffset,    plusNeuLimit,    minusNeuLimit, plusNeuOffset,    minusNeuOffset,    resetNeuLimit,    resetNeuOffset  }  from '../store/useInfinityScrollCategoryZuFilter.jsx'


*/

/* 
     // so erstmal definieren: 

    const neuRendernTotal = useNeuRenderTotal((state) => state.neuRenderTotal);

    const setNeuRenderTotal = useNeuRenderTotal((state) => state.setNeuRenderTotal);
    const plusNeuRenderTotal = useNeuRenderTotal((state) => state.plusNeuRenderTotal);
    const minusNeuRenderTotal = useNeuRenderTotal((state) => state.minusNeuRenderTotal);
    const setTrueNeuRenderTotal = useNeuRenderTotal((state) => state.setTrueNeuRenderTotal);
    const setFalseNeuRendernTotal = useNeuRenderTotal((state) => state.setFalseNeuRenderTotal);

*/

/* 
// so dann aufrufen:

{neuRendernTotal }    
// oder im useEffect (() => {...}, [neuRendernTotal])

    onClick={async () => {
                                            minusNeuRenderTotal()
*/