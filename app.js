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
const fs = require('fs');
const app = express();
const port = 3000;
const metaLogoPath = "/assets/images/Omaya_MetaImage.jpg";
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
        res.locals.categories = categories;
        next();
    } catch (error) {
        
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
    title: "Omaya Suites Raipur - Luxury Hotel & Resort | Premium Accommodation in Raipur",
    metaDescription: "Experience luxury at Omaya Suites Raipur. Premium hotel accommodation with elegant rooms, fine dining restaurants, rooftop bar, and world-class event venues. Book your stay in Raipur, Chhattisgarh.",
    metaImage: `${baseUrl}/${metaLogoPath}`,
    keywords: "Omaya Suites, luxury hotel Raipur, premium accommodation Raipur, hotel in Raipur Chhattisgarh, luxury resort Raipur, fine dining Raipur, event venue Raipur, rooftop bar Raipur, wedding venue Raipur, corporate events Raipur",
    canonical: `${baseUrl}`,
};

   
    res.render('index', {body: "",testimonial,blogs,seoDetails, S3_BASE_URL});
});
// baseUrl,latestImages, products, websiteID,popupbanners,blogs,gallery,clients, API_BASE_URL,WEBSITE_ID_KEY, S3_BASE_URL,,banners 

app.get('/about', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const seoDetails = {
        title: "About Us - Omaya Suites Raipur | Our Story & Hospitality Excellence",
        metaDescription: "Discover Omaya Suites Raipur - a luxury hotel committed to exceptional hospitality. Learn about our premium accommodations, fine dining experiences, and world-class event venues in Raipur, Chhattisgarh.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "Omaya Suites about, luxury hotel Raipur, hospitality Raipur, premium hotel services, hotel amenities Raipur, luxury accommodation Chhattisgarh",
        canonical: `${baseUrl}/about`,
    };
    
   
    res.render('about', {body: "",baseUrl, seoDetails});
});



app.get('/gallery', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const gallery = await getgallery();
    
    const seoDetails = {
        title: "Photo Gallery - Omaya Suites Raipur | Luxury Hotel Images & Virtual Tours",
        metaDescription: "Explore our photo gallery showcasing luxury rooms, elegant dining spaces, rooftop bar, event venues, and premium amenities at Omaya Suites Raipur. View 360° virtual tours of our facilities.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "Omaya Suites gallery, hotel photos Raipur, luxury hotel images, room gallery, dining photos, event venue pictures, 360 view Raipur hotel",
        canonical: `${baseUrl}/gallery`,
    };

    res.render('gallery', { body: "", gallery, seoDetails, S3_BASE_URL });
});
app.get('/gallery/:filter', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { filter } = req.params;
    const gallery = await getgallery();

    const filterName = filter.charAt(0).toUpperCase() + filter.slice(1).replace(/-/g, ' ');
    const seoDetails = {
        title: `${filterName} Gallery - Omaya Suites Raipur | ${filterName} Photos & Images`,
        metaDescription: `Browse ${filterName} gallery at Omaya Suites Raipur. View high-quality images of our ${filterName} facilities, rooms, and amenities. Experience luxury hospitality through our photo collection.`,
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: `${filterName} gallery Omaya Suites, ${filterName} photos Raipur, ${filterName} images, hotel ${filterName} pictures`,
        canonical: `${baseUrl}/gallery/${filter}`,
    };

    res.render('gallery', { body: "", gallery, seoDetails, S3_BASE_URL });
});




