export class ProjectsRepository {
  static projects() {
    //return this.call("GET", "https://viaprize.com/projects")
    return Promise.resolve([
      {
        title: "Create a web3 Gofundme",
        project_url: "Create a new page in viaPrize titled \"Portals\" which has an about, create, and view subpage. Portals are \"pass-through\" campaigns which simply are an easily shareable page for a crowdfunding campaign where if people donate on there a fee is taken by the platform and the rest of the funds are immediately forwarded onwards to whatever address the creator of the campaign wants. \n" +
          "This code will be pushed to our open source github here: https://github.com/viaprize/viaprize\n" +
          "The design is seen here: https://www.figma.com/file/O8skRsB0qM02KiyqNNZFNw/viaPrize?type=design&node-id=0%3A1&mode=design&t=MlufOVk4XnS8CSRZ-1\n" +
          "\n" +
          "There happen to be this video and this code that may be relevant:\n" +
          "https://www.youtube.com/watch?v=L6kvLnHJHZA\n" +
          "https://github.com/cromewar/Web3-Crowd-Funding\n" +
          "\n" +
          "If you'd like to pursue this or ask questions about it please contact us here: https://t.me/+QsphrF50bv43ZTg5",
        project_id: 1,
      },
      {
        title: "Create a blog for Zuzalu",
        project_url: "Zuzalu does not have an official place online to learn about what Zuzaluans are saying. We want to build a community blog/forum that anyone can view but only those with a Zupass can log into to write posts, add comments, and upvote and downvote other people's posts and comments. \n" +
          "When creating a post, the creator ought to be able to add tags to the post.\n" +
          "Blog posts and comments should be searchable according to title, content, and tags.\n" +
          "\n" +
          "We'd also love for the ability to add polls within posts but that is not required to win this prize. See zupoll.org and the code here for that: https://github.com/proofcarryingdata/zupoll\n" +
          "\n" +
          "This code will be pushed to our open source github here: https://github.com/viaprize/viaprize\n" +
          "\n" +
          "If you'd like to pursue this or ask questions about it please contact us here: https://t.me/+QsphrF50bv43ZTg5",
        project_id: 2,
      },
    ])
  }

  call(method, url, data) {
    let options = {
      method: method,
      credentials: 'include',
    };

    if (typeof data !== 'undefined') {
      options = Object.assign(options, {
        body: data
      });
    }

    const request = new Request(url, options);

    return fetch(request)
      .then(response => {
        return response.json()
      })
      .catch(error => {
        return Promise.reject(error);
      });
  }
}