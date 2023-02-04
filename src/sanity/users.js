export const GET_ALL_USER = `
    *[_type == 'user'] | order(dateTime(_createdAt) asc) {
        _id,
        username,
        role ->{
            _id,
            name,
            key
        }
    }
`;
