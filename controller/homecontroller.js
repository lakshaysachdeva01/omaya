const { API_BASE_URL } = require('../config/config');
const { getWebsiteID, fetchData } = require('../utils/helper');

exports.getHomeDesktopBanner = async(req, res) => {  
    const websiteID = await getWebsiteID(); 
     const data = await fetchData(`${API_BASE_URL}/website/banner/get-all-banners/${websiteID}?type=HOME_BANNER`);
     return data || null
     
};

exports.getAdBanner = async(req, res) => {  
    try {
        const websiteID = await getWebsiteID(); 
        const data = await fetchData(`${API_BASE_URL}/website/banner/get-all-banners/${websiteID}?type=AD_BANNER`);
        return data || null;
    } catch (error) {
        console.error('Error fetching ad banner:', error.message);
        return null; // Return null on error instead of crashing
    }
};

exports.getHomepopupBanner = async () => {
    try {
        const websiteID = await getWebsiteID();
        const data = await fetchData(`${API_BASE_URL}/website/banner/get-all-banners/${websiteID}?type=POPUP_BANNER`);

        if (data && Array.isArray(data) && data.length > 0) {
            return data; // Return banners
        } else {
            return []; // Return empty array if no banners
        }
    } catch (error) {
        
        return []; // Return empty array on error
    }
};



exports.gettestimonial = async(req, res) => {  
    const websiteID = await getWebsiteID(); 
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/testimonials/get-all`);
    
    console.log('Testimonial API response:', apiResponse);
    
    // Handle the API response structure: { message: "...", data: [...] }
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);

    return items;
};


exports.getclientle = async(req, res) => {  
    const websiteID = await getWebsiteID(); 
     const data = await fetchData(`${API_BASE_URL}/website/association/get-all-associations/${websiteID}?type=CLIENT`);
     return data || null
};



