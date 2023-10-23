import { MODULE_LIST } from "../../globles";
import {
  CLEAR_APP_NOTIFICATION,
  CLEAR_APP_TOUR, CLEAR_FEEDBACK_DETAILS, GENERATE_OTP,
  GENERATE_OTP_SUCCESS, GET_ALL_SIMILAR_APPS,
  GET_ALL_SIMILAR_APPS_SUCCESS, GET_APP_CONFIG,
  GET_APP_CONFIG_SUCCESS,
  GET_APP_DYNAMIC_ALGO,
  GET_APP_DYNAMIC_ALGO_SUCCESS,
  GET_APP_ERROR,
  GET_APP_HEALTH_STATUS,
  GET_APP_HEALTH_STATUS_ERROR,
  GET_APP_HEALTH_STATUS_SUCCESS,
  GET_APP_LANGUAGES_SUCCESS,
  GET_APP_LEADERBOARD_INFO_SUCCESS,
  GET_APP_MASTER_CMS_SUCCESS, GET_APP_NOTIFICATION, GET_APP_NOTIFICATION_SUCCESS, GET_APP_TOUR,
  GET_APP_TOUR_SUCCESS, GET_APP_TRANSLATIONS_SUCCESS, GET_FEEDBACK_DETAILS,
  GET_FEEDBACK_DETAILS_SUCCESS, GET_FLASH_NEWS,
  GET_FLASH_NEWS_SUCCESS, GET_RECENTLY_ADDED,
  GET_RECENTLY_ADDED_SUCCESS, GET_TOP_MODULE,
  GET_TOP_MODULE_SUCCESS, SET_APP_LANG,
  SET_APP_PLATFORM, SET_APP_SCROLLING, SET_APP_UNDER_MAINTENANCE, SET_NOTIFICATION_POPUP, STORE_APP_TIME, STORE_FEEDBACK_DETAILS,
  STORE_FEEDBACK_DETAILS_SUCCESS, STORE_OLD_APP_TOURID, VERIFIED_OTP,
  VERIFIED_OTP_SUCCESS
} from "../types";

