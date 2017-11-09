var express = require('express');
var router = express();
//.Router({ caseSensitive: true });

//Register
router.post('/register', function(request, response){
   console.log(request.body);
});





module.exports = router;