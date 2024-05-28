import moment from 'moment';

export const convertUserData = (data) => {
    if (!data.results || !Array.isArray(data.results)) {
        return null;
    }
    return convertUserDataList(data)[0];
}


export const convertUserDataList = (data) => {
    if (!data.results || !Array.isArray(data.results)) {
        return null;
    }

    return data.results.map(i => (
        {
            id: i.login.uuid,
            name: i.name.first + ' ' + i.name.last,
            email: i.email,
            avatar: i.picture.thumbnail,
            registered: moment(i.registered.date).format('HH:mm DD/MM/YY'),
        }
    ))
}
