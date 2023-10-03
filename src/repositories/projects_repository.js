export class ProjectsRepository {
  static projects() {
    //return this.call("GET", "https://viaprize.com/projects")
    return Promise.resolve([
      {
        title: "Create a web3 Gofundme",
        project_url: "description 1",
        project_id: 1,
      },
      {
        title: "Create a blog for Zuzalu",
        project_url: "description 2",
        project_id: 2,
      },
      {
        title: "Title 3",
        project_url: "description 3",
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