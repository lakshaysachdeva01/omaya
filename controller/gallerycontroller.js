const { API_BASE_URL } = require('../config/config');
const { getWebsiteID, fetchData } = require('../utils/helper');


exports.getgallery = async (req, res) => {  
    const websiteID = await getWebsiteID(); 
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/gallery/get-all`);
    
    
    // Handle the API response structure: { message: "...", data: [...] }
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);

    return items.reverse();
};
// Trim spaces for safety
exports.getgalleryalbum = async (title) => {  
    const searchTitle = title.trim().toLowerCase();
    
    const websiteID = await getWebsiteID(); 
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/gallery/get-all`);
    
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);
    
    // Trim and lowercase comparison
    const filteredAlbums = items.filter(album => 
        album.title.trim().toLowerCase() === searchTitle
    );

    return filteredAlbums.length > 0 ? filteredAlbums.reverse() : []; // Added .reverse() for consistency
};

exports.getLatestGalleryImages = async () => {
    try {
        const websiteID = await getWebsiteID();
        const response = await fetch(`${API_BASE_URL}/website/${websiteID}/gallery/get-all`);

        if (!response.ok) {
            console.error(`API request failed with status ${response.status}`);
            return [];
        }

        const data = await response.json();

        if (!data || !Array.isArray(data.data)) {
            console.error("Invalid API response structure", data);
            return [];
        }

        const latestImages = data.data.flatMap(album => {
            if (
                album.images &&
                Array.isArray(album.images) &&
                album.images.length > 0
            ) {
                return album.images.map(image => ({
                    url: image,
                    title: album.title
                }));
            }
            return [];
        });

        return latestImages.slice(-4).reverse(); // Get the latest 5 images
    } catch (error) {
        console.error("Error fetching latest gallery images:", error);
        return [];
    }
};
