const BASE_URL = import.meta.env.VITE_BASE_URL;

export function createPictureUrl(pictureUrl) {
	if (pictureUrl === null) {
		return 'https://res.cloudinary.com/dipxtlowj/image/upload/084892ec-9a02-4335-941a-d8a2795358ce.jpeg'
	} else if (pictureUrl.startsWith('/api/')){
		return `${BASE_URL}${pictureUrl.replaceAll('/api', '')}`
	} else {
		return pictureUrl
	}
}