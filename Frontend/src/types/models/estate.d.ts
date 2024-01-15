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