var router = require('express').Router();
var AV = require('leanengine');


// // 查询 Todo 列表
// router.get('/', function (req, res, next) {
// 	var query = new AV.Query(Todo);
// 	query.descending('createdAt');
// 	query.find().then(function (results) {
// 		res.render('todos', {
// 			title: 'TODO 列表',
// 			todos: results
// 		});
// 	}, function (err) {
// 		if (err.code === 101) {
// 			// 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
// 			// 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
// 			res.render('todos', {
// 				title: 'TODO 列表',
// 				todos: []
// 			});
// 		} else {
// 			next(err);
// 		}
// 	}).catch(next);
// });

// 新增 Todo 项目
router.post('/test', function (req, res, next) {
	console.log(req)
	console.log(res)
	console.log(next)

});

module.exports = router;
