import { BASE_URL } from '@tb-frontend/shared/globles';
import React, { useEffect, useState } from 'react';


import { useSelector } from 'react-redux';
import { Button, Flex, Spinner } from 'theme-ui';
import theme from '../../../theme';


export const SpeakerBtn = ({
    disabled,
    onSpeakerPlay = () => null,
    text = '',
}) => {
    const Svg = () => {
        return <svg width="25" height="25" viewBox="0 0 25 25" fill={play ? theme.colors.primary : theme.colors.gray1} xmlns="http://www.w3.org/2000/svg">
            <path d="M17.4832 9.32596C17.3442 9.14501 17.1426 9.02953 16.9227 9.00492C16.7028 8.98032 16.4826 9.0486 16.3105 9.19475C16.1385 9.34091 16.0287 9.55295 16.0053 9.78425C15.9819 10.0155 16.0468 10.2471 16.1858 10.4281C16.606 11.0289 16.8326 11.7553 16.8326 12.5012C16.8326 13.247 16.606 13.9734 16.1858 14.5742C16.0866 14.7028 16.0242 14.8583 16.0057 15.0226C15.9873 15.187 16.0135 15.3535 16.0815 15.5029C16.1494 15.6522 16.2562 15.7781 16.3895 15.8661C16.5228 15.9541 16.6771 16.0006 16.8345 16C16.9587 16.0004 17.0815 15.9716 17.1938 15.9156C17.306 15.8596 17.4049 15.7778 17.4832 15.6764C18.1429 14.7632 18.5 13.648 18.5 12.5012C18.5 11.3543 18.1429 10.2391 17.4832 9.32596Z" />
            <path d="M19.0279 6.86853C18.9385 6.79854 18.8353 6.74583 18.7242 6.71339C18.6131 6.68096 18.4963 6.66944 18.3805 6.67949C18.2647 6.68954 18.1521 6.72097 18.0492 6.77198C17.9463 6.82299 17.8551 6.89258 17.7807 6.97678C17.7064 7.06098 17.6504 7.15814 17.6159 7.26271C17.5815 7.36728 17.5692 7.47722 17.5799 7.58624C17.5906 7.69527 17.624 7.80124 17.6782 7.89812C17.7323 7.995 17.8063 8.08088 17.8957 8.15087C18.6052 8.66702 19.183 9.32596 19.5871 10.0795C19.9911 10.833 20.2111 11.662 20.2309 12.5058C20.2111 13.3497 19.9911 14.1787 19.5871 14.9322C19.183 15.6857 18.6052 16.3446 17.8957 16.8608C17.8061 16.9307 17.7321 17.0165 17.6778 17.1134C17.6236 17.2103 17.5901 17.3163 17.5795 17.4254C17.5688 17.5344 17.5811 17.6444 17.6156 17.749C17.6501 17.8536 17.7062 17.9507 17.7807 18.0349C17.8639 18.1289 17.968 18.2044 18.0858 18.2563C18.2035 18.3081 18.3319 18.3348 18.4618 18.3346C18.6685 18.335 18.8688 18.2672 19.0279 18.1431C19.9394 17.4723 20.6795 16.6177 21.1939 15.6421C21.7082 14.6665 21.9837 13.5948 22 12.5058C21.9837 11.4168 21.7082 10.3451 21.1939 9.36951C20.6795 8.39394 19.9394 7.53932 19.0279 6.86853ZM14.9236 5.11156C14.7892 5.03848 14.6366 5 14.4814 5C14.3261 5 14.1736 5.03848 14.0391 5.11156L8.30726 8.81702H3.88454C3.64995 8.81702 3.42496 8.90474 3.25908 9.0609C3.09319 9.21706 3 9.42886 3 9.6497V15.3619C3 15.5828 3.09319 15.7946 3.25908 15.9507C3.42496 16.1069 3.64995 16.1946 3.88454 16.1946H8.30726L13.9772 19.8584C14.1275 19.95 14.3024 19.9991 14.4814 20C14.716 20 14.941 19.9123 15.1068 19.7561C15.2727 19.6 15.3659 19.3882 15.3659 19.1673V5.84432C15.3681 5.69619 15.3283 5.55019 15.2505 5.42138C15.1728 5.29257 15.0599 5.18562 14.9236 5.11156ZM13.6234 17.6019L9.08566 14.6708C8.93674 14.5766 8.7609 14.5272 8.58147 14.5292H4.7514V10.4824H8.58147C8.7609 10.4844 8.93674 10.4351 9.08566 10.3408L13.5968 7.42643L13.6234 17.6019Z" />
        </svg>
    }
    const [isload, setload] = useState(false);
    const [play, setPlay] = useState(false);
    const [sound, setSound] = useState(null);
    const appLange = useSelector(state => state?.app?.appLang);
    const token = useSelector(state => state?.auth?.token);
    useEffect(() => {
        onSpeakerPlay(play);
    }, [play]);

    useEffect(() => {
        if (sound) {
            sound.play();
            sound.addEventListener('pause', () => {
                console.log("stop");
                setPlay(false)
                setSound(null)
            })
        }

    }, [sound])

    return (
        <Button
            disabled={play ? play && !sound ? true : false : disabled}
            style={{
                borderColor: play ? theme.colors.primary : theme.colors.gray1,
                opacity: play ? 1 : disabled ? 0.3 : 1,
                marginLeft: "12px",
                alignSelf:'flex-end'
            }}
            onClick={() => {
                if (sound) {
                    sound.pause();
                    sound.addEventListener('pause', () => {
                        console.log("stop");
                        setPlay(false)
                        setSound(null)
                    })
                } else if (!play) {
                    setPlay(true)
                    var requestObj = new Request(`${BASE_URL}get-text-to-speech`, {
                        method: 'POST',
                        headers: {
                            lang: appLange,
                            Authorization: 'Bearer ' + token,
                            'Content-Type': 'application/json',
                        },
                        referrerPolicy: 'no-referrer',
                        body: JSON.stringify({ text: text })
                    });
                    fetch(requestObj).then(function (response) {
                        return response;
                    }).then(async function (outcome) {
                        const blob = await outcome.blob();
                        const url = window.URL.createObjectURL(blob);
                        const audio = new Audio(url);
                        setSound(audio)

                    });
                }

            }}
            variant='lineBtn'>
            {play && !sound ? <Spinner size={25} /> : <Svg />
            }

        </Button>
    );
};

