import * as React from 'react';
import TitleTag from '../components/TitleTag';
import { render } from '../utils/test-utils';
import Features from '../components/home/Features';
import TopModules from '../components/home/TopModules';
import NewsFeed from '../components/home/NewsFeed';
import SimilarApplications from '../components/home/SimilarApplications';
import RecentlyAdded from '../components/home/RecentlyAdded';
import { Button, Heading } from 'theme-ui';
import CustomModal from '../components/Modals/CustomModal';
import PartnersAndDevelopers from '../pages/PartnersAndDevelopers';
import MasterSearchTabs from '../components/MasterSearchTabs';
import FeedBack from '../pages/FeedBack';
import RatingCard from '../components/RatingCard';
import { ChatLoader, NTEPAnswersType, QuestionsAnswerType, TagModuleTypeList } from '../pages/Chat/ChatComponent/newTypeList';
import VoiceSearch from '../components/Modals/VoiceSearch';
import { AlgorithmNameCard } from '../components/AlgorithmDetailsCard';
import AccountListItem from '../components/Account/AccountListItem';


describe('* All HomePage Component Testing', () => {
    it('renders TopModules component', () => {
        render(<TopModules />);
    });

    it('renders Features component', () => {
        render(<Features />);
    });

    it('renders NewsFeed component', () => {
        render(<NewsFeed />);
    });

    it('renders SimilarApplications component', () => {
        render(<SimilarApplications />);
    });

    it('renders TitleTag component', () => {
        render(<RecentlyAdded />);
    });
});

describe('* All LoginPage Component Testing', () => {
    it('renders loginButton component', () => {
        render(<Button py={10} type="submit" onClick={() => undefined} mb={4} >Log In</Button>);
    });

    it('renders TitleTag component', () => {
        render(<TitleTag title={'AccountListItem'} />);
    });
});


describe('* All SignUpPage Component Testing', () => {
    it('renders Heading component', () => {
        render(<Heading>tested</Heading>);
    });

    it('renders PartnersAndDevelopers component', () => {
        render(<PartnersAndDevelopers />);
    });

    it('renders TitleTag component', () => {
        render(<CustomModal isOpen={true}><h1>hiii</h1></CustomModal >);
    });
});

describe('* MasterSearchTabs Component Testing', () => {

    it('renders MasterSearchTabs component', () => {
        render(<MasterSearchTabs search={'search'} />
        );
    });
});

describe('* FeedBack Component Testing', () => {

    it('renders FeedBack component', () => {
        render(<FeedBack />
        );
    });
    it('renders RatingCard component', () => {
        render(<RatingCard title={'title'} Descriptions={'des'} ImgSrc={undefined} onSetRating={() => undefined} value={2} />
        );
    });
});


describe('* Chat Component Testing', () => {

    it('renders QuestionsAnswerType component', () => {
        render(<QuestionsAnswerType
            disabled={false}
            setDisabled={() => undefined}
            session_token={'session_token'} idx={'idx'} item={[1, 2, 2]} />
        );
    });
    it('renders RatingCard component', () => {
        render(<ChatLoader idx={'idx'} />
        );
    });

    it('renders TagModuleTypeList component', () => {
        render(<TagModuleTypeList
            disabled={false}
            setDisabled={() => undefined}
            session_token={'session_token'}
            idx={'idx'}
            item={[1, 2, 4]}
            // noFeedback={true}
            next={'item?.data?.next_page_url'}
        />
        );
    });
    it('renders NTEPAnswersType component', () => {
        render(<NTEPAnswersType
            disabled={false}
            setDisabled={() => undefined}
            session_token={'session_token'}
            idx={'idx'}
            item={[1, 2, 4]}
            // noFeedback={true}
            next={'item?.data?.next_page_url'}
        />
        );
    });

    // it('renders NTEPAnswersType component', () => {
    //     render(<VoiceSearch isOpen={true} closeModal={() => undefined} onOk={(text) => { undefined }} />
    //     );
    // });

    it('renders AlgorithmNameCard component', () => {
        render(<AlgorithmNameCard key={'i'} title={'item.title'} />
        );
    });
});



describe('* AccountPage Component Testing', () => {

    it('renders AccountListItem component', () => {
        render(
            <AccountListItem title={'Edit Personal Details'} onClick={() => undefined} />
        );
    });

    it('renders Heading component', () => {
        render(
            <Heading variant="Nunito11" sx={{ color: "Grey_3" }} className="mt-2">Support</Heading>
        );
    });
});
