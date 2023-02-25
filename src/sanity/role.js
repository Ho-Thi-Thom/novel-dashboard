export const GET_ALL_ROLE = `
*[_type == 'role' && level >= $level] | order(level asc){
    _id,
    name,
    key,
    level,
    listPermission[] ->{
        _id
    },
    parent->{
        _id
    }
}
`;
