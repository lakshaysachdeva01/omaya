const { API_BASE_URL } = require('../config/config');
const { getWebsiteID, fetchData } = require('../utils/helper');

exports.getBlog = async(req, res) => {  
    const websiteID = await getWebsiteID(); 
   
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/posts/get-all`);
    
    // Handle the API response structure: { message: "...", data: [...] }
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);
    
    if (items && items.length > 0) {
        // Add formatted postDate to each blog item
        items.forEach(blog => {
            if (blog.createdAt) {
                blog.postDate = new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });
            } else {
                blog.postDate = "Date unavailable";
            }
        });
    }
    return items || null
};


exports.getBlogfull = async(slug) => {  
    const websiteID = await getWebsiteID(); 
    
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/posts/get-all`);
    
    // Handle the API response structure: { message: "...", data: [...] }
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);
    
    // Find the blog by slug (check seoConfigs.slug, seoconfigs.slug, or seoDetails.slug for compatibility)
    const blog = items.find(item => {
        const itemSlug = item.seoConfigs?.slug || item.seoconfigs?.slug || item.seoDetails?.slug || '';
        return itemSlug === slug;
    });

    if (blog && blog.createdAt) {
        // Format the createdAt date as postDate
        blog.postDate = new Date(blog.createdAt).toLocaleDateString('en-GB', { 
            day: '2-digit', 
            month: 'short', 
            year: 'numeric' 
        });
    } else if (blog) {
        blog.postDate = "Date unavailable";
    }
    
    return blog || null;
};



exports.getlatestblogs = async (slug) => {  
    const websiteID = await getWebsiteID();
    
    const apiResponse = await fetchData(`${API_BASE_URL}/website/${websiteID}/posts/get-all`);
    
    // Handle the API response structure: { message: "...", data: [...] }
    const items = Array.isArray(apiResponse?.data)
        ? apiResponse.data
        : (Array.isArray(apiResponse) ? apiResponse : []);

    if (!items || items.length === 0) {
        return []; // Return an empty array if no data is found
    }

    // Filter blogs and exclude the one matching the provided slug
    // Check seoConfigs.slug, seoconfigs.slug, and seoDetails.slug for compatibility
    const filteredBlogs = items.filter(blog => {
        const blogSlug = blog.seoConfigs?.slug || blog.seoconfigs?.slug || blog.seoDetails?.slug || '';
        return blogSlug !== slug;
    });

    // Add formatted postDate to each blog item
    filteredBlogs.forEach(blog => {
        if (blog.createdAt) {
            try {
                blog.postDate = new Date(blog.createdAt).toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                });
            } catch (error) {
                console.error(`Error formatting date for blog with ID ${blog._id}:`, error);
                blog.postDate = "Invalid date format";
            }
        } else {
            blog.postDate = "Date unavailable";
        }
    });

    return filteredBlogs;
};
