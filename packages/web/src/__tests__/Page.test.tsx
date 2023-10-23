import * as React from 'react';
import { render } from '../utils/test-utils';
import RecentlyAdded from '../components/home/RecentlyAdded';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import VerifyMobileNumber from '../pages/VerifyMobileNumber';
import VerifyOtpPassword from '../pages/VerifyOtpPassword';
import Home from '../pages/Home';
import ApplicationLanguage from '../pages/ApplicationLanguage';
import SurveyForm from '../pages/SurveyForm';
import Screening from '../pages/Screening';
import ResourceMaterials from '../pages/ResourceMaterials';
import ReferralHealthFacility from '../pages/ReferralHealthFacility';
import LaboratoryInvestigation from '../pages/LaboratoryInvestigation';
import Certificates from '../pages/Certificates';
import Assessment from '../pages/Assessment/Assessment';
import Algorithms from '../pages/Algorithms';
import Account from '../pages/Account/Account';


describe('* All Page Testing', () => {

    it('Home Page render', () => {
        render(<Home />);
    });

    it('SignUp Page render', () => {
        render(<Signup />);
    });

    it('ApplicationLanguage Page', () => {
        render(<ApplicationLanguage />);
    });

    it('SurveyForm Page', () => {
        render(<SurveyForm />);
    });

    // it('Screening Page', () => {
    //     render(<Screening />);
    // });

    // it('ResourceMaterials Page', () => {
    //     render(<ResourceMaterials />);
    // });

    // it('ReferralHealthFacility Page', () => {
    //     render(<ReferralHealthFacility />);
    // });

    // it('LaboratoryInvestigation Page', () => {
    //     render(<LaboratoryInvestigation />);
    // });

    // it('Certificates Page', () => {
    //     render(<Certificates />);
    // });   

    // it('Certificates Page', () => {
    //     render(<Assessment />);
    // });

    // it('Algorithms Page', () => {
    //     render(<Algorithms />);
    // });

    // it('Account Page', () => {
    //     render(<Account />);
    // });




});
