import Cookies from 'js-cookie';

type AuthorizationHeader = 'None' | 'Basic' | 'Bearer';

const Fetch = {
  Post: (url: string, body?: {} | undefined, headers?: {} | undefined) => {
    return fetch(url, {
      method: 'POST',
      headers:
        headers ||
        new Headers({
          accept: '*/*',
          'Content-Type': 'application/json',
        }),
      body: JSON.stringify(body),
    });
  },
  Get: (url: string, authorization: AuthorizationHeader = 'None') => {
    const optionHeaders = new Headers({ accept: '*/*', 'Content-Type': 'application/json' });
    authorization !== 'None' ? optionHeaders.append('Authorization', `${authorization} ${Cookies.get('token')}`) : null;
    return fetch(url, {
      method: 'GET',
      headers: optionHeaders,
    });
  },
  Delete: (url: string, authorization: AuthorizationHeader = 'None') => {
    const optionHeaders = new Headers({ accept: '*/*', 'Content-Type': 'application/json' });
    authorization !== 'None' ? optionHeaders.append('Authorization', `${authorization} ${Cookies.get('token')}`) : null;
    return fetch(url, {
      method: 'DELETE',
      headers: optionHeaders,
    });
  },
  Put(url: string, body?: {} | undefined, authorization: AuthorizationHeader = 'None') {
    const optionHeaders = new Headers({ accept: '*/*', 'Content-Type': 'application / json' });
    authorization !== 'None' ? optionHeaders.append('Authorization', `${authorization} ${Cookies.get('token')}`) : null;
    return fetch(url, {
      method: 'PUT',
      headers: optionHeaders,
      body: JSON.stringify(body),
    });
  },
};

export default Fetch;
