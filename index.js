const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs") ;
const convertFactory = require('electron-html-to'); //need to install converter and electron.
const generateHTML = require("./generateHTML");
const axios = require("axios");
// everytime i try to push up a github after installing npm packages I get an error message: // File node_modules/electron/dist/Electron.app/Contents/Frameworks/Electron Framework.framework/Versions/A/Electron F
// ramework is 110.26 MB; this exceeds GitHub's file size limit of 100.00 MB
// To github.com:Dioris-cpu/dev-gen.git
//  ! [remote rejected] master -> master (pre-receive hook declined)
// error: failed to push some refs to 'git@github.com:Dioris-cpu/dev-gen.git'


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
        const {
          username,
          color,
        } = response;
        
       
        axios.get(`https://api.github.com/users/${username}`)
          .then(function(res) {
            const  { login, followers, following, bio, blog} = res.data;
            //console.log("Login",login, "Followers",followers, "Following",following, "Bio",bio, "Blog",blog);
            const repoURL = `https://api.github.com/users/${login}/repos`;
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
                // console.log(generateHTML(res.data) )
  
                conversion({ html: generateHTML(res.data) }, function(err, result) {
                  if (err) {
                    return console.error(err);
  
                  } 
                 
                  result.stream.pipe(fs.createWriteStream(path.join(__dirname, "test.pdf")))
                  conversion.kill(); 
                });
  
                
            });
      
            // console.log(response);
          })
          
          .catch((error) => {
            // handle error
            console.log(error);
          })
       
      });
      
  }
  userInput()
  ;
  