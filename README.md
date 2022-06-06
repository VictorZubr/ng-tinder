This is test task for Topcon company.

Simple serverless single page application like Tinder. All server requests are emulated in ApiService.

[Demo](https://ng-tinder.web.app)

Backend must provide next requests:

##### Get profiles
* HTTP Method: GET
* URL: '/profiles'
* Response: array of objects
```
{
  id: string;
  name: string;
  age: number;
  sex: 'male' | 'female';
  photoUrl: string;
  status : {
    isCandidate: boolean;
    isFavorite: boolean;
  }
}
```

##### Update profile to like
* HTTP Method: POST
* URL: '/profile/:id'
* Payload: ```{"isFavorite": "true"}```
* Response same as '/profiles'
