import {
    useAcceptRentRequestMutation,
    useRemoveRentRequestMutation,
    useRequestsQuery
} from "@housing_rent/redux/requests/owner";
import {App, Button, Descriptions, Empty, List} from "antd";
import Loading from "@housing_rent/components/loading/loading";
import {getFullname} from "@housing_rent/utils/convert";
import {IsResponse} from "@housing_rent/utils/types_check";

interface RentRequestItemProps {
    item: SendRentResponseI;
}

const RentRequestItem = ({item}: RentRequestItemProps) => {
    const [accept] = useAcceptRentRequestMutation();
    const [remove] = useRemoveRentRequestMutation();
    const {message, modal} = App.useApp();

    const handleResponse = (response: any) => {
        if ('data' in response) {
            message.success(response.data.detail).then();
        } else {
            let msg = "خطای نامشخص";
            if ('data' in response.error && IsResponse(response.error.data)) {
                msg = response.error.data.detail;
            }
            message.error(msg).then();
        }
    }

    const handleAccept = () => {
        modal.confirm({
            title: 'تایید اجاره', content: 'تایید اجاره خانه و ایجاد قرارداد', onOk: () => {
                accept(item.id).then(handleResponse);
            }
        })
    }

    const handleRemove = () => {
        remove(item.id).then(handleResponse);
    }

    return <List.Item>
        <div className="flex flex-col">
            <Descriptions
                items={[
                    {
                        label: 'آدرس',
                        children: item.estate.address
                    },
                    {
                        label: 'درخواست دهنده',
                        children: getFullname(item.user)
                    }
                ]}
            />
            <div className="flex flex-row gap-2">
                <Button onClick={handleAccept} type="primary">تایید</Button>
                <Button onClick={handleRemove} danger>تایید</Button>
            </div>
        </div>
    </List.Item>
}

const OwnerEstateRentRequest = () => {
    const {data, isFetching} = useRequestsQuery();

    if (isFetching) {
        return <div className="items-center justify-center">
            <Loading loading={true}>
                <></>
            </Loading>
        </div>
    }

    if (!data || !data.length) {
        return <div className="flex items-center justify-center">
            <Empty description={"درخواست اجاره ای برای املاک شما ارسال نشده است"}/>
        </div>
    }

    return <div>
        <List renderItem={(item) => <RentRequestItem item={item}/>} dataSource={data}/>
    </div>;
}

export default OwnerEstateRentRequest;