
# Mercado libre take home project 

<p align="center">
  <a href="#prepare-local-environment">Prepare local environment</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#considerations">Considerations</a> •
</p>

## Prepare local environment
### BackEnd

Go into python folder and create a virtual env if needed
```bash
cd python
pip install virtualenv
python -m venv myenv
source myenv/bin/activate
```

Then configure the project
```bash
pip install -r requirements.txt
python manage.py migrate
```
To run the backend run
```bash
python manage.py runserver
```
Use [http://localhost:8000](http://localhost:8000) to test the endpoint in postman.

### FrontEnd

```bash
cd react
npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## How To Use

- Sign in: Go to "/sing-in", ou are going to be asked first to be signed before use the app.
- Log in: After creating a user, log in with the email and password. Go to "/log-in"
- Search item: After log in you are going to be able to use the search bar and search for items
- Select Item: select an Item to see more information about the item.
- Meli Logo: click the logo to return to Home.

## Considerations
- The app does not have a log out button so when the credentials were expired you are going to be asked to log again
- API throttling: 24hs for authenticated users