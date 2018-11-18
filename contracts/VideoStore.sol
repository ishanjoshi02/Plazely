pragma solidity ^0.4.24;
// This store is going to be using a B+ Tree.
contract VideoStore {
    
    struct Comment {
        uint commentId;
        string content;
        string userEmail;
        uint commentTimestamp;
        uint likes;
        Comment[] replies;
    }
    
    struct ipfsHash {
        string hashString;
        uint width;
        uint height;
    }
    
    struct Video {
        uint videoId;
        string title;
        string description;
        uint videoTimestamp;
        ipfsHash[] hashes;
        string[] tags;
        string category;
        string userEmail;
        uint commentCount;
        Comment[] comments;
    }

    Video[] videoList;

    function addVideo(string _title, string _description, string _hashes, string _tags, string _category, string _userEmail)
    public 
    {
        // Add insertion functionality.
        // string hashes is going to be a list of string saved as one. 
        // This is because solidity doesnot have a way to serialize and deserialize a string array.
        // using ; as a delimiter.
        // similar logic is going to be used for the tags array.
        
    }

    function updateVideo(string _title, string _description, string _hashes, string _tags, string _category, string _userEmail) 
    public 
    {

    }

    function deleteVideo(uint _id) 
    public 
    {

    }

    function retrieveVideo(string _searchString) 
    public 
    {
        // This is the most important functionality for this contract. To be coded at the end.
    }

    //________________________________Comment Functions______________________________________//

    // struct Comment {
    //     string content;
    //     string userEmail;
    //     uint commentTimestamp;
    //     uint likes;
    //     Comment[] replies;
    // }


}