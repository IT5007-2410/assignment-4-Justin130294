# Student Details

Name: Justin Ng Thian Huat
Student ID: A0290583X

# How to Run Frontend Application

1. Setup the backend folder using Docker (view the README file in the ReactNativeServer folder).
2. Download and place the App.js, IssueList.js and package.json files in the React Native project folder e.g. AWESOMEPROJECT outside of the Container.
3. Open the terminal and enter ```npm install``` to download the dependencies.
4. Open an Android phone emulator using Android Studio.
5. Enter ```npx react-native run-android``` in the terminal to run the application.

# Additional Notes: Warning
1. When running the application, you may notice the following warning: "Warning: Failed prop type: Invalid prop `textStyle` of type `array` supplied to `Cell`, expected `object`.". This is due to some errors with the 
```react-native-table-component``` library, which is no longer being maintained. This will not cause the application to fail.
