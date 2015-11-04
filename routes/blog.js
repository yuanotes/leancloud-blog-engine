var router = require('express').Router();
var AV = require('leanengine');

// `AV.Object.extend` 方法一定要放在全局变量，否则会造成堆栈溢出。
// 详见： https://leancloud.cn/docs/js_guide.html#对象
var Post = AV.Object.extend('Post');
var Category = AV.Object.extend('Category');
var Tag = AV.Object.extend('Tag');

router.get('/categories', function(req, res, next){
    var query = new AV.Query(Category);
    query.ascending("name");
    query.find({
        success: function(cateArray){
            res.json({
                categories: cateArray
            });
        },
        error: function(err){
            if (err.code === 101){
                res.json({
                    categories: []
                });
            } else {
                next(err);
            }
        }
    })
});

// 查询 Post 列表
router.get('/posts', function(req, res, next) {
    var limit = 5;
    var skip = 0;
    if (req.limit) {
        limit = parseInt(req.limit) || limit;
        skip = parseInt(req.skip) || skip;
    }
    AV.Query.doCloudQuery('select title,slug,createdAt from Post limit ?,? order by createdAt desc',[skip,limit],{
        success: function(results) {
            res.json({
                posts: results.results
            });
        },
        error: function(err) {
            if (err.code === 101) {
                // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
                // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
                res.json({
                    posts: []
                });
            } else {
                next(err);
            }
        }
    });
});

router.get('/post', function(req, res, next) {
    AV.Query.doCloudQuery('select title,slug,createdAt from Post limit ?,? order by createdAt desc',[skip,limit],{
        success: function(results) {
            res.json({
                posts: results.results
            });
        },
        error: function(err) {
            if (err.code === 101) {
                // 该错误的信息为：{ code: 101, message: 'Class or object doesn\'t exists.' }，说明 Todo 数据表还未创建，所以返回空的 Todo 列表。
                // 具体的错误代码详见：https://leancloud.cn/docs/error_code.html
                res.json({
                    posts: []
                });
            } else {
                next(err);
            }
        }
    });
});


module.exports = router;
