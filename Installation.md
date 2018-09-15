# How to install dependencies and run the project

This process is long and tedious, but, there is no way around it. If you have one, please send a `pull request`.

## Installing NodeJs

The first thing you'll have to do is, install [NodeJs](https://nodejs.org/en/)

## Installing Truffle Framework

We are using a framework called [Truffle](https://truffleframework.com/), since it provides a lot features to develop decentralized applications out-of-the-box.

To install [Truffle](https://truffleframework.com/), run,

`npm install -g truffle`

## Cloning the Git repo

Clone the git repository by running the command,

`git clone https://github.com/ishanjoshi02/Project-INK.git`

## Installing Dependencies

Install the dependencies by running command,

`npm install`

## Getting uPort key

1. To get the `uPort` key, go on over to [uPort App Manager](https://appmanager.uport.me/), and, create your uPort Identity if you don't have one.
2. Next create a project called `INK`.
3. Leave all other fields blank.
4. Save changes to initalize the project.
5. Scan the QR Code again.
6. Click on `Click Here for App Code`.
7. Copy the code inside `SimpleSigner` function. It should resemble something like `5e75f3b9cef1edc5820fdcaa6221ec18c25938155d8622745243d6a80cxxxxxx`
8. Also copy `clientId`.
9. Go to your `INK/src` folder
10. Create a new file called `key/uportkeys.js`
11. Paste the copied `SimpleSigner` and `clientId` (Change the key to the one you got the previous step)

Your code should look something like this:

<img src="./CodePictures/connector_js_picture.png" alt="connectors" width="600px" />

```javascript
export const SigningKey =
  "5e75f3b9cef1edc5820fdcaa6221ec18c25938155d8622745243d6a80cxxxxxx";
```

12. Now you can run your project

## Run the project

`npm run start`

### I'm getting some errors. What should I do?

If you're getting some compilation errors, one option is to check what the errors are and install the required dependencies.

For example, if you're getting js-cookie error, install it by `npm i js-cookie`. Similarly, check for missing dependencies and install the packages.

Another option is to see the [package.json](package.json) file and see the required dependencies.

A comprehensive list will be available as soon as possible.
