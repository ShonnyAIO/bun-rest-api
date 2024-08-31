import { Elysia, t} from "elysia";
import { plugin } from "./plugin";

// Application
const app = new Elysia().get("/", () => "Hello Elysia, I am going to build RESTFULL API")
.use(plugin)
.state({
  id : 1,
  email : 'shonny@gmail.com'
})
.decorate('getDate', () => Date.now())
.get('/post/:id', ({params: {id}}) => { return {id, title: 'Learn Bun'}})
.post('/post', ({body, set, store}) => {
  console.log('STORE: ', store);
  set.status = 201
  return body 
})
.get('/track/*', () => { return 'Track Route' })
.get('/tracks', ({store, getDate}) => {
  console.log('STORE: ', store);
  console.log('getDate: ', getDate());
  console.log('store: ', store['plugin-version']);
  return new Response(JSON.stringify({
    "tracks" : [
      'Dancing Feat',
      'Sam I',
      'Animals',
      'Ozuna'
    ]
  }), {
    headers: {
      'Content-Type' : 'application/json'
    }
  })
});


// USER
app.group('/user', app => app)
.post('/sign-in', ({body}) => body, {
  body: t.Object({
    username: t.String(),
    password: t.String()
  })
})
.post('/sign-up', () => "Signup Route")
.post('/profile', () => "Profile Route")
.get('/:id', () => "User By ID")


app.group('/v1', app => app)
.get('/', () => "Version 1")
.group('/products', app => app)
.post('/', () => "Create Product")
.get('/:id', () => "GET PRODUCT BY ID")
.put('/:id', () => "UPDATE PRODUCT BY ID")
.delete('/:id', () => "DELETE PRODUCT BY ID")

app.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
