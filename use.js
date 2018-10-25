const  bcrypt =  require('bcrypt');
let realHash = '';
bcrypt.hash('adminpassword', 7)
          .then((hash) => {
            // start storage process
            realHash = hash;
            console.log(hash);  
            console.log(bcrypt.compareSync('adminpassword', realHash));
       
          }).catch((e) => {
            console.log(e);
          });

