import { useContext, createContext } from "react";

export const Creatoperation = createContext();

// export const Creatoperationprovider = Creatoperation.Provider;

export function UseCreatoperation() {
    return useContext(Creatoperation)
}