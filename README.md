<p align="center">
<a href="https://app.nikshay-setu.in/images/Logo.svg" target="_blank">
<img src="https://app.nikshay-setu.in/images/Logo.svg" width="400">
</a>
</p>


<div align="center">

  ![Static Badge](https://img.shields.io/badge/Subscribers-40K-green)
  ![Static Badge](https://img.shields.io/badge/Licence-GPL%203.0-blue)

</div>

# Ni-kshay Setu | Support to End TUberculosis

The Ni-kshay Setu app (https://nikshay-setu.in/), already with 40K subscribers, empowers healthcare providers to make informed decisions and contributes to India's mission to combat tuberculosis. Available on web, Android, and iOS platforms in 8 languages, it offers real-time updates, interactive modules, and personalized insights, revolutionizing TB knowledge management and accessibility across India

## Table of Contents

1. Introduction
2. Features
3. Technologies Used
4. System Requirements
5. Installation
6. Usage
7. Contribution Guidelines
8. License

## 1. Introduction

Ni-kshay Setu is a groundbreaking digital solution available as a web application, Android application, and iOS application. With a mission to support healthcare providers in decision-making and transform knowledge into empowerment, this innovative and interactive learning tool is a catalyst in India's journey towards a TB-free nation.
As a comprehensive digital platform, Ni-kshay Setu revolutionizes the way healthcare providers approach TB management. By leveraging cutting-edge technology, it empowers medical professionals with real-time support and evidence-based recommendations, ensuring they have the most up-to-date information at their fingertips.
With an intuitive interface and user-friendly design, Ni-kshay Setu offers a seamless experience across devices, making it accessible to a wide range of users. The web application allows healthcare providers to access the platform from any computer, while the Android and iOS applications provide mobility and convenience for on-the-go professionals.
Through a range of interactive modules, virtual simulations, and case studies, Ni-kshay Setu transforms learning into a dynamic and engaging experience. Healthcare providers can enhance their knowledge and skills by practicing TB case management in a risk-free environment. They can diagnose, prescribe treatment plans, and monitor patient progress, gaining invaluable experience and building their confidence in TB management.

> The Ni-kshay Setu app is part of the 'Closing the Gaps in TB care Cascade (CGC)' project, developed by the Indian Institute of Public Health, Gandhinagar (https://iiphg.edu.in/). This project aims to strengthen health systems' ability to comprehensively monitor and respond to the TB care cascade with quality improvement (QI) interventions. This digital solution is one of the key interventions of the project with the objectives to strengthen the knowledge support system of the health staff in TB patient-centric care and program management of the National TB Elimination Program.

> Technological support for this project is provided by Digiflux Technologies Pvt. Ltd. (https://www.digiflux.io), contributing to the development and implementation of the digital solution.

The publication of this application is made possible by the support of the American People through the United States Agency for International Development (USAID). The contents of this document are the sole responsibility of the CGC Project Team and do not necessarily reflect the views of USAID or the United States Government.



## 2. Features

- **Care Cascade Framework:** Adhering to NTEP guidelines, the application streamlines the management of TB patients throughout all stages of diagnosis and treatment.

- **Seamless Knowledge Enhancement:** Easily access valuable content published nationally by NTEP, as well as state-specific materials.

- **Interactive User Interface:** The interface is adaptive and dynamic, designed to enhance user engagement.

- **Resource Materials:** A variety of materials, including text, audio, videos, and PDFs, are available. This content is sourced from official publications by NTEP and state-level authorities.

- **Multi-language Support:** The application supports eight languages for all content.

- **TB Management Modules:** Includes modules for case finding, resources, and referrals.

- **News Feed:** Stay updated on tuberculosis with news from various official sources in India and from NTEP.

- **Assessments:** Subscribers can participate in various assessments posted by state and national authorities within the app.

- **Leaderboard:** Monitor your progress and see how you rank among your peers across India.

- **Notifications:** Receive alerts and reminders about important announcements and new knowledge content.

- **Chat Bot:** A machine learning-based chatbot that provides navigation within the app. It has access to the entire app content, offers answers to FAQs related to TB diagnosis, and provides NTEP treatment guidelines. The content can also be accessed in speech format.

- **Master Search:** Efficiently retrieve information from the app through a master search function.

- **App Linkages:** Connect to other official government apps directly from within this application, providing users with access to essential government services and resources.

- **Interactive Learning:** Explore different diagnosis and treatment algorithms in an interactive and user-friendly manner within the app's user interface, making learning about these topics engaging and accessible.


## 3. Technologies Used

> ### 3.1.1  For Mobile Application
  > - Front-end: React Native, Swift, Java, Redux, Redux Saga
  > - Notification: Firebase Push Notification Service


> ### 3.2.1  For Web Application
  > - Front-end: HTML, CSS, JavaScript, React JS, Redux, Redux Saga
  > - Notification: Firebase Push Notification Service


## 4. System Requirements

- Operating System: Windows, Linux, macOS
- Node (18)
- Android SDK (33)
- npm or Yarn
- Java Development Kit (JDK) (14)
- Android Studio
- Xcode (macOS only)

## 5. Installation

> ### 5.1.1 Installation For Android/iOS Development

- #### Step 1: Clone the Repository

  Clone the repository to your local machine using the following command:

  ```bash
  git clone https://github.com/iiph-gandhinagar/Ni-kshay-SETU-Frontend.git
  ```

- #### Step 2: Install Node.js

  - Make sure you have Node.js 16 or a version above installed on your system.
  - Clone the repository to your local machine using the following command:

- #### Step 3: Install Dependencies for Android

  Navigate to the project directory:

  ```bash
  cd nikshay-setu-fe-apps
  ```

  Then, go to the mobile package directory:

  ```bash
  cd packages/mobile/
  ```

  Install the project dependencies using npm:

  ```bash
  npm install
  ```

- #### Step 4: Run the Android/iOS App

  To run the Android app, use the following command:

  ```bash
  npm run android
  ```

  To run the iOS app, use the following command:

  ```bash
  npm run ios
  ```
- #### Step 5: Start the Development Server

  Start the development server by running:

  ```bash
  npm start
  ```

##

> **Note**
> To utilize our Backend (BE) system effectively, kindly ensure that our BE is open source. You can find the relevant source code at the [provided link](https://github.com/iiph-gandhinagar/Ni-kshay-SETU-Admin). Once you have access to the BE source code, integrate the BE URL into the Global file of your Frontend App for seamless functionality.

#

> ### 5.1.2 Installation For Web development

#

 If you want to work on the web portion of the project, follow these additional steps:

- #### Step 1: Remove Node Modules and Lock Files

  - Remove all node_modules folders and the package-lock.json file. If a yarn.lock file is present, remove that as well.

- #### Step 2: Install Dependencies for Web

  Navigate to the project directory if you haven't already:

  ```bash
  cd nikshay-setu-fe-apps
  ```

  Install the project dependencies using yarn:

  ```bash
  yarn install
  ```

- #### Step 3: Start the Web Development Server

  Go to the web package directory:

  ```bash
  cd packages/web
  ```

  Add react-redux for web:

  ```bash
  yarn add react-redux
  ```

  Start the development server for web:

  ```bash
  npm start
  ```

  - Now, you can work on both the Android and web parts of the project.

## 6. Usage

1. Sign up by providing the necessary details during the registration process.
2. Log in to the app.
3. Access the Home Screen, which includes various sections as mentioned in the features section above.
4. Begin using modules like Materials, Assessment Creation, Learn Case Findings, and Patient Management.
5. If you have engaged in activities such as browsing modules, participating in assessments, or exploring resource materials, you'll find a record of these activities in your Leaderboard section.

## 7. Contribution Guidelines

Contributions to Ni-kshay Setu are welcome. If you would like to contribute, please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bug fix: `git checkout -b feature/your-feature-name`
3. Make your changes and test thoroughly.
4. Commit your changes: `git commit -m (Format---> feat|fix|docs|style|perf|test : feature or bug fixing description) "Add your commit message"`
5. Push to the branch: `git push origin feature/your-feature-name`
6. Create a pull request on the main repository.
7. Provide a clear description of your changes in the pull request.
8. Ensure your code follows the project's coding conventions and style guidelines.
9. Be open to feedback and iterate on your work if requested.


## 8. License

Ni-kshay Setu project is licensed under the [GNU General Public License, Version 3.0](https://www.gnu.org/licenses/gpl-3.0).

[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
