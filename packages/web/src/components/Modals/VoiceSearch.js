import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'react-responsive-modal';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { Button, Flex } from 'theme-ui';
const VoiceSearch = ({ isOpen, closeModal, onOk, }) => {
    const appLange = useSelector(state => state?.app?.appLang);
    const {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();
    useEffect(() => {
        if (browserSupportsSpeechRecognition && isOpen) {
            SpeechRecognition.startListening({ language: appLange == 'gu' ? 'gu-IN' : appLange == 'hi' ? "hi-IN" : "en-IN" })
        }
    }, [isOpen])

    return (
        <Modal showCloseIcon={false} closeOnEsc={true} closeOnOverlayClick={true} open={isOpen} onClose={closeModal} center>
            {!browserSupportsSpeechRecognition ?
                <React.Fragment>
                    <div className="mt-3 mb-3 d-flex justify-content-center " >
                        Browser doesn't support speech recognition.
                    </div>
                    <Flex sx={{ justifyContent: 'center' }}>
                        <Button onClick={closeModal} px={4} py={3} mr={4} sx={{ overflow: 'hidden' }} variant="primary" className="btn-white"
                        >{"Close"}</Button>

                    </Flex>
                </React.Fragment> :
                <React.Fragment>
                    <div className="mt-3 mb-3 d-flex justify-content-center" >
                        <svg className='pointer' onClick={() => {
                            if (listening) {
                                SpeechRecognition.stopListening()
                            }
                            else {
                                SpeechRecognition.startListening({ language: appLange == 'gu' ? 'gu-IN' : appLange == 'hi' ? "hi-IN" : "en-IN"  })
                            }
                        }} width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.2931 16.8887C16.2026 16.8887 18.5152 14.5637 18.5152 11.6387V5.63867C18.5152 2.71367 16.2026 0.388672 13.2931 0.388672C10.3836 0.388672 8.07092 2.71367 8.07092 5.63867V11.6387C8.07092 14.5637 10.3836 16.8887 13.2931 16.8887ZM9.56297 5.63867C9.56297 3.53867 11.2042 1.88867 13.2931 1.88867C15.3819 1.88867 17.0232 3.53867 17.0232 5.63867V11.6387C17.0232 13.7387 15.3819 15.3887 13.2931 15.3887C11.2042 15.3887 9.56297 13.7387 9.56297 11.6387V5.63867Z"
                                fill={listening ? 'red' : '#AAA'} stroke={listening ? 'red' : '#AAA'} strokeWidth="0.5" />
                            <path d="M22.2453 11.6387H20.7533C20.7533 15.7637 17.3962 19.1387 13.2931 19.1387C9.18996 19.1387 5.83286 15.7637 5.83286 11.6387H4.34082C4.34082 16.3637 7.92172 20.1887 12.5471 20.5637V22.8887H10.309C9.86138 22.8887 9.56297 23.1887 9.56297 23.6387C9.56297 24.0887 9.86138 24.3887 10.309 24.3887H16.2772C16.7248 24.3887 17.0232 24.0887 17.0232 23.6387C17.0232 23.1887 16.7248 22.8887 16.2772 22.8887H14.0391V20.5637C18.6644 20.1887 22.2453 16.3637 22.2453 11.6387Z"
                                fill={listening ? 'red' : '#AAA'} stroke={listening ? 'red' : '#AAA'} strokeWidth="0.5" />
                        </svg>
                    </div>
                    <div className="mt-3 mb-3 d-flex justify-content-center " >
                        {transcript}
                    </div>
                    <Flex sx={{ justifyContent: 'center' }}>
                        <Button onClick={resetTranscript} px={4} py={3} mr={4} sx={{ overflow: 'hidden' }} variant="white" className="btn-white">{"Reset"}</Button>
                        <Button onClick={() => {
                            closeModal();
                            resetTranscript();
                            SpeechRecognition.stopListening();
                        }} px={4} py={3} mr={4} sx={{ overflow: 'hidden' }} variant="primary" className="btn-white"
                        >{"Cancel"}</Button>

                        <Button disabled={transcript?.length < 1} onClick={() => {
                            onOk(transcript);
                            resetTranscript();
                        }} px={4} py={3} sx={{ overflow: 'hidden' }} variant="white" className="btn-white">{"Ok"}</Button>
                    </Flex>
                </React.Fragment>
            }
        </Modal>
    )
}

export default VoiceSearch;