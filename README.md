Getting started:

1) Setup:
- Create a file named : "credentials"
- Paste your google Place API_KEY in this file
- npm install

2) Running server:
- npm run start (launch the server on localhost:8000)

3) Requesting server:
  GET urlencoded data:
  - http://localhost:8000/searchPhoneNumbers?siren=COMPANY_SIREN&name=COMPANY_NAME&address=COMPANY_ADDRESS
  Json data:
  - Not supported yet

Fields: siren   - (Mendatory) String 9 char long
        name    - (Mendatory) String
        address - (Mendatory) String

EXTRA: Running non regression tests:
  WARNING: this will send about 10 requests to google Place API. Billing will apply normally.
- npm run test
