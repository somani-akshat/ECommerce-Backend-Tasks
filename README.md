# The Student Junction Backend Tasks

## Project Structure

```
.
├── config/             -> Contains function to connect database
├── controllers/        -> Backend logic for the api endpoints
├── models/             -> Contains database models
├── routes/             -> Defines api endpoints
├── test/               -> Contains tests using chai and mocha
├── index.js            -> Main File
└── package.json        -> Npm package.json file
```

## Technology Stack

- Backend Application developed using Node.js and Express
- User Authentication using JsonWebToken
- Data stored in cloud via MongoDB Atlas

<!-- GETTING STARTED -->

## Getting Started

### Prerequisites

- npm
  ```
  npm install npm@latest -g
  ```

### Installation

- Clone the repository
  ```
  git clone https://github.com/raj2729/ECommerce-Backend-Tasks.git
  ```
- Install NPM packages for Backend Development

  ```
  cd ECommerce-Backend-Tasks
  npm install

  ```

- The Backend Server is running on port `8080`

### Usage

```
npm start
```

## API Endpoints used
 
![TSJ Backend tasks Routes List](https://user-images.githubusercontent.com/68227858/131885090-7cfa6d17-8de3-47ab-bab3-5b88722f6726.jpg)


## Testing

Testing is done using chai and mocha.

### Testing on User Routes

![Screenshot from 2021-09-02 22-14-55](https://user-images.githubusercontent.com/68227858/131884070-f54aa70d-8bf6-47d5-aece-0c3c2459ee11.png)

### Testing on Admin Routes

![Screenshot from 2021-09-02 22-17-26](https://user-images.githubusercontent.com/68227858/131884397-610df081-2cc8-4222-9ae0-e9cf406100a0.png)

### Testing on Product Routes

![Screenshot from 2021-09-02 22-19-11](https://user-images.githubusercontent.com/68227858/131884651-db49fd24-561a-45b3-91a9-8577d8a64bca.png)

### Testing on Order Routes

![Screenshot from 2021-09-02 22-19-56](https://user-images.githubusercontent.com/68227858/131884786-04021c6c-0e15-4da5-9f59-fc68fedc199d.png)