app.get('/stay', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    
    // Read stays data from JSON file
    let stays = [];
    try {
        const staysDataPath = path.join(__dirname, 'data', 'stays.json');
        const staysData = fs.readFileSync(staysDataPath, 'utf8');
        stays = JSON.parse(staysData);
    } catch (error) {
        console.error('Error reading stays.json:', error);
    }
    
    const seoDetails = {
        title: "Luxury Rooms & Suites - Omaya Suites Raipur | Premium Hotel Accommodation",
        metaDescription: "Discover luxury accommodation at Omaya Suites Raipur. Choose from Royal Suites, Executive Suites, Deluxe Suites with premium amenities, private pools, and elegant interiors. Book your stay in Raipur, Chhattisgarh.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "luxury rooms Raipur, premium suites Raipur, hotel accommodation Raipur, Royal Suite Raipur, Executive Suite, Deluxe Suite, luxury stay Raipur, hotel rooms Chhattisgarh, premium accommodation",
        canonical: `${baseUrl}/stay`,
    };
    res.render('stay', { body: "", seoDetails, stays });
});

app.get('/stay/:slug', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { slug } = req.params;
    
    // Read stays data from JSON file
    let stays = [];
    let stayItem = null;
    try {
        const staysDataPath = path.join(__dirname, 'data', 'stays.json');
        const staysData = fs.readFileSync(staysDataPath, 'utf8');
        stays = JSON.parse(staysData);
        stayItem = stays.find(s => s.slug === slug);
    } catch (error) {
        console.error('Error reading stays.json:', error);
    }
    
    // If stay item not found, redirect to stays listing
    if (!stayItem) {
        return res.redirect('/stay');
    }
    
    const description = stayItem.listDescription || stayItem.description || stayItem.detailDescription || '';
    const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 160);
    const features = stayItem.features ? stayItem.features.join(', ') : '';
    const seoDetails = {
        title: `${stayItem.title} - Omaya Suites Raipur | ${stayItem.tagline} | Luxury Accommodation`,
        metaDescription: cleanDescription || `Experience luxury in ${stayItem.title} at Omaya Suites Raipur. ${stayItem.tagline} with premium amenities, elegant interiors, and world-class hospitality. Book your stay now.`,
        metaImage: `${baseUrl}${stayItem.bannerImage || stayItem.image}`,
        keywords: `${stayItem.title} Raipur, ${stayItem.tagline} Omaya Suites, luxury ${stayItem.title.toLowerCase()}, premium hotel room Raipur, ${stayItem.title} booking, hotel suite Raipur, ${features}`,
        canonical: `${baseUrl}/stay/${slug}`,
    };
    
    const websiteID = await getWebsiteID();
    
    res.render('detailspage', { body: "", seoDetails, stay: stayItem, stays, websiteID, API_BASE_URL });
});

app.get('/dining', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    
    // Read dining data from JSON file
    let dining = [];
    try {
        const diningDataPath = path.join(__dirname, 'data', 'dining.json');
        const diningData = fs.readFileSync(diningDataPath, 'utf8');
        dining = JSON.parse(diningData);
    } catch (error) {
        console.error('Error reading dining.json:', error);
    }
    
    const seoDetails = {
        title: "Fine Dining Restaurants - Omaya Suites Raipur | Rooftop Bar & Multi-Cuisine",
        metaDescription: "Experience exquisite dining at Omaya Suites Raipur. Enjoy private dining rooms, rooftop bar with sunset views, multi-cuisine restaurants, and poolside dining. Book your table in Raipur.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "fine dining Raipur, rooftop bar Raipur, restaurant Raipur, private dining room Raipur, OMA Air Bar, Oma Kitchen, pool bar Raipur, multi-cuisine restaurant, best restaurant Raipur",
        canonical: `${baseUrl}/dining`,
    };
    res.render('dining', { body: "", seoDetails, dining });
});

app.get('/dining/:slug', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { slug } = req.params;
    
    // Read dining data from JSON file
    let dining = [];
    let diningItem = null;
    try {
        const diningDataPath = path.join(__dirname, 'data', 'dining.json');
        const diningData = fs.readFileSync(diningDataPath, 'utf8');
        dining = JSON.parse(diningData);
        diningItem = dining.find(d => d.slug === slug);
    } catch (error) {
        console.error('Error reading dining.json:', error);
    }
    
    // If dining item not found, redirect to dining listing
    if (!diningItem) {
        return res.redirect('/dining');
    }
    
    const description = diningItem.listDescription || diningItem.description || diningItem.detailDescription || '';
    const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 160);
    const cuisine = diningItem.diningDetails?.cuisine || '';
    const seoDetails = {
        title: `${diningItem.title} - Omaya Suites Raipur | ${diningItem.tagline} | Fine Dining Restaurant`,
        metaDescription: cleanDescription || `Experience ${diningItem.title} at Omaya Suites Raipur. ${diningItem.tagline} offering ${cuisine} cuisine with elegant ambience and exceptional service. Reserve your table now.`,
        metaImage: `${baseUrl}${diningItem.bannerImage || diningItem.image}`,
        keywords: `${diningItem.title} Raipur, ${diningItem.tagline} Omaya Suites, ${diningItem.title} restaurant, ${cuisine} restaurant Raipur, fine dining ${diningItem.title.toLowerCase()}, restaurant booking Raipur, ${diningItem.title} menu`,
        canonical: `${baseUrl}/dining/${slug}`,
    };
    
    res.render('detailspage', { body: "", seoDetails, dining: diningItem, diningList: dining });
});

app.get('/venue', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    
    // Read venue data from JSON file
    let venues = [];
    try {
        const venueDataPath = path.join(__dirname, 'data', 'venue.json');
        const venueData = fs.readFileSync(venueDataPath, 'utf8');
        venues = JSON.parse(venueData);
    } catch (error) {
        console.error('Error reading venue.json:', error);
    }
    
    const seoDetails = {
        title: "Event Venues & Banquet Halls - Omaya Suites Raipur | Wedding & Corporate Events",
        metaDescription: "Host your events at Omaya Suites Raipur. Premium banquet halls, wedding venues, conference rooms, and event spaces with modern amenities. Perfect for weddings, corporate events, and celebrations in Raipur.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "event venue Raipur, banquet hall Raipur, wedding venue Raipur, conference hall Raipur, corporate events Raipur, party hall Raipur, meeting room Raipur, event space Chhattisgarh",
        canonical: `${baseUrl}/venue`,
    };
    res.render('venue', { body: "", seoDetails, venues });
});

app.get('/venue/:slug', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const { slug } = req.params;
    
    // Read venue data from JSON file
    let venues = [];
    let venue = null;
    try {
        const venueDataPath = path.join(__dirname, 'data', 'venue.json');
        const venueData = fs.readFileSync(venueDataPath, 'utf8');
        venues = JSON.parse(venueData);
        venue = venues.find(v => v.slug === slug);
    } catch (error) {
        console.error('Error reading venue.json:', error);
    }
    
    // If venue not found, redirect to venue listing
    if (!venue) {
        return res.redirect('/venue');
    }
    
    const websiteID = await getWebsiteID();
    
    const description = venue.listDescription || venue.description || venue.detailDescription || '';
    const cleanDescription = description.replace(/<[^>]*>/g, '').substring(0, 160);
    const capacity = venue.venueDetails?.capacity || '';
    const size = venue.venueDetails?.size || '';
    const seoDetails = {
        title: `${venue.title} - Omaya Suites Raipur | ${venue.tagline} | Event Venue Booking`,
        metaDescription: cleanDescription || `Book ${venue.title} at Omaya Suites Raipur for your events. ${venue.tagline} with ${capacity} capacity, ${size} space, and premium amenities. Perfect for weddings, corporate events, and celebrations.`,
        metaImage: `${baseUrl}${venue.bannerImage || venue.image}`,
        keywords: `${venue.title} Raipur, ${venue.tagline} Omaya Suites, ${venue.title} booking, event venue ${venue.title.toLowerCase()}, ${capacity} capacity venue, ${venue.title} price, wedding hall Raipur, corporate venue Raipur`,
        canonical: `${baseUrl}/venue/${slug}`,
    };
    
    res.render('detailspage', { body: "", seoDetails, venue, venues, websiteID, API_BASE_URL });
});

