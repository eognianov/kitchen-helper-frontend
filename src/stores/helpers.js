import axios from "axios";

export async function getRequest(url, token) {
    try {
        return await axios.get(url, {
            headers: {'Authorization': 'Bearer ' + token}
        })
    } catch (error) {
        console.log(error)
        return null
    }
}

export function constructUrl(page_number, page_size, sort, filters) {
    let pagination = ''
    let filter_expression = ''
    let sort_expression = ''

    if (page_number && page_size) {
        pagination = `?page=${page_number}&page_size=${page_size}`
    }

    let sort_conditions = []
    for (const key in sort) {
        const value = sort[key];
        if (value !== null) {
            sort_conditions.push(`${key}:${value}`)
        }
    }
    if (sort_conditions.length > 0) {
        if (pagination !== '') {
            sort_expression = `&sort=${sort_conditions.join(",")}`
        } else {
            sort_expression = `?sort=${sort_conditions.join(",")}`
        }
    }

    let filter_conditions = []
    for (const key in filters) {
        const value = filters[key];
        if (value !== null) {
            filter_conditions.push(`${key}:${value}`)
        }
    }
    if (filter_conditions.length > 0) {
        if (pagination !== '' && sort_expression !== '' || (pagination !== '' || sort_expression !== '')) {
            filter_expression = `&filters=${filter_conditions.join(",")}`
        } else {
            filter_expression = `?filters=${filter_conditions.join(",")}`
        }
    }
    return `/recipes/${pagination}${sort_expression}${filter_expression}`
}