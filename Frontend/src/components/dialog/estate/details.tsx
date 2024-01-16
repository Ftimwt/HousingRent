import {App, Descriptions, Modal, Typography} from "antd";
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
import Map from "@housing_rent/components/maps";
import {MapContext, useMap} from "@housing_rent/components/maps/context";
import useUser from "@housing_rent/redux/features/user/user";

interface Props {
    open: boolean;
    estate: EstateModel;
    onClose?: () => void;
}

const EstateDetailsDialog = ({open, estate, onClose}: Props) => {
    const [request, {data, error, isLoading: requestLoading}] = useSendRentRequestMutation();
    const [removeRequest, {data: removeRequestData, error: removeRequestError}] = useRemoveRentRequestMutation();
    const {user} = useUser();
    const {data: requestsResponse, refetch} = useRequestsQuery();

    const [mapContext] = useMap({});

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
        handleSendRequest();
    }, [handleSendRequest]);

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

    useEffect(() => {
        if (!estate) return;
        const marker = mapContext.addMarker({icon: 'house_icon', latlng: [estate.longitude, estate.latitude]});
        mapContext.setCenter({latitude: estate.latitude, longitude: estate.longitude});
        return () => {
            marker?.remove?.();
        }
    }, [estate]);

    return <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        closeIcon={<CloseCircle/>}
        okText={user ? (!!reqId ? "لغو درخواست" : "درخواست اجاره ملک") : "برای درخواست اجاره وارد سایت شوید"}
        cancelText="بستن"
        cancelButtonProps={{
            disabled: requestLoading,
        }}
        okButtonProps={{
            disabled: requestLoading || !user,
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

                    <div className="relative h-[250px]">
                        <MapContext.Provider value={mapContext}>
                            <Map longitude={estate.longitude} latitude={estate.latitude}/>
                        </MapContext.Provider>
                    </div>

                    <Typography.Link href={`https://neshan.org/maps/@${estate.latitude},${estate.longitude}/search/`}
                                     target="_blank">
                        باز کردن در نقشه نشان
                    </Typography.Link>
                </div>
                :
                <></>
            }
        </div>
    </Modal>;
}

export default EstateDetailsDialog;