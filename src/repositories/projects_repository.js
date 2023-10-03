import fs from "fs";

export class ProjectsRepository {
  static projects() {
    const projects = fs.readFileSync("projects.json")
    return Promise.resolve(projects);
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