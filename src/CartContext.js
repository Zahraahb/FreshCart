import { createContext, useContext, useState } from "react"

export const CartContext= createContext(null)

export function CartContextProvider({children}){
    let [isOpen, setIsOpen]=useState(false)
    return<CartContext.Provider value={{isOpen,setIsOpen}}>
        {children}
    </CartContext.Provider>
}