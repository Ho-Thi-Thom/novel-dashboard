export const GET_ALL_NOVEL = `
    *[_type == 'story'] | order(dateTime(_createdAt) asc) {
        "id":_id ,
        title,
        "imageUrl" :image.asset ->url,
       "createdAt": _createdAt,
       "updatedAt":_updatedAt
    }
`;
export const GET_DETAIL_NOVEL = `
*[_type == 'story' && _id match $IdNovel][0] {
    'id':_id,
    title,
    content,
    "imageUrl" :image.asset ->url,
    vocabularies[]->{
        _id,
        en,
        vi
    }
}
`;
