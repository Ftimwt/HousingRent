import {Card, Descriptions, Divider, Tag} from "antd";
import {useMemo} from "react";

interface Props {
    estate: EstateModel;
}

const EstateItemCover = ({estate}: Props) => {
    const photo = import.meta.env.VITE_PREFIX_MEDIA + estate.files[0].photo_url;

    const fullName = useMemo(() => {
        return `${estate.owner.first_name} ${estate.owner.last_name}`
    }, [estate])

    return <div className="relative w-full">
        <img className="w-full" src={photo} alt="تصویر"/>
        <Tag className="absolute bottom-0 z-10">{"مالک " + fullName}</Tag>
    </div>
}

const EstateItem = ({estate}: Props) => {
    return <Card className="shadow min-w-[350px]" size="small"
                 cover={<EstateItemCover estate={estate}/>}
    >
        <div className="flex flex-col gap-2">
            <Descriptions
                size="small"
                items={[{
                    key: 'address',
                    label: 'آدرس',
                    children: estate.address
                }, {
                    key: 'size_of_house',
                    label: 'ابعاد ملک',
                    children: estate.size_of_house.toLocaleString('fa') + " متر مربع"
                }
                ]}
                column={1}
                layout="vertical"
            />
            <Divider className="m-0"/>
            <Descriptions
                size="small"
                layout="vertical"
                column={2}
                items={[{
                    key: 'rental_price',
                    label: 'قیمت اجاره',
                    children: estate.rental_price.toLocaleString('fa') + " تومان"
                }, {
                    key: 'mortgage_price',
                    label: 'قیمت رهن',
                    children: estate.mortgage_price.toLocaleString('fa') + " تومان"
                }]}
            />
        </div>
    </Card>
}

export default EstateItem;