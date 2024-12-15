const http = require("http");
const fs = require("fs");
const path = require("path");

const pages = path.resolve(path.join(__dirname,'src'));

const os = require('os');


let port = parseInt(process.env.PORT) || 8000;

//console.log(pages);

function serr(res, err){
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end('server error \nan error occored in the server');
  console.log(`ERROR: an error occored generating responce: ${err}`);
}

async function serve_html(res, file_name) {
  fs.readFile(path.join(pages, file_name), (err, data) => {
        if (err) {
          serr(res, err);
        } else {
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(data);
          console.log(`INFO: responce 200 OK ${file_name}`);
        }
      });
}
async function serve_img(res, file_name) {
    fs.readFile(path.join(pages, file_name), (err, data) => {
        if (err) {
          serr(res, err);
        } else {
          res.writeHead(200, {'Content-Type': `image/${path.extname(file_name).split('.')[1]}`});
          res.end(data);
          console.log(`INFO: responce 200 OK favicon.ico`);
        }
      });
      }
async function server(req,res) {
  console.log(`\n\nINFO: request ${req.method} ${req.url}`);
  switch (req.url) {
    case '/': 
      {
        await serve_html(res, 'menu.html');
      }
      break;
    case '/x':
      {
        await serve_html(res, 'x.html');
      }
      break;
    case '/whatsapp':
      {
        await serve_html(res, 'whatsapp.html');
      }
    break;
    case '/facebook':
      {
        await serve_html(res, 'facebok.html');
      }
      break;
    case '/instagram':
      {
        await serve_html(res, 'insta.html');
      }
      break;
    case '/tiktok':
      {
        await serve_html(res, 'tik.html');
      }
      break;
    //favicon
    case '/favicon.ico':
      {
        await serve_img(res, 'favicon.ico');
      }
      break;
    case '/favicon-32x32.png':
      {
        await serve_img(res, 'favicon-32x32.png');
      }
      break;
    case '/favicon-16x16.png':
      {
        await serve_img(res, 'favicon-16x16.png');
      }
      break;
    case '/apple-touch-icon.png':
      {
        await serve_img(res, 'apple-touch-icon.png');
      }
      break;
    case '/android-chrome-512x512.png':
      {
        await serve_img(res, 'android-chrome-512x512.png');
      }
      break;
    case '/android-chrome-192x192.png':
      {
        await serve_img(res, 'android-chrome-192x192.png');
      }
      break;
    case '/site.webmanifest':
      {
        fs.readFile(path.join(pages, 'site.webmanifest'), (err, data) => {
          if (err) {
            serr(err);
          } else {
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end(data);
          }
        });
      }
      break;
    default:
    {
      fs.readFile(path.join(pages, '404.html'), (err, data) => {
        if (err) {
          serr(res, err);
        } else {
          console.error(`${req.url} NOT FOUND`);
          res.writeHead(404, {'Content-Type': 'text/html'});
          res.end(data);
          console.log(`INFO: responce 404 NOT_FOUND 404.html`);
        }
        });
    }
  }
}

if (isNaN(port)) {
  console.warn(`WARNING: invalid port ${port}`);
  port = 8000
}

const s = http.createServer(server);
s.listen(port, () => {
  console.log(`INFO: server started at https://${os.hostname()}`);
  console.log(`INFO: server listening at port ${port}`);
  console.log(`INFO: view website at https://${os.hostname()}:${port}`);
});

process.on('SIGINT', () => {
  console.log('INFO: server shutting down...');
  s.close(() => process.exit(1));
})