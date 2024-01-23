interface FileModel {
    id: number;
    name: string;
    file_type: string;
    photo_url: string;
}

interface EstateModel {
    id: number;
    estate_type: string;
    address: string;
    rental_price: number;
    mortgage_price: number;
    size_of_house: number;
    description: string;
    longitude: number;
    latitude: number;
    files: FileModel[]; // You might want to replace 'any[]' with a more specific type for files
    owner: UserModel;
    is_confirm: boolean;
}

interface EstateContract {
    id: number;
    owner: UserModel;
    tenant: UserModel;
    estate: EstateModel;
    text: string;
    price: number;
    start_time: string;
    end_time: string;
    created_at: string;
}

interface EstateContractInstallments {
    'id': number;
    'owner': UserModel;
    'tenant': UserModel;
    'is_paid': boolean;
    'price': number;
    'date': string;
    'status': string;
    contract: EstateContract;
    'created_at': string;
}