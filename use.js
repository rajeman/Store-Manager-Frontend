const  bcrypt =  require('bcrypt');
let realHash = '';
bcrypt.hash('abcdefghij', 8)
          .then((hash) => {
            // start storage process
            realHash = hash;
            console.log(realHash);  
            console.log(bcrypt.compareSync('abcdefghij', realHash));
       
          }).catch((e) => {
            console.log(e);
          });

