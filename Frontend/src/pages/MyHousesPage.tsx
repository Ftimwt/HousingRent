import {useMyEstatesQuery} from "@housing_rent/redux/requests/owner";
import Page from "@housing_rent/pages/page";
import {Divider, Empty, Tabs, Typography} from "antd";
import Loading from "@housing_rent/components/loading/loading";
import EstateGrid from "@housing_rent/components/estates/grid";
import OwnerEstatesList from "@housing_rent/components/owner/estates_list";
import OwnerEstateRentRequest from "@housing_rent/components/owner/estates_reqests";
import EstateContract from "@housing_rent/components/owner/estate_contract";

const MyHousesPage = () => {


    return <Page title="املاک من" login>
        <Tabs items={[
            {
                key: 'my_houses',
                label: 'لیست املاک',
                children: <OwnerEstatesList/>
            },
            {
                key: 'requests',
                label: 'درخواست های اجاره ملک',
                children: <OwnerEstateRentRequest/>
            },
            {
                key: 'contracts',
                label: 'قرارداد ها',
                children: <EstateContract/>
            }
        ]}/>
    </Page>;
}

export default MyHousesPage;