import {useAcceptEstateMutation, useNotConfirmedEstatesQuery} from "@housing_rent/redux/requests/admin";
import EstateGrid from "@housing_rent/components/estates/grid";
import Loading from "@housing_rent/components/loading/loading";
import {App, Empty} from "antd";
import {EstateListContext, useEstateList} from "@housing_rent/components/estates/context";
import {useEffect} from "react";
import {IsResponse} from "@housing_rent/utils/types_check";

const ManageEstates = () => {
    const {data: estates, isFetching} = useNotConfirmedEstatesQuery();
    const [accept, {data, error}] = useAcceptEstateMutation();
    const [estateContext] = useEstateList();

    const {message, modal} = App.useApp();

    useEffect(() => {
        estateContext.setButtonTitle('تایید کردن ملک');
    }, [estateContext]);

    useEffect(() => {
        const estate = estateContext.selected
        if (!estate) return;
        modal.confirm({
            title: 'تایید ملک',
            content: 'آیا از تایید این ملک اطمینان دارید ؟',
            okText: 'بله',
            cancelText: 'خیر',
            onOk: () => {
                accept(estate.id);
            }
        });
    }, [estateContext.selected]);

    useEffect(() => {
        if (!data) {
            return;
        }
        message.success(data.detail).then();
    }, [data]);

    useEffect(() => {
        if (!error) return;
        let msg = "";
        if ('data' in error) {
            if (IsResponse(error.data)) {
                msg = error.data.detail;
            }
        }
        message.error(msg).then();
    }, [error]);


    return <div>
        {estates ?
            <Loading loading={isFetching}>
                <EstateListContext.Provider value={estateContext}>
                    <EstateGrid estates={estates}/> :
                </EstateListContext.Provider>
            </Loading> :
            <Empty/>
        }
    </div>;
}

export default ManageEstates;