##### Name: Ukonu Ndubuisi
##### Email: ndubisijnr@gmail.com

[Application Link](https://cytric-movie-list-app.vercel.app/)

[Loom Video Link](https://www.loom.com/share/b1233c358ee8470eac2ad2b798330215?sid=0f0deaa6-1d30-49aa-8faa-4f7ea024187e)

## Note:
As of the time I recorded the Loom video, the app was about 70% complete. Given the time constraints and
my first experience writing a Next.js backend, I prioritized meeting the deadline with the intention of completing
the app before the review.

Building this app has been an incredible learning experience, and it has inspired me to fully immerse myself in
full-stack development. I am grateful to Cytric for this opportunity to enhance my skills and grow my portfolio."

## APP Documentation

#### FRAMEWORK: "React framework Next.js"
#### STYLING: "Tailwind CSS"
#### STATE MANAGEMENT: "Redux Toolkit"
#### DATABASE: "MongoDB"
#### DEPLOYMENT: "Vercel"

## .env variable
##### DATABASE_URL: your_database_url
##### NEXT_PUBLIC_API_KEY: your_api_key

## API Documentation
Authentication

``` javascript
POST /api/auth/login
Description: Authenticates and Registers a user.
Request Body:
{
"email": "user@example.com",
"password": "password123"
}
```

``` javascript
Response:
{
"success": true,
"token": "your-jwt-token"
"code":"response-code"
"message":"response-message"
}
```

Movies

``` javascript
POST /api/movies/create
Description: creates a movie.

Request Body:
{
"title": "a_movie_name",
"published": "a_movie_name_date",
"poster':"image_url"
}
```
``` javascript
Response:
{
success: true,
data: newMovie,
}
```

``` javascript
POST /api/movies/${slug}
Description: updated a movie object.

Request Body:
{
"title": "a_movie_name",
"published": "a_movie_name_date",
"poster':"image_url"
}
```

``` javascript
Response:
{
success: true,
data: newMovie,
},
```
``` javascript
GET /api/movies
Description: gets uploaded movies.
Response:
{
success: true,
data: newMovie,
},
```