const INIT_STATE = {
  loader: false,
  topModulesLoader: false,
  flashNewsLoader: false,
  allSimilarAppsLoader: false,
  recentlyAddedLoader: false,
  appStatusloader: false,
  healthFacility: {},
  appTranslations: {
    "APP_TITLE": "Ni-kshay SETU",
    "APP_SUBTITLE": "Support to End TUberculosis",
    "PLACEHOLDER_MOBILE_NUMBER": "Mobile Number",
    "PLACEHOLDER_PASSWORD": "Password",
    "REQUIRED": "Required",
    "EMPTY_PASSWORD": "Required",
    "BTN_LOGIN": "Login",
    "BTN_CREATE_AN_ACCOUNT": "Create an account",
    "LINK_FORGOT_PASSWORD": "Forgot Password",
    "PLACEHOLDER_FULL_NAME": "Full Name",
    "EMPTY_FULL_NAME": "Required",
    "VALIDATION_MOBILE_NUMBER": "Mobile Number must be at least 10 digit",
    "VALIDATION_PASSWORD": "Password must be at least 6 character",
    "VALIDATION_FULL_NAME": "Name must be at list 3 char",
    "VALIDATION_PASSWORD_MATCH": "Password must have at least 1 Lowercase, 1 Uppercase, 1 Numeric and 1 Special character.",
    "DROPDOWN_SELECT_CADRE_TYPE": "Select Cadre Type",
    "UNSELECTED_DROPDOWN_CADRE_TYPE": "Required",
    "DROPDOWN_SELECT_CADRE": "Select Cadre",
    "UNSELECTED_DROPDOWN_CADRE": "Please Select Any",
    "DROPDOWN_SELECT_STATE": "Select State",
    "UNSELECTED_DROPDOWN_STATE": "Please Select Any",
    "BTN_CREATE_MY_ACCOUNT": "Create my account",
    "TEXT_CREATE_AN_ACCOUNT": "I already have an account",
    "LINK_BACK_TO_LOGIN": "Back to login",
    "DROPDOWN_SELECT_DISTRICT": "Select District",
    "UNSELECTED_DROPDOWN_DISTRICT": "Please Select Any",
    "DROPDOWN_SELECT_TU": "Select TU",
    "UNSELECTED_DROPDOWN_TU": "Please Select Any",
    "DROPDOWN_SELECT_HEALTHFACILITY": "Select Health-facility",
    "HEADER_CREATE_AN_ACCOUNT": "Create an account",
    "HEADER_HOME": "Ni-kshay Setu",
    "TITLE_GUIDANCE_ON_CASE_FINDINGS": "Learn About Case Findings",
    "TITLE_PATIENT_MANAGEMENT_TOOL": "Patient Management Tool",
    "TAB_KNOWLEDGE_ASSESSMENT": "ASSESS",
    "TITLE_RESOURCE_MATERIALS": "Resource Materials",
    "TITLE_REFERRAL_HEALTH_FACILITY": "Referral - Health Facility",
    "TITLE_SCREENING": "Screening Tool",
    "TITLE_DIAGNOSIS_ALGORITHM": "Diagnostic Care Cascade",
    "TITLE_TREATMENT_ALGORITHM": "Treatment Care Cascade",
    "TITLE_GUIDANCE_ON_ADR": "Guidance on ADR",
    "TITLE_LATENT_TB_INFECTION": "TB Preventive Treatment",
    "TITLE_CASE_DEFINITION": "Case Definition",
    "DRAWER_IIPHG": "Ni-kshay Setu",
    "DRAWER_CASE_DEFINITION": "Case Definition",
    "DRAWER_PATIENT_MANAGEMENT_TOOL": "Patient Management Tool",
    "DRAWER_CGC_INTERVENTION": "NTEP Intervention",
    "DRAWER_KNOWLEDGE_ASSESSMENT": "Knowledge Assessment",
    "DRAWER_RESOURCE_MATERIALS": "Resource Materials",
    "DRAWER_REFERRAL_HEALTH_FACILITY": "Referral - Health Facility",
    "DRAWER_MY_ACCOUNT": "My Account",
    "DRAWER_CONTACT_US": "Contact Us",
    "DRAWER_CHANGE_APPLICATION_LANGUAGE": "Change Application Language",
    "DRAWER_ABOUT_IIPHG": "Partners and Developers",
    "DRAWER_ABOUT_CGC_PROJECT": "About Us",
    "DRAWER_SIGN_OUT": "Sign Out",
    "DRAWER_POWERED_BY": "Powered by",
    "DRAWER_DIGIFLUX_IT_SOLUTIONS": "Digiflux IT Solutions",
    "TAB_HOME": "Home",
    "TAB_GUIDANCE": "LEARN",
    "TAB_PMT": "MANAGE",
    "TAB_ACCOUNT": "Account",
    "TAB_CHAT": "Chat",
    "ACCOUNT_CHANGE_PASSWORD": "Change Password",
    "SUBTITLE_SCREENING": "Screening tool is designed to assess if the presenting symptoms require a person to be tested for Tuberculosis (TB).",
    "SUBTITLE_SCREENING_TWO": "It will take you to some basic questions and will determine the result based on inputs.",
    "TEXT_SCREENING_AGE": "Age (years)",
    "TEXT_SCREENING_WEIGHT": "Weight (kgs)",
    "TEXT_SCREENING_HEIGHT": "Height (cms)",
    "BTN_START": "Start",
    "PLACEHOLDER_SEARCH": "Search",
    "TEXT_FILTERS": "FILTERS",
    "TEXT_CLEAR_ALL": "CLEAR ALL",
    "TEXT_CLOSE": "Close",
    "TEXT_APPLY": "Apply",
    "FILTER_BOTTOM_FILTER": "Filter",
    "FILTER_BOTTOM_SORT": "Sort",
    "FILTER_BOTTOM_SORT_BY": "Sort by",
    "FILTER_BOTTOM_SORT_NAME_AZ": "Name (A - Z)",
    "FILTER_BOTTOM_SORT_NAME_ZA": "Name (Z - A)",
    "CARD_AVAILABLE_FACILITIES": "Available Facilities",
    "CARD_GET_DIRECTION": "Get Direction",
    "CARD_ASSESSEMENT_CURRENT_ASSESSMENTS": "Current Assessments",
    "CARD_ASSESSEMENT_PAST_ASSESSMENTS": "Past Assessments",
    "CARD_RESOURCE_MATERIALS_PDFS": "NTEP Guidelines",
    "CARD_RESOURCE_MATERIALS_VIDEOS": "Videos",
    "CARD_RESOURCE_MATERIALS_PRESENTATIONS": "Presentations",
    "CARD_RESOURCE_MATERIALS_DOCUMENTS": "Documents",
    "CARD_RESOURCE_MATERIALS_OTHERS": "Others",
    "HEADER_SUPPORT": "Support",
    "HEADER_CHAT_TITLE": "Ni-kshay Setu",
    "PLACEHOLDER_CHAT_TYPE_MESSAGE": "Type your message here",
    "SUBTITLE_CONTACT_US": "Transforming the fight towards elimination",
    "VALIDATION_CHARACTER": "minimum 4 Charater",
    "PLACEHOLDER_NAME": "Name",
    "PLACEHOLDER_EMAIL": "Email",
    "PLACEHOLDER_MESSAGE": "Message",
    "PLACEHOLDER_SUBJECT": "Subject",
    "PLACEHOLDER_OLD_PASSWORD": "Old Password",
    "PLACEHOLDER_NEW_PASSWORD": "New Password",
    "PLACEHOLDER_CONFIRM_PASSWORD": "Confirm Password",
    "TITLE_KNOWLEDGEASSESSMENT_ASSIGNMENT_NAME": "Assignment Name",
    "TITLE_KNOWLEDGEASSESSMENT_TIME_TO_COMPLETE": "Time to complete",
    "TITLE_KNOWLEDGEASSESSMENT_NO_OF_QUESTIONS": "No. of questions",
    "TITLE_KNOWLEDGEASSESSMENT_REMAINING_TIME": "Remaining time",
    "TITLE_KNOWLEDGEASSESSMENT_QUESTION": "Question",
    "BTN_C_ASMENT_SAVE": "Save",
    "BTN_C_ASMENT_S_AND_S_ANS": "Save & Show answer",
    "BTN_C_ASMENT_SUBMIT": "Submit",
    "BTN_C_ASMENT_NEXT": "Next",
    "BTN_C_ASMENT_PREVIOUS": "Previous",
    "BTN_C_ASMENT_SKIP": "Skip",
    "TITLE_K_ASMENT_RES_COMPL_ON": "Completed on",
    "TITLE_K_ASMENT_RES_ASIGNMENT_NAME": "Assignment Name",
    "TITLE_K_ASMENT_RES_ATTEMPTED": "Attempted",
    "TITLE_K_ASMENT_RES_SKIPPED": "Skipped",
    "TITLE_K_ASMENT_RES_RIGHT_ANSWERS": "Right Answers",
    "TITLE_K_ASMENT_RES_WRONG_ANSWERS": "Wrong Answers",
    "TITLE_K_ASMENT_RES_SCORE": "SCORE",
    "LINK_K_ASMENT_RES_BACK_TO_HOME": "Back To Home",
    "RESULT": "Result",
    "RESULT_TY": "Thank you for taking the assessment",
    "RESULT_NOTTB_TEXT": "If the information provided by you is accurate, the person does not appear to have significant symptoms of Tuberculosis (TB).",
    "RESULT_TB_TEXT": "If the information provided by you is accurate, it indicates that the person might have",
    "NUTRITION_OUTCOME": "Nutrition Outcome",
    "CURRENT_WEIGHT": "Current Weight",
    "CURRENT_BMI_VALUE": "Current BMI Value",
    "DESIRABLE_WEIGHT": "Desirable Weight",
    "MINIMUM_ACCEPTABLE_WEIGHT": "Minimum acceptable weight",
    "DESIRABLE_WEIGHT_GAIN": "Desirable weight gain",
    "MINIMUM_WEIGHT_GAIN_REQUIRED": "Minimum weight gain required",
    "DESIRABLE_DAILY_CALORIC_INTAKE": "Desirable daily caloric intake",
    "DESIRABLE_DAILY_PROTEIN_INTAKE_RANGE": "Desirable Daily Protein Intake Range",
    "NUTRITION_OUTCOME_DETAILS": "Next Step for Presumptive Case",
    "REFERENCE": "Reference",
    "SYMPTM_QUESTION": "Are you experiencing any of the following symptoms?",
    "OBESE": "Obese",
    "OVERWEIGHT": "Overweight",
    "NORMAL": "Normal",
    "MILD_UNDERWEIGHT": "Mild underweight",
    "MODERATE_UNDERWEIGHT": "Moderate underweight",
    "SEVERE_UNDERWEIGHT": "Severe underweight",
    "EXTREME_UNDERWEIGHT": "Extreme underweight",
    "HEADER_CONTACT_US": "Contact Us",
    "CHAT_QUESTIONSTATICADD_LOAD_MORE": "Load More",
    "CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS": "Back to main topics",
    "CHAT_QUESTIONSTATICADD_MESSAGE": "You can also type any Keyword below.",
    "CHAT_QUESTIONSTATICADD_SORRY": "Sorry! I could not find any relevant information for the above topic. You can choose from most asked topics or contact us.",
    "CHAT_QUESTIONSTATICADD_CONTACT": "Contact Us",
    "BOT_SHORT_NAME": "Ask Setu",
    "CHAT_QUESTIONANSWERTYPE_LOAD_SIM_QUES": "Load similar Questions",
    "CHAT_KEYWORDTYPELIST_MORE": "More",
    "BOT_NAME": "Ni-kshay Setu",
    "HEADER_CHANGE_PASS": "Change Password",
    "BTN_CONTACT_US": "Submit",
    "CARD_RESOURCE_MATERIALS_PDFS_OFFICE_ORDERS": "Office Orders",
    "TITLE_CGC_INTERVENTION": "NTEP Intervention",
    "TITLE_KNOWLEDGE_ASSESSMENT": "Knowledge Assessment",
    "CONTACT_US_SUBJECTS": "Technical,Non-Technical,Other",
    "CHAT_USERSIDE_YOU": "You",
    "TABLE_NAME": "Name",
    "TABLE_SIZE": "Size",
    "TABLE_UPLOAD_DATE": "Upload Date",
    "HEADER_FACILITIES": "Facilities",
    "HEADER_LOCATION": "Location",
    "END_MESSAGE": "Yay! You have seen it all",
    "LOGIN_AGAIN": "Want to try login again?",
    "HEADER_PROFILE_PAGE": "Profile Page",
    "HEADER_PERSONAL_DETAILS": "Personal Details",
    "CADRE_LEVEL": "Cadre Level",
    "HEADER_STATE": "State",
    "HEADER_CONTACT_DETAILS": "Contact Details",
    "HEADER_MOBILE_NO": "Mobile No",
    "HEADER_EMAIL": "Email",
    "HEADER_LOGIN_DETAILS": "Login Details",
    "HEADER_PASSWORD": "Password",
    "TEXT_DONT_HAVE_ACCOUNT": "I don't have an account",
    "SELECT_CADRE_LEVEL": "Select Cadre Level",
    "BTN_CANCEL": "Cancel",
    "CURRENT_PASSWORD": "Current Password",
    "ENTER_CURRENT_PASSWORD": "Enter Current Password",
    "ENTER_NEW_PASSWORD": "Enter New Password",
    "RETYPE_PASSWORD": "Retype Password",
    "TAKE_ASSESSMENT": "Take Assessment",
    "HEADER_NUTRITION_OUTCOME_DETAILS": "Nutrition Outcome Details",
    "VALIDATION_PHONE_NO": "Phone No must be 10 digit",
    "VERIFICATION_OTP_MESSAGE_ONE": "We have sent an OTP to your mobile number",
    "VERIFICATION_OTP_MESSAGE_TWO": "for verification purpose.",
    "BTN_VERIFY": "Verify",
    "LINK_RESEND_OTP": "Resend OTP",
    "LINK_CHANGE_MOBILE_NUMBER": "Change Mobile Number",
    "TEXT_INVALID_EMAIL": "Invalid email",
    "TEXT_APP_LANGUAGE": "App Language",
    "BTN_SUBMIT": "Submit",
    "BTN_GET_OTP": "Get OTP",
    "PLACEHOLDER_OTP": "OTP",
    "VALIDATION_CONFIRM_PASSWORD": "Passwords must match",
    "SCREENING_RESULT": "Screeing Result",
    "BTN_YES": "Yes",
    "BTN_NO": "No",
    "BTN_ALGORITHM_LINK": "Check Diagnostic Algorithm",
    "PULSE_RATE": "Pulse Rate",
    "NORMAL_RANGE": "Normal Range",
    "TEMPERATURE": "Temperature",
    "BLOOD_PRESSURE": "Blood Pressure",
    "RESPIRATORY_RATE": "Respiratory Rate",
    "OXYGEN_SATURATION": "Oxygen Saturation",
    "TEXT_BMI": "BMI",
    "TEXT_MUAC": "MUAC",
    "PEDAL_OEDEMA": "Pedal Oedema",
    "GENERAL_CONDITION": "General Condition",
    "TEXT_ICTERUS": "Icterus",
    "TEXT_HEMOGLOBIN": "Hemoglobin (HB)",
    "COUNT_WBC": "Total count of White Blood Cells",
    "TEXT_RBS": "Random blood sugar (RBS)",
    "TEXT_HIV": "HIV",
    "TEXT_XRAY": "Chest X ray",
    "TEXT_HEMOPTYSIS": "Hemoptysis",
    "TEXT_SCORE": "Score",
    "HEADER_LABORATORY_INVESTIGATION": "Assessment of TB patients",
    "BTN_CALCULATE_SCORE": "Calculate Score",
    "HEADER_LAB_SCORE": "Assessment of TB Patients' Investigation Score",
    "BTN_AVG_SCORE": "Back To Average Score",
    "BTN_Nutrition_Management": "Nutrition Management",
    "BTN_Nutrition_Next": "Next",
    "Differentiated_Care_Result_Title": "Score Result",
    "Differentiated_Care_Result_Thanks_Message": "Thank you for Assessment of TB Patient",
    "Differentiated_Care_High_Risk": "High Risk",
    "Differentiated_Care_Moderate_Risk": "Moderate Risk",
    "Differentiated_Care_Low_Risk": "Low Risk",
    "Differentiated_Care_Result_3": "Referring to DH/SDH or nearest secondary or tertiary care facility with availability of intensive care.",
    "Differentiated_Care_Result_2": "Referring to PHC or any facility with availability of MBBS doctor or facility indicated in referral column.",
    "Differentiated_Care_Result_1": "Providing intermediate care and observing for symptoms to subside.",
    "Btn_Differentiated_Care_Result": "View Detailed Score",
    "TITLE_DIFFERENTIANTED_CARE": "Differentiated Care Of TB Patients",
    "HEADER_EDIT_PROFILE": "Edit Profile",
    "BTN_UPDATE_PROFILE": "Update Profile",
    "EDIT_PROFILE_TEXT": "Edit Profile",
    "NO_DATA": "No Data",
    "BTN_UPDATE_APP": "Update",
    "BTN_OK": "ok",
    "ERROR_503_MESSAGE": "The server is temporarily down. try again later!",
    "ERROR_503_TITLE": "503 Service Unavailable",
    "CHAT_RELATED_OUESTION": "Related Quetions",
    "CHAT_MODULE_SUGGESTIONS": "Module Suggestions",
    "CHAT_ANSWERS": "Answers",
    "BOT_SUB_HEADER": "Hello! <br />I am Ni-kshay Setu. Let me know if you have any questions. You can select from the topics below or can type your question in the space provided.",
    "PLACEHOLDER_PATIENT_AGE": "Enter Patient Age",
    "PLACEHOLDER_PATIENT_NAME": "Enter Patient Name",
    "PLACEHOLDER_PATIENT_NIK_ID": "Enter Patient Nikshy ID",
    "PLACEHOLDER_PATIENT_GENDER": "Select Patient Gender",
    "OPTIONS_PATIENT_GENDER": "Male,Female,Other",
    "APP_LINK": "Share App Link",
    "HEADER_COUNTRY": "Country",
    "COMMUNITY_ENGAGEMENT_GUIDELINE": "Community Engagement",
    "PRIVACY_POLICY": "Privacy Policy",
    "CHAT_ADDITIONAL_MATERIAL": "Additional Resource Materials (Source of content: NTEP)",
    "CHAT_NTEP_ANSWERS": "Answers (Source of content: NTEP)",
    "TITLE_SURVEY_FORM": "Survey Form",
    "TITLE_LEADER_BOARD": "Leaderboard",
    "TITLE_RATING": "Rating",
    "TITLE_CERTIFICATES": "Certificates",
    "TITLE_NEAR_HEALTH_FACILITY": "Nearest Health Center",
    "F_CASE_FINDING": "Case Findings",
    "F_MANG_PATIENT": "Manage TB Patient",
    "F_REF_HEALTH_FACILITY": "Referal Health Facility",
    "F_RESO_MATERIAL": "Resource Material",
    "F_FEATURES": "Features",
    "N_NEWS_FEED": "News Feed",
    "SIMILAR_APPLI": "Similar Applications",
    "RECENTLY_ADDED": "Recently Added",
    "WE_R_KEEP_IMPROVING_YOUR_IMP_F_US": "We are always looking for ways to improve, your feedback is an important part of that process",
    "MODULE": "Module",
    "MORE_TOOLS": "More Tools",
    "U_HAVE_SUBMIT_ALL_FEEDBACK": "You have submitted all feedback.",
    "OTHER_SUGGESTIONS": "Other Suggestions",
    "SUBMIT": "Submit",
    "FEEDBACK": "Feedback",
    "COMPLETION_CERTIFICATE": "Completion Certificate",
    "AVAIL_FACILITIES": "Available Facilities",
    "LEVEL": "Level",
    "BRONZE": "Bronze",
    "GOLD": "Gold",
    "SILVER": "Silver",
    "OTHER_MODULES": "Other Modules",
    "TASKS": "Tasks",
    "MINUTES_SPENT": "Minutes Spent",
    "SUB_MODULE_VISITED": "Sub Module Visited",
    "CHATBOT_USAGE": "Chatbot Usage",
    "RESOURCE_MATERIAL_USAGE": "Resource Material Usage",
    "APP_OPENED": "App. Opened",
    "POINTS": "Points",
    "EDIT_PERSONAL_DETAILES": "Edit Personal Details",
    "EDIT_PROFILE_PICTURE": "Change Profile Picture",
    "CHANGE_APPLICATION_LANG": "Change Application Language",
    "SHARE_APP_LINK": "Share Application Link",
    "SIGN_OUT": "Sign Out",
    "UPDATE_DETAILS": "Update Details",
    "HEALTH_FACILITY": "Health Facility",
    "DISTRICT": "District",
    "CADER": "Cadre",
    "CADER_TYPE": "Cadre Type",
    "HEALTH_FACILITY_LVL": "Health-facility Level",
    "PERFORMANCE": "Performance",
    "CURRENT_ASSMNT": "Current Assessment",
    "PAST_ASSMNT": "Past Assessment",
    "FUTURE_ASSMNT": "Future Assessment",
    "CONFIRM_SUBMIT": "Confirm Submit",
    "ATTEMPTED": "Attempted",
    "SKIPPED": "Skipped",
    "OUT_OF_TOTAL": "Out Of Total",
    "VIEW": "View",
    "VIEW_CERTIFICATE": "View Certificate",
    "ASSESSMENT_NAME": "Assessment Name",
    "NO_OF_QUES": "No. of Quetion",
    "TIME_TO_COMPLETE": "Time to Complete",
    "COMPLETED_ON": "Completed on",
    "COMPLETION_RATE": "Completion Rate",
    "ASSESSMENT": "Assessment",
    "ACCURACY": "Accuracy",
    "CERTIFICATE": "Certificates",
    "DOWNLOAD": "Download",
    "ADD_PROF_PIC": "Add Profile Picture",
    "HEADER_CREATE_ACCOUNT": "Create Account",
    "HEADER_HEALTH_FACILITY": "Health Facility",
    "SEARCH_HEALTH_FACILITY": "Search Health Facility",
    "VIEW_ALL": "View All",
    "DETAILED_SCORE": "Detailed Score",
    "BRONZE_MEDAL": "Bronze Medal",
    "SILVER_MEDAL": "Silver Medal",
    "GOLD_MEDAL": "Gold Medal",
    "ASSESSMENT_COMPLETION_CERTI": "Assessment Certificates",
    "LEADERBOARD_INFOTAB_HEADER": "Leaderboard will nurture highly motivated users through a culture of recognition and gamified competitions. It will reinforce best in app performance by recognising accomplishments in interesting ways. Understand your application's progress, and by completing certain tasks, you will be rewarded with a medal to boost your efforts. The actions necessary to reach each level of overall performance are listed below along with information about those levels.",
    "TAB_NAME_LEADERBOARD": "Leaderboard",
    "TAB_NAME_TASKS": "Tasks",
    "TAB_NAME_ACHIEVEMENTS": "Achievements",
    "TAB_NAME_INFORMATION": "Information",
    "HEADER_SCREENING_TOOL": "Screening Tool",
    "THANK_U_FOR_THE_INPUTS": "Thank you for the inputs",
    "SELECT_AGE_WEIGHT_AND_HEIGHT": "Select age,weight and height",
    "SCREENING_HEADER_AGE_Y": "Age (Year)",
    "SCREENING_HEADER_WEIGHT_KG": "Weight (Kg)",
    "SCREENING_HEADER_HEIGHT_CM": "Height (cm)",
    "NEXT_BTN": "Next",
    "QUES_ARE_U_EXPERIENCING_ANY_SYMPTOMS": "Are you experiencing any of the following symptoms",
    "SCREENING_STEPER_LABEL_BASIC_INFO": "Basic Info.",
    "SCREENING_STEPER_LABEL_SYMPTOMS": "Symptoms",
    "HEADER_SURVEY_FORM": "Survey Form",
    "SURVEY_FORM_DESCRIPTION_TOP": "Survey form is developed to understand the requirements and feedback from the subscribers. It allows us to create the content most apprehensively needed for the Healthcare Personnel.",
    "SURVEY_FORM_DESCRIPTION_BOTTOM": "Please participate in this survey to build and enhance the capacity of NTEP workforce.",
    "HEADER_APP_LANG": "Application Language",
    "FOLLOW_US_ON_SOCIAL_MEDIA": "Follow us on social media",
    "FB_SOCIAL_MEDIA_NAME": "Ni-kshay.Setu",
    "INSTA_SOCIAL_MEDIA_NAME": "Ni-kshay.Setu",
    "WELCOME": "Welcome",
    "MASTER_SEARCH_TAB_MODULES": "Modules",
    "MASTER_SEARCH_TAB_SUB_MODULES": "Sub Modules",
    "MASTER_SEARCH_RESOURCE_MATERIAL": "Resource Material",
    "MASTER_SEARCH_TAB_FAQ": "FAQ",
    "TAB_ASSESS": "Assess",
    "NO_DATA_FUTURE_ASSESS": "No Result Found",
    "NO_DATA_PAST_ASSESS": "No Result Found",
    "NO_DATA_CURRENT_ASSESS": "No Result Found",
    "NO_DATA_SURVEY": "No Result Found",
    "NO_DATA_NOTIFICATION": "No Result Found",
    "Test_Treatment_Algo": "Test Treatment Algo",
    "Test_Diagnosis_Algorithm": "Test Diagnosis Algorithm",
    "Differentiated_Care_Normal_Risk": "No Risk",
    "TITLE_APP_INTE": "Application Interaction",
    "Active_case_findings_for_tb_patient": "Active Case Findings For TB Patient"
  },
  appMasterCms: [],
  dynamicAlogs: MODULE_LIST,
  appLang: 'en',
  appUnderMaintenance: false,
  platform: null,
  appStatus: {},
  flashNews: [],
  appLanggusges: [{ title: "English", code: "en" }, { title: 'हिंदी', code: 'hi' }, { title: 'ગુજરાતી', code: 'gu' }, { title: 'मराठी', code: 'mr' }],
  allSimilarApps: [],
  feedBackDetails: [],
  isFeedbackModal: false,
  topModules: [],
  recentlyAdded: [],
  appTime: null,
  isScrolling: true,
  notificationObj: {},
  tourLoader: false,
  dynamicAlogsloader: false,
  tourSlider: [],
  oldTourIds: [],
  notificationList: [],
  notificationObj: {}
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_APP_CONFIG: {
      return {
        ...state,
        loader: true,
        appUnderMaintenance: false,
      };
    }
    case GET_APP_CONFIG_SUCCESS: {
      return {
        ...state,
        loader: false,
        healthFacility: action.payload,
      };
    }
    case GET_APP_TRANSLATIONS_SUCCESS: {
      return {
        ...state,
        loader: false,
        appTranslations: action.payload,
      };
    }
    case GET_APP_LEADERBOARD_INFO_SUCCESS: {
      return {
        ...state,
        loader: false,
        leaderboardInfo: action.payload,
      };
    }
    case GET_APP_LANGUAGES_SUCCESS: {
      return {
        ...state,
        loader: false,
        appLanggusges: action.payload,
      };
    }
    case GET_APP_MASTER_CMS_SUCCESS: {
      return {
        ...state,
        loader: false,
        appMasterCms: action.payload,
      };
    }
    case GENERATE_OTP: {
      return {
        ...state,
        loader: true,
      };
    }
    case GENERATE_OTP_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case VERIFIED_OTP: {
      return {
        ...state,
        loader: true,
      };
    }
    case VERIFIED_OTP_SUCCESS: {
      return {
        ...state,
        loader: false,
      };
    }
    case SET_APP_LANG: {
      return {
        ...state,
        appLang: action.payload,
      };
    }
    case SET_APP_PLATFORM: {
      return {
        ...state,
        platform: action.payload,
      };
    }
    case SET_APP_UNDER_MAINTENANCE: {
      return {
        ...state,
        appUnderMaintenance: true,
      };
    }
    case GET_APP_HEALTH_STATUS: {
      return {
        ...state,
        appStatusloader: true,
        appStatus: {},
      };
    }
    case GET_APP_HEALTH_STATUS_SUCCESS: {
      return {
        ...state,
        appStatusloader: false,
        appStatus: action.payload
      };
    }
    case GET_APP_HEALTH_STATUS_ERROR: {
      return {
        ...state,
        // loappStatusloaderader: false,
        appStatusloader: false, //BUG FIX INFINITE LOADER iOS
        appStatus: action.payload
      };
    }
    case GET_APP_DYNAMIC_ALGO: {
      return {
        ...state,
        dynamicAlogsloader: true,
      };
    }
    case GET_APP_DYNAMIC_ALGO_SUCCESS: {
      const oldArray = Object.assign([], MODULE_LIST)
      return {
        ...state,
        dynamicAlogsloader: false,
        dynamicAlogs: oldArray.map((item) => {
          const DynamicArray = action.payload?.[item.sectionKey]
          if (DynamicArray) {
            const UpdateData = Object.assign([], item?.data)

            for (let index = 0; index < DynamicArray.length; index++) {
              const element = DynamicArray[index];
              if (item.sectionKey === 'RESOURCE_MATERIALS') {
                UpdateData.push({
                  icon: element?.icon_type,
                  cardTitle: element?.title,
                  link: "ResourceMaterials",
                  type: element?.icon_type,
                  activityType: "module_Resource_Materials_" + element?.icon_type,
                  id: element?.id,
                })
              } else
                UpdateData.push({
                  icon: 'algorithm.svg',
                  cardTitle: element?.title || element?.name,
                  type: item.sectionKey == 'NTEP' ? "CGC" : 'Dynamic',
                  link: 'AlgorithmList',
                  id: element?.id,
                  imageUrl: element?.media?.[0]?.id ?
                    element?.media?.[0]?.id + '/' + element?.media?.[0]?.file_name : null,
                  activityType: 'module_' + (element?.title || element?.name),
                })
            }

            return {
              id: item?.id,
              sectionKey: item?.sectionKey,
              sectionTitle: item?.sectionTitle,
              sectionIcon: item?.sectionIcon,
              data: UpdateData
            }
          }
          return item
        }),
      };
    }
    case GET_APP_ERROR: {
      return {
        ...state,
        loader: false,
        dynamicAlogsloader: false,
        appStatusloader: false,
        isFeedbackModal: false,
        topModulesLoader: false,
        flashNewsLoader: false,
        allSimilarAppsLoader: false,
        recentlyAddedLoader: false,
        tourLoader: false,
      };
    }
    case GET_FLASH_NEWS: {
      return {
        ...state,
        flashNewsLoader: true,
      };
    }
    case GET_FLASH_NEWS_SUCCESS: {
      return {
        ...state,
        flashNewsLoader: false,
        flashNews: action.payload,
      };
    }
    case GET_ALL_SIMILAR_APPS: {
      return {
        ...state,
        allSimilarAppsLoader: true,
      };
    }
    case GET_ALL_SIMILAR_APPS_SUCCESS: {
      return {
        ...state,
        allSimilarAppsLoader: false,
        allSimilarApps: action.payload,
      };
    }
    case GET_FEEDBACK_DETAILS: {
      return {
        ...state,
        loader: true,
      };
    }
    case GET_FEEDBACK_DETAILS_SUCCESS: {
      return {
        ...state,
        loader: false,
        feedBackDetails: action.payload?.data,
        isFeedbackModal: action.payload?.modal,
      };
    }
    case CLEAR_FEEDBACK_DETAILS: {
      return {
        ...state,
        loader: false,
        feedBackDetails: [],
        isFeedbackModal: false
      };
    }
    case STORE_FEEDBACK_DETAILS: {
      return {
        ...state,
        loader: true,
      };
    }
    case STORE_FEEDBACK_DETAILS_SUCCESS: {
      return {
        ...state,
        loader: false,
        isFeedbackModal: false,
        feedBackDetails: [],
      };
    }
    case GET_TOP_MODULE: {
      return {
        ...state,
        topModulesLoader: true,
      };
    }
    case GET_TOP_MODULE_SUCCESS: {
      return {
        ...state,
        topModulesLoader: false,
        topModules: action.payload,
      };
    }
    case GET_RECENTLY_ADDED: {
      return {
        ...state,
        recentlyAddedLoader: true,
      };
    }
    case GET_RECENTLY_ADDED_SUCCESS: {
      return {
        ...state,
        recentlyAddedLoader: false,
        recentlyAdded: action.payload,
      };
    }
    case STORE_APP_TIME: {
      console.log("STORE_APP_TIME", action.payload);
      return {
        ...state,
        appTime: action.payload,
      };
    }
    case SET_APP_SCROLLING: {
      return {
        ...state,
        isScrolling: action.payload,
      };
    }
    case SET_NOTIFICATION_POPUP: {
      return {
        ...state,
        notificationObj: action.payload,
      };
    }
    case STORE_OLD_APP_TOURID: {
      return {
        ...state,
        oldTourIds: action.payload,
      };
    }
    case GET_APP_TOUR: {
      return {
        ...state,
        tourLoader: true,
        tourSlider: []
      };
    }
    case GET_APP_TOUR_SUCCESS: {
      const newTourAray = action.payload;
      const updateSlides = Object.assign([]);
      for (let index = 0; index < newTourAray.length; index++) {
        if (state.oldTourIds.find(e => e == newTourAray[index]?.id)) {
        } else {
          updateSlides.push(newTourAray[index]);
        }

      }
      return {
        ...state,
        tourLoader: false,
        tourSlider: updateSlides,
      };
    }
    case CLEAR_APP_TOUR: {
      return {
        ...state,
        tourLoader: false,
        tourSlider: [],
      };
    }
    case GET_APP_NOTIFICATION: {
      return {
        ...state,
        loader: true
      };
    }
    case GET_APP_NOTIFICATION_SUCCESS: {
      return {
        ...state,
        loader: false,
        notificationList: [...state.notificationList, ...action.payload?.data],
        notificationObj: action.payload,
      };
    }
    case CLEAR_APP_NOTIFICATION: {
      return {
        ...state,
        notificationList: [...[]],
        notificationObj: {},
      };
    }
    default:
      return state;
  }
};
