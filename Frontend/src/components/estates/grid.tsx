import EstateItem from "@housing_rent/components/estates/item";

interface Props {
    estates: EstateModel[];
}

const EstateGrid = ({estates}: Props) => {
    return <div className="flex flex-row w-full overflow-auto max-h-[500px]  flex-wrap gap-5">
        {estates.map((estate, key) => (
            <EstateItem
                key={`estate-${estate.id}-${key}`}
                estate={estate}
            />
        ))
        }
    </div>
}

export default EstateGrid;