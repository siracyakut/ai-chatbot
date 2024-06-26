function request({ url, method = "GET", data = false }) {
  const options = {
    method,
    headers: {
      "content-type": "application/json",
    },
    credentials: "include",
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        if (result.success) {
          resolve(result);
        } else {
          reject(result);
        }
      })
      .catch(() =>
        reject({
          success: false,
          data: "Servers unreachable, please try again later!",
        }),
      );
  });
}

export const post = (url, data) => request({ url, method: "POST", data });
export const get = (url) => request({ url });
