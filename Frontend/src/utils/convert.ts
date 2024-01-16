export const convertPrice = (price: number) => {
    return price.toLocaleString('fa') + ' تومان';
}

export const coverPhotoFromEstate = (estate: EstateModel) => {
    if (!estate.files) return "";
    return import.meta.env.VITE_PREFIX_MEDIA + estate.files[0].photo_url;
}

export const getFullname = (user: UserModel) => {
    return `${user.first_name} ${user.last_name}`;
}

export default {convertPrice, coverPhotoFromEstate, getFullname};