

### 1. Clone repo

```

$ cd car_ecommerce
```

### 2. Setup MongoDB

- Local MongoDB
  - Install it from [here](https://www.mongodb.com/try/download/community)

### 3. Install python3 + pip

- Install it from [here](https://www.python.org/downloads/)

### 4. Setup Ai Model

```
$ cd modelAi
$ pip install -r requirements.txt
```

### 5. Run Ai Model

```
$ python3 application.py
```

this will run the ai model application on http://localhost:8080

### 6. Run Backend

```
$ npm install
$ npm start
```

### 7. Run Frontend

```
# open new terminal
$ cd frontend
$ npm install
$ npm start
```

### 5. Seed Users and Products

- Run this on chrome: http://localhost:5000/api/users/seed
- It returns admin email and password
- Run this on chrome: http://localhost:5000/api/products/seed
- It creates 6 sample products

### 6. Admin Login

- Run http://localhost:3000/signin
- Enter admin email and password and click signin
