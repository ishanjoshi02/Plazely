// solium-disable linebreak-style
pragma solidity ^0.4.24;
contract UserStore {
    
    struct User {
        string username;
        string name;
        address ethereumAddress;
        string password; // Contains the hashed version of the password.
        bool isReal; // To check if the user actually exists.
        string[] subscribers;
        string[] subscribedTo;
        uint subscribedToCount;
        uint subscribersCount;
    }

    mapping (string=>User) userMapping;
    string[] emails;
    uint userCount;
    
    function checkUserExistence(string _email) 
    internal 
    view 
    returns (bool isReal) 
    {
        return userMapping[_email].isReal;
    }
 
    function checkUserNameExistence(string _username) 
    internal
    view 
    returns (bool exists) 
    {

        for (uint i = 0;i < userCount;i++) {
            if (compareStrings(userMapping[emails[i]].username, _username)) {
                return false;
            }
        }
        return true;

    }

    function createUser(string _email, string _username, string _firstName, string _lastName, address _address, string _password ) 
    public 
    view 
    returns (
        string username,
        string name,
        address ethereumAddress
    ) 
    { 
        // This function is analogous to the sign up user function except this is the server side processing of that process.

        // Some validations (also called Guard Functions) are required before creating the user in the store.
        // 1. Check if the user already exists.
        require(!checkUserExistence(_email), "User already exists"); // Using require function. Please refer solidity documentation for more information.
        // Other guard functions go here.

        // add function to check if the username is already being used. This is to ensure that the username is unique
        require(
            checkUserNameExistence(_username),
            "Username already taken. Please try another user name"
        );

        userMapping[_email].username = _username;
        emails.push(_email);
        userMapping[_email].ethereumAddress = _address;
        userMapping[_email].password = _password;
        userMapping[_email].subscribersCount = 0;
        userMapping[_email].name = strConcat(_firstName, _lastName);
        userCount++;

        username = _username;
        name = strConcat(_firstName, _lastName);
        ethereumAddress = _address;
    }

    function authenticateUser(string _email, string _password) 
    public 
    view 
    returns (
        string username,
        string name,
        address ethereumAddress
    ) 
    {
        // If the email password combo is correct, then the user is authentic. If the user is authentic, return the user object
        // The password is not the actual password, but the hashed version of the password. The hashing will occur at the client side
        // i.e. the client sends the hashed password and not the actual password.

        // Guard Functions
        // 1. Check if the user exists in the store.
        require(checkUserExistence(_email), "User does not exist");
        // 2. The password entered must be equal to the one stored in the contract.
        User memory foo = userMapping[_email];
        require(compareStrings(foo.password, _password), "Please check the password entered");

        // If all the guard conditions pass, return the User contract(object).

        username = foo.username;
        name = foo.name;
        ethereumAddress = foo.ethereumAddress;

    }
    
    //------------------------------------- User Utility functions start here -------------------------------------//

    function changePassword(string _email, string _oldPassword, string _newPassword) 
    public 
    view 
    returns (
        string username,
        string name,
        address ethereumAddress
    ) 
    {
        // Utility function that allows the user to change their password.

        // Guard Functions
        // 1. Check if the User exists in the store.
        require(checkUserExistence(_email), "User does not exist");
        // 2. Check if the _oldPassword is equal to the current Password of the user.
        require(compareStrings(userMapping[_email].password, _oldPassword), "Entered password does not match current password");

        // If all guard conditions satisfy, update the password.
        userMapping[_email].password = _newPassword;
        
        username = userMapping[_email].username;
        name = userMapping[_email].name;
        ethereumAddress = userMapping[_email].ethereumAddress;

    }

    function changeUsername(string _email, string newUsername) 
    public 
    view 
    returns (
        string username,
        string name,
        address ethereumAddress
    ) 
    {
        // Utility function that allows the user to change their username

        // Guard Functions
        // 1. Check if the user exists in the store.
        require(checkUserExistence(_email), "User does not exist");

        // Update the user's username.
        userMapping[_email].username = newUsername;
        
        username = userMapping[_email].username;
        name = userMapping[_email].name;
        ethereumAddress = userMapping[_email].ethereumAddress;

    }

    function changeEmail(string _email, string password, string _newEmail) 
    public 
    view 
    returns (
        string username,
        string name,
        address ethereumAddress
    ) 
    {
        // Utility function that allows the user to change their password.

        // Guard Functions
        // 1. Check if the User exists in the store.
        require(checkUserExistence(_email), "User does not exist");
        // 2. Check if the _oldPassword is equal to the current Password of the user.
        require(compareStrings(userMapping[_email].password, password), "Entered password does not match current password");

        // Create a temp variable to store the User struct object.
        User memory foo = userMapping[_email];
        // Delete current instance of the user.
        delete userMapping[_email];
        // Add the user into the userMapping with the new email as the index.
        userMapping[_newEmail] = foo;

        username = foo.username;
        name = foo.name;
        ethereumAddress = foo.ethereumAddress;

    }

    function deleteUser(string _email, string _password) 
    public 
    {

        // Utility function that deletes user from blockchain/database.

        // Guard Functions
        // 1. Check if the User exists in the store.
        require(checkUserExistence(_email), "User does not exist");
        // 2. Check if the _oldPassword is equal to the current Password of the user.
        require(compareStrings(userMapping[_email].password, _password), "Entered password does not match current password");

        // Before deleting the user. Delete his/her subscribers
        // This should also reflect on the subscribers end too.

        User memory foo = userMapping[_email];

        for (uint i = 0;i < foo.subscribersCount;i++) {

            for (uint j = 0;j < userMapping[foo.subscribers[i]].subscribedToCount;j++) {
                string memory temp = userMapping[foo.subscribers[i]].subscribedTo[j];
                if (compareStrings(temp, _email)) {
                    delete userMapping[foo.subscribers[i]].subscribedTo[j];
                }
            }
            userMapping[foo.subscribers[i]].subscribedToCount--;

        }

        delete userMapping[_email];

    }

    //------------------------------------- User functions start here -------------------------------------//

    function addSubscriber(string _uploaderEmail, string _subscriberEmail)
    public 
    {
        // Function that adds subscriber to an User.

        // Guard Functions
        // 1. Check if uploader exists in the store.
        require(checkUserExistence(_uploaderEmail), "Uploader does not exist");
        // 2. Check if subscriber exists in the store.
        require(checkUserExistence(_subscriberEmail), "Subscriber does not exist");

         // "memory" keyword is used to hold a variable temporarily.
        User memory uploader = userMapping[_uploaderEmail];
        User memory subscriber = userMapping[_subscriberEmail];

        // Add subscriber to uploader's subscriber list.
        uploader.subscribersCount++;
        uploader.subscribers[uploader.subscribersCount] = _subscriberEmail;

        // Add uploader to the subscribedTo list for the subscriber.
        subscriber.subscribedToCount++;
        subscriber.subscribedTo[subscriber.subscribedToCount] = _uploaderEmail;
    }

    function removeSubscriber(string _uploaderEmail, string _subscriberEmail) 
    public 
    {
        // Function that remove subscriber from user.

        // Guard Functions
        // 1. Check if uploader exists in the store.
        require(checkUserExistence(_uploaderEmail), "Uploader does not exist");
        // 2. Check if subscriber exists in the store.
        require(checkUserExistence(_subscriberEmail), "Subscriber does not exist");

        // "memory" keyword is used to hold a variable temporarily.
        User memory uploader = userMapping[_uploaderEmail];
        User memory subscriber = userMapping[_subscriberEmail];

        // delete subscriber from uploader subscribers list.

        for (uint i = 0;i < uploader.subscribersCount;i++) {
            if (compareStrings(uploader.subscribers[i], _subscriberEmail)) {
                delete uploader.subscribers[i];
            }
        }
        // reduce subscriber count for uploader
        uploader.subscribersCount--;

        // delete uploader from subscriber's subscribedTo list
        for (uint j = 0;j < subscriber.subscribedToCount;j++) {
            if (compareStrings(_uploaderEmail, subscriber.subscribedTo[j])) {
                delete subscriber.subscribedTo[j];
            }
        }

        // reduce subscribedTo count for subscriber's subscribedTo list
        subscriber.subscribersCount--;
    }

    //------------------------------------- User functions start here -------------------------------------//

    function compareStrings(string one, string two) 
    internal 
    pure 
    returns (bool) 
    {

        return keccak256(abi.encodePacked(one)) == keccak256(abi.encodePacked(two));
    
    }

    function strConcat(string _a, string _b, string _c, string _d, string _e) 
    internal 
    pure 
    returns (string)
    {
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        bytes memory _bc = bytes(_c);
        bytes memory _bd = bytes(_d);
        bytes memory _be = bytes(_e);
        string memory abcde = new string(_ba.length + _bb.length + _bc.length + _bd.length + _be.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        for (i = 0; i < _bc.length; i++) babcde[k++] = _bc[i];
        for (i = 0; i < _bd.length; i++) babcde[k++] = _bd[i];
        for (i = 0; i < _be.length; i++) babcde[k++] = _be[i];
        return string(babcde);
    }

    function strConcat(string _a, string _b, string _c, string _d) 
    internal 
    pure 
    returns (string) 
    {
        return strConcat(_a, _b, _c, _d, "");
    }

    function strConcat(string _a, string _b, string _c) 
    internal 
    pure 
    returns (string) 
    {
        return strConcat(_a, _b, _c, "", "");
    }

    function strConcat(string _a, string _b) 
    internal 
    pure 
    returns (string) 
    {
        return strConcat(_a, _b, "", "", "");
    }

}

