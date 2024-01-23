import {useContractInstallmentsQuery, useContractsQuery} from "@housing_rent/redux/requests/owner";
import Loading from "@housing_rent/components/loading/loading";
import {App, Button, Descriptions, List} from "antd";
import {convertPrice} from "@housing_rent/utils/convert";
import moment from "jalali-moment";


const STATUS_NAMES: {[key: string]: string} = {
    "paid": "پرداخت شده",
    "awaiting": "در انتظار پرداخت",
    "soon": "پرداخت شده"
}

interface ContractInstallmentProps {
    items: EstateContractInstallments[];
}

const ContractInstallment = ({items}: ContractInstallmentProps) => {
    return <div>
        {items.map(item => (
            <Descriptions items={[
                {
                    label: 'مبلغ',
                    children: item.price
                },
                {
                    label: 'وضعیت',
                    children: STATUS_NAMES[item.status]
                }]
            }/>
        ))}
    </div>
}

type ContractItemProps = {
    contract: EstateContract;
}

const ContractItem = ({contract}: ContractItemProps) => {
    const {modal} = App.useApp();
    const {data, isFetching} = useContractInstallmentsQuery();

    const handleClick = () => {
        modal.info({content: <div dangerouslySetInnerHTML={{__html: contract.text}}></div>});
    }

    const handleShowInstallments = () => {
        if (!data) return;
        modal.info({content: <ContractInstallment items={data?.filter(x => x.contract == contract.id )}/>})
    };

    if (!contract) return <></>;

    return <List.Item>
        <div className="flex flex-col">
            <Descriptions items={[
                {
                    label: 'آدرس ملک',
                    children: contract?.estate?.address,
                },
                {
                    label: 'تاریخ شروع قرارداد',
                    children: moment(contract.start_time).locale('fa').calendar(),
                },
                {
                    label: 'تاریخ پایان قرارداد',
                    children: moment(contract.end_time).locale('fa').calendar()
                },
                {
                    label: 'قیمت قرارداد',
                    children: convertPrice(contract.price)
                },
            ]}/>
            <div className="flex flex-row gap-2">
                <Button onClick={handleClick}>نمایش متن قرارداد</Button>
                <Button onClick={handleShowInstallments}>نمایش لیست صورت حساب های این قرارداد</Button>
            </div>
        </div>
    </List.Item>
}

const EstateContract = () => {
    const {data, isFetching} = useContractsQuery();


    if (!data) return <></>;

    return <Loading loading={isFetching}>
        <List dataSource={data} renderItem={(item) => <ContractItem contract={item}/>}/>
    </Loading>;
}

export default EstateContract;