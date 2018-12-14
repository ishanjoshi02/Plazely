// solium-disable linebreak-style
pragma solidity ^0.4.24;
contract VideoStore {

    struct Comment {
        string content;
        string userEmail;
        uint commentTimestamp;
        uint likes;
        Comment[] replies;
    }

    struct ipfsHash {
        string hashString;
        string quality;
    }

    struct Video {
        string title;
        string description;
        uint videoTimestamp;
        ipfsHash[] hashes;
        string[] tags;
        string category;
        string userEmail;
        uint commentThreadId;
    }

    mapping(string=>uint[]) tagMappping;

    uint videoListCount;

    Video[] videoList;
    Comment[] commentThreads; // Tags are used to search the database.

    function addVideo(string _title, string _description, string _hashes, string _tags, string _category, string _userEmail)
    public
    {
        // Add insertion functionality.
        // string hashes is going to be a list of string saved as one.
        // This is because solidity doesnot have a way to serialize and deserialize a string array.
        // using ; as a delimiter.
        // similar logic is going to be used for the tags array or for any arrays for that matter.

        videoListCount++;

        Video foo;
        foo.title = _title;
        foo.description = _description;
        foo.category = _category;
        foo.userEmail = _userEmail;
        foo.videoTimestamp = now;

        videoList.push(foo);

        // extract all tags in the _tags string.
        // create tag entry, and push the video id to tagMapping

        string[] tags = generateTags(_tags);

        

    }

    function addVideoIdToTag(string _tag, uint videoId)
    internal
    {
        tagMappings[_tag].push(videoId);
    }

    function searchVideo(string _tags)
    public
    view
    returns (uint[] videoIds)
    {

        // Implement search algorithm here.
        // Split _tags into string array
        // Figure out Ranking Algorithm

    }



    function updateVideo(uint _id, string _title, string _description, string _hashes, string _tags, string _category, string _userEmail)
    public
    {

    }

    function deleteVideo(uint _id)
    public
    {

    }

    //________________________________Comment Functions______________________________________//

    // struct Comment {
    //     string content;
    //     string userEmail;
    //     uint commentTimestamp;
    //     uint likes;
    //     Comment[] replies;
    // }


  //________________________________Helper Functions______________________________________//

  function generateTags(string _tags)
  internal
  returns (string[] tags)
  {

    // separate tags into string array.
    // separate using delimiter ;

  }

}
