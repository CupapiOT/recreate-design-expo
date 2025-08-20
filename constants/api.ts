export class ApiService {
  static BASE_URL = "https://jsonplaceholder.typicode.com/";
  static POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  static NUM_OF_USERS = 10;
  static NUM_OF_POSTS = 100;
  static NUM_OF_POSTS_PER_USER = 10;

  /**
   * Given an UserID, return the list of PostIDs available to that user.
   */
  static getUsersPostIDs(userID: number) {
    // Create range of available IDs
    //   Examples: user 0 has [1..10], User 7 has posts [61...70]
    const postIdStart = (userID - 1) * 10 + 1;
    console.log({ userID });

    const availableIDs = Array.from(
      { length: ApiService.NUM_OF_POSTS_PER_USER },
      (_, index) => postIdStart + index,
    );
    console.log({ availableIDs });
    return availableIDs;
  }
}
