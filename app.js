require('dotenv').config();  // Load environment variables from .env file
const { API_BASE_URL , WEBSITE_ID_KEY, S3_BASE_URL} = require('./config/config');
const { getWebsiteID } = require('./utils/helper');
const { getHomeDesktopBanner ,gettestimonial ,getAdBanner,getHomepopupBanner ,getclientle  } = require('./controller/homecontroller');
const { getBlog ,getBlogfull, getlatestblogs} = require('./controller/blogcontroller');
const { getgallery,getLatestGalleryImages} = require('./controller/gallerycontroller');
const { getProducts, getProductDetails, getProductsByCategory, getCategories ,getjobs,getjobdetails,getotherjobs} = require('./controller/productcontroller');
const { CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS ,JOB_ENQUIRY_DYNAMIC_FIELDS_KEYS , BOOKING_ENQUIRY_DYNAMIC_FIELDS_KEYS} = require('./config/config');

const express = require('express');
const path = require('path');
const app = express();
const port = 8000;
const metaLogoPath = "/assets/img/logos/meta.png";
// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Define the views directory

// Serve static files (like CSS, images) from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to fetch categories and make them available to all routes
app.use(async (req, res, next) => {
    try {
        const categories = await getCategories();
        console.log('🔧 Middleware - Categories loaded:', categories ? categories.length : 0);
        res.locals.categories = categories;
        next();
    } catch (error) {
        console.error('❌ Middleware - Error fetching categories:', error);
        res.locals.categories = [];
        next();
    }
});

app.get('/', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    // const websiteID = await getWebsiteID(); 
    // const banners = await getHomeDesktopBanner();
    const testimonial = await gettestimonial();
    const blogs = await getBlog();
//     const gallery= await getgallery();
//     const products = await getProducts();
//     const clients = await getclientle();
//     const popupbanners = await getHomepopupBanner();
//    const latestImages = await getLatestGalleryImages();
   const seoDetails = {
    title: " ",
    metaDescription: "",
    metaImage: `${baseUrl}/${metaLogoPath}`,
    keywords: "",
    canonical: `${baseUrl}`,
};

   
    res.render('index', {body: "",testimonial,blogs,seoDetails, S3_BASE_URL});
});
// baseUrl,latestImages, products, websiteID,popupbanners,blogs,gallery,clients, API_BASE_URL,WEBSITE_ID_KEY, S3_BASE_URL,,banners 

app.get('/about', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/about`,
    };
    
   
    res.render('about', {body: "",baseUrl, seoDetails});
});



app.get('/gallery', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const gallery = await getgallery();
    
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/gallery`,
    };

    res.render('gallery', { body: "", gallery, seoDetails, S3_BASE_URL });
});
app.get('/gallery/:filter', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { filter } = req.params;
    const gallery = await getgallery();

    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/gallery/${filter}`,
    };

    res.render('gallery', { body: "", gallery, seoDetails, S3_BASE_URL });
});




app.get('/stay', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "Stay - Maniram Steel",
        metaDescription: "Experience luxury accommodation at our resort.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "stay, accommodation, resort, hotel",
        canonical: `${baseUrl}/stay`,
    };
    res.render('stay', { body: "", seoDetails });
});

app.get('/dining', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "Dining - Maniram Steel",
        metaDescription: "Discover our exquisite dining experiences and culinary offerings.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "dining, restaurant, food, cuisine",
        canonical: `${baseUrl}/dining`,
    };
    res.render('dining', { body: "", seoDetails });
});

app.get('/venue', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "Venue - Maniram Steel",
        metaDescription: "Host your events at our premium venue spaces.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "venue, events, conference, meeting",
        canonical: `${baseUrl}/venue`,
    };
    res.render('venue', { body: "", seoDetails });
});

app.get('/contact', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const websiteID = await getWebsiteID(); 
    
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/contact`,
    };

    res.render('contact', { body: "", websiteID, API_BASE_URL, WEBSITE_ID_KEY, CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS, seoDetails });
});



// app.get('/career', async (req, res) => {
//     const baseUrl = req.protocol + '://' + req.get('Host');
//     const websiteID = await getWebsiteID();
    
//     const seoDetails = {
//         title: "",
//         metaDescription: "",
//         metaImage: `${baseUrl}/${metaLogoPath}`,
//         keywords: "",
//         canonical: `${baseUrl}/career`,
//     };

//     res.render('career', { body: "", seoDetails, websiteID, API_BASE_URL, WEBSITE_ID_KEY, CAREER_ENQUIRY_DYNAMIC_FIELDS_KEYS });
// });


