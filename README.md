# PassGuard – Password Strength Checker & Generator

## 1. Project Overview

PassGuard is a web-based cybersecurity application designed to help users create stronger and safer passwords.

The application analyzes password strength, generates secure passwords, calculates password entropy, identifies commonly used weak passwords, and provides cybersecurity awareness tips.

The main objective of PassGuard is to improve password security awareness and encourage users to follow better password practices.

## 2. Project Objectives

- Analyze password strength based on multiple security criteria.
- Generate strong and random passwords.
- Calculate password entropy to estimate password complexity.
- Identify commonly used and weak passwords.
- Provide suggestions to improve password security.
- Educate users about cybersecurity best practices.

## 3. Features

### Password Strength Checker
- Evaluates password length.
- Checks uppercase and lowercase letters.
- Checks numeric digits.
- Checks special characters.
- Provides a password strength score out of 100.
- Displays suggestions to improve password security.

### Password Generator
- Generates random passwords.
- Allows users to customize password length.
- Supports uppercase letters, lowercase letters, numbers, and special characters.
- Uses the browser's Web Crypto API for random number generation.

### Password Entropy Calculator
- Calculates password entropy in bits.
- Estimates complexity using password length and character pool size.
- Classifies entropy as low, medium, or high.

### Breach Awareness Detection
- Checks passwords against a small built-in list of commonly used weak passwords.
- Displays a warning when a listed weak password is detected.

Note: This is a basic awareness feature, not a comprehensive check against real-world leaked password databases.

### Cybersecurity Tips
- Provides password safety recommendations.
- Promotes secure online practices.

### Additional Features
- Dark mode and light mode.
- Responsive user interface.
- Password visibility toggle.
- Copy generated passwords.
- Interactive notifications.

## 4. Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and responsive design |
| JavaScript | Application functionality and logic |
| Web Crypto API | Secure random number generation |
| Local Storage | Saving the selected theme |
| Google Chrome / Edge / Firefox | Running the application |

## 5. Project Structure

```text
PassGuard-Password-Strength-Checker-Generator/
│
├── index.html
├── style.css
├── app.js
└── README.md
```

### File Description

- **index.html:** Contains the structure and layout of the web application.
- **style.css:** Defines the visual appearance, animations, themes, and responsive design.
- **app.js:** Implements password analysis, password generation, entropy calculation, and other interactive features.
- **README.md:** Contains project documentation and setup instructions.

## 6. Dataset Information

The current version of PassGuard does not use an external dataset.

Instead, it contains a small built-in list of commonly used weak passwords inside `app.js`.

This list is used for basic password awareness and warning purposes.

For future improvements, the application can integrate the Have I Been Pwned Pwned Passwords dataset/API to check against a much larger collection of known compromised passwords.

Dataset status: No external dataset is currently integrated.

## 7. Installation and Setup Instructions

### Requirements

- A computer or laptop.
- A modern web browser.
- Git (optional).
- Internet connection for downloading the repository.

No Python installation or external JavaScript packages are required for the current version.

### Method 1: Download from GitHub

1. Open the PassGuard GitHub repository.
2. Click the green **Code** button.
3. Select **Download ZIP**.
4. Extract the downloaded ZIP file.
5. Open the extracted project folder.
6. Locate `index.html`.
7. Double-click `index.html` to launch the application in your browser.

### Method 2: Clone Using Git

Open the terminal and execute:

```bash
git clone https://github.com/Shravanee-Pawar/PassGuard-Password-Strength-Checker-Generator.git
```

Navigate to the project directory:

```bash
cd PassGuard-Password-Strength-Checker-Generator
```

Open `index.html` in your preferred web browser.

## 8. How to Use the Application

1. Launch the application by opening `index.html`.
2. Navigate to the Password Checker section.
3. Enter a password to analyze its strength.
4. Review the strength score, entropy value, and security suggestions.
5. Navigate to the Password Generator section.
6. Select the desired password length and character options.
7. Generate and copy a password.
8. Visit the Cybersecurity Tips section to learn about safe password practices.

## 9. Security Considerations

- Password analysis is performed locally in the browser.
- The application does not require user registration.
- The application does not currently use a backend server or database.
- The built-in weak-password list is limited and should not be considered a complete breach detection service.
- Users should avoid entering their actual sensitive passwords into demonstration or third-party applications.

## 10. Future Scope

- Integration with real-world compromised password databases.
- Advanced password analysis algorithms.
- Machine learning-based password strength prediction.
- Multi-language support.
- Additional cybersecurity awareness modules.
- Improved password security recommendations.

## 11. Conclusion

PassGuard provides a simple and interactive platform for understanding password security.

It combines password strength analysis, password generation, entropy calculation, basic weak-password detection, and cybersecurity awareness in one application.

The project aims to encourage users to create stronger passwords and develop safer online security habits.


**Project Name:** PassGuard – Password Strength Checker & Generator

**GitHub Repository:** Shravanee-Pawar/PassGuard-Password-Strength-Checker-Generator
