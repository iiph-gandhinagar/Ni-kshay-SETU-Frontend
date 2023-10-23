export default {
    GET_ALL_STATE: 'get-all-state',
    GET_DISTRICT_BY_STATE: 'get-district-by-state',
    GET_BLOCK_BY_DISTRICT: 'get-block-by-district',
    GET_ALL_CADRE: 'get-all-cadre',
    GET_ALL_CADRE_TYPE: 'get-all-cadre-type',
    GET_HEALTH_BY_BLOCK: 'get-health-by-block',
    REGISTER: "store-user-v2",
    LOGIN: "login",
    GET_FEEDBACK_DETAILS: "get-feedback-details?feedback_question_skip=",
    STORE_FEEDBACK_DETAILS: "store-feedback-details",
    STORE_MODULE_USAGE: "store-sub-module-usage",
    //assesment
    GET_ALL_ASSESSMENT: 'get-all-assessment',
    GET_ASSESSMENT_WITH_QUESTION: "get-assessment-with-assessmentquestions",
    STORE_ASSESSMENT_RESULT: 'store-user-assessment-result',
    GET_USER_ASSESSMENT_RESULT: 'get-user-result',
    GET_USER_PAST_ASSESSMENTS: 'get-all-past-assessment',
    GET_USER_FUTURE_ASSESSMENT: "get-all-future-assessment",
    GET_USER_ASSESSMENT_DETAILS: "get-subscriber-assessment-details",
    STORE_ASSESSMENT_ENROLLNMENT: "store-assessment-enrollnment",
    //material
    GET_MATERIALS: 'get-files-by-parent',
    GET_ROOT_FOLDERS: 'get-root-folders',
    //  Algorithms
    GET_DIAGNOSES_ALGORITHMS_MASTER_NODES: 'get-diagnoses-algorithms-master-nodes-v2',
    GET_DIAGNOSES_ALGORITHMS_DEPENDENT_NODES: 'get-diagnoses-algorithms-dependent-nodes',

    GET_TREATMENT_ALGORITHMS_MASTER_NODES: 'get-treatment-algorithms-master-nodes-v2',
    GET_TREATMENT_ALGORITHMS_DEPENDENT_NODES: 'get-treatment-algorithms-dependent-nodes',

    GET_GUIDANCE_ON_ADR_ALGORITHMS_MASTER_NODES: 'get-guidance-on-adverse-drug-reactions-master-nodes-v2',
    GET_GUIDANCE_ON_ADR_ALGORITHMS_DEPENDENT_NODES: 'get-guidance-on-adverse-drug-reactions-dependent-nodes',

    GET_LATENT_TB_INFECTION_ALGORITHMS_MASTER_NODES: 'get-latent-tb-infection-master-nodes-v2',
    GET_LATENT_TB_INFECTION_ALGORITHMS_DEPENDENT_NODES: 'get-latent-tb-infection-dependent-nodes',
    GET_LATENT_TB_NODES: 'get-latent-tb-infection-all-nodes',

    GET_CASE_DEFINATION_ALGORITHMS_MASTER_NODES: 'get-case-definitions-master-nodes-v2',
    GET_CASE_DEFINATION_ALGORITHMS_DEPENDENT_NODES: 'get-case-definitions-dependent-nodes',

    GET_DIFFERENTIAL_CARE_ALGORITHMS_MASTER_NODES: "get-differential-care-algorithms-master-nodes-v2",
    GET_DIFFERENTIAL_CARE_ALGORITHMS_DEPENDENT_NODES: "get-differential-care-algorithms-dependent-nodes",

    GET_DYNAMIC_ALGORITHMS_MASTER_NODES: 'get-dynamic-algorithms-master-nodes-v2',
    GET_DYNAMIC_ALGORITHMS_DEPENDENT_NODES: 'get-dynamic-algorithms-dependent-nodes',

    GET_KEYWORDS: 'get-keywords',
    GET_QUESTIONS_BY_KEYWORD: 'get-questions-by-keyword-v3',
    SUBMIT_QUESTIONS_HIT: 'submit-question-hit',
    SEARCH_BY_KEYWORDS: 'search-by-keyword-v2',
    SEND_FEEDBACK: 'submit-feedback',
    //chapters
    GET_ALL_CHAPTERS: 'get-all-chapters',
    GET_ALL_CHAPTERS_BY_ID: "get-chapter-by-id",

    GET_CGC_ALGORITHMS_MASTER_NODES: "get-cgc-interventions-algorithms-master-nodes-v2",
    GET_CGC_ALGORITHMS_DEPENDENT_NODES: "get-cgc-interventions-algorithms-dependent-nodes",
    //  Screening
    GET_ALL_SYMPTOMS: 'get-all-symptoms',
    STORE_USER_SCREENING: 'store-user-screening',
    // Filter
    GET_FILTER_DETAILS: 'get-health-facilities',

    // User
    GET_USERDATA: 'get-user-v2',
    UPDATE_USER_DATA: 'update-user-details-v2',
    // appp
    GET_APP_CONFIG: 'get-app-config',
    GET_APP_HEALTH_STATUS: 'check-health-status',
    REMOVE_NOTIFICATION_TOKEN: 'remove-notification-token',
    STORE_USER_ACTIVITY: 'store-user-activity',
    VERIFIED_OTP: 'verified-otp',
    GENERATE_OTP: "generate-otp",
    GET_APP_DYNAMIC_ALGO: 'get-dynamic-algo-group-by-section',
    GET_MASTER_SEARCH: "get-master-search",
    GET_ALL_SIMILAR_APPS: "get-all-similar-apps",
    GET_TOP_MODULE: "get-module-usage",
    GET_RECENTLY_ADDED: "get-recently-added",
    GET_APP_TOUR: "get-all-tour-slides",
    GET_APP_NOTIFICATION: "get-all-automatic-notification",
    // Contact Us
    CONTACT_US: "store-user-enquiry",
    // Change Password
    CHANGE_PASSWORD: "password-reset",
    FORGOT_PASSWORD: 'forgotPassword',
    VERIFIED_FORGOT_PASSWORD_OTP: 'verified-forogot-password-otp',
    STORE_USER_DEVICE_TOKENS: 'store-user-device-token',

    //userDetails
    GET_USER_V3: "get-user-v3",

    //LeaderBoard
    GET_LEADERBOARD_DETAILS: "get-leaderboard-details",

    //Task
    GET_LEADERBOARD_TASK_LIST: "get-leaderboard-task-list",
    GET_ACHIVEMENT: "get-leaderboard-achivements",
    GET_ALL_CERTIFICATES: "get-all-certificates",

    //Survey

    STORE_SURVEY_QUESTION: "store-survey-details",
    GET_SURVEY_FORM: "get-survey-forms",
    GET_SURVEY_BY_ID: "get-survey-by-id",


    //      Assessment-Performance

    GET_ASSESSMENT_PERFORMANCE: "get-assessment-performace",


    // master search
    GET_MODULE_MASTER_SEARCH: "get-module-master-search",
    GET_SUB_MODULE_MASTER_SEARCH: "get-sub-module-master-search",
    GET_RM_MASTER_SEARCH: "get-resource-material-master-search",
    GET_FAQ_MASTER_SEARCH: "get-chat-question-master-search",
}