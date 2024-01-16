import {createContext, useState} from "react";

export interface EstateListContextI {
    selected?: EstateModel;
    setSelected: (_: EstateModel | undefined) => void;
    buttonTitle?: string;
    setButtonTitle: (_: string) => void;
}

export const EstateListContext = createContext<EstateListContextI>({
    selected: undefined,
    setSelected: (_: EstateModel | undefined) => {
    },
    buttonTitle: undefined,
    setButtonTitle: (_: string) => {
    }
})

export const useEstateList = () => {
    const [selected, setSelected] = useState<EstateModel | undefined>();
    const [buttonTitle, setButtonTitle] = useState<string>();

    const handleChange = (estate: EstateModel | undefined) => {
        setSelected(estate);
    }

    const value: EstateListContextI = {
        selected,
        setSelected: handleChange,
        buttonTitle,
        setButtonTitle
    }

    return [value]
}