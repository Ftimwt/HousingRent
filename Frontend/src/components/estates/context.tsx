import {createContext, useState} from "react";

export interface EstateListContextI {
    selected?: EstateModel;
    setSelected: (_: EstateModel | undefined) => void
}

export const EstateListContext = createContext<EstateListContextI>({
    selected: undefined,
    setSelected: (_: EstateModel | undefined) => {
    }
})

export const useEstateList = () => {
    const [selected, setSelected] = useState<EstateModel | undefined>();

    const handleChange = (estate: EstateModel|undefined) => {
        setSelected(estate);
    }

    const value: EstateListContextI = {
        selected,
        setSelected: handleChange
    }

    return [value]
}