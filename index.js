const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const convertFactory = require("electron-html-to"); //need to install converter and electron.
const generateHTML = require("./generateHTML");
const axios = require("axios");
// const pdfconverter = require("html-pdf")

function userInput() {
  return inquirer
    .prompt([
      {
        type: "input",
        message: "What is your github username ?",
        default: "Dioris-cpu",
        name: "username"
      },
      {
        type: "list",
        message: "whats your favorite color ?",
        name: "color",
        choices: [
          {
            name: "Red",
            value: "red"
          },
          {
            name: "Blue",
            value: "blue"
          },
          {
            name: "Green",
            value: "green"
          },
          {
            name: "Pink",
            value: "pink"
          }
        ]
      }
    ])

    .then(response => {
      const { color, username } = response;
      axios.get(`https://api.github.com/users/${username}`).then(function(res) {
        const dataObj = {
          profilePic: res.data.avatar_url,
          name: res.data.name,
          location: res.data.location,
          profileUrl: res.data.html_url,
          bio: res.data.bio,
          blog: res.data.blog,
          company: res.data.company,
          repos: res.data.public_repos,
          followers: res.data.followers,
          following: res.data.following,
          color: color
        };
        // console.log(data);
        const newQueryUrl = `https://api.github.com/users/${username}/repos`;
        // console.log(newQueryUrl);
        // Make a request for a user with a given ID
        //the axios function will fix the star count problem
        axios.get(newQueryUrl).then(function(res) {
          let starCount = 0;
          for (let index = 0; index < res.data.length; index++) {
            let count = res.data[index].stargazers_count;
            starCount = starCount + count;
            // console.log(res);
          }

          //const  { login, followers, following, bio, blog} = res.data;
          //console.log("Login",login, "Followers",followers, "Following",following, "Bio",bio, "Blog",blog);
          const repoURL = `https://api.github.com/users/${username}/repos`;
          axios.get(repoURL).then(function(response) {
            const repoNames = response.data.map(function(repo) {
              return repo.name;
            });
            //const repoNamesStr = repoNames.join("\n");
            //console.log("REPOS: \n" + repoNamesStr);

            const conversion = convertFactory({
              converterPath: convertFactory.converters.PDF
            });

            res.data.color = color;
            // console.log(res.data);
            // console.log(generateHTML(res.data)
            const html = generateHTML(dataObj)
            console.log(html)
            conversion({ html: html}, function(err, result) {
              if (err) {
                return console.error(err);
              }
              result.stream.pipe(
                fs.createWriteStream(path.join(__dirname, "test.pdf"))
              );
              conversion.kill();
            });
            
          }).catch(err => console.log(err))
        });
      }).catch(err => {
        // handle error
        console.log(err);
      })
    }).catch(err => console.log(err))
    
}
userInput()
