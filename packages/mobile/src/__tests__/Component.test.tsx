import React from 'react';
import { renderWithProviders } from '../utils/test-utils';
import { LabInvestigationCard } from '../components/LabInvestigation/LabInvestigationCard';
import { ProfileConatainer } from '../components/core/ProfileConatainer';
import { AccountListItem } from '../components/core/AccountListItem';
import { LogoContainer } from '../components/LogoContainer';
import { SearchHeader } from '../components/SearchHeader';
import { LevelInfoCard } from '../components/LevelInfoCard';


test('renders LabInvestigationCard component without errors', () => {
    renderWithProviders(<LabInvestigationCard />);
});

test('renders ProfileConatainer without errors', () => {
    renderWithProviders(<ProfileConatainer
        ShowAppPerformance={false}
    />);
});
test('renders AccountListItem without errors', () => {
    renderWithProviders(<AccountListItem title={'CHANGE_APPLICATION_LANG'} onPress={() => undefined} />
    );
});


// test('renders CertificateComponent without errors', () => {
//     renderWithProviders(<CertificateComponent title={'CHANGE_APPLICATION_LANG'} />
//     );
// });

// test('renders SpeakerBtn without errors', () => {
//     renderWithProviders(<SpeakerBtn disabled={false} onSpeakerPlay={() => undefined} text="spbtn" />
//     );
// });

test('renders LogoContainer without errors', () => {
    renderWithProviders(<LogoContainer />
    );
});

// test('renders LangComponent component without errors', () => {
//     renderWithProviders(<LangComponent isSelected={true} title="guj" onPress={() => undefined} subTitle="gujsub" />);
// });

test('renders SearchHeader component without errors', () => {
    renderWithProviders(<SearchHeader onClickSorting={() => undefined} />);
});

test('renders LevelInfoCard component without errors', () => {
    renderWithProviders(<LevelInfoCard />);
});