app.get('/posts', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
  
    const blogs = await getBlog();
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/blogs`,
    };

    res.render('blogs', { body: "", blogs, baseUrl, seoDetails });
});


app.get('/jobs', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const jobs = await getjobs();
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: `${baseUrl}/jobs`,
    };
    
    res.render('jobs', { body: "", baseUrl, seoDetails, jobs });
});


app.get('/job/:slug', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { slug } = req.params;
    const websiteID = await getWebsiteID();
    const job = await getjobdetails(slug);
    // const otherJobs = await getotherjobs(slug);
    const seoDetails = {
        title: job?.seoDetails?.title ,
        metaDescription: job?.seoDetails?.metaDescription || job?.description?.replace(/<[^>]*>/g, '').substring(0, 160) || "View job details and apply for this position at Maniram Steel.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: job?.seoDetails?.tags?.join(', ') || "job, career, employment",
        canonical: `${baseUrl}/job/${slug}`,
    };
    
    res.render('jobdetail', {
        body: "", 
        baseUrl, 
        seoDetails, 
        job,
        websiteID,
        API_BASE_URL,
        WEBSITE_ID_KEY,
        S3_BASE_URL,
        JOB_ENQUIRY_DYNAMIC_FIELDS_KEYS
    });
});





// app.get('/products', async (req, res) => {
//     try {
//         const baseUrl = req.protocol + '://' + req.get('Host');
//         const categories = res.locals.categories || [];
        
//         // Always load ALL products - JavaScript will handle filtering
//         const products = await getProducts();
        
//         const seoDetails = {
//             title: "Our Products ",
//             metaDescription: "",
//             metaImage: `${baseUrl}/${metaLogoPath}`,
//             keywords: "",
//             canonical: `${baseUrl}/products`,
//         };

//         res.render('Products', { 
//             body: "", 
//             products, 
//             baseUrl, 
//             seoDetails, 
//             S3_BASE_URL, 
//             categoryName: null,
//             categories,
//             selectedCategoryId: null
//         });
//     } catch (error) {
//         console.error('Error loading products page:', error);
//         const baseUrl = req.protocol + '://' + req.get('Host');
//         const seoDetails = {
//             title: "Our Products - Passary Refractories",
//             metaDescription: "Explore our range of high-quality refractory products and solutions",
//             metaImage: `${baseUrl}/${metaLogoPath}`,
//             keywords: "refractory products, industrial materials, passary products",
//             canonical: `${baseUrl}/products`,
//         };
        
//         // Render page with empty products array
//         res.render('Products', { 
//             body: "", 
//             products: [], 
//             baseUrl, 
//             seoDetails, 
//             S3_BASE_URL, 
//             categoryName: null,
//             categories: res.locals.categories || [],
//             selectedCategoryId: null
//         });
//     }
// });


app.get('/thankyou', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical: "",
    } 
    res.render('thankyou', {body: "",seoDetails});
});




app.get('/blog/:slug', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { slug } = req.params; // Extract slug from params
    const blogDetails = await getBlogfull(slug);
    const testimonial = await gettestimonial();
    const websiteID = await getWebsiteID(); 
   
    const adbanner = await getAdBanner();
    const blogs = await getBlog();
    const latestblog = await getlatestblogs(slug);
    // Extract the first 50 words from the description
    const truncateToWords = (text, wordCount) => {
        if (!text || typeof text !== 'string') return '';
        return text.split(' ').slice(0, wordCount).join(' ') + '...';
    };
    // Handle description as array or string
    let descriptionText = '';
    if (Array.isArray(blogDetails?.description) && blogDetails.description.length > 0) {
        // Get first description and strip HTML
        descriptionText = (blogDetails.description[0].description || '').replace(/<[^>]*>/g, '').trim();
    } else if (typeof blogDetails?.description === 'string') {
        descriptionText = blogDetails.description.replace(/<[^>]*>/g, '').trim();
    }
    const truncatedDescription = truncateToWords(descriptionText, 25);

    // Set the meta image dynamically
   
  
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "",
        canonical:``,
    };

    res.render('blogpost', {
        body: "",
       baseUrl,
       blogDetails,
        seoDetails,
        adbanner,
        latestblog,
        blogs,
       testimonial,websiteID,API_BASE_URL,WEBSITE_ID_KEY, S3_BASE_URL, BOOKING_ENQUIRY_DYNAMIC_FIELDS_KEYS
    });
});


// app.get('/product/:slug', async (req, res) => {
//     const baseUrl = req.protocol + '://' + req.get('Host');
//     const { slug } = req.params;
//     const productDetails = await getProductDetails(slug);
//     const websiteID = await getWebsiteID();
    
//     if (!productDetails) {
//         return res.redirect('/products');
//     }

//     const seoDetails = {
//         title: productDetails.title || "Product Details",
//         metaDescription: productDetails.description ? productDetails.description.replace(/<[^>]*>/g, '').substring(0, 160) : "",
//         metaImage: `${baseUrl}/${metaLogoPath}`,
//         keywords: productDetails.keywords || "",
//         canonical: `${baseUrl}/product/${slug}`,
//     };

//     res.render('details', {
//         body: "",
//         baseUrl,
//         product: productDetails,
//         seoDetails,
//         S3_BASE_URL,
//         API_BASE_URL,
//         WEBSITE_ID_KEY,
//         websiteID
//     });
// });

app.use(async (req, res, next) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "",
        metaDescription: "",
        metaImage: `${baseUrl}/assets/images/icon/metalogo.png`, // Replace with correct path if needed
        keywords: "",
        canonical: baseUrl + req.originalUrl, // You can use the original URL for canonical
    };
    

    res.status(404).render('404', { seoDetails });
});




app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });