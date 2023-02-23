export const GET_ALL_USER = `
    *[_type == 'role' && $level <= level] {
        _id,
        name,
        level,
        "users": *[_type == 'user' && role._ref == ^._id] | order(dateTime(_createdAt) asc) {
            "id":_id ,
            username,
            role ->{
                _id,
                name,
                key
            },
            active
        }
    }
`;

export const GET_USER_BY_ID = `
*[_type == 'user' && _id match $Id][0] {
    _id,
    username,
    role ->{
        _id,
        key,
        name,
    },
    active
}
`;

export const GET_USER_LOGIN = `
    *[_type == 'user' && _id match $googleId][0] {
        _id,
        username,
        role ->{
            key,
            name,
            level,
            listPermission[] ->{
                key,
            }
        },
        image,
        active,
    }
`;

export const GET_ALL_ROLE = `
*[_type == 'role']{
    _id,
    name,
    key
}
`;
