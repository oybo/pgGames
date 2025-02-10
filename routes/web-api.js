var express = require('express');
var fs = require('fs');
const path = require('path');
var router = express.Router();

/*
    验证玩家会话的json
*/
const verifyOperatorPlayerSession = fs.readFileSync(path.join(__dirname,  '../jsons/verifyOperatorPlayerSession.json'), {encoding: 'utf-8'});
const verifySession = fs.readFileSync(path.join(__dirname,  '../jsons/verifySession.json'), {encoding: 'utf-8'});
/*
    游戏信息，id和名称
*/
const gameName = fs.readFileSync(path.join(__dirname,  '../jsons/gameName.json'), {encoding: 'utf-8'});
/*
    socialInitConfig
*/
const socialInitConfig = fs.readFileSync(path.join(__dirname,  '../jsons/socialInitConfig.json'), {encoding: 'utf-8'});
/*
    游戏钱包
*/
const gameWallet = fs.readFileSync(path.join(__dirname,  '../jsons/gameWallet.json'), {encoding: 'utf-8'});
/*
    gameUI
*/
const gameUI = fs.readFileSync(path.join(__dirname, '../jsons/GameUI.json'), {encoding: 'utf-8'});
/*
    游戏ID资源，id-icon
*/
const getByResourcesTypeIds = fs.readFileSync(path.join(__dirname, '../jsons/GetByResourcesTypeIds.json'), {encoding: 'utf-8'});
const getByReferenceIdsResourceTypeIds = fs.readFileSync(path.join(__dirname, '../jsons/GetByReferenceIdsResourceTypeIds.json'), {encoding: 'utf-8'});
/*
    gameRule
*/
const gameRule = fs.readFileSync(path.join(__dirname, '../jsons/gameRule.json'), {encoding: 'utf-8'});
/*
    游戏投注历史
*/
const BetSummary = fs.readFileSync(path.join(__dirname, '../jsons/BetSummary.json'), {encoding: 'utf-8'});
const BetHistory = fs.readFileSync(path.join(__dirname, '../jsons/BetHistory.json'), {encoding: 'utf-8'});

/* GET users listing. */
router.post('/auth/session/v2/verifyOperatorPlayerSession', function (req, res, next) {
    res.send(JSON.parse(verifyOperatorPlayerSession));
});

router.post('/auth/session/v2/verifySession', function (req, res, next) {
    res.send(JSON.parse(verifySession));
});

router.post('/game-proxy/v2/GameName/Get', function (req, res, next) {
    res.send(JSON.parse(gameName));
});

router.post('/game-proxy/Social/SocialInitConfig/Get', function (req, res, next) {
    res.send(JSON.parse(socialInitConfig));
});

router.post('/game-proxy/v2/GameWallet/Get', function (req, res, next) {
    res.send(JSON.parse(gameWallet));
});

/* GameUI */
router.post('/game-proxy/v2/GameUI/Get', (req, res, next) => {
    res.json(JSON.parse(gameUI));
});

/* GetByResourcesTypeIds */
router.post('/game-proxy/v2/Resources/GetByResourcesTypeIds', (req, res, next) => {
    res.json(JSON.parse(getByResourcesTypeIds));
});

/* GetByReferenceIdsResourceTypeIds */
router.post('/game-proxy/v2/Resources/GetByReferenceIdsResourceTypeIds', (req, res, next) => {
    // let atk = req.body?.atk,     // 游戏token：A20EZ1G6-B0O9-SV60-E57M-1V1J4O98T3VV
    //     btt = req.body?.btt,            // 类型： 1=正式 2=试玩
    //     du = req.body?.du,              // 用途：https://m.pg-nmga.com
    //     gid = req.body?.gid,            // 游戏编号：1695365，与rids不会同时存在。
    //     lang = req.body?.lang,          // 语言： zh
    //     otk = req.body?.otk,            // operator token: E48208EE-563D-6D3D-0B35-FFA2052B2DBC
    //     pf = req.body?.pf,              // 未知：1
    //     rids = req.body?.rids,          // 游戏编号： 1695365
    //     rtids = req.body?.rtids;        // 未知：7/11/13/19，根据这个值返回对应的值结果

    // 默认是 0 ，也就是出错的结果。
    let idx = 0, rtids = parseInt(req.body?.rtids);
    switch (rtids) {
        case 7:
            idx = 1;
            break
        case 11:
            idx = 2;
            break
        case 13:
            idx = 3;
            break
        case 19:
            idx = 4;
            break
    }
    res.json(JSON.parse(getByReferenceIdsResourceTypeIds)[idx]);
});

/* 
    游戏规则
*/
router.post('/game-proxy/v2/GameRule/Get', (req, res, next) => {
    res.json(JSON.parse(gameRule));
});

/* 
    游戏总结，和BetHistory一起
*/
router.post('/game-proxy/v2/BetSummary/Get', (req, res, next) => {
    res.json(JSON.parse(BetSummary));
});

/* 
    返回游戏的投注历史
*/
router.post('/game-proxy/v2/BetHistory/Get', (req, res, next) => {
    res.json(JSON.parse(BetHistory));
});

module.exports = router;
