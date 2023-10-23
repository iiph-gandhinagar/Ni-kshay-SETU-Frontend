/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Flex, Heading, Input, Select, Text } from 'theme-ui';
const LabInvestigationCard = ({ item, Answer, onChage }) => {
  return (
    <>
      <Box key={item.key} sx={{}} className="mb-1">
        <Flex sx={{ alignItems: "flex-start" }}>
          <div >
            <img src={item.image} alt="image" sx={{ mr: 4, mt: 4, flex: "0 0 auto" }} />
          </div>
          <div className="flex-fill">
            <Heading sx={{ variant: "NutritionOutcomeCardText", fontWeight: 500 }} className="mb-1">{item.title}</Heading>
            {item.type === 'dropDown' ? (
              <>
                <Select
                  arrow={
                    <Box
                      as="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="19"
                      viewBox="0 0 18 19"
                      fill="none"
                      sx={{
                        ml: -40,
                        alignSelf: 'center',
                        pointerEvents: 'none',
                      }}>
                      <path d="M13.4336 7.1825L12.3761 6.125L8.93359 9.56L5.49109 6.125L4.43359 7.1825L8.93359 11.6825L13.4336 7.1825Z" fill="#808080" />
                    </Box>
                  }
                  autoFocus={true}
                  // disabled={health?.length == 0}
                  onChange={(e) => {

                    onChage(e.target.value, item.id)
                  }}
                  // onBlur={handleBlur}
                  name="subject"
                  value={Answer?.value}
                  defaultValue={-1}
                >
                  <option style={{ backgroundColor: '#ddd' }} disabled value={-1}>{'select'}</option>
                  {item.items?.split(',')?.map((data, id) => {
                    return (
                      <option key={id} value={data}>{data}</option>
                    )
                  })}
                </Select>
                {/* {(Answer?.value == '' || Answer?.value == -1 || Answer?.value == undefined) &&
                  <span className='text-danger'>*Required</span>
                } */}
              </>
            ) : item.type === 'inputRang' ? (
              <>
                <Input sx={{ padding: "15px", marginBottom: 0, height: "49px", backgroundColor: Answer?.value && "#ECF6FF" }}
                  value={Answer?.value}
                  placeholder={'Enter value as 60/90'}
                  inputMode='numeric'
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value.replace(/\s/g, ''));
                    onChage(e.target.value.replace(/\s/g, ''), item.id)
                  }}
                />
                {(Answer?.value == '' || Answer?.value == undefined) ? null
                  // <span className='text-danger'>*Required</span>
                  :

                  !new RegExp(item?.reg).test(Answer?.value)
                    ?
                    <span className='text-danger'>value as 60/190</span>
                    : Answer.score == -1 && <span className='text-danger'>Not valid</span>
                }
              </>
            ) :
              <>
                <Input sx={{ padding: "15px", marginBottom: 0, height: "49px", backgroundColor: Answer?.value && "#ECF6FF" }}
                  value={Answer?.value}
                  inputMode='numeric'
                  onChange={(e) => {
                    console.log("e.target.value", e.target.value.replace(/\s/g, ''));
                    onChage(e.target.value.replace(/\s/g, ''), item.id)
                  }}
                />
                {/* {(Answer?.value == '' || Answer?.value == undefined) &&
                  <span className='text-danger'>*Required</span>
                } */}
              </>
            }
            <Flex sx={{ justifyContent: 'flex-end', alignItems: 'center' }} className="pt-1">
              <Heading variant="RalewayText12" sx={{ color: "Card_Gradian", mb: 0, }}>{item.subtitle}:</Heading>
              <Text variant="Nunito12"
                sx={{ fontWeight: 'normal', color: "Card_Gradian", ml: "7px", mb: 0, lineHeight: "16px", maxWidth: 145 }}>{item.range}</Text>
            </Flex>
          </div>
        </Flex>
      </Box>
    </>
  )
}

export default LabInvestigationCard;