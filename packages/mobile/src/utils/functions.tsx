
import { BASE_MEDIA_URL } from '@tb-frontend/shared/globles';
export function getMaterialsUrl(media: any) {
    return BASE_MEDIA_URL + media?.[0]?.id +
        '/' +
        media?.[0]?.file_name;
}
export function getImage(type, icon, imageUrl) {
    return type == 'Screening' ?
        require('../assets/Tools/ScreeningTool.png') :
        type == "Resource Material" ?
            require('../assets/ResourceMaterial.png')
            : type == 'Future Assessment' ?
                require('../assets/Tools/Ass.png')
                : type == 'Flash News' ?
                    require('../assets/blog.png')
                    : type == 'Survey' ?
                        require('../assets/Tools/survey.png')
                        : type == 'Case Definition' ?
                            require('../assets/Tools/CaseDe.png')
                            : type == 'Diagnosis Algorithm' ?
                                require('../assets/Tools/DCC.png')
                                : type == 'Guidance on ADR' ?
                                    require('../assets/Tools/ADR.png')
                                    : type == 'Treatment Algorithm' ?
                                        require('../assets/Tools/TCC.png')
                                        : type == 'Latent TB Infection' ?
                                            require('../assets/Tools/TBPre.png')
                                            : type == 'Differentiated Care Of TB Patients' ?
                                                require('../assets/Tools/DiffCare.png')
                                                : type == 'pdfs' ?
                                                    require('../assets/Tools/pdf.png')
                                                    : type == 'pdf_office_orders' ?
                                                        require('../assets/Tools/pdf.png')
                                                        : type == 'pdf' ?
                                                            require('../assets/Tools/pdf.png')
                                                            : type == 'folder' ?
                                                                require('../assets/Tools/folder.png')
                                                                : type == 'NTEP' ?
                                                                    require('../assets/Tools/ntep.png')
                                                                    : type == 'video' ?
                                                                        require('../assets/Tools/video.png')
                                                                        : type == 'videos' ?
                                                                            require('../assets/Tools/video.png')
                                                                            : type == 'ppt' ?
                                                                                require('../assets/Tools/ppt.png')
                                                                                : type == 'document' ?
                                                                                    require('../assets/Tools/Doc.png')
                                                                                    : type == 'image' ?
                                                                                        require('../assets/Tools/other.png')
                                                                                        : type == 'images' ?
                                                                                            require('../assets/Tools/other.png')
                                                                                            : icon == 'survey' ?
                                                                                                require('../assets/Tools/survey.png')
                                                                                                : icon == 'rating' ?
                                                                                                    require('../assets/Tools/rating.png')
                                                                                                    : icon == 'certi' ?
                                                                                                        require('../assets/Tools/certi.png')
                                                                                                        : icon == 'Ass' ?
                                                                                                            require('../assets/Tools/Ass.png')
                                                                                                            : icon == 'PastAss' ?
                                                                                                                require('../assets/Tools/PastAss.png')
                                                                                                                : icon == 'hospital' ?
                                                                                                                    require('../assets/Tools/hospital.png')
                                                                                                                    : imageUrl ?
                                                                                                                        { uri: BASE_MEDIA_URL + imageUrl }
                                                                                                                        : undefined;

}
