import { bootstrap } from '@theme-ui/presets'
export default {
  ...bootstrap,
  fonts: {
    body: '"Nunito", sans-serif',
    heading: '"Nunito", sans-serif',
    Raleway: '"Raleway", sans-serif'
  },
  fontSizes: [12, 14, 15, 16, 18, 20, 22, 24, 32, 48],
  fontWeights: {
    body: 400,
    semiBold: 600,
    heading: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: "33px"
  },
  colors: {
    gray1: '#AAAAAA',
    text: '#392a25',
    border: "#DADADA",
    muted: '#aaaaaa',
    background: '#f8f8f8',
    foreground: '#ffffff',
    black: "#000000",
    black2: '#100F0F',
    white: '#FFFFFF',
    primary: '#5584AC',
    orange: '#FA967E',
    AccentErrorLight: "#FFEDF3",
    success: '#61BA5C',
    AccentSuccessLight: '#E1FFDF',
    LightBlue: "#ECF6FF",
    colorLight1Disabled: '#BCBCBF',
    colorLight2: '#F1F1FA',
    colorLight3: '#91919F',
    colorDark1: '#161719',
    colorDark2: '#212325',
    colorDark3: '#292B2D',
    warning: "#FFC960",
    error: '#FF6B6B',
    headerTextColor: '#242B3F',
    borderColor: '#DADADA',
    colorAccentSecondaryLight: '#FFE9E9',
    dissable: '#D0D1E3',
    blueGradient: "linear-gradient(356.84deg, #587AB4 26.82%, #8FC9FB 97.18%);",
    Blue_2: '#5584AC',
    Blue_Theme: '#22577E',
    Grey_1: '#DFDEDE',
    Grey_2: '#F5F5F5',
    Grey_3: '#707070',
    Grey_4: '#808080',
    green: '#2A91A8',
    HOVER_ORANGE: '#FFC18E',
    purple_light: '#F9F9FF',
    YELLOW: '#F6F2D4',
    Card_Gradian: '#13B0DB',
    tealGreen: '#0D9488',
    brightYellow: '#FFD12D',
    CorrectGreen: '#BDFFC8',
    Notification_red: '#FF7D7D',
    cyanBlue: '#CAF2FF',
    lightBlue3: '#95CDFE',
  },
  layout: {
    container: {
      // maxWidth: 1320,
      maxWidth: ['100%', '540px', '720px', '960px', '1140px', '1320px'],
      padding: "0 .75rem",
    },
    Section: { background: "blueGradient", minHeight: "100vh", display: 'flex', alignItems: 'center', },
    Home: { backgroundColor: "colorLight1", alignItems: 'center', paddingTop: 95, paddingBottom: "120px", }
  },
  images: {
    avatar: {
      justifyContent: 'center',
      display: 'flex'
    },
  },
  buttons: {
    primary: {
      fontSize: 15,
      fontWeight: 'heading',
      color: "Blue_2",
      bg: "white",
      borderRadius: 5,
      fontFamily: "Raleway",
      fontWeight: 600,
      lineHeight: "22.5px",
      cursor: "pointer",
      width: 184
    },
    white: {
      fontSize: 4,
      fontWeight: "semiBold",
      color: "Grey_3",
      bg: "white",
      borderRadius: 5,
      fontFamily: "Raleway",
      cursor: "pointer",
      border: "1px solid",
      borderColor: "Grey_1",
    }
  },
  forms: {
    input: {
      color: "Grey_4",
      backgroundColor: "white",
      border: "1px solid",
      borderColor: "Grey_1",
      borderRadius: 4,
      marginBottom: 4,
      padding: 2,
      paddingLeft: "45px",
      fontFamily: "Raleway",
      fontWeight: 600,
      lineHeight: "22.5px",
      fontSize: 15

    },
    PersonalDetailsInput: {
      fontSize: 4,
      fontFamily: 'body',
      fontWeight: "semiBold",
      lineHeight: "27px",
      color: "Grey_3",
      backgroundColor: "white",
      border: "1px solid",
      borderColor: "Grey_1",
      borderRadius: 4,
      marginBottom: 4

    },
    textarea: {
      fontFamily: 'body',
      backgroundColor: "white",
      border: "1px solid ",
      borderRadius: 4,
      padding: 3,
      borderColor: "Grey_1",
    },
    select: {
      fontSize: 4,
      fontFamily: 'body',
      fontWeight: "semiBold",
      lineHeight: "27px",
      fontWeight: 600,
      border: "1px solid ",
      borderColor: "Grey_1",
      borderRadius: 4,
    },
    slider: {
      color: "primary",
    },
    checkbox: {
      color: "#FF9A62"

    },
    radio: {
      color: "Grey_1",
      height: 18,
      width: 18,
    }
  },
  text: {
    bottomText: {
      fontSize: 0,
      fontFamily: 'body',
      color: "Blue_2"
    },
    Nunito11: {
      fontSize: 11,
      fontFamily: 'body',
      lineHeight: "14.45px"
    },
    Nunito12: {
      fontSize: 0,
      fontWeight: 'body',
      fontFamily: 'body',
      lineHeight: "18px"
    },
    Nunito16: {
      fontSize: 3,
      fontWeight: 'body',
      fontFamily: 'body',
      lineHeight: "24px"
    },
    Nunito26Title: {
      fontSize: 26,
      fontWeight: "heading",
      fontFamily: 'body',
      lineHeight: "39px"
    },
    Nunito: {
      fontSize: 3,
      fontWeight: 500,
      fontFamily: 'body',
      lineHeight: "21.02px"
    },
    Heading4: {
      fontSize: 25,
      fontWeight: 500,
      fontFamily: 'body',
      lineHeight: "34.1px"
    },
    Nunito14: {
      fontSize: 1,
      fontFamily: "body",
      fontWeight: 500,
      lineHeight: "21px"
    },
    Nunito18title: {
      fontSize: 4,
      fontFamily: 'body',
      fontWeight: "semiBold",
      lineHeight: "27px"
    },
    RalewayText12: {
      fontSize: 0,
      fontFamily: "Raleway",
      fontWeight: "semiBold",
      lineHeight: "18px"
    },
    Raleway18: {
      fontSize: 4,
      fontFamily: "Raleway",
      fontWeight: "semiBold",
      lineHeight: "27px"
    },
    Raleway18ExtraBold: {
      fontSize: 4,
      fontFamily: "Raleway",
      fontWeight: 800,
      lineHeight: "27px"
    },
    Raleway18Bold: {
      fontSize: 4,
      fontFamily: "Raleway",
      fontWeight: "heading",
      lineHeight: "20px"
    },
    Raleway20Bold: {
      fontSize: 5,
      fontFamily: "Raleway",
      fontWeight: "heading",
      lineHeight: "30px"
    },
    Raleway20: {
      fontSize: 5,
      fontFamily: "Raleway",
      fontWeight: "semiBold",
      lineHeight: "30px"
    },
    Raleway22: {
      fontSize: 6,
      fontFamily: "Raleway",
      fontWeight: "semiBold",
      lineHeight: "30px"
    },
    RalewayTitle: {
      fontSize: 2,
      fontFamily: "Raleway",
      fontWeight: "semiBold",
      lineHeight: "22.5px"
    },
    heading: {
      fontFamily: 'body',
      color: "primary",
      fontSize: 4,
      marginBottom: 4,
      marginTop: 0,

    },
    block: {
      variant: 'paragraph',
      mt: 5,
      lineHeight: "22px",
      color: "colorDark3"
    },
    sliderValue: {
      fontFamily: 'body',
      fontSize: 0,
      padding: 10,
      border: "1px solid #DFDEDE",
      borderRadius: 5,
      marginLeft: 30,
      minWidth: 40,
      height: 38,
      textAlign: "center",
      background: "white",
      color: "Blue_2"
    }
  },
  // Custom styles
  Card: {
    maxWidth: "378px",
    width: ['100%'],
    borderRadius: 5
  },
  TopModules: {
    textAlign: "center",
    height: "100%",
    cursor: "pointer"
  },
  Features: {
    cursor: "pointer",
    padding: 3,
    background: "white",
    boxShadow: "0px 1px 5px rgba(85, 132, 172, 0.2);",
    borderRadius: 10,
    height: "100%"
  },
  NewsFeed: {
    cursor: 'pointer',
    padding: 3,
    background: "linear-gradient(90deg, rgba(34, 87, 126, 0.074) -1.19%, rgba(255, 255, 255, 0) 51.72%), #FBFBFB;",
    boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1);",
    borderRadius: 5,
    height: "100%",
    border: "0.5px solid #ECF6FF;"
  },
  TasksCompleted: {
    padding: 10,
    background: "green",
    boxShadow: "0px 1px 5px rgba(85, 132, 172, 0.2)",
    borderRadius: 5,
    height: "100%",
  },
  BronzeCard: {
    background: "#FFFCF7",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)"
  },
  BronzeCardHeader: {
    background: "linear-gradient(258.2deg, rgba(255, 255, 255, 0.4) 41.4%, rgba(124, 82, 19, 0.4) 78.8%), #E29B2F",
  },
  SilverCard: {
    background: "#F6F6F6",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)"
  },
  SilverCardHeader: {
    background: "linear-gradient(258.28deg, rgba(255, 255, 255, 0.4) 44.06%, rgba(84, 84, 84, 0.4) 78.18%), #D8D8D8",
  },
  DisableCard: {
    background: "#ebebeb",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)"
  },
  DisableCardHeader: {
    background: "linear-gradient(258.28deg,#ebebeb, #ebebeb, #ebebeb",
  },
  GoldCard: {
    background: "#FFFDF7",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)"
  },
  GoldCardHeader: {
    background: "linear-gradient(258.28deg, rgba(255, 255, 255, 0.4) 34.8%, rgba(166, 137, 37, 0.4) 72.38%), #FECE2A"
  },
  MedalBox: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    borderRadius: 5
  },
  CertificatesBox: {
    cursor: 'pointer',
    padding: "12px 20px",
    backgroundColor: "green",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 5
  },
  AccountListItem: {
    marginBottom: 25,
    padding: "8px 10px",
    backgroundColor: "purple_light",
    borderRadius: 5
  },
  PersonalDetails: {
    maxWidth: 410,
    padding: 4,
    marginBottom: 40,
    background: "blueGradient",
    borderRadius: 10
  },
  CompletionRateCard: {
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "white",
    borderRadius: 5
  },
  CompletionRateCardHeader: {
    padding: 17,
    backgroundColor: "Card_Gradian",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5
  },
  AssessmentListCard: {
    padding: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    borderRadius: 5
  },
  AssessmentCardHeader: {
    padding: "16px 16px 8px 16px",
  },
  AlgorithmListCard: {
    cursor: "pointer",
    height: "100%",
    padding: 15,
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.2)",
    backgroundColor: "white",
    borderRadius: 5
  },
  AlgorithmListCardImage: {
    width: 70,
    height: 70,
    backgroundColor: "LightBlue",
    marginTop: -45
  },
  AlgorithmDetailsCard: {
    padding: "11.5px 5px",
    backgroundColor: "LightBlue",
    borderRadius: 4,
    display: "flex",
    border: "1px solid rgba(0,0,0,.125)",
    borderLeft: "4px solid #5584AC",
  },
  CheckboxContainer: {
    padding: "30px 10px",
    backgroundColor: "purple_light",
    borderRadius: 4,
    borderLeft: "4px solid #5584AC",
  },
  AssessmentCardHeading: {
    fontSize: 1, color: "primary", mb: "16px", lineHeight: "19px"
  },
  NutritionOutcomeCardText: {
    fontSize: 3, color: "Blue_2", lineHeight: "24px"
  },
  AssessmentCardActionArea: {
    fontSize: 1,
    lineHeight: "19px",
    fontWeight: 'heading',
    color: 'colorLight1',
  },
  AssessmentResultCard: {
    maxWidth: ["100%", null, null, 410,],
    filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.2))",
  },
  CollapseBox: {
    filter: "drop-shadow(0px 1px 1px rgba(0, 0, 0, 0.2))",
    borderRadius: 8,
    backgroundColor: "white",
  },
  CollapseBoxHeader: {
    borderBottom: "1px solid #DFDEDE",
    padding: "5px 5.5px",
  },
  AssessmentResultCardHeader: {
    borderTopLeftRadius: "8px",
    borderTopRightRadius: "8px",
    backgroundColor: "tealGreen",
    padding: "17.5px 15px 17.5px 15px",
  },
  AssessmentResultCardBody: {
    backgroundColor: "Grey_2",
    padding: "21px 22px 25px 22px",

  },
  AssessmentResultCardFooter: {
    borderBottomLeftRadius: "8px",
    borderBottomRightRadius: "8px",
    backgroundColor: "white",
    padding: "12.5px 12px",
  },
  AssessmentResultCardPoints: {
    borderRadius: "4px",
    backgroundColor: "tealGreen",
    padding: 2,
  },
  AnswerContainer: {
    borderRadius: 40,
    border: "1px solid",
    alignItems: 'center',
  },
  subContainer:
  {
    display: "flex",
    borderRadius: 40,
    height: 35,
    width: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  LearningPageListItem: {
    fontSize: 2, color: "colorDark3", lineHeight: "22px", fontWeight: 'semiBold',
  },
  keyContainer: {
    borderRadius: "5px",
    py: 2,
    px: 3,
    backgroundColor: "primary",
    marginRight: "8px",
    marginBottom: "8px",
    cursor: "pointer"
  },
  chatContainer: {
    borderRadius: "8px",
    py: 3,
    px: "12px",
    backgroundColor: "#30AAB91F",
    alignSelf: 'flex-end',
    alignItems: 'flex-start',
    maxWidth: '80%',
    marginBottom: "10px",
    cursor: "pointer"
  },
  ReferralHealthFacilityCard: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    px: 10,
    py: "5px",
    border: "1px solid #5584AC",
    borderRadius: 5,
  },
  DetailedScoreCard: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
    padding: "10px 25px",
    border: "1px solid #DFDEDE",
  },
  NutritionOutcomeCard: {
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
    borderRadius: 5,
    px: "8px",
    paddingBottom: 23,
    paddingTop: 10,
    border: "1px solid #DFDEDE",
  },
  AssesTBResultCard: {
    border: "1px solid",
    borderRadius: 5
  },
  CertificateCard: {
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
    borderRadius: 5,
    backgroundColor: "white",
  },
  PreviewBox: {
    border: "1px solid #808080",
    backgroundColor: "Grey_2",
    borderRadius: 5,
  },
  FeedBackBox: {
    maxWidth: ["100%"],
    border: "1px solid #F5F5F5",
    borderRadius: 5,
  },
  SearchHealthFacilityBox: {
    backgroundColor: "purple_light",
    borderRadius: 5,
  },
  ScreeningToolBox: {
    backgroundColor: "purple_light",
    borderRadius: 5,
  },
  StepperOption: {
    alignItems: 'center',
    pl: 12,
    pr: 8.5,
    py: "5px",
    backgroundColor: 'white',
    border: "1px solid #DFDEDE",
    borderRadius: 4,
  },
  hr: {
    margin: "8px 0 20px 0",
    opacity: 1,
    backgroundColor: "Grey_2"
  },
  ProfileHr: {
    margin: "5px 0 20px 0",
    opacity: 1,
    backgroundColor: "Grey_2"
  },
  space: [0, 4, 8, 16, 20, 24, 32, 35, 45, 48],
  breakpoints: ['576px', '768px', '992px', '1200px', '1400px'],
  styles: {
    ...bootstrap.styles,
  },
  // styles: {
  //   h1: {
  //     fontFamily: 'body',
  //     fontWeight: 'heading',
  //     lineHeight: 'heading',
  //     fontSize: 5,
  //   },
  // },
  lineBtn: {
    borderWidth: 1,
    borderStyle: "solid",
    padding: 1,
    borderColor: "primary",
    backgroundColor: 'white',
    minWidth: 'auto',
  }
};