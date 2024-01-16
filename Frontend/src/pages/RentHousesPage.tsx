import Page from "@housing_rent/pages/page";
import EstateGrid from "@housing_rent/components/estates/grid";
import {useRentedHousesQuery} from "@housing_rent/redux/requests/tenant";
import Loading from "@housing_rent/components/loading/loading";
import {Divider, Empty, Typography} from "antd";

const RentHousesPage = () => {
    const {data: estates, isFetching} = useRentedHousesQuery();

    return <Page title="خانه های اجاره شده" className="bg-white">
        <Typography.Title level={3}>خانه های اجاره شده</Typography.Title>

        <Divider/>

        <Loading loading={isFetching}>
            {
                estates ?
                    <EstateGrid
                        estates={estates!}
                    /> :
                    <Empty/>
            }
        </Loading>
    </Page>;
}

export default RentHousesPage;