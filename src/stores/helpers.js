import axios from "axios";

export async function getRecipes(url, token) {
    try {
        return await axios.get(url, {
            headers: {'Authorization': 'Bearer ' + token}
        })
    } catch (error) {
        console.log(error)
        return null
    }
}