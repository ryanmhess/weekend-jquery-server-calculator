# Server Side Calculator

## Description

_Duration: 8 Hours_

1.  Initial login to app page:
    *   Upon first run of app, a function is called that performs a GET request and recevies calculation history data from the server
2.  First inputs:
    *   User may click calculator buttons to build an expression to evaluate
    *   No changes made if initial click is '='
    *   If initial click is an operator, the first number is assumed '0'
    *   If an operator is clicked and followed by '=', the second number is assumed '0'
    *   Limit use of '.' to once per number input, reset after operator or '='
    *   If operator is click, any additional operator clicks will alert user
    * The '=' will trigger a POST, adding latest calculation to history array, and then a GET, updating the DOM
3.  CE and AC inputs:
    *   The CE will 'clear entry' - This is for accidental inputs, using a wrong number or wrong operator, no affect on server history
    *   The AC will 'all clear' - This will completely delete the calculation history on the server side as well as any current entry on the client side

To see the fully functional site, please visit: https://quiet-sands-54756.herokuapp.com/

## Usage
How does someone use this application? Tell a user story here.

1. Use calculator buttons (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, .) to set an initial input value
2. Use operator (+, -, ×, ÷), (only one operator input allowed)
3. Use calculator buttons (0, 1, 2, 3, 4, 5, 6, 7, 8, 9, .) to set secondary input value
4. Use queal sign (=) to have expression answered
5. CE will clear the current entry/screen
6. AC will clear all calculation history

## Built With

jQuery
Node.js
Express
body-parser

## Acknowledgement

*   Font used for calculator screen:    https://www.1001fonts.com/digital-7-font.html
*   Font used for calculation history:  https://www.dafont.com/phontphreaks-handwriting.font