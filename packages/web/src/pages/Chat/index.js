import { clearChatFlow, getkeywords, pushLoader, pushToChatFlow, searchByKeyword } from '@tb-frontend/shared/Store/action/chatActions';
import React, { useEffect, useState } from 'react';
import { toggleWidget } from 'react-chat-widget';
import { dropMessages, isWidgetOpened, renderCustomComponent, toggleMsgLoader, Widget } from 'react-chat-widget';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button } from 'theme-ui';
import VoiceSearch from '../../components/Modals/VoiceSearch';
import { ChatResCard, QuestionsStaticAdd } from './ChatComponent/newChatCard';
import { AnswerType, ChatLoader, KeywordTypeList, NTEPAnswersType, QuestionsAnswerType, QuestionTypeList, StaticTypeList, TagModuleTypeList } from './ChatComponent/newTypeList';
import { TabFeedBack } from './ChatComponent/TabFeedBack';

const Chat = () => {
  const appTranslations = useSelector(
    state => state?.app?.appTranslations,
  );
  const history = useHistory()
  const userDetails = useSelector(state => state?.user?.userData);
  const dispatch = useDispatch();
  const [session_token, setSession_token] = useState(null);
  const { chatArray } = useSelector(state => state?.chat);
  const handleNewUserMessage = async (newMessage) => {
    await dispatch(
      pushToChatFlow({
        type: 'Answers',
        data: {
          title: newMessage,
        },
        isPop: false,
      }),
    );
    await dispatch(pushLoader());
    await dispatch(searchByKeyword({
      keyword: newMessage,
      token: session_token,
    }));
  };

  const ChatItem = (item, idx, disabled, setDisabled) => {
    if (item) {
      switch (item?.type) {
        case 'KeyWords':
          const show = chatArray?.[chatArray.length - 1] || chatArray?.[chatArray.length - 2];
          return (
            <KeywordTypeList
              session_token={session_token}
              item={item?.data}
              idx={idx}
              show={show?.type === 'KeyWords' && (idx == chatArray.length - 1 || idx == chatArray.length - 2)}
              key={'Keyword-Type-List-' + idx}
            />
          );
        case 'Answers':
          return <AnswerType item={item?.data} idx={idx} />;
        case 'StaticData':
          return <StaticTypeList key={'Static-Data-' + idx} idx={idx} item={item?.data} />;
        case 'tag-Modules':
          return (
            <TagModuleTypeList
              disabled={disabled}
              setDisabled={setDisabled}
              session_token={session_token}
              idx={idx}
              item={item?.data}
              next={item?.data?.next_page_url}
            />
          );

        case 'tag-Modules-static':
          return (
            <React.Fragment>
              {item?.data?.responses && <ChatResCard
                key={'tag-Modules-static-' + idx}
                botTitle={true}
                text={item?.data?.responses}
              />}
              {item?.data?.error && <>
                <ChatResCard
                  key={'tag-Modules-static-' + idx}
                  botTitle={true}
                  noSpeaker
                  text={appTranslations?.CHAT_QUESTIONSTATICADD_SORRY}
                  noBottomWidth
                />
                <ChatResCard
                  key={'TagModule-Contact-us-static-add-' + idx}
                  isLink={true}
                  noBottomWidth
                  noSpeaker
                  text={appTranslations.CHAT_QUESTIONSTATICADD_CONTACT}
                  onClick={async () => {
                    toggleWidget();
                    history.push('/ContactUs');
                  }}
                />

                <ChatResCard
                  key={'TagModule-Back_to_main_topics-static-add-' + idx}
                  isLink={true}
                  noBottomWidth={false}
                  noSpeaker
                  text={appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS}
                  onClick={async () => {
                    await dispatch(
                      pushToChatFlow({
                        type: 'Answers',
                        data: {
                          title: appTranslations.CHAT_QUESTIONSTATICADD_BACK_TO_TOPICS,
                        },
                        isPop: true,
                      }),
                    );
                    await dispatch(pushLoader());
                    await dispatch(getkeywords(session_token));
                  }}
                />
              </>}
              {item?.data?.activity_id ?
                <TabFeedBack
                  key={'tag-Modules-static-feedback-' + idx + '-' + item?.data?.activity_id}
                  id={item?.data?.activity_id}
                  question_id={0}
                  tag_id={item?.data?.id}
                /> : null}
            </React.Fragment>
          );
        case 'QuestionAnswers':
          return <QuestionsAnswerType
            disabled={disabled}
            setDisabled={setDisabled}
            session_token={session_token} idx={idx} item={item?.data} />;
        case 'Loader':
          return <ChatLoader idx={idx} />;
        case 'QuestionsStaticAdd':
          return (
            <QuestionsStaticAdd
              session_token={session_token}
              idx={idx}
              length={item?.data?.data?.length}
              item={item?.data}
            />
          );
        case 'Questions':
          return (
            <TagModuleTypeList
              disabled={disabled}
              setDisabled={setDisabled}
              session_token={session_token}
              idx={idx}
              item={item?.data}
              // noFeedback={true}
              next={item?.data?.next_page_url}
            />
          );
        case 'NTEPAnswers':
          return (
            <NTEPAnswersType
              idx={idx}
              item={item?.data}
              disabled={disabled}
              setDisabled={setDisabled}
              session_token={session_token}
            />
          );
        default:
          return null;
      }
    }
  };
  const CustomComponent = () => {
    const [disabled, setDisabled] = useState(false);
    const [modal, setModal] = useState(false);
    return (
      <div key='CustomComponent'>
        {chatArray?.map((item, index) => {
          return ChatItem(item, index, disabled, x => setDisabled(x));
        })}
        <Button onClick={() => setModal(true)} variant='lineBtn' sx={{
          position: 'absolute',
          bottom: 1,
          right: 40
        }}>
          <svg width="26" height="25" viewBox="0 0 26 25" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.2931 16.8887C16.2026 16.8887 18.5152 14.5637 18.5152 11.6387V5.63867C18.5152 2.71367 16.2026 0.388672 13.2931 0.388672C10.3836 0.388672 8.07092 2.71367 8.07092 5.63867V11.6387C8.07092 14.5637 10.3836 16.8887 13.2931 16.8887ZM9.56297 5.63867C9.56297 3.53867 11.2042 1.88867 13.2931 1.88867C15.3819 1.88867 17.0232 3.53867 17.0232 5.63867V11.6387C17.0232 13.7387 15.3819 15.3887 13.2931 15.3887C11.2042 15.3887 9.56297 13.7387 9.56297 11.6387V5.63867Z" fill="#AAAAAA" stroke="#AAAAAA" strokeWidth="0.5" />
            <path d="M22.2453 11.6387H20.7533C20.7533 15.7637 17.3962 19.1387 13.2931 19.1387C9.18996 19.1387 5.83286 15.7637 5.83286 11.6387H4.34082C4.34082 16.3637 7.92172 20.1887 12.5471 20.5637V22.8887H10.309C9.86138 22.8887 9.56297 23.1887 9.56297 23.6387C9.56297 24.0887 9.86138 24.3887 10.309 24.3887H16.2772C16.7248 24.3887 17.0232 24.0887 17.0232 23.6387C17.0232 23.1887 16.7248 22.8887 16.2772 22.8887H14.0391V20.5637C18.6644 20.1887 22.2453 16.3637 22.2453 11.6387Z" fill="#AAAAAA" stroke="#AAAAAA" strokeWidth="0.5" />
          </svg>
        </Button>
        <VoiceSearch isOpen={modal} closeModal={setModal} onOk={(text) => {
          handleNewUserMessage(text)
          setModal(false)
        }} />
      </div>

    )
  }

  const CustomLauncher = (handleToggle) => {
    return (
      isWidgetOpened() ?
        <button type="button" className="rcw-launcher rcw-hide-sm" aria-controls="rcw-chat-container" onClick={handleToggle}>
          <img src={"images/x.svg"} className="rcw-close-launcher" alt="Open chat" style={{ width: "35px" }} />
        </button>
        :
        <button type="button" className="rcw-launcher" aria-controls="rcw-chat-container" onClick={handleToggle}>
          <div id="animated-example" className="animated tada">
            <img src={"images/bot.svg"} className="rcw-open-launcher" alt="Close chat" style={{ width: "35px" }} />
          </div>
        </button>

    )
  }
  useEffect(() => {
    dropMessages();
    renderCustomComponent(CustomComponent, chatArray)
  }, [chatArray])
  useEffect(() => {
    if (userDetails?.[0]?.id) {
      setSession_token(`${userDetails?.[0]?.id}-${new Date().toISOString()}`);
      dispatch(getkeywords(`${userDetails?.[0]?.id}-${new Date().toISOString()}`));
    }

  }, [userDetails?.[0]?.id])
  return (
    <div>
      <Widget
        handleNewUserMessage={handleNewUserMessage}
        subtitle=""
        launcher={handleToggle => CustomLauncher(handleToggle)}
        title={appTranslations?.BOT_SHORT_NAME}
      />
    </div>
  );
}

export default Chat;
