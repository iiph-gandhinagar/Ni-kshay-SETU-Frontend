import { BASE_MEDIA_URL } from "@tb-frontend/shared/globles";
export const getMaterialsLink = (status, item, parent_id) => {
  if (status === 'videos') {
    let videoUrl = item?.media.filter(
      e => e.mime_type === 'video/mp4' || e.mime_type === 'video/x-m4v' || e.mime_type === 'video/WMV' || e.mime_type === 'video/MOV' || e.mime_type === 'video/m4a' | e.mime_type === 'video/m4v')
    if (videoUrl.length == 0) {
      return null
    }
    return (
      BASE_MEDIA_URL +
      videoUrl[0]?.id +
      '/' +
      videoUrl[0]?.file_name)
  }
  if (status === 'ppt') {
    let pptUrl = item?.media.filter(
      e => e.mime_type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
    if (pptUrl.length == 0) {
      return null
    }
    return (
      BASE_MEDIA_URL +
      pptUrl[0]?.id +
      '/' +
      pptUrl[0]?.file_name)
  }
  if (status === 'document') {
    let documentUrl = item?.media.filter(
      e => e.mime_type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
    if (documentUrl.length == 0) {
      return null
    }
    return (
      BASE_MEDIA_URL +
      documentUrl[0]?.id +
      '/' +
      documentUrl[0]?.file_name)
  }
  if (status === 'images') {
    let othersUrl = item?.media.filter(
      e => e.mime_type === 'image/jpeg' || e.mime_type === 'image/png' || e.mime_type === 'image/jpg')
    if (othersUrl.length == 0) {
      return null
    }
    return (
      BASE_MEDIA_URL +
      othersUrl[0]?.id +
      '/' +
      othersUrl[0]?.file_name)
  }
  if (status === 'pdfs' || status === 'pdf_office_orders') {
    let pdfUrl = item?.media.filter(
      e => e.mime_type === 'application/pdf',
    )
    if (pdfUrl.length == 0) {
      return null
    }
    return (
      BASE_MEDIA_URL +
      pdfUrl[0]?.id +
      '/' +
      pdfUrl[0]?.file_name)
  }
  if (status == 'folder') {
    return "/ResourceMaterials/Material?name=" + item?.title + '&&type=' + item?.id + "&&parent_id=" + parent_id;
  }
  return null;
}
export function getMaterialsUrl(media) {
  return BASE_MEDIA_URL + media?.[0]?.id +
    '/' +
    media?.[0]?.file_name;
}
export function getImage(type, icon, imageUrl) {
  return type == 'Screening' ?
    'images/Tools/ScreeningTool.png'
    : type == 'Case Definition' ?
      "images/Tools/CaseDe.png"
      : type == 'Diagnosis Algorithm' ?
        "images/Tools/DiffCare.png"
        : type == 'Guidance on ADR' ?
          "images/Tools/ADR.png"
          : type == 'Treatment Algorithm' ?
            "images/Tools/TCC.png"
            : type == 'Latent TB Infection' ?
              'images/Tools/TBPre.png'
              : type == 'Differentiated Care Of TB Patients' ?
                'images/Tools/DiffCare.png'
                : type == 'pdfs' ?
                  "/images/Tools/pdf.png"
                  : type == 'pdf_office_orders' ?
                    "/images/Tools/pdf.png"
                    : type == 'pdf' ?
                      "/images/Tools/pdf.png"
                      : type == 'folder' ?
                        "/images/Tools/folder.png"
                        : type == 'NTEP' ?
                          '/images/Tools/ntep.png'
                          : type == 'video' ?
                            "images/Tools/video.png"
                            : type == 'videos' ?
                              "/images/Tools/video.png"
                              : type == 'ppt' ?
                                '/images/Tools/ppt.png'
                                : type == 'document' ?
                                  '/images/Tools/Doc.png'
                                  : type == 'image' ?
                                    "/images/Tools/other.png"
                                    : type == 'images' ?
                                      "/images/Tools/other.png"
                                      : icon == 'survey' ?
                                        'images/Tools/survey.png'
                                        : icon == 'rating' ?
                                          'images/Tools/rating.png'
                                          : icon == 'certi' ?
                                            'images/Tools/certi.png'
                                            : icon == 'Ass' ?
                                              'images/Tools/Ass.png'
                                              : icon == 'PastAss' ?
                                                'images/Tools/PastAss.png'
                                                : icon == 'hospital' ?
                                                  'images/Tools/hospital.png'
                                                  : imageUrl ?
                                                    BASE_MEDIA_URL + imageUrl
                                                    : undefined;

}