import {Button, Card, Descriptions, Divider, Tag} from "antd";
import {useCallback, useContext, useMemo} from "react";
import {EstateListContext} from "@housing_rent/components/estates/context";
import useUser from "@housing_rent/redux/features/user/user";

interface Props {
    estate: EstateModel;
}

const EstateItemCover = ({estate}: Props) => {
    const {user} = useUser();

    const photo = import.meta.env.VITE_PREFIX_MEDIA + estate.files[0].photo_url;

    const fullName = useMemo(() => {
        return `${estate.owner.first_name} ${estate.owner.last_name}`
    }, [estate])

    const ownerTitle = useMemo(() => {
        if (estate.owner?.id === user?.id) {
            return "ملک شما"
        }
        return "مالک " + fullName;
    }, [estate, fullName]);

    return <div className="relative w-full">
        <img className="w-full" src={photo} alt="تصویر"/>
        <Tag className="!absolute !bottom-0 z-10">{ownerTitle}</Tag>
    </div>
}

const EstateItem = ({estate}: Props) => {
    const {setSelected} = useContext(EstateListContext);

    const handleClick = useCallback(() => {

        setSelected(estate);
    }, [estate]);

    return <Card className="shadow w-full min-w-[350px] max-w-[320px] flex flex-col content-between" size="small"
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
            <Button onClick={handleClick}>مشاهده اطلاعات بیشتر</Button>
        </div>
    </Card>
}

export default EstateItem;