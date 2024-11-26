const mongoose = require('mongoose');
const uri = "mongodb+srv://123456alpha:123456alpha@smartnavigationsys.kxaac.mongodb.net/?retryWrites=true&w=majority&appName=smartNavigationSys";
const url = 'mongodb://127.0.0.1:27017/smartNavigationSys';

const conn = mongoose.createConnection(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
   }
);
conn.on('open', () => {
	console.log('connect to mongodb/smartNavigationSys');
});
conn.on('err', (err) => {
	console.log('err 101:' + err);
});

module.exports = conn; //commonJs 语法，导出conn模块。

