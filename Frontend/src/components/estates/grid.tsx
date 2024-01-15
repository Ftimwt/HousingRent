import EstateItem from "@housing_rent/components/estates/item";

interface Props {
    estates: EstateModel[];
}

const EstateGrid = ({estates}: Props) => {
    return <div className="grid gap-5 grid-cols-3 justify-items-stretch">
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