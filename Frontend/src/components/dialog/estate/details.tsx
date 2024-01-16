import {App, Descriptions, Modal} from "antd";
import Convert from "@housing_rent/utils/convert";
import {CloseCircle} from "iconsax-react";
import convert from "@housing_rent/utils/convert";
import {useSendRentRequestMutation} from "@housing_rent/redux/requests/tenant";
import {useCallback, useEffect} from "react";
import {IsResponse} from "@housing_rent/utils/types_check";

interface Props {
    open: boolean;
    estate: EstateModel;
    onClose?: () => void;
}

const EstateDetailsDialog = ({open, estate, onClose}: Props) => {
    const [request, {data, error, isLoading: requestLoading}] = useSendRentRequestMutation();
    const {message} = App.useApp();

    const handleClose = () => {
        if (requestLoading) return;
        onClose?.();
    }

    const handleSendRequest = useCallback(() => {
        if (!estate) return;
        request(estate.id);
    }, [estate]);

    const handleOk = useCallback(() => {
        handleSendRequest();
    }, [handleSendRequest]);

    // handle change data
    useEffect(() => {
        if (!data?.detail) return;
        message.success(data.detail).then();
    }, [data]);

    useEffect(() => {
        if (!error) return;
        if ('data' in error) {
            if (IsResponse(error.data)) {
                message.success(error.data.detail).then();
            }
        }
    }, [error]);

    return <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleClose}
        closeIcon={<CloseCircle/>}
        okText="درخواست اجاره ملک"
        cancelText="بستن"
        cancelButtonProps={{
            disabled: requestLoading
        }}
        okButtonProps={{
            disabled: requestLoading
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