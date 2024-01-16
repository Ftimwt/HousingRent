import {App, Descriptions, Modal} from "antd";
import Convert from "@housing_rent/utils/convert";
import {CloseCircle} from "iconsax-react";
import convert from "@housing_rent/utils/convert";
import {
    useRemoveRentRequestMutation,
    useRequestsQuery,
    useSendRentRequestMutation
} from "@housing_rent/redux/requests/tenant";
import {useCallback, useEffect, useMemo} from "react";
import {IsResponse} from "@housing_rent/utils/types_check";

interface Props {
    open: boolean;
    estate: EstateModel;
    onClose?: () => void;
}

const EstateDetailsDialog = ({open, estate, onClose}: Props) => {
    const [request, {data, error, isLoading: requestLoading}] = useSendRentRequestMutation();
    const [removeRequest, {data: removeRequestData, error: removeRequestError}] = useRemoveRentRequestMutation();
    const {data: requestsResponse, refetch} = useRequestsQuery();

    const {message} = App.useApp();

    const reqId = useMemo(() => {
        if (!requestsResponse || !estate?.id) return false;
        const result = requestsResponse.filter(req => req.estate.id == estate.id).map(req => req.id);
        return result.length ? result[0] : false;
    }, [requestsResponse, estate]);

    const handleClose = () => {
        if (requestLoading) return;
        onClose?.();
    }

    const handleSendRequest = useCallback(() => {
        if (!estate) return;
        if (reqId) {
            removeRequest(estate.id);
        } else {
            request(estate.id);
        }
    }, [estate, reqId]);

    const handleOk = useCallback(() => {
    }, [handleSendRequest, reqId]);

    // handle change data
    useEffect(() => {
        if (!data?.detail) return;
        message.success(data.detail).then();
        refetch();
    }, [data]);

    useEffect(() => {
        if (!error) return;
        if ('data' in error) {
            if (IsResponse(error.data)) {
                message.error(error.data.detail).then();
            }
        }
    }, [error]);

    useEffect(() => {
        if (!removeRequestData?.detail) return;
        message.success(removeRequestData.detail).then();
        refetch();
    }, [removeRequestData]);

    useEffect(() => {
        if (!removeRequestError) return;
        if ('data' in removeRequestError) {
            if (IsResponse(removeRequestError.data)) {
                message.error(removeRequestError.data.detail).then();
            }
        }
    }, [removeRequestError]);

    return <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        closeIcon={<CloseCircle/>}
        okText={!!reqId ? "لغو درخواست" : "درخواست اجاره ملک"}
        cancelText="بستن"
        cancelButtonProps={{
            disabled: requestLoading,
        }}
        okButtonProps={{
            disabled: requestLoading,
            danger: !!reqId
        }}
    >
        <div className="flex flex-col">
            {estate ?
                <div className="flex flex-col gap-4">
                    <img src={Convert.coverPhotoFromEstate(estate)} alt="خطا در بارگذاری تصویر"/>
                    <Descriptions
                        size="small"
                        layout="horizontal"
                        column={2}
                        items={[{
                            key: 'owner',
                            label: 'مالک ملک',
                            children: Convert.getFullname(estate.owner)
                        }]}
                    />

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

                    <Descriptions
                        size="small"
                        layout="vertical"
                        column={2}
                        items={[{
                            key: 'rental_price',
                            label: 'قیمت اجاره',
                            children: convert.convertPrice(estate.rental_price)
                        }, {
                            key: 'mortgage_price',
                            label: 'قیمت رهن',
                            children: Convert.convertPrice(estate.mortgage_price)
                        }]}
                    />

                    <Descriptions
                        size="middle"
                        layout="vertical"
                        items={[{
                            key: 'description',
                            label: 'توضیحات',
                            children: estate?.description != "" ? estate.description : 'توضیحات اضافه ندارد'
                        }]}
                    />
                </div>
                :
                <></>
            }
        </div>
    </Modal>;
}

export default EstateDetailsDialog;