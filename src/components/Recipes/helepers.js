import axios from "axios";

export async function getUserById(id, token) {
    try {
        const response = await axios.get(`/users/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.status === 200) {
            return response.data
        } else {
            return {'username': `Anonymous`}
        }
    } catch (e) {
        return {'username': `${id}`}
    }
}

export async function getImageById(id, token) {
    try {
        const response = await axios.get(`/images/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        if (response.status === 200) {
            if (response.data.in_cloudinary === false) {
                const url = response.data.url.replaceAll("\\", '/')
                return `http://127.0.0.1:8000/${url}`
            } else {
                return null
            }

        }
    } catch (e) {
        return null
    }
}

export async function getRecipes(current_utl, token) {
	try {
		let response = await axios.get(current_utl, {
			headers: {'Authorization': 'Bearer ' + token}
		})
		if (response.status === 200) {
			return response.data.recipes
		}
	} catch (error) {
		console.log(error)
        return null
	}
}