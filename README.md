# Introduction
This is a employee listing page built with react JS (hook) and typescript. State management using redux and redux-thunk.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Global Components

### `Base Table`
Used to render any table. Properties:
data: any array, row Data
headers: array of label and key, contains of headers key and label
pageSize: number, rows per page
objectName: object name that is being passed in the row
queryState: string, search query in table
title: string; table header title
description: string; table header description
onQueryChange: (query: string) => void; emits search function to parent
onEditRow: (row: any) => void; emits edit row function to parent

![image](https://github.com/almasutami/employee-app/assets/86611956/33e451f8-f527-40c3-bf42-b914edb350d0)

### `Base Input`
For input text type.

![image](https://github.com/almasutami/employee-app/assets/86611956/33e590c0-ed4c-49df-97ce-2ca1967fadbd)

### `Base Input Search`
For search, used in querying in base table.

![image](https://github.com/almasutami/employee-app/assets/86611956/00880174-b32b-4caa-b061-110360958f02)

### `Base Switch`
For toggle.

![image](https://github.com/almasutami/employee-app/assets/86611956/808b7e99-6407-4d64-ba7b-2fb1ba04a2f4)

## Module Components
### `Employee detail`
Modal to edit employee.

![image](https://github.com/almasutami/employee-app/assets/86611956/3f9e3f45-7abb-4649-840c-a4557c1d4008)
