export const BASE_URL = 'https://api.example.com/api/';
export const BASE_MEDIA_URL = 'https://api.example.com/media/';

export const MODULE_LIST = [
    {
        id: "1",
        sectionKey: "LEARN",
        sectionTitle: "TITLE_GUIDANCE_ON_CASE_FINDINGS",
        sectionIcon: "guidance.svg",
        data: [
            {
                icon: "checking-tool.svg",
                cardTitle: "TITLE_SCREENING",
                link: "Screening",
                type: 'Screening',
                activityType: "module_screening_tool",
            },
            {
                icon: "learning.svg",
                cardTitle: "TITLE_CASE_DEFINITION",
                link: "AlgorithmList",
                type: 'Case Definition',
                activityType: "module_case_defintion",
            },
        ]
    },
    {
        id: "2",
        sectionKey: "PMT",
        sectionTitle: "TITLE_PATIENT_MANAGEMENT_TOOL",
        sectionIcon: "pmt.svg",
        data: [
            {
                icon: "algorithm.svg",
                cardTitle: "TITLE_DIAGNOSIS_ALGORITHM",
                link: "AlgorithmList",
                type: 'Diagnosis Algorithm',
                activityType: "module_diagnostic_care_cascade",
            },
            {
                icon: "adr.svg",
                cardTitle: "TITLE_GUIDANCE_ON_ADR",
                link: "AlgorithmList",
                type: 'Guidance on ADR',
                activityType: "module_guidance_on_adr",
            },
            {
                icon: "treatment.svg",
                cardTitle: "TITLE_TREATMENT_ALGORITHM",
                link: "AlgorithmList",
                type: 'Treatment Algorithm',
                activityType: "module_treatment_care_cascade",
            },
            {
                icon: "latent-tb.svg",
                cardTitle: "TITLE_LATENT_TB_INFECTION",
                link: "AlgorithmList",
                type: 'Latent TB Infection',
                activityType: "module_latent_tb",
            },
            {
                icon: "algorithm.svg",
                cardTitle: "TITLE_DIFFERENTIANTED_CARE",
                link: "AlgorithmList",
                type: 'Differentiated Care Of TB Patients',
                activityType: "module_differentiated_care_tb_patient",
            },
        ]
    },
    {
        id: "3",
        sectionKey: "NTEP",
        sectionTitle: "TITLE_CGC_INTERVENTION",
        sectionIcon: "CGC.svg",
        data: []
    },
    {
        id: "4",
        sectionKey: "",
        sectionTitle: "TITLE_KNOWLEDGE_ASSESSMENT",
        sectionIcon: "knowledge-assessment.svg",
        data: [
            {
                icon: "Ass",
                cardTitle: "CARD_ASSESSEMENT_CURRENT_ASSESSMENTS",
                link: "CurrentAssessments",
                activityType: "module_current_assessments",
            },
            {
                icon: "PastAss",
                cardTitle: "CARD_ASSESSEMENT_PAST_ASSESSMENTS",
                link: "PastAssessments",
                activityType: "module_past_assessments",
            },
        ]
    },
    {
        id: "5",
        sectionKey: "RESOURCE_MATERIALS",
        sectionTitle: "TITLE_RESOURCE_MATERIALS",
        sectionIcon: "resource-materials.svg",
        data: []
    },
    {
        id: "6",
        sectionKey: "",
        sectionTitle: "TITLE_REFERRAL_HEALTH_FACILITY",
        sectionIcon: "Referral-Health Facility.svg",
        data: [
            {
                icon: "hospital",
                cardTitle: "TITLE_NEAR_HEALTH_FACILITY",
                link: "ReferralHealthFacility",
                activityType: "module_Referral-Health Facility",
            },
        ]
    },
    {
        id: "7",
        sectionKey: "",
        sectionTitle: "TITLE_APP_INTE",
        sectionIcon: "",
        data: [
            {
                icon: "survey",
                cardTitle: "TITLE_SURVEY_FORM",
                link: "survey",
                activityType: "module_SURVEY_FORM",
            },
            {
                icon: "rating",
                cardTitle: "TITLE_RATING",
                link: "rating",
                activityType: "module_RATING",
            },
            {
                icon: "certi",
                cardTitle: "TITLE_CERTIFICATES",
                link: "certificate",
                activityType: "module_CERTIFICATES",
            },
        ]
    },

]
export const investgationdetails = [
    {
        id: 'GENERAL_CONDITION',
        image: require('./assets/Axilla64x64.png'),
        title: "GENERAL_CONDITION",
        subtitle: "NORMAL_RANGE",
        range: 'Conscious & well oriented',
        type: 'dropDown',
        items:
            'Conscious and normal,Inability walk but conscious and oriented,Conscious and not oriented,Drowsy/Unconscious/Comatose',
    },
    {
        id: 'TEXT_ICTERUS',
        image: require('./assets/009-fever1.png'),
        title: "TEXT_ICTERUS",
        subtitle: "NORMAL_RANGE",
        range: '--',
        type: 'dropDown',
        items: 'Yes,No',
    },
    {
        id: 'PEDAL_OEDEMA',
        image: require('./assets/008-injury1.png'),
        title: "PEDAL_OEDEMA",
        subtitle: "NORMAL_RANGE",
        range: '--',
        type: 'dropDown',
        items: 'Yes,No',
    },
    {
        id: 'PULSE_RATE',
        image: require('./assets/001-heartbeat1.png'),
        title: "PULSE_RATE",
        subtitle: "NORMAL_RANGE",
        range: '60 - 100/min',
    },
    {
        id: 'TEMPERATURE',
        image: require('./assets/002-thermometer1.png'),
        title: "TEMPERATURE",
        subtitle: "NORMAL_RANGE",
        range: '35 – 38.6 ‘C',
    },
    {
        id: 'BLOOD_PRESSURE',
        image: require('./assets/003-blood-pressure1.png'),
        title: "BLOOD_PRESSURE",
        subtitle: "NORMAL_RANGE",
        range: '90/60 – 120/80',
        // reg: /^([0-9]{1,3})\/([0-9]{1,3})$/,
        type: 'dropDown',
        items:
            'Normal (120/80mmHg),Higher Normal (< 140/90mmHg),Hypertension (> 140/90 mmHg),Hypotension (Diastolic < 60 mmHg),Hypertension (>200/100 mm Hg)',
    },
    {
        id: 'RESPIRATORY_RATE',
        image: require('./assets/004-breath1.png'),
        title: "RESPIRATORY_RATE",
        subtitle: "NORMAL_RANGE",
        range: '12 – 18/min',
    },
    {
        id: 'OXYGEN_SATURATION',
        image: require('./assets/005-oxygen-saturation1.png'),
        title: "OXYGEN_SATURATION",
        subtitle: "NORMAL_RANGE",
        range: '95 – 100%',
    },
    {
        id: 'TEXT_BMI',
        image: require('./assets/026-weight-scale1.png'),
        title: "TEXT_BMI",
        subtitle: "NORMAL_RANGE",
        range: '18.5 – 24.9',
    },
    {
        id: 'TEXT_MUAC',
        image: require('./assets/007-arm1.png'),
        title: "TEXT_MUAC",
        subtitle: "NORMAL_RANGE",
        range: '>= 19 cm',
    },

    {
        id: 'TEXT_HEMOGLOBIN',
        image: require('./assets/010-hemoglobin1.png'),
        title: "TEXT_HEMOGLOBIN",
        subtitle: "NORMAL_RANGE",
        range: 'Female = 9.9 – 14.3 g/dl Male = 12.3 – 17 g/dl',
    },
    {
        id: 'COUNT_WBC',
        image: require('./assets/011-white-blood-cell1.png'),
        title: "COUNT_WBC",
        subtitle: "NORMAL_RANGE",
        range: '4000-11000',
    },
    {
        id: 'TEXT_RBS',
        image: require('./assets/012-sugar-blood-level1.png'),
        title: "TEXT_RBS",
        subtitle: "NORMAL_RANGE",
        range: '79 – 140 mg/dl',
    },
    {
        id: 'TEXT_HIV',
        image: require('./assets/013-red-ribbon1.png'),
        title: "TEXT_HIV",
        subtitle: "NORMAL_RANGE",
        range: '--',
        type: 'dropDown',
        items: '-Ve,+Ve and on ART,+Ve and not on ART',
    },
    {
        id: 'TEXT_XRAY',
        image: require('./assets/Chest64x64.png'),
        title: "TEXT_XRAY",
        subtitle: "NORMAL_RANGE",
        range: 'No abnormality',
        type: 'dropDown',
        items: 'No abnormality,Consolidation,Hydro Pneumothorax',
    },
    {
        id: 'TEXT_HEMOPTYSIS',
        image: require('./assets/CoughingOfBlood64x64.png'),
        title: "TEXT_HEMOPTYSIS",
        subtitle: "NORMAL_RANGE",
        range: '--',
        type: 'dropDown',
        items: 'Yes,No',
    },
];
