import create from 'zustand'






export const useNeuRenderTotal = create((set, get) => ({
    neuRenderTotal: 0,
    setNeuRenderTotal: (value) => set({ neuRenderTotal: value }),
    plusNeuRenderTotal: () => set( (state) => ({ neuRenderTotal: state.neuRenderTotal + 1 })) ,
    minusNeuRenderTotal: () => set( (state) => ({ neuRenderTotal: state.neuRenderTotal - 1 })),
    setTrueNeuRenderTotal: () => set({ neuRenderTotal: true }),
    setFalseNeuRenderTotal: () => set({ neuRenderTotal: false }),
    resetNeuRenderTotal: () => set({ neuRenderTotal: 0 })
}))

export const { 
    setNeuRenderTotal,
    plusNeuRenderTotal, 
    minusNeuRenderTotal, 
    setTrueNeuRenderTotal, 
    setFalseNeuRenderTotal, 
    resetNeuRenderTotal } = useNeuRenderTotal //.getState()


    /* 
   //  import für die verschiedenen Dateien in denen die Funktionen benutzt werden sollen:

    import { useNeuRenderTotal  } from "../store/neuRenderTotal.jsx";
import { setNeuRenderTotal, plusNeuRenderTotal, minusNeuRenderTotal, setTrueNeuRenderTotal, setFalseNeuRenderTotal, resetNeuRenderTotal } from "../store/neuRenderTotal";


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