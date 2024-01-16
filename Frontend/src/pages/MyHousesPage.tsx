import {useMyEstatesQuery} from "@housing_rent/redux/requests/owner";
import Page from "@housing_rent/pages/page";
import {Divider, Empty, Typography} from "antd";
import Loading from "@housing_rent/components/loading/loading";
import EstateGrid from "@housing_rent/components/estates/grid";

const MyHousesPage = () => {
    const {data: estates, isFetching} = useMyEstatesQuery()


    return <Page title="املاک من" login>
        <Typography.Title level={3}>املاک من</Typography.Title>

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

export default MyHousesPage;