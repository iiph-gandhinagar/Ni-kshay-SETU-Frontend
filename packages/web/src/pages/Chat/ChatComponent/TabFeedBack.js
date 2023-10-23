import { sendFeedback } from "@tb-frontend/shared/Store/action/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { Button, Flex } from "theme-ui";
import theme from "../../../theme";


export const TabFeedBack = ({
    id,
    question_id,
    tag_id,
    idx
}) => {
    const dispatch = useDispatch();
    const { feedBackArray } = useSelector(state => state?.chat);
    const onClick = async (activity_id, question_id, tag_id, like, dislike) => {
        dispatch(
            sendFeedback({
                activity_id: activity_id,
                question_id: question_id,
                tag_id: tag_id,
                like: like,
                dislike: dislike,
            }),
        );
    };
    let feedback = feedBackArray?.find(e => e?.activity_id === id) 
    return (
        <Flex sx={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            maxWidth: '90%',
            flex: 1,
            marginLeft: "24px",
            marginBottom: "18px",
        }}>
            <Button
                disabled={feedback?.activity_id}
                onClick={() => {
                    onClick(id, question_id, tag_id, 1, 0);
                }}
                style={{
                    borderColor: feedback?.dislike
                        ? theme.colors.gray1
                        : theme.colors.success,
                }}
                sx={{
                    paddingHorizontal: '8px',
                    paddingVertical: '3px',
                    borderRadius: '5px',
                    marginRight: '7px',

                }}
                variant='lineBtn'
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill={feedback?.dislike ? theme.colors.gray1 : theme.colors.success} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd"
                        d="M6.30387 0.996163C6.40418 0.770458 6.62801 0.625 6.875 0.625C7.53804 0.625 8.17393 0.888392 8.64277 1.35723C9.11161 1.82607 9.375 2.46196 9.375 3.125V5H12.2843C12.5548 4.9975 12.8226 5.05354 13.0694 5.16431C13.3174 5.2756 13.5382 5.43948 13.7165 5.64458C13.8949 5.84969 14.0265 6.09112 14.1023 6.35215C14.1781 6.61318 14.1962 6.88756 14.1554 7.15629L13.2929 12.7812C13.2929 12.7814 13.293 12.781 13.2929 12.7812C13.225 13.2281 12.9979 13.6359 12.6535 13.9287C12.3099 14.2208 11.8726 14.3792 11.4218 14.375H2.5C2.00272 14.375 1.52581 14.1775 1.17417 13.8258C0.822544 13.4742 0.625 12.9973 0.625 12.5V8.125C0.625 7.62772 0.822544 7.1508 1.17417 6.79917C1.52581 6.44754 2.00272 6.25 2.5 6.25H3.96883L6.30387 0.996163ZM3.75 7.5H2.5C2.33424 7.5 2.17527 7.56585 2.05806 7.68306C1.94085 7.80027 1.875 7.95924 1.875 8.125V12.5C1.875 12.6658 1.94085 12.8247 2.05806 12.9419C2.17527 13.0592 2.33424 13.125 2.5 13.125H3.75V7.5ZM5 13.125H11.4321C11.5828 13.1267 11.7291 13.0739 11.8439 12.9763C11.9588 12.8787 12.0345 12.7428 12.0571 12.5938L12.9196 6.96871C12.9196 6.96863 12.9196 6.96879 12.9196 6.96871C12.9331 6.87921 12.9271 6.78759 12.9019 6.70066C12.8766 6.61365 12.8327 6.53318 12.7733 6.46481C12.7138 6.39644 12.6402 6.34181 12.5576 6.30471C12.4749 6.26762 12.3852 6.24893 12.2946 6.24996L12.2875 6.25004L8.75 6.25C8.40482 6.25 8.125 5.97018 8.125 5.625V3.125C8.125 2.79348 7.9933 2.47554 7.75888 2.24112C7.61648 2.09871 7.44326 1.99422 7.25489 1.93412L5 7.00763V13.125Z"
                        fill={feedback?.dislike ? theme.colors.gray1 : theme.colors.success} />
                </svg>

            </Button>
            <Button
                disabled={feedback?.activity_id}
                style={{
                    borderColor: feedback?.like
                        ? theme.colors.gray1
                        : theme.colors.error,
                }}
                sx={{
                    paddingHorizontal: '8px',
                    paddingVertical: '3px',
                    borderRadius: '5px',
                    marginRight: '7px',

                }}
                onClick={() => {
                    onClick(id, question_id, tag_id, 0, 1);
                }} variant='lineBtn'>
                <svg width="15" height="15" viewBox="0 0 15 15" fill={feedback?.like ? theme.colors.gray1 : theme.colors.error} xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12.8525 2.07249C12.7003 1.94181 12.5054 1.87158 12.3048 1.87513L12.2937 1.87523H11.25V7.50023H12.2937L12.3048 7.50032C12.5054 7.50387 12.7003 7.43364 12.8525 7.30297C12.9956 7.18016 13.0916 7.01201 13.125 6.82719V2.54827C13.0916 2.36344 12.9956 2.19529 12.8525 2.07249ZM9.99996 7.99259L7.74506 13.0661C7.5567 13.006 7.38348 12.9015 7.24108 12.7591C7.00665 12.5247 6.87496 12.2067 6.87496 11.8752V9.37523C6.87496 9.03005 6.59514 8.75023 6.24996 8.75023H2.71246L2.70538 8.75027C2.61478 8.75129 2.52505 8.73261 2.44239 8.69551C2.35973 8.65841 2.28613 8.60379 2.22668 8.53542C2.16722 8.46705 2.12335 8.38657 2.09809 8.29956C2.07286 8.21267 2.0668 8.12134 2.08033 8.03187C2.08031 8.03199 2.08034 8.03175 2.08033 8.03187L2.94289 2.40644C2.96549 2.2574 3.04119 2.12156 3.15605 2.02393C3.2709 1.92631 3.41717 1.87348 3.56789 1.87519L9.99996 1.87523V7.99259ZM12.2887 0.625226C12.7934 0.617768 13.2835 0.795118 13.6667 1.12399C14.0513 1.45417 14.3014 1.91409 14.3693 2.41645C14.3731 2.44422 14.375 2.47221 14.375 2.50023V6.87523C14.375 6.90325 14.3731 6.93124 14.3693 6.959C14.3014 7.46136 14.0513 7.92128 13.6667 8.25146C13.2835 8.58033 12.7934 8.75768 12.2887 8.75023H11.0311L8.69609 14.0041C8.59578 14.2298 8.37195 14.3752 8.12496 14.3752C7.46192 14.3752 6.82603 14.1118 6.35719 13.643C5.88835 13.1742 5.62496 12.5383 5.62496 11.8752V10.0002H2.71565C2.44518 10.0027 2.17736 9.94668 1.93056 9.83592C1.68259 9.72463 1.46177 9.56075 1.28342 9.35564C1.10506 9.15053 0.973437 8.9091 0.897654 8.64808C0.821872 8.38705 0.803747 8.11266 0.844535 7.84394L1.70702 2.21902C1.70705 2.21883 1.70699 2.2192 1.70702 2.21902C1.77493 1.77214 2.00207 1.36426 2.34649 1.07151C2.69006 0.779476 3.12733 0.621064 3.57813 0.625226H12.2887Z"
                        fill={feedback?.like ? theme.colors.gray1 : theme.colors.error} />
                </svg>
            </Button>
        </Flex>
    );
};