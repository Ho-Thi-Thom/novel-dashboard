export const GET_ALL_PERMISSION = `
*[_type == 'permission']{
    _id,
    name,
}
`;

export const GET_PERMISSION_OF_ROLE = `
*[_type == 'role' && _id match $id][0]{
    listPermission[]->{
        _id
    }
}
`;
