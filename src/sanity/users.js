export const GET_ALL_USER = `
    *[_type == 'user'] | order(dateTime(_createdAt) asc) {
        "id":_id ,
        username,
        role ->{
            _id,
            name,
            key
        }
    }
`;

export const GET_USER_LOGIN = `
    *[_type == 'user' && _id match $googleId][0] {
        _id,
        username,
        role ->{
            key
        }
    }
`;

export const ROLE = `
*[_type == 'role']{
    _id,
    name,
    key
}
`;
