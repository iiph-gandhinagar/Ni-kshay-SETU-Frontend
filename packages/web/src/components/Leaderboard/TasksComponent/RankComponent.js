/** @jsxImportSource theme-ui */
import { useSelector } from 'react-redux';
import { Box, Flex, Heading, Text } from 'theme-ui';
const RankComponent = ({
  medalImg,
  DisableImg,
  isDisable,
  isBronze,
  isSilver,
  badgeName,
  TAO,
  AO,
  TRMU,
  RMU,
  TCBU,
  CBU,
  TSMV,
  SMV,
  TMS,
  MS,
}) => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,);
  return (
    <div className="col-md-4 mb-3 mb-md-0">
      <Box className="level-cards card text-white mb-3" variant={
        isDisable
          ? "DisableCard"
          : isBronze
            ? "BronzeCard"
            : isSilver
              ? "SilverCard"
              : "GoldCard"

      } >
        <Box className="card-header" variant={
          isDisable
            ? "DisableCardHeader"
            : isBronze
              ? "BronzeCardHeader"
              : isSilver
                ? "SilverCardHeader"
                : "GoldCardHeader"
        }>
          <Heading variant="Raleway18" sx={{ color: isDisable ? "gray" : "white" }}>{badgeName}</Heading>
          {isDisable ?
            <img style={{}} src={DisableImg} alt="Medal" sx={{ width: 65 }} className="medal" /> :
            <img style={{}} src={medalImg} alt="Medal" sx={{ width: 65 }} className="medal" />
          }
        </Box>
        <div className="card-body">
          <Heading variant="RalewayTitle" sx={{ color: "Blue_Theme" }} className="mb-2">{appTranslations?.TASKS}</Heading>
          <div className="mx-2">
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Grey_3" }}>{appTranslations?.APP_OPENED}:</Text>
              <Text variant="Nunito14" sx={{ color: "Blue_2" }}>{AO} / {TAO}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Grey_3" }}>  {appTranslations?.RESOURCE_MATERIAL_USAGE}:</Text>
              <Text variant="Nunito14" sx={{ color: "Blue_2" }}> {RMU} / {TRMU}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Grey_3" }}>{appTranslations?.CHATBOT_USAGE}:</Text>
              <Text variant="Nunito14" sx={{ color: "Blue_2" }}> {CBU} / {TCBU}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Grey_3" }}>{appTranslations?.SUB_MODULE_VISITED}:</Text>
              <Text variant="Nunito14" sx={{ color: "Blue_2" }}>{SMV} / {TSMV}</Text>
            </Flex>
            <Flex sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
              <Text variant="Nunito14" sx={{ color: "Grey_3" }}>{appTranslations?.MINUTES_SPENT}:</Text>
              <Text variant="Nunito14" sx={{ color: "Blue_2" }}>{MS} / {TMS}</Text>
            </Flex>
          </div>
        </div>
      </Box>
    </div>
  );
}
export default RankComponent;