var express = require('express');
var fs = require('fs');
const path = require('path');
var router = express.Router();


/*
    返回 游戏参数，如投注倍数,金额等
*/

// 虎虎生财
const tigerGameInfo = fs.readFileSync(path.join(__dirname, '../jsons/fortune-tiger/gameInfo.json'), { encoding: 'utf-8' });
router.post('/fortune-tiger/v2/GameInfo/Get', function (req, res, next) {
    res.send(JSON.parse(tigerGameInfo));
});

// 金龙送宝
const dragonGameInfo = fs.readFileSync(path.join(__dirname, '../jsons/fortune-dragon/gameInfo.json'), { encoding: 'utf-8' });
router.post('/fortune-dragon/v2/GameInfo/Get', function (req, res, next) {
    res.send(JSON.parse(dragonGameInfo));
});



/*
    返回 游戏投注结果
*/

// 虎虎生财
router.post('/fortune-tiger/v2/Spin', function (req, res, next) {
    let spin = ''
    // 为了模拟随机性，这里随机不中奖和中奖
    let randomNum = Math.random() * 10;
    if (randomNum >= 5) {
        // 中奖
        spin = fs.readFileSync(path.join(__dirname, '../jsons/fortune-tiger/gameSpin_win.json'), { encoding: 'utf-8' });
    } else {
        // 不中奖
        spin = fs.readFileSync(path.join(__dirname, '../jsons/fortune-tiger/gameSpin_lose.json'), { encoding: 'utf-8' });
    }

    // 这里需要注意, 需要每次对返回的sid和psid赋值唯一id，这个值就是在下次投注时提交过来的body里id的值
    let sId = '188784' + new Date().getTime();
    let resJson = JSON.parse(spin);
    resJson.dt.si.sid = sId;
    resJson.dt.si.psid = sId;

    // blb为投注前的金额，blab为投注前金额减去投注的钱，bl则是最终的余额，如果中奖了则在blab的基础上加上中奖的钱，不中奖那就和blab是相等的，
    res.send(resJson);
});

// 金龙送宝
router.post('/fortune-dragon/v2/Spin', function (req, res, next) {
    let spin = ''
    // 为了模拟随机性，这里随机不中奖和中奖
    let randomNum = Math.random() * 10;
    if (randomNum >= 5) {
        // 中奖
        spin = fs.readFileSync(path.join(__dirname, '../jsons/fortune-dragon/gameSpin_win.json'), { encoding: 'utf-8' });
    } else {
        // 不中奖
        spin = fs.readFileSync(path.join(__dirname, '../jsons/fortune-dragon/gameSpin_lose.json'), { encoding: 'utf-8' });
    }

    // 这里需要注意, 需要每次对返回的sid和psid赋值唯一id，这个值就是在下次投注时提交过来的body里id的值
    let sId = '188784' + new Date().getTime();
    let resJson = JSON.parse(spin);
    resJson.dt.si.sid = sId;
    resJson.dt.si.psid = sId;

    // blb为投注前的金额，blab为投注前金额减去投注的钱，bl则是最终的余额，如果中奖了则在blab的基础上加上中奖的钱，不中奖那就和blab是相等的，
    res.send(resJson);
});


module.exports = router;
