export class ProjectsRepository {
  static projects() {
    //return this.call("GET", "https://viaprize.com/projects")
    return Promise.resolve([
      {
        title: "cool project 0",
        project_url: "............",
        project_id: 1,
      },
      {
        title: "cool project 1",
        project_url: "............",
        project_id: 2,
      },
      {
        title: "cool project 2",
        project_url: "............",
        project_id: 3,
      },
      {
        title: "cool project 3",
        project_url: "............",
        project_id: 4,
      },
      {
        title: "cool project 4",
        project_url: "............",
        project_id: 5,
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