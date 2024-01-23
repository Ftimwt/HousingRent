import {Divider, Empty, Typography} from "antd";
import Loading from "@housing_rent/components/loading/loading";
import EstateGrid from "@housing_rent/components/estates/grid";
import {useMyEstatesQuery} from "@housing_rent/redux/requests/owner";

const OwnerEstatesList = () => {
    const {data: estates, isFetching} = useMyEstatesQuery()

    return (
        <>
            <Loading loading={isFetching}>
                {
                    estates ?
                        <EstateGrid
                            estates={estates!}
                        /> :
                        <Empty/>
                }
            </Loading>
        </>
    )
}

export default OwnerEstatesList;