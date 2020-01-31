const colors = {
  green: {
    wrapperBackground: "#E6E1C3",
    headerBackground: "#C1C72C",
    headerColor: "black",
    photoBorderColor: "#black"
  },
  blue: {
    wrapperBackground: "#5F64D3",
    headerBackground: "#26175A",
    headerColor: "white",
    photoBorderColor: "#73448C"
  },
  pink: {
    wrapperBackground: "#879CDF",
    headerBackground: "#FF8374",
    headerColor: "white",
    photoBorderColor: "#FEE24C"
  },
  red: {
    wrapperBackground: "#DE9967",
    headerBackground: "#870603",
    headerColor: "white",
    photoBorderColor: "white"
  }
};
const generateHTML = data => {
  return `       <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css"/>
        <title>Profile Generator</title>
        <style>
         .before {
         box-sizing: border-box;
         }
         html, body, .wrapper {
         height: 100%;
         }
         .wrapper {
         background-color: rgb(179, 172, 172);
         padding-top: 100px;
         }
         body {
         font-family: 'Vicente Lamónaca', 'Sans', serif;
         background-color: ${colors[data.color].headerBackground};
         }
         main {
         height: auto;
         background-color: ${colors[data.color].headerBackground};
         }
         .avi {
         position: center;
         margin: 0 auto;
         color: black;
         padding: 10px;
         background-color: ${colors[data.color].headerBackground};
         margin-bottom: -50px;
         display: flex;
         justify-content: center;
         flex-wrap: wrap;
         width: 95%;
         border-radius: 6px;
         }
         .avi img {
         width: 250px;
         height: 250px;
         border-radius: 50%;
         object-fit: cover;
         margin-top: -75px;
         border: 6px solid black;
         box-shadow: rgba(0, 0, 0, 0.3) 4px 1px 20px 4px;
         }
         .container {
         padding: 55px;
         padding-left: 125px;
         padding-right: 125px;
         }
         h1, h2, h3, h4, h5, h6 {
         font-family: 'Vicente Lamónaca','Sans', serif;
         margin: 0;
         }
         h1 {
         font-size: 2.5em;
         }
         h2, h3 {
         font-size: 1.75em;
         }
         h4{
         font-size: 1.5em;
         }
         h5, h6 {
         font-size: 1em;
         }
         .avi h1, .avi h2 {
         width: 100%;
         text-align: center;
         }
         .avi h1 {
         margin-top: 10px;
         }
         .nav-link {
         display: inline-block;
         margin: 5px;
         }
         .links-nav {
         width: 100%;
         text-align: center;
         font-size: .75em;
         padding: 0;
         }
         .row {
           display: flex;
           margin-top: 20px;
           margin-bottom: 20px;
         }
         .col {
         flex: 1;
         text-align: center;
         }
         .card {
           color: black;
           padding: 20px;
           background-color: ${colors[data.color].headerBackground};
           margin: 20px;
           /* gives cards curvy edges */
           border-radius: 6px;
         }
         a, a:hover {
         text-decoration: none;
         color: black;
         font-weight: bolder;
         }
      </style>
      </head>
      <body>
        <!--website wrapper-->
         <div class="wrapper">
          <div class="avi">
        <!--User Profile Picture and heading-->
          <img src="${data.profilePic}" alt="Profile Picture" />
          <br>
          <h1>Hey!</h1>
          <br>
          <h2>
          My name is ${data.name}!</h1>
          <br>
          <h5>${data.bio}</h5>
          <br>
         <nav class="links-nav">
           <!--href links to location, repo site, and porfolio-->
          <a class="nav-link" target="_blank" rel="noopener noreferrer" href="https://www.google.com/maps/place/${
            data.location
          }"><i class="fas fa-location-arrow"></i> Fishtown Philadelphia, PA</a>
          <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
            data.profileUrl
          }"><i class="fab fa-github-alt"></i> GitHub</a>
          <a class="nav-link" target="_blank" rel="noopener noreferrer" href="${
            data.blog
          }"><i class="fas fa-rss"></i> Blog</a>
          </nav>
          </div>
      <!--All content cards will be in this main container-->
          <main>
          <div class="container">
          <div class="row">
          <div class="col">
          <div class="card">
           <h3>Public Repositories</h3>
          <h4>${data.repos}</h4>
          </div>
          </div>
          <div class="col">
          <div class="card">
           <h3>Followers</h3>
          <h4>${data.followers}</h4>
          </div>
          </div>
           </div>
          <div class="row">
          <div class="col">
          <div class="card">
           <h3>GitHub Stars</h3>
          <h4>${data.starCount}</h4>
           </div>
            </div>
          <div class="col">
           <div class="card">
            <h3>Following</h3>
             <h4>${data.following}</h4>
            </div>
          </div>
        </div>
      </div>
      </main>
      </div>
      </body>
      </html>`;
};
// generateHTML();
module.exports = generateHTML;