app.get('/contact', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const websiteID = await getWebsiteID(); 
    
    const seoDetails = {
        title: "Contact Us - Omaya Suites Raipur | Hotel Booking & Enquiry",
        metaDescription: "Get in touch with Omaya Suites Raipur. Contact us for room bookings, restaurant reservations, event venue enquiries, and corporate bookings. Located in Dumartarai, Raipur, Chhattisgarh.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "Omaya Suites contact, hotel booking Raipur, contact Omaya Suites, hotel enquiry Raipur, restaurant reservation, event booking Raipur, hotel phone number Raipur, Omaya Suites address",
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
        title: "Blog & News - Omaya Suites Raipur | Hotel Updates & Travel Tips",
        metaDescription: "Read the latest blog posts and news from Omaya Suites Raipur. Discover travel tips, hotel updates, dining experiences, event highlights, and hospitality insights.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "Omaya Suites blog, hotel news Raipur, travel blog Raipur, hospitality blog, hotel updates, dining blog, event blog Raipur",
        canonical: `${baseUrl}/posts`,
    };

    res.render('blogs', { body: "", blogs, baseUrl, seoDetails, S3_BASE_URL });
});


app.get('/jobs', async (req, res) => {
    const baseUrl = req.protocol + '://' + req.get('Host');
    const jobs = await getjobs();
    const seoDetails = {
        title: "Career Opportunities - Omaya Suites Raipur | Hotel Jobs & Employment",
        metaDescription: "Join the Omaya Suites team in Raipur. Explore career opportunities in hospitality, hotel management, restaurant services, and event management. Apply for jobs at our luxury hotel.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "hotel jobs Raipur, hospitality careers, Omaya Suites jobs, hotel employment Raipur, restaurant jobs, event management jobs, hotel careers Chhattisgarh",
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
    const jobDescription = job?.description?.replace(/<[^>]*>/g, '').substring(0, 160) || '';
    const seoDetails = {
        title: job?.seoDetails?.title || `${job?.jobTitle || job?.title || 'Job'} - Omaya Suites Raipur | Career Opportunities`,
        metaDescription: job?.seoDetails?.metaDescription || jobDescription || `Apply for ${job?.jobTitle || job?.title || 'this position'} at Omaya Suites Raipur. Join our luxury hotel team and build your career in hospitality.`,
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: job?.seoDetails?.tags?.join(', ') || `${job?.jobTitle || job?.title} Raipur, hotel jobs, hospitality careers, Omaya Suites careers, ${job?.category || 'hotel'} jobs Raipur, employment opportunities`,
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
        title: "Thank You - Omaya Suites Raipur | We'll Contact You Soon",
        metaDescription: "Thank you for contacting Omaya Suites Raipur. We have received your enquiry and will get back to you shortly. Experience luxury hospitality in Raipur, Chhattisgarh.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "thank you Omaya Suites, enquiry received, contact confirmation",
        canonical: `${baseUrl}/thankyou`,
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
   
  
    const blogTitle = blogDetails?.title || 'Blog Post';
    const blogDescription = descriptionText.substring(0, 160) || 'Read our latest blog post from Omaya Suites Raipur.';
    const seoDetails = {
        title: `${blogTitle} - Omaya Suites Raipur Blog`,
        metaDescription: blogDescription,
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: `${blogTitle}, Omaya Suites blog, hotel blog Raipur, hospitality blog, ${blogDetails?.tags?.join(', ') || 'travel, hospitality, hotel'}`,
        canonical: `${baseUrl}/blog/${slug}`,
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
        title: "Page Not Found - Omaya Suites Raipur | 404 Error",
        metaDescription: "The page you are looking for could not be found. Return to Omaya Suites Raipur homepage to explore our luxury hotel, dining, and event venues.",
        metaImage: `${baseUrl}/${metaLogoPath}`,
        keywords: "404 error, page not found, Omaya Suites",
        canonical: baseUrl + req.originalUrl,
    };
    

    res.status(404).render('404', { seoDetails });
});




app.listen(port, () => {
  });