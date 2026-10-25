import {createContext,useContext,useEffect,useRef} from 'react';
export const BackNavigationContext=createContext(null);
// Subviews register their own destination; the app falls back to page history.
export function useBackNavigation(handler,enabled=true){
 const register=useContext(BackNavigationContext),latest=useRef(handler);latest.current=handler;
 useEffect(()=>{if(!enabled||!register)return;return register(()=>latest.current());},[register,enabled]);
}
