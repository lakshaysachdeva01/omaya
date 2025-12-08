const API_BASE_URL = process.env.API_BASE_URL; 
// const WEBSITE_UID = process.env.WEBSITE_UID;
const WEBSITE_UID = "6921645810184c94f509ce46";
const S3_BASE_URL = process.env.S3_BASE_URL;
const WEBSITE_ID_KEY = "websiteProjectId";

const BANNER_TYPES = {
    HOME_BANNER: "HOME_BANNER",
    POPUP_BANNER: "POPUP_BANNER",
    AD_BANNER: "AD_BANNER",
  };

  const FETCH_METHODS = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
  };
  const CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS={
    name : "fullName",
    email: "email",
    address:"strings.stringThree",
    phone : "phonenumber",
    remarks: "message",
   };

   const CAREER_ENQUIRY_DYNAMIC_FIELDS_KEYS={
    name : "strings.stringOne",
    phone : "strings.stringTwo",
    email: "email",
    qualification: "strings.stringThree",
    experience: "strings.stringFour",
    applied: "strings.stringFive",
    resume: "files.fileOne",
    remarks: "remarks",
   };

   const BOOKING_ENQUIRY_DYNAMIC_FIELDS_KEYS={
    name : "strings.stringOne",
    parentname : "strings.stringThree",
    age : "strings.stringFour",
    phone : "strings.stringTwo",
    email: "email",
  serviceType : "serviceType",
    remarks: "remarks",
   };


   const JOB_ENQUIRY_DYNAMIC_FIELDS_KEYS = {
    NAME: "applicantName",
    CONTACT_NUMBER: "contactNo",
    EMAIL: "emailId",
    YRS_OF_EXP: "yrofexp",
    RESUME: "attachresume",
    JOB_ID: "jobtitle",
    MESSAGE: "remarks",
   };

module.exports={
  API_BASE_URL,
    WEBSITE_UID,
    S3_BASE_URL,
    BANNER_TYPES,
    FETCH_METHODS,
    WEBSITE_ID_KEY,
    CONTACT_ENQUIRY_DYNAMIC_FIELDS_KEYS,
    CAREER_ENQUIRY_DYNAMIC_FIELDS_KEYS,
    BOOKING_ENQUIRY_DYNAMIC_FIELDS_KEYS,
    JOB_ENQUIRY_DYNAMIC_FIELDS_KEYS
};
