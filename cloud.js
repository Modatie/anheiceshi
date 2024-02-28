var AV = require('leanengine');
var query = new AV.Query('item');
query.limit(500)
query.find().then(function (results) {
    var results = results.map(results => results.toJSON()) //从网络拿到数据
    global.item_results = results;
})



AV.Cloud.define('creathuman', function (request, response) {
    var g1 = request.params.g1;
    var g2 = request.params.g2;
    var db_human = request.params.db_human
    var name = request.params.name
    var job = request.params.job
    var ll = request.params.ll
    var mj = request.params.mj
    var zl = request.params.zl
    var tn = request.params.tn
    var player = request.params.player
    var lasttimetamp = request.params.lasttimetamp

    if (ll > 10 || mj > 10 || zl > 10 || tn > 10 || g1 > 8888888) {
        console.log("创建人物作弊" + request.meta.remoteAddress)
        return response.error("创建人物作弊");
    }
    var TodoFolder = AV.Object.extend(db_human);
    var todoFolder = new TodoFolder();
    var user = AV.Object.createWithoutData('_User', player);
    todoFolder.set('skill1_level', 1);
    todoFolder.set('skill2_level', 1);
    todoFolder.set('skill3_level', 1);
    todoFolder.set('skill4_level', 1);
    todoFolder.set('cqarray', []);
    todoFolder.set('payed', 0);
    todoFolder.set('HJ', 0);
    todoFolder.set('level', 1);
    todoFolder.set('level_t', 0);
    todoFolder.set('exp', 0);
    todoFolder.set('xueyan', 0);
    todoFolder.set('critdamage', 50);

    todoFolder.set('gold', g1);
    todoFolder.set('welcome', g2);

    todoFolder.set('diamond', 0);
    todoFolder.set('fighting_time', 0);
    todoFolder.set('fly', 0);
    todoFolder.set('keys', 0);
    todoFolder.set('critdamage_jc', 0);
    todoFolder.set('diamond_1', 0);
    todoFolder.set('firstpay', false);
    todoFolder.set('damage_jc', 0);
    todoFolder.set('ice', 0);
    todoFolder.set('resistance', 0);
    todoFolder.set('resistance_jc', 0);
    todoFolder.set('dobuleexp', 0);
    todoFolder.set('limit', [0, 0, 0, 0, 0, 0]);
    todoFolder.set('gbl_limit', [0, 0]);
    todoFolder.set('fire', 0);
    todoFolder.set('goldhour', 0);
    todoFolder.set('poison_jc', 0);
    todoFolder.set('hj_jc', 0);
    todoFolder.set('exphour', 0);
    todoFolder.set('attback', 0);
    todoFolder.set('hp_jc', 0);
    todoFolder.set('speed_p', 0);
    todoFolder.set('ray', 0);
    todoFolder.set('speed', 1);
    todoFolder.set('pick', [1, 0, 0, 0]);
    todoFolder.set('damage1', 0);
    todoFolder.set('damage_p', 0);
    todoFolder.set('secmp', 1);
    todoFolder.set('damage2', 100);
    todoFolder.set('exp_all', 1200);
    todoFolder.set('map_big', 1);
    todoFolder.set('attback_jc', 0);
    todoFolder.set('map_small', 1);
    todoFolder.set('checkdiamond', false);
    todoFolder.set('band', false);
    todoFolder.set('crit', 5);
    todoFolder.set('cd_p', 0);
    todoFolder.set('MP', 100);
    todoFolder.set('fly_data', 0);
    todoFolder.set('mohe', [[], [], []]);
    todoFolder.set('dianf', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    todoFolder.set('cqarray_jc', []);
    todoFolder.set('ray_jc', 0);
    todoFolder.set('ice_jc', 0);
    todoFolder.set('HP', 650);
    todoFolder.set('fire_jc', 0);
    todoFolder.set('poison', 0);
    todoFolder.set('name', name);
    todoFolder.set('job', job);
    todoFolder.set('user', user);
    todoFolder.set('LL', ll);
    todoFolder.set('MJ', mj);
    todoFolder.set('ZL', zl);
    todoFolder.set('TN', tn);
    todoFolder.set('lasttimetamp', lasttimetamp)
    todoFolder.set('map_yg', 1);
    todoFolder.set('map_gbl', 1);
    todoFolder.set('level_t', 0);
    todoFolder.set('offline', [0, 1]);
    todoFolder.set('diaarray', [0, 0, 0, 0, 0]);
    todoFolder.set('diaarray_jc', [0, 0, 0, 0, 0]);
    todoFolder.save().then(function (todo) {
        return response.success(todo);
    }, function (error) {
        return response.error(error);
    });
})
/**
 * 天天暗黑-战斗
 */
AV.Cloud.define('fight', function (request, response) {
    var wordexp = 1
    if (request.params.db_id !== undefined) {
        wordexp = request.params.db_id / 2386
    }
    if (request.currentUser === undefined) {
        return response.error("登陆失败");
    }
    if (!request.currentUser) {
        return response.error("登陆失败");
    } else {
        var cloud_human = request.params.db_human
        var cloud_bag = request.params.db_bag
        var cloud_diamond = request.params.db_diamond
        var cloud_follow = request.params.db_follow
        if (request.params.vision != undefined && request.params.vision == "3.1") {
            var query = new AV.Query(cloud_human);
            query.equalTo('user', request.currentUser);//request.currentUser
            query.find().then(function (results) {
                var data = results.map(results => results.toJSON()) //从网络拿到数据
                if (data.length > 0) {

                    if (request.params.logincheckid == data[0].logincheckid && data[0].band == false) {

                        var nowtime = new Date()
                        var nowtimetamp = (nowtime.getTime())
                        var today_date = nowtime.getDate();//得到日期
                        var limit = data[0].limit;
                        var gbl_limit = data[0].gbl_limit;

                        if (limit[0] != today_date) {
                            limit = [today_date, 0, 0, 0, 0, 0]
                        }
                        if (gbl_limit[0] != today_date) {
                            gbl_limit = [today_date, 0]
                        }
                        if ((nowtimetamp - data[0].lasttimetamp) < 360000) {

                            // 时间短，没有离线
                            if ((nowtimetamp - data[0].lasttimetamp) < (data[0].fighting_time * 1000)) {

                                return response.error("刷新太快");
                            } else {

                                if (request.params.maptype == "big") {
                                    startfight_on(limit, gbl_limit, data[0], request.params.maptype, request.params.map > 0 ? (request.params.map > 60 ? 60 : request.params.map) : 1, request.params.map)
                                } else {
                                    startfight_on(limit, gbl_limit, data[0], request.params.maptype, request.params.map > 0 ? (request.params.map > 60 ? 60 : request.params.map) : 1, request.params.map)
                                }
                            }

                        } else {
                            //离线获取
                            var todo = AV.Object.createWithoutData(cloud_human, data[0].objectId);
                            todo.set('ip', request.meta.remoteAddress)
                            todo.set('fighting_time', 0)
                            todo.set('limit', limit)
                            todo.set('gbl_limit', gbl_limit)
                            todo.set('lasttimetamp', nowtimetamp)
                            todo.set('days', Math.floor((new Date(data[0].updatedAt) - new Date(data[0].createdAt)) / (1000 * 3600 * 24)))
                            todo.save()
                            if (data[0].offline[0] == 1) {  //离线大米

                                offlinebigok(data, data[0].offline[1])
                            } else {

                                offlineok(data)
                            }
                        }
                    } else {
                        return response.error("重复登陆");
                    }

                } else {
                    return response.error("未得到数据");
                }
            }, function (error) {
                return response.error(error);
            });
        } else {
            return response.error("版本不符");
        }
    }
    function startfight_on(limit, gbl_limit, humandata, type, monster_level, map) {

        var cqarray = humandata.cqarray;
        if (humandata.mohe[0][0] !== undefined) {
            cqarray.push(humandata.mohe[0][0])
            if (humandata.mohe[0][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[0][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[1][0] !== undefined) {
            cqarray.push(humandata.mohe[1][0])
            if (humandata.mohe[1][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[1][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[2][0] !== undefined) {
            cqarray.push(humandata.mohe[2][0])
            if (humandata.mohe[2][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[2][1].substring(7)) + 1000)
            }
        }

        var temphp = humandata.HP
        if ((cqarray.indexOf(32) > -1 || humandata.cqarray_jc.indexOf(32) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 5
        }
        if ((cqarray.indexOf(31) > -1 || humandata.cqarray_jc.indexOf(31) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 6
        }

        var dianfarr = humandata.dianf;
        function getwuli(hj) {
            return (100 - ((Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]) > 80 ? 80 : (Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]))) / 100
        }


        humandata.HP = humandata.HP * (1 + dianfarr[0] / 100)
        humandata.resistance = humandata.resistance + dianfarr[2]
        humandata.attback = humandata.attback + dianfarr[3]

        humandata.critdamage = humandata.critdamage + dianfarr[4]
        humandata.ice = humandata.ice + dianfarr[5]
        humandata.fire = humandata.fire + dianfarr[6]
        humandata.ray = humandata.ray + dianfarr[7]
        humandata.poison = humandata.poison + dianfarr[8]
        var exp_df = dianfarr[9] / 100
        var rate_df = dianfarr[10] / 100


        var monsterlist = [
            { "name": "沉沦魔", "damage": 80, "hp": 100, "hj": 10, "speed": 0.9, "type": "普通" },
            { "name": "小恶魔", "damage": 100, "hp": 120, "hj": 10, "speed": 0.9, "type": "普通" },
            { "name": "疯恶魔", "damage": 120, "hp": 130, "hj": 10, "speed": 1.0, "type": "普通" },
            { "name": "监督者", "damage": 150, "hp": 150, "hj": 10, "speed": 1.0, "type": "普通" },
            { "name": "畸形怪[精英]", "damage": 180, "hp": 200, "hj": 20, "speed": 1.1, "type": "精英" }
        ]
        var bosslist = [
            { "name": "地狱使者[精英]", "damage": 250, "hp": 200, "hj": 10, "speed": 0.9, "type": "精英" },
            { "name": "地魔[精英]", "damage": 180, "hp": 300, "hj": 10, "speed": 1.0, "type": "精英" },
            { "name": "屠夫[精英]", "damage": 250, "hp": 400, "hj": 20, "speed": 1.1, "type": "精英" },
            { "name": "地魔[BOSS]", "damage": 400, "hp": 500, "hj": 50, "speed": 1.4, "type": "BOSS" },
            { "name": "地狱使者[BOSS]", "damage": 400, "hp": 500, "hj": 50, "speed": 1.4, "type": "BOSS" }
        ]
        var skillslist = [
            { "name": "冰霜新星", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "聚能轰击", "needmp": 25, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷电脉冲", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "剧毒之环", "needmp": 30, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰霜之箭", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "狂暴之箭", "needmp": 20, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷神之箭", "needmp": 25, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "萃毒之箭", "needmp": 20, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰风斩", "needmp": 25, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "山崩地裂", "needmp": 25, "cd": 10, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "顺劈斩", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "巫毒狂暴", "needmp": 40, "cd": 15, "level1": 5, "level2": 8, "level3": 15, "level4": 20, "level5": 28, "level6": 36, "level7": 45, "level8": 60, "level9": 80 },
        ]

        var p_skill1 = humandata.skill1_level;
        var p_skill2 = humandata.skill2_level;
        var p_skill3 = humandata.skill3_level;
        var p_skill4 = humandata.skill4_level;
        if (humandata.job == 1) {
            var mydias = humandata.diaarray[0] + humandata.diaarray_jc[0]
            var skill1 = skillslist[11];
            var skill2 = skillslist[9];
            var skill3 = skillslist[8];
            var skill4 = skillslist[10];
        }
        if (humandata.job == 2) {
            var mydias = humandata.diaarray[2] + humandata.diaarray_jc[2]
            var skill1 = skillslist[7];
            var skill2 = skillslist[5];
            var skill3 = skillslist[4];
            var skill4 = skillslist[6];
        }
        if (humandata.job == 3) {
            var mydias = humandata.diaarray[1] + humandata.diaarray_jc[1]
            var skill1 = skillslist[3];
            var skill2 = skillslist[1];
            var skill3 = skillslist[0];
            var skill4 = skillslist[2];
        }
        var x = 'skill1.level' + p_skill1;
        var p_skill1_name = skill1.name;
        var p_skill1_damage = eval(x);
        var p_skill1_cd = skill1.cd;
        var p_skill1_needmp = skill1.needmp;
        x = 'skill2.level' + p_skill2;
        var p_skill2_name = skill2.name;
        var p_skill2_damage = eval(x);
        var p_skill2_cd = skill2.cd;
        var p_skill2_needmp = skill2.needmp;
        x = 'skill3.level' + p_skill3;
        var p_skill3_name = skill3.name;
        var p_skill3_damage = eval(x);
        var p_skill3_cd = skill3.cd;
        var p_skill3_needmp = skill3.needmp;
        x = 'skill4.level' + p_skill4;
        var p_skill4_name = skill4.name;
        var p_skill4_damage = eval(x);
        var p_skill4_cd = skill4.cd;
        var p_skill4_needmp = skill4.needmp;


        var ice_odds = 10//冰冻机率
        var ray_odds = 5 //瘫痪机率

        //回调数据
        var p_stateArray = [];               //基于人物速度
        var p_addhpArray = [];               //基于人物速度
        var p_dechpArray = [];//基于怪物速度
        var p_poisonArray = [];//基于怪物速度
        var p_mpArray = [];                   //基于人物速度
        var p_secmpArray = [];//每秒

        var m_stateArray = [];//基于怪物速度
        var m_dechpArray = [];              //基于人物速度
        var m_poisonArray = [];             //基于人物速度
        var detailArray = [];   //所有其它相关数据
        var p_detailArray = [];   //人物状态 复活
        var m_backhpArray = [];   //人物状态 复活

        //怪物属性
        var ranx = Math.random() * 0.2 + 0.9
        if (type == "big") {
            var monster = bosslist[Math.floor(Math.random() * bosslist.length)];
        } else {
            var monster = monsterlist[Math.floor(Math.random() * monsterlist.length)];
        }
        var m_name = monster.name;
        var m_damage = Math.floor(((Math.sqrt(monster.damage) * 1.2) * Math.floor(Math.sqrt(map)) * 5 * map) * ranx) * (map < 6 ? 0.3 : 1) * (map > 19 ? 1.2 : 1) * (map > 29 ? 1.2 : 1) * (map > 39 ? 1.5 : 1) * (map > 49 ? 1.5 : 1) * (map > 54 ? 1.2 : 1) * (map > 59 ? 1.2 : 1) * (map > 64 ? 1.2 : 1) * (map > 69 ? 1.2 : 1) * (map > 79 ? 1.2 : 1) * (map > 89 ? 1.5 : 1) * (map > 99 ? 2 : 1) * (map > 109 ? 1.2 : 1) * (map > 119 ? 1.2 : 1) * (map > 129 ? 1.2 : 1) * (map > 139 ? 1.2 : 1) * (map > 149 ? 1.2 : 1);
        var m_hp = Math.floor((monster.hp + (Math.sqrt(monster.hp) * 15 + 1) * Math.sqrt(map) * (map > 9 ? 40 : 20) * (map < 6 ? 0.3 : 0.6) * map * (map > 29 ? 2 : 1) * (map > 34 ? 2 : 1) * (map > 39 ? 2 : 1) * (map > 44 ? 2 : 1) * (map > 49 ? 2 : 1)) * (map > 54 ? 1.5 : 1) * (map > 59 ? 1.5 : 1) * (map > 64 ? 1.5 : 1) * (map > 69 ? 1.5 : 1) * (map > 79 ? 1.5 : 1) * (map > 89 ? 2 : 1) * (map > 99 ? 2 : 1) * (map > 109 ? 1.4 : 1) * (map > 119 ? 1.4 : 1) * (map > 129 ? 1.4 : 1) * (map > 139 ? 1.4 : 1) * (map > 149 ? 1.4 : 1) * ranx);
        var m_hj = map < 6 ? m_hj = 0 : Math.floor((monster.hj + (Math.sqrt(monster.hj) * 1 + 1) * Math.sqrt(map) * 3.5 * map) * ranx);
        var m_speed = monster.speed;
        var m_type = monster.type;

        //人物属性
        var huodong = 1 * wordexp; // 活动
        var jctemp = 0.2;  //追随者加成
        var jctemp_exp = 1 * (1 + exp_df) * huodong;
        var nowtime = new Date()
        nowtime = nowtime.getTime()
        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? jctemp = 0.2 : (humandata.fly == 1 ? jctemp = 0.7 : jctemp = 1)              //翅膀加成 正常
            humandata.fly == 0 ? jctemp_exp = 1 * (1 + exp_df) * huodong : (humandata.fly == 1 ? jctemp_exp = 1.5 * (1 + exp_df) * huodong : jctemp_exp = 2 * (1 + exp_df) * huodong)     //翅膀经验  正常
        }

        var p_hp = humandata.HP + (humandata.hp_jc * jctemp);   //人物HP
        var p_mp = humandata.MP;    //人物MP
        var p_secmp = humandata.secmp;    //人物MP
        var p_hj = humandata.HJ + (humandata.hj_jc * jctemp);    //人物护甲
        var p_resistance = humandata.resistance + (humandata.resistance_jc * jctemp); //人物元素抗性
        var p_attback = humandata.attback + (humandata.attback_jc * jctemp);  //  人物击回
        var p_cd = humandata.cd_p;      //人物CD减少
        var p_crit = humandata.crit;    //人物暴击机率
        var p_crit_temp = p_crit;       //爆击率的TEMP
        var p_critdamage = 1 + (humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100;    //人物暴击伤害
        var p_speed = humandata.speed;
        var p_fire = humandata.fire + (humandata.fire_jc * jctemp);
        var p_ice = humandata.ice + (humandata.ice_jc * jctemp);
        var p_poison = humandata.poison + (humandata.poison_jc * jctemp);
        var p_ray = humandata.ray + (humandata.ray_jc * jctemp);
        var p_level = humandata.level;
        var p_job = humandata.job;

        var exp = humandata.exp;
        var exp_all = humandata.exp_all;
        var p_zhu = humandata.job == 1 ? humandata.LL : humandata.job == 2 ? humandata.MJ : humandata.ZL
        //武器伤害
        var p_damage = Math.floor(humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) + Math.floor(humandata.damage_jc * jctemp)





        var legend_1 = 0;
        var legend_2 = false;
        var legend_3 = false;
        var legend_4 = false;
        var legend_6 = 1;
        var legend_7 = false;
        var legend_9 = false;
        var legend_10 = false;
        var legend_11 = false;
        var legend_13 = 1;
        var legend_14 = false;
        var legend_15 = false;
        var legend_20 = false;
        var legend_21 = false;
        var legend_22 = false;
        var legend_23 = false;
        var legend_23_3 = 3
        var legend_23_5 = 5
        var legend_22_i = 1
        var legend_24 = false;
        var legend_25 = false;
        var legend_28 = false;
        var legend_38 = false;
        var legend_38_ok = false;

        var legend100 = false;//套装
        var legend100_6 = false;
        var legend100_i = 0;
        var legend101 = false;
        var legend101_6 = false;
        var legend101_i = 0;
        var legend102 = false;
        var legend102_6 = false;
        var legend102_i = 0;
        var legend_exp = 1
        // for (var i = 0; i < cqarray.length; i++) {
        //     legend(cqarray[i])
        // }

        if (cqarray.indexOf(1) > -1) {
            legend_1 = 1;
        }
        if ((cqarray.indexOf(2) > -1) && p_level >= monster_level) {
            legend_2 = true;//1%秒杀不高于自己的怪
        }
        if (cqarray.indexOf(3) > -1) {
            legend_3 = true;  //暴击回复10%MP
        }
        if (cqarray.indexOf(4) > -1) {
            legend_4 = true;  //当你的生命值低于30%时，伤害提高100%
        }
        if (cqarray.indexOf(5) > -1) {           //如果你的暴击机率大于等于60%，则你每次必定暴击
            if (p_crit > 59) {
                p_crit = 100
            }
        }
        if (cqarray.indexOf(6) > -1) {  //你的追随者提供的伤害加成提高5%
            legend_6 = 1.05
        }
        if (cqarray.indexOf(7) > -1) {  //当受到致命伤害时，10%的机率回复50%的HP
            legend_7 = true;
        }
        if (cqarray.indexOf(8) > -1) {  //所有的技能MP消耗降低20
            p_skill1_needmp = Math.floor(skill1.needmp * 0.8);
            p_skill2_needmp = Math.floor(skill2.needmp * 0.8);
            p_skill3_needmp = Math.floor(skill3.needmp * 0.8);
            p_skill4_needmp = Math.floor(skill4.needmp * 0.8);
        }
        if (cqarray.indexOf(9) > -1) {  //当你的生命值低于20%时，必定暴击
            legend_9 = true;
        }
        if (cqarray.indexOf(10) > -1) {  //MP的值低于10%时，所受到的伤害减少50%
            legend_10 = true;
        }
        if (cqarray.indexOf(11) > -1) {  //攻击被控制的怪物时，必定暴击
            legend_11 = true;
        }
        if (cqarray.indexOf(12) > -1) {  //你的击回数值增加，增加的百分比为你的暴击机率
            p_attback = (humandata.attback + (humandata.attback_jc * jctemp)) * (1 + p_crit / 100)
        }
        if (cqarray.indexOf(13) > -1) {  //你对精英和BOSS的伤害增加100%
            if (monster.type != "普通") {
                legend_13 = 2
            }
        }
        if (cqarray.indexOf(14) > -1) {//你免疫所有控制（冰冻、瘫痪）
            legend_14 = true;
        }
        if (cqarray.indexOf(15) > -1) {  //你的每次攻击和技能都会提高火技能伤害1%
            legend_15 = true;
        }

        if (cqarray.indexOf(18) > -1) {//如果你的面板伤害低于追随者，则你的暴击伤害提高100%
            if (p_damage * (1 + (p_crit / 100 * p_critdamage / 100)) < humandata.damage_jc) {
                p_critdamage = 1 + ((humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100) + 1;

            }
        }

        if (cqarray.indexOf(19) > -1) {  //你的所有技能等级+2
            p_skill1 = humandata.skill1_level + 2;
            p_skill2 = humandata.skill2_level + 2;
            p_skill3 = humandata.skill3_level + 2;
            p_skill4 = humandata.skill4_level + 2;
            var xx = 'skill1.level' + p_skill1;
            p_skill1_damage = eval(xx);
            xx = 'skill2.level' + p_skill2;
            p_skill2_damage = eval(xx);
            xx = 'skill3.level' + p_skill3;
            p_skill3_damage = eval(xx);
            xx = 'skill4.level' + p_skill4;
            p_skill4_damage = eval(xx);
        }
        if (cqarray.indexOf(20) > -1) {//如果你的追随者也有此传奇属性，则他将为你分担一半伤害
            if (humandata.cqarray_jc.indexOf(20) > -1) {
                legend_20 = true;
            }
        }
        if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
            if (p_speed < m_speed) {
                legend_21 = true;
            }
        }

        if (cqarray.indexOf(23) > -1) {//华戒  少一件
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (humandata.cqarray_jc.indexOf(23) > -1) {
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (cqarray.indexOf(24) > -1) {//冰冻机率提高
            legend_24 = true;
            ice_odds = ice_odds + (humandata.ZL * 0.005)
        }
        if (cqarray.indexOf(25) > -1) {//冰冻技能优先
            legend_25 = true;
        }
        if (cqarray.indexOf(26) > -1 && mydias > 20) {
            p_cd += 30
        }
        if (cqarray.indexOf(27) > -1) {//护甲提高
            p_hj = humandata.HJ + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);    //人物护甲
        }
        if (cqarray.indexOf(28) > -1 || humandata.cqarray_jc.indexOf(28) > -1) {//普攻减CD1秒
            legend_28 = true;
        }
        if (cqarray.indexOf(30) > -1 || humandata.cqarray_jc.indexOf(30) > -1) {
            var newexpparr = cqarray
            newexpparr.push(...humandata.cqarray_jc)
            legend_exp = Math.max(...newexpparr)
            legend_exp = (legend_exp - 1000) / 100 + 1
            legend_exp > 1 ? legend_exp : 1
        }
        if (cqarray.indexOf(38) > -1 || humandata.cqarray_jc.indexOf(38) > -1) {
            legend_38 = true
        }
        if (cqarray.indexOf(100) > -1) {//套装

            legend100_i = getSameNum(100, cqarray)
            if (legend100_i > 1) {
                if (cqarray.indexOf(27) > -1) {//护甲提高
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);   //人物护甲
                } else {
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp);
                }

            }
            if (legend100_i > legend_23_3) {
                legend100 = true;
            }
            if (legend100_i > legend_23_5) {
                legend100_6 = true;
            }
        }


        if (cqarray.indexOf(101) > -1) {//套装
            legend101_i = getSameNum(101, cqarray)
            if (legend101_i > 1) {
                p_speed = humandata.speed * 1.2
            }
            if (legend101_i > legend_23_3) {
                legend101 = true;
            }
            if (legend101_i > legend_23_5) {
                legend101_6 = true;
            }
        }


        if (cqarray.indexOf(103) > -1) {//套装
            var legend103_i = getSameNum(103, cqarray)

            if (legend103_i > legend_23_5) {
                p_ray = p_ray * 2.5;
                p_fire = p_fire * 2.5;
                p_ice = p_ice * 2.5;
                p_poison = p_poison * 2.5;
            } else if (legend103_i > legend_23_3) {
                p_ray = p_ray * 1.5;
                p_fire = p_fire * 1.5;
                p_ice = p_ice * 1.5;
                p_poison = p_poison * 1.5;
            } else if (legend103_i > 1) {
                p_ray = p_ray * 1.2;
                p_fire = p_fire * 1.2;
                p_ice = p_ice * 1.2;
                p_poison = p_poison * 1.2;
            }
        }

        if (cqarray.indexOf(17) > -1) {  //所有技能元素属性变成你最高伤害比的那个元素属性
            var legend_17 = Math.max(p_ray, p_fire, p_ice, p_poison)
            p_ray = legend_17;
            p_fire = legend_17;
            p_ice = legend_17;
            p_poison = legend_17;
        }

        if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
            if (p_speed < m_speed) {
                legend_22 = true;
                legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
            }
        }

        if (cqarray.indexOf(16) > -1) {  //冰系技能冰冻机率提高，提高的百分比为你的冰系伤害
            ice_odds = 10 + Math.floor(p_ice / 10)
        }
        if (cqarray.indexOf(102) > -1) {//套装
            legend102_i = getSameNum(102, cqarray)
            if (legend102_i > 1) {
                if (cqarray.indexOf(16) > -1) {
                    ice_odds = 20 + Math.floor(p_ice / 10)
                } else {
                    ice_odds = 20
                }

            }
            if (legend102_i > legend_23_3) {
                legend102 = true;
            }
            if (legend102_i > legend_23_5 && map > p_level) {
                legend102_6 = true;
            } else {
                legend102_6 = false;
                if ((cqarray.indexOf(33) > -1 || humandata.cqarray_jc.indexOf(33) > -1) && p_job == 3) {
                    legend102_6 = true;
                }
            }
        }


        function getSameNum(val, arr) {
            processArr = arr.filter(function (value) {
                return value == val;
            })
            return processArr.length;
        }
        //技能配置
        // var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
        // var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
        // var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
        // var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]
        //初始化状态数据
        detailArray.push(p_speed)
        detailArray.push(m_speed)
        detailArray.push(m_name)
        detailArray.push(m_hp)
        detailArray.push(p_hp)
        detailArray.push(p_mp)
        if (legend_25 == true) {  //控制技能优先
            var temp_skill = 3
        } else {
            var temp_skill = 1
        }
        var m_state = "正常";
        var m_attstate = []  //怪攻击技能
        var h_yichang = []//人物异常状态 
        var m_state2 = "正常"; //中毒状态
        var p_state = "正常";
        var p_detail = '正常'
        var poison_time = 0;//中毒时间
        var cd1 = 0;
        var cd2 = 0;
        var cd3 = 0;
        var cd4 = 0;
        var m_times = 0;
        var m_skills = ["山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "冰霜新星", "雷电脉冲"]
        var fight_times = 0

        var Fight_p = setInterval(fight_p, 10 / p_speed);  //角色开始
        var Fight_m = setInterval(fight_m, 10 / m_speed);  //怪物开始
        var Fight_sec = setInterval(fight_sec, 10);  //每秒计时

        function stopInterval() {
            clearInterval(Fight_p);
            clearInterval(Fight_m);
            clearInterval(Fight_sec);
        }

        //每秒计时
        function fight_sec() {
            cd1 -= 1
            cd2 -= 1
            cd3 -= 1
            cd4 -= 1
            cd1 = cd1 <= 0 ? 0 : cd1
            cd2 = cd2 <= 0 ? 0 : cd2
            cd3 = cd3 <= 0 ? 0 : cd3
            cd4 = cd4 <= 0 ? 0 : cd4
            p_mp += p_secmp;
            p_secmpArray.push(p_secmp)
            fight_times += 10

            if (fight_times > 2000) {
                p_stateArray.push("逃跑")
                returnresults()
                stopInterval()
            }
        }

        //人
        function fight_p() {
            m_times += 1
            if (p_hp <= 0 && legend_7 == true) {  //10%机率回复50%血
                var odds = Math.floor(Math.random() * 100);
                if (odds < 20) {
                    p_hp += (humandata.HP + (humandata.hp_jc * jctemp)) / 2
                    p_detail = "复活"
                }
            }
            if (p_hp <= 0) {
                p_stateArray.push("死亡")
                returnresults()
                stopInterval()
            } else {
                if (legend_2 == true) {  //传奇-1%机率秒杀怪
                    var odds = Math.floor(Math.random() * 150);
                    if (odds < 1) {
                        m_hp = 0;
                    }
                }
                if (legend_4 == true && p_hp < humandata.HP * 0.3) {
                    p_damage = Math.floor(((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * 2) + (humandata.damage_jc * jctemp))
                } else {
                    p_damage = Math.floor((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 + (humandata.damage_jc * jctemp))
                }

                var temp_p_critdamage = 1;
                var temp_p_poison = 1;

                if (legend_25 == true) {  //控制技能优先

                    if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                } else {
                    if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                }



                //------------------------------技能攻击
                function playskill1() {      //技能攻击 毒
                    //中毒机率
                    if (p_job == 1) {
                        p_state = "巫毒狂暴";
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    } else {
                        m_state2 = "中毒"
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    }
                }

                function playskill2() {      //技能攻击
                    play_pt(p_damage * (p_skill2_damage / 100 + 1) * (1 + p_fire / 100), "jn")
                    p_mp -= p_skill2_needmp
                    p_stateArray.push(p_skill2_name)
                }

                function playskill3() {      //技能攻击冰
                    //冰冻机率
                    var odds = Math.floor(Math.random() * 100);
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill3_damage / 100 + 1) * (1 + p_ice / 100), "jn")
                    }
                    if (odds < ice_odds) {
                        if (legend_38 == true) {

                            legend_38_ok = true
                        }
                        m_state = "冰冻"
                        setTimeout(resetstateice, 30);
                    }


                    p_mp -= p_skill3_needmp
                    p_stateArray.push(p_skill3_name)
                }

                function playskill4() {      //技能攻击  电
                    //瘫痪机率
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < ray_odds) {
                        m_state = "瘫痪"
                        setTimeout(resetstateray, 60);
                    }
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill4_damage / 100 + 1) * (1 + p_ray / 100), "jn")
                    }

                    p_mp -= p_skill4_needmp
                    p_stateArray.push(p_skill4_name)
                }
            }

            //------------------------------普通攻击
            function play_pt(p_damage, from) {
                if (legend_21 == true) {
                    p_damage = p_damage * 2
                }
                if (p_detail == "正常" || p_detail == "复活") {

                    if (legend_15 == true) {//你的每次攻击和技能都会提高火技能伤害1%
                        p_fire += 1;
                    }
                    //暴击机率
                    var odds = Math.floor(Math.random() * 100);
                    if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                        odds = 0;
                    }
                    if ((m_state == "冰冻" || m_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                        odds = 0;
                    }
                    if (m_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                        var legend102_ii = 1.5
                    } else if (m_state == "冰冻" && legend102_6 == true) {  //法师套装
                        var legend102_ii = 4
                    } else {
                        var legend102_ii = 1
                    }
                    if (odds < p_crit) {
                        temp_p_critdamage = p_critdamage;
                        if (from == "pt") {
                            p_stateArray.push("暴击")
                        }
                        if (legend_3 == true) {   //暴击回复10%MP
                            p_mp += humandata.MP / 10;
                        }
                    } else {
                        temp_p_critdamage = 1;
                        if (from == "pt") {
                            p_stateArray.push("普攻")
                        }
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time < 30 && m_state2 == "中毒") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            m_poisonArray.push(p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0)
                        } else {
                            m_state2 = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                            m_poisonArray.push(0)
                        }
                    }

                    //检测巫毒狂暴
                    if (p_job == 1) {
                        if (poison_time < 60 && p_state == "巫毒狂暴") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100 + 1  //temp_p_poison 巫毒狂暴伤害传递参数
                        } else {
                            m_state = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                        }
                    }

                    m_hp -= ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0

                    var temp_addback = p_attback;
                    // if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp))) {
                    if (legend101_6 == true) {
                        temp_addback = p_attback + (humandata.MJ * 10)
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 != true) {
                        temp_addback = p_attback * temp_p_critdamage
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 == true) {
                        temp_addback = (p_attback * temp_p_critdamage) + (humandata.MJ * 10)
                    }
                    if (legend_38_ok == true) {
                        temp_addback += humandata.ZL * 500
                        legend_38_ok = false
                    }

                    // if (((humandata.HP + (humandata.hp_jc * jctemp)) - p_hp) <= temp_addback) {
                    //     temp_addback = (humandata.HP + (humandata.hp_jc * jctemp)) - p_hp
                    // }
                    // }
                    p_hp += temp_addback
                    if (p_detail == "复活") {
                        p_detail = "正常"
                        p_addhpArray.push(temp_addback + ((humandata.HP + (humandata.hp_jc * jctemp)) / 2))
                    } else {
                        p_addhpArray.push(temp_addback)
                    }
                    m_dechpArray.push(((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0)
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    h_yichang.push(p_detail)
                } else {
                    if (from == "pt") {
                        p_stateArray.push("普攻")
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time < 30 && m_state2 == "中毒") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            m_poisonArray.push(p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0)
                        } else {
                            m_state2 = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                            m_poisonArray.push(0)
                        }
                    }
                    p_addhpArray.push(0)
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    m_dechpArray.push(0)
                    h_yichang.push(p_detail)
                }
            }
        }

        //怪
        function fight_m() {
            if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
            }

            if (m_hp <= 0) {
                m_stateArray.push("死亡")
                getitems()
                stopInterval()
            } else {

                if (m_state == "正常") {

                    var dechp_temp = 0
                    var m_odds = Math.floor(Math.random() * 100);//技能随机数
                    var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                    var m_topodd2 = 50
                    var m_topodd = 0;
                    var m_skills_damage = 1
                    var odd_temp = (5 + (map - p_level)) > 30 ? 30 : (5 + (map - p_level))
                    m_type == "BOSS" ? m_topodd = (odd_temp + 5) : m_type == "精英" ? m_topodd = odd_temp : 0
                    if (legend_14 == true) {  //免疫冰冻 
                        m_topodd2 = 0
                    }
                    if (m_odds < m_topodd) {
                        var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                        if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                            p_detail = "冰冻"
                            setTimeout(m_resetstateice, 30);
                        } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                            p_detail = "瘫痪"
                            setTimeout(m_resetstateray, 30);
                        }
                        m_skills_damage = (m_type == "BOSS" ? 1.4 : 1.2)
                        dechp_temp = m_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                        } else {
                            dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                        }
                        m_attstate.push(m_atttemp)  //随机一个技能
                    } else {        //怪物普攻
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                            }
                        } else {
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                            }
                        }
                        m_attstate.push("普攻")
                    }
                    p_hp -= dechp_temp


                    //反伤
                    if (legend100 == true && legend100_6 != true) {
                        m_hp -= (p_hj * 20)
                        m_backhpArray.push(p_hj * 20)
                    } else if (legend100 == true && legend100_6 == true) {
                        //反伤爆击
                        var odds_fs = Math.floor(Math.random() * 100);
                        if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                            odds_fs = 0;
                        }

                        if (odds_fs < p_crit) {
                            var temp_p_critdamage_fs = p_critdamage;
                        } else {
                            var temp_p_critdamage_fs = 1;
                        }

                        m_hp -= (p_hj * 20 * temp_p_critdamage_fs)
                        m_backhpArray.push(p_hj * 20 * temp_p_critdamage_fs)
                    } else {
                        m_backhpArray.push(0)
                    }
                    p_dechpArray.push(dechp_temp)
                    m_stateArray.push(m_state)
                    p_detailArray.push(p_detail)
                } else {
                    p_dechpArray.push(0)
                    m_stateArray.push(m_state)
                    p_detailArray.push(p_detail)
                }
            }

        }

        //resetstate
        function resetstateice() {
            if (m_state != "瘫痪") {
                m_state = "正常"
            }
        }
        function resetstateray() {
            if (m_state != "冰冻") {
                m_state = "正常"
            }
        }

        function m_resetstateice() {
            if (p_detail != "瘫痪") {
                p_detail = "正常"
            }
        }
        function m_resetstateray() {
            if (p_detail != "冰冻") {
                p_detail = "正常"
            }
        }

        //回调结果
        function returnresults() {

            var lasttime = new Date()
            var lasttimetamp = lasttime.getTime()
            var fight_results = [];
            var fighting_time = (m_stateArray.length / m_speed) + 3
            fight_results.push(p_stateArray)
            fight_results.push(p_addhpArray)
            fight_results.push(p_dechpArray)
            fight_results.push(p_poisonArray)
            fight_results.push(p_mpArray)
            fight_results.push(p_secmpArray)
            fight_results.push(m_stateArray)
            fight_results.push(m_dechpArray)
            fight_results.push(m_poisonArray)
            fight_results.push(detailArray)
            fight_results.push(["空", 0, 0, 0, 0, 0, 0])
            fight_results.push(p_detailArray)
            fight_results.push(m_backhpArray)
            fight_results.push(m_attstate)
            fight_results.push(h_yichang)
            var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
            if (type == "small") {
                todo.set('map_small', monster_level)
            }
            todo.set('fighting_time', fighting_time)
            todo.set('ip', request.meta.remoteAddress)
            todo.set('limit', limit)
            todo.set('gbl_limit', gbl_limit)
            todo.set('lasttimetamp', lasttimetamp)
            todo.save()
            return response.success(fight_results);
        }

        var exprate = 1;
        if ((monster_level - humandata.level) > 0) {
            exprate = (1 + ((monster_level - humandata.level) / 10)) > 2 ? 2 : (1 + ((monster_level - humandata.level) / 10))
        } else {
            exprate = (1 + ((monster_level - humandata.level) / 10)) < 0 ? 0 : (1 + ((monster_level - humandata.level) / 10))
        }
        if (exprate <= 0){
            exprate = 0.1
        }

        function returnresults_v(item, now_exp, now_exp_all, now_level, level_t) {
            // console.log("发送回调")
            var fight_results = [];
            fight_results.push(p_stateArray)
            fight_results.push(p_addhpArray)
            fight_results.push(p_dechpArray)
            fight_results.push(p_poisonArray)
            fight_results.push(p_mpArray)
            fight_results.push(p_secmpArray)
            fight_results.push(m_stateArray)
            fight_results.push(m_dechpArray)
            fight_results.push(m_poisonArray)
            fight_results.push(detailArray)
            var getitem = [];
            getitem.push(item);
            getitem.push(Math.floor((map * 20) * (map + 120) * exprate * jctemp_exp * ((type == "big") ? 5 : 1))) //金币
            getitem.push(Math.floor((map * 1) * (map + 20) * exprate * jctemp_exp * ((type == "big") ? 5 : 1) * legend_exp))  //经验
            getitem.push(now_exp)  //现有经验
            getitem.push(now_exp_all)  //总经验 
            getitem.push(now_level)  //等级
            getitem.push(level_t)
            fight_results.push(getitem)
            fight_results.push(p_detailArray)
            fight_results.push(m_backhpArray)
            fight_results.push(m_attstate)
            fight_results.push(h_yichang)
            if (fight_times < 3000) {
                setTimeout(function () {
                    // console.log("发送success短回调")
                    return response.success(fight_results);
                }, 2000);
            } else {
                // console.log("发送success回调")
                return response.success(fight_results);
            }

        }
        var ratetemp;
        if ((monster_level - p_level) > 0) {
            ratetemp = (10 + (monster_level - p_level)) > 15 ? 15 : (10 + (monster_level - p_level))
        } else if ((p_level - monster_level) < 6) {
            ratetemp = 10
        } else {
            ratetemp = Math.floor(10 + (monster_level - p_level))
        }
        if (type == "big") {
            ratetemp = ratetemp + 10
        }

        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? ratetemp = ratetemp : (humandata.fly == 1 ? ratetemp = (Math.floor(ratetemp * (1.5)) + 2) : ratetemp = (Math.floor(ratetemp * (2)) + 4))   //翅膀爆率  正常
        }
        var rate3 = [0, 2, 10, 25, 100]
        if (humandata.level < 20) {
            ratetemp = 40
            rate3 = [0, 15, 35, 55, 100]
        }
        ratetemp = ratetemp * (1 + rate_df)  //活动  爆率+ 10 
        var odds_key = Math.floor(Math.random() * 1000);
        if (odds_key < 6) {
            var get_keys = 1
        } else {
            var get_keys = 0
        }

        var ratedata = [{ "diamond": ["钻石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "拉玛兰迪礼物"], "dropitem": ["升灵胸甲", "禁卫胸甲", "统御者胸甲", "君王胸甲", "末日护甲", "战神胸甲", "巴洛尔护甲", "冥河背心", "征服者胸甲", "摄政王之铠", "升灵法袍", "禁卫法袍", "统御者法袍", "君王法袍", "末日神袍", "战神之袍", "巴洛尔神袍", "冥河神袍", "征服者之袍", "摄政王之袍", "升灵披风", "禁卫披风", "统御者披风", "君王披风", "末日披风", "战神披风", "巴洛尔披风", "冥河披风", "征服者披风", "摄政王披风", "重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "预言", "坏灭", "狂怒", "奧汀之子", "狂君", "日光守祭", "日阳", "焚灼", "霜心", "煞星", "幽冥法珠", "三连法球", "宇宙缩影", "寒冬疾风", "半神巫妖", "星轨石", "艾利之书", "聚能法珠", "核瞳", "恩典之光", "猎人的箭盒", "亡者遗产", "索罪矢", "黑骨箭", "弓匠的骄傲", "银星", "恶魔之箭", "圣尖矢", "万全箭筒", "神圣箭筒", "征服者军帽", "死神面罩", "统治之盔", "地狱恐面", "铁骑头甲", "守护头盔", "皇冠", "主教的头盔", "星际战盔", "升灵头冠", "君王头罩", "智慧面甲", "蕾蔻的意志", "大地之眼", "唤魔师法冠", "法尊", "贤者之巅", "大护法", "共鸣", "暮光", "诺曼之盔", "骑士射盔", "阿克汉的头盔", "乌莲娜的精神", "圣光之冠", "罗兰之面", "荒原头盔", "守护者的凝视", "灼天之面", "骄矜必败", "死卫护肩", "辟邪肩甲", "萨卡拉肩铠", "先祖的怒火", "征服者肩铠", "骷髅王肩铠", "星际肩铠", "壮丽肩饰", "战狂肩甲", "阿克汉的肩甲", "伏尔的劝诫", "七宗罪", "升灵护肩", "末日肩铠", "密棘肩甲", "叠铠肩甲", "蚀刻罩肩", "恶魔之羽", "大地之柱", "博恩的赦免", "大披肩", "魔牙披风", "炎魔肩铠", "御法者肩甲", "渎圣肩铠", "导能披肩", "御魔肩甲", "赋归肩垫", "染邪护肩", "傲慢肩甲", "血色之眼", "狂暴护符", "力量之泉", "地狱火符", "君王护符", "妄念", "黄金护颈", "阿兹卡兰之星", "鱼人坠匣", "国王护符", "猎魔护符", "敏捷之泉", "森林之符", "雕饰项链", "隆达尔的坠匣", "先人之佑", "时光流韵", "吸魂镜", "敏锐之眼", "守护之锁", "艾利护符", "圣灯", "月光护符", "魔法护符", "智力之泉", "元素使者", "兵要护符", "艾利奇之眼", "法能陷阱", "万花筒", "板甲护手", "君王前臂甲", "角斗士的手套", "阿契武的战书", "征服者护手", "塔斯克与西奥", "岩石护手", "宗师护指", "战狂护手", "阿克汉的护手", "升灵护手", "箭雨护手", "潘德之手", "骨织护手", "扼息护手", "荒原护手", "凶恶护手", "影弑", "蕾蔻的裹手", "武空的灵掌", "霜燃", "礼赞手套", "法师之拳", "御法者护手", "炎魔手套", "蚀刻手套", "魔牙护手", "乌莲娜的愤怒", "罗兰之握", "唤魔师的骄傲", "力士护腕", "奴隶镣铐", "守护者的格挡", "加百利的臂甲", "沃兹克臂甲", "卫士护腕", "赛斯切隆臂甲", "愤怒护腕", "阿克汉的镣铐", "稳击护腕", "恶魔之恨", "莫提克的手腕", "豹人猎杀者", "塔格奥腕环", "箭道护腕", "凯撒的回忆", "始祖的缠绕", "拉昆巴的腕饰", "恶魔之怨", "明彻裹腕", "杰拉姆的护腕", "先民护腕", "斯古拉的拯救", "德拉肯的训导", "朗斯洛的愚行", "蒙尘者绑腕", "灵魂守卫", "雷神之力", "天使发带", "京四郎之魂", "金织带", "贪婪腰带", "宝藏腰带", "不可信之链", "哈林顿的护腰", "张的腰封", "天堂束腰", "崩天恨雨", "失踪者的绑腰", "刀锋磨带", "暗影之链", "瑟伯的梦魇", "猎手之怒", "行侠腰带", "飞刀束带", "迅击腰带", "圣洁束带", "万象皆杀", "谢尔曼的缠腰", "缠腰耳串", "行巫时刻", "通冥腰带", "沃贾裹腰", "女魔护腰", "霍尔的祝福", "佐伊的秘密", "附魂腰带", "神秘腿甲", "沼地防水裤", "征服者腿铠", "斯科隆的欺诈", "舞蛇鳞甲", "影拥", "圣光之塔", "阿克汉的腿甲", "荒原腿甲", "恶魔之鳞", "骨织护腿甲", "死神赌注", "夸下痒", "基赫纳斯", "大地之重", "蕾蔻的马裤", "尹娜的戒律", "船长的推裤", "乌莲娜的忧虑", "拉基斯守护", "蚀刻长裤", "杨先生的妖裤", "汉默长裤", "御法者护腿甲", "恶疮马裤", "不死鸟之腹", "恶魔之甲", "凯恩的法裤", "凯恩的长袍", "唤魔师的新生", "荒原长靴", "船长的涉水靴", "不朽之王步履", "影踵", "阿克汉的钢靴", "小恶魔", "大地之基", "铁头防泥靴", "蔑视长靴", "撼地之靴", "凯恩的旅鞋", "掠夺者的便鞋", "蕾蔻的豪迈", "命运阔步靴", "娜塔亚的血足", "尹娜的风靴", "乌莲娜的天命", "粗糙至极靴", "粗野少年足", "安格的舞靴", "圣光之源", "贤者之途", "罗兰之步", "八魔之靴", "唤魔师的热忱", "虚幻长靴", "魔牙胫甲", "攀冰者", "里维拉的舞鞋", "尼芙尔的夸耀", "骷髅扣戒", "君王戒指", "地狱火戒指", "阿莱斯之环", "力量指环", "纳格尔之戒", "混沌之环", "机械指环", "克雷德之焰", "纳加的血戒", "空虚之戒", "永恒盟约", "被盗之戒", "命运守护", "弧光石", "加缪尔欺骗", "正义灯戒", "残影之戒", "罗盘玫瑰", "十二宫之戒", "悔恨大厅之戒", "黑曜石之戒", "凯索的婚戒", "神目指环", "罗嘉的巨石", "破碎誓言", "全能法戒", "空灵密语之戒", "乔丹之石", "祖尼玛萨之疾"], "israte": ratetemp, "rate": rate3, "type": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 99], "otheritem": null }]

        function getitems() {
            // console.log("取物品")
            var now_exp;
            var now_exp_all;
            var now_level;
            var fighting_time = (m_stateArray.length / m_speed) + 3
            var fight_exp = humandata.exp + Math.floor((map * 2) * (map + 20) * exprate * jctemp_exp * ((type == "big") ? 5 : 1) * legend_exp)
            var fight_gold = Math.floor((map * 2) * (map + 120) * exprate * jctemp_exp * ((type == "big") ? 5 : 1))
            var lasttime = new Date()
            var lasttimetamp = lasttime.getTime()
            if (fight_exp >= humandata.exp_all && humandata.level < 60) { //升级
                var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
                todo.set('exp', (fight_exp - humandata.exp_all));
                if (type == "small") {
                    todo.set('map_small', monster_level)
                    todo.increment('keys', get_keys);
                }
                todo.set('fighting_time', fighting_time)
                todo.set('ip', request.meta.remoteAddress)
                todo.set('lasttimetamp', lasttimetamp)
                todo.set('limit', limit)
                todo.set('gbl_limit', gbl_limit)
                todo.increment('level', 1);
                todo.increment('gold', fight_gold);
                if (humandata.level == 59) {
                    todo.set('exp_all', 1400)
                } else {
                    todo.set('exp_all', Math.floor(10 * ((humandata.level + 1) * (humandata.level + 1) * (humandata.level + 1) + 60) * (((humandata.level + 1) - 1) * ((humandata.level + 1) - 1) + 60)))
                }
                todo.save().then(function (todo) {
                    now_exp = (fight_exp - humandata.exp_all)
                    now_exp_all = Math.floor(10 * ((humandata.level + 1) * (humandata.level + 1) * (humandata.level + 1) + 60) * (((humandata.level + 1) - 1) * ((humandata.level + 1) - 1) + 60))
                    now_level = humandata.level + 1
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, 0)
                }, function (error) {
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, 0)
                });
            } else if (fight_exp >= humandata.exp_all && humandata.level == 60) { //巅峰升级
                var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
                todo.set('exp', (fight_exp - humandata.exp_all));
                if (type == "small") {
                    todo.set('map_small', monster_level)
                    todo.increment('keys', get_keys);
                }
                todo.set('fighting_time', fighting_time)
                todo.set('ip', request.meta.remoteAddress)
                todo.set('lasttimetamp', lasttimetamp)
                todo.set('limit', limit)
                todo.set('gbl_limit', gbl_limit)
                todo.increment('level_t', 1);
                todo.increment('gold', fight_gold);
                todo.set('exp_all', Math.floor(10 * ((humandata.level_t + 1) * (humandata.level_t + 1) * (humandata.level_t + 1) + 60) * (((humandata.level_t + 1) - 1) * ((humandata.level_t + 1) - 1) + 60)))
                todo.save().then(function (todo) {
                    now_exp = (fight_exp - humandata.exp_all)
                    now_exp_all = Math.floor(10 * ((humandata.level + 1) * (humandata.level + 1) * (humandata.level + 1) + 60) * (((humandata.level + 1) - 1) * ((humandata.level + 1) - 1) + 60))
                    now_level = humandata.level + 1
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, (humandata.level_t + 1))
                }, function (error) {
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, (humandata.level_t + 1))
                });
            } else {
                var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
                todo.increment('exp', Math.floor((map * 2) * (map + 20) * exprate * jctemp_exp * ((type == "big") ? 5 : 1) * legend_exp));
                todo.increment('gold', fight_gold);
                if (type == "small") {
                    todo.set('map_small', monster_level)
                    todo.increment('keys', get_keys);
                }
                todo.set('limit', limit)
                todo.set('gbl_limit', gbl_limit)
                todo.set('ip', request.meta.remoteAddress)
                todo.set('fighting_time', fighting_time)
                todo.set('lasttimetamp', lasttimetamp)
                todo.save().then(function (todo) {
                    now_exp = Math.floor((map * 2) * (map + 20) * exprate * jctemp_exp * ((type == "big") ? 5 : 1)) + humandata.exp;
                    now_exp_all = humandata.exp_all;
                    now_level = humandata.level
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, humandata.level_t)
                }, function (error) {
                    israte(ratedata, monster_level, legend_1, now_exp, now_exp_all, now_level, humandata.level_t)
                });
            }
        }

        //计算暴率

        var israte = function (data, m_level, legendid, now_exp, now_exp_all, now_level, level_t) {
            // console.log("计算爆率给物品")
            var legend = {
                "1": "每当你掉落一个宝石时，50%机率会额外再掉落一个",
                "2": "1%的机率秒杀不高于自己等级的怪物（任意级别怪物）",
                "3": "暴击后回复10%的MP值",
                "4": "当你的生命值低于30%时，伤害提高100%",
                "5": "如果你的暴击机率大于等于60%，则你每次必定暴击",
                "6": "每次攻击附加你的追随者伤害的5%",
                "7": "当受到致命伤害时，20%的机率回复50%的HP",
                "8": "所有的技能MP消耗降低20%",
                "9": "当你的生命值低于20%时，必定暴击",
                "10": "MP的值低于20%时，所受到的伤害减少50%",
                "11": "攻击被控制的怪物时，必定暴击",
                "12": "你的击回数值增加，增加的百分比为你的暴击机率",
                "13": "你对精英和BOSS的伤害增加100%",
                "14": "你免疫所有控制（冰冻、瘫痪）",
                "15": "你的每次攻击和技能都会提高火技能伤害1%",
                "16": "冰系技能冰冻机率提高，提高的百分比为你的冰系伤害10%",
                "17": "所有技能元素属性变成你最高伤害比的那个元素属性",
                "18": "如果你的面板伤害低于追随者，则你的暴击伤害提高100%",
                "19": "你的所有技能等级+2",
                "20": "如果你的追随者也有此传奇属性，则他将为你分担一半伤害[追随者可生效]",
                "21": "如果你的攻速低于怪物的攻速，则伤害提高一倍",
                "22": "如果你的攻速低于怪，受到普通伤害降低，百分比为你最低的元素属性(80%上限)",
                "23": "你的套装加成效果所需的装备数量降低1件(最少为2件)[追随者可生效]",
                "24": "冰冻机率提高,数值为你智力的0.5%，但控制系技能伤害为0",
                "25": "你的控制技能优先使用",
                "26": "你和追随者身上的主属性[基于人物]宝石等级总和超过20，你的技能CD减少30%",
                "27": "护甲值提高，数值为你和追随者主属性[基于人物]宝石等级总和的平方乘以10倍",
                "28": "你的普通攻击每次减少所有技能CD1秒[追随者可生效]",
                "29": "你的武器伤害增加，增加数值为智力的5%",
                "30": "你的经验值增加",
                "31": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高5倍[追随者可生效]",
                "32": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高4倍[追随者可生效]",
                "33": "寒冰套装无视怪物等级[仅限法师生效][追随者可生效]",
                "34": "远古的召唤：人物穿戴6件传奇装备，远古门票半价[追随者可生效]",
                "35": "远古的愤怒：人物穿戴6件传奇装备，对远古怪物伤害提高200%[追随者可生效]",
                "36": "远古的汲取：人物穿戴6件传奇装备，对远古怪物击回提高100%[追随者可生效]",
                "37": "远古的坚硬：人物穿戴6件传奇装备，在远古地图护甲值提高50%[追随者可生效]",
                "38": "当你冰住怪的时候，你的血量回复，数值为智力的500倍[追随者可生效]",
                "99": "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"

            }
            var green = {
                "100": "血腥丘陵[反伤套装]",
                "101": "神罚之城[天罚套装]",
                "102": "冰冷之原[寒冰套装]",
                "103": "自然之力[元素套装]"
            }
            var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
            var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
            var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
            var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]
            var ratetype = getArrayItems(data[0].type, 1)//随机取个TYPE

            if (ratetype < 13) { //是否是装备
                var qualityid = 0;
                var item_name = getArrayItems(data[0].dropitem, 1) //随机一件装备 
                var temprate = Math.floor(Math.random() * 100);
                if (temprate < data[0].rate[1]) {
                    var temprateid = Math.floor(Math.random() * 100);
                    if (temprateid < 5) {
                        var qualityid_temp = 4 //套装
                    } else {
                        var qualityid_temp = 3 //传奇
                    }
                    qualityid = 3
                    item_name = getArrayItems(data[0].dropitem, 1)//随机一件传奇装备 

                } else if (temprate < data[0].rate[2]) {
                    qualityid = 2 //黄色
                } else if (temprate < data[0].rate[3]) {
                    qualityid = 1 //蓝色
                } else {
                    qualityid = 0 //白色	
                }

            } else if (ratetype < 99) {
                //不是装备处理暴率
                item_name = getArrayItems(data[0].otheritem, 1)//随机一件其它物品 
                qualityid = 0;

            }
            else {
                //不是装备处理暴率
                item_name = getArrayItems(data[0].diamond, 1)//随机一个宝石 

            }

            var probability = data[0].israte || 0;

            if (probability < 2 && ratetype < 13) {
                probability == 2
            }
            var odds = Math.floor(Math.random() * 100);
            // if (probability === 1) {
            //     h_death(item_name[0], qualityid, ratetype[0], m_level);
            // };
            if (odds < probability) {
                h_death(item_name[0], qualityid, ratetype[0], m_level);
            } else {
                returnresults_v("空", now_exp, now_exp_all, now_level, level_t)
            }



            //随机取属性
            function getArrayItems(arr, num) {
                var temp_array = new Array();
                for (var index in arr) {
                    temp_array.push(arr[index]);
                }
                var return_array = new Array();
                for (var i = 0; i < num; i++) {
                    if (temp_array.length > 0) {
                        var arrIndex = Math.floor(Math.random() * temp_array.length);
                        return_array[i] = temp_array[arrIndex];
                        temp_array.splice(arrIndex, 1);
                    } else {
                        break;
                    }
                }
                return return_array;
            }

            //属性计算
            function counting(x, level, ranx) {

                return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
            }
            function getArraydetail(itemarr, arrs, m_level, qualityid) {
                var temparr = [];
                temparr.push({});
                if (qualityid == 3) {
                    var ranx = Math.random() * 0.2 + 1.3
                }
                if (qualityid == 2) {
                    var ranx = Math.random() * 0.3 + 1.2
                }
                if (qualityid == 1) {
                    var ranx = Math.random() * 0.3 + 1.1
                }
                if (qualityid == 0) {
                    var ranx = Math.random() * 0.3 + 1
                }

                for (i = 0; i < arrs.length; i++) {
                    switch (arrs[i]) {
                        case "ll":
                            temparr[0].ll = counting(itemarr.LL, m_level, ranx)

                            break;
                        case "mj":
                            temparr[0].mj = counting(itemarr.MJ, m_level, ranx)
                            break;
                        case "zl":
                            temparr[0].zl = counting(itemarr.ZL, m_level, ranx)
                            break;
                        case "tn":
                            temparr[0].tn = counting(itemarr.TN, m_level, ranx)
                            break;
                        case "hj":
                            temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2)
                            break;
                        case "damage":
                            temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx)
                            break;
                        case "speed":
                            temparr[0].speed = itemarr.speed
                            break;
                        case "damage_p":
                            temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                            break;
                        case "hp":
                            temparr[0].hp = counting(itemarr.hp, m_level, ranx)
                            break;
                        case "hp_p":
                            temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "mp":
                            temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                            break;
                        case "mp_p":
                            temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "speed_p":
                            temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                            break;
                        case "attback":
                            temparr[0].attback = counting(itemarr.attback, m_level, ranx)
                            break;
                        case "secmp":
                            temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                            break;
                        case "resistance":
                            temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "crit":
                            temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                            break;
                        case "critdamage":
                            var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                            if (itemarr.type == 5) {
                                temparr[0].critdamage = critdamage_temp * 2.5
                            } else {
                                temparr[0].critdamage = critdamage_temp
                            }
                            break;
                        case "ice":
                            temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "fire":
                            temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "ray":
                            temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "poison":
                            temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "lesslevel":
                            temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                            break;
                    }
                }
                return temparr;
            }




            function h_death(item_name, qualityid, ratetype, m_level) {
                var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
                var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "hp", "hp_p", "mp", "mp_p"] //武器
                var arr2 = ["hp", "hp_p", "mp", "mp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品

                var levelrate = Math.floor(Math.random() * 100)//降等属性
                if (levelrate < 30 && m_level > 5) {
                    arr0.push("lesslevel");
                    arr1.push("lesslevel");
                    arr2.push("lesslevel");
                }

                if (ratetype < 13) {
                    var item = global.item_results.find(person => person.name === item_name);

                    if (item.type == 1) {
                        var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                        arrs.push("speed", "damage")
                    }
                    if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
                        var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
                        arrs.push("hj")
                    }
                    if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
                        var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
                        // arrs.push("hj")
                    }
                    if (item.type == 2) {
                        var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                    }
                    if (item.job == 1) {
                        arrs.push("ll", "tn")
                    }
                    if (item.job == 2) {
                        arrs.push("mj", "tn")
                    }
                    if (item.job == 3) {
                        arrs.push("zl", "tn")
                    }

                    var temparr2 = getArraydetail(item, arrs, m_level, qualityid)  //得到最终属性

                    var lesslevel = 0
                    if (temparr2[0].lesslevel !== undefined) {
                        lesslevel = temparr2[0].lesslevel
                    }
                    newitem(item, temparr2, qualityid, (m_level - lesslevel));

                } else if (ratetype < 99) {
                    newitem2(item_name, ratetype, m_level);
                } else {
                    newitemdiamond(item_name, m_level);
                }

            }

            //背包得到一件装备
            function newitem(item, temparr2, qualityid, level) {
                var cq_id = 0;
                var greenArray = []

                if (qualityid_temp == 3) {
                    cq_id = Math.floor(Math.random() * 38 + 1)
                                                                
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        if (Math.random() * 100 > 10){
                            var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                            cq_id =  newlist[Math.floor(Math.random() * newlist.length)]
                        }
                    }

                    if (cq_id == 31) {
                        cq_id = 32
                    }
                    if (cq_id == 30) {
                        var desc_text = legend[cq_id]
                        desc_text = desc_text + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
                    } else {
                        var desc_text = legend[cq_id]
                    }

                    // cq_id99 = Math.floor(Math.random() * 1000)
                    // if (cq_id99 < 5) {
                    //     cq_id = 99
                    //     desc_text = "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                    // }
                }


                if (qualityid_temp == 4) {
                    qualityid = 4
                    cq_id = Math.floor(Math.random() * 4 + 100)
                    if (cq_id == 100) {
                        greenArray = green100;
                        var desc_text = green[100]
                    }
                    if (cq_id == 101) {
                        greenArray = green101;
                        var desc_text = green[101]
                    }
                    if (cq_id == 102) {
                        greenArray = green102;
                        var desc_text = green[102]
                    }
                    if (cq_id == 103) {
                        greenArray = green103;
                        var desc_text = green[103]
                    }
                }
                var TodoFolder = AV.Object.extend(cloud_bag);
                var todoFolder = new TodoFolder();
                todoFolder.set('name', item.name);
                var targetitem = AV.Object.createWithoutData('item', item.objectId);
                todoFolder.set('item', targetitem);
                todoFolder.set('cq_id', cq_id);
                if (cq_id == 99) {
                    todoFolder.set('trad_times', 3);
                }
                todoFolder.set('fumo', 0);
                todoFolder.set('trad_times', 0);
                todoFolder.set('desc', desc_text);
                todoFolder.set('type', item.type);
                todoFolder.set('state', "背包");
                todoFolder.set('itemarr', temparr2);
                todoFolder.set('qualityid', qualityid);
                todoFolder.set('green', greenArray);
                todoFolder.set('level', level);
                todoFolder.set('ident', qualityid > 2 ? false : true);
                todoFolder.set('price', Math.floor(item.price * (level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8)));
                todoFolder.set('user', request.currentUser);
                todoFolder.set('job', item.job);
                todoFolder.save().then(function (todo) {
                    returnresults_v(item.name, now_exp, now_exp_all, now_level, level_t)
                }, function (error) {
                    return response.error(error);
                });
            }
            //背包得到一件其它物品
            function newitem2(item_name, ratetype, level) {
                var TodoFolder = AV.Object.extend(cloud_bag);
                var todoFolder = new TodoFolder();
                todoFolder.set('name', item_name);
                todoFolder.set('type', ratetype);
                todoFolder.set('state', "背包");
                todoFolder.set('level', level);
                todoFolder.set('user', request.currentUser);
                todoFolder.save().then(function (todo) {
                    returnresults_v(item_name, now_exp, now_exp_all, now_level, level_t)
                }, function (error) {
                    return response.error(error);
                });
            }
            //背包得到一件宝石
            function newitemdiamond(item_name, m_level) {
                m_level > 40 ? 40 : m_level
                m_level = Math.floor(m_level / 10) + 1
                var dialevel = Math.floor(Math.random() * m_level + 1)
                if (dialevel > 2) {
                    var diamond_rate = Math.random() * 100
                    if (diamond_rate < 95) {
                        dialevel -= 2
                    }
                }
                var diamondnum = 1
                if (item_name != "拉玛兰迪礼物") {
                    item_name = dialevel + "级" + item_name
                    if (legendid == 1) {
                        var odds = Math.floor(Math.random() * 100);
                        if (odds < 50) {
                            diamondnum = 2;
                        }
                    }
                }

                var query = new AV.Query(cloud_diamond);
                query.equalTo('name', item_name);
                query.equalTo('user', request.currentUser);
                query.find().then(function (results) {
                    var data = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data.length > 0) {
                        var todo = AV.Object.createWithoutData(cloud_diamond, data[0].objectId);
                        todo.increment('num', diamondnum);
                        todo.save().then(function (todo) {
                            returnresults_v(item_name, now_exp, now_exp_all, now_level, level_t)
                        }, function (error) {
                            return response.error(error);
                        });

                    } else {
                        var TodoFolder = AV.Object.extend(cloud_diamond);
                        var todoFolder = new TodoFolder();
                        todoFolder.set('name', item_name);
                        todoFolder.increment('num', diamondnum);
                        todoFolder.set('user', request.currentUser);
                        todoFolder.save().then(function (todo) {
                            returnresults_v(item_name, now_exp, now_exp_all, now_level, level_t)
                        }, function (error) {
                            return response.error(error);
                        });
                    }


                }, function (error) {
                    return response.error(error);
                });
            }
        }

    }


    // 离线小米
    function offlineok(data) {
        var dianfarr = data[0].dianf;
        function getwuli(hj) {
            return (100 - ((Math.sqrt(Math.sqrt(hj)) * (data[0].job == 1 ? 2.8 : 1.5) + dianfarr[1]) > 80 ? 80 : (Math.sqrt(Math.sqrt(hj)) * (data[0].job == 1 ? 2.8 : 1.5) + dianfarr[1]))) / 100
        }


        data[0].HP = data[0].HP * (1 + dianfarr[0] / 100)
        data[0].resistance = data[0].resistance + dianfarr[2]
        data[0].attback = data[0].attback + dianfarr[3]

        data[0].critdamage = data[0].critdamage + dianfarr[4]
        data[0].ice = data[0].ice + dianfarr[5]
        data[0].fire = data[0].fire + dianfarr[6]
        data[0].ray = data[0].ray + dianfarr[7]
        data[0].poison = data[0].poison + dianfarr[8]
        var exp_df = dianfarr[9] / 100
        var rate_df = dianfarr[10] / 100


        if (data[0].offline[0] == 0 && data[0].offline[1] == 1) {
            var off_map = data[0].map_small
        } else {
            var off_map = data[0].offline[1]
        }

        var offline_results = []
        var offline_exp = 0     //累计经验
        var offline_gold = 0    //累计金币
        var nowtime = new Date()
        var nowtimetamp = (nowtime.getTime())
        var ratetemp;
        if ((off_map - data[0].level) > 0) {
            ratetemp = (10 + (off_map - data[0].level)) > 15 ? 15 : (10 + (off_map - data[0].level))
        } else {
            ratetemp = Math.floor(10 + (off_map - data[0].level))
        }
        if (data[0].fly_data != 0 && (data[0].fly_data - nowtimetamp) > 0) {
            data[0].fly == 0 ? ratetemp = ratetemp : (data[0].fly == 1 ? ratetemp = (Math.floor(ratetemp * (1.1)) + 2) : ratetemp = (Math.floor(ratetemp * (1.3)) + 4))   //翅膀爆率 挂机
        }
        if (data[0].level < 20) {
            ratetemp = 40
        }
        ratetemp = ratetemp < 0 ? 0 : ratetemp
        offline_results[12] = data[0].level
        offline_results[11] = data[0].exp
        offline_results[10] = data[0].exp_all
        offline_results[9] = data[0].objectId
        offline_results[8] = data[0].pick
        offline_results[7] = nowtimetamp - data[0].lasttimetamp
        offline_results[5] = off_map
        offline_results[4] = ratetemp * (1 + rate_df) //活动  爆率 + 10 
        offline_results[3] = 0
        offline_results[2] = 0
        var alltime = 8000;
        var offline_temp = 0


        var offline_secsmall = setInterval(offline_secfsmall, 1000);  //每秒计时
        startfight(data[0], off_map)
        function offline_secfsmall() {

            if (offline_temp >= alltime) {
                clearInterval(offline_secsmall);
                // return response.success(offline_results);
                getoffline(offline_results, data)
            } else {
                offline_temp += 1000
            }
        }



        function getoffline(offdata, data) {

            var dobuleexp = data[0].dobuleexp || 0
            // console.log(dobuleexp + 'dobuleexp')
            offdata[0] = offdata[0] || 0
            offdata[1] = offdata[1] || 0
            var exp_p = offdata[0] / offdata[2]
            var gold_p = offdata[1] / offdata[2]
            offdata[2] = Math.floor(3600 / ((3600 / (offdata[2] * 5)) + 6))   //  战斗次数/小时
            offdata[3] = Math.floor(3600 / ((3600 / (offdata[3] * 5)) + 6))   //死亡次数 /小时
            offdata[7] = (offdata[7] / 3600000) > 12 ? 12 : (offdata[7] / 3600000)  //小时数
            // offdata[8][0] = 1  //白装分解设定
            offdata[0] = exp_p * offdata[2]  //经验
            offdata[1] = gold_p * offdata[2] * 10  //金币 
            var backback = offdata;
            if (offdata[4] < 2) {
                var diamondArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 99]
                var fight_timess = Math.floor(((offdata[2] - offdata[3]) * offdata[7]) * (2 / 100)); //战斗次数
                var keys_timess = Math.floor(((offdata[2] - offdata[3]) * offdata[7]) * (offdata[4] / 100))
            } else {
                var diamondArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 99]
                var fight_timess = Math.floor(((offdata[2] - offdata[3]) * offdata[7]) * (offdata[4] / 100)); //战斗次数
                var keys_timess = fight_timess
            }

            var m_level = offdata[5];//地图等级 
            var legendid = offdata[6];  //传奇属性1
            var legend99 = offdata[13];  //传奇属性99
            var pick = offdata[8];
            var ratetemp2 = offdata[4];   //爆率
            var f_gold = Math.floor(offdata[1] * offdata[7]);
            var objectId = offdata[9];
            if (dobuleexp <= offdata[7]) {  //离线双倍
                var f_exp = Math.floor(offdata[0] * (offdata[7] + dobuleexp));
                dobuleexp = 0
            } else {
                var f_exp = Math.floor(offdata[0] * offdata[7] * 2);
                dobuleexp = dobuleexp - offdata[7]
            }


            var f_allexp = offdata[10];
            var f_nowexp = offdata[11];
            var f_level = offdata[12];
            var now_exp = f_nowexp;  //现有经验60
            var now_exp_all = f_allexp;  //升级所要经验 100
            var now_level = f_level;      //等级 
            var fight_exp = f_exp;   //获得的经验200

            var rate3 = [0, 2, 10, 25, 100]
            if (data[0].level < 20) {
                rate3 = [0, 15, 35, 55, 100]
            }

            var datarate = [{ "diamond": ["钻石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "拉玛兰迪礼物"], "dropitem": ["升灵胸甲", "禁卫胸甲", "统御者胸甲", "君王胸甲", "末日护甲", "战神胸甲", "巴洛尔护甲", "冥河背心", "征服者胸甲", "摄政王之铠", "升灵法袍", "禁卫法袍", "统御者法袍", "君王法袍", "末日神袍", "战神之袍", "巴洛尔神袍", "冥河神袍", "征服者之袍", "摄政王之袍", "升灵披风", "禁卫披风", "统御者披风", "君王披风", "末日披风", "战神披风", "巴洛尔披风", "冥河披风", "征服者披风", "摄政王披风", "重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "预言", "坏灭", "狂怒", "奧汀之子", "狂君", "日光守祭", "日阳", "焚灼", "霜心", "煞星", "幽冥法珠", "三连法球", "宇宙缩影", "寒冬疾风", "半神巫妖", "星轨石", "艾利之书", "聚能法珠", "核瞳", "恩典之光", "猎人的箭盒", "亡者遗产", "索罪矢", "黑骨箭", "弓匠的骄傲", "银星", "恶魔之箭", "圣尖矢", "万全箭筒", "神圣箭筒", "征服者军帽", "死神面罩", "统治之盔", "地狱恐面", "铁骑头甲", "守护头盔", "皇冠", "主教的头盔", "星际战盔", "升灵头冠", "君王头罩", "智慧面甲", "蕾蔻的意志", "大地之眼", "唤魔师法冠", "法尊", "贤者之巅", "大护法", "共鸣", "暮光", "诺曼之盔", "骑士射盔", "阿克汉的头盔", "乌莲娜的精神", "圣光之冠", "罗兰之面", "荒原头盔", "守护者的凝视", "灼天之面", "骄矜必败", "死卫护肩", "辟邪肩甲", "萨卡拉肩铠", "先祖的怒火", "征服者肩铠", "骷髅王肩铠", "星际肩铠", "壮丽肩饰", "战狂肩甲", "阿克汉的肩甲", "伏尔的劝诫", "七宗罪", "升灵护肩", "末日肩铠", "密棘肩甲", "叠铠肩甲", "蚀刻罩肩", "恶魔之羽", "大地之柱", "博恩的赦免", "大披肩", "魔牙披风", "炎魔肩铠", "御法者肩甲", "渎圣肩铠", "导能披肩", "御魔肩甲", "赋归肩垫", "染邪护肩", "傲慢肩甲", "血色之眼", "狂暴护符", "力量之泉", "地狱火符", "君王护符", "妄念", "黄金护颈", "阿兹卡兰之星", "鱼人坠匣", "国王护符", "猎魔护符", "敏捷之泉", "森林之符", "雕饰项链", "隆达尔的坠匣", "先人之佑", "时光流韵", "吸魂镜", "敏锐之眼", "守护之锁", "艾利护符", "圣灯", "月光护符", "魔法护符", "智力之泉", "元素使者", "兵要护符", "艾利奇之眼", "法能陷阱", "万花筒", "板甲护手", "君王前臂甲", "角斗士的手套", "阿契武的战书", "征服者护手", "塔斯克与西奥", "岩石护手", "宗师护指", "战狂护手", "阿克汉的护手", "升灵护手", "箭雨护手", "潘德之手", "骨织护手", "扼息护手", "荒原护手", "凶恶护手", "影弑", "蕾蔻的裹手", "武空的灵掌", "霜燃", "礼赞手套", "法师之拳", "御法者护手", "炎魔手套", "蚀刻手套", "魔牙护手", "乌莲娜的愤怒", "罗兰之握", "唤魔师的骄傲", "力士护腕", "奴隶镣铐", "守护者的格挡", "加百利的臂甲", "沃兹克臂甲", "卫士护腕", "赛斯切隆臂甲", "愤怒护腕", "阿克汉的镣铐", "稳击护腕", "恶魔之恨", "莫提克的手腕", "豹人猎杀者", "塔格奥腕环", "箭道护腕", "凯撒的回忆", "始祖的缠绕", "拉昆巴的腕饰", "恶魔之怨", "明彻裹腕", "杰拉姆的护腕", "先民护腕", "斯古拉的拯救", "德拉肯的训导", "朗斯洛的愚行", "蒙尘者绑腕", "灵魂守卫", "雷神之力", "天使发带", "京四郎之魂", "金织带", "贪婪腰带", "宝藏腰带", "不可信之链", "哈林顿的护腰", "张的腰封", "天堂束腰", "崩天恨雨", "失踪者的绑腰", "刀锋磨带", "暗影之链", "瑟伯的梦魇", "猎手之怒", "行侠腰带", "飞刀束带", "迅击腰带", "圣洁束带", "万象皆杀", "谢尔曼的缠腰", "缠腰耳串", "行巫时刻", "通冥腰带", "沃贾裹腰", "女魔护腰", "霍尔的祝福", "佐伊的秘密", "附魂腰带", "神秘腿甲", "沼地防水裤", "征服者腿铠", "斯科隆的欺诈", "舞蛇鳞甲", "影拥", "圣光之塔", "阿克汉的腿甲", "荒原腿甲", "恶魔之鳞", "骨织护腿甲", "死神赌注", "夸下痒", "基赫纳斯", "大地之重", "蕾蔻的马裤", "尹娜的戒律", "船长的推裤", "乌莲娜的忧虑", "拉基斯守护", "蚀刻长裤", "杨先生的妖裤", "汉默长裤", "御法者护腿甲", "恶疮马裤", "不死鸟之腹", "恶魔之甲", "凯恩的法裤", "凯恩的长袍", "唤魔师的新生", "荒原长靴", "船长的涉水靴", "不朽之王步履", "影踵", "阿克汉的钢靴", "小恶魔", "大地之基", "铁头防泥靴", "蔑视长靴", "撼地之靴", "凯恩的旅鞋", "掠夺者的便鞋", "蕾蔻的豪迈", "命运阔步靴", "娜塔亚的血足", "尹娜的风靴", "乌莲娜的天命", "粗糙至极靴", "粗野少年足", "安格的舞靴", "圣光之源", "贤者之途", "罗兰之步", "八魔之靴", "唤魔师的热忱", "虚幻长靴", "魔牙胫甲", "攀冰者", "里维拉的舞鞋", "尼芙尔的夸耀", "骷髅扣戒", "君王戒指", "地狱火戒指", "阿莱斯之环", "力量指环", "纳格尔之戒", "混沌之环", "机械指环", "克雷德之焰", "纳加的血戒", "空虚之戒", "永恒盟约", "被盗之戒", "命运守护", "弧光石", "加缪尔欺骗", "正义灯戒", "残影之戒", "罗盘玫瑰", "十二宫之戒", "悔恨大厅之戒", "黑曜石之戒", "凯索的婚戒", "神目指环", "罗嘉的巨石", "破碎誓言", "全能法戒", "空灵密语之戒", "乔丹之石", "祖尼玛萨之疾"], "israte": ratetemp2, "rate": rate3, "type": diamondArray, "otheritem": null }]
            var chire = 0
            var alltodos = []
            var itemsArray = [0, 0, 0, 0, 0, 0, 0]  //白、蓝、黄、传奇、金币、血岩、秘钥匙
            var lostitemsArray = [0, 0, 0, 0]  //白、蓝、黄、传奇
            var diamonds = 0
            var timeout = (fight_timess * 10) > 3000 ? 3000 : (fight_timess * 10)
            var offline_sec = setInterval(startrate, 10);  //每秒计时
            var odds_key = Math.floor(keys_timess * 0.06)
            itemsArray[6] = odds_key

            setTimeout(function () {
                // console.log(objectId + 'objectId')
                backback[0] = fight_exp * 1.6  //离线经验 1.6
                backback[1] = f_gold
                clearInterval(offline_sec);
                var todo = AV.Object.createWithoutData(cloud_human, objectId);
                todo.increment('gold', (f_gold + itemsArray[4]));
                todo.increment('xueyan', itemsArray[5]);
                todo.increment('keys', odds_key);
                todo.set('dobuleexp', dobuleexp);
                todo.increment('exp', fight_exp * 1.6);//离线经验
                todo.save();
                AV.Object.saveAll(alltodos).then(function (objects) {
                    // 成功
                    return response.success([itemsArray, lostitemsArray, diamonds, backback, 'small']);
                }, function (error) {
                    return response.error(error);
                });

                var query = new AV.Query(cloud_diamond);
                query.equalTo('user', request.currentUser);
                query.equalTo('name', "炙热硫磺");
                query.find().then(function (results) {
                    var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                    // console.log(data2[0].objectId + '炙热硫磺')
                    var todo = AV.Object.createWithoutData(cloud_diamond, data2[0].objectId);
                    todo.increment('num', chire);
                    todo.save();

                })


            }, timeout);



            //计算暴率
            function startrate() {
                var legend = {
                    "1": "每当你掉落一个宝石时，50%机率会额外再掉落一个",
                    "2": "1%的机率秒杀不高于自己等级的怪物（任意级别怪物）",
                    "3": "暴击后回复10%的MP值",
                    "4": "当你的生命值低于30%时，伤害提高100%",
                    "5": "如果你的暴击机率大于等于60%，则你每次必定暴击",
                    "6": "每次攻击附加你的追随者伤害的5%",
                    "7": "当受到致命伤害时，20%的机率回复50%的HP",
                    "8": "所有的技能MP消耗降低20%",
                    "9": "当你的生命值低于20%时，必定暴击",
                    "10": "MP的值低于20%时，所受到的伤害减少50%",
                    "11": "攻击被控制的怪物时，必定暴击",
                    "12": "你的击回数值增加，增加的百分比为你的暴击机率",
                    "13": "你对精英和BOSS的伤害增加100%",
                    "14": "你免疫所有控制（冰冻、瘫痪）",
                    "15": "你的每次攻击和技能都会提高火技能伤害1%",
                    "16": "冰系技能冰冻机率提高，提高的百分比为你的冰系伤害10%",
                    "17": "所有技能元素属性变成你最高伤害比的那个元素属性",
                    "18": "如果你的面板伤害低于追随者，则你的暴击伤害提高100%",
                    "19": "你的所有技能等级+2",
                    "20": "如果你的追随者也有此传奇属性，则他将为你分担一半伤害[追随者可生效]",
                    "21": "如果你的攻速低于怪物的攻速，则伤害提高一倍",
                    "22": "如果你的攻速低于怪，受到普通伤害降低，百分比为你最低的元素属性(80%上限)",
                    "23": "你的套装加成效果所需的装备数量降低1件(最少为2件)[追随者可生效]",
                    "24": "冰冻机率提高,数值为你智力的0.5%，但控制系技能伤害为0",
                    "25": "你的控制技能优先使用",
                    "26": "你和追随者身上的主属性[基于人物]宝石等级总和超过20，你的技能CD减少30%",
                    "27": "护甲值提高，数值为你和追随者主属性[基于人物]宝石等级总和的平方乘以10倍",
                    "28": "你的普通攻击每次减少所有技能CD1秒[追随者可生效]",
                    "29": "你的武器伤害增加，增加数值为智力的5%",
                    "30": "你的经验值增加",
                    "31": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高5倍[追随者可生效]",
                    "32": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高4倍[追随者可生效]",
                    "33": "寒冰套装无视怪物等级[仅限法师生效][追随者可生效]",
                    "34": "远古的召唤：人物穿戴6件传奇装备，远古门票半价[追随者可生效]",
                    "35": "远古的愤怒：人物穿戴6件传奇装备，对远古怪物伤害提高200%[追随者可生效]",
                    "36": "远古的汲取：人物穿戴6件传奇装备，对远古怪物击回提高100%[追随者可生效]",
                    "37": "远古的坚硬：人物穿戴6件传奇装备，在远古地图护甲值提高50%[追随者可生效]",
                    "38": "当你冰住怪的时候，你的血量回复，数值为智力的500倍[追随者可生效]",
                    "99": "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                }
                var green = {
                    "100": "血腥丘陵[反伤套装]",
                    "101": "神罚之城[天罚套装]",
                    "102": "冰冷之原[寒冰套装]",
                    "103": "自然之力[元素套装]"
                }
                var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
                var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
                var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
                var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]


                var ratetype = getArrayItems(datarate[0].type, 1)//随机取个TYPE

                if (ratetype[0] < 13) { //是否是装备
                    var qualityid = 0;
                    var item_name = getArrayItems(datarate[0].dropitem, 1) //随机一件装备 
                    var temprate = Math.floor(Math.random() * 100);
                    if (temprate < datarate[0].rate[1]) {
                        var temprateid = Math.floor(Math.random() * 100);
                        if (temprateid < 5) {
                            var qualityid_temp = 4 //套装
                        } else {
                            var qualityid_temp = 3 //传奇
                        }
                        qualityid = 3 //传奇
                        item_name = getArrayItems(datarate[0].dropitem, 1)//随机一件传奇装备 

                    } else if (temprate < datarate[0].rate[2]) {
                        qualityid = 2 //黄色
                    } else if (temprate < datarate[0].rate[3]) {
                        qualityid = 1 //蓝色
                    } else {
                        qualityid = 0 //白色	
                    }

                } else if (ratetype[0] < 99) {
                    //不是装备处理暴率
                    item_name = getArrayItems(datarate[0].otheritem, 1)//随机一件其它物品 
                    qualityid = 0;

                }
                else {
                    //宝石处理暴率
                    item_name = getArrayItems(datarate[0].diamond, 1)//随机一个宝石 

                }

                if (qualityid == 0 && pick[0] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[0] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid == 1 && pick[1] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[1] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid == 2 && pick[2] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[2] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid > 2 && pick[3] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[3] += 1
                    chire += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else {
                    h_death(item_name[0], qualityid, ratetype[0], m_level);
                    var temprateid2 = Math.floor(Math.random() * 100);
                    if (legend99 == 1 && qualityid > 2 && ratetype[0] < 13 && temprateid2 < 10) {
                        h_death(item_name[0], qualityid, ratetype[0], m_level);
                    }

                }


                //随机取属性
                function getArrayItems(arr, num) {
                    var temp_array = new Array();
                    for (var index in arr) {
                        temp_array.push(arr[index]);
                    }
                    var return_array = new Array();
                    for (var i = 0; i < num; i++) {
                        if (temp_array.length > 0) {
                            var arrIndex = Math.floor(Math.random() * temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }

                //属性计算
                function counting(x, level, ranx) {

                    return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
                }
                function getArraydetail(itemarr, arrs, m_level, qualityid) {
                    var temparr = [];
                    temparr.push({});
                    if (qualityid == 3) {
                        var ranx = Math.random() * 0.2 + 1.3
                    }
                    if (qualityid == 2) {
                        var ranx = Math.random() * 0.3 + 1.2
                    }
                    if (qualityid == 1) {
                        var ranx = Math.random() * 0.3 + 1.1
                    }
                    if (qualityid == 0) {
                        var ranx = Math.random() * 0.3 + 1
                    }

                    for (i = 0; i < arrs.length; i++) {
                        switch (arrs[i]) {
                            case "ll":
                                temparr[0].ll = counting(itemarr.LL, m_level, ranx)

                                break;
                            case "mj":
                                temparr[0].mj = counting(itemarr.MJ, m_level, ranx)
                                break;
                            case "zl":
                                temparr[0].zl = counting(itemarr.ZL, m_level, ranx)
                                break;
                            case "tn":
                                temparr[0].tn = counting(itemarr.TN, m_level, ranx)
                                break;
                            case "hj":
                                temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2)
                                break;
                            case "damage":
                                temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx)
                                break;
                            case "speed":
                                temparr[0].speed = itemarr.speed
                                break;
                            case "damage_p":
                                temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                                break;
                            case "hp":
                                temparr[0].hp = counting(itemarr.hp, m_level, ranx)
                                break;
                            case "hp_p":
                                temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "mp":
                                temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                                break;
                            case "mp_p":
                                temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "speed_p":
                                temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                                break;
                            case "attback":
                                temparr[0].attback = counting(itemarr.attback, m_level, ranx)
                                break;
                            case "secmp":
                                temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                                break;
                            case "resistance":
                                temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "crit":
                                temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                                break;
                            case "critdamage":
                                var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                                if (itemarr.type == 5) {
                                    temparr[0].critdamage = critdamage_temp * 2.5
                                } else {
                                    temparr[0].critdamage = critdamage_temp
                                }
                                break;
                            case "ice":
                                temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "fire":
                                temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "ray":
                                temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "poison":
                                temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "lesslevel":
                                temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                                break;
                        }
                    }
                    return temparr;
                }




                function h_death(item_name, qualityid, ratetype, m_level) {
                    var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
                    var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "hp", "hp_p", "mp", "mp_p"] //武器
                    var arr2 = ["hp", "hp_p", "mp", "mp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品
                    var levelrate = Math.floor(Math.random() * 100)//降等属性
                    if (levelrate < 30 && m_level > 5) {
                        arr0.push("lesslevel");
                        arr1.push("lesslevel");
                        arr2.push("lesslevel");
                    }
                    if (ratetype < 13) {
                        var item = global.item_results.find(person => person.name === item_name);

                        if (item.type == 1) {
                            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                            arrs.push("speed", "damage")
                        }
                        if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
                            var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
                            arrs.push("hj")
                        }
                        if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
                            var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
                            // arrs.push("hj")
                        }
                        if (item.type == 2) {
                            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                        }
                        if (item.job == 1) {
                            arrs.push("ll", "tn")
                        }
                        if (item.job == 2) {
                            arrs.push("mj", "tn")
                        }
                        if (item.job == 3) {
                            arrs.push("zl", "tn")
                        }
                        var temparr2 = getArraydetail(item, arrs, m_level, qualityid)  //得到最终属性

                        var lesslevel = 0
                        if (temparr2[0].lesslevel !== undefined) {
                            lesslevel = temparr2[0].lesslevel
                        }
                        newitem(item, temparr2, qualityid, (m_level - lesslevel));


                    } else if (ratetype < 99) {
                        newitem2(item_name, ratetype, m_level);
                    } else {
                        newitemdiamond(item_name, m_level);
                    }

                }

                //背包得到一件装备
                function newitem(item, temparr2, qualityid, level) {
                    var cq_id = 0;
                    var greenArray = []

                    if (qualityid_temp == 3) {
                        cq_id = Math.floor(Math.random() * 38 + 1)
                                                                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        if (Math.random() * 100 > 10){
                            var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                            cq_id =  newlist[Math.floor(Math.random() * newlist.length)]
                        }
                    }

                        if (cq_id == 31) {
                            cq_id = 32
                        }
                        if (cq_id == 30) {
                            var desc_text = legend[cq_id]
                            desc_text = desc_text + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
                        } else {
                            var desc_text = legend[cq_id]
                        }
                        // cq_id99 = Math.floor(Math.random() * 1000)
                        // if (cq_id99 < 5) {
                        //     cq_id = 99
                        //     desc_text = "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                        // }
                    }
                    if (qualityid_temp == 4) {
                        qualityid = 4
                        cq_id = Math.floor(Math.random() * 4 + 100)
                        if (cq_id == 100) {
                            greenArray = green100;
                            var desc_text = green[100]
                        }
                        if (cq_id == 101) {
                            greenArray = green101;
                            var desc_text = green[101]
                        }
                        if (cq_id == 102) {
                            greenArray = green102;
                            var desc_text = green[102]
                        }
                        if (cq_id == 103) {
                            greenArray = green103;
                            var desc_text = green[103]
                        }
                    }

                    var todoFolder = new AV.Object(cloud_bag);
                    todoFolder.set('name', item.name);
                    var targetitem = AV.Object.createWithoutData('item', item.objectId);
                    todoFolder.set('item', targetitem);
                    todoFolder.set('cq_id', cq_id);
                    if (cq_id == 99) {
                        todoFolder.set('trad_times', 3);
                    }
                    todoFolder.set('fumo', 0);
                    todoFolder.set('trad_times', 0);
                    todoFolder.set('desc', desc_text);
                    todoFolder.set('type', item.type);
                    todoFolder.set('state', "背包");
                    todoFolder.set('itemarr', temparr2);
                    todoFolder.set('qualityid', qualityid);
                    todoFolder.set('green', greenArray);
                    todoFolder.set('level', level);
                    todoFolder.set('ident', qualityid > 2 ? false : true);
                    todoFolder.set('price', Math.floor(item.price * (level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8)));
                    todoFolder.set('user', request.currentUser);
                    todoFolder.set('job', item.job);
                    if (qualityid == 3) {
                        itemsArray[3] += 1
                    } else if (qualityid == 2) {
                        itemsArray[2] += 1
                    } else if (qualityid == 1) {
                        itemsArray[1] += 1
                    } else {
                        itemsArray[0] += 1
                    }

                    alltodos.push(todoFolder)
                }


                //背包得到一件其它物品
                function newitem2(item_name, ratetype, level) {
                    var TodoFolder = AV.Object.extend(cloud_bag);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', item_name);
                    todoFolder.set('type', ratetype);
                    todoFolder.set('state', "背包");
                    todoFolder.set('level', level);
                    todoFolder.set('user', request.currentUser);
                    alltodos.push(todoFolder)
                }
                //背包得到一件宝石
                function newitemdiamond(item_name, m_level) {

                    m_level > 40 ? 40 : m_level
                    m_level = Math.floor(m_level / 10) + 1
                    var dialevel = Math.floor(Math.random() * m_level + 1)
                    if (dialevel > 2) {
                        var diamond_rate = Math.random() * 100
                        if (diamond_rate < 95) {
                            dialevel -= 2
                        }
                    }
                    var diamondnum = 1
                    if (item_name != "拉玛兰迪礼物") {
                        item_name = dialevel + "级" + item_name
                        if (legendid == 1) {
                            var odds = Math.floor(Math.random() * 100);
                            if (odds < 50) {
                                diamondnum = 2;
                            }
                        }
                    }




                    var Account = AV.Object.extend(cloud_diamond);
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', item_name).first().then(function (account) {
                        account.increment('num', diamondnum);
                        return account.save();
                    })

                    diamonds += diamondnum

                }
            }
        }

        function startfight(humandata, monster_level) {

            var cqarray = humandata.cqarray;
            if (humandata.mohe[0][0] !== undefined) {
                cqarray.push(humandata.mohe[0][0])
                if (humandata.mohe[0][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[0][1].substring(7)) + 1000)
                }
            }
            if (humandata.mohe[1][0] !== undefined) {
                cqarray.push(humandata.mohe[1][0])
                if (humandata.mohe[1][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[1][1].substring(7)) + 1000)
                }
            }
            if (humandata.mohe[2][0] !== undefined) {
                cqarray.push(humandata.mohe[2][0])
                if (humandata.mohe[2][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[2][1].substring(7)) + 1000)
                }
            }

            var temphp = humandata.HP
            if ((cqarray.indexOf(32) > -1 || humandata.cqarray_jc.indexOf(32) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
                humandata.HP = temphp * 5
            }
            if ((cqarray.indexOf(31) > -1 || humandata.cqarray_jc.indexOf(31) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
                humandata.HP = temphp * 6
            }

            var monsterlist = [
                { "name": "沉沦魔", "damage": 80, "hp": 100, "hj": 10, "speed": 0.9, "type": "普通" },
                { "name": "小恶魔", "damage": 100, "hp": 120, "hj": 10, "speed": 0.9, "type": "普通" },
                { "name": "疯恶魔", "damage": 120, "hp": 130, "hj": 10, "speed": 1.0, "type": "普通" },
                { "name": "监督者", "damage": 150, "hp": 150, "hj": 10, "speed": 1.0, "type": "普通" },
                { "name": "畸形怪[精英]", "damage": 200, "hp": 180, "hj": 20, "speed": 1.1, "type": "精英" }
            ]
            var skillslist = [
                { "name": "冰霜新星", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "聚能轰击", "needmp": 25, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "雷电脉冲", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "剧毒之环", "needmp": 30, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

                { "name": "冰霜之箭", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "狂暴之箭", "needmp": 20, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "雷神之箭", "needmp": 25, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "萃毒之箭", "needmp": 20, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

                { "name": "冰风斩", "needmp": 25, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "山崩地裂", "needmp": 25, "cd": 10, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "顺劈斩", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "巫毒狂暴", "needmp": 40, "cd": 15, "level1": 5, "level2": 8, "level3": 15, "level4": 20, "level5": 28, "level6": 36, "level7": 45, "level8": 60, "level9": 80 },
            ]

            var p_skill1 = humandata.skill1_level;
            var p_skill2 = humandata.skill2_level;
            var p_skill3 = humandata.skill3_level;
            var p_skill4 = humandata.skill4_level;
            if (humandata.job == 1) {
                var mydias = humandata.diaarray[0] + humandata.diaarray_jc[0]
                var skill1 = skillslist[11];
                var skill2 = skillslist[9];
                var skill3 = skillslist[8];
                var skill4 = skillslist[10];
            }
            if (humandata.job == 2) {
                var mydias = humandata.diaarray[2] + humandata.diaarray_jc[2]
                var skill1 = skillslist[7];
                var skill2 = skillslist[5];
                var skill3 = skillslist[4];
                var skill4 = skillslist[6];
            }
            if (humandata.job == 3) {
                var mydias = humandata.diaarray[1] + humandata.diaarray_jc[1]
                var skill1 = skillslist[3];
                var skill2 = skillslist[1];
                var skill3 = skillslist[0];
                var skill4 = skillslist[2];
            }
            var x = 'skill1.level' + p_skill1;
            var p_skill1_name = skill1.name;
            var p_skill1_damage = eval(x);
            var p_skill1_cd = skill1.cd;
            var p_skill1_needmp = skill1.needmp;
            x = 'skill2.level' + p_skill2;
            var p_skill2_name = skill2.name;
            var p_skill2_damage = eval(x);
            var p_skill2_cd = skill2.cd;
            var p_skill2_needmp = skill2.needmp;
            x = 'skill3.level' + p_skill3;
            var p_skill3_name = skill3.name;
            var p_skill3_damage = eval(x);
            var p_skill3_cd = skill3.cd;
            var p_skill3_needmp = skill3.needmp;
            x = 'skill4.level' + p_skill4;
            var p_skill4_name = skill4.name;
            var p_skill4_damage = eval(x);
            var p_skill4_cd = skill4.cd;
            var p_skill4_needmp = skill4.needmp;


            var ice_odds = 10//冰冻机率
            var ray_odds = 5 //瘫痪机率


            //怪物属性
            var ranx = Math.random() * 0.5 + 0.7

            var monster = monsterlist[Math.floor(Math.random() * monsterlist.length)];

            var m_name = monster.name;
            var m_damage = Math.floor(((Math.sqrt(monster.damage) * 1.2) * Math.floor(Math.sqrt(monster_level)) * 5 * monster_level) * ranx) * (monster_level < 6 ? 0.3 : 1) * (monster_level > 19 ? 1.2 : 1) * (monster_level > 29 ? 1.2 : 1) * (monster_level > 39 ? 1.5 : 1) * (monster_level > 49 ? 1.5 : 1) * (monster_level > 54 ? 1.2 : 1) * (monster_level > 59 ? 1.2 : 1) * (monster_level > 64 ? 1.2 : 1) * (monster_level > 69 ? 1.2 : 1) * (monster_level > 79 ? 1.2 : 1) * (monster_level > 89 ? 1.5 : 1) * (monster_level > 99 ? 2 : 1) * (monster_level > 109 ? 2 : 1) * (monster_level > 129 ? 2 : 1);
            var m_hp = Math.floor((monster.hp + (Math.sqrt(monster.hp) * 15 + 1) * Math.sqrt(monster_level) * (monster_level > 9 ? 40 : 20) * (monster_level < 6 ? 0.3 : 0.6) * monster_level * (monster_level > 29 ? 2 : 1) * (monster_level > 34 ? 2 : 1) * (monster_level > 39 ? 2 : 1) * (monster_level > 44 ? 2 : 1) * (monster_level > 49 ? 2 : 1)) * (monster_level > 54 ? 1.5 : 1) * (monster_level > 59 ? 1.5 : 1) * (monster_level > 64 ? 1.5 : 1) * (monster_level > 69 ? 1.5 : 1) * (monster_level > 79 ? 1.5 : 1) * (monster_level > 89 ? 2 : 1) * (monster_level > 99 ? 2 : 1) * (monster_level > 109 ? 2 : 1) * (monster_level > 129 ? 2 : 1) * ranx);

            var m_hj = monster_level < 6 ? m_hj = 0 : Math.floor((monster.hj + (Math.sqrt(monster.hj) * 1 + 1) * Math.sqrt(monster_level) * 3.5 * monster_level) * ranx);
            var m_speed = monster.speed;
            var m_type = monster.type;

            //人物属性
            var huodong = 1 * wordexp// 活动
            var jctemp = 0.2;  //追随者加成
            var jctemp_exp = 1 * (1 + exp_df) * huodong;
            var nowtime = new Date()
            nowtime = nowtime.getTime()
            if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
                humandata.fly == 0 ? jctemp = 0.2 : (humandata.fly == 1 ? jctemp = 0.7 : jctemp = 1)              //翅膀加成 挂机
                humandata.fly == 0 ? jctemp_exp = 1 * (1 + exp_df) * huodong : (humandata.fly == 1 ? jctemp_exp = 1.5 * (1 + exp_df) * huodong : jctemp_exp = 2 * (1 + exp_df) * huodong)
            }
            var p_hp = humandata.HP + (humandata.hp_jc * jctemp);   //人物HP
            var p_mp = humandata.MP;    //人物MP
            var p_secmp = humandata.secmp;    //人物MP
            var p_hj = humandata.HJ + (humandata.hj_jc * jctemp);    //人物护甲
            var p_resistance = humandata.resistance + (humandata.resistance_jc * jctemp); //人物元素抗性
            var p_attback = humandata.attback + (humandata.attback_jc * jctemp);  //  人物击回
            var p_cd = humandata.cd_p;      //人物CD减少
            var p_crit = humandata.crit;    //人物暴击机率
            var p_critdamage = 1 + (humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100;    //人物暴击伤害
            var p_speed = humandata.speed;
            var p_fire = humandata.fire + (humandata.fire_jc * jctemp);
            var p_ice = humandata.ice + (humandata.ice_jc * jctemp);
            var p_poison = humandata.poison + (humandata.poison_jc * jctemp);
            var p_ray = humandata.ray + (humandata.ray_jc * jctemp);
            var p_level = humandata.level;
            var p_job = humandata.job;

            var exp = humandata.exp;
            var exp_all = humandata.exp_all;
            var p_zhu = humandata.job == 1 ? humandata.LL : humandata.job == 2 ? humandata.MJ : humandata.ZL
            //武器伤害
            var p_damage = Math.floor(humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) + Math.floor(humandata.damage_jc * jctemp)



            var legend_1 = 0;
            offline_results[6] = 0;
            offline_results[13] = 0;
            var legend_2 = false;
            var legend_3 = false;
            var legend_4 = false;
            var legend_6 = 1;
            var legend_7 = false;
            var legend_9 = false;
            var legend_10 = false;
            var legend_11 = false;
            var legend_13 = 1;
            var legend_14 = false;
            var legend_15 = false;
            var legend_20 = false;
            var legend_21 = false;
            var legend_22 = false;
            var legend_22_i = 1
            var legend_23 = false;
            var legend_23_3 = 3
            var legend_23_5 = 5
            var legend_24 = false;
            var legend_25 = false;
            var legend_28 = false;
            var legend_38 = false;
            var legend_38_ok = false;

            var legend100 = false;//套装
            var legend100_6 = false;
            var legend100_i = 0;
            var legend101 = false;
            var legend101_6 = false;
            var legend101_i = 0;
            var legend102 = false;
            var legend102_6 = false;
            var legend102_i = 0;
            var legend_exp = 1;
            if (cqarray.indexOf(99) > -1 || humandata.cqarray_jc.indexOf(99) > -1) {
                offline_results[13] = 1
            }

            if (cqarray.indexOf(1) > -1) {
                legend_1 = 1;
                offline_results[6] = 1
            }
            if ((cqarray.indexOf(2) > -1) && p_level >= monster_level) {
                legend_2 = true;//1%秒杀不高于自己的怪
            }
            if (cqarray.indexOf(3) > -1) {
                legend_3 = true;  //暴击回复10%MP
            }
            if (cqarray.indexOf(4) > -1) {
                legend_4 = true;  //当你的生命值低于30%时，伤害提高100%
            }
            if (cqarray.indexOf(5) > -1) {           //如果你的暴击机率大于等于60%，则你每次必定暴击
                if (p_crit > 59) {
                    p_crit = 100
                }
            }
            if (cqarray.indexOf(6) > -1) {  //你的追随者提供的伤害加成提高5%
                legend_6 = 1.05
            }
            if (cqarray.indexOf(7) > -1) {  //当受到致命伤害时，10%的机率回复50%的HP
                legend_7 = true;
            }
            if (cqarray.indexOf(8) > -1) {  //所有的技能MP消耗降低20
                p_skill1_needmp = Math.floor(skill1.needmp * 0.8);
                p_skill2_needmp = Math.floor(skill2.needmp * 0.8);
                p_skill3_needmp = Math.floor(skill3.needmp * 0.8);
                p_skill4_needmp = Math.floor(skill4.needmp * 0.8);
            }
            if (cqarray.indexOf(9) > -1) {  //当你的生命值低于20%时，必定暴击
                legend_9 = true;
            }
            if (cqarray.indexOf(10) > -1) {  //MP的值低于10%时，所受到的伤害减少50%
                legend_10 = true;
            }
            if (cqarray.indexOf(11) > -1) {  //攻击被控制的怪物时，必定暴击
                legend_11 = true;
            }
            if (cqarray.indexOf(12) > -1) {  //你的击回数值增加，增加的百分比为你的暴击机率
                p_attback = (humandata.attback + (humandata.attback_jc * jctemp)) * (1 + p_crit / 100)
            }
            if (cqarray.indexOf(13) > -1) {  //你对精英和BOSS的伤害增加100%
                if (monster.type != "普通") {
                    legend_13 = 2
                }
            }
            if (cqarray.indexOf(14) > -1) {//你免疫所有控制（冰冻、瘫痪）
                legend_14 = true;
            }
            if (cqarray.indexOf(15) > -1) {  //你的每次攻击和技能都会提高火技能伤害1%
                legend_15 = true;
            }


            if (cqarray.indexOf(18) > -1) {//如果你的面板伤害低于追随者，则你的暴击伤害提高100%
                if (p_damage * (1 + (p_crit / 100 * p_critdamage / 100)) < humandata.damage_jc) {
                    p_critdamage = 1 + ((humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100) + 1;

                }
            }

            if (cqarray.indexOf(19) > -1) {  //你的所有技能等级+2
                p_skill1 = humandata.skill1_level + 2;
                p_skill2 = humandata.skill2_level + 2;
                p_skill3 = humandata.skill3_level + 2;
                p_skill4 = humandata.skill4_level + 2;
                var xx = 'skill1.level' + p_skill1;
                p_skill1_damage = eval(xx);
                xx = 'skill2.level' + p_skill2;
                p_skill2_damage = eval(xx);
                xx = 'skill3.level' + p_skill3;
                p_skill3_damage = eval(xx);
                xx = 'skill4.level' + p_skill4;
                p_skill4_damage = eval(xx);
            }
            if (cqarray.indexOf(20) > -1) {//如果你的追随者也有此传奇属性，则他将为你分担一半伤害
                if (humandata.cqarray_jc.indexOf(20) > -1) {
                    legend_20 = true;
                }
            }
            if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
                if (p_speed < m_speed) {
                    legend_21 = true;
                }
            }

            if (cqarray.indexOf(23) > -1) {//华戒  少一件
                legend_23 = true;
                legend_23_3 = 2
                legend_23_5 = 4
            }
            if (humandata.cqarray_jc.indexOf(23) > -1) {
                legend_23 = true;
                legend_23_3 = 2
                legend_23_5 = 4
            }
            if (cqarray.indexOf(24) > -1) {//冰冻机率提高
                legend_24 = true;
                ice_odds = ice_odds + (humandata.ZL * 0.005)
            }
            if (cqarray.indexOf(25) > -1) {//冰冻技能优先
                legend_25 = true;
            }
            if (cqarray.indexOf(26) > -1 && mydias > 20) {
                p_cd += 30
            }
            if (cqarray.indexOf(27) > -1) {//护甲提高
                p_hj = humandata.HJ + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);    //人物护甲
            }
            if (cqarray.indexOf(28) > -1 || humandata.cqarray_jc.indexOf(28) > -1) {//普攻减CD1秒
                legend_28 = true;
            }
            if (cqarray.indexOf(30) > -1 || humandata.cqarray_jc.indexOf(30) > -1) {
                var newexpparr = cqarray
                newexpparr.push(...humandata.cqarray_jc)
                legend_exp = Math.max(...newexpparr)
                legend_exp = (legend_exp - 1000) / 100 + 1
                legend_exp > 1 ? legend_exp : 1
            }
            if (cqarray.indexOf(38) > -1 || humandata.cqarray_jc.indexOf(38) > -1) {
                legend_38 = true
            }
            if (cqarray.indexOf(100) > -1) {//套装

                legend100_i = getSameNum(100, cqarray)
                if (legend100_i > 1) {
                    if (cqarray.indexOf(27) > -1) {//护甲提高
                        p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);   //人物护甲
                    } else {
                        p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp);
                    }

                }
                if (legend100_i > legend_23_3) {
                    legend100 = true;
                }
                if (legend100_i > legend_23_5) {
                    legend100_6 = true;
                }
            }


            if (cqarray.indexOf(101) > -1) {//套装
                legend101_i = getSameNum(101, cqarray)
                if (legend101_i > 1) {
                    p_speed = humandata.speed * 1.2
                }
                if (legend101_i > legend_23_3) {
                    legend101 = true;
                }
                if (legend101_i > legend_23_5) {
                    legend101_6 = true;
                }
            }


            if (cqarray.indexOf(103) > -1) {//套装
                var legend103_i = getSameNum(103, cqarray)
                if (legend103_i > legend_23_5) {
                    p_ray = p_ray * 2.5;
                    p_fire = p_fire * 2.5;
                    p_ice = p_ice * 2.5;
                    p_poison = p_poison * 2.5;
                } else if (legend103_i > legend_23_3) {
                    p_ray = p_ray * 1.5;
                    p_fire = p_fire * 1.5;
                    p_ice = p_ice * 1.5;
                    p_poison = p_poison * 1.5;
                } else if (legend103_i > 1) {
                    p_ray = p_ray * 1.2;
                    p_fire = p_fire * 1.2;
                    p_ice = p_ice * 1.2;
                    p_poison = p_poison * 1.2;
                }
            }

            if (cqarray.indexOf(17) > -1) {  //所有技能元素属性变成你最高伤害比的那个元素属性
                var legend_17 = Math.max(p_ray, p_fire, p_ice, p_poison)
                p_ray = legend_17;
                p_fire = legend_17;
                p_ice = legend_17;
                p_poison = legend_17;
            }

            if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
                if (p_speed < m_speed) {
                    legend_22 = true;
                    legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
                }
            }

            if (cqarray.indexOf(16) > -1) {  //冰系技能冰冻机率提高，提高的百分比为你的冰系伤害
                ice_odds = 10 + Math.floor(p_ice / 10)
            }

            if (cqarray.indexOf(102) > -1) {//套装
                legend102_i = getSameNum(102, cqarray)
                if (legend102_i > 1) {
                    if (cqarray.indexOf(16) > -1) {
                        ice_odds = 20 + Math.floor(p_ice / 10)
                    } else {
                        ice_odds = 20
                    }

                }
                if (legend102_i > legend_23_3) {
                    legend102 = true;
                }
                if (legend102_i > legend_23_5 && monster_level > p_level) {
                    legend102_6 = true;
                } else {
                    legend102_6 = false;
                    if ((cqarray.indexOf(33) > -1 || humandata.cqarray_jc.indexOf(33) > -1) && p_job == 3) {
                        legend102_6 = true;
                    }
                }
            }

            function getSameNum(val, arr) {
                processArr = arr.filter(function (value) {
                    return value == val;
                })
                return processArr.length;
            }

            //技能配置

            //初始化状态数据
            if (legend_25 == true) {  //控制技能优先
                var temp_skill = 3
            } else {
                var temp_skill = 1
            }
            var m_state = "正常";
            var m_attstate = []  //怪攻击技能
            var h_yichang = []//人物异常状态 
            var m_state2 = "正常"; //中毒状态
            var p_state = "正常";
            var p_detail = '正常'
            var poison_time = 0;//中毒时间


            var cd1 = 0;
            var cd2 = 0;
            var cd3 = 0;
            var cd4 = 0;
            var m_times = 0;

            var Fight_p = setInterval(fight_p, 10 / p_speed);  //角色开始
            var Fight_m = setInterval(fight_m, 10 / m_speed);  //怪物开始
            var Fight_sec = setInterval(fight_sec, 10);  //每秒计时
            var fight_times = 0
            function stopInterval() {
                clearInterval(Fight_p);
                clearInterval(Fight_m);
                clearInterval(Fight_sec);
            }

            //每秒计时
            function fight_sec() {
                cd1 -= 1
                cd2 -= 1
                cd3 -= 1
                cd4 -= 1
                cd1 = cd1 <= 0 ? 0 : cd1
                cd2 = cd2 <= 0 ? 0 : cd2
                cd3 = cd3 <= 0 ? 0 : cd3
                cd4 = cd4 <= 0 ? 0 : cd4
                p_mp += p_secmp;
                fight_times += 10
                if (fight_times > 2000) {
                    stopInterval()
                    returnresults_pdead()
                }
            }

            //人
            function fight_p() {
                m_times += 1
                p_detail = "正常"
                if (p_hp <= 0 && legend_7 == true) {  //10%机率回复50%血
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < 20) {
                        p_hp += (humandata.HP + (humandata.hp_jc * jctemp)) / 2
                        p_detail = "复活"
                    }
                }

                if (p_hp <= 0) {
                    stopInterval()
                    // p_stateArray.push("死亡")
                    returnresults_pdead()
                }
                if (legend_2 == true) {  //传奇-1%机率秒杀怪

                    var odds = Math.floor(Math.random() * 120);
                    if (odds < 1) {
                        m_hp = 0;
                    }
                }
                if (legend_4 == true && p_hp < humandata.HP * 0.3) {
                    p_damage = Math.floor(((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * 2) + (humandata.damage_jc * jctemp))
                } else {
                    p_damage = Math.floor((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 + (humandata.damage_jc * jctemp))
                }

                var temp_p_critdamage = 1;
                var temp_p_poison = 1;

                if (legend_25 == true) {  //控制技能优先

                    if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                } else {
                    if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                }


                //------------------------------技能攻击
                function playskill1() {      //技能攻击 毒
                    //中毒机率
                    if (p_job == 1) {
                        p_state = "巫毒狂暴";
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp

                    } else {
                        m_state2 = "中毒"
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp

                    }
                }

                function playskill2() {      //技能攻击
                    play_pt(p_damage * (p_skill2_damage / 100 + 1) * (1 + p_fire / 100), "jn")
                    p_mp -= p_skill2_needmp
                }

                function playskill3() {      //技能攻击冰
                    //冰冻机率
                    var odds = Math.floor(Math.random() * 100);
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill3_damage / 100 + 1) * (1 + p_ice / 100), "jn")
                    }
                    if (odds < ice_odds) {
                        if (legend_38 == true) {

                            legend_38_ok = true
                        }
                        m_state = "冰冻"
                        setTimeout(resetstateice, 30);
                    }

                    p_mp -= p_skill3_needmp
                }

                function playskill4() {      //技能攻击  电
                    //瘫痪机率
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < ray_odds) {
                        m_state = "瘫痪"
                        setTimeout(resetstateray, 60);
                    }
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill4_damage / 100 + 1) * (1 + p_ray / 100), "jn")
                    }
                    p_mp -= p_skill4_needmp
                }
                //------------------------------普通攻击
                function play_pt(p_damage, from) {     //普通攻击
                    if (legend_21 == true) {
                        p_damage = p_damage * 2
                    }
                    if (legend_15 == true) {//你的每次攻击和技能都会提高火技能伤害1%
                        p_fire += 1;
                    }

                    //暴击机率
                    var odds = Math.floor(Math.random() * 100);
                    if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                        odds = 0;
                    }
                    if ((m_state == "冰冻" || m_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                        odds = 0;
                    }
                    if (m_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                        var legend102_ii = 1.5
                    } else if (m_state == "冰冻" && legend102_6 == true) {  //法师套装
                        var legend102_ii = 4
                    } else {
                        var legend102_ii = 1
                    }
                    if (odds < p_crit) {
                        temp_p_critdamage = p_critdamage;

                        if (legend_3 == true) {   //暴击回复10%MP
                            p_mp += humandata.MP / 10;
                        }
                    } else {
                        temp_p_critdamage = 1;
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time < 30 && m_state2 == "中毒") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                        } else {
                            m_state2 = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                        }
                    }

                    //检测巫毒狂暴
                    if (p_job == 1) {
                        if (poison_time < 60 && p_state == "巫毒狂暴") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100 + 1  //temp_p_poison 巫毒狂暴伤害传递参数
                        } else {
                            m_state = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                        }
                    }

                    m_hp -= ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0

                    var temp_addback = p_attback;
                    // if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp))) {
                    if (legend101_6 == true) {
                        temp_addback = p_attback + (humandata.MJ * 10)
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 != true) {
                        temp_addback = p_attback * temp_p_critdamage
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 == true) {
                        temp_addback = (p_attback * temp_p_critdamage) + (humandata.MJ * 10)
                    }
                    if (legend_38_ok == true) {
                        temp_addback += humandata.ZL * 500
                        legend_38_ok = false
                    }
                    // if (((humandata.HP + (humandata.hp_jc * jctemp)) - p_hp) <= temp_addback) {
                    //     temp_addback = (humandata.HP + (humandata.hp_jc * jctemp)) - p_hp
                    // }
                    // }
                    p_hp += temp_addback
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;



                }
            }

            //怪
            function fight_m() {
                if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                    p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
                }

                if (m_hp <= 0) {
                    stopInterval()
                    // m_stateArray.push("死亡")
                    returnresults()
                }
                if (m_state == "正常") {
                    if ((p_mp < humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                        if (legend_22 == true) {
                            p_hp -= m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                        } else {
                            p_hp -= m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                        }
                    } else {
                        if (legend_22 == true) {
                            p_hp -= m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                        } else {
                            p_hp -= m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                        }

                    }

                    if (legend100 == true && legend100_6 != true) {
                        m_hp -= (p_hj * 20)
                    } else if (legend100 == true && legend100_6 == true) {
                        //反伤爆击
                        var odds_fs = Math.floor(Math.random() * 100);
                        if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                            odds_fs = 0;
                        }

                        if (odds_fs < p_crit) {
                            var temp_p_critdamage_fs = p_critdamage;
                        } else {
                            var temp_p_critdamage_fs = 1;
                        }
                        m_hp -= (p_hj * 20 * p_critdamage)
                    }



                }
            }

            //resetstate
            function resetstateice() {
                if (m_state != "瘫痪") {
                    m_state = "正常"
                }
            }
            function resetstateray() {
                if (m_state != "冰冻") {
                    m_state = "正常"
                }
            }

            //回调结果
            function returnresults() {
                var exprate = 1;
                if ((humandata.map_small - humandata.level) > 0) {
                    exprate = (1 + ((humandata.map_small - humandata.level) / 10)) > 2 ? 2 : (1 + ((humandata.map_small - humandata.level) / 10))
                } else {
                    exprate = (1 + ((humandata.map_small - humandata.level) / 10)) < 0 ? 0 : (1 + ((humandata.map_small - humandata.level) / 10))
                }

                if (exprate <= 0){
                    exprate = 0.1
                }
                var fight_exp = Math.floor((monster_level * 1) * (monster_level + 20) * exprate * jctemp_exp * legend_exp)
                var fight_gold = Math.floor((monster_level * 20) * (monster_level + 120) * exprate * jctemp_exp)
                offline_exp += fight_exp     //累计经验
                offline_gold += fight_gold    //累计金币
                offline_results[0] = offline_exp
                offline_results[1] = offline_gold
                offline_results[2] += 1
                if (offline_results[2] < 81) {
                    startfight(humandata, monster_level)
                }

            }

            function returnresults_pdead() {
                offline_exp += 0     //累计经验
                offline_gold += 0    //累计金币
                offline_results[0] = offline_exp
                offline_results[1] = offline_gold
                offline_results[2] += 1
                offline_results[3] += 1
                if (offline_results[2] < 81) {
                    startfight(humandata, monster_level)
                }
            }

        }

    }


    // 离线大米
    function offlinebigok(data, map_big_x) {
        var dianfarr = data[0].dianf;
        function getwuli(hj) {
            return (100 - ((Math.sqrt(Math.sqrt(hj)) * (data[0].job == 1 ? 2.8 : 1.5) + dianfarr[1]) > 80 ? 80 : (Math.sqrt(Math.sqrt(hj)) * (data[0].job == 1 ? 2.8 : 1.5) + dianfarr[1]))) / 100
        }


        data[0].HP = data[0].HP * (1 + dianfarr[0] / 100)
        data[0].resistance = data[0].resistance + dianfarr[2]
        data[0].attback = data[0].attback + dianfarr[3]

        data[0].critdamage = data[0].critdamage + dianfarr[4]
        data[0].ice = data[0].ice + dianfarr[5]
        data[0].fire = data[0].fire + dianfarr[6]
        data[0].ray = data[0].ray + dianfarr[7]
        data[0].poison = data[0].poison + dianfarr[8]
        var exp_df = dianfarr[9] / 100
        var rate_df = dianfarr[10] / 100


        var offline_results = []
        var offline_exp = 0     //累计经验
        var offline_gold = 0    //累计金币
        var nowtime = new Date()
        var nowtimetamp = (nowtime.getTime())
        var ratetemp;
        if ((map_big_x - data[0].level) > 0) {
            ratetemp = (10 + (map_big_x - data[0].level)) > 15 ? 15 : (10 + (map_big_x - data[0].level))
        } else {
            ratetemp = Math.floor(10 + (map_big_x - data[0].level))
        }
        if (data[0].fly_data != 0 && (data[0].fly_data - nowtimetamp) > 0) {
            data[0].fly == 0 ? ratetemp = ratetemp : (data[0].fly == 1 ? ratetemp = (Math.floor(ratetemp * (1.1)) + 2) : ratetemp = (Math.floor(ratetemp * (1.3)) + 4))   //翅膀爆率 挂机
        }
        if (data[0].level < 20) {
            ratetemp = 40
        }
        ratetemp = ratetemp < 0 ? 0 : ratetemp
        offline_results[12] = data[0].level
        offline_results[11] = data[0].exp
        offline_results[10] = data[0].exp_all
        offline_results[9] = data[0].objectId
        offline_results[8] = data[0].pick
        offline_results[7] = nowtimetamp - data[0].lasttimetamp
        offline_results[5] = map_big_x
        offline_results[4] = ratetemp * (1 + rate_df) + 10  //活动 原始： 爆率 + 10 
        offline_results[3] = 0//死亡次数
        offline_results[2] = 0  //战斗次数
        var alltime = 8000;
        var offline_temp = 0
        var h_times = 0  //人物死亡时间和
        var m_values = 0 //杀怪值总和
        var off_keys = 0 //钥匙数量
        var offline_sec = setInterval(offline_secf, 1000);  //每秒计时
        startfight(data[0], map_big_x)
        function offline_secf() {
            if (offline_temp >= alltime) {
                clearInterval(offline_sec);
                // return response.success(offline_results);
                getoffline(offline_results, data[0])
            } else {
                offline_temp += 1000
            }
        }



        function getoffline(offdata, data) {
            var dobuleexp = data.dobuleexp || 0
            // console.log(dobuleexp + 'dobuleexp')
            offdata[0] = offdata[0] || 0
            offdata[1] = offdata[1] || 0
            var exp_p = offdata[0] / offdata[2]
            var gold_p = offdata[1] / offdata[2]
            offdata[2] = Math.floor(3600 / ((3600 / (offdata[2] * 5)) + 6))   //  战斗次数/小时
            offdata[3] = Math.floor(3600 / ((3600 / (offdata[3] * 5)) + 6))   //死亡次数 /小时
            offdata[7] = (offdata[7] / 3600000) > 12 ? 12 : (offdata[7] / 3600000)  //小时数
            // offdata[8][0] = 1  //白装分解设定
            offdata[0] = exp_p * offdata[2]  //经验
            offdata[1] = gold_p * offdata[2]  * 10 //金币 

            if (offdata[4] < 2) {
                var diamondArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 99]
                var fight_timess = Math.floor(((offdata[2] - offdata[3]) * offdata[7]) * (2 / 100)); //战斗次数
            } else {
                var diamondArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 99]
                var fight_timess = Math.floor(((offdata[2] - offdata[3]) * offdata[7]) * (offdata[4] / 100)); //战斗次数
            }


            var off_allkeys = Math.floor(off_keys * 4 * offdata[7]) //钥匙
            if (off_allkeys > data.keys) {
                offdata[7] = offdata[7] * (data.keys / off_allkeys)
                fight_timess = fight_timess * (data.keys / off_allkeys)
                off_allkeys = data.keys
            }

            var backback = offdata;
            var m_level = offdata[5] > 60 ? 60 : offdata[5];//地图等级 
            var legendid = offdata[6];  //传奇属性1
            var legend99 = offdata[13];  //传奇属性99
            var pick = offdata[8];
            var ratetemp2 = offdata[4];   //爆率
            var f_gold = Math.floor(offdata[1] * offdata[7]);
            var objectId = offdata[9];
            if (dobuleexp <= offdata[7]) {  //离线双倍
                var f_exp = Math.floor(offdata[0] * (offdata[7] + dobuleexp));
                dobuleexp = 0
            } else {
                var f_exp = Math.floor(offdata[0] * offdata[7] * 2);
                dobuleexp = dobuleexp - offdata[7]
            }


            var f_allexp = offdata[10];
            var f_nowexp = offdata[11];
            var f_level = offdata[12];
            var now_exp = f_nowexp;  //现有经验60
            var now_exp_all = f_allexp;  //升级所要经验 100
            var now_level = f_level;      //等级 
            var fight_exp = f_exp;   //获得的经验200

            var rate3 = [0, 2, 10, 25, 100]
            if (data.level < 20) {
                rate3 = [0, 15, 35, 55, 100]
            }
            var datarate = [{ "diamond": ["钻石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "拉玛兰迪礼物"], "dropitem": ["升灵胸甲", "禁卫胸甲", "统御者胸甲", "君王胸甲", "末日护甲", "战神胸甲", "巴洛尔护甲", "冥河背心", "征服者胸甲", "摄政王之铠", "升灵法袍", "禁卫法袍", "统御者法袍", "君王法袍", "末日神袍", "战神之袍", "巴洛尔神袍", "冥河神袍", "征服者之袍", "摄政王之袍", "升灵披风", "禁卫披风", "统御者披风", "君王披风", "末日披风", "战神披风", "巴洛尔披风", "冥河披风", "征服者披风", "摄政王披风", "重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "预言", "坏灭", "狂怒", "奧汀之子", "狂君", "日光守祭", "日阳", "焚灼", "霜心", "煞星", "幽冥法珠", "三连法球", "宇宙缩影", "寒冬疾风", "半神巫妖", "星轨石", "艾利之书", "聚能法珠", "核瞳", "恩典之光", "猎人的箭盒", "亡者遗产", "索罪矢", "黑骨箭", "弓匠的骄傲", "银星", "恶魔之箭", "圣尖矢", "万全箭筒", "神圣箭筒", "征服者军帽", "死神面罩", "统治之盔", "地狱恐面", "铁骑头甲", "守护头盔", "皇冠", "主教的头盔", "星际战盔", "升灵头冠", "君王头罩", "智慧面甲", "蕾蔻的意志", "大地之眼", "唤魔师法冠", "法尊", "贤者之巅", "大护法", "共鸣", "暮光", "诺曼之盔", "骑士射盔", "阿克汉的头盔", "乌莲娜的精神", "圣光之冠", "罗兰之面", "荒原头盔", "守护者的凝视", "灼天之面", "骄矜必败", "死卫护肩", "辟邪肩甲", "萨卡拉肩铠", "先祖的怒火", "征服者肩铠", "骷髅王肩铠", "星际肩铠", "壮丽肩饰", "战狂肩甲", "阿克汉的肩甲", "伏尔的劝诫", "七宗罪", "升灵护肩", "末日肩铠", "密棘肩甲", "叠铠肩甲", "蚀刻罩肩", "恶魔之羽", "大地之柱", "博恩的赦免", "大披肩", "魔牙披风", "炎魔肩铠", "御法者肩甲", "渎圣肩铠", "导能披肩", "御魔肩甲", "赋归肩垫", "染邪护肩", "傲慢肩甲", "血色之眼", "狂暴护符", "力量之泉", "地狱火符", "君王护符", "妄念", "黄金护颈", "阿兹卡兰之星", "鱼人坠匣", "国王护符", "猎魔护符", "敏捷之泉", "森林之符", "雕饰项链", "隆达尔的坠匣", "先人之佑", "时光流韵", "吸魂镜", "敏锐之眼", "守护之锁", "艾利护符", "圣灯", "月光护符", "魔法护符", "智力之泉", "元素使者", "兵要护符", "艾利奇之眼", "法能陷阱", "万花筒", "板甲护手", "君王前臂甲", "角斗士的手套", "阿契武的战书", "征服者护手", "塔斯克与西奥", "岩石护手", "宗师护指", "战狂护手", "阿克汉的护手", "升灵护手", "箭雨护手", "潘德之手", "骨织护手", "扼息护手", "荒原护手", "凶恶护手", "影弑", "蕾蔻的裹手", "武空的灵掌", "霜燃", "礼赞手套", "法师之拳", "御法者护手", "炎魔手套", "蚀刻手套", "魔牙护手", "乌莲娜的愤怒", "罗兰之握", "唤魔师的骄傲", "力士护腕", "奴隶镣铐", "守护者的格挡", "加百利的臂甲", "沃兹克臂甲", "卫士护腕", "赛斯切隆臂甲", "愤怒护腕", "阿克汉的镣铐", "稳击护腕", "恶魔之恨", "莫提克的手腕", "豹人猎杀者", "塔格奥腕环", "箭道护腕", "凯撒的回忆", "始祖的缠绕", "拉昆巴的腕饰", "恶魔之怨", "明彻裹腕", "杰拉姆的护腕", "先民护腕", "斯古拉的拯救", "德拉肯的训导", "朗斯洛的愚行", "蒙尘者绑腕", "灵魂守卫", "雷神之力", "天使发带", "京四郎之魂", "金织带", "贪婪腰带", "宝藏腰带", "不可信之链", "哈林顿的护腰", "张的腰封", "天堂束腰", "崩天恨雨", "失踪者的绑腰", "刀锋磨带", "暗影之链", "瑟伯的梦魇", "猎手之怒", "行侠腰带", "飞刀束带", "迅击腰带", "圣洁束带", "万象皆杀", "谢尔曼的缠腰", "缠腰耳串", "行巫时刻", "通冥腰带", "沃贾裹腰", "女魔护腰", "霍尔的祝福", "佐伊的秘密", "附魂腰带", "神秘腿甲", "沼地防水裤", "征服者腿铠", "斯科隆的欺诈", "舞蛇鳞甲", "影拥", "圣光之塔", "阿克汉的腿甲", "荒原腿甲", "恶魔之鳞", "骨织护腿甲", "死神赌注", "夸下痒", "基赫纳斯", "大地之重", "蕾蔻的马裤", "尹娜的戒律", "船长的推裤", "乌莲娜的忧虑", "拉基斯守护", "蚀刻长裤", "杨先生的妖裤", "汉默长裤", "御法者护腿甲", "恶疮马裤", "不死鸟之腹", "恶魔之甲", "凯恩的法裤", "凯恩的长袍", "唤魔师的新生", "荒原长靴", "船长的涉水靴", "不朽之王步履", "影踵", "阿克汉的钢靴", "小恶魔", "大地之基", "铁头防泥靴", "蔑视长靴", "撼地之靴", "凯恩的旅鞋", "掠夺者的便鞋", "蕾蔻的豪迈", "命运阔步靴", "娜塔亚的血足", "尹娜的风靴", "乌莲娜的天命", "粗糙至极靴", "粗野少年足", "安格的舞靴", "圣光之源", "贤者之途", "罗兰之步", "八魔之靴", "唤魔师的热忱", "虚幻长靴", "魔牙胫甲", "攀冰者", "里维拉的舞鞋", "尼芙尔的夸耀", "骷髅扣戒", "君王戒指", "地狱火戒指", "阿莱斯之环", "力量指环", "纳格尔之戒", "混沌之环", "机械指环", "克雷德之焰", "纳加的血戒", "空虚之戒", "永恒盟约", "被盗之戒", "命运守护", "弧光石", "加缪尔欺骗", "正义灯戒", "残影之戒", "罗盘玫瑰", "十二宫之戒", "悔恨大厅之戒", "黑曜石之戒", "凯索的婚戒", "神目指环", "罗嘉的巨石", "破碎誓言", "全能法戒", "空灵密语之戒", "乔丹之石", "祖尼玛萨之疾"], "israte": ratetemp2, "rate": rate3, "type": diamondArray, "otheritem": null }]
            var chire = 0
            var alltodos = []
            var itemsArray = [0, 0, 0, 0, 0, 0, 0]  //白、蓝、黄、传奇、金币、血岩、秘钥匙
            var lostitemsArray = [0, 0, 0, 0]  //白、蓝、黄、传奇
            var diamonds = 0
            var timeout = (fight_timess * 10) > 3000 ? 3000 : (fight_timess * 10)
            var offline_sec = setInterval(startrate, 10);  //每秒计时

            itemsArray[6] = off_allkeys

            setTimeout(function () {
                // console.log(objectId + 'objectId')
                backback[0] = fight_exp * 1.6  //离线经验 1.6
                backback[1] = f_gold
                clearInterval(offline_sec);
                var todo = AV.Object.createWithoutData(cloud_human, objectId);
                todo.increment('gold', (f_gold + itemsArray[4]));
                todo.increment('xueyan', itemsArray[5]);
                todo.increment('keys', -off_allkeys);
                todo.set('dobuleexp', dobuleexp);
                todo.increment('exp', fight_exp * 1.6);//离线经验
                todo.save();
                AV.Object.saveAll(alltodos).then(function (objects) {
                    // 成功
                    return response.success([itemsArray, lostitemsArray, diamonds, backback, 'big']);
                }, function (error) {
                    return response.error(error);
                });

                var query = new AV.Query(cloud_diamond);
                query.equalTo('user', request.currentUser);
                query.equalTo('name', "炙热硫磺");
                query.find().then(function (results) {
                    var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                    // console.log(data2[0].objectId + '炙热硫磺')
                    var todo = AV.Object.createWithoutData(cloud_diamond, data2[0].objectId);
                    todo.increment('num', chire);
                    todo.save();

                })


            }, timeout);



            //计算暴率
            function startrate() {
                var legend = {
                    "1": "每当你掉落一个宝石时，50%机率会额外再掉落一个",
                    "2": "1%的机率秒杀不高于自己等级的怪物（任意级别怪物）",
                    "3": "暴击后回复10%的MP值",
                    "4": "当你的生命值低于30%时，伤害提高100%",
                    "5": "如果你的暴击机率大于等于60%，则你每次必定暴击",
                    "6": "每次攻击附加你的追随者伤害的5%",
                    "7": "当受到致命伤害时，20%的机率回复50%的HP",
                    "8": "所有的技能MP消耗降低20%",
                    "9": "当你的生命值低于20%时，必定暴击",
                    "10": "MP的值低于20%时，所受到的伤害减少50%",
                    "11": "攻击被控制的怪物时，必定暴击",
                    "12": "你的击回数值增加，增加的百分比为你的暴击机率",
                    "13": "你对精英和BOSS的伤害增加100%",
                    "14": "你免疫所有控制（冰冻、瘫痪）",
                    "15": "你的每次攻击和技能都会提高火技能伤害1%",
                    "16": "冰系技能冰冻机率提高，提高的百分比为你的冰系伤害10%",
                    "17": "所有技能元素属性变成你最高伤害比的那个元素属性",
                    "18": "如果你的面板伤害低于追随者，则你的暴击伤害提高100%",
                    "19": "你的所有技能等级+2",
                    "20": "如果你的追随者也有此传奇属性，则他将为你分担一半伤害[追随者可生效]",
                    "21": "如果你的攻速低于怪物的攻速，则伤害提高一倍",
                    "22": "如果你的攻速低于怪，受到普通伤害降低，百分比为你最低的元素属性(80%上限)",
                    "23": "你的套装加成效果所需的装备数量降低1件(最少为2件)[追随者可生效]",
                    "24": "冰冻机率提高,数值为你智力的0.5%，但控制系技能伤害为0",
                    "25": "你的控制技能优先使用",
                    "26": "你和追随者身上的主属性[基于人物]宝石等级总和超过20，你的技能CD减少30%",
                    "27": "护甲值提高，数值为你和追随者主属性[基于人物]宝石等级总和的平方乘以10倍",
                    "28": "你的普通攻击每次减少所有技能CD1秒[追随者可生效]",
                    "29": "你的武器伤害增加，增加数值为智力的5%",
                    "30": "你的经验值增加",
                    "31": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高5倍[追随者可生效]",
                    "32": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高4倍[追随者可生效]",
                    "33": "寒冰套装无视怪物等级[仅限法师生效][追随者可生效]",
                    "34": "远古的召唤：人物穿戴6件传奇装备，远古门票半价[追随者可生效]",
                    "35": "远古的愤怒：人物穿戴6件传奇装备，对远古怪物伤害提高200%[追随者可生效]",
                    "36": "远古的汲取：人物穿戴6件传奇装备，对远古怪物击回提高100%[追随者可生效]",
                    "37": "远古的坚硬：人物穿戴6件传奇装备，在远古地图护甲值提高50%[追随者可生效]",
                    "38": "当你冰住怪的时候，你的血量回复，数值为智力的500倍[追随者可生效]",
                    "99": "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                }
                var green = {
                    "100": "血腥丘陵[反伤套装]",
                    "101": "神罚之城[天罚套装]",
                    "102": "冰冷之原[寒冰套装]",
                    "103": "自然之力[元素套装]"
                }
                var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
                var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
                var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
                var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]


                var ratetype = getArrayItems(datarate[0].type, 1)//随机取个TYPE

                if (ratetype[0] < 13) { //是否是装备
                    var qualityid = 0;
                    var item_name = getArrayItems(datarate[0].dropitem, 1) //随机一件装备 
                    var temprate = Math.floor(Math.random() * 100);
                    if (temprate < datarate[0].rate[1]) {
                        var temprateid = Math.floor(Math.random() * 100);
                        if (temprateid < 5) {
                            var qualityid_temp = 4 //套装
                        } else {
                            var qualityid_temp = 3 //传奇
                        }
                        qualityid = 3 //传奇
                        item_name = getArrayItems(datarate[0].dropitem, 1)//随机一件传奇装备 

                    } else if (temprate < datarate[0].rate[2]) {
                        qualityid = 2 //黄色
                    } else if (temprate < datarate[0].rate[3]) {
                        qualityid = 1 //蓝色
                    } else {
                        qualityid = 0 //白色	
                    }

                } else if (ratetype[0] < 99) {
                    //不是装备处理暴率
                    item_name = getArrayItems(datarate[0].otheritem, 1)//随机一件其它物品 
                    qualityid = 0;

                }
                else {
                    //宝石处理暴率
                    item_name = getArrayItems(datarate[0].diamond, 1)//随机一个宝石 

                }

                if (qualityid == 0 && pick[0] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[0] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid == 1 && pick[1] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[1] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid == 2 && pick[2] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[2] += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else if (qualityid > 2 && pick[3] == 1 && ratetype[0] < 13) {  //过滤装备
                    lostitemsArray[3] += 1
                    chire += 1
                    itemsArray[4] += Math.floor(350 * (m_level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8))
                    itemsArray[5] += (qualityid + 1) * (Math.floor(m_level * m_level / 4) + 1);
                } else {
                    h_death(item_name[0], qualityid, ratetype[0], m_level);
                    var temprateid2 = Math.floor(Math.random() * 100);
                    if (legend99 == 1 && qualityid > 2 && ratetype[0] < 13 && temprateid2 < 10) {
                        h_death(item_name[0], qualityid, ratetype[0], m_level);
                    }
                }


                //随机取属性
                function getArrayItems(arr, num) {
                    var temp_array = new Array();
                    for (var index in arr) {
                        temp_array.push(arr[index]);
                    }
                    var return_array = new Array();
                    for (var i = 0; i < num; i++) {
                        if (temp_array.length > 0) {
                            var arrIndex = Math.floor(Math.random() * temp_array.length);
                            return_array[i] = temp_array[arrIndex];
                            temp_array.splice(arrIndex, 1);
                        } else {
                            break;
                        }
                    }
                    return return_array;
                }

                //属性计算
                function counting(x, level, ranx) {

                    return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
                }
                function getArraydetail(itemarr, arrs, m_level, qualityid) {
                    var temparr = [];
                    temparr.push({});
                    if (qualityid == 3) {
                        var ranx = Math.random() * 0.2 + 1.3
                    }
                    if (qualityid == 2) {
                        var ranx = Math.random() * 0.3 + 1.2
                    }
                    if (qualityid == 1) {
                        var ranx = Math.random() * 0.3 + 1.1
                    }
                    if (qualityid == 0) {
                        var ranx = Math.random() * 0.3 + 1
                    }

                    for (i = 0; i < arrs.length; i++) {
                        switch (arrs[i]) {
                            case "ll":
                                temparr[0].ll = counting(itemarr.LL, m_level, ranx)

                                break;
                            case "mj":
                                temparr[0].mj = counting(itemarr.MJ, m_level, ranx)
                                break;
                            case "zl":
                                temparr[0].zl = counting(itemarr.ZL, m_level, ranx)
                                break;
                            case "tn":
                                temparr[0].tn = counting(itemarr.TN, m_level, ranx)
                                break;
                            case "hj":
                                temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2)
                                break;
                            case "damage":
                                temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx)
                                break;
                            case "speed":
                                temparr[0].speed = itemarr.speed
                                break;
                            case "damage_p":
                                temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                                break;
                            case "hp":
                                temparr[0].hp = counting(itemarr.hp, m_level, ranx)
                                break;
                            case "hp_p":
                                temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "mp":
                                temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                                break;
                            case "mp_p":
                                temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "speed_p":
                                temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                                break;
                            case "attback":
                                temparr[0].attback = counting(itemarr.attback, m_level, ranx)
                                break;
                            case "secmp":
                                temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                                break;
                            case "resistance":
                                temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                                break;
                            case "crit":
                                temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                                break;
                            case "critdamage":
                                var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                                if (itemarr.type == 5) {
                                    temparr[0].critdamage = critdamage_temp * 2.5
                                } else {
                                    temparr[0].critdamage = critdamage_temp
                                }
                                break;
                            case "ice":
                                temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "fire":
                                temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "ray":
                                temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "poison":
                                temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                                break;
                            case "lesslevel":
                                temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                                break;
                        }
                    }
                    return temparr;
                }




                function h_death(item_name, qualityid, ratetype, m_level) {
                    var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
                    var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "hp", "hp_p", "mp", "mp_p"] //武器
                    var arr2 = ["hp", "hp_p", "mp", "mp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品
                    var levelrate = Math.floor(Math.random() * 100)//降等属性
                    if (levelrate < 30 && m_level > 5) {
                        arr0.push("lesslevel");
                        arr1.push("lesslevel");
                        arr2.push("lesslevel");
                    }
                    if (ratetype < 13) {
                        var item = global.item_results.find(person => person.name === item_name);

                        if (item.type == 1) {
                            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                            arrs.push("speed", "damage")
                        }
                        if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
                            var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
                            arrs.push("hj")
                        }
                        if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
                            var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
                            // arrs.push("hj")
                        }
                        if (item.type == 2) {
                            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                        }
                        if (item.job == 1) {
                            arrs.push("ll", "tn")
                        }
                        if (item.job == 2) {
                            arrs.push("mj", "tn")
                        }
                        if (item.job == 3) {
                            arrs.push("zl", "tn")
                        }
                        var temparr2 = getArraydetail(item, arrs, m_level, qualityid)  //得到最终属性
                        var lesslevel = 0
                        if (temparr2[0].lesslevel !== undefined) {
                            lesslevel = temparr2[0].lesslevel
                        }
                        newitem(item, temparr2, qualityid, (m_level - lesslevel));

                    } else if (ratetype < 99) {
                        newitem2(item_name, ratetype, m_level);
                    } else {
                        newitemdiamond(item_name, m_level);
                    }

                }

                //背包得到一件装备
                function newitem(item, temparr2, qualityid, level) {
                    var cq_id = 0;
                    var greenArray = []

                    if (qualityid_temp == 3) {
                        cq_id = Math.floor(Math.random() * 38 + 1)
                                                                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        if (Math.random() * 100 > 10){
                            var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                            cq_id =  newlist[Math.floor(Math.random() * newlist.length)]
                        }
                    }
                    
                        if (cq_id == 31) {
                            cq_id = 32
                        }
                        if (cq_id == 30) {
                            var desc_text = legend[cq_id]
                            desc_text = desc_text + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
                        } else {
                            var desc_text = legend[cq_id]
                        }
                        // cq_id99 = Math.floor(Math.random() * 1000)
                        // if (cq_id99 < 5) {
                        //     cq_id = 99
                        //     desc_text = "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                        // }
                    }


                    if (qualityid_temp == 4) {
                        qualityid = 4
                        cq_id = Math.floor(Math.random() * 4 + 100)
                        if (cq_id == 100) {
                            greenArray = green100;
                            var desc_text = green[100]
                        }
                        if (cq_id == 101) {
                            greenArray = green101;
                            var desc_text = green[101]
                        }
                        if (cq_id == 102) {
                            greenArray = green102;
                            var desc_text = green[102]
                        }
                        if (cq_id == 103) {
                            greenArray = green103;
                            var desc_text = green[103]
                        }
                    }

                    var todoFolder = new AV.Object(cloud_bag);
                    todoFolder.set('name', item.name);
                    var targetitem = AV.Object.createWithoutData('item', item.objectId);
                    todoFolder.set('item', targetitem);
                    todoFolder.set('cq_id', cq_id);
                    if (cq_id == 99) {
                        todoFolder.set('trad_times', 3);
                    }
                    todoFolder.set('fumo', 0);
                    todoFolder.set('trad_times', 0);
                    todoFolder.set('desc', desc_text);
                    todoFolder.set('type', item.type);
                    todoFolder.set('state', "背包");
                    todoFolder.set('itemarr', temparr2);
                    todoFolder.set('qualityid', qualityid);
                    todoFolder.set('green', greenArray);
                    todoFolder.set('level', level);
                    todoFolder.set('ident', qualityid > 2 ? false : true);
                    todoFolder.set('price', Math.floor(item.price * (level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8)));
                    todoFolder.set('user', request.currentUser);
                    todoFolder.set('job', item.job);
                    if (qualityid == 3) {
                        itemsArray[3] += 1
                    } else if (qualityid == 2) {
                        itemsArray[2] += 1
                    } else if (qualityid == 1) {
                        itemsArray[1] += 1
                    } else {
                        itemsArray[0] += 1
                    }

                    alltodos.push(todoFolder)


                }
                //背包得到一件其它物品
                function newitem2(item_name, ratetype, level) {
                    var TodoFolder = AV.Object.extend(cloud_bag);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', item_name);
                    todoFolder.set('type', ratetype);
                    todoFolder.set('state', "背包");
                    todoFolder.set('level', level);
                    todoFolder.set('user', request.currentUser);
                    alltodos.push(todoFolder)
                }
                //背包得到一件宝石
                function newitemdiamond(item_name, m_level) {

                    m_level > 40 ? 40 : m_level
                    m_level = Math.floor(m_level / 10) + 1
                    var dialevel = Math.floor(Math.random() * m_level + 1)
                    if (dialevel > 2) {
                        var diamond_rate = Math.random() * 100
                        if (diamond_rate < 95) {
                            dialevel -= 2
                        }
                    }
                    var diamondnum = 1
                    if (item_name != "拉玛兰迪礼物") {
                        item_name = dialevel + "级" + item_name
                        if (legendid == 1) {
                            var odds = Math.floor(Math.random() * 100);
                            if (odds < 50) {
                                diamondnum = 2;
                            }
                        }
                    }




                    var Account = AV.Object.extend(cloud_diamond);
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', item_name).first().then(function (account) {
                        account.increment('num', diamondnum);
                        return account.save();
                    })

                    diamonds += diamondnum

                }
            }
        }

        function startfight(humandata, monster_level) {

            var cqarray = humandata.cqarray;
            if (humandata.mohe[0][0] !== undefined) {
                cqarray.push(humandata.mohe[0][0])
                if (humandata.mohe[0][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[0][1].substring(7)) + 1000)
                }
            }
            if (humandata.mohe[1][0] !== undefined) {
                cqarray.push(humandata.mohe[1][0])
                if (humandata.mohe[1][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[1][1].substring(7)) + 1000)
                }
            }
            if (humandata.mohe[2][0] !== undefined) {
                cqarray.push(humandata.mohe[2][0])
                if (humandata.mohe[2][0] == 30) {
                    cqarray.push(parseInt(humandata.mohe[2][1].substring(7)) + 1000)
                }
            }

            var temphp = humandata.HP
            if ((cqarray.indexOf(32) > -1 || humandata.cqarray_jc.indexOf(32) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
                humandata.HP = temphp * 5
            }
            if ((cqarray.indexOf(31) > -1 || humandata.cqarray_jc.indexOf(31) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
                humandata.HP = temphp * 6
            }

            var monsterlist = [
                { "name": "地狱使者[精英]", "damage": 250, "hp": 200, "hj": 10, "speed": 0.9, "type": "精英" },
                { "name": "地魔[精英]", "damage": 180, "hp": 300, "hj": 10, "speed": 1.0, "type": "精英" },
                { "name": "屠夫[精英]", "damage": 250, "hp": 400, "hj": 20, "speed": 1.1, "type": "精英" },
                { "name": "地魔[BOSS]", "damage": 400, "hp": 500, "hj": 50, "speed": 1.4, "type": "BOSS" }
            ]
            var skillslist = [
                { "name": "冰霜新星", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "聚能轰击", "needmp": 25, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "雷电脉冲", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "剧毒之环", "needmp": 30, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

                { "name": "冰霜之箭", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "狂暴之箭", "needmp": 20, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "雷神之箭", "needmp": 25, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "萃毒之箭", "needmp": 20, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

                { "name": "冰风斩", "needmp": 25, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
                { "name": "山崩地裂", "needmp": 25, "cd": 10, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
                { "name": "顺劈斩", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
                { "name": "巫毒狂暴", "needmp": 40, "cd": 15, "level1": 5, "level2": 8, "level3": 15, "level4": 20, "level5": 28, "level6": 36, "level7": 45, "level8": 60, "level9": 80 },
            ]

            var p_skill1 = humandata.skill1_level;
            var p_skill2 = humandata.skill2_level;
            var p_skill3 = humandata.skill3_level;
            var p_skill4 = humandata.skill4_level;
            if (humandata.job == 1) {
                var mydias = humandata.diaarray[0] + humandata.diaarray_jc[0]
                var skill1 = skillslist[11];
                var skill2 = skillslist[9];
                var skill3 = skillslist[8];
                var skill4 = skillslist[10];
            }
            if (humandata.job == 2) {
                var mydias = humandata.diaarray[2] + humandata.diaarray_jc[2]
                var skill1 = skillslist[7];
                var skill2 = skillslist[5];
                var skill3 = skillslist[4];
                var skill4 = skillslist[6];
            }
            if (humandata.job == 3) {
                var mydias = humandata.diaarray[1] + humandata.diaarray_jc[1]
                var skill1 = skillslist[3];
                var skill2 = skillslist[1];
                var skill3 = skillslist[0];
                var skill4 = skillslist[2];
            }
            var x = 'skill1.level' + p_skill1;
            var p_skill1_name = skill1.name;
            var p_skill1_damage = eval(x);
            var p_skill1_cd = skill1.cd;
            var p_skill1_needmp = skill1.needmp;
            x = 'skill2.level' + p_skill2;
            var p_skill2_name = skill2.name;
            var p_skill2_damage = eval(x);
            var p_skill2_cd = skill2.cd;
            var p_skill2_needmp = skill2.needmp;
            x = 'skill3.level' + p_skill3;
            var p_skill3_name = skill3.name;
            var p_skill3_damage = eval(x);
            var p_skill3_cd = skill3.cd;
            var p_skill3_needmp = skill3.needmp;
            x = 'skill4.level' + p_skill4;
            var p_skill4_name = skill4.name;
            var p_skill4_damage = eval(x);
            var p_skill4_cd = skill4.cd;
            var p_skill4_needmp = skill4.needmp;


            var ice_odds = 10//冰冻机率
            var ray_odds = 5 //瘫痪机率


            //怪物属性
            var ranx = Math.random() * 0.5 + 0.7

            var monster = monsterlist[Math.floor(Math.random() * monsterlist.length)];

            var m_name = monster.name;
            var m_damage = Math.floor(((Math.sqrt(monster.damage) * 1.2) * Math.floor(Math.sqrt(monster_level)) * 5 * monster_level) * ranx) * (monster_level < 6 ? 0.3 : 1) * (monster_level > 19 ? 1.2 : 1) * (monster_level > 29 ? 1.2 : 1) * (monster_level > 39 ? 1.5 : 1) * (monster_level > 49 ? 1.5 : 1) * (monster_level > 54 ? 1.2 : 1) * (monster_level > 59 ? 1.2 : 1) * (monster_level > 64 ? 1.2 : 1) * (monster_level > 69 ? 1.2 : 1) * (monster_level > 79 ? 1.2 : 1) * (monster_level > 89 ? 1.5 : 1) * (monster_level > 99 ? 2 : 1) * (monster_level > 109 ? 2 : 1) * (monster_level > 129 ? 2 : 1);
            var m_hp = Math.floor((monster.hp + (Math.sqrt(monster.hp) * 15 + 1) * Math.sqrt(monster_level) * (monster_level > 9 ? 40 : 20) * (monster_level < 6 ? 0.3 : 0.6) * monster_level * (monster_level > 29 ? 2 : 1) * (monster_level > 34 ? 2 : 1) * (monster_level > 39 ? 2 : 1) * (monster_level > 44 ? 2 : 1) * (monster_level > 49 ? 2 : 1)) * (monster_level > 54 ? 1.5 : 1) * (monster_level > 59 ? 1.5 : 1) * (monster_level > 64 ? 1.5 : 1) * (monster_level > 69 ? 1.5 : 1) * (monster_level > 79 ? 1.5 : 1) * (monster_level > 89 ? 2 : 1) * (monster_level > 99 ? 2 : 1) * (monster_level > 109 ? 2 : 1) * (monster_level > 129 ? 2 : 1) * ranx);

            var m_hj = monster_level < 6 ? m_hj = 0 : Math.floor((monster.hj + (Math.sqrt(monster.hj) * 1 + 1) * Math.sqrt(monster_level) * 3.5 * monster_level) * ranx);
            var m_speed = monster.speed;
            var m_type = monster.type;

            //人物属性
            var huodong = 1 * wordexp; // 活动
            var jctemp = 0.2;  //追随者加成
            var jctemp_exp = 1 * (1 + exp_df) * huodong;
            var nowtime = new Date()
            nowtime = nowtime.getTime()
            if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
                humandata.fly == 0 ? jctemp = 0.2 : (humandata.fly == 1 ? jctemp = 0.7 : jctemp = 1)              //翅膀加成 挂机
                humandata.fly == 0 ? jctemp_exp = 1 * (1 + exp_df) * huodong : (humandata.fly == 1 ? jctemp_exp = 1.5 * (1 + exp_df) * huodong : jctemp_exp = 2 * (1 + exp_df) * huodong) //翅膀经验  
            }
            var p_hp = humandata.HP + (humandata.hp_jc * jctemp);   //人物HP
            var p_mp = humandata.MP;    //人物MP
            var p_secmp = humandata.secmp;    //人物MP
            var p_hj = humandata.HJ + (humandata.hj_jc * jctemp);    //人物护甲
            var p_resistance = humandata.resistance + (humandata.resistance_jc * jctemp); //人物元素抗性
            var p_attback = humandata.attback + (humandata.attback_jc * jctemp);  //  人物击回
            var p_cd = humandata.cd_p;      //人物CD减少
            var p_crit = humandata.crit;    //人物暴击机率
            var p_critdamage = 1 + (humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100;    //人物暴击伤害
            var p_speed = humandata.speed;
            var p_fire = humandata.fire + (humandata.fire_jc * jctemp);
            var p_ice = humandata.ice + (humandata.ice_jc * jctemp);
            var p_poison = humandata.poison + (humandata.poison_jc * jctemp);
            var p_ray = humandata.ray + (humandata.ray_jc * jctemp);
            var p_level = humandata.level;
            var p_job = humandata.job;

            var exp = humandata.exp;
            var exp_all = humandata.exp_all;
            var p_zhu = humandata.job == 1 ? humandata.LL : humandata.job == 2 ? humandata.MJ : humandata.ZL
            //武器伤害
            var p_damage = Math.floor(humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) + Math.floor(humandata.damage_jc * jctemp)



            var legend_1 = 0;
            offline_results[6] = 0;
            offline_results[13] = 0
            var legend_2 = false;
            var legend_3 = false;
            var legend_4 = false;
            var legend_6 = 1;
            var legend_7 = false;
            var legend_9 = false;
            var legend_10 = false;
            var legend_11 = false;
            var legend_13 = 1;
            var legend_14 = false;
            var legend_15 = false;
            var legend_20 = false;
            var legend_21 = false;
            var legend_22 = false;
            var legend_22_i = 1
            var legend_23 = false;
            var legend_23_3 = 3
            var legend_23_5 = 5
            var legend_24 = false;
            var legend_25 = false;
            var legend_28 = false;
            var legend_38 = false;
            var legend_38_ok = false;

            var legend100 = false;//套装
            var legend100_6 = false;
            var legend100_i = 0;
            var legend101 = false;
            var legend101_6 = false;
            var legend101_i = 0;
            var legend102 = false;
            var legend102_6 = false;
            var legend102_i = 0;
            var legend_exp = 1;

            if (cqarray.indexOf(99) > -1 || humandata.cqarray_jc.indexOf(99) > -1) {
                offline_results[13] = 1
            }

            if (cqarray.indexOf(1) > -1) {
                legend_1 = 1;
                offline_results[6] = 1
            }
            if ((cqarray.indexOf(2) > -1) && p_level >= monster_level) {
                legend_2 = true;//1%秒杀不高于自己的怪
            }
            if (cqarray.indexOf(3) > -1) {
                legend_3 = true;  //暴击回复10%MP
            }
            if (cqarray.indexOf(4) > -1) {
                legend_4 = true;  //当你的生命值低于30%时，伤害提高100%
            }
            if (cqarray.indexOf(5) > -1) {           //如果你的暴击机率大于等于60%，则你每次必定暴击
                if (p_crit > 59) {
                    p_crit = 100
                }
            }
            if (cqarray.indexOf(6) > -1) {  //你的追随者提供的伤害加成提高5%
                legend_6 = 1.05
            }
            if (cqarray.indexOf(7) > -1) {  //当受到致命伤害时，10%的机率回复50%的HP
                legend_7 = true;
            }
            if (cqarray.indexOf(8) > -1) {  //所有的技能MP消耗降低20
                p_skill1_needmp = Math.floor(skill1.needmp * 0.8);
                p_skill2_needmp = Math.floor(skill2.needmp * 0.8);
                p_skill3_needmp = Math.floor(skill3.needmp * 0.8);
                p_skill4_needmp = Math.floor(skill4.needmp * 0.8);
            }
            if (cqarray.indexOf(9) > -1) {  //当你的生命值低于20%时，必定暴击
                legend_9 = true;
            }
            if (cqarray.indexOf(10) > -1) {  //MP的值低于10%时，所受到的伤害减少50%
                legend_10 = true;
            }
            if (cqarray.indexOf(11) > -1) {  //攻击被控制的怪物时，必定暴击
                legend_11 = true;
            }
            if (cqarray.indexOf(12) > -1) {  //你的击回数值增加，增加的百分比为你的暴击机率
                p_attback = (humandata.attback + (humandata.attback_jc * jctemp)) * (1 + p_crit / 100)
            }
            if (cqarray.indexOf(13) > -1) {  //你对精英和BOSS的伤害增加100%
                if (monster.type != "普通") {
                    legend_13 = 2
                }
            }
            if (cqarray.indexOf(14) > -1) {//你免疫所有控制（冰冻、瘫痪）
                legend_14 = true;
            }
            if (cqarray.indexOf(15) > -1) {  //你的每次攻击和技能都会提高火技能伤害1%
                legend_15 = true;
            }

            if (cqarray.indexOf(18) > -1) {//如果你的面板伤害低于追随者，则你的暴击伤害提高100%
                if (p_damage * (1 + (p_crit / 100 * p_critdamage / 100)) < humandata.damage_jc) {
                    p_critdamage = 1 + ((humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100) + 1;

                }
            }

            if (cqarray.indexOf(19) > -1) {  //你的所有技能等级+2
                p_skill1 = humandata.skill1_level + 2;
                p_skill2 = humandata.skill2_level + 2;
                p_skill3 = humandata.skill3_level + 2;
                p_skill4 = humandata.skill4_level + 2;
                var xx = 'skill1.level' + p_skill1;
                p_skill1_damage = eval(xx);
                xx = 'skill2.level' + p_skill2;
                p_skill2_damage = eval(xx);
                xx = 'skill3.level' + p_skill3;
                p_skill3_damage = eval(xx);
                xx = 'skill4.level' + p_skill4;
                p_skill4_damage = eval(xx);
            }
            if (cqarray.indexOf(20) > -1) {//如果你的追随者也有此传奇属性，则他将为你分担一半伤害
                if (humandata.cqarray_jc.indexOf(20) > -1) {
                    legend_20 = true;
                }
            }
            if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
                if (p_speed < m_speed) {
                    legend_21 = true;
                }
            }

            if (cqarray.indexOf(23) > -1) {//华戒  少一件
                legend_23 = true;
                legend_23_3 = 2
                legend_23_5 = 4
            }
            if (humandata.cqarray_jc.indexOf(23) > -1) {
                legend_23 = true;
                legend_23_3 = 2
                legend_23_5 = 4
            }
            if (cqarray.indexOf(24) > -1) {//冰冻机率提高
                legend_24 = true;
                ice_odds = ice_odds + (humandata.ZL * 0.005)
            }
            if (cqarray.indexOf(25) > -1) {//冰冻技能优先
                legend_25 = true;
            }
            if (cqarray.indexOf(26) > -1 && mydias > 20) {
                p_cd += 30
            }
            if (cqarray.indexOf(27) > -1) {//护甲提高
                p_hj = humandata.HJ + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);    //人物护甲
            }
            if (cqarray.indexOf(28) > -1 || humandata.cqarray_jc.indexOf(28) > -1) {//普攻减CD1秒
                legend_28 = true;
            }
            if (cqarray.indexOf(30) > -1 || humandata.cqarray_jc.indexOf(30) > -1) {
                var newexpparr = cqarray
                newexpparr.push(...humandata.cqarray_jc)
                legend_exp = Math.max(...newexpparr)
                legend_exp = (legend_exp - 1000) / 100 + 1
                legend_exp > 1 ? legend_exp : 1
            }
            if (cqarray.indexOf(38) > -1 || humandata.cqarray_jc.indexOf(38) > -1) {
                legend_38 = true
            }
            if (cqarray.indexOf(100) > -1) {//套装

                legend100_i = getSameNum(100, cqarray)
                if (legend100_i > 1) {
                    if (cqarray.indexOf(27) > -1) {//护甲提高
                        p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);   //人物护甲
                    } else {
                        p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp);
                    }

                }
                if (legend100_i > legend_23_3) {
                    legend100 = true;
                }
                if (legend100_i > legend_23_5) {
                    legend100_6 = true;
                }
            }


            if (cqarray.indexOf(101) > -1) {//套装
                legend101_i = getSameNum(101, cqarray)
                if (legend101_i > 1) {
                    p_speed = humandata.speed * 1.2
                }
                if (legend101_i > legend_23_3) {
                    legend101 = true;
                }
                if (legend101_i > legend_23_5) {
                    legend101_6 = true;
                }
            }




            if (cqarray.indexOf(103) > -1) {//套装
                var legend103_i = getSameNum(103, cqarray)
                if (legend103_i > legend_23_5) {
                    p_ray = p_ray * 2.5;
                    p_fire = p_fire * 2.5;
                    p_ice = p_ice * 2.5;
                    p_poison = p_poison * 2.5;
                } else if (legend103_i > legend_23_3) {
                    p_ray = p_ray * 1.5;
                    p_fire = p_fire * 1.5;
                    p_ice = p_ice * 1.5;
                    p_poison = p_poison * 1.5;
                } else if (legend103_i > 1) {
                    p_ray = p_ray * 1.2;
                    p_fire = p_fire * 1.2;
                    p_ice = p_ice * 1.2;
                    p_poison = p_poison * 1.2;
                }
            }

            if (cqarray.indexOf(17) > -1) {  //所有技能元素属性变成你最高伤害比的那个元素属性
                var legend_17 = Math.max(p_ray, p_fire, p_ice, p_poison)
                p_ray = legend_17;
                p_fire = legend_17;
                p_ice = legend_17;
                p_poison = legend_17;
            }

            if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
                if (p_speed < m_speed) {
                    legend_22 = true;
                    legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
                }
            }
            if (cqarray.indexOf(16) > -1) {  //冰系技能冰冻机率提高，提高的百分比为你的冰系伤害
                ice_odds = 10 + Math.floor(p_ice / 10)
            }

            if (cqarray.indexOf(102) > -1) {//套装
                legend102_i = getSameNum(102, cqarray)
                if (legend102_i > 1) {
                    if (cqarray.indexOf(16) > -1) {
                        ice_odds = 20 + Math.floor(p_ice / 10)
                    } else {
                        ice_odds = 20
                    }

                }
                if (legend102_i > legend_23_3) {
                    legend102 = true;
                }
                if (legend102_i > legend_23_5 && monster_level > p_level) {
                    legend102_6 = true;
                } else {
                    legend102_6 = false;
                    if ((cqarray.indexOf(33) > -1 || humandata.cqarray_jc.indexOf(33) > -1) && p_job == 3) {
                        legend102_6 = true;
                    }
                }
            }


            function getSameNum(val, arr) {
                processArr = arr.filter(function (value) {
                    return value == val;
                })
                return processArr.length;
            }

            //技能配置

            //初始化状态数据
            if (legend_25 == true) {  //控制技能优先
                var temp_skill = 3
            } else {
                var temp_skill = 1
            }
            var m_state = "正常";
            var m_attstate = []  //怪攻击技能
            var h_yichang = []//人物异常状态 
            var m_state2 = "正常"; //中毒状态
            var p_state = "正常";
            var p_detail = '正常'
            var poison_time = 0;//中毒时间

            var cd1 = 0;
            var cd2 = 0;
            var cd3 = 0;
            var cd4 = 0;
            var m_times = 0;
            var m_skills = ["山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "冰霜新星", "雷电脉冲"]
            var Fight_p = setInterval(fight_p, 10 / p_speed);  //角色开始
            var Fight_m = setInterval(fight_m, 10 / m_speed);  //怪物开始
            var Fight_sec = setInterval(fight_sec, 10);  //每秒计时
            var fight_times = 0
            function stopInterval() {
                clearInterval(Fight_p);
                clearInterval(Fight_m);
                clearInterval(Fight_sec);
            }

            //每秒计时
            function fight_sec() {
                cd1 -= 1
                cd2 -= 1
                cd3 -= 1
                cd4 -= 1
                cd1 = cd1 <= 0 ? 0 : cd1
                cd2 = cd2 <= 0 ? 0 : cd2
                cd3 = cd3 <= 0 ? 0 : cd3
                cd4 = cd4 <= 0 ? 0 : cd4
                p_mp += p_secmp;
                fight_times += 10
                h_times += 10
                if (h_times > 1700) {
                    off_keys += 1;
                    h_times = 0
                    m_values = 0
                }
                if (m_values > 170) {
                    off_keys += 1;
                    h_times = 0
                    m_values = 0
                }
                if (fight_times > 2000) {
                    stopInterval()
                    returnresults_pdead()
                }
            }

            //人
            function fight_p() {
                m_times += 1
                p_detail = "正常"
                if (p_hp <= 0 && legend_7 == true) {  //10%机率回复50%血
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < 20) {
                        p_hp += (humandata.HP + (humandata.hp_jc * jctemp)) / 2
                        p_detail = "复活"
                    }
                }

                if (p_hp <= 0) {
                    stopInterval()
                    // p_stateArray.push("死亡")
                    returnresults_pdead()
                } else {

                    if (legend_2 == true) {  //传奇-1%机率秒杀怪

                        var odds = Math.floor(Math.random() * 120);
                        if (odds < 1) {
                            m_hp = 0;
                        }
                    }
                    if (legend_4 == true && p_hp < humandata.HP * 0.3) {
                        p_damage = Math.floor(((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * 2) + (humandata.damage_jc * jctemp))
                    } else {
                        p_damage = Math.floor((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 + (humandata.damage_jc * jctemp))
                    }

                    var temp_p_critdamage = 1;
                    var temp_p_poison = 1;

                    if (legend_25 == true) {  //控制技能优先

                        if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                            playskill3();
                            cd3 = p_skill3_cd * (1 - (p_cd / 100));
                            temp_skill = 4
                        } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                            playskill4();
                            cd4 = p_skill4_cd * (1 - (p_cd / 100));
                            temp_skill = 1
                        } else if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                            playskill1();
                            cd1 = p_skill1_cd * (1 - (p_cd / 100));
                            temp_skill = 2
                        } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                            playskill2();
                            cd2 = p_skill2_cd * (1 - (p_cd / 100));
                            temp_skill = 3
                        } else {
                            if (legend_28 == true) {
                                cd1 -= 1
                                cd2 -= 1
                                cd3 -= 1
                                cd4 -= 1
                                cd1 = cd1 <= 0 ? 0 : cd1
                                cd2 = cd2 <= 0 ? 0 : cd2
                                cd3 = cd3 <= 0 ? 0 : cd3
                                cd4 = cd4 <= 0 ? 0 : cd4
                            }

                            play_pt(p_damage, "pt");

                        }
                    } else {
                        if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                            playskill1();
                            cd1 = p_skill1_cd * (1 - (p_cd / 100));
                            temp_skill = 2
                        } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                            playskill2();
                            cd2 = p_skill2_cd * (1 - (p_cd / 100));
                            temp_skill = 3
                        } else if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                            playskill3();
                            cd3 = p_skill3_cd * (1 - (p_cd / 100));
                            temp_skill = 4
                        } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                            playskill4();
                            cd4 = p_skill4_cd * (1 - (p_cd / 100));
                            temp_skill = 1
                        } else {
                            if (legend_28 == true) {
                                cd1 -= 1
                                cd2 -= 1
                                cd3 -= 1
                                cd4 -= 1
                                cd1 = cd1 <= 0 ? 0 : cd1
                                cd2 = cd2 <= 0 ? 0 : cd2
                                cd3 = cd3 <= 0 ? 0 : cd3
                                cd4 = cd4 <= 0 ? 0 : cd4
                            }

                            play_pt(p_damage, "pt");

                        }
                    }


                    //------------------------------技能攻击
                    function playskill1() {      //技能攻击 毒
                        //中毒机率
                        if (p_job == 1) {
                            p_state = "巫毒狂暴";
                            play_pt(p_damage * (1 + p_poison / 100), "jn")
                            p_mp -= p_skill1_needmp

                        } else {
                            m_state2 = "中毒"
                            play_pt(p_damage * (1 + p_poison / 100), "jn")
                            p_mp -= p_skill1_needmp

                        }
                    }

                    function playskill2() {      //技能攻击
                        play_pt(p_damage * (p_skill2_damage / 100 + 1) * (1 + p_fire / 100), "jn")
                        p_mp -= p_skill2_needmp
                    }

                    function playskill3() {      //技能攻击冰
                        //冰冻机率
                        var odds = Math.floor(Math.random() * 100);
                        if (legend_24 == true) {
                            play_pt(0, "jn")
                        } else {
                            play_pt(p_damage * (p_skill3_damage / 100 + 1) * (1 + p_ice / 100), "jn")
                        }
                        if (odds < ice_odds) {
                            if (legend_38 == true) {

                                legend_38_ok = true
                            }
                            m_state = "冰冻"
                            setTimeout(resetstateice, 30);
                        }

                        p_mp -= p_skill3_needmp
                    }

                    function playskill4() {      //技能攻击  电
                        //瘫痪机率
                        var odds = Math.floor(Math.random() * 100);
                        if (odds < ray_odds) {
                            m_state = "瘫痪"
                            setTimeout(resetstateray, 60);
                        }
                        if (legend_24 == true) {
                            play_pt(0, "jn")
                        } else {
                            play_pt(p_damage * (p_skill4_damage / 100 + 1) * (1 + p_ray / 100), "jn")
                        }
                        p_mp -= p_skill4_needmp
                    }

                }
                //------------------------------普通攻击
                function play_pt(p_damage, from) {     //普通攻击
                    if (legend_21 == true) {
                        p_damage = p_damage * 2
                    }
                    if (p_detail == "正常" || p_detail == "复活") {
                        if (legend_15 == true) {//你的每次攻击和技能都会提高火技能伤害1%
                            p_fire += 1;
                        }

                        //暴击机率
                        var odds = Math.floor(Math.random() * 100);
                        if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                            odds = 0;
                        }
                        if ((m_state == "冰冻" || m_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                            odds = 0;
                        }
                        if (m_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                            var legend102_ii = 1.5
                        } else if (m_state == "冰冻" && legend102_6 == true) {  //法师套装
                            var legend102_ii = 4
                        } else {
                            var legend102_ii = 1
                        }
                        if (odds < p_crit) {
                            temp_p_critdamage = p_critdamage;

                            if (legend_3 == true) {   //暴击回复10%MP
                                p_mp += humandata.MP / 10;
                            }
                        } else {
                            temp_p_critdamage = 1;
                        }
                        //检测毒伤
                        if (p_job != 1) {
                            if (poison_time < 30 && m_state2 == "中毒") {
                                poison_time += 10;
                                temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                                m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            } else {
                                m_state2 = "正常"
                                poison_time = 0;
                                temp_p_poison = 1;
                            }
                        }

                        //检测巫毒狂暴
                        if (p_job == 1) {
                            if (poison_time < 60 && p_state == "巫毒狂暴") {
                                poison_time += 10;
                                temp_p_poison = p_skill1_damage / 100 + 1  //temp_p_poison 巫毒狂暴伤害传递参数
                            } else {
                                m_state = "正常"
                                poison_time = 0;
                                temp_p_poison = 1;
                            }
                        }

                        m_hp -= ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0

                        var temp_addback = p_attback;
                        // if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp))) {
                        if (legend101_6 == true) {
                            temp_addback = p_attback + (humandata.MJ * 10)
                        }
                        if ((m_times % 6) == 0 && legend101 == true && legend101_6 != true) {
                            temp_addback = p_attback * temp_p_critdamage
                        }
                        if ((m_times % 6) == 0 && legend101 == true && legend101_6 == true) {
                            temp_addback = (p_attback * temp_p_critdamage) + (humandata.MJ * 10)
                        }
                        if (legend_38_ok == true) {
                            temp_addback += humandata.ZL * 500
                            legend_38_ok = false
                        }
                        // if (((humandata.HP + (humandata.hp_jc * jctemp)) - p_hp) <= temp_addback) {
                        //     temp_addback = (humandata.HP + (humandata.hp_jc * jctemp)) - p_hp
                        // }
                        // }
                        p_hp += temp_addback
                        p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    } else {

                        if (p_job != 1) {
                            if (poison_time < 30 && m_state2 == "中毒") {
                                poison_time += 10;
                                temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                                m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0

                            } else {
                                m_state2 = "正常"
                                poison_time = 0;
                                temp_p_poison = 1;
                            }
                        }
                        p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    }


                }
            }

            //怪
            function fight_m() {
                if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                    p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
                }

                if (m_hp <= 0) {
                    stopInterval()
                    // m_stateArray.push("死亡")
                    returnresults()
                }
                if (m_state == "正常") {

                    var dechp_temp = 0
                    var m_odds = Math.floor(Math.random() * 100);//技能随机数
                    var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                    var m_topodd2 = 50
                    var m_topodd = 0;
                    var m_skills_damage = 1
                    var odd_temp = (5 + (map_big_x - p_level)) > 30 ? 30 : (5 + (map_big_x - p_level))
                    m_type == "BOSS" ? m_topodd = (odd_temp + 5) : m_type == "精英" ? m_topodd = odd_temp : 0
                    if (legend_14 == true) {  //免疫冰冻 
                        m_topodd2 = 0
                    }
                    if (m_odds < m_topodd) {
                        var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                        if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                            p_detail = "冰冻"
                            setTimeout(m_resetstateice, 30);
                        } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                            p_detail = "瘫痪"
                            setTimeout(m_resetstateray, 30);
                        }
                        m_skills_damage = (m_type == "BOSS" ? 1.4 : 1.2)
                        dechp_temp = m_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                        } else {
                            dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                        }

                    } else {        //怪物普攻
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                            }
                        } else {
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                            }
                        }

                    }
                    p_hp -= dechp_temp

                    if (legend100 == true && legend100_6 != true) {
                        m_hp -= (p_hj * 20)
                    } else if (legend100 == true && legend100_6 == true) {
                        //反伤爆击
                        var odds_fs = Math.floor(Math.random() * 100);
                        if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                            odds_fs = 0;
                        }

                        if (odds_fs < p_crit) {
                            var temp_p_critdamage_fs = p_critdamage;
                        } else {
                            var temp_p_critdamage_fs = 1;
                        }
                        m_hp -= (p_hj * 20 * p_critdamage)
                    }



                }
            }

            //resetstate
            function resetstateice() {
                if (m_state != "瘫痪") {
                    m_state = "正常"
                }
            }
            function resetstateray() {
                if (m_state != "冰冻") {
                    m_state = "正常"
                }
            }

            function m_resetstateice() {
                if (p_detail != "瘫痪") {
                    p_detail = "正常"
                }
            }
            function m_resetstateray() {
                if (p_detail != "冰冻") {
                    p_detail = "正常"
                }
            }
            //回调结果 怪死亡
            function returnresults() {

                if (m_type == 'BOSS') {
                    m_values += 20
                }
                if (m_type == '精英') {
                    m_values += 16
                }
                if (m_type == '普通') {
                    m_values += 13
                }
                var exprate = 1;
                if ((map_big_x - humandata.level) > 0) {
                    exprate = (1 + ((map_big_x - humandata.level) / 10)) > 2 ? 2 : (1 + ((map_big_x - humandata.level) / 10))
                } else {
                    exprate = (1 + ((map_big_x - humandata.level) / 10)) < 0 ? 0 : (1 + ((map_big_x - humandata.level) / 10))
                }

                if (exprate <= 0){
                    exprate = 0.1
                }
                var fight_exp = Math.floor((monster_level * 1) * (monster_level + 20) * exprate * jctemp_exp * 5 * legend_exp)
                var fight_gold = Math.floor((monster_level * 20) * (monster_level + 120) * exprate * jctemp_exp * 5)
                offline_exp += fight_exp     //累计经验
                offline_gold += fight_gold    //累计金币
                offline_results[0] = offline_exp
                offline_results[1] = offline_gold
                offline_results[2] += 1
                if (offline_results[2] < 81) {
                    startfight(humandata, monster_level)
                }

            }
            //回调结果 人死亡
            function returnresults_pdead() {
                h_times += 90
                offline_exp += 0     //累计经验
                offline_gold += 0    //累计金币
                offline_results[0] = offline_exp
                offline_results[1] = offline_gold
                offline_results[2] += 1
                offline_results[3] += 1
                if (offline_results[2] < 81) {
                    startfight(humandata, monster_level)
                }
            }

        }

    }




})

AV.Cloud.define('fightyg', function (request, response) {
    if (request.currentUser === undefined) {
        return response.error("登陆失败");
    }
    if (!request.currentUser) {
        return response.error("登陆失败");
    } else {
        var cloud_human = request.params.db_human
        var cloud_bag = request.params.db_bag
        var cloud_diamond = request.params.db_diamond
        var cloud_follow = request.params.db_follow
        if (request.params.vision != undefined && request.params.vision == "3.1") {
            var query = new AV.Query(cloud_human);
            query.equalTo('user', request.currentUser);//request.currentUser
            query.find().then(function (results) {
                var data = results.map(results => results.toJSON()) //从网络拿到数据
                if (data.length > 0) {

                    if (request.params.logincheckid == data[0].logincheckid && data[0].band == false) {

                        var nowtime = new Date()
                        var nowtimetamp = nowtime.getTime()
                        var today_date = nowtime.getDate();//得到日期
                        var limit = data[0].limit;
                        if (limit[0] != today_date) {
                            limit = [today_date, 0, 0, 0, 0, 0]
                        }

                        if (data[0].diamond >= (request.params.map * request.params.map * request.params.db_rate * 1.75)) {
                            startfightyg_on(limit, data[0], "yg", request.params.map == 0 ? 1 : request.params.map, request.params.map == 0 ? 1 : request.params.map, request.meta.remoteAddress)
                        } else {
                            return response.error("白金币不足");
                        }


                    } else {
                        return response.error("重复登陆");
                    }

                } else {
                    return response.error("未得到数据");
                }
            }, function (error) {
                return response.error(error);
            });
        } else {
            return response.error("版本不符");
        }
    }
    function startfightyg_on(limit, humandata, type, monster_level, map, ip) {

        var cqarray = humandata.cqarray;
        if (humandata.mohe[0][0] !== undefined) {
            cqarray.push(humandata.mohe[0][0])
            if (humandata.mohe[0][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[0][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[1][0] !== undefined) {
            cqarray.push(humandata.mohe[1][0])
            if (humandata.mohe[1][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[1][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[2][0] !== undefined) {
            cqarray.push(humandata.mohe[2][0])
            if (humandata.mohe[2][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[2][1].substring(7)) + 1000)
            }
        }

        var temphp = humandata.HP
        if ((cqarray.indexOf(32) > -1 || humandata.cqarray_jc.indexOf(32) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 5
        }
        if ((cqarray.indexOf(31) > -1 || humandata.cqarray_jc.indexOf(31) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 6
        }

        var dianfarr = humandata.dianf;
        function getwuli(hj) {
            return (100 - ((Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]) > 80 ? 80 : (Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]))) / 100
        }


        humandata.HP = humandata.HP * (1 + dianfarr[0] / 100)
        humandata.resistance = humandata.resistance + dianfarr[2]
        humandata.attback = humandata.attback + dianfarr[3]

        humandata.critdamage = humandata.critdamage + dianfarr[4]
        humandata.ice = humandata.ice + dianfarr[5]
        humandata.fire = humandata.fire + dianfarr[6]
        humandata.ray = humandata.ray + dianfarr[7]
        humandata.poison = humandata.poison + dianfarr[8]
        var exp_df = dianfarr[9] / 100
        var rate_df = dianfarr[10] / 100

        var monsterlist = [
            { "name": "地狱使者[远古]", "damage": 250000, "hp": 10000000000, "hj": 10, "speed": 1.6, "type": "远古" },
            { "name": "地魔[远古]", "damage": 220000, "hp": 10000000000, "hj": 10, "speed": 1.1, "type": "远古" },
            { "name": "屠夫[远古]", "damage": 200000, "hp": 10000000000, "hj": 10, "speed": 0.8, "type": "远古" }
        ]

        var skillslist = [
            { "name": "冰霜新星", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "聚能轰击", "needmp": 25, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷电脉冲", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "剧毒之环", "needmp": 30, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰霜之箭", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "狂暴之箭", "needmp": 20, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷神之箭", "needmp": 25, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "萃毒之箭", "needmp": 20, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰风斩", "needmp": 25, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "山崩地裂", "needmp": 25, "cd": 10, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "顺劈斩", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "巫毒狂暴", "needmp": 40, "cd": 15, "level1": 5, "level2": 8, "level3": 15, "level4": 20, "level5": 28, "level6": 36, "level7": 45, "level8": 60, "level9": 80 },
        ]

        var p_skill1 = humandata.skill1_level;
        var p_skill2 = humandata.skill2_level;
        var p_skill3 = humandata.skill3_level;
        var p_skill4 = humandata.skill4_level;
        if (humandata.job == 1) {
            var mydias = humandata.diaarray[0] + humandata.diaarray_jc[0]
            var skill1 = skillslist[11];
            var skill2 = skillslist[9];
            var skill3 = skillslist[8];
            var skill4 = skillslist[10];
        }
        if (humandata.job == 2) {
            var mydias = humandata.diaarray[2] + humandata.diaarray_jc[2]
            var skill1 = skillslist[7];
            var skill2 = skillslist[5];
            var skill3 = skillslist[4];
            var skill4 = skillslist[6];
        }
        if (humandata.job == 3) {
            var mydias = humandata.diaarray[1] + humandata.diaarray_jc[1]
            var skill1 = skillslist[3];
            var skill2 = skillslist[1];
            var skill3 = skillslist[0];
            var skill4 = skillslist[2];
        }
        var x = 'skill1.level' + p_skill1;
        var p_skill1_name = skill1.name;
        var p_skill1_damage = eval(x);
        var p_skill1_cd = skill1.cd;
        var p_skill1_needmp = skill1.needmp;
        x = 'skill2.level' + p_skill2;
        var p_skill2_name = skill2.name;
        var p_skill2_damage = eval(x);
        var p_skill2_cd = skill2.cd;
        var p_skill2_needmp = skill2.needmp;
        x = 'skill3.level' + p_skill3;
        var p_skill3_name = skill3.name;
        var p_skill3_damage = eval(x);
        var p_skill3_cd = skill3.cd;
        var p_skill3_needmp = skill3.needmp;
        x = 'skill4.level' + p_skill4;
        var p_skill4_name = skill4.name;
        var p_skill4_damage = eval(x);
        var p_skill4_cd = skill4.cd;
        var p_skill4_needmp = skill4.needmp;


        var ice_odds = 10//冰冻机率
        var ray_odds = 5 //瘫痪机率

        //回调数据
        var p_hparray = []  //人物血量
        var p_stateArray = [];               //基于人物速度
        var p_addhpArray = [];               //基于人物速度
        var p_dechpArray = [[], [], []];//基于怪物速度
        var p_poisonArray = [];//基于怪物速度
        var p_mpArray = [];                   //基于人物速度
        var p_secmpArray = [];//每秒

        var m_stateArray = [[], [], []];//基于怪物速度
        var m_dechpArray = [[], [], []];              //基于人物速度
        var m_poisonArray = [[], [], []];             //基于人物速度
        var detailArray = [];   //所有其它相关数据
        var p_detailArray = [[], [], []];   //人物状态 复活
        var m_backhpArray = [[], [], []];  //反伤

        //怪物属性
        var ranx = Math.random() * 0.3 + 0.7
        var xxx = 1
        var m1_hjall = 2000000;
        var m2_hjall = 2000000;
        var m3_hjall = 2000000;
        var m1_hj = 30000000;
        var m2_hj = 30000000;
        var m3_hj = 30000000;
        if (monster_level == 2) {
            xxx = 2
            m1_hjall = 3000000;
            m2_hjall = 3000000;
            m3_hjall = 3000000;
            m1_hj = 50000000;
            m2_hj = 50000000;
            m3_hj = 50000000;
        }
        if (monster_level == 3) {
            xxx = 5
            m1_hjall = 5000000;
            m2_hjall = 5000000;
            m3_hjall = 5000000;
            m1_hj = 70000000;
            m2_hj = 70000000;
            m3_hj = 70000000;
        }
        if (monster_level == 4) {
            xxx = 10
            m1_hjall = 8000000;
            m2_hjall = 8000000;
            m3_hjall = 8000000;
            m1_hj = 100000000;
            m2_hj = 100000000;
            m3_hj = 100000000;
        }
        if (monster_level == 5) {
            xxx = 15
            m1_hjall = 13000000;
            m2_hjall = 13000000;
            m3_hjall = 13000000;
            m1_hj = 130000000;
            m2_hj = 130000000;
            m3_hj = 130000000;
        }
        var monster1 = monsterlist[Math.floor(Math.random() * monsterlist.length)];
        var monster2 = monsterlist[Math.floor(Math.random() * monsterlist.length)];
        var monster3 = monsterlist[Math.floor(Math.random() * monsterlist.length)];

        var m1_name = monster1.name;
        var m1_damage = Math.floor(monster1.damage * ranx) * xxx;
        var m1_hp = Math.floor(monster1.hp * ranx) * monster_level;
        var m1_speed = monster1.speed;
        var m1_type = monster1.type;

        var m2_name = monster2.name;
        var m2_damage = Math.floor(monster2.damage * ranx) * xxx;
        var m2_hp = Math.floor(monster2.hp * ranx) * monster_level;
        var m2_speed = monster2.speed;
        var m2_type = monster2.type;

        var m3_name = monster3.name;
        var m3_damage = Math.floor(monster3.damage * ranx) * xxx;
        var m3_hp = Math.floor(monster3.hp * ranx) * monster_level;
        var m3_speed = monster3.speed;
        var m3_type = monster3.type;

        //人物属性
        var huodong = 1; // 活动
        var jctemp = 0.2;  //追随者加成
        var jctemp_exp = 1 * (1 + exp_df) * huodong;
        var nowtime = new Date()
        nowtime = nowtime.getTime()
        var ygratetemp = 1
        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? jctemp = 0.2 : (humandata.fly == 1 ? jctemp = 0.7 : jctemp = 1)              //翅膀加成 正常
            humandata.fly == 0 ? jctemp_exp = 1 * (1 + exp_df) * huodong : (humandata.fly == 1 ? jctemp_exp = 1.5 * (1 + exp_df) * huodong : jctemp_exp = 2 * (1 + exp_df) * huodong)     //翅膀经验  正常
            humandata.fly == 0 ? ygratetemp = 1 : (humandata.fly == 1 ? ygratetemp = 0.9 : ygratetemp = 0.7)              //翅膀优惠
        }

        if ((cqarray.indexOf(34) > -1 || humandata.cqarray_jc.indexOf(34) > -1) && humandata.exphour > 5) {
            ygratetemp = ygratetemp * 0.5
        }
        if (humandata.diamond >= Math.floor(map * map * request.params.db_rate * 5 * ygratetemp)) {
            var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
            todo.set('ip', ip)
            todo.increment('diamond', -Math.floor(map * map * request.params.db_rate * 5 * ygratetemp))
            todo.save()
        } else {
            return response.error("白金币不足");
            return false;
        }


        var p_hp = humandata.HP + (humandata.hp_jc * jctemp);   //人物HP
        var p_mp = humandata.MP;    //人物MP
        var p_secmp = humandata.secmp;    //人物MP
        var p_hj = humandata.HJ + (humandata.hj_jc * jctemp);    //人物护甲
        var p_resistance = humandata.resistance + (humandata.resistance_jc * jctemp); //人物元素抗性
        var p_attback = humandata.attback + (humandata.attback_jc * jctemp);  //  人物击回
        var p_cd = humandata.cd_p;      //人物CD减少
        var p_crit = humandata.crit;    //人物暴击机率
        var p_crit_temp = p_crit;       //爆击率的TEMP
        var p_critdamage = 1 + (humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100;    //人物暴击伤害
        var p_speed = humandata.speed;
        var p_fire = humandata.fire + (humandata.fire_jc * jctemp);
        var p_ice = humandata.ice + (humandata.ice_jc * jctemp);
        var p_poison = humandata.poison + (humandata.poison_jc * jctemp);
        var p_ray = humandata.ray + (humandata.ray_jc * jctemp);
        var p_level = humandata.level;
        var p_job = humandata.job;

        var exp = humandata.exp;
        var exp_all = humandata.exp_all;
        var p_zhu = humandata.job == 1 ? humandata.LL : humandata.job == 2 ? humandata.MJ : humandata.ZL
        //武器伤害
        var p_damage = Math.floor(humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) + Math.floor(humandata.damage_jc * jctemp)





        var legend_1 = 0;
        var legend_2 = false;
        var legend_3 = false;
        var legend_4 = false;
        var legend_6 = 1;
        var legend_7 = false;
        var legend_9 = false;
        var legend_10 = false;
        var legend_11 = false;
        var legend_13 = 1;
        var legend_14 = false;
        var legend_15 = false;
        var legend_20 = false;
        var legend_21_1 = false;
        var legend_21_2 = false;
        var legend_21_3 = false;
        var legend_22 = false;
        var legend_23 = false;
        var legend_23_3 = 3
        var legend_23_5 = 5
        var legend_22_i = 1
        var legend_24 = false;
        var legend_25 = false;
        var legend_28 = false;
        var legend_35 = 1;
        var legend_38 = false;
        var legend_38_ok = false;

        var legend100 = false;//套装
        var legend100_6 = false;
        var legend100_i = 0;
        var legend101 = false;
        var legend101_6 = false;
        var legend101_i = 0;
        var legend102 = false;
        var legend102_6 = false;
        var legend102_i = 0;
        var legend_exp = 1
        // for (var i = 0; i < cqarray.length; i++) {
        //     legend(cqarray[i])
        // }

        if (cqarray.indexOf(1) > -1) {
            legend_1 = 1;
        }
        if ((cqarray.indexOf(2) > -1) && p_level >= monster_level) {
            legend_2 = true;//1%秒杀不高于自己的怪
        }
        if (cqarray.indexOf(3) > -1) {
            legend_3 = true;  //暴击回复10%MP
        }
        if (cqarray.indexOf(4) > -1) {
            legend_4 = true;  //当你的生命值低于30%时，伤害提高100%
        }
        if (cqarray.indexOf(5) > -1) {           //如果你的暴击机率大于等于60%，则你每次必定暴击
            if (p_crit > 59) {
                p_crit = 100
            }
        }
        if (cqarray.indexOf(6) > -1) {  //你的追随者提供的伤害加成提高5%
            legend_6 = 1.05
        }
        if (cqarray.indexOf(7) > -1) {  //当受到致命伤害时，10%的机率回复50%的HP
            legend_7 = true;
        }
        if (cqarray.indexOf(8) > -1) {  //所有的技能MP消耗降低20
            p_skill1_needmp = Math.floor(skill1.needmp * 0.8);
            p_skill2_needmp = Math.floor(skill2.needmp * 0.8);
            p_skill3_needmp = Math.floor(skill3.needmp * 0.8);
            p_skill4_needmp = Math.floor(skill4.needmp * 0.8);
        }
        if (cqarray.indexOf(9) > -1) {  //当你的生命值低于20%时，必定暴击
            legend_9 = true;
        }
        if (cqarray.indexOf(10) > -1) {  //MP的值低于10%时，所受到的伤害减少50%
            legend_10 = true;
        }
        if (cqarray.indexOf(11) > -1) {  //攻击被控制的怪物时，必定暴击
            legend_11 = true;
        }
        if (cqarray.indexOf(12) > -1) {  //你的击回数值增加，增加的百分比为你的暴击机率
            p_attback = (humandata.attback + (humandata.attback_jc * jctemp)) * (1 + p_crit / 100)
        }
        if (cqarray.indexOf(13) > -1) {  //你对精英和BOSS的伤害增加100%
            legend_13 = 2
        }
        if (cqarray.indexOf(14) > -1) {//你免疫所有控制（冰冻、瘫痪）
            legend_14 = true;
        }
        if (cqarray.indexOf(15) > -1) {  //你的每次攻击和技能都会提高火技能伤害1%
            legend_15 = true;
        }

        if (cqarray.indexOf(18) > -1) {//如果你的面板伤害低于追随者，则你的暴击伤害提高100%
            if (p_damage * (1 + (p_crit / 100 * p_critdamage / 100)) < humandata.damage_jc) {
                p_critdamage = 1 + ((humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100) + 1;

            }
        }

        if (cqarray.indexOf(19) > -1) {  //你的所有技能等级+2
            p_skill1 = humandata.skill1_level + 2;
            p_skill2 = humandata.skill2_level + 2;
            p_skill3 = humandata.skill3_level + 2;
            p_skill4 = humandata.skill4_level + 2;
            var xx = 'skill1.level' + p_skill1;
            p_skill1_damage = eval(xx);
            xx = 'skill2.level' + p_skill2;
            p_skill2_damage = eval(xx);
            xx = 'skill3.level' + p_skill3;
            p_skill3_damage = eval(xx);
            xx = 'skill4.level' + p_skill4;
            p_skill4_damage = eval(xx);
        }
        if (cqarray.indexOf(20) > -1) {//如果你的追随者也有此传奇属性，则他将为你分担一半伤害
            if (humandata.cqarray_jc.indexOf(20) > -1) {
                legend_20 = true;
            }
        }


        if (cqarray.indexOf(23) > -1) {//华戒  少一件
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (humandata.cqarray_jc.indexOf(23) > -1) {
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (cqarray.indexOf(24) > -1) {//冰冻机率提高
            legend_24 = true;
            ice_odds = ice_odds + (humandata.ZL * 0.005)
        }
        if (cqarray.indexOf(25) > -1) {//冰冻技能优先
            legend_25 = true;
        }
        if (cqarray.indexOf(26) > -1 && mydias > 20) {
            p_cd += 30
        }
        if (cqarray.indexOf(27) > -1) {//护甲提高
            p_hj = humandata.HJ + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);    //人物护甲
        }
        if (cqarray.indexOf(28) > -1 || humandata.cqarray_jc.indexOf(28) > -1) {//普攻减CD1秒
            legend_28 = true;
        }
        if (cqarray.indexOf(30) > -1 || humandata.cqarray_jc.indexOf(30) > -1) {
            var newexpparr = cqarray
            newexpparr.push(...humandata.cqarray_jc)
            legend_exp = Math.max(...newexpparr)
            legend_exp = (legend_exp - 1000) / 100 + 1
            legend_exp > 1 ? legend_exp : 1
        }

        if ((cqarray.indexOf(35) > -1 || humandata.cqarray_jc.indexOf(35) > -1) && humandata.exphour > 5) {
            legend_35 = 3
        }
        if ((cqarray.indexOf(36) > -1 || humandata.cqarray_jc.indexOf(36) > -1) && humandata.exphour > 5) {
            p_attback = p_attback * 2
        }
        if (cqarray.indexOf(38) > -1 || humandata.cqarray_jc.indexOf(38) > -1) {
            legend_38 = true
        }

        if (cqarray.indexOf(100) > -1) {//套装

            legend100_i = getSameNum(100, cqarray)
            if (legend100_i > 1) {
                if (cqarray.indexOf(27) > -1) {//护甲提高
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);   //人物护甲
                } else {
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp);
                }

            }
            if (legend100_i > legend_23_3) {
                legend100 = true;
            }
            if (legend100_i > legend_23_5) {
                legend100_6 = true;
            }
        }


        if ((cqarray.indexOf(37) > -1 || humandata.cqarray_jc.indexOf(37) > -1) && humandata.exphour > 5) {
            p_hj = p_hj * 1.5
        }

        if (cqarray.indexOf(101) > -1) {//套装
            legend101_i = getSameNum(101, cqarray)
            if (legend101_i > 1) {
                p_speed = humandata.speed * 1.2
            }
            if (legend101_i > legend_23_3) {
                legend101 = true;
            }
            if (legend101_i > legend_23_5) {
                legend101_6 = true;
            }
        }


        if (cqarray.indexOf(103) > -1) {//套装
            var legend103_i = getSameNum(103, cqarray)

            if (legend103_i > legend_23_5) {
                p_ray = p_ray * 2.5;
                p_fire = p_fire * 2.5;
                p_ice = p_ice * 2.5;
                p_poison = p_poison * 2.5;
            } else if (legend103_i > legend_23_3) {
                p_ray = p_ray * 1.5;
                p_fire = p_fire * 1.5;
                p_ice = p_ice * 1.5;
                p_poison = p_poison * 1.5;
            } else if (legend103_i > 1) {
                p_ray = p_ray * 1.2;
                p_fire = p_fire * 1.2;
                p_ice = p_ice * 1.2;
                p_poison = p_poison * 1.2;
            }
        }

        if (cqarray.indexOf(17) > -1) {  //所有技能元素属性变成你最高伤害比的那个元素属性
            var legend_17 = Math.max(p_ray, p_fire, p_ice, p_poison)
            p_ray = legend_17;
            p_fire = legend_17;
            p_ice = legend_17;
            p_poison = legend_17;
        }



        if (cqarray.indexOf(16) > -1) {  //冰系技能冰冻机率提高，提高的百分比为你的冰系伤害
            ice_odds = 10 + Math.floor(p_ice / 10)
        }

        if (cqarray.indexOf(102) > -1) {//套装
            legend102_i = getSameNum(102, cqarray)
            if (legend102_i > 1) {
                if (cqarray.indexOf(16) > -1) {
                    ice_odds = 20 + Math.floor(p_ice / 10)
                } else {
                    ice_odds = 20
                }

            }
            if (legend102_i > legend_23_3) {
                legend102 = true;
            }
            if (legend102_i > legend_23_5 && map > p_level) {
                legend102_6 = true;
            } else {
                legend102_6 = false;
                if ((cqarray.indexOf(33) > -1 || humandata.cqarray_jc.indexOf(33) > -1) && p_job == 3) {
                    legend102_6 = true;
                }
            }
        }

        function getSameNum(val, arr) {
            processArr = arr.filter(function (value) {
                return value == val;
            })
            return processArr.length;
        }
        //技能配置
        // var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
        // var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
        // var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
        // var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]
        //初始化状态数据
        detailArray.push(p_speed)
        detailArray.push([m1_speed, m2_speed, m3_speed])
        detailArray.push([m1_name, m2_name, m3_name])
        detailArray.push([m1_hp, m2_hp, m3_hp])
        detailArray.push(p_hp)
        detailArray.push(p_mp)
        if (legend_25 == true) {  //控制技能优先
            var temp_skill = 3
        } else {
            var temp_skill = 1
        }
        var m1_state = "正常";
        var m2_state = "正常";
        var m3_state = "正常";
        var m_attstate = [[], [], []]  //怪攻击技能
        var h_yichang = []//人物异常状态 
        var m1_state2 = "正常"; //中毒状态
        var m2_state2 = "正常"; //中毒状态
        var m3_state2 = "正常"; //中毒状态
        var p_state = "正常";
        var p_detail = '正常'
        var poison_time1 = 0;//中毒时间1
        var poison_time2 = 0;//中毒时间2
        var poison_time3 = 0;//中毒时间3
        var cd1 = 0;
        var cd2 = 0;
        var cd3 = 0;
        var cd4 = 0;
        var m_times = 0;
        var miaosha_times = 0;
        var m_skills = ["山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "冰霜新星", "雷电脉冲"]
        var fight_times = 0

        var Fight_p = setInterval(fight_p, 10 / p_speed);  //角色开始
        var Fight_m1 = setInterval(fight_m1, 10 / m1_speed);  //怪物开始
        var Fight_m2 = setInterval(fight_m2, 10 / m2_speed);  //怪物开始
        var Fight_m3 = setInterval(fight_m3, 10 / m3_speed);  //怪物开始
        var Fight_sec = setInterval(fight_sec, 10);  //每秒计时

        function stopInterval() {
            clearInterval(Fight_p);
            clearInterval(Fight_m1);
            clearInterval(Fight_m2);
            clearInterval(Fight_m3);
            clearInterval(Fight_sec);
        }

        //每秒计时
        function fight_sec() {
            cd1 -= 1
            cd2 -= 1
            cd3 -= 1
            cd4 -= 1
            cd1 = cd1 <= 0 ? 0 : cd1
            cd2 = cd2 <= 0 ? 0 : cd2
            cd3 = cd3 <= 0 ? 0 : cd3
            cd4 = cd4 <= 0 ? 0 : cd4
            p_mp += p_secmp;
            p_secmpArray.push(p_secmp)
            fight_times += 10

            if (fight_times > 4000) {
                p_stateArray.push("逃跑")
                returnresults()
                stopInterval()
            }
        }

        // //人
        // function fight_p() {
        //     var rantemp1 = [];
        //     if (m1_hp > 0) {
        //         rantemp1.push(1)
        //     }
        //     if (m2_hp > 0) {
        //         rantemp1.push(2)
        //     }
        //     if (m3_hp > 0) {
        //         rantemp1.push(3)
        //     }
        //     var attmonodd = Math.floor(Math.random() * rantemp1.length)
        //     if (rantemp1[attmonodd] == 1) {
        //         fight_p1()
        //     }
        //     if (rantemp1[attmonodd] == 2) {
        //         fight_p2()
        //     }
        //     if (rantemp1[attmonodd] == 3) {
        //         fight_p3()
        //     }
        // }


        function fight_who() {
            var rantemp1 = [];
            if (m1_hp > 0) {
                rantemp1.push(1)
            }
            if (m2_hp > 0) {
                rantemp1.push(2)
            }
            if (m3_hp > 0) {
                rantemp1.push(3)
            }
            var attmonodd = Math.floor(Math.random() * rantemp1.length)
            if (rantemp1[attmonodd] == 1) {
                if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
                    if (p_speed < m1_speed) {
                        legend_21_1 = true;
                    }
                }
                return 1
            }
            if (rantemp1[attmonodd] == 2) {
                if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
                    if (p_speed < m2_speed) {
                        legend_21_2 = true;
                    }
                }
                return 2
            }
            if (rantemp1[attmonodd] == 3) {
                if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
                    if (p_speed < m3_speed) {
                        legend_21_3 = true;
                    }
                }
                return 3
            }
        }
        //攻击怪物1
        function fight_p() {
            var attwho = fight_who();
            m_times += 1
            if (p_hp <= 0 && legend_7 == true) {  //10%机率回复50%血
                var odds = Math.floor(Math.random() * 100);
                if (odds < 20) {
                    p_hp += (humandata.HP + (humandata.hp_jc * jctemp)) / 2
                    p_detail = "复活"
                }
            }
            p_hparray.push(p_hp)
            if (p_hp <= 0) {
                p_stateArray.push("死亡")
                returnresults()
                stopInterval()
            } else {


                if (legend_4 == true && p_hp < humandata.HP * 0.3) {
                    p_damage = Math.floor(((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * 2 * legend_35) + (humandata.damage_jc * jctemp))
                } else {
                    p_damage = Math.floor((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * legend_35 + (humandata.damage_jc * jctemp))
                }

                var temp_p_critdamage = 1;
                var temp_p_poison = 1;

                if (legend_25 == true) {  //控制技能优先

                    if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }
                        play_pt(p_damage, "pt");
                    }
                } else {
                    if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                }



                //------------------------------技能攻击
                function playskill1() {      //技能攻击 毒
                    //中毒机率
                    if (p_job == 1) {
                        p_state = "巫毒狂暴";
                        play_pt(p_damage * (1 + p_poison / 100), p_skill1_name)
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    } else {
                        if (attwho == 1) {
                            m1_state2 = "中毒"
                        }
                        if (attwho == 2) {
                            m2_state2 = "中毒"
                        }
                        if (attwho == 3) {
                            m3_state2 = "中毒"
                        }

                        play_pt(p_damage * (1 + p_poison / 100), p_skill1_name)
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    }
                }

                function playskill2() {      //技能攻击
                    play_pt(p_damage * (p_skill2_damage / 100 + 1) * (1 + p_fire / 100), p_skill2_name)
                    p_mp -= p_skill2_needmp
                    p_stateArray.push(p_skill2_name)
                }

                function playskill3() {      //技能攻击冰
                    //冰冻机率
                    var odds = Math.floor(Math.random() * 100);

                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill3_damage / 100 + 1) * (1 + p_ice / 100), p_skill3_name)
                    }
                    if (odds < ice_odds) {
                        if (legend_38 == true) {

                            legend_38_ok = true
                        }
                        m1_state = "冰冻"
                        if (p_job == 3) {  //法师群冰
                            m2_state = "冰冻"
                            m3_state = "冰冻"
                        }
                        setTimeout(resetstateice, 30);
                    }
                    p_mp -= p_skill3_needmp
                    p_stateArray.push(p_skill3_name)
                }

                function playskill4() {      //技能攻击  电
                    //瘫痪机率
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < ray_odds) {
                        m1_state = "瘫痪"
                        setTimeout(resetstateray, 60);
                    }
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill4_damage / 100 + 1) * (1 + p_ray / 100), p_skill4_name)
                    }

                    p_mp -= p_skill4_needmp
                    p_stateArray.push(p_skill4_name)
                }
            }

            //------------------------------普通攻击
            function play_pt(p_damage, from) {
                if (p_detail == "正常" || p_detail == "复活") {

                    if (legend_15 == true) {//你的每次攻击和技能都会提高火技能伤害1%
                        p_fire += 1;
                    }
                    //暴击机率
                    var odds = Math.floor(Math.random() * 100);
                    if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                        odds = 0;
                    }
                    if (attwho == 1) {
                        if (legend_21_1 == true) {
                            p_damage = p_damage * 2
                        }
                        if ((m1_state == "冰冻" || m1_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                            odds = 0;
                        }
                        if (m1_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                            var legend102_ii = 1.5
                        } else if (m1_state == "冰冻" && legend102_6 == true) {  //法师套装
                            var legend102_ii = 4
                        } else {
                            var legend102_ii = 1
                        }
                    }

                    if (attwho == 2) {
                        if (legend_21_2 == true) {
                            p_damage = p_damage * 2
                        }
                        if ((m2_state == "冰冻" || m2_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                            odds = 0;
                        }
                        if (m2_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                            var legend102_ii = 1.5
                        } else if (m2_state == "冰冻" && legend102_6 == true) {  //法师套装
                            var legend102_ii = 4
                        } else {
                            var legend102_ii = 1
                        }
                    }

                    if (attwho == 3) {
                        if (legend_21_3 == true) {
                            p_damage = p_damage * 2
                        }
                        if ((m3_state == "冰冻" || m3_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                            odds = 0;
                        }
                        if (m3_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                            var legend102_ii = 1.5
                        } else if (m3_state == "冰冻" && legend102_6 == true) {  //法师套装
                            var legend102_ii = 4
                        } else {
                            var legend102_ii = 1
                        }
                    }

                    if (odds < p_crit) {
                        temp_p_critdamage = p_critdamage;
                        if (from == "pt") {
                            p_stateArray.push("暴击")
                        }
                        if (legend_3 == true) {   //暴击回复10%MP
                            p_mp += humandata.MP / 10;
                        }
                    } else {
                        temp_p_critdamage = 1;
                        if (from == "pt") {
                            p_stateArray.push("普攻")
                        }
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time1 < 30 && m1_state2 == "中毒") {
                            poison_time1 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m1_hp -= p_damage * temp_p_poison - m1_hj > 0 ? p_damage * temp_p_poison - m1_hj : 0
                            m_poisonArray[0].push(p_damage * temp_p_poison - m1_hj > 0 ? p_damage * temp_p_poison - m1_hj : 0)
                        } else {
                            m1_state2 = "正常"
                            poison_time1 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[0].push(0)
                        }

                        if (poison_time2 < 30 && m2_state2 == "中毒") {
                            poison_time2 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m2_hp -= p_damage * temp_p_poison - m2_hj > 0 ? p_damage * temp_p_poison - m2_hj : 0
                            m_poisonArray[1].push(p_damage * temp_p_poison - m2_hj > 0 ? p_damage * temp_p_poison - m2_hj : 0)
                        } else {
                            m2_state2 = "正常"
                            poison_time2 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[1].push(0)
                        }

                        if (poison_time3 < 30 && m3_state2 == "中毒") {
                            poison_time3 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m3_hp -= p_damage * temp_p_poison - m3_hj > 0 ? p_damage * temp_p_poison - m3_hj : 0
                            m_poisonArray[2].push(p_damage * temp_p_poison - m3_hj > 0 ? p_damage * temp_p_poison - m3_hj : 0)
                        } else {
                            m3_state2 = "正常"
                            poison_time3 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[2].push(0)
                        }

                    }

                    //检测巫毒狂暴
                    if (p_job == 1) {
                        if (poison_time1 < 60 && p_state == "巫毒狂暴") {
                            poison_time1 += 10;
                            temp_p_poison = p_skill1_damage / 100 + 1  //temp_p_poison 巫毒狂暴伤害传递参数
                        } else {
                            m1_state = "正常"
                            poison_time1 = 0;
                            temp_p_poison = 1;
                        }
                    }

                    if (legend_2 == true && attwho == 1 && ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hjall) > 0 && miaosha_times < 2) {  //传奇-1%机率秒杀怪
                        var odds = Math.floor(Math.random() * 120);
                        if (odds < 1) {
                            m1_hp = 0;
                            miaosha_times += 1
                        }
                    }
                    if (legend_2 == true && attwho == 2 && ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hjall) > 0 && miaosha_times < 2) {  //传奇-1%机率秒杀怪
                        var odds = Math.floor(Math.random() * 120);
                        if (odds < 1) {
                            m2_hp = 0;
                            miaosha_times += 1
                        }
                    }
                    if (legend_2 == true && attwho == 3 && ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hjall) > 0 && miaosha_times < 2) {  //传奇-1%机率秒杀怪
                        var odds = Math.floor(Math.random() * 120);
                        if (odds < 1) {
                            m3_hp = 0;
                            miaosha_times += 1
                        }
                    }

                    if (from == "聚能轰击" || from == "冰霜新星" || from == "山崩地裂") {
                        var attm2_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hj) : 0
                        var attm3_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hj) : 0
                        var attm1_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hj) : 0
                        if (attm1_hp == 0) {
                            attm1_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hjall) > 0 ? 1 : 0
                        }
                        if (attm2_hp == 0) {
                            attm2_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hjall) > 0 ? 1 : 0
                        }
                        if (attm3_hp == 0) {
                            attm3_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hjall) > 0 ? 1 : 0
                        }
                        m2_hp -= attm2_hp
                        m3_hp -= attm3_hp
                        m1_hp -= attm1_hp
                        m_dechpArray[0].push(attm1_hp)
                        m_dechpArray[1].push(attm2_hp)
                        m_dechpArray[2].push(attm3_hp)
                    } else if (attwho == 1) {
                        var attm1_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hj) : 0
                        if (attm1_hp == 0) {
                            attm1_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m1_hjall) > 0 ? 1 : 0
                        }
                        m1_hp -= attm1_hp
                        m_dechpArray[0].push(attm1_hp)
                        m_dechpArray[1].push(0)
                        m_dechpArray[2].push(0)
                    } else if (attwho == 2) {
                        var attm2_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hj) : 0
                        if (attm2_hp == 0) {
                            attm2_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m2_hjall) > 0 ? 1 : 0
                        }
                        m2_hp -= attm2_hp
                        m_dechpArray[1].push(attm2_hp)
                        m_dechpArray[0].push(0)
                        m_dechpArray[2].push(0)
                    } else {
                        var attm3_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hj) : 0
                        if (attm3_hp == 0) {
                            attm3_hp = ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m3_hjall) > 0 ? 1 : 0
                        }
                        m3_hp -= attm3_hp
                        m_dechpArray[2].push(attm3_hp)
                        m_dechpArray[1].push(0)
                        m_dechpArray[0].push(0)
                    }

                    var temp_addback = p_attback;
                    // if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp))) {
                    if (legend101_6 == true) {
                        temp_addback = p_attback + (humandata.MJ * 10)
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 != true) {
                        temp_addback = p_attback * temp_p_critdamage
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 == true) {
                        temp_addback = (p_attback * temp_p_critdamage) + (humandata.MJ * 10)
                    }

                    if (legend_38_ok == true) {
                        temp_addback += humandata.ZL * 500
                        legend_38_ok = false
                    }
                    // if (((humandata.HP + (humandata.hp_jc * jctemp)) - p_hp) <= temp_addback) {
                    //     temp_addback = (humandata.HP + (humandata.hp_jc * jctemp)) - p_hp
                    // }
                    // }
                    p_hp += temp_addback
                    if (p_detail == "复活") {
                        p_detail = "正常"
                        p_addhpArray.push(temp_addback + ((humandata.HP + (humandata.hp_jc * jctemp)) / 2))
                    } else {
                        p_addhpArray.push(temp_addback)
                    }

                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    h_yichang.push(p_detail)
                } else {
                    if (from == "pt") {
                        p_stateArray.push("普攻")
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time1 < 30 && m1_state2 == "中毒") {
                            poison_time1 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m1_hp -= p_damage * temp_p_poison - m1_hj > 0 ? p_damage * temp_p_poison - m1_hj : 0
                            m_poisonArray[0].push(p_damage * temp_p_poison - m1_hj > 0 ? p_damage * temp_p_poison - m1_hj : 0)
                        } else {
                            m1_state2 = "正常"
                            poison_time1 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[0].push(0)
                        }

                        if (poison_time2 < 30 && m2_state2 == "中毒") {
                            poison_time2 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m2_hp -= p_damage * temp_p_poison - m2_hj > 0 ? p_damage * temp_p_poison - m2_hj : 0
                            m_poisonArray[1].push(p_damage * temp_p_poison - m2_hj > 0 ? p_damage * temp_p_poison - m2_hj : 0)
                        } else {
                            m2_state2 = "正常"
                            poison_time2 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[1].push(0)
                        }

                        if (poison_time3 < 30 && m3_state2 == "中毒") {
                            poison_time3 += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m3_hp -= p_damage * temp_p_poison - m3_hj > 0 ? p_damage * temp_p_poison - m3_hj : 0
                            m_poisonArray[2].push(p_damage * temp_p_poison - m3_hj > 0 ? p_damage * temp_p_poison - m3_hj : 0)
                        } else {
                            m3_state2 = "正常"
                            poison_time3 = 0;
                            temp_p_poison = 1;
                            m_poisonArray[2].push(0)
                        }

                    }
                    p_addhpArray.push(0)
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    m_dechpArray[0].push(0)
                    m_dechpArray[1].push(0)
                    m_dechpArray[2].push(0)
                    h_yichang.push(p_detail)
                }
            }
        }

        //怪
        function fight_m1() {
            if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
                if (p_speed < m1_speed) {
                    legend_22 = true;
                    legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
                } else {
                    legend_22 = false;
                }
            } else {
                legend_22 = false;
            }

            if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
            }
            // if (m1_hp <= 0) {
            //     m_stateArray[0].push("死亡")
            // }
            // if (m2_hp <= 0) {
            //     m_stateArray[1].push("死亡")
            // }
            // if (m3_hp <= 0) {
            //     m_stateArray[2].push("死亡")
            // }
            if (m1_hp <= 0 && m2_hp <= 0 && m3_hp <= 0) {
                m_stateArray[0].push("死亡")
                m_stateArray[1].push("死亡")
                m_stateArray[2].push("死亡")
                getitems()
                stopInterval()
            }
            else {
                if (m1_hp > 0) {
                    if (m1_state == "正常") {

                        var dechp_temp = 0
                        var m_odds = Math.floor(Math.random() * 100);//技能随机数
                        var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                        var m_topodd2 = 30
                        var m_topodd = 10 * map;
                        var m_skills_damage = 1.5
                        if (legend_14 == true) {  //免疫冰冻 
                            m_topodd2 = 0
                        }
                        if (m_odds < m_topodd) {
                            var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                            if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                                p_detail = "冰冻"
                                setTimeout(m_resetstateice, 30);
                            } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                                p_detail = "瘫痪"
                                setTimeout(m_resetstateray, 30);
                            }

                            dechp_temp = m1_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                            } else {
                                dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                            }
                            m_attstate[0].push(m_atttemp)  //随机一个技能
                        } else {        //怪物普攻
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                if (legend_22 == true) {
                                    dechp_temp = m1_damage * getwuli(p_hj) > 0 ? (((m1_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m1_damage * getwuli(p_hj) > 0 ? ((m1_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                                }
                            } else {
                                if (legend_22 == true) {
                                    dechp_temp = m1_damage * getwuli(p_hj) > 0 ? (((m1_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m1_damage * getwuli(p_hj) > 0 ? ((m1_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                                }
                            }
                            m_attstate[0].push("普攻")
                        }
                        p_hp -= dechp_temp


                        //反伤
                        if (legend100 == true && legend100_6 != true) {
                            m1_hp -= (p_hj * 20)
                            m_backhpArray[0].push(p_hj * 20)
                        } else if (legend100 == true && legend100_6 == true) {
                            //反伤爆击
                            var odds_fs = Math.floor(Math.random() * 100);
                            if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                                odds_fs = 0;
                            }

                            if (odds_fs < p_crit) {
                                var temp_p_critdamage_fs = p_critdamage;
                            } else {
                                var temp_p_critdamage_fs = 1;
                            }

                            m1_hp -= (p_hj * 20 * temp_p_critdamage_fs)
                            m_backhpArray[0].push(p_hj * 20 * temp_p_critdamage_fs)
                        } else {
                            m_backhpArray[0].push(0)
                        }
                        p_dechpArray[0].push(dechp_temp)
                        m_stateArray[0].push(m1_state)
                        p_detailArray[0].push(p_detail)
                    } else {
                        p_dechpArray[0].push(0)
                        m_stateArray[0].push(m1_state)
                        p_detailArray[0].push(p_detail)
                    }
                } else {
                    clearInterval(Fight_m1);
                }
            }

        }
        function fight_m2() {
            if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
                if (p_speed < m2_speed) {
                    legend_22 = true;
                    legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
                } else {
                    legend_22 = false;
                }
            } else {
                legend_22 = false;
            }

            if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
            }

            // if (m1_hp <= 0) {
            //     m_stateArray[0].push("死亡")
            // }
            // if (m2_hp <= 0) {
            //     m_stateArray[1].push("死亡")
            // }
            // if (m3_hp <= 0) {
            //     m_stateArray[2].push("死亡")
            // }

            if (m1_hp <= 0 && m2_hp <= 0 && m3_hp <= 0) {
                m_stateArray[0].push("死亡")
                m_stateArray[1].push("死亡")
                m_stateArray[2].push("死亡")
                getitems()
                stopInterval()
            }
            else {
                if (m2_hp > 0) {
                    if (m2_state == "正常") {

                        var dechp_temp = 0
                        var m_odds = Math.floor(Math.random() * 100);//技能随机数
                        var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                        var m_topodd2 = 30
                        var m_topodd = 10 * map;
                        var m_skills_damage = 1.5
                        if (legend_14 == true) {  //免疫冰冻 
                            m_topodd2 = 0
                        }
                        if (m_odds < m_topodd) {
                            var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                            if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                                p_detail = "冰冻"
                                setTimeout(m_resetstateice, 30);
                            } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                                p_detail = "瘫痪"
                                setTimeout(m_resetstateray, 30);
                            }

                            dechp_temp = m2_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                            } else {
                                dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                            }
                            m_attstate[1].push(m_atttemp)  //随机一个技能
                        } else {        //怪物普攻
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                if (legend_22 == true) {
                                    dechp_temp = m2_damage * getwuli(p_hj) > 0 ? (((m2_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m2_damage * getwuli(p_hj) > 0 ? ((m2_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                                }
                            } else {
                                if (legend_22 == true) {
                                    dechp_temp = m2_damage * getwuli(p_hj) > 0 ? (((m2_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m2_damage * getwuli(p_hj) > 0 ? ((m2_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                                }
                            }
                            m_attstate[1].push("普攻")
                        }
                        p_hp -= dechp_temp


                        //反伤
                        if (legend100 == true && legend100_6 != true) {
                            m2_hp -= (p_hj * 20)
                            m_backhpArray[1].push(p_hj * 20)
                        } else if (legend100 == true && legend100_6 == true) {
                            //反伤爆击
                            var odds_fs = Math.floor(Math.random() * 100);
                            if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                                odds_fs = 0;
                            }

                            if (odds_fs < p_crit) {
                                var temp_p_critdamage_fs = p_critdamage;
                            } else {
                                var temp_p_critdamage_fs = 1;
                            }

                            m2_hp -= (p_hj * 20 * temp_p_critdamage_fs)
                            m_backhpArray[1].push(p_hj * 20 * temp_p_critdamage_fs)
                        } else {
                            m_backhpArray[1].push(0)
                        }
                        p_dechpArray[1].push(dechp_temp)
                        m_stateArray[1].push(m2_state)
                        p_detailArray[1].push(p_detail)
                    } else {
                        p_dechpArray[1].push(0)
                        m_stateArray[1].push(m2_state)
                        p_detailArray[1].push(p_detail)
                    }
                } else {
                    clearInterval(Fight_m2);
                }
            }

        }
        function fight_m3() {
            if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
                if (p_speed < m3_speed) {
                    legend_22 = true;
                    legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
                } else {
                    legend_22 = false;
                }
            } else {
                legend_22 = false;
            }

            if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
            }

            // if (m1_hp <= 0) {
            //     m_stateArray[0].push("死亡")
            // }
            // if (m2_hp <= 0) {
            //     m_stateArray[1].push("死亡")
            // }
            // if (m3_hp <= 0) {
            //     m_stateArray[2].push("死亡")
            // }
            if (m1_hp <= 0 && m2_hp <= 0 && m3_hp <= 0) {
                m_stateArray[0].push("死亡")
                m_stateArray[1].push("死亡")
                m_stateArray[2].push("死亡")
                getitems()
                stopInterval()
            } else {
                if (m3_hp > 0) {
                    if (m3_state == "正常") {

                        var dechp_temp = 0
                        var m_odds = Math.floor(Math.random() * 100);//技能随机数
                        var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                        var m_topodd2 = 30
                        var m_topodd = 10 * map;
                        var m_skills_damage = 1.5
                        if (legend_14 == true) {  //免疫冰冻 
                            m_topodd2 = 0
                        }
                        if (m_odds < m_topodd) {
                            var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                            if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                                p_detail = "冰冻"
                                setTimeout(m_resetstateice, 30);
                            } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                                p_detail = "瘫痪"
                                setTimeout(m_resetstateray, 30);
                            }

                            dechp_temp = m3_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                            } else {
                                dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                            }
                            m_attstate[2].push(m_atttemp)  //随机一个技能
                        } else {        //怪物普攻
                            if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                                if (legend_22 == true) {
                                    dechp_temp = m3_damage * getwuli(p_hj) > 0 ? (((m3_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m3_damage * getwuli(p_hj) > 0 ? ((m3_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                                }
                            } else {
                                if (legend_22 == true) {
                                    dechp_temp = m3_damage * getwuli(p_hj) > 0 ? (((m3_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                                } else {
                                    dechp_temp = m3_damage * getwuli(p_hj) > 0 ? ((m3_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                                }
                            }
                            m_attstate[2].push("普攻")
                        }
                        p_hp -= dechp_temp


                        //反伤
                        if (legend100 == true && legend100_6 != true) {
                            m3_hp -= (p_hj * 20)
                            m_backhpArray[2].push(p_hj * 20)
                        } else if (legend100 == true && legend100_6 == true) {
                            //反伤爆击
                            var odds_fs = Math.floor(Math.random() * 100);
                            if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                                odds_fs = 0;
                            }

                            if (odds_fs < p_crit) {
                                var temp_p_critdamage_fs = p_critdamage;
                            } else {
                                var temp_p_critdamage_fs = 1;
                            }

                            m3_hp -= (p_hj * 20 * temp_p_critdamage_fs)
                            m_backhpArray[2].push(p_hj * 20 * temp_p_critdamage_fs)
                        } else {
                            m_backhpArray[2].push(0)
                        }
                        p_dechpArray[2].push(dechp_temp)
                        m_stateArray[2].push(m3_state)
                        p_detailArray[2].push(p_detail)
                    } else {
                        p_dechpArray[2].push(0)
                        m_stateArray[2].push(m3_state)
                        p_detailArray[2].push(p_detail)
                    }
                } else {
                    clearInterval(Fight_m3);
                }
            }

        }
        //resetstate
        function resetstateice() {
            if (m1_state != "瘫痪") {
                m1_state = "正常"
            }
            if (m2_state != "瘫痪") {
                m2_state = "正常"
            }
            if (m3_state != "瘫痪") {
                m3_state = "正常"
            }
        }
        function resetstateray() {
            if (m1_state != "冰冻") {
                m1_state = "正常"
            }
            if (m2_state != "冰冻") {
                m2_state = "正常"
            }
            if (m3_state != "冰冻") {
                m3_state = "正常"
            }
        }

        function m_resetstateice() {
            if (p_detail != "瘫痪") {
                p_detail = "正常"
            }
        }
        function m_resetstateray() {
            if (p_detail != "冰冻") {
                p_detail = "正常"
            }
        }

        //回调结果
        function returnresults() {

            var lasttime = new Date()
            var lasttimetamp = lasttime.getTime()
            var fight_results = [];
            fight_results.push(p_stateArray)
            fight_results.push(p_addhpArray)
            fight_results.push(p_dechpArray)
            fight_results.push(p_poisonArray)
            fight_results.push(p_mpArray)
            fight_results.push(p_secmpArray)
            fight_results.push(m_stateArray)
            fight_results.push(m_dechpArray)
            fight_results.push(m_poisonArray)
            fight_results.push(detailArray)
            fight_results.push(["空", 0, 0, 0, 0, 0, 0])
            fight_results.push(p_detailArray)
            fight_results.push(m_backhpArray)
            fight_results.push(m_attstate)
            fight_results.push(h_yichang)
            fight_results.push(p_hparray)

            return response.success(fight_results);
        }

        var exprate = 1;
        if ((monster_level - humandata.level) > 0) {
            exprate = (1 + ((monster_level - humandata.level) / 10)) > 2 ? 2 : (1 + ((monster_level - humandata.level) / 10))
        } else {
            exprate = (1 + ((monster_level - humandata.level) / 10)) < 0 ? 0 : (1 + ((monster_level - humandata.level) / 10))
        }

        if (exprate <= 0){
            exprate = 0.1
        }

        function returnresults_v(item, now_exp, now_exp_all, now_level, level_t) {
            // console.log("发送回调")
            var fight_results = [];
            fight_results.push(p_stateArray)
            fight_results.push(p_addhpArray)
            fight_results.push(p_dechpArray)
            fight_results.push(p_poisonArray)
            fight_results.push(p_mpArray)
            fight_results.push(p_secmpArray)
            fight_results.push(m_stateArray)
            fight_results.push(m_dechpArray)
            fight_results.push(m_poisonArray)
            fight_results.push(detailArray)
            var getitem = [];
            getitem.push(item);
            getitem.push(Math.floor((map * 20) * (map + 120) * exprate * jctemp_exp * ((type == "big") ? 5 : 1))) //金币
            getitem.push(Math.floor((map * 1) * (map + 20) * exprate * jctemp_exp * ((type == "big") ? 5 : 1) * legend_exp))  //经验
            getitem.push(now_exp)  //现有经验
            getitem.push(now_exp_all)  //总经验 
            getitem.push(now_level)  //等级
            getitem.push(level_t)
            fight_results.push(getitem)
            fight_results.push(p_detailArray)
            fight_results.push(m_backhpArray)
            fight_results.push(m_attstate)
            fight_results.push(h_yichang)
            fight_results.push(p_hparray)
            if (fight_times < 3000) {
                setTimeout(function () {
                    // console.log("发送success短回调")
                    return response.success(fight_results);
                }, 2000);
            } else {
                // console.log("发送success回调")
                return response.success(fight_results);
            }

        }
        var ratetemp = 25 - map;   //27

        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? ratetemp = ratetemp : (humandata.fly == 1 ? ratetemp = (Math.floor(ratetemp * (1.5)) + 2) : ratetemp = (Math.floor(ratetemp * (2)) + 4))   //翅膀爆率  正常
        }

        ratetemp = ratetemp * (1 + rate_df)  //活动  爆率+ 10 


        var ratedata = [{ "diamond": ["钻石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "拉玛兰迪礼物"], "dropitem": ["重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "升灵胸甲", "禁卫胸甲", "统御者胸甲", "君王胸甲", "末日护甲", "战神胸甲", "巴洛尔护甲", "冥河背心", "征服者胸甲", "摄政王之铠", "升灵法袍", "禁卫法袍", "统御者法袍", "君王法袍", "末日神袍", "战神之袍", "巴洛尔神袍", "冥河神袍", "征服者之袍", "摄政王之袍", "升灵披风", "禁卫披风", "统御者披风", "君王披风", "末日披风", "战神披风", "巴洛尔披风", "冥河披风", "征服者披风", "摄政王披风", "重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "预言", "坏灭", "狂怒", "奧汀之子", "狂君", "日光守祭", "日阳", "焚灼", "霜心", "煞星", "幽冥法珠", "三连法球", "宇宙缩影", "寒冬疾风", "半神巫妖", "星轨石", "艾利之书", "聚能法珠", "核瞳", "恩典之光", "猎人的箭盒", "亡者遗产", "索罪矢", "黑骨箭", "弓匠的骄傲", "银星", "恶魔之箭", "圣尖矢", "万全箭筒", "神圣箭筒", "征服者军帽", "死神面罩", "统治之盔", "地狱恐面", "铁骑头甲", "守护头盔", "皇冠", "主教的头盔", "星际战盔", "升灵头冠", "君王头罩", "智慧面甲", "蕾蔻的意志", "大地之眼", "唤魔师法冠", "法尊", "贤者之巅", "大护法", "共鸣", "暮光", "诺曼之盔", "骑士射盔", "阿克汉的头盔", "乌莲娜的精神", "圣光之冠", "罗兰之面", "荒原头盔", "守护者的凝视", "灼天之面", "骄矜必败", "死卫护肩", "辟邪肩甲", "萨卡拉肩铠", "先祖的怒火", "征服者肩铠", "骷髅王肩铠", "星际肩铠", "壮丽肩饰", "战狂肩甲", "阿克汉的肩甲", "伏尔的劝诫", "七宗罪", "升灵护肩", "末日肩铠", "密棘肩甲", "叠铠肩甲", "蚀刻罩肩", "恶魔之羽", "大地之柱", "博恩的赦免", "大披肩", "魔牙披风", "炎魔肩铠", "御法者肩甲", "渎圣肩铠", "导能披肩", "御魔肩甲", "赋归肩垫", "染邪护肩", "傲慢肩甲", "血色之眼", "狂暴护符", "力量之泉", "地狱火符", "君王护符", "妄念", "黄金护颈", "阿兹卡兰之星", "鱼人坠匣", "国王护符", "猎魔护符", "敏捷之泉", "森林之符", "雕饰项链", "隆达尔的坠匣", "先人之佑", "时光流韵", "吸魂镜", "敏锐之眼", "守护之锁", "艾利护符", "圣灯", "月光护符", "魔法护符", "智力之泉", "元素使者", "兵要护符", "艾利奇之眼", "法能陷阱", "万花筒", "板甲护手", "君王前臂甲", "角斗士的手套", "阿契武的战书", "征服者护手", "塔斯克与西奥", "岩石护手", "宗师护指", "战狂护手", "阿克汉的护手", "升灵护手", "箭雨护手", "潘德之手", "骨织护手", "扼息护手", "荒原护手", "凶恶护手", "影弑", "蕾蔻的裹手", "武空的灵掌", "霜燃", "礼赞手套", "法师之拳", "御法者护手", "炎魔手套", "蚀刻手套", "魔牙护手", "乌莲娜的愤怒", "罗兰之握", "唤魔师的骄傲", "力士护腕", "奴隶镣铐", "守护者的格挡", "加百利的臂甲", "沃兹克臂甲", "卫士护腕", "赛斯切隆臂甲", "愤怒护腕", "阿克汉的镣铐", "稳击护腕", "恶魔之恨", "莫提克的手腕", "豹人猎杀者", "塔格奥腕环", "箭道护腕", "凯撒的回忆", "始祖的缠绕", "拉昆巴的腕饰", "恶魔之怨", "明彻裹腕", "杰拉姆的护腕", "先民护腕", "斯古拉的拯救", "德拉肯的训导", "朗斯洛的愚行", "蒙尘者绑腕", "灵魂守卫", "雷神之力", "天使发带", "京四郎之魂", "金织带", "贪婪腰带", "宝藏腰带", "不可信之链", "哈林顿的护腰", "张的腰封", "天堂束腰", "崩天恨雨", "失踪者的绑腰", "刀锋磨带", "暗影之链", "瑟伯的梦魇", "猎手之怒", "行侠腰带", "飞刀束带", "迅击腰带", "圣洁束带", "万象皆杀", "谢尔曼的缠腰", "缠腰耳串", "行巫时刻", "通冥腰带", "沃贾裹腰", "女魔护腰", "霍尔的祝福", "佐伊的秘密", "附魂腰带", "神秘腿甲", "沼地防水裤", "征服者腿铠", "斯科隆的欺诈", "舞蛇鳞甲", "影拥", "圣光之塔", "阿克汉的腿甲", "荒原腿甲", "恶魔之鳞", "骨织护腿甲", "死神赌注", "夸下痒", "基赫纳斯", "大地之重", "蕾蔻的马裤", "尹娜的戒律", "船长的推裤", "乌莲娜的忧虑", "拉基斯守护", "蚀刻长裤", "杨先生的妖裤", "汉默长裤", "御法者护腿甲", "恶疮马裤", "不死鸟之腹", "恶魔之甲", "凯恩的法裤", "凯恩的长袍", "唤魔师的新生", "荒原长靴", "船长的涉水靴", "不朽之王步履", "影踵", "阿克汉的钢靴", "小恶魔", "大地之基", "铁头防泥靴", "蔑视长靴", "撼地之靴", "凯恩的旅鞋", "掠夺者的便鞋", "蕾蔻的豪迈", "命运阔步靴", "娜塔亚的血足", "尹娜的风靴", "乌莲娜的天命", "粗糙至极靴", "粗野少年足", "安格的舞靴", "圣光之源", "贤者之途", "罗兰之步", "八魔之靴", "唤魔师的热忱", "虚幻长靴", "魔牙胫甲", "攀冰者", "里维拉的舞鞋", "尼芙尔的夸耀", "骷髅扣戒", "君王戒指", "地狱火戒指", "阿莱斯之环", "力量指环", "纳格尔之戒", "混沌之环", "机械指环", "克雷德之焰", "纳加的血戒", "空虚之戒", "永恒盟约", "被盗之戒", "命运守护", "弧光石", "加缪尔欺骗", "正义灯戒", "残影之戒", "罗盘玫瑰", "十二宫之戒", "悔恨大厅之戒", "黑曜石之戒", "凯索的婚戒", "神目指环", "罗嘉的巨石", "破碎誓言", "全能法戒", "空灵密语之戒", "乔丹之石", "祖尼玛萨之疾"], "israte": ratetemp, "rate": [0, 15, 35, 60, 100], "type": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 1], "otheritem": null }]    //0 15 35 60 100

        function getitems() {
            israte(ratedata, monster_level, legend_1, 0, 0, 0, 0)
        }

        //计算暴率

        var israte = function (data, yglevel, legendid, now_exp, now_exp_all, now_level, level_t) {
            // console.log("计算爆率给物品")
            var legend = {
                "1": "每当你掉落一个宝石时，50%机率会额外再掉落一个",
                "2": "1%的机率秒杀不高于自己等级的怪物（任意级别怪物）",
                "3": "暴击后回复10%的MP值",
                "4": "当你的生命值低于30%时，伤害提高100%",
                "5": "如果你的暴击机率大于等于60%，则你每次必定暴击",
                "6": "每次攻击附加你的追随者伤害的5%",
                "7": "当受到致命伤害时，20%的机率回复50%的HP",
                "8": "所有的技能MP消耗降低20%",
                "9": "当你的生命值低于20%时，必定暴击",
                "10": "MP的值低于20%时，所受到的伤害减少50%",
                "11": "攻击被控制的怪物时，必定暴击",
                "12": "你的击回数值增加，增加的百分比为你的暴击机率",
                "13": "你对精英和BOSS的伤害增加100%",
                "14": "你免疫所有控制（冰冻、瘫痪）",
                "15": "你的每次攻击和技能都会提高火技能伤害1%",
                "16": "冰系技能冰冻机率提高，提高的百分比为你的冰系伤害10%",
                "17": "所有技能元素属性变成你最高伤害比的那个元素属性",
                "18": "如果你的面板伤害低于追随者，则你的暴击伤害提高100%",
                "19": "你的所有技能等级+2",
                "20": "如果你的追随者也有此传奇属性，则他将为你分担一半伤害[追随者可生效]",
                "21": "如果你的攻速低于怪物的攻速，则伤害提高一倍",
                "22": "如果你的攻速低于怪，受到普通伤害降低，百分比为你最低的元素属性(80%上限)",
                "23": "你的套装加成效果所需的装备数量降低1件(最少为2件)[追随者可生效]",
                "24": "冰冻机率提高,数值为你智力的0.5%，但控制系技能伤害为0",
                "25": "你的控制技能优先使用",
                "26": "你和追随者身上的主属性[基于人物]宝石等级总和超过20，你的技能CD减少30%",
                "27": "护甲值提高，数值为你和追随者主属性[基于人物]宝石等级总和的平方乘以10倍",
                "28": "你的普通攻击每次减少所有技能CD1秒[追随者可生效]",
                "29": "你的武器伤害增加，增加数值为智力的5%",
                "30": "你的经验值增加",
                "31": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高5倍[追随者可生效]",
                "32": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高4倍[追随者可生效]",
                "33": "寒冰套装无视怪物等级[仅限法师生效][追随者可生效]",
                "34": "远古的召唤：人物穿戴6件传奇装备，远古门票半价[追随者可生效]",
                "35": "远古的愤怒：人物穿戴6件传奇装备，对远古怪物伤害提高200%[追随者可生效]",
                "36": "远古的汲取：人物穿戴6件传奇装备，对远古怪物击回提高100%[追随者可生效]",
                "37": "远古的坚硬：人物穿戴6件传奇装备，在远古地图护甲值提高50%[追随者可生效]",
                "38": "当你冰住怪的时候，你的血量回复，数值为智力的500倍[追随者可生效]",
                "99": "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"

            }
            var green = {
                "100": "血腥丘陵[反伤套装]",
                "101": "神罚之城[天罚套装]",
                "102": "冰冷之原[寒冰套装]",
                "103": "自然之力[元素套装]"
            }
            var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
            var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
            var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
            var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]
            var ratetype = getArrayItems(data[0].type, 1)//随机取个TYPE

            var qualityid = 0;
            var item_name = getArrayItems(data[0].dropitem, 1) //随机一件装备 
            var temprate = Math.floor(Math.random() * 100);
            if (temprate < data[0].rate[1]) {
                var temprateid = Math.floor(Math.random() * 100);
                if (temprateid < 5) {
                    var qualityid_temp = 4 //套装
                } else {
                    var qualityid_temp = 3 //传奇
                }
                qualityid = 3
                item_name = getArrayItems(data[0].dropitem, 1)//随机一件传奇装备 

            } else if (temprate < data[0].rate[2]) {
                qualityid = 2 //黄色
            } else if (temprate < data[0].rate[3]) {
                qualityid = 1 //蓝色
            } else {
                qualityid = 0 //白色	
            }



            var probability = data[0].israte || 0;

            if (probability < 2 && ratetype < 13) {
                probability == 2
            }
            var odds = Math.floor(Math.random() * 100);
            // if (probability === 1) {
            //     h_death(item_name[0], qualityid, ratetype[0], m_level);
            // };
            if (odds < probability && qualityid > 2) {
                h_death(item_name[0], qualityid, ratetype[0], 60, yglevel);
            } else {
                returnresults_v("空", now_exp, now_exp_all, now_level, level_t)
            }



            //随机取属性
            function getArrayItems(arr, num) {
                var temp_array = new Array();
                for (var index in arr) {
                    temp_array.push(arr[index]);
                }
                var return_array = new Array();
                for (var i = 0; i < num; i++) {
                    if (temp_array.length > 0) {
                        var arrIndex = Math.floor(Math.random() * temp_array.length);
                        return_array[i] = temp_array[arrIndex];
                        temp_array.splice(arrIndex, 1);
                    } else {
                        break;
                    }
                }
                return return_array;
            }

            //属性计算
            function counting(x, level, ranx) {

                return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
            }

            function getArraydetail(itemarr, arrs, m_level, yglevel, qualityid) {
                var temparr = [];
                temparr.push({});
                var ygnum = 1 + (yglevel / 3)
                if (qualityid == 3) {
                    var ranx = Math.random() * 0.2 + 1.3
                }
                if (qualityid == 2) {
                    var ranx = Math.random() * 0.3 + 1.2
                }
                if (qualityid == 1) {
                    var ranx = Math.random() * 0.3 + 1.1
                }
                if (qualityid == 0) {
                    var ranx = Math.random() * 0.3 + 1
                }

                for (i = 0; i < arrs.length; i++) {
                    switch (arrs[i]) {
                        case "ll":
                            temparr[0].ll = Math.floor(counting(itemarr.LL, m_level, ranx) * ygnum)

                            break;
                        case "mj":
                            temparr[0].mj = Math.floor(counting(itemarr.MJ, m_level, ranx) * ygnum)
                            break;
                        case "zl":
                            temparr[0].zl = Math.floor(counting(itemarr.ZL, m_level, ranx) * ygnum)
                            break;
                        case "tn":
                            temparr[0].tn = Math.floor(counting(itemarr.TN, m_level, ranx) * ygnum)
                            break;
                        case "hj":
                            temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2) * yglevel
                            break;
                        case "damage":
                            temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx * ygnum)
                            break;
                        case "speed":
                            temparr[0].speed = itemarr.speed
                            break;
                        case "damage_p":
                            temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                            break;
                        case "hp":
                            temparr[0].hp = Math.floor(counting(itemarr.hp, m_level, ranx) * yglevel * ygnum)
                            break;
                        case "hp_p":
                            temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "mp":
                            temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                            break;
                        case "mp_p":
                            temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "speed_p":
                            temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                            break;
                        case "attback":
                            temparr[0].attback = Math.floor(counting(itemarr.attback, m_level, ranx) * yglevel * ygnum)
                            break;
                        case "secmp":
                            temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                            break;
                        case "resistance":
                            temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                            break;
                        case "crit":
                            temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                            break;
                        case "critdamage":
                            var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                            if (itemarr.type == 5) {
                                temparr[0].critdamage = critdamage_temp * 2.5
                            } else {
                                temparr[0].critdamage = critdamage_temp
                            }
                            break;
                        case "ice":
                            temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "fire":
                            temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "ray":
                            temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "poison":
                            temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                            break;
                        case "lesslevel":
                            temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                            break;
                    }
                }
                temparr[0].level = yglevel
                return temparr;
            }




            function h_death(item_name, qualityid, ratetype, m_level, yglevel) {
                var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
                var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "hp", "hp_p", "mp", "mp_p"] //武器
                var arr2 = ["hp", "hp_p", "mp", "mp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品

                var item = global.item_results.find(person => person.name === item_name);

                if (item.type == 1) {
                    var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                    arrs.push("speed", "damage")
                }
                if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
                    var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
                    arrs.push("hj")
                }
                if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
                    var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
                    // arrs.push("hj")
                }
                if (item.type == 2) {
                    var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                }
                if (item.job == 1) {
                    arrs.push("ll", "tn")
                }
                if (item.job == 2) {
                    arrs.push("mj", "tn")
                }
                if (item.job == 3) {
                    arrs.push("zl", "tn")
                }

                var temparr2 = getArraydetail(item, arrs, m_level, yglevel, qualityid)  //得到最终属性

                newitem(item, temparr2, qualityid, m_level);

            }

            //背包得到一件装备
            function newitem(item, temparr2, qualityid, level) {
                var cq_id = 0;
                var cq_id2 = -1
                var desc_text2 = ""
                var newname = "远古" + item.name
                var greenArray = []

                if (qualityid_temp == 3) {
                    cq_id = Math.floor(Math.random() * 38 + 1)

                                            
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        cq_id = Math.floor(Math.random() * 38 + 1)
                    }
                    
                    if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                        if (Math.random() * 100 > 10){
                            var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                            cq_id =  newlist[Math.floor(Math.random() * newlist.length)]
                        }
                    }


                    if (cq_id == 31) {
                        cq_id = 32
                    }
                    if (cq_id == 30) {
                        var desc_text = legend[cq_id]
                        desc_text = desc_text + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
                    } else {
                        var desc_text = legend[cq_id]
                    }

                    var getygtwo = Math.floor(Math.random() * 100 + 1)
                    if (getygtwo < 5) {
                        newname = newname + "★"
                        cq_id2 = Math.floor(Math.random() * 38 + 1)

                        if (cq_id2 == 14 || cq_id2 == 17 || cq_id2 == 21 || cq_id2 == 34 || cq_id2 == 35 || cq_id2 == 36 || cq_id2 == 37 || cq_id2 == 5 || cq_id2 == 20){
                            cq_id2 = Math.floor(Math.random() * 38 + 1)
                        }
                        
                        if (cq_id2 == 14 || cq_id2 == 17 || cq_id2 == 21 || cq_id2 == 34 || cq_id2 == 35 || cq_id2 == 36 || cq_id2 == 37 || cq_id2 == 5 || cq_id2 == 20){
                            cq_id2 = Math.floor(Math.random() * 38 + 1)
                        }
                        
                        if (cq_id2 == 14 || cq_id2 == 17 || cq_id2 == 21 || cq_id2 == 34 || cq_id2 == 35 || cq_id2 == 36 || cq_id2 == 37 || cq_id2 == 5 || cq_id2 == 20){
                            if (Math.random() * 100 > 10){
                                var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                                cq_id2 =  newlist[Math.floor(Math.random() * newlist.length)]
                            }
                        }

                        if (cq_id2 == 31) {
                            cq_id2 = 32
                        }
                        if (cq_id2 == 30) {
                            desc_text2 = legend[cq_id2]
                            desc_text2 = desc_text2 + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
                        } else {
                            desc_text2 = legend[cq_id2]
                        }
                    }


                    // cq_id99 = Math.floor(Math.random() * 1000)
                    // if (cq_id99 < 5) {
                    //     cq_id = 99
                    //     desc_text = "嫦娥的馈赠：当你离线得到一件传奇装备时，10%机率再获得一件传奇装备"
                    // }
                }


                if (qualityid_temp == 4) {
                    qualityid = 4
                    cq_id = Math.floor(Math.random() * 4 + 100)
                    if (cq_id == 100) {
                        greenArray = green100;
                        var desc_text = green[100]
                    }
                    if (cq_id == 101) {
                        greenArray = green101;
                        var desc_text = green[101]
                    }
                    if (cq_id == 102) {
                        greenArray = green102;
                        var desc_text = green[102]
                    }
                    if (cq_id == 103) {
                        greenArray = green103;
                        var desc_text = green[103]
                    }
                }


                var TodoFolder = AV.Object.extend(cloud_bag);
                var todoFolder = new TodoFolder();
                todoFolder.set('name', newname);
                var targetitem = AV.Object.createWithoutData('item', item.objectId);
                todoFolder.set('item', targetitem);
                todoFolder.set('cq_id', cq_id);
                todoFolder.set('cq_id2', cq_id2);
                if (cq_id == 99) {
                    todoFolder.set('trad_times', 3);
                }
                todoFolder.set('fumo', 0);
                todoFolder.set('trad_times', 0);
                todoFolder.set('desc', desc_text);
                todoFolder.set('desc2', desc_text2);
                todoFolder.set('type', item.type);
                todoFolder.set('state', "背包");
                todoFolder.set('itemarr', temparr2);
                todoFolder.set('qualityid', qualityid);
                todoFolder.set('green', greenArray);
                todoFolder.set('level', level);
                todoFolder.set('ident', qualityid > 2 ? false : true);
                todoFolder.set('price', Math.floor(item.price * (level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8)));
                todoFolder.set('user', request.currentUser);
                todoFolder.set('job', item.job);
                todoFolder.save().then(function (todo) {
                    returnresults_v(newname, 0, 0, 0, 0)
                }, function (error) {
                    return response.error(error);
                });
            }


        }

    }

})

AV.Cloud.define('fightgbl', function (request, response) {
    var kill_rate = 1;
    var db_rate = 1
    if (request.params.db_rate == 30) {
        db_rate = 30
    }
    if (request.currentUser === undefined) {
        return response.error("登陆失败");
    }
    if (!request.currentUser) {
        return response.error("登陆失败");
    } else {
        var cloud_human = request.params.db_human
        var cloud_bag = request.params.db_bag
        var cloud_diamond = request.params.db_diamond
        var cloud_follow = request.params.db_follow
        if (request.params.vision != undefined && request.params.vision == "3.1") {


            var nowtime = new Date()
            var nowtimetamp = (nowtime.getTime())
            var nowmonth = nowtime.getMonth() + 1
            var today_date = nowtime.getDate();//得到日期

            var query = new AV.Query('gbl_times');
            query.equalTo('ip', request.meta.remoteAddress);//request.currentUser
            query.equalTo('data', today_date);
            query.equalTo('month', nowmonth);
            query.find().then(function (results) {
                var data = results.map(results => results.toJSON()) //从网络拿到数据
                if (data.length > 24) {
                    kill_rate = 0.7
                }
                if (data.length > 30) {
                    kill_rate = 0.3
                }
                if (data.length > 36) {
                    kill_rate = 0
                }

            }
            );



            var query = new AV.Query(cloud_human);
            query.equalTo('user', request.currentUser);//request.currentUser
            query.find().then(function (results) {
                var data = results.map(results => results.toJSON()) //从网络拿到数据
                if (data.length > 0) {

                    if (request.params.logincheckid == data[0].logincheckid && data[0].band == false) {


                        var limit = data[0].limit;
                        var gbl_limit = data[0].gbl_limit;
                        if (limit[0] != today_date) {
                            limit = [today_date, 0, 0, 0, 0, 0]
                        }
                        if (data[0].level > 49) {
                            if (gbl_limit[1] > 5) {
                                return response.error("超过次数！");
                            } else {
                                gbl_limit[1] = gbl_limit[1] + 1
                                startfightgbl_on(limit, gbl_limit, data[0], request.params.maptype, request.params.map, request.params.map)
                            }
                        } else {
                            return response.error("等级不够50级");
                        }

                    } else {
                        return response.error("重复登陆");
                    }

                } else {
                    return response.error("未得到数据");
                }
            }, function (error) {
                return response.error(error);
            });
        } else {
            return response.error("版本不符");
        }
    }
    function startfightgbl_on(limit, gbl_limit, humandata, type, monster_level, map) {

        var cqarray = humandata.cqarray;
        if (humandata.mohe[0][0] !== undefined) {
            cqarray.push(humandata.mohe[0][0])
            if (humandata.mohe[0][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[0][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[1][0] !== undefined) {
            cqarray.push(humandata.mohe[1][0])
            if (humandata.mohe[1][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[1][1].substring(7)) + 1000)
            }
        }
        if (humandata.mohe[2][0] !== undefined) {
            cqarray.push(humandata.mohe[2][0])
            if (humandata.mohe[2][0] == 30) {
                cqarray.push(parseInt(humandata.mohe[2][1].substring(7)) + 1000)
            }
        }

        var temphp = humandata.HP
        if ((cqarray.indexOf(32) > -1 || humandata.cqarray_jc.indexOf(32) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 5
        }
        if ((cqarray.indexOf(31) > -1 || humandata.cqarray_jc.indexOf(31) > -1) && (cqarray.indexOf(980) > -1 || humandata.cqarray_jc.indexOf(980) > -1)) {
            humandata.HP = temphp * 6
        }

        var dianfarr = humandata.dianf;
        function getwuli(hj) {
            return (100 - ((Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]) > 80 ? 80 : (Math.sqrt(Math.sqrt(hj)) * (humandata.job == 1 ? 2.8 : 1.5) + dianfarr[1]))) / 100
        }


        humandata.HP = humandata.HP * (1 + dianfarr[0] / 100)
        humandata.resistance = humandata.resistance + dianfarr[2]
        humandata.attback = humandata.attback + dianfarr[3]

        humandata.critdamage = humandata.critdamage + dianfarr[4]
        humandata.ice = humandata.ice + dianfarr[5]
        humandata.fire = humandata.fire + dianfarr[6]
        humandata.ray = humandata.ray + dianfarr[7]
        humandata.poison = humandata.poison + dianfarr[8]
        var exp_df = dianfarr[9] / 100
        var rate_df = dianfarr[10] / 100


        var monsterlist = [
            { "name": "蘑菇精[哥布林]", "damage": 10000, "hp": 10000000000, "hj": 10, "speed": 2.0, "type": "普通" },
            { "name": "猫精[哥布林]", "damage": 10000, "hp": 10000000000, "hj": 10, "speed": 2.0, "type": "普通" }
        ]
        var cowlist = [
            { "name": "牛哥", "damage": 10000, "hp": 3000000000, "hj": 10, "speed": 2.0, "type": "普通" }
        ]

        var skillslist = [
            { "name": "冰霜新星", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "聚能轰击", "needmp": 25, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷电脉冲", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "剧毒之环", "needmp": 30, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰霜之箭", "needmp": 40, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "狂暴之箭", "needmp": 20, "cd": 6, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "雷神之箭", "needmp": 25, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "萃毒之箭", "needmp": 20, "cd": 12, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 120, "level9": 150 },

            { "name": "冰风斩", "needmp": 25, "cd": 16, "level1": 50, "level2": 60, "level3": 70, "level4": 80, "level5": 90, "level6": 100, "level7": 110, "level8": 130, "level9": 150 },
            { "name": "山崩地裂", "needmp": 25, "cd": 10, "level1": 80, "level2": 85, "level3": 90, "level4": 100, "level5": 110, "level6": 120, "level7": 140, "level8": 170, "level9": 200 },
            { "name": "顺劈斩", "needmp": 20, "cd": 8, "level1": 80, "level2": 90, "level3": 100, "level4": 110, "level5": 120, "level6": 130, "level7": 140, "level8": 150, "level9": 180 },
            { "name": "巫毒狂暴", "needmp": 40, "cd": 15, "level1": 5, "level2": 8, "level3": 15, "level4": 20, "level5": 28, "level6": 36, "level7": 45, "level8": 60, "level9": 80 },
        ]

        var p_skill1 = humandata.skill1_level;
        var p_skill2 = humandata.skill2_level;
        var p_skill3 = humandata.skill3_level;
        var p_skill4 = humandata.skill4_level;
        if (humandata.job == 1) {
            var mydias = humandata.diaarray[0] + humandata.diaarray_jc[0]
            var skill1 = skillslist[11];
            var skill2 = skillslist[9];
            var skill3 = skillslist[8];
            var skill4 = skillslist[10];
        }
        if (humandata.job == 2) {
            var mydias = humandata.diaarray[2] + humandata.diaarray_jc[2]
            var skill1 = skillslist[7];
            var skill2 = skillslist[5];
            var skill3 = skillslist[4];
            var skill4 = skillslist[6];
        }
        if (humandata.job == 3) {
            var mydias = humandata.diaarray[1] + humandata.diaarray_jc[1]
            var skill1 = skillslist[3];
            var skill2 = skillslist[1];
            var skill3 = skillslist[0];
            var skill4 = skillslist[2];
        }
        var x = 'skill1.level' + p_skill1;
        var p_skill1_name = skill1.name;
        var p_skill1_damage = eval(x);
        var p_skill1_cd = skill1.cd;
        var p_skill1_needmp = skill1.needmp;
        x = 'skill2.level' + p_skill2;
        var p_skill2_name = skill2.name;
        var p_skill2_damage = eval(x);
        var p_skill2_cd = skill2.cd;
        var p_skill2_needmp = skill2.needmp;
        x = 'skill3.level' + p_skill3;
        var p_skill3_name = skill3.name;
        var p_skill3_damage = eval(x);
        var p_skill3_cd = skill3.cd;
        var p_skill3_needmp = skill3.needmp;
        x = 'skill4.level' + p_skill4;
        var p_skill4_name = skill4.name;
        var p_skill4_damage = eval(x);
        var p_skill4_cd = skill4.cd;
        var p_skill4_needmp = skill4.needmp;


        var ice_odds = 10//冰冻机率
        var ray_odds = 5 //瘫痪机率

        //回调数据
        var p_stateArray = [];               //基于人物速度
        var p_addhpArray = [];               //基于人物速度
        var p_dechpArray = [];//基于怪物速度
        var p_poisonArray = [];//基于怪物速度
        var p_mpArray = [];                   //基于人物速度
        var p_secmpArray = [];//每秒

        var m_stateArray = [];//基于怪物速度
        var m_dechpArray = [];              //基于人物速度
        var m_poisonArray = [];             //基于人物速度
        var detailArray = [];   //所有其它相关数据
        var p_detailArray = [];   //人物状态 复活
        var m_backhpArray = [];   //人物状态 复活

        //怪物属性
        var ranx = Math.random() * 0.2 + 0.9

        var monsterrate = Math.random() * 100


        if (monsterrate > 5) {
            var monster = monsterlist[Math.floor(Math.random() * monsterlist.length)];
        } else {
            var monster = cowlist[0];
        }



        var m_name = monster.name;
        var m_damage = 1000;
        var allm_hp = Math.floor(monster.hp * ranx * map);
        var m_hp = Math.floor(monster.hp * ranx * map);
        var m_dechpall = 0;
        var m_hj = map == 1 ? 2000000 : (map == 2 ? 8000000 : (map == 3 ? 20000000 : (map == 4 ? 5000000 : 100000000)))
        var m_speed = monster.speed;
        var m_type = monster.type;

        //人物属性
        var huodong = 1; // 活动
        var jctemp = 0.2;  //追随者加成
        var jctemp_exp = 1 * (1 + exp_df) * huodong;
        var nowtime = new Date()
        nowtime = nowtime.getTime()
        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? jctemp = 0.2 : (humandata.fly == 1 ? jctemp = 0.7 : jctemp = 1)              //翅膀加成 正常
            humandata.fly == 0 ? jctemp_exp = 1 * (1 + exp_df) * huodong : (humandata.fly == 1 ? jctemp_exp = 1.5 * (1 + exp_df) * huodong : jctemp_exp = 2 * (1 + exp_df) * huodong)     //翅膀经验  正常
        }

        var p_hp = humandata.HP + (humandata.hp_jc * jctemp);   //人物HP
        var p_mp = humandata.MP;    //人物MP
        var p_secmp = humandata.secmp;    //人物MP
        var p_hj = humandata.HJ + (humandata.hj_jc * jctemp);    //人物护甲
        var p_resistance = humandata.resistance + (humandata.resistance_jc * jctemp); //人物元素抗性
        var p_attback = humandata.attback + (humandata.attback_jc * jctemp);  //  人物击回
        var p_cd = humandata.cd_p;      //人物CD减少
        var p_crit = humandata.crit;    //人物暴击机率
        var p_crit_temp = p_crit;       //爆击率的TEMP
        var p_critdamage = 1 + (humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100;    //人物暴击伤害
        var p_speed = humandata.speed;
        var p_fire = humandata.fire + (humandata.fire_jc * jctemp);
        var p_ice = humandata.ice + (humandata.ice_jc * jctemp);
        var p_poison = humandata.poison + (humandata.poison_jc * jctemp);
        var p_ray = humandata.ray + (humandata.ray_jc * jctemp);
        var p_level = humandata.level;
        var p_job = humandata.job;

        var exp = humandata.exp;
        var exp_all = humandata.exp_all;
        var p_zhu = humandata.job == 1 ? humandata.LL : humandata.job == 2 ? humandata.MJ : humandata.ZL
        //武器伤害
        var p_damage = Math.floor(humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) + Math.floor(humandata.damage_jc * jctemp)





        var legend_1 = 0;
        var legend_2 = false;
        var legend_3 = false;
        var legend_4 = false;
        var legend_6 = 1;
        var legend_7 = false;
        var legend_9 = false;
        var legend_10 = false;
        var legend_11 = false;
        var legend_13 = 1;
        var legend_14 = false;
        var legend_15 = false;
        var legend_20 = false;
        var legend_21 = false;
        var legend_22 = false;
        var legend_23 = false;
        var legend_23_3 = 3
        var legend_23_5 = 5
        var legend_22_i = 1
        var legend_24 = false;
        var legend_25 = false;
        var legend_28 = false;
        var legend_38 = false;
        var legend_38_ok = false;

        var legend100 = false;//套装
        var legend100_6 = false;
        var legend100_i = 0;
        var legend101 = false;
        var legend101_6 = false;
        var legend101_i = 0;
        var legend102 = false;
        var legend102_6 = false;
        var legend102_i = 0;
        var legend_exp = 1
        // for (var i = 0; i < cqarray.length; i++) {
        //     legend(cqarray[i])
        // }

        if (cqarray.indexOf(1) > -1) {
            legend_1 = 1;
        }
        // if ((cqarray.indexOf(2) > -1) && p_level >= monster_level) {
        //     legend_2 = true;//1%秒杀不高于自己的怪
        // }
        if (cqarray.indexOf(3) > -1) {
            legend_3 = true;  //暴击回复10%MP
        }
        if (cqarray.indexOf(4) > -1) {
            legend_4 = true;  //当你的生命值低于30%时，伤害提高100%
        }
        if (cqarray.indexOf(5) > -1) {           //如果你的暴击机率大于等于60%，则你每次必定暴击
            if (p_crit > 59) {
                p_crit = 100
            }
        }
        if (cqarray.indexOf(6) > -1) {  //你的追随者提供的伤害加成提高5%
            legend_6 = 1.05
        }
        if (cqarray.indexOf(7) > -1) {  //当受到致命伤害时，10%的机率回复50%的HP
            legend_7 = true;
        }
        if (cqarray.indexOf(8) > -1) {  //所有的技能MP消耗降低20
            p_skill1_needmp = Math.floor(skill1.needmp * 0.8);
            p_skill2_needmp = Math.floor(skill2.needmp * 0.8);
            p_skill3_needmp = Math.floor(skill3.needmp * 0.8);
            p_skill4_needmp = Math.floor(skill4.needmp * 0.8);
        }
        if (cqarray.indexOf(9) > -1) {  //当你的生命值低于20%时，必定暴击
            legend_9 = true;
        }
        if (cqarray.indexOf(10) > -1) {  //MP的值低于10%时，所受到的伤害减少50%
            legend_10 = true;
        }
        if (cqarray.indexOf(11) > -1) {  //攻击被控制的怪物时，必定暴击
            legend_11 = true;
        }
        if (cqarray.indexOf(12) > -1) {  //你的击回数值增加，增加的百分比为你的暴击机率
            p_attback = (humandata.attback + (humandata.attback_jc * jctemp)) * (1 + p_crit / 100)
        }
        if (cqarray.indexOf(13) > -1) {  //你对精英和BOSS的伤害增加100%
            if (monster.type != "普通") {
                legend_13 = 2
            }
        }
        if (cqarray.indexOf(14) > -1) {//你免疫所有控制（冰冻、瘫痪）
            legend_14 = true;
        }
        if (cqarray.indexOf(15) > -1) {  //你的每次攻击和技能都会提高火技能伤害1%
            legend_15 = true;
        }

        if (cqarray.indexOf(18) > -1) {//如果你的面板伤害低于追随者，则你的暴击伤害提高100%
            if (p_damage * (1 + (p_crit / 100 * p_critdamage / 100)) < humandata.damage_jc) {
                p_critdamage = 1 + ((humandata.critdamage + (humandata.critdamage_jc * jctemp)) / 100) + 1;

            }
        }

        if (cqarray.indexOf(19) > -1) {  //你的所有技能等级+2
            p_skill1 = humandata.skill1_level + 2;
            p_skill2 = humandata.skill2_level + 2;
            p_skill3 = humandata.skill3_level + 2;
            p_skill4 = humandata.skill4_level + 2;
            var xx = 'skill1.level' + p_skill1;
            p_skill1_damage = eval(xx);
            xx = 'skill2.level' + p_skill2;
            p_skill2_damage = eval(xx);
            xx = 'skill3.level' + p_skill3;
            p_skill3_damage = eval(xx);
            xx = 'skill4.level' + p_skill4;
            p_skill4_damage = eval(xx);
        }
        if (cqarray.indexOf(20) > -1) {//如果你的追随者也有此传奇属性，则他将为你分担一半伤害
            if (humandata.cqarray_jc.indexOf(20) > -1) {
                legend_20 = true;
            }
        }
        if (cqarray.indexOf(21) > -1) {//如果你的攻速低于怪 提高1倍伤害
            if (p_speed < m_speed) {
                legend_21 = true;
            }
        }

        if (cqarray.indexOf(23) > -1) {//华戒  少一件
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (humandata.cqarray_jc.indexOf(23) > -1) {
            legend_23 = true;
            legend_23_3 = 2
            legend_23_5 = 4
        }
        if (cqarray.indexOf(24) > -1) {//冰冻机率提高
            legend_24 = true;
            ice_odds = ice_odds + (humandata.ZL * 0.005)
        }
        if (cqarray.indexOf(25) > -1) {//冰冻技能优先
            legend_25 = true;
        }
        if (cqarray.indexOf(26) > -1 && mydias > 20) {
            p_cd += 30
        }
        if (cqarray.indexOf(27) > -1) {//护甲提高
            p_hj = humandata.HJ + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);    //人物护甲
        }
        if (cqarray.indexOf(28) > -1 || humandata.cqarray_jc.indexOf(28) > -1) {//普攻减CD1秒
            legend_28 = true;
        }
        if (cqarray.indexOf(30) > -1 || humandata.cqarray_jc.indexOf(30) > -1) {
            var newexpparr = cqarray
            newexpparr.push(...humandata.cqarray_jc)
            legend_exp = Math.max(...newexpparr)
            legend_exp = (legend_exp - 1000) / 100 + 1
            legend_exp > 1 ? legend_exp : 1
        }
        if (cqarray.indexOf(38) > -1 || humandata.cqarray_jc.indexOf(38) > -1) {
            legend_38 = true
        }
        if (cqarray.indexOf(100) > -1) {//套装

            legend100_i = getSameNum(100, cqarray)
            if (legend100_i > 1) {
                if (cqarray.indexOf(27) > -1) {//护甲提高
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp) + (mydias * mydias * 10);   //人物护甲
                } else {
                    p_hj = (humandata.HJ * 1.5) + (humandata.hj_jc * jctemp);
                }

            }
            if (legend100_i > legend_23_3) {
                legend100 = true;
            }
            if (legend100_i > legend_23_5) {
                legend100_6 = true;
            }
        }


        if (cqarray.indexOf(101) > -1) {//套装
            legend101_i = getSameNum(101, cqarray)
            if (legend101_i > 1) {
                p_speed = humandata.speed * 1.2
            }
            if (legend101_i > legend_23_3) {
                legend101 = true;
            }
            if (legend101_i > legend_23_5) {
                legend101_6 = true;
            }
        }


        if (cqarray.indexOf(103) > -1) {//套装
            var legend103_i = getSameNum(103, cqarray)

            if (legend103_i > legend_23_5) {
                p_ray = p_ray * 2.5;
                p_fire = p_fire * 2.5;
                p_ice = p_ice * 2.5;
                p_poison = p_poison * 2.5;
            } else if (legend103_i > legend_23_3) {
                p_ray = p_ray * 1.5;
                p_fire = p_fire * 1.5;
                p_ice = p_ice * 1.5;
                p_poison = p_poison * 1.5;
            } else if (legend103_i > 1) {
                p_ray = p_ray * 1.2;
                p_fire = p_fire * 1.2;
                p_ice = p_ice * 1.2;
                p_poison = p_poison * 1.2;
            }
        }

        if (cqarray.indexOf(17) > -1) {  //所有技能元素属性变成你最高伤害比的那个元素属性
            var legend_17 = Math.max(p_ray, p_fire, p_ice, p_poison)
            p_ray = legend_17;
            p_fire = legend_17;
            p_ice = legend_17;
            p_poison = legend_17;
        }

        if (cqarray.indexOf(22) > -1) {//你的攻速低于怪，受到的伤害降低，降低百分比为你最低元素的百分比
            if (p_speed < m_speed) {
                legend_22 = true;
                legend_22_i = (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100)) < 0.2 ? 0.2 : (1 - ((Math.min((p_fire + (humandata.fire_jc * jctemp)), (p_ice + (humandata.ice_jc * jctemp)), (p_poison + (humandata.poison_jc * jctemp)), (p_ray + (humandata.ray_jc * jctemp)))) / 100))
            }
        }

        if (cqarray.indexOf(16) > -1) {  //冰系技能冰冻机率提高，提高的百分比为你的冰系伤害
            ice_odds = 10 + Math.floor(p_ice / 10)
        }

        if (cqarray.indexOf(102) > -1) {//套装
            legend102_i = getSameNum(102, cqarray)
            if (legend102_i > 1) {
                if (cqarray.indexOf(16) > -1) {
                    ice_odds = 20 + Math.floor(p_ice / 10)
                } else {
                    ice_odds = 20
                }

            }
            if (legend102_i > legend_23_3) {
                legend102 = true;
            }
            if (legend102_i > legend_23_5 && map > p_level) {
                legend102_6 = true;
            } else {
                legend102_6 = false;
                if ((cqarray.indexOf(33) > -1 || humandata.cqarray_jc.indexOf(33) > -1) && p_job == 3) {
                    legend102_6 = true;
                }
            }
        }

        function getSameNum(val, arr) {
            processArr = arr.filter(function (value) {
                return value == val;
            })
            return processArr.length;
        }
        //技能配置
        // var green100 = ["你的护甲值提高50%", "反伤伤害为护甲值的20倍", "你的反伤伤害受爆击伤害加成"]
        // var green101 = ["每攻击5次额外攻击1次", "额外攻击的击回数受爆伤加成", "击回数增加，数值为敏捷的10倍"]
        // var green102 = ["冰冻机率提高10%", "对冰冻的怪伤害提高50%", "如果怪等级比自己高，则提高至300%"]
        // var green103 = ["冰火雷毒元素数值变成1.2倍", "冰火雷毒元素数值变成1.5倍", "冰火雷毒元素数值变成2.5倍"]
        //初始化状态数据
        detailArray.push(p_speed)
        detailArray.push(m_speed)
        detailArray.push(m_name)
        detailArray.push(m_hp)
        detailArray.push(p_hp)
        detailArray.push(p_mp)
        if (legend_25 == true) {  //控制技能优先
            var temp_skill = 3
        } else {
            var temp_skill = 1
        }
        var m_state = "正常";
        var m_attstate = []  //怪攻击技能
        var h_yichang = []//人物异常状态 
        var m_state2 = "正常"; //中毒状态
        var p_state = "正常";
        var p_detail = '正常'
        var poison_time = 0;//中毒时间
        var cd1 = 0;
        var cd2 = 0;
        var cd3 = 0;
        var cd4 = 0;
        var m_times = 0;
        var m_skills = ["山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "山崩地裂", "冰风斩", "剧毒之环", "聚能轰击", "冰霜新星", "雷电脉冲"]
        var fight_times = 0

        var Fight_p = setInterval(fight_p, 10 / p_speed);  //角色开始
        var Fight_m = setInterval(fight_m, 10 / m_speed);  //怪物开始
        var Fight_sec = setInterval(fight_sec, 10);  //每秒计时

        function stopInterval() {
            clearInterval(Fight_p);
            clearInterval(Fight_m);
            clearInterval(Fight_sec);
        }

        //每秒计时
        function fight_sec() {
            cd1 -= 1
            cd2 -= 1
            cd3 -= 1
            cd4 -= 1
            cd1 = cd1 <= 0 ? 0 : cd1
            cd2 = cd2 <= 0 ? 0 : cd2
            cd3 = cd3 <= 0 ? 0 : cd3
            cd4 = cd4 <= 0 ? 0 : cd4
            p_mp += p_secmp;
            p_secmpArray.push(p_secmp)
            fight_times += 10
            var timesodds = Math.floor(Math.random() * 1000 + 50);
            if (fight_times > timesodds) {
                p_stateArray.push("逃跑")
                returnresults_v(0, 0)
                stopInterval()
            }
        }

        //人
        function fight_p() {
            m_times += 1
            if (p_hp <= 0 && legend_7 == true) {  //10%机率回复50%血
                var odds = Math.floor(Math.random() * 100);
                if (odds < 20) {
                    p_hp += (humandata.HP + (humandata.hp_jc * jctemp)) / 2
                    p_detail = "复活"
                }
            }
            if (p_hp <= 0) {
                p_stateArray.push("死亡")
                returnresults_v(0, 0)
                stopInterval()
            } else {
                if (legend_2 == true) {  //传奇-1%机率秒杀怪
                    var odds = Math.floor(Math.random() * 120);
                    if (odds < 1) {
                        m_hp = 0;
                    }
                }
                if (legend_4 == true && p_hp < humandata.HP * 0.3) {
                    p_damage = Math.floor(((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 * 2) + (humandata.damage_jc * jctemp))
                } else {
                    p_damage = Math.floor((humandata.damage2 * (1 + (humandata.damage_p / 100)) * (1 + (p_zhu / 100))) * legend_13 * legend_6 + (humandata.damage_jc * jctemp))
                }

                var temp_p_critdamage = 1;
                var temp_p_poison = 1;

                if (legend_25 == true) {  //控制技能优先

                    if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                } else {
                    if (cd1 == 0 && p_mp >= p_skill1_needmp && p_skill1 > 0 && temp_skill == 1) {
                        playskill1();
                        cd1 = p_skill1_cd * (1 - (p_cd / 100));
                        temp_skill = 2
                    } else if (cd2 == 0 && p_mp >= p_skill2_needmp && p_skill2 > 0 && temp_skill == 2) {
                        playskill2();
                        cd2 = p_skill2_cd * (1 - (p_cd / 100));
                        temp_skill = 3
                    } else if (cd3 == 0 && p_mp >= p_skill3_needmp && p_skill3 > 0 && temp_skill == 3) {
                        playskill3();
                        cd3 = p_skill3_cd * (1 - (p_cd / 100));
                        temp_skill = 4
                    } else if (cd4 == 0 && p_mp >= p_skill4_needmp && p_skill4 > 0 && temp_skill == 4) {
                        playskill4();
                        cd4 = p_skill4_cd * (1 - (p_cd / 100));
                        temp_skill = 1
                    } else {
                        if (legend_28 == true) {
                            cd1 -= 1
                            cd2 -= 1
                            cd3 -= 1
                            cd4 -= 1
                            cd1 = cd1 <= 0 ? 0 : cd1
                            cd2 = cd2 <= 0 ? 0 : cd2
                            cd3 = cd3 <= 0 ? 0 : cd3
                            cd4 = cd4 <= 0 ? 0 : cd4
                        }

                        play_pt(p_damage, "pt");

                    }
                }



                //------------------------------技能攻击
                function playskill1() {      //技能攻击 毒
                    //中毒机率
                    if (p_job == 1) {
                        p_state = "巫毒狂暴";
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    } else {
                        m_state2 = "中毒"
                        play_pt(p_damage * (1 + p_poison / 100), "jn")
                        p_mp -= p_skill1_needmp
                        p_stateArray.push(p_skill1_name)
                    }
                }

                function playskill2() {      //技能攻击
                    play_pt(p_damage * (p_skill2_damage / 100 + 1) * (1 + p_fire / 100), "jn")
                    p_mp -= p_skill2_needmp
                    p_stateArray.push(p_skill2_name)
                }

                function playskill3() {      //技能攻击冰
                    //冰冻机率
                    var odds = Math.floor(Math.random() * 100);
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill3_damage / 100 + 1) * (1 + p_ice / 100), "jn")
                    }
                    if (odds < ice_odds) {
                        if (legend_38 == true) {

                            legend_38_ok = true
                        }
                        m_state = "冰冻"
                        setTimeout(resetstateice, 30);
                    }

                    p_mp -= p_skill3_needmp
                    p_stateArray.push(p_skill3_name)
                }

                function playskill4() {      //技能攻击  电
                    //瘫痪机率
                    var odds = Math.floor(Math.random() * 100);
                    if (odds < ray_odds) {
                        m_state = "瘫痪"
                        setTimeout(resetstateray, 60);
                    }
                    if (legend_24 == true) {
                        play_pt(0, "jn")
                    } else {
                        play_pt(p_damage * (p_skill4_damage / 100 + 1) * (1 + p_ray / 100), "jn")
                    }

                    p_mp -= p_skill4_needmp
                    p_stateArray.push(p_skill4_name)
                }
            }

            //------------------------------普通攻击
            function play_pt(p_damage, from) {
                if (legend_21 == true) {
                    p_damage = p_damage * 2
                }
                if (p_detail == "正常" || p_detail == "复活") {

                    if (legend_15 == true) {//你的每次攻击和技能都会提高火技能伤害1%
                        p_fire += 1;
                    }
                    //暴击机率
                    var odds = Math.floor(Math.random() * 100);
                    if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                        odds = 0;
                    }
                    if ((m_state == "冰冻" || m_state == "瘫痪") && legend_11 == true) {  //攻击被控制的怪物时，必定暴击
                        odds = 0;
                    }
                    if (m_state == "冰冻" && legend102 == true && legend102_6 != true) {  //法师套装
                        var legend102_ii = 1.5
                    } else if (m_state == "冰冻" && legend102_6 == true) {  //法师套装
                        var legend102_ii = 4
                    } else {
                        var legend102_ii = 1
                    }
                    if (odds < p_crit) {
                        temp_p_critdamage = p_critdamage;
                        if (from == "pt") {
                            p_stateArray.push("暴击")
                        }
                        if (legend_3 == true) {   //暴击回复10%MP
                            p_mp += humandata.MP / 10;
                        }
                    } else {
                        temp_p_critdamage = 1;
                        if (from == "pt") {
                            p_stateArray.push("普攻")
                        }
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time < 30 && m_state2 == "中毒") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0

                            m_dechpall += p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            m_poisonArray.push(p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0)
                        } else {
                            m_state2 = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                            m_poisonArray.push(0)
                        }
                    }

                    //检测巫毒狂暴
                    if (p_job == 1) {
                        if (poison_time < 60 && p_state == "巫毒狂暴") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100 + 1  //temp_p_poison 巫毒狂暴伤害传递参数
                        } else {
                            m_state = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                        }
                    }

                    m_hp -= ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0
                    m_dechpall += ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0
                    var temp_addback = p_attback;
                    // if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp))) {
                    if (legend101_6 == true) {
                        temp_addback = p_attback + (humandata.MJ * 10)
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 != true) {
                        temp_addback = p_attback * temp_p_critdamage
                    }
                    if ((m_times % 6) == 0 && legend101 == true && legend101_6 == true) {
                        temp_addback = (p_attback * temp_p_critdamage) + (humandata.MJ * 10)
                    }
                    if (legend_38_ok == true) {
                        temp_addback += humandata.ZL * 500
                        legend_38_ok = false
                    }

                    // if (((humandata.HP + (humandata.hp_jc * jctemp)) - p_hp) <= temp_addback) {
                    //     temp_addback = (humandata.HP + (humandata.hp_jc * jctemp)) - p_hp
                    // }
                    // }
                    p_hp += temp_addback
                    if (p_detail == "复活") {
                        p_detail = "正常"
                        p_addhpArray.push(temp_addback + ((humandata.HP + (humandata.hp_jc * jctemp)) / 2))
                    } else {
                        p_addhpArray.push(temp_addback)
                    }
                    m_dechpArray.push(((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) > 0 ? ((p_damage * temp_p_poison * temp_p_critdamage * legend102_ii) - m_hj) : 0)
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    h_yichang.push(p_detail)
                } else {
                    if (from == "pt") {
                        p_stateArray.push("普攻")
                    }
                    //检测毒伤
                    if (p_job != 1) {
                        if (poison_time < 30 && m_state2 == "中毒") {
                            poison_time += 10;
                            temp_p_poison = p_skill1_damage / 100  //temp_p_poison 毒伤害传递参数
                            m_hp -= p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            m_dechpall += p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0
                            m_poisonArray.push(p_damage * temp_p_poison - m_hj > 0 ? p_damage * temp_p_poison - m_hj : 0)
                        } else {
                            m_state2 = "正常"
                            poison_time = 0;
                            temp_p_poison = 1;
                            m_poisonArray.push(0)
                        }
                    }
                    p_addhpArray.push(0)
                    p_mp = p_mp >= humandata.MP ? humandata.MP : p_mp <= 0 ? 0 : p_mp;
                    p_mpArray.push(p_mp)
                    m_dechpArray.push(0)
                    h_yichang.push(p_detail)
                }
            }
        }

        //怪
        function fight_m() {
            if ((humandata.HP + (humandata.hp_jc * jctemp)) < p_hp) {
                p_hp = (humandata.HP + (humandata.hp_jc * jctemp))
            }

            if (m_hp <= 0) {
                m_stateArray.push("死亡")
                getitems()
                stopInterval()
            } else {

                if (m_state == "正常") {

                    var dechp_temp = 0
                    var m_odds = Math.floor(Math.random() * 100);//技能随机数
                    var m_odds2 = Math.floor(Math.random() * 100);//冰冻随机数
                    var m_topodd2 = 50
                    var m_topodd = 0;
                    var m_skills_damage = 1
                    var odd_temp = (5 + (map - p_level)) > 30 ? 30 : (5 + (map - p_level))
                    m_type == "BOSS" ? m_topodd = (odd_temp + 5) : m_type == "精英" ? m_topodd = odd_temp : 0
                    if (legend_14 == true) {  //免疫冰冻 
                        m_topodd2 = 0
                    }
                    if (m_odds < m_topodd) {
                        var m_atttemp = m_skills[Math.floor(Math.random() * m_skills.length)]
                        if (m_atttemp == "冰霜新星" && m_odds2 < m_topodd2) {
                            p_detail = "冰冻"
                            setTimeout(m_resetstateice, 30);
                        } else if (m_atttemp == "雷电脉冲" && m_odds2 < m_topodd2) {
                            p_detail = "瘫痪"
                            setTimeout(m_resetstateray, 30);
                        }
                        m_skills_damage = (m_type == "BOSS" ? 1.4 : 1.2)
                        dechp_temp = m_damage * m_skills_damage * (p_resistance > 80 ? 0.2 : ((100 - p_resistance) / 100))
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            dechp_temp = dechp_temp / (legend_20 == true ? 4 : 2)
                        } else {
                            dechp_temp = dechp_temp / (legend_20 == true ? 2 : 1)
                        }
                        m_attstate.push(m_atttemp)  //随机一个技能
                    } else {        //怪物普攻
                        if (p_mp < (humandata.MP * 0.2) && legend_10 == true) {  //MP的值低于10%时，所受到的伤害减少50%
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 4 : 2)) : 0
                            }
                        } else {
                            if (legend_22 == true) {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? (((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) * legend_22_i) : 0
                            } else {
                                dechp_temp = m_damage * getwuli(p_hj) > 0 ? ((m_damage * getwuli(p_hj)) / (legend_20 == true ? 2 : 1)) : 0
                            }
                        }
                        m_attstate.push("普攻")
                    }
                    p_hp -= dechp_temp


                    //反伤
                    if (legend100 == true && legend100_6 != true) {
                        m_hp -= (p_hj * 20)
                        m_dechpall += (p_hj * 20)
                        m_backhpArray.push(p_hj * 20)
                    } else if (legend100 == true && legend100_6 == true) {
                        //反伤爆击
                        var odds_fs = Math.floor(Math.random() * 100);
                        if (p_hp < (humandata.HP + (humandata.hp_jc * jctemp)) * 0.2 && legend_9 == true) {  //当你的生命值低于20%时，必定暴击
                            odds_fs = 0;
                        }

                        if (odds_fs < p_crit) {
                            var temp_p_critdamage_fs = p_critdamage;
                        } else {
                            var temp_p_critdamage_fs = 1;
                        }

                        m_hp -= (p_hj * 20 * temp_p_critdamage_fs)
                        m_dechpall += (p_hj * 20 * temp_p_critdamage_fs)
                        m_backhpArray.push(p_hj * 20 * temp_p_critdamage_fs)
                    } else {
                        m_backhpArray.push(0)
                    }
                    p_dechpArray.push(dechp_temp)
                    m_stateArray.push(m_state)
                    p_detailArray.push(p_detail)
                } else {
                    p_dechpArray.push(0)
                    m_stateArray.push(m_state)
                    p_detailArray.push(p_detail)
                }
            }

        }

        //resetstate
        function resetstateice() {
            if (m_state != "瘫痪") {
                m_state = "正常"
            }
        }
        function resetstateray() {
            if (m_state != "冰冻") {
                m_state = "正常"
            }
        }

        function m_resetstateice() {
            if (p_detail != "瘫痪") {
                p_detail = "正常"
            }
        }
        function m_resetstateray() {
            if (p_detail != "冰冻") {
                p_detail = "正常"
            }
        }




        var ratetemp = 10 * monster_level;

        if (humandata.fly_data != 0 && (humandata.fly_data - nowtime) > 0) {
            humandata.fly == 0 ? ratetemp = ratetemp : (humandata.fly == 1 ? ratetemp = (Math.floor(ratetemp * (1.5)) + 2) : ratetemp = (Math.floor(ratetemp * (2)) + 4))   //翅膀爆率  正常
        }

        ratetemp = Math.floor(ratetemp * (1 + rate_df))  //活动  爆率+ 10 



        function getitems() {
            returnresults_v(ratetemp, ratetemp * 10000000)
        }


        function returnresults_v(diamond, gold) {
            // console.log("发送回调")
            // if (humandata.name == "潜力股" || humandata.name == "kirito" || humandata.name == "小团结" || humandata.name == "博敏浩思" || humandata.name == "彼岸" || humandata.name == "321事情" || humandata.name == "爱情啊啊" || humandata.name == "Asuna" || humandata.name == "三你妹" || humandata.name == "打打" || humandata.name == "暗黑1215" || humandata.name == "暗黑21cn" || humandata.name == "暗黑佳佳" || humandata.name == "潜力229" || humandata.name == "潜力105" || humandata.name == "潜力1215" || humandata.name == "潜力股St" || humandata.name == "猎魔人163") {
            //     kill_rate = 1
            // }
            var xueyan = 0
            var keys = 0
            if (diamond == 0) {
                var drate = (m_dechpall / allm_hp) > 1 ? 1 : (m_dechpall / allm_hp)
                diamond = Math.floor(ratetemp * drate * db_rate * kill_rate * 0.2)
                gold = Math.floor(ratetemp * 10000000 * drate)
                if (m_name == '牛哥') {
                    diamond = Math.floor(ratetemp * drate * db_rate * kill_rate * 1.5)
                    xueyan = Math.floor(ratetemp * 20000 * drate)
                    keys = Math.floor(ratetemp * drate * 1)
                }
            } else {
                diamond = Math.floor(ratetemp * db_rate * kill_rate * 0.2)
                if (m_name == '牛哥') {
                    diamond = Math.floor(ratetemp * db_rate * kill_rate * 2)
                    xueyan = Math.floor(ratetemp * 20000)
                    keys = Math.floor(ratetemp * 1)
                }
            }
            var fight_results = [];
            fight_results.push(p_stateArray)
            fight_results.push(p_addhpArray)
            fight_results.push(p_dechpArray)
            fight_results.push(p_poisonArray)
            fight_results.push(p_mpArray)
            fight_results.push(p_secmpArray)
            fight_results.push(m_stateArray)
            fight_results.push(m_dechpArray)
            fight_results.push(m_poisonArray)
            fight_results.push(detailArray)
            var getitem = [];
            getitem.push(diamond)  //现有经验
            getitem.push(gold)  //总经验 
            getitem.push(xueyan)  //总经验 
            getitem.push(keys)  //总经验 
            fight_results.push(getitem)
            fight_results.push(p_detailArray)
            fight_results.push(m_backhpArray)
            fight_results.push(m_attstate)
            fight_results.push(h_yichang)
            if (fight_times < 3000) {
                setTimeout(function () {
                    // console.log("发送success短回调")
                    return response.success(fight_results);
                }, 2000);
            } else {
                // console.log("发送success回调")
                return response.success(fight_results);
            }
            var todo = AV.Object.createWithoutData(cloud_human, humandata.objectId);
            // todo.increment('diamond', diamond); //哥布林加白金币
            todo.increment('gold', gold);
            todo.increment('xueyan', xueyan);
            todo.increment('keys', keys);
            todo.set('gbl_limit', gbl_limit)
            todo.save()

            var TodoFolder = AV.Object.extend('gbl_times');
            var todoFolder = new TodoFolder();
            todoFolder.set('ip', request.meta.remoteAddress);
            todoFolder.set('data', today_date);
            todoFolder.set('month', nowmonth);
            todoFolder.set('who', (cloud_human + humandata.name));
            todoFolder.set('what', [diamond, gold, xueyan, keys]);
            todoFolder.save()
        }

    }

})

/**
 * 天天暗黑-获得1件物品
 * 				objectId:human.objectId,
					level: 10,	//等级属性
					uselevel: 1,	//使用等级
					qualityid:3,	//品质
					type:1,		//类型
					job	//职业
 */
AV.Cloud.define('getone', function (request, response) {
    var level = request.params.level;
    var uselevel = request.params.uselevel;
    var qualityid = request.params.qualityid;
    var type = request.params.type;
    var job = request.params.job;
    var weapon1 = ["重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手"]
    var weapon2 = ["亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮"]
    var weapon3 = ["君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋"]
    var datarate = [{ "diamond": ["钻石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "绿宝石", "红宝石", "黄宝石", "紫宝石", "拉玛兰迪礼物"], "dropitem": ["升灵胸甲", "禁卫胸甲", "统御者胸甲", "君王胸甲", "末日护甲", "战神胸甲", "巴洛尔护甲", "冥河背心", "征服者胸甲", "摄政王之铠", "升灵法袍", "禁卫法袍", "统御者法袍", "君王法袍", "末日神袍", "战神之袍", "巴洛尔神袍", "冥河神袍", "征服者之袍", "摄政王之袍", "升灵披风", "禁卫披风", "统御者披风", "君王披风", "末日披风", "战神披风", "巴洛尔披风", "冥河披风", "征服者披风", "摄政王披风", "重斧", "月牙斧", "苍穹分断", "桑吉士燃斧", "斯考恩巨斧", "战士之血", "峡湾分岭斧", "神圣清算者", "怒涌", "刽子手", "亡魄弓", "毒夹", "掠鸦之翼", "风之力", "莱德強弓", "巴坎射弩", "秘法星刺", "地狱刑具", "恶魔机弩", "蝎尾狮", "君王法杖", "首相", "虫群之杖", "鼓动之焰", "黑手之轮", "星火", "唤魔杖", "天命裂片", "奧菲斯的姿态", "魔萎之凋", "预言", "坏灭", "狂怒", "奧汀之子", "狂君", "日光守祭", "日阳", "焚灼", "霜心", "煞星", "幽冥法珠", "三连法球", "宇宙缩影", "寒冬疾风", "半神巫妖", "星轨石", "艾利之书", "聚能法珠", "核瞳", "恩典之光", "猎人的箭盒", "亡者遗产", "索罪矢", "黑骨箭", "弓匠的骄傲", "银星", "恶魔之箭", "圣尖矢", "万全箭筒", "神圣箭筒", "征服者军帽", "死神面罩", "统治之盔", "地狱恐面", "铁骑头甲", "守护头盔", "皇冠", "主教的头盔", "星际战盔", "升灵头冠", "君王头罩", "智慧面甲", "蕾蔻的意志", "大地之眼", "唤魔师法冠", "法尊", "贤者之巅", "大护法", "共鸣", "暮光", "诺曼之盔", "骑士射盔", "阿克汉的头盔", "乌莲娜的精神", "圣光之冠", "罗兰之面", "荒原头盔", "守护者的凝视", "灼天之面", "骄矜必败", "死卫护肩", "辟邪肩甲", "萨卡拉肩铠", "先祖的怒火", "征服者肩铠", "骷髅王肩铠", "星际肩铠", "壮丽肩饰", "战狂肩甲", "阿克汉的肩甲", "伏尔的劝诫", "七宗罪", "升灵护肩", "末日肩铠", "密棘肩甲", "叠铠肩甲", "蚀刻罩肩", "恶魔之羽", "大地之柱", "博恩的赦免", "大披肩", "魔牙披风", "炎魔肩铠", "御法者肩甲", "渎圣肩铠", "导能披肩", "御魔肩甲", "赋归肩垫", "染邪护肩", "傲慢肩甲", "血色之眼", "狂暴护符", "力量之泉", "地狱火符", "君王护符", "妄念", "黄金护颈", "阿兹卡兰之星", "鱼人坠匣", "国王护符", "猎魔护符", "敏捷之泉", "森林之符", "雕饰项链", "隆达尔的坠匣", "先人之佑", "时光流韵", "吸魂镜", "敏锐之眼", "守护之锁", "艾利护符", "圣灯", "月光护符", "魔法护符", "智力之泉", "元素使者", "兵要护符", "艾利奇之眼", "法能陷阱", "万花筒", "板甲护手", "君王前臂甲", "角斗士的手套", "阿契武的战书", "征服者护手", "塔斯克与西奥", "岩石护手", "宗师护指", "战狂护手", "阿克汉的护手", "升灵护手", "箭雨护手", "潘德之手", "骨织护手", "扼息护手", "荒原护手", "凶恶护手", "影弑", "蕾蔻的裹手", "武空的灵掌", "霜燃", "礼赞手套", "法师之拳", "御法者护手", "炎魔手套", "蚀刻手套", "魔牙护手", "乌莲娜的愤怒", "罗兰之握", "唤魔师的骄傲", "力士护腕", "奴隶镣铐", "守护者的格挡", "加百利的臂甲", "沃兹克臂甲", "卫士护腕", "赛斯切隆臂甲", "愤怒护腕", "阿克汉的镣铐", "稳击护腕", "恶魔之恨", "莫提克的手腕", "豹人猎杀者", "塔格奥腕环", "箭道护腕", "凯撒的回忆", "始祖的缠绕", "拉昆巴的腕饰", "恶魔之怨", "明彻裹腕", "杰拉姆的护腕", "先民护腕", "斯古拉的拯救", "德拉肯的训导", "朗斯洛的愚行", "蒙尘者绑腕", "灵魂守卫", "雷神之力", "天使发带", "京四郎之魂", "金织带", "贪婪腰带", "宝藏腰带", "不可信之链", "哈林顿的护腰", "张的腰封", "天堂束腰", "崩天恨雨", "失踪者的绑腰", "刀锋磨带", "暗影之链", "瑟伯的梦魇", "猎手之怒", "行侠腰带", "飞刀束带", "迅击腰带", "圣洁束带", "万象皆杀", "谢尔曼的缠腰", "缠腰耳串", "行巫时刻", "通冥腰带", "沃贾裹腰", "女魔护腰", "霍尔的祝福", "佐伊的秘密", "附魂腰带", "神秘腿甲", "沼地防水裤", "征服者腿铠", "斯科隆的欺诈", "舞蛇鳞甲", "影拥", "圣光之塔", "阿克汉的腿甲", "荒原腿甲", "恶魔之鳞", "骨织护腿甲", "死神赌注", "夸下痒", "基赫纳斯", "大地之重", "蕾蔻的马裤", "尹娜的戒律", "船长的推裤", "乌莲娜的忧虑", "拉基斯守护", "蚀刻长裤", "杨先生的妖裤", "汉默长裤", "御法者护腿甲", "恶疮马裤", "不死鸟之腹", "恶魔之甲", "凯恩的法裤", "凯恩的长袍", "唤魔师的新生", "荒原长靴", "船长的涉水靴", "不朽之王步履", "影踵", "阿克汉的钢靴", "小恶魔", "大地之基", "铁头防泥靴", "蔑视长靴", "撼地之靴", "凯恩的旅鞋", "掠夺者的便鞋", "蕾蔻的豪迈", "命运阔步靴", "娜塔亚的血足", "尹娜的风靴", "乌莲娜的天命", "粗糙至极靴", "粗野少年足", "安格的舞靴", "圣光之源", "贤者之途", "罗兰之步", "八魔之靴", "唤魔师的热忱", "虚幻长靴", "魔牙胫甲", "攀冰者", "里维拉的舞鞋", "尼芙尔的夸耀", "骷髅扣戒", "君王戒指", "地狱火戒指", "阿莱斯之环", "力量指环", "纳格尔之戒", "混沌之环", "机械指环", "克雷德之焰", "纳加的血戒", "空虚之戒", "永恒盟约", "被盗之戒", "命运守护", "弧光石", "加缪尔欺骗", "正义灯戒", "残影之戒", "罗盘玫瑰", "十二宫之戒", "悔恨大厅之戒", "黑曜石之戒", "凯索的婚戒", "神目指环", "罗嘉的巨石", "破碎誓言", "全能法戒", "空灵密语之戒", "乔丹之石", "祖尼玛萨之疾"], "israte": 1, "rate": [0, 10, 25, 35, 100], "type": [0, 1, 2, 3, 4, 5, 6, 99], "otheritem": null }]

    var legend = {
        "1": "每当你掉落一个宝石时，50%机率会额外再掉落一个",
        "2": "1%的机率秒杀不高于自己等级的怪物（任意级别怪物）",
        "3": "暴击后回复10%的MP值",
        "4": "当你的生命值低于30%时，伤害提高100%",
        "5": "如果你的暴击机率大于等于60%，则你每次必定暴击",
        "6": "每次攻击附加你的追随者伤害的5%",
        "7": "当受到致命伤害时，20%的机率回复50%的HP",
        "8": "所有的技能MP消耗降低20%",
        "9": "当你的生命值低于20%时，必定暴击",
        "10": "MP的值低于20%时，所受到的伤害减少50%",
        "11": "攻击被控制的怪物时，必定暴击",
        "12": "你的击回数值增加，增加的百分比为你的暴击机率",
        "13": "你对精英和BOSS的伤害增加100%",
        "14": "你免疫所有控制（冰冻、瘫痪）",
        "15": "你的每次攻击和技能都会提高火技能伤害1%",
        "16": "冰系技能冰冻机率提高，提高的百分比为你的冰系伤害10%",
        "17": "所有技能元素属性变成你最高伤害比的那个元素属性",
        "18": "如果你的面板伤害低于追随者，则你的暴击伤害提高100%",
        "19": "你的所有技能等级+2",
        "20": "如果你的追随者也有此传奇属性，则他将为你分担一半伤害[追随者可生效]",
        "21": "如果你的攻速低于怪物的攻速，则伤害提高一倍",
        "22": "如果你的攻速低于怪，受到普通伤害降低，百分比为你最低的元素属性(80%上限)",
        "23": "你的套装加成效果所需的装备数量降低1件(最少为2件)[追随者可生效]",
        "24": "冰冻机率提高,数值为你智力的0.5%，但控制系技能伤害为0",
        "25": "你的控制技能优先使用",
        "26": "你和追随者身上的主属性[基于人物]宝石等级总和超过20，你的技能CD减少30%",
        "27": "护甲值提高，数值为你和追随者主属性[基于人物]宝石等级总和的平方乘以10倍",
        "28": "你的普通攻击每次减少所有技能CD1秒[追随者可生效]",
        "29": "你的武器伤害增加，增加数值为智力的5%",
        "30": "你的经验值增加",
        "31": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高5倍[追随者可生效]",
        "32": "爽!穿戴夸下痒、杨先生的妖裤或者沼地防水裤，则血量提高4倍[追随者可生效]",
        "33": "寒冰套装无视怪物等级[仅限法师生效][追随者可生效]",
        "34": "远古的召唤：人物穿戴6件传奇装备，远古门票半价[追随者可生效]",
        "35": "远古的愤怒：人物穿戴6件传奇装备，对远古怪物伤害提高200%[追随者可生效]",
        "36": "远古的汲取：人物穿戴6件传奇装备，对远古怪物击回提高100%[追随者可生效]",
        "37": "远古的坚硬：人物穿戴6件传奇装备，在远古地图护甲值提高50%[追随者可生效]",
        "38": "当你冰住怪的时候，你的血量回复，数值为智力的500倍[追随者可生效]",

    }

    if (job == 1) {
        item_name = getArrayItems(weapon1, 1)//随机一件传奇装备 
    } else if (job == 2) {
        item_name = getArrayItems(weapon2, 1)//随机一件传奇装备 
    } else {
        item_name = getArrayItems(weapon3, 1)//随机一件传奇装备 
    }

    h_death(item_name[0], qualityid, type, level, uselevel);

    //随机取属性
    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

    //属性计算
    function counting(x, level, ranx) {

        return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
    }
    function getArraydetail(itemarr, arrs, m_level, qualityid) {
        var temparr = [];
        temparr.push({});
        if (qualityid == 3) {
            var ranx = Math.random() * 0.2 + 1.3
        }
        if (qualityid == 2) {
            var ranx = Math.random() * 0.3 + 1.2
        }
        if (qualityid == 1) {
            var ranx = Math.random() * 0.3 + 1.1
        }
        if (qualityid == 0) {
            var ranx = Math.random() * 0.3 + 1
        }

        for (i = 0; i < arrs.length; i++) {
            switch (arrs[i]) {
                case "ll":
                    temparr[0].ll = counting(itemarr.LL, m_level, ranx)

                    break;
                case "mj":
                    temparr[0].mj = counting(itemarr.MJ, m_level, ranx)
                    break;
                case "zl":
                    temparr[0].zl = counting(itemarr.ZL, m_level, ranx)
                    break;
                case "tn":
                    temparr[0].tn = counting(itemarr.TN, m_level, ranx)
                    break;
                case "hj":
                    temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2)
                    break;
                case "damage":
                    temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx)
                    break;
                case "speed":
                    temparr[0].speed = itemarr.speed
                    break;
                case "damage_p":
                    temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "hp":
                    temparr[0].hp = counting(itemarr.hp, m_level, ranx)
                    break;
                case "hp_p":
                    temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "mp":
                    temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "mp_p":
                    temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "speed_p":
                    temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "attback":
                    temparr[0].attback = counting(itemarr.attback, m_level, ranx)
                    break;
                case "secmp":
                    temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                    break;
                case "resistance":
                    temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "crit":
                    temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "critdamage":
                    var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                    if (itemarr.type == 5) {
                        temparr[0].critdamage = critdamage_temp * 2.5
                    } else {
                        temparr[0].critdamage = critdamage_temp
                    }
                    break;
                case "ice":
                    temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "fire":
                    temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "ray":
                    temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "poison":
                    temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "lesslevel":
                    temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                    break;
            }
        }
        return temparr;
    }




    function h_death(item_name, qualityid, ratetype, m_level, uselevel) {
        var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
        var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "hp", "hp_p", "mp", "mp_p"] //武器
        var arr2 = ["hp", "hp_p", "mp", "mp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品
        if (ratetype < 13) {
            var item = global.item_results.find(person => person.name === item_name);

            if (item.type == 1) {
                var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
                arrs.push("speed", "damage")
            }
            if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
                var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
                arrs.push("hj")
            }
            if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
                var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
                // arrs.push("hj")
            }
            if (item.type == 2) {
                var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
            }
            if (item.job == 1) {
                arrs.push("ll", "tn")
            }
            if (item.job == 2) {
                arrs.push("mj", "tn")
            }
            if (item.job == 3) {
                arrs.push("zl", "tn")
            }

            var temparr2 = getArraydetail(item, arrs, m_level, qualityid)  //得到最终属性

            newitem(item, temparr2, qualityid, uselevel);

        } else if (ratetype < 99) {
            newitem2(item_name, ratetype, uselevel);
        } else {
            newitemdiamond(item_name, uselevel);
        }

    }

    //背包得到一件装备
    function newitem(item, temparr2, qualityid, level) {
        var query = new AV.Query(request.params.db_human);
        query.equalTo('user', request.currentUser);
        query.equalTo('firstpay', false);
        query.greaterThan('payed', 0);
        query.find().then(function (results) {
            var data2 = results.map(results => results.toJSON()) //从网络拿到数据
            if (data2.length > 0) {
                newitem_ok()
            } else {
                return response.error("不达条件！");
            }
        }, function (error) {
            return response.error("不达条件！");
        });
        function newitem_ok() {
            var cq_id;
            qualityid == 3 ? cq_id = Math.floor(Math.random() * 38 + 1) : cq_id = 0

                                                        
            if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                cq_id = Math.floor(Math.random() * 38 + 1)
            }
            
            if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                cq_id = Math.floor(Math.random() * 38 + 1)
            }
            
            if (cq_id == 14 || cq_id == 17 || cq_id == 21 || cq_id == 34 || cq_id == 35 || cq_id == 36 || cq_id == 37 || cq_id == 5 || cq_id == 20){
                if (Math.random() * 100 > 10){
                    var newlist = [1,2,3,4,6,7,8,9,10,11,12,13,5,16,18,19,22,23,24,25,26,27,28,29,30,31,32,33,38]
                    cq_id =  newlist[Math.floor(Math.random() * newlist.length)]
                }
            }

            if (cq_id == 31) {
                cq_id = 32
            }
            if (cq_id == 30) {
                var desc_text = legend[cq_id]
                desc_text = desc_text + Math.floor(Math.random() * 90 + 11) + '%[追随者可生效]'
            } else {
                var desc_text = legend[cq_id]
            }

            var TodoFolder = AV.Object.extend(request.params.db_bag);
            var todoFolder = new TodoFolder();
            todoFolder.set('name', item.name);
            var targetitem = AV.Object.createWithoutData('item', item.objectId);
            todoFolder.set('item', targetitem);
            todoFolder.set('cq_id', cq_id);
            todoFolder.set('fumo', 0);
            todoFolder.set('trad_times', 0);
            todoFolder.set('desc', desc_text);
            todoFolder.set('type', item.type);
            todoFolder.set('state', "背包");
            todoFolder.set('itemarr', temparr2);
            todoFolder.set('qualityid', qualityid);
            todoFolder.set('level', level);
            todoFolder.set('ident', qualityid > 2 ? false : true);
            todoFolder.set('price', Math.floor(item.price * (level / 5) * (qualityid + 1) * (Math.random() * 0.4 + 0.8)));
            todoFolder.set('user', request.currentUser);
            todoFolder.set('job', item.job);
            todoFolder.save().then(function (todo) {
                var TodoFolder = AV.Object.createWithoutData(request.params.db_human, request.params.objectId);
                TodoFolder.set('firstpay', true);
                TodoFolder.increment('gold', 2000000);
                TodoFolder.save().then(function (todo) {

                    var query1 = new AV.Query(request.params.db_diamond);
                    query1.equalTo('name', "拉玛兰迪礼物");
                    query1.equalTo('user', request.currentUser);
                    query1.find().then(function (results) {
                        var data22 = results.map(results => results.toJSON()) //从网络拿到数据
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data22[0].objectId);
                        todo.increment('num', 5);
                        todo.save().then(function (todo) {
                            return response.success(todo);
                        }, function (error) {
                            return response.error(error);
                        });
                    }, function (error) {
                        return response.error(error);
                    });
                }, function (error) {
                    return response.error(error);
                });
            }, function (error) {
                return response.error(error);
            });
        }
    }
    //背包得到一件其它物品
    function newitem2(item_name, ratetype, level) {
        var TodoFolder = AV.Object.extend(request.params.db_bag);
        var todoFolder = new TodoFolder();
        todoFolder.set('name', item_name);
        todoFolder.set('type', ratetype);
        todoFolder.set('state', "背包");
        todoFolder.set('level', level);
        todoFolder.set('user', request.currentUser);
        todoFolder.save().then(function (todo) {
            return response.success(todo);
        }, function (error) {
            return response.error(error);
        });
    }
    //背包得到一件宝石
    function newitemdiamond(item_name, m_level) {
        m_level > 40 ? 40 : m_level
        m_level = Math.floor(m_level / 10) + 1
        var dialevel = Math.floor(Math.random() * m_level + 1)
        if (dialevel > 2) {
            var diamond_rate = Math.random() * 100
            if (diamond_rate < 98) {
                dialevel -= 2
            }
        }
        var diamondnum = 1
        if (item_name != "拉玛兰迪礼物") {
            item_name = dialevel + "级" + item_name
            if (legendid == 1) {
                var odds = Math.floor(Math.random() * 100);
                if (odds < 50) {
                    diamondnum = 2;
                }
            }
        }

        var query = new AV.Query(request.params.db_diamond);
        query.equalTo('name', item_name);
        query.equalTo('user', request.currentUser);
        query.find().then(function (results) {
            var data = results.map(results => results.toJSON()) //从网络拿到数据
            if (data.length > 0) {
                var todo = AV.Object.createWithoutData(request.params.db_diamond, data[0].objectId);
                todo.increment('num', diamondnum);
                todo.save().then(function (todo) {
                    return response.success(todo);
                }, function (error) {
                    return response.error(error);
                });

            } else {
                var TodoFolder = AV.Object.extend(request.params.db_diamond);
                var todoFolder = new TodoFolder();
                todoFolder.set('name', item_name);
                todoFolder.increment('num', diamondnum);
                todoFolder.set('user', request.currentUser);
                todoFolder.save().then(function (todo) {
                    return response.success(todo);
                }, function (error) {
                    return response.error(error);
                });
            }


        }, function (error) {
            return response.error(error);
        });
    }

})




/**
 * 天天暗黑-装备物品
 */
AV.Cloud.define('takeon', function (request, response) {
    var query = new AV.Query(request.params.db_bag);
    query.equalTo('objectId', request.params.itemid);
    query.contains('state', '背包');
    query.equalTo('user', request.currentUser);
    query.find().then(function (results) {
        var data = results.map(results => results.toJSON()) //从网络拿到数据
        if (data.length > 0) {
            takeon(request, data)
        } else {
            return response.error("未得到数据");
        }
    }, function (error) {
        return response.error(error);
    });


    function takeon(request, datax) {
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
        var targetitem = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
        // var newitem_temp = todo.get(request.params.type)
        // console.log(newitem_temp)
        todo.fetch().then(function () {
            var newitem_temp = todo.get(request.params.type)
            //设置装备为穿戴
            todo.set(request.params.type, targetitem);
            todo.save().then(function (results) {
                var change = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
                change.set('state', '穿戴');
                change.save()

                if (newitem_temp) {
                    var changex = AV.Object.createWithoutData(request.params.db_bag, newitem_temp.id);
                    changex.set('state', '背包');
                    changex.save().then(function (data) {
                        if (updateinfos("human", request, datax)) {
                            return response.success("success");
                        } else {
                            return response.success("success");
                        }
                    }, function (error) {
                        return response.error(error);
                        console.log(error)
                    });
                } else {
                    if (updateinfos("human", request, datax)) {
                        return response.success("success");
                    } else {
                        return response.success("success");
                    }
                }

            }, function (error) {
                return response.error(error);
                console.log(error)
            });




        });

    }



});


/**
 * 天天暗黑-追随者装备物品
 */
AV.Cloud.define('takeon_follow', function (request, response) {
    var query = new AV.Query(request.params.db_bag);
    query.equalTo('objectId', request.params.itemid);
    query.contains('state', '背包');
    query.equalTo('user', request.currentUser);
    query.find().then(function (results) {
        var data = results.map(results => results.toJSON()) //从网络拿到数据
        if (data.length > 0) {
            takeon_follow(request, data)
        } else {
            return response.error("未得到数据");
        }
    }, function (error) {
        return response.error(error);
    });

    //装备上 	

    function takeon_follow(request, datax) {
        var todo = AV.Object.createWithoutData(request.params.db_follow, request.params.player);
        var targetitem = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);

        todo.fetch().then(function () {
            var newitem_temp = todo.get(request.params.type)
            //设置装备为穿戴
            todo.set(request.params.type, targetitem);
            todo.save().then(function (results) {
                var change = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
                change.set('state', '追随者');
                change.save()
                if (newitem_temp) {
                    var changex = AV.Object.createWithoutData(request.params.db_bag, newitem_temp.id);
                    changex.set('state', '背包');
                    changex.save().then(function (data) {
                        if (updateinfos("follow", request, datax)) {
                            return response.success("success");
                        } else {
                            return response.success("success");
                        }
                    }, function (error) {
                        return response.error(error);
                    });
                } else {
                    if (updateinfos("follow", request, datax)) {
                        return response.success("success");
                    } else {
                        return response.success("success");
                    }
                }
            }, function (error) {
                return response.error(error);
            });


        });

    }

});



/**
 * 天天暗黑-卸下物品
 */
AV.Cloud.define('takeoff', function (request, response) {
    var query = new AV.Query(request.params.db_human);
    var changeitem = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
    query.equalTo(request.params.itemx, changeitem);
    query.equalTo('user', request.currentUser);
    query.find().then(function (results) {
        var data = results.map(results => results.toJSON()) //从网络拿到数据
        if (data.length > 0) {
            takeoff(request)
            data = null;
        } else {
            return response.error("未得到数据");
        }
    }, function (error) {
        return response.error(error);
    });


    function takeoff(request) {

        var change = AV.Object.createWithoutData(request.params.db_human, request.params.player);
        change.set(request.params.itemx, null);
        change.save().then(function (data) {
            var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
            changex.set('state', '背包');
            changex.save().then(function (data) {
                if (updateinfos("human", request, 'takeoff')) {
                    return response.success("success");
                } else {
                    return response.success("success");
                }
            }, function (error) {
                return response.error(error);
            });
        }, function (error) {
            return response.error(error);
        });
    }

});

/**
 * 天天暗黑-卸下追随者物品
 */
AV.Cloud.define('takeoff_follow', function (request, response) {
    var query = new AV.Query(request.params.db_follow);
    var changeitem = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
    query.equalTo(request.params.itemx, changeitem);
    query.equalTo('user', request.currentUser);
    query.find().then(function (results) {
        var data = results.map(results => results.toJSON()) //从网络拿到数据
        if (data.length > 0) {
            takeoff_follow(request)
            data = null;
        } else {
            return response.error("未得到数据");
        }
    }, function (error) {
        return response.error(error);
    });

    function takeoff_follow(request) {

        var change = AV.Object.createWithoutData(request.params.db_follow, request.params.player);
        change.set(request.params.itemx, null);
        change.save().then(function (data) {
            var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
            changex.set('state', '背包');
            changex.save().then(function (data) {
                if (updateinfos("follow", request, 'takeoff')) {
                    return response.success("success");
                } else {
                    return response.success("success");
                }
            }, function (error) {
                return response.error(error);
            });
        }, function (error) {
            return response.error(error);
        });
    }

});


/**
 * 天天暗黑-打孔
 */
AV.Cloud.define('openkong', function (request, response) {
    var query = new AV.Query(request.params.db_diamond);
    query.equalTo('name', '拉玛兰迪礼物');
    query.greaterThan('num', 0);
    query.equalTo('user', request.currentUser);
    query.find().then(function (results) {
        var data = results.map(results => results.toJSON()) //从网络拿到数据
        if (data.length > 0) {
            var todo = AV.Object.createWithoutData(request.params.db_diamond, data[0].objectId);
            todo.increment('num', -1);
            todo.save().then(function (success) {
                openkong(request)
            }, function (error) {
                // 删除失败
            });
        } else {
            return response.error("没有打孔材料");
        }
    }, function (error) {

    });

    function openkong(request) {

        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            var amount = -(request.params.level * 10000);
            account.increment('gold', amount);
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('gold', -amount),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            // 保存成功

            var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
            changex.set(request.params.kong, '未镶嵌');
            changex.save().then(function (data) {

                var query = new AV.Query(request.params.db_bag);
                query.equalTo('objectId', request.params.objectId);
                query.equalTo('user', request.currentUser);
                query.find().then(function (results) {
                    var data = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data.length > 0) {
                        return response.success(data);
                    } else {
                        return response.error("未得到数据");
                    }
                }, function (error) {
                    return response.error(error);
                });
            }, function (error) {
                return response.error(error);
            });


        }).catch(function (error) {
            return response.error("金币不足" + request.params.level * 10000);
        });





    }

});


/**
 * 天天暗黑-镶嵌
 */
AV.Cloud.define('addkong1', function (request, response) {
    var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    changex.fetch().then(function () {
        var kongx = changex.get('kong1');
        if (kongx === undefined || kongx == '未镶嵌' || kongx === null) {
            // 保存成功
            var Account = AV.Object.extend(request.params.db_diamond);
            new AV.Query(Account).equalTo('name', request.params.diamond).equalTo('user', request.currentUser).first().then(function (account) {
                var amount = -1;
                account.increment('num', amount);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('num', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                changex.set("kong1", request.params.diamond);
                changex.save().then(function (data) {
                    return response.success("success");
                }, function (error) {
                    return response.error(error);
                });
            }).catch(function (error) {
                return response.error(error);
            });
        } else {
            return response.error("请先取下装备上宝石");
        }
    }, function (error) {
        return response.error(error);
    });


})

AV.Cloud.define('addkong2', function (request, response) {
    var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    changex.fetch().then(function () {
        var kongx = changex.get('kong2');
        if (kongx === undefined || kongx == '未镶嵌' || kongx === null) {
            // 保存成功
            var Account = AV.Object.extend(request.params.db_diamond);
            new AV.Query(Account).equalTo('name', request.params.diamond).equalTo('user', request.currentUser).first().then(function (account) {
                var amount = -1;
                account.increment('num', amount);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('num', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                changex.set("kong2", request.params.diamond);
                changex.save().then(function (data) {
                    return response.success("success");
                }, function (error) {
                    return response.error(error);
                });
            }).catch(function (error) {
                return response.error(error);
            });
        } else {
            return response.error("请先取下装备上宝石");
        }
    }, function (error) {
        return response.error(error);
    });







    // var Account = AV.Object.extend(request.params.db_human);
    // new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
    //     var amount = -(parseInt(request.params.diamond) * 10000);
    //     account.increment('gold', amount);
    //     return account.save(null, {
    //         query: new AV.Query(Account).greaterThanOrEqualTo('gold', -amount),
    //         fetchWhenSave: true,
    //     });
    // }).then(function (account) {
    //     // 保存成功
    //     var Account = AV.Object.extend(request.params.db_diamond);
    //     new AV.Query(Account).equalTo('name', request.params.diamond).equalTo('user', request.currentUser).first().then(function (account) {
    //         var amount = -1;
    //         account.increment('num', amount);
    //         return account.save(null, {
    //             query: new AV.Query(Account).greaterThanOrEqualTo('num', -amount),
    //             fetchWhenSave: true,
    //         });
    //     }).then(function (account) {
    //         // 保存成功
    //         var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    //         changex.set("kong2", request.params.diamond);
    //         changex.save().then(function (data) {
    //             return response.success("success");
    //         }, function (error) {
    //             return response.error(error);
    //         });
    //     }).catch(function (error) {
    //         return response.error(error);
    //     });

    // }).catch(function (error) {
    //     return response.error("金币不足" + parseInt(request.params.diamond) * 10000);
    // });



})

AV.Cloud.define('addkong3', function (request, response) {
    var changex = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    changex.fetch().then(function () {
        var kongx = changex.get('kong3');
        if (kongx === undefined || kongx == '未镶嵌' || kongx === null) {
            // 保存成功
            var Account = AV.Object.extend(request.params.db_diamond);
            new AV.Query(Account).equalTo('name', request.params.diamond).equalTo('user', request.currentUser).first().then(function (account) {
                var amount = -1;
                account.increment('num', amount);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('num', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                changex.set("kong3", request.params.diamond);
                changex.save().then(function (data) {
                    return response.success("success");
                }, function (error) {
                    return response.error(error);
                });
            }).catch(function (error) {
                return response.error(error);
            });
        } else {
            return response.error("请先取下装备上宝石");
        }
    }, function (error) {
        return response.error(error);
    });


})

/**
 * 天天暗黑-卸下宝石
 */
AV.Cloud.define('downkong1', function (request, response) {
    var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    todo.fetch().then(function () {
        var dianame = todo.get('kong1');
        todo.set('kong1', '未镶嵌');
        todo.save().then(function () {
            if (dianame != "未镶嵌") {
                var query = new AV.Query(request.params.db_diamond);
                query.equalTo('name', dianame);
                query.equalTo('user', request.currentUser);
                query.find().then(function (results) {
                    var data = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data.length > 0) {
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data[0].objectId);
                        todo.increment('num', 1);
                        todo.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    } else {
                        var TodoFolder = AV.Object.extend(request.params.db_diamond);
                        var todoFolder = new TodoFolder();
                        todoFolder.set('name', dianame);
                        todoFolder.increment('num', 1);
                        todoFolder.set('user', request.currentUser);
                        todoFolder.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    }
                }, function (error) {
                    return response.error(error);
                });

            } else {
                return response.error("提交太快");
            }


        }, function (error) {
            return response.error(error);
        });
    });
})

AV.Cloud.define('downkong2', function (request, response) {
    var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    todo.fetch().then(function () {
        var dianame = todo.get('kong2');

        todo.set('kong2', '未镶嵌');
        todo.save().then(function () {
            if (dianame != "未镶嵌") {

                var query = new AV.Query(request.params.db_diamond);
                query.equalTo('name', dianame);
                query.equalTo('user', request.currentUser);
                query.find().then(function (results) {
                    var data = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data.length > 0) {
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data[0].objectId);
                        todo.increment('num', 1);
                        todo.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    } else {
                        var TodoFolder = AV.Object.extend(request.params.db_diamond);
                        var todoFolder = new TodoFolder();
                        todoFolder.set('name', dianame);
                        todoFolder.increment('num', 1);
                        todoFolder.set('user', request.currentUser);
                        todoFolder.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    }
                }, function (error) {
                    return response.error(error);
                });
            } else {
                return response.error("提交太快");
            }



        }, function (error) {
            return response.error(error);
        });
    })
})
AV.Cloud.define('downkong3', function (request, response) {
    var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.itemid);
    todo.fetch().then(function () {
        var dianame = todo.get('kong3');

        todo.set('kong3', '未镶嵌');
        todo.save().then(function () {
            if (dianame != "未镶嵌") {

                var query = new AV.Query(request.params.db_diamond);
                query.equalTo('name', dianame);
                query.equalTo('user', request.currentUser);
                query.find().then(function (results) {
                    var data = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data.length > 0) {
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data[0].objectId);
                        todo.increment('num', 1);
                        todo.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    } else {
                        var TodoFolder = AV.Object.extend(request.params.db_diamond);
                        var todoFolder = new TodoFolder();
                        todoFolder.set('name', dianame);
                        todoFolder.increment('num', 1);
                        todoFolder.set('user', request.currentUser);
                        todoFolder.save().then(function (todo) {
                            return response.success("卸除宝石成功");
                        }, function (error) {
                            return response.error(error);
                        });
                    }
                }, function (error) {
                    return response.error(error);
                });
            } else {
                return response.error("提交太快");
            }



        }, function (error) {
            return response.error(error);
        });
    })
})

/**
 * 天天暗黑-合成
 */
AV.Cloud.define('diamond_hc', function (request, response) {
    if (parseInt(request.params.itemname) > 6) {
        return response.error("宝石等级错误");
    }
    var Account2 = AV.Object.extend(request.params.db_diamond);
    new AV.Query(Account2).equalTo('user', request.currentUser).equalTo('name', request.params.itemname).first().then(function (account2) {
        account2.increment('num', -3);
        return account2.save(null, {
            query: new AV.Query(Account2).greaterThanOrEqualTo('num', 3),
            fetchWhenSave: true,
        });
    }).then(function (account2) {

        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            var amount = -(parseInt(request.params.itemname) * parseInt(request.params.itemname) * 100000);
            account.increment('gold', amount);
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('gold', -amount),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            var query = new AV.Query(request.params.db_diamond);
            query.equalTo('name', parseInt(request.params.itemname) + 1 + request.params.itemname.replace(/\d+/g, ''));
            query.equalTo('user', request.currentUser);
            query.find().then(function (results) {
                var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                if (data2.length > 0) {
                    var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                    todo.increment('num', 1);
                    todo.save().then(function (todo) {
                        return response.success("合成宝石成功");
                    }, function (error) {
                        return response.error(error);
                    });
                } else {
                    var TodoFolder = AV.Object.extend(request.params.db_diamond);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', parseInt(request.params.itemname) + 1 + request.params.itemname.replace(/\d+/g, ''));
                    todoFolder.increment('num', 1);
                    todoFolder.set('user', request.currentUser);
                    todoFolder.save().then(function (todo) {
                        return response.success("合成宝石成功");
                    }, function (error) {
                        return response.error(error);
                    });
                }
            }, function (error) {
                return response.error(error);
            });
            // })
        }, function (error) {
            return response.error("金币不足" + parseInt(request.params.itemname) * parseInt(request.params.itemname) * 100000);
        });

    }, function (error) {
        return response.error("宝石不足3个");
    })
})


AV.Cloud.define('diamond_hcall', function (request, response) {
    if (parseInt(request.params.itemname) > 6) {
        return response.error("宝石等级错误");
    }
    var num = request.params.data.num - (request.params.data.num % 3)
    var numok = num / 3
    var amount = -(parseInt(request.params.itemname) * parseInt(request.params.itemname) * 100000 * num);
    var Account2 = AV.Object.extend(request.params.db_diamond);
    new AV.Query(Account2).equalTo('user', request.currentUser).equalTo('name', request.params.itemname).first().then(function (account2) {
        account2.increment('num', -num);
        return account2.save(null, {
            query: new AV.Query(Account2).greaterThanOrEqualTo('num', num),
            fetchWhenSave: true,
        });
    }).then(function (account2) {

        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.increment('gold', amount);
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('gold', -amount),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            var query = new AV.Query(request.params.db_diamond);
            query.equalTo('name', parseInt(request.params.itemname) + 1 + request.params.itemname.replace(/\d+/g, ''));
            query.equalTo('user', request.currentUser);
            query.find().then(function (results) {
                var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                if (data2.length > 0) {
                    var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                    todo.increment('num', numok);
                    todo.save().then(function (todo) {
                        return response.success("合成宝石成功");
                    }, function (error) {
                        return response.error(error);
                    });
                } else {
                    var TodoFolder = AV.Object.extend(request.params.db_diamond);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', parseInt(request.params.itemname) + 1 + request.params.itemname.replace(/\d+/g, ''));
                    todoFolder.increment('num', numok);
                    todoFolder.set('user', request.currentUser);
                    todoFolder.save().then(function (todo) {
                        return response.success("合成宝石成功");
                    }, function (error) {
                        return response.error(error);
                    });
                }
            }, function (error) {
                return response.error(error);
            });
            // })
        }, function (error) {
            return response.error("金币不足" + parseInt(request.params.itemname) * parseInt(request.params.itemname) * 100000 * num);
        });

    }, function (error) {
        return response.error("宝石不足3个");
    })
})

/**
 * 天天暗黑-sell
 */
AV.Cloud.define('sell', function (request, response) {
    var xueyan = (request.params.qualityid + 1) * (Math.floor(request.params.level * request.params.level / 4) + 1);
    //console.log(xueyan)
    if (xueyan > 5000) {
        console.log(xueyan + "作弊xueyan" + request.params.player)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    }
    var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
    todo.fetch().then(function () {
        var price = todo.get('price');
        if (price != undefined) {
            todo.destroy().then(function (success) {
                var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
                todo.increment('gold', price);
                todo.increment('xueyan', xueyan);
                todo.save().then(function () {
                    if (request.params.qualityid > 2) {
                        var chirenum = (Math.floor(request.params.level / 10) + 1)
                        if (request.params.qualityid == 4) {
                            chirenum = request.params.level / 2
                        }
                        var query = new AV.Query(request.params.db_diamond);
                        query.equalTo('user', request.currentUser);
                        query.equalTo('name', "炙热硫磺");
                        query.find().then(function (results) {
                            var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                            if (data2.length > 0) {
                                var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                                todo.increment('num', chirenum);
                                todo.save().then(function () {
                                    return response.success([xueyan, price]);
                                }, function (error) {
                                    return response.error("更新角色错误");
                                });
                            } else {
                                var TodoFolder = AV.Object.extend(request.params.db_diamond);
                                var todoFolder = new TodoFolder();
                                todoFolder.set('user', request.currentUser);
                                todoFolder.set('name', "炙热硫磺");
                                todoFolder.set('num', chirenum);
                                todoFolder.save().then(function () {
                                    return response.success([xueyan, price]);
                                }, function (error) {
                                    return response.error("更新角色错误");
                                });
                            }
                        })
                    } else {
                        return response.success([xueyan, price]);
                    }

                }, function (error) {
                    return response.error("更新角色错误");
                });



            }, function (error) {
                return response.error("装备分解错误");
            });
        } else {
            return response.error("未找到物品");
        }
    }, function (error) {
        return response.error(error);
    });
});


AV.Cloud.define('destroyall', function (request, response) {
    var query = new AV.Query(request.params.db_bag);
    query.equalTo('user', request.currentUser);
    query.equalTo('state', "背包");
    query.notEqualTo('lock', true);
    // query.equalTo('ident', true);
    query.equalTo('kong1', null);
    query.equalTo('kong2', null);
    query.equalTo('kong3', null);
    query.equalTo('qualityid', request.params.qualityid);
    query.limit(300)
    query.find().then(function (results) {
        var results = results.map(results => results.toJSON()) //从网络拿到数据
        query.destroyAll().then(function () {
            var xueyan = 0;
            var gold = 0;
            var chire = 0;
            for (var i = 0; i < results.length; i++) {
                xueyan += (results[i].qualityid + 1) * (Math.floor(results[i].level * results[i].level / 4) + 1);
                gold += results[i].price;
                if (results[i].qualityid == 3) {
                    chire += (Math.floor(results[i].level / 10) + 1)
                } else if (results[i].qualityid == 4) {
                    chire += results[i].level / 2
                }

            }
            var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
            todo.increment('gold', gold);
            todo.increment('xueyan', xueyan);
            todo.save().then(function () {

                var query = new AV.Query(request.params.db_diamond);
                query.equalTo('user', request.currentUser);
                query.equalTo('name', "炙热硫磺");
                query.find().then(function (results) {
                    var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data2.length > 0) {
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                        todo.increment('num', chire);
                        todo.save().then(function () {
                            return response.success([xueyan, gold]);
                        }, function (error) {
                            return response.error("没有炙热硫磺");
                        });
                    } else {
                        var TodoFolder = AV.Object.extend(request.params.db_diamond);
                        var todoFolder = new TodoFolder();
                        todoFolder.set('user', request.currentUser);
                        todoFolder.set('name', "炙热硫磺");
                        todoFolder.set('num', chire);
                        todoFolder.save().then(function () {
                            return response.success([xueyan, gold]);
                        }, function (error) {
                            return response.error("没有炙热硫磺");
                        });
                    }
                })



            }, function (error) {
                return response.error("更新角色错误");
            });

        }, function (error) {
            return response.error("装备删除错误");

        });

    }, function (error) {
        return response.error("装备删除错误");

    });

});

/**
 * 天天暗黑-鉴定request.params.objectId
 */
AV.Cloud.define('opencq', function (request, response) {
    var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
    todo.fetch().then(function () {
        var gold = todo.get('gold');
        if (gold >= request.params.level * 100000) {
            todo.increment('gold', -request.params.level * 100000);
            todo.save().then(function () {

                var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
                todo.set('ident', true);
                todo.save().then(function () {
                    return response.success("鉴定成功");
                }, function (error) {
                    return response.error("鉴定失败");
                });

            }, function (error) {
                return response.error("更新角色错误");
            });
        } else {
            return response.error("金币不够");
        }
    }, function (error) {
        return response.error(error);
    });
});

AV.Cloud.define('opencqall', function (request, response) {
    var db_rate = request.params.db_rate !== undefined ? request.params.db_rate : 1
    var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
    todo.fetch().then(function () {
        var gold = todo.get('diamond');
        if (gold >= (5 * db_rate)) {
            todo.increment('diamond', -(5 * db_rate));
            todo.save().then(function () {

                var query = new AV.Query(request.params.db_bag);
                query.equalTo('user', request.currentUser);
                query.equalTo('state', "背包");
                query.equalTo('ident', false);
                query.equalTo('qualityid', 3);
                query.limit(300)
                query.find().then(function (results) {
                    results.map(function (obj) {
                        obj.set('ident', true)
                    })
                    return AV.Object.saveAll(results)
                }).then(function (results) {
                    // 更新成功
                    return response.success(results);
                }, function (error) {
                    // 异常处理
                    return response.error(error);
                })


            }, function (error) {
                return response.error("更新角色错误");
            });
        } else {
            return response.error("白金币不够");
        }
    }, function (error) {
        return response.error(error);
    });
});

/**
 * 天天暗黑-鉴定套装request.params.objectId
 */
AV.Cloud.define('opencq2', function (request, response) {
    var todo = AV.Object.createWithoutData(request.params.db_human, request.params.player);
    todo.fetch().then(function () {
        var gold = todo.get('gold');
        if (gold >= request.params.level * 100000) {
            todo.increment('gold', -request.params.level * 100000);
            todo.save().then(function () {

                var query = new AV.Query(request.params.db_diamond);
                query.equalTo('user', request.currentUser);
                query.equalTo('name', "炙热硫磺");
                query.greaterThanOrEqualTo('num', request.params.level);
                query.find().then(function (results) {
                    var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data2.length > 0) {
                        var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                        todo.increment('num', -(request.params.level));
                        todo.save().then(function (results) {
                            var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.objectId);
                            todo.set('ident', true);
                            todo.save().then(function () {
                                return response.success("鉴定成功");
                            }, function (error) {
                                return response.error("鉴定失败");
                            });

                        }, function (error) {
                            return response.error("鉴定失败");
                        });
                    } else {
                        return response.error("材料不够");
                    }
                }, function (error) {
                    return response.error("鉴定失败");
                });


            }, function (error) {
                return response.error("更新角色错误");
            });
        } else {
            return response.error("金币不够");
        }
    }, function (error) {
        return response.error(error);
    });
});


/**
 * 天天暗黑-更换追随者
 */
AV.Cloud.define('buy1', function (request, response) {
    var db_rate = 1
    if (request.params.db_place == 'normal') {
        db_rate = 1
    } else {
        db_rate = 30
    }

    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        var amount = -100000 * db_rate;
        account.increment('diamond', amount);
        account.increment('diamond_1', amount);
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var morenname = (request.params.selectedIndex + 1) == 1 ? "圣殿骑士" : (request.params.selectedIndex + 1) == 2 ? "盗贼" : "巫女"
        var todo = AV.Object.createWithoutData(request.params.db_follow, request.params.followid);
        todo.set('job', (request.params.selectedIndex + 1));
        todo.set('name', (request.params.follow_name != '' ? request.params.follow_name : morenname));
        todo.save().then(function (results) {
            return response.success("转换成功");
        }, function (error) {
            return response.error(error);
        });
    }).catch(function (error) {
        return response.error("白金币不足");
    });
});


/**
 * 天天暗黑-商店购买离线时间
 */
AV.Cloud.define('buy2', function (request, response) {
    var db_rate = 1
    if (request.params.db_place == 'normal') {
        db_rate = 1
    } else {
        db_rate = 30
    }
    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        var amount = -20000 * db_rate;
        account.increment('diamond', amount);
        account.increment('diamond_1', amount);
        account.increment('dobuleexp', 12);
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        return response.success("购买成功");
    }).catch(function (error) {
        return response.error("白金币不足");
    });
});
/**
 * 天天暗黑-商店购买硫磺
 */
AV.Cloud.define('buy3', function (request, response) {
    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊b3" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {


        if (request.params.buynum > (100 - request.params.limit[1])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[1] = parseInt(request.params.limit[1]) + parseInt(request.params.buynum)
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = -200 * request.params.buynum;
                account.increment('diamond', amount);
                account.increment('diamond_1', amount);
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                var query2 = new AV.Query(request.params.db_diamond);
                query2.equalTo('user', request.currentUser);
                query2.equalTo('name', "炙热硫磺");
                query2.find().then(function (results) {
                    var data2 = results.map(function (results) {
                        return results.toJSON();
                    })
                    var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                    todo.increment('num', parseInt(request.params.buynum));
                    todo.save().then(function () {
                        return response.success("购买成功");
                    });
                })

            }).catch(function (error) {
                return response.error("白金币或可购数量不足");
            });
        }
    }
})

AV.Cloud.define('buy4', function (request, response) {

    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊4b" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {


        if (request.params.buynum > (50 - request.params.limit[2])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[2] = parseInt(request.params.limit[2]) + parseInt(request.params.buynum)
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = -4000 * request.params.buynum;
                account.increment('diamond', amount);
                account.increment('diamond_1', amount);
                account.increment('xueyan', (request.params.buynum * 200000));
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                return response.success("购买成功");
            }).catch(function (error) {
                return response.error("白金币或可购数量不足");
            });
        }
    }
})

AV.Cloud.define('buy5', function (request, response) {
    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊b5" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {


        if (request.params.buynum > (50 - request.params.limit[3])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[3] = parseInt(request.params.limit[3]) + parseInt(request.params.buynum)
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = -2000 * request.params.buynum;
                account.increment('diamond', amount);
                account.increment('diamond_1', amount);
                account.increment('keys', parseInt(request.params.buynum));
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                return response.success(account.get('keys'));
            }).catch(function (error) {
                return response.error("白金币或可购数量不足");
            });
        }
    }
})


AV.Cloud.define('buy6', function (request, response) {
    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊b6" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {


        if (request.params.buynum > (50 - request.params.limit[4])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[4] = parseInt(request.params.limit[4]) + parseInt(request.params.buynum)
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = -10000 * request.params.buynum;
                account.increment('diamond', amount);
                account.increment('diamond_1', amount);
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                var query2 = new AV.Query(request.params.db_diamond);
                query2.equalTo('user', request.currentUser);
                query2.equalTo('name', "拉玛兰迪礼物");
                query2.find().then(function (results) {
                    var data2 = results.map(function (results) {
                        return results.toJSON();
                    })
                    var todo = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                    todo.increment('num', parseInt(request.params.buynum));
                    todo.save().then(function () {
                        return response.success("购买成功");
                    });

                })
            }).catch(function (error) {
                return response.error("白金币或可购数量不足");
            });
        }
    }
})




AV.Cloud.define('buy7', function (request, response) {
    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊b7" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {
        if (request.params.buynum > (50 - request.params.limit[5])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[5] = parseInt(request.params.limit[5]) + parseInt(request.params.buynum)

            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = -2000 *  request.params.buynum;
                account.increment('diamond', amount);
                account.increment('diamond_1', amount);
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {

                var diamondss = [0, 0, 0, 0, 0]
                for (var i = 0; i < request.params.buynum; i++) {
                    var odds = Math.floor(Math.random() * 5);
                    diamondss[odds] += 1
                }
                var Account = AV.Object.extend(request.params.db_diamond);
                if (diamondss[0] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级紫宝石").first().then(function (account) {
                        account.increment('num', diamondss[0]);
                        return account.save();
                    })
                }
                if (diamondss[1] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级黄宝石").first().then(function (account) {
                        account.increment('num', diamondss[1]);
                        return account.save();
                    })
                }
                if (diamondss[2] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级红宝石").first().then(function (account) {
                        account.increment('num', diamondss[2]);
                        return account.save();
                    })
                }
                if (diamondss[3] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级绿宝石").first().then(function (account) {
                        account.increment('num', diamondss[3]);
                        return account.save();
                    })
                }
                if (diamondss[4] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级钻石").first().then(function (account) {
                        account.increment('num', diamondss[4]);
                        return account.save();
                    })
                }
                return response.success(diamondss);


            }).catch(function (error) {
                return response.error("白金币或可购数量不足");
            });

        }
    }
})

AV.Cloud.define('buy8', function (request, response) {
    if (request.params.amount >= 0) {
        console.log(request.params.amount + "作弊b8" + request.params.db_human)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {


        if (request.params.buynum > (50 - request.params.limit[5])) {
            return response.error("超出可购数量");
        } else {
            var limit = []
            limit.push(request.params.limit[0]);
            limit.push(request.params.limit[1]);
            limit.push(request.params.limit[2]);
            limit.push(request.params.limit[3]);
            limit.push(request.params.limit[4]);
            limit.push(request.params.limit[5]);
            limit[5] = parseInt(request.params.limit[5]) + parseInt(request.params.buynum)

            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).equalTo('limit', request.params.limit).first().then(function (account) {
                var amount = request.params.amount;
                account.increment('gold', amount);
                account.set('limit', limit);
                return account.save(null, {
                    query: new AV.Query(Account).greaterThanOrEqualTo('gold', -amount),
                    fetchWhenSave: true,
                });
            }).then(function (account) {

                var diamondss = [0, 0, 0, 0, 0]
                for (var i = 0; i < request.params.buynum; i++) {
                    var odds = Math.floor(Math.random() * 5);
                    diamondss[odds] += 1
                }
                var Account = AV.Object.extend(request.params.db_diamond);
                if (diamondss[0] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级紫宝石").first().then(function (account) {
                        account.increment('num', diamondss[0]);
                        return account.save();
                    })
                }
                if (diamondss[1] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级黄宝石").first().then(function (account) {
                        account.increment('num', diamondss[1]);
                        return account.save();
                    })
                }
                if (diamondss[2] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级红宝石").first().then(function (account) {
                        account.increment('num', diamondss[2]);
                        return account.save();
                    })
                }
                if (diamondss[3] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级绿宝石").first().then(function (account) {
                        account.increment('num', diamondss[3]);
                        return account.save();
                    })
                }
                if (diamondss[4] > 0) {
                    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', "1级钻石").first().then(function (account) {
                        account.increment('num', diamondss[4]);
                        return account.save();
                    })
                }
                return response.success(diamondss);


            }).catch(function (error) {
                return response.error("金币或可购数量不足");
            });

        }
    }
})

/**
 * 天天暗黑-领取推广
 */
AV.Cloud.define('get_weloking', function (request, response) {
    var Account = AV.Object.extend('welcome');
    new AV.Query(Account).equalTo('objectId', request.params.wel_id).first().then(function (account) {
        account.set('state', true);
        account.increment('price', 0);
        return account.save(null, {
            query: new AV.Query(Account).equalTo('state', false),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.hum_id);
        todo.increment('diamond', Math.floor(account.get('price') * 0.05));
        todo.increment('diamond_1', Math.floor(account.get('price') * 0.05));
        todo.save().then(function (todo2) {
            return response.success("领取成功");
        }, function (error) {
            return response.error(error);
        });

    }).catch(function (error) {
        return response.error("已经领取过");
    });
})


/**
 * 天天暗黑-卡密充值
 */
AV.Cloud.define('usecard', function (request, response) {
    var query = new AV.Query('cards');
    query.equalTo('card_id', request.params.cardid);
    query.equalTo('card_password', request.params.cardpass);
    query.equalTo('state', false);
    query.find().then(function (results) {
        var data2 = results.map(function (results) {
            return results.toJSON();
        })
        if (data2.length > 0) {
            var Account = AV.Object.extend('cards');
            new AV.Query(Account).equalTo('objectId', data2[0].objectId).first().then(function (account) {
                account.set('state', true);
                account.set('user', request.currentUser);
                return account.save(null, {
                    query: new AV.Query(Account).equalTo('state', false),
                    fetchWhenSave: true,
                });
            }).then(function (account) {
                var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
                todo.increment('diamond', data2[0].price * 10);
                todo.increment('diamond_1', data2[0].price * 10);
                todo.increment('payed', data2[0].price);
                if (data2[0].price > 499) {
                    getdiamonds(100)
                    todo.increment('gold', 500000000);
                } else if (data2[0].price > 199) {
                    getdiamonds(30)
                    todo.increment('gold', 100000000);
                } else if (data2[0].price > 99) {
                    getdiamonds(10)
                    todo.increment('gold', 10000000);
                }
                todo.save().then(function (todo2) {
                    return response.success(data2[0].price * 10);
                }, function (error) {
                    return response.error(error);
                });

                var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
                todo.fetch().then(function () {
                    var welcomeuser = todo.get('welcome');
                    var name = todo.get('name');
                    if (welcomeuser != undefined && welcomeuser != request.params.human_objectId) {
                        var TodoFolder = AV.Object.extend('welcome');
                        var todoFolder = new TodoFolder();
                        todoFolder.set('who', name);
                        todoFolder.set('state', false);
                        todoFolder.set('welcomeuser', welcomeuser);
                        todoFolder.set('price', data2[0].price * 10);
                        todoFolder.save();
                    }
                })

            }).catch(function (error) {
                return response.error("卡密被使用");
            });
        } else {
            return response.error("输入错误或者卡密被使用");
        }
    }, function (error) {
        return response.error(error);
    });

    function getdiamonds(num) {
        var temp_diamond = ["1级钻石", "1级绿宝石", "1级红宝石", "1级黄宝石", "1级紫宝石"]
        var index = Math.floor((Math.random() * temp_diamond.length));
        var query1 = new AV.Query(request.params.db_diamond);
        query1.equalTo('name', temp_diamond[index]);
        query1.equalTo('user', request.currentUser);
        query1.find().then(function (results) {
            var data22 = results.map(function (results) {
                return results.toJSON();
            })
            var todo = AV.Object.createWithoutData(request.params.db_diamond, data22[0].objectId);
            todo.increment('num', num);
            todo.save();
        });
    }
})

/**
 * 天天暗黑-交易收款
 */
AV.Cloud.define('takediamond', function (request, response) {
    var Account = AV.Object.extend(request.params.db_trad);
    new AV.Query(Account).equalTo('objectId', request.params.data_2_objectId).first().then(function (account) {
        account.set('state', '已收款');
        account.increment('price', 0);
        return account.save(null, {
            query: new AV.Query(Account).equalTo('state', '已出售'),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var newtax = account.get('price')
        newtax = Math.floor(newtax * 0.95) 
        if (newtax < 1){
            newtax = 1
        }
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectid);
        todo.increment('diamond', newtax);
        todo.increment('diamond_1', newtax);
        todo.save().then(function (todo) {
            return response.success("收款成功");
        }, function (error) {
            return response.error("收款失败");
        });
    }).catch(function (error) {
        return response.error("此装备已收款");
    });

})
/**
 * 天天暗黑-交易上架
 */

AV.Cloud.define('shangjia', function (request, response) {
    //白金币修改
    var item = request.params.item
    if (request.params.tax < 0 || request.params.price <= 0) {
        console.log(request.params.price + "作弊shangjia" + request.params.tax)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {
        if ((item.kong1 != "未镶嵌" && item.kong1 != undefined) || (item.kong2 != "未镶嵌" && item.kong2 != undefined) || (item.kong3 != "未镶嵌" && item.kong3 != undefined)) {
            return response.error('请把宝石取下！');
        } else {
            var days = 2;
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
                var humalevel = account.get('level')
                var amount = -request.params.tax;//补偿-request.params.tax
                if ((humalevel - item.level) >= 20) {
                    amount = -1
                    days = 4;
                }
                // account.increment('diamond', amount);
                // account.increment('diamond_1', amount);
                // return account.save(null, {
                //     query: new AV.Query(Account).greaterThanOrEqualTo('diamond', -amount),
                //     fetchWhenSave: true,
                // });
            }).then(function (account) {

                //背包修改
                var Account2 = AV.Object.extend(request.params.db_bag);
                new AV.Query(Account2).equalTo('objectId', item.objectId).equalTo('user', request.currentUser).first().then(function (account2) {
                    account2.set('state', '交易');
                    return account2.save(null, {
                        query: new AV.Query(Account2).contains('state', '背包'),
                        fetchWhenSave: true,
                    });
                }).then(function (account2) {
                    //上架
                    var nowtime = new Date()
                    var trad_time = (nowtime.getTime()) + (1000 * 3600 * 24 * days)
                    var TodoFolder = AV.Object.extend(request.params.db_trad);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', item.name);
                    todoFolder.set('state', '交易中');
                    todoFolder.set('type', item.type);
                    todoFolder.set('level', item.level);
                    todoFolder.set('fumo', item.fumo);
                    todoFolder.set('ident', item.ident);
                    todoFolder.set('job', item.job);
                    todoFolder.set('qualityid', item.qualityid);
                    todoFolder.set('itemarr', item.itemarr);
                    todoFolder.set('user', request.currentUser);
                    todoFolder.set('itemid', item.objectId);
                    todoFolder.set('kong1', item.kong1);
                    todoFolder.set('kong2', item.kong2);
                    todoFolder.set('kong3', item.kong3);
                    todoFolder.set('desc', (item.qualityid == 3 || item.qualityid == 4) ? item.desc : '');
                    if (item.cq_id2 > 0) {
                        todoFolder.set('desc2', item.desc2);
                    }
                    todoFolder.set('price', parseInt(request.params.price));
                    todoFolder.set('time', trad_time);
                    todoFolder.set('bag', request.params.db_bag);
                    todoFolder.save().then(function (todo) {
                        return response.success("上架时间" + days + "天");
                    }, function (error) {
                        return response.error(error);
                    });
                }).catch(function (error) {
                    return response.error(error);
                });
            }).catch(function (error) {
                console.log(request.currentUser + "作弊shangjia" + request.params.db_human)
                var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
                todo.set('band', true);
                todo.save().then(function () {
                    return response.error('非法操作，封禁处理');
                })
            });
        }
    }
})

/**
 * 天天暗黑-交易下架
 */
AV.Cloud.define('xiajia', function (request, response) {
    var data_2 = request.params.data_2;
    var Account = AV.Object.extend(request.params.db_trad);
    new AV.Query(Account).equalTo('objectId', data_2.objectId).first().then(function (account) {
        account.set('state', '已下架');
        return account.save(null, {
            query: new AV.Query(Account).equalTo('state', '交易中'),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var todo = AV.Object.createWithoutData(request.params.db_bag, data_2.itemid);
        todo.set('state', '背包');
        todo.save().then(function (todo) {
            return response.success("下架成功");
        }, function (error) {
            return response.error('此装备已下架或已出售');
        });
    }).catch(function (error) {
        return response.error('此装备已下架或已出售');

    });

})


/**
 * 天天暗黑-购买物品
 */
AV.Cloud.define('trad_buy', function (request, response) {
    if (request.params.data_price <= 0) {
        console.log(request.currentUser + "作弊trad_buy" + request.params.data_price)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {

        var Account = AV.Object.extend(request.params.db_trad);
        new AV.Query(Account).equalTo('objectId', request.params.data_objectId).first().then(function (account) {
            account.set('state', '已出售');
            account.set('buyer', request.currentUser);
            return account.save(null, {
                query: new AV.Query(Account).equalTo('state', '交易中'),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            var itemprice = account.get("price")
            var itembag = account.get("bag")

            if (request.params.data_price != itemprice) {
                console.log(request.currentUser + "作弊trad_buy" + request.params.data_price)
                var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
                todo.set('band', true);
                todo.save().then(function () {
                    return response.error('非法操作，封禁处理');
                })
            }
            var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
            todo.increment('diamond', -itemprice);
            todo.increment('diamond_1', -itemprice);
            todo.save()

            if (itembag == request.params.db_bag || itembag === undefined) {
                var todo2 = AV.Object.createWithoutData(request.params.db_bag, request.params.data_itemid);
                todo2.set('state', '背包');
                todo2.increment('trad_times', 1);
                todo2.set('user', request.currentUser);
                todo2.save().then(function (todo2) {
                    return response.success("购买成功");
                }, function (error) {
                    return response.error(error);
                });
            } else {
                var query = new AV.Query(itembag);
                query.equalTo('objectId', request.params.data_itemid);
                query.find().then(function (results) {
                    var data2 = results.map(function (results) {
                        return results.toJSON();
                    })
                    var TodoFolder = AV.Object.extend(request.params.db_bag);
                    var todoFolder = new TodoFolder();
                    todoFolder.set('name', data2[0].name);
                    todoFolder.set('item', data2[0].item);
                    todoFolder.set('cq_id', data2[0].cq_id);
                    if (data2[0].cq_id2 > 0) {
                        todoFolder.set('cq_id2', data2[0].cq_id2);
                        todoFolder.set('desc2', data2[0].desc2);
                    }
                    todoFolder.set('trad_times', (data2[0].trad_times + 1));
                    todoFolder.set('fumo', data2[0].fumo);
                    todoFolder.set('desc', data2[0].desc);
                    todoFolder.set('type', data2[0].type);
                    todoFolder.set('state', "背包");
                    todoFolder.set('itemarr', data2[0].itemarr);
                    todoFolder.set('itemarr_fumo', data2[0].itemarr_fumo);
                    todoFolder.set('qualityid', data2[0].qualityid);
                    todoFolder.set('green', data2[0].green);
                    todoFolder.set('level', data2[0].level);
                    todoFolder.set('ident', data2[0].ident);
                    todoFolder.set('price', data2[0].price);
                    todoFolder.set('user', request.currentUser);
                    todoFolder.set('job', data2[0].job);
                    todoFolder.set('kong1', data2[0].kong1);
                    todoFolder.set('kong2', data2[0].kong2);
                    todoFolder.set('kong3', data2[0].kong3);
                    todoFolder.save().then(function (todo) {
                        return response.success("购买成功");
                        var todo = AV.Object.createWithoutData(itembag, request.params.data_itemid);
                        todo.destroy();
                    }, function (error) {
                        return response.error(error);
                    });

                }, function (error) {
                    return response.error(error);
                });
            }

        }).catch(function (error) {
            return response.error('此装备已出售');

        });
    }
})



/**
 * 天天暗黑-购买翅膀
 */
AV.Cloud.define('buyflying', function (request, response) {
    var price = 0
    var nowtime = new Date()
    var fly_time = (nowtime.getTime()) + (30 * 1000 * 3600 * 24)

    if (request.params.db_place == 'normal') {
        price = request.params.flytype == '大' ? 750000 : 90000
    } else {
        price = request.params.flytype == '大' ? 750000 : 90000
    }
    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        account.increment('diamond', -price);
        account.increment('diamond_1', -price);
        account.set('fly', request.params.e);
        account.set('fly_data', fly_time)
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('diamond', price),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        return response.success(price);
    }).catch(function (error) {
        return response.error('白金币不足！');
    });
})


/**
 * 天天暗黑-附魔
 */
AV.Cloud.define('checkfumo', function (request, response) {
    var data = request.params.data
    var newprice = (data.qualityid + 1) * (Math.floor(data.level * data.level / 3) + 1) * Math.pow(2, (request.params.fumo_temp + 1))
    if (request.params.fumo_price <= 0 || request.params.fumo_temp < 0 || newprice != request.params.fumo_price) {
        console.log(human_objectId + "作弊checkfumo" + request.params.fumo_price)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
        todo.set('band', true);
        todo.save().then(function () {
            return response.success("非法操作，封禁处理");
        })
    } else {

        // var checkodd = Math.floor(Math.random() * 10)
        // if (checkodd < 10) {
        //     var todo = AV.Object.createWithoutData(request.params.db_bag, data.objectId);
        //     todo.fetch().then(function () {
        //         var fumo = todo.get('fumo');
        //         if (fumo != request.params.fumo_temp) {
        //             console.log(request.currentUser + "作弊checkfumo")
        //             var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
        //             todo.set('band', true);
        //             todo.save().then(function () {
        //                 return response.success("非法操作，封禁处理");
        //             })
        //         }
        //     }, function (error) {
        //         // 异常处理
        //     });
        // }
        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.increment('xueyan', -request.params.fumo_price);
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('xueyan', request.params.fumo_price),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            var changex = AV.Object.createWithoutData(request.params.db_bag, data.objectId);
            changex.increment("fumo", 1);
            changex.save()

            return response.success(account.get('xueyan'));
        }).catch(function (error) {

            return response.error('血岩碎片不够');

        });
    }

})



/**
 * 天天暗黑-附魔new
 */
AV.Cloud.define('fumo_new_save', function (request, response) {
    var query = new AV.Query(request.params.db_bag);
    query.get(request.params.data.objectId).then(function (todo) {

        var itemarr_fumo = todo.get('itemarr_fumo');
        var itemarr = todo.get('itemarr');
        var level = todo.get('level');
        level = itemarr_fumo[0].lesslevel !== undefined ? (level + (itemarr[0].lesslevel !== undefined ? itemarr[0].lesslevel : 0) - (itemarr_fumo[0].lesslevel !== undefined ? itemarr_fumo[0].lesslevel : 0)) : (level + (itemarr[0].lesslevel !== undefined ? itemarr[0].lesslevel : 0))
        var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.data.objectId);
        todo.set('itemarr', itemarr_fumo);
        todo.set('level', level);
        todo.save().then(function (todo) {
            return response.success('保存成功');
        }, function (error) {
            // 异常处理
            return response.error(error);
        });
    }, function (error) {
        // 异常处理
        return response.error(error);
    });
})
/**
 * 天天暗黑-附魔new
 */
AV.Cloud.define('fumo_new', function (request, response) {
    var name = request.params.item.name
    var isyg = false;
    if (name.indexOf("★") != -1) {
        name = name.replace("远古", "")
        name = name.replace("★", "")
        isyg = true;
    } else if (name.indexOf("远古") != -1) {
        name = name.replace("远古", "")
        isyg = true;
    }


    var item = global.item_results.find(person => person.name === name);
    var qualityid = 0
    var level = 1
    var olditemarr = []
    var query = new AV.Query(request.params.db_bag);
    query.get(request.params.data.objectId).then(function (todo) {
        qualityid = todo.get('qualityid');
        level = todo.get('level');
        olditemarr = todo.get('itemarr');
        if (olditemarr[0].lesslevel !== undefined) {
            h_death(item, qualityid, level + olditemarr[0].lesslevel)
        } else {
            h_death(item, qualityid, level)
        }

    }, function (error) {
        // 异常处理
        return response.error(error);
    });

    var human_objectId = request.params.human_objectId
    function h_death(item, qualityidx, m_level) {
        var qualityid = qualityidx
        if (qualityidx == 4) {
            qualityid = 3
        }
        var arr0 = ["hp", "hp_p", "mp", "mp_p", "attback", "secmp", "resistance", "ice", "fire", "ray", "poison"] //防具
        var arr1 = ["damage_p", "speed_p", "attback", "crit", "critdamage", "ice", "fire", "ray", "poison"] //武器
        var arr2 = ["hp", "hp_p", "attback", "resistance", "ice", "fire", "ray", "poison", "crit", "critdamage"] //饰品

        var levelrate = Math.floor(Math.random() * 100)//降等属性
        if (levelrate < 30 && m_level > 5 && isyg == false) {
            arr0.push("lesslevel");
            arr1.push("lesslevel");
            arr2.push("lesslevel");
        }

        if (item.type == 1) {
            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
            arrs.push("speed", "damage")
        }
        if ((item.type > 2 && item.type < 13 && item.type != 11 && item.type != 12 && item.type != 5) || item.type == 0) {
            var arrs = getArrayItems(arr0, qualityid + 1);  //随机取属性列表
            arrs.push("hj")
        }
        if (item.type > 2 && item.type < 13 && (item.type == 11 || item.type == 12 || item.type == 5)) {
            var arrs = getArrayItems(arr2, qualityid + 1);  //随机取属性列表
            // arrs.push("hj")
        }
        if (item.type == 2) {
            var arrs = getArrayItems(arr1, qualityid + 1);  //随机取属性列表
        }
        if (item.job == 1) {
            arrs.push("ll", "tn")
        }
        if (item.job == 2) {
            arrs.push("mj", "tn")
        }
        if (item.job == 3) {
            arrs.push("zl", "tn")
        }


        if (isyg == true) {
            var temparr2 = getArraydetail_yg(item, arrs, 60, request.params.data.itemarr[0].level ? request.params.data.itemarr[0].level : 1, qualityid)  //远古
        } else {
            var temparr2 = getArraydetail(item, arrs, m_level, qualityid)  //得到最终属性
        }


        var todo = AV.Object.createWithoutData(request.params.db_bag, request.params.data.objectId);
        todo.set('itemarr_fumo', temparr2);
        todo.save();
        return response.success(temparr2);

    }
    function getArraydetail(itemarr, arrs, m_level, qualityid) {
        var temparr = [];
        temparr.push({});
        if (qualityid == 3) {
            var ranx = Math.random() * 0.2 + 1.3
        }
        if (qualityid == 2) {
            var ranx = Math.random() * 0.2 + 1.2
        }
        if (qualityid == 1) {
            var ranx = Math.random() * 0.2 + 1.1
        }
        if (qualityid == 0) {
            var ranx = Math.random() * 0.2 + 1
        }

        for (i = 0; i < arrs.length; i++) {
            switch (arrs[i]) {
                case "ll":
                    temparr[0].ll = counting(itemarr.LL, m_level, ranx)

                    break;
                case "mj":
                    temparr[0].mj = counting(itemarr.MJ, m_level, ranx)
                    break;
                case "zl":
                    temparr[0].zl = counting(itemarr.ZL, m_level, ranx)
                    break;
                case "tn":
                    temparr[0].tn = counting(itemarr.TN, m_level, ranx)
                    break;
                case "hj":
                    temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2)
                    break;
                case "damage":
                    temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx)
                    break;
                case "speed":
                    temparr[0].speed = itemarr.speed
                    break;
                case "damage_p":
                    temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "hp":
                    temparr[0].hp = counting(itemarr.hp, m_level, ranx)
                    break;
                case "hp_p":
                    temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "mp":
                    temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "mp_p":
                    temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "speed_p":
                    temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "attback":
                    temparr[0].attback = counting(itemarr.attback, m_level, ranx)
                    break;
                case "secmp":
                    temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                    break;
                case "resistance":
                    temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "crit":
                    temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 10 + 6) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "critdamage":
                    var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                    if (itemarr.type == 5) {
                        temparr[0].critdamage = critdamage_temp * 2.5
                    } else {
                        temparr[0].critdamage = critdamage_temp
                    }
                    break;
                case "ice":
                    temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "fire":
                    temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "ray":
                    temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "poison":
                    temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "lesslevel":
                    temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                    break;
            }
        }
        return temparr;
    }


    function getArraydetail_yg(itemarr, arrs, m_level, yglevel, qualityid) {
        var temparr = [];
        temparr.push({});
        var ygnum = 1 + (yglevel / 3)
        if (qualityid == 3) {
            var ranx = Math.random() * 0.2 + 1.3
        }
        if (qualityid == 2) {
            var ranx = Math.random() * 0.3 + 1.2
        }
        if (qualityid == 1) {
            var ranx = Math.random() * 0.3 + 1.1
        }
        if (qualityid == 0) {
            var ranx = Math.random() * 0.3 + 1
        }

        for (i = 0; i < arrs.length; i++) {
            switch (arrs[i]) {
                case "ll":
                    temparr[0].ll = Math.floor(counting(itemarr.LL, m_level, ranx) * ygnum)

                    break;
                case "mj":
                    temparr[0].mj = Math.floor(counting(itemarr.MJ, m_level, ranx) * ygnum)
                    break;
                case "zl":
                    temparr[0].zl = Math.floor(counting(itemarr.ZL, m_level, ranx) * ygnum)
                    break;
                case "tn":
                    temparr[0].tn = Math.floor(counting(itemarr.TN, m_level, ranx) * ygnum)
                    break;
                case "hj":
                    temparr[0].hj = counting(itemarr.HJ, m_level, ranx * 2) * yglevel
                    break;
                case "damage":
                    temparr[0].damage = Math.floor((itemarr.damage + (Math.sqrt(itemarr.damage) * 0.4 + 1) * Math.sqrt(m_level) * Math.sqrt(10) * 0.4 * m_level) * ranx * ygnum)
                    break;
                case "speed":
                    temparr[0].speed = itemarr.speed
                    break;
                case "damage_p":
                    temparr[0].damage_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "hp":
                    temparr[0].hp = Math.floor(counting(itemarr.hp, m_level, ranx) * yglevel * ygnum)
                    break;
                case "hp_p":
                    temparr[0].hp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "mp":
                    temparr[0].mp = qualityid == 3 ? Math.floor(Math.random() * 5 + 7) : qualityid == 2 ? Math.floor(Math.random() * 5 + 4) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "mp_p":
                    temparr[0].mp_p = qualityid == 3 ? Math.floor(Math.random() * 7 + 1) : qualityid == 2 ? Math.floor(Math.random() * 5 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "speed_p":
                    temparr[0].speed_p = qualityid == 3 ? Math.floor(Math.random() * 5 + 15) : qualityid == 2 ? Math.floor(Math.random() * 5 + 10) : Math.floor(Math.random() * 5 + 5)
                    break;
                case "attback":
                    temparr[0].attback = Math.floor(counting(itemarr.attback, m_level, ranx) * yglevel * ygnum)
                    break;
                case "secmp":
                    temparr[0].secmp = qualityid == 3 ? Math.floor(Math.random() * 4 + 1) : qualityid == 2 ? Math.floor(Math.random() * 3 + 1) : Math.floor(Math.random() * 2 + 1)
                    break;
                case "resistance":
                    temparr[0].resistance = qualityid == 3 ? Math.floor(Math.random() * 6 + 1) : qualityid == 2 ? Math.floor(Math.random() * 4 + 1) : Math.floor(Math.random() * 3 + 1)
                    break;
                case "crit":
                    temparr[0].crit = qualityid == 3 ? Math.floor(Math.random() * 13 + 3) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 5 + 1)
                    break;
                case "critdamage":
                    var critdamage_temp = qualityid == 3 ? Math.floor(Math.random() * 20 + 21) : qualityid == 2 ? Math.floor(Math.random() * 20 + 11) : Math.floor(Math.random() * 20 + 1)
                    if (itemarr.type == 5) {
                        temparr[0].critdamage = critdamage_temp * 2.5
                    } else {
                        temparr[0].critdamage = critdamage_temp
                    }
                    break;
                case "ice":
                    temparr[0].ice = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "fire":
                    temparr[0].fire = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "ray":
                    temparr[0].ray = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "poison":
                    temparr[0].poison = qualityid == 3 ? Math.floor(Math.random() * 20 + 1) : qualityid == 2 ? Math.floor(Math.random() * 10 + 1) : Math.floor(Math.random() * 6 + 1)
                    break;
                case "lesslevel":
                    temparr[0].lesslevel = Math.floor(Math.random() * (m_level > 30 ? 30 : m_level) + 1)
                    break;
            }
        }
        temparr[0].level = yglevel
        return temparr;
    }


    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

    //属性计算
    function counting(x, level, ranx) {

        return Math.floor(x + (x * 0.1 + 1) * Math.sqrt(level) * Math.sqrt(10) * 0.1 * level * ranx)
    }

})


/**
 * 天天暗黑-大秘钥匙-1
 */
AV.Cloud.define('deckey', function (request, response) {
    if (request.params.keys <= 0) {
        console.log(request.currentUser + "作弊deckey" + request.params.keys)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error("非法操作，封禁处理");
        })
    } else {
        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.increment('keys', -1);
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('keys', 1),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            return response.success(account.get('keys'));//

        }).catch(function (error) {

            return response.error('大秘境钥匙不足！');
        });
    }
})


/**
 * 天天暗黑-宝石转换ALL
 */
AV.Cloud.define('changeall', function (request, response) {
    if (request.params.db_place == 'normal') {
        var db_rate = 1
    } else {
        var db_rate = 30
    }

    var dia_level = parseInt(request.params.d1)
    var successrate_gold = dia_level * 600 * db_rate * request.params.successrate / 10
    var successcrit_gold = dia_level * 200 * db_rate + (request.params.successcrit * 200 / 100) * db_rate

    var s_num = 0  //成功数量
    var num_7 = 0 //7级宝石数量
    var dias = ['7级红宝石', '7级绿宝石', '7级紫宝石', '7级黄宝石', '7级钻石']
    var name_7 = getArrayItems(dias, 1)[0]
    var allprice = Math.floor(request.params.num * (successrate_gold + successcrit_gold))
    if (allprice <= 0) {
        console.log(request.currentUser + "作弊" + allprice)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    } else {
        for (var i = 0; i < request.params.num; i++) {
            var odds_key = Math.floor(Math.random() * 100);
            if (odds_key < request.params.successrate) {
                s_num += 1
            }
            var odds_key2 = Math.floor(Math.random() * 10000);
            if (odds_key2 < request.params.successcrit) {
                num_7 += 1
            }
        }
        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.increment('diamond', -allprice)
            account.increment('diamond_1', -allprice)
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('diamond', allprice),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            if (num_7 > 0) {  //7级宝石
                var Account = AV.Object.extend(request.params.db_diamond);
                new AV.Query(Account).equalTo('user', request.currentUser).equalTo('name', name_7).first().then(function (account) {
                    account.increment('num', num_7);
                    return account.save(null, {
                        query: new AV.Query(Account).equalTo('name', name_7),
                        fetchWhenSave: true,
                    }).then(function (account) {
                        console.log(account)
                    }).catch(function (error) {
                        console.log(error)
                    });
                })
            }

            if (s_num > 0) {
                var query1 = new AV.Query(request.params.db_diamond);
                query1.equalTo('name', request.params.d1);
                query1.greaterThanOrEqualTo('num', s_num);
                query1.equalTo('user', request.currentUser);
                query1.find().then(function (results) {
                    var data22 = results.map(results => results.toJSON()) //从网络拿到数据
                    if (data22.length > 0) {
                        var todo2 = AV.Object.createWithoutData(request.params.db_diamond, data22[0].objectId);
                        todo2.increment('num', -s_num);
                        todo2.save()


                        var query1 = new AV.Query(request.params.db_diamond);
                        query1.equalTo('name', request.params.d2);
                        query1.equalTo('user', request.currentUser);
                        query1.find().then(function (results) {
                            var data2 = results.map(results => results.toJSON()) //从网络拿到数据
                            var todo2 = AV.Object.createWithoutData(request.params.db_diamond, data2[0].objectId);
                            todo2.increment('num', s_num);
                            todo2.save().then(function (account) {
                                return response.success([s_num, num_7, name_7]);
                            }, function (error) {
                                return response.error(error);
                            })
                        })

                    } else {
                        return response.error('宝石数量不足');
                    }
                }, function (error) {
                    return response.error(error);
                });
            } else {
                return response.success([s_num, num_7, name_7]);
            }
        }).catch(function (error) {
            return response.error('白金币不足');
        });
    }
    //随机取属性
    function getArrayItems(arr, num) {
        var temp_array = new Array();
        for (var index in arr) {
            temp_array.push(arr[index]);
        }
        var return_array = new Array();
        for (var i = 0; i < num; i++) {
            if (temp_array.length > 0) {
                var arrIndex = Math.floor(Math.random() * temp_array.length);
                return_array[i] = temp_array[arrIndex];
                temp_array.splice(arrIndex, 1);
            } else {
                break;
            }
        }
        return return_array;
    }

})



/**
 * 天天暗黑-魔盒1——1
 */
AV.Cloud.define('mohe1_1', function (request, response) {
    var itemarray = request.params.itemarray
    var mohe = request.params.mohe
    var level = request.params.level
    var alllevel = itemarray[0].level + itemarray[1].level + itemarray[2].level + itemarray[3].level + itemarray[4].level + itemarray[5].level + itemarray[6].level + itemarray[7].level + itemarray[8].level
    var randomnum = Math.floor(Math.random() * 9);
    var new_item = itemarray[randomnum]

    if (request.params.mohe_123 == 1) {
        mohe[0][0] = new_item.cq_id
        mohe[0][1] = new_item.desc
        mohe[0][2] = new_item.type
        mohe[0][3] = new_item.name
    }
    else if (request.params.mohe_123 == 2) {
        mohe[1][0] = new_item.cq_id
        mohe[1][1] = new_item.desc
        mohe[1][2] = new_item.type
        mohe[1][3] = new_item.name
    }
    else {
        mohe[2][0] = new_item.cq_id
        mohe[2][1] = new_item.desc
        mohe[2][2] = new_item.type
        mohe[2][3] = new_item.name
    }

    var allprice = -10000000 * (((level * 9) - alllevel) > 0 ? ((level * 9) - alllevel) : 1)

    if (allprice > 0) {
        console.log(request.currentUser + "作弊魔盒1" + allprice)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    }
    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).equalTo('level', level).first().then(function (account) {
        account.increment('gold', allprice)
        account.set('mohe', mohe)
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('gold', -allprice),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var todo = AV.Object.createWithoutData(request.params.db_bag, new_item.objectId);
        todo.destroy().then(function (success) {
            return response.success([new_item, mohe]);//
        }, function (error) {
            return response.error(error);
        });
    }).catch(function (error) {
        return response.error(error);

    });

})

/**
 * 天天暗黑-魔盒2——2
 */
AV.Cloud.define('mohe2_2', function (request, response) {
    var itemarray21 = request.params.itemarray21
    var itemarray22 = request.params.itemarray22
    var itemarray23 = request.params.itemarray23
    var itemarr = itemarray22[0].itemarr
    var rate = request.params.rate
    var rate2 = 0
    var tempadd = request.params.tempadd
    var level = request.params.level;
    var zhu = itemarray22[0].itemarr[0].damage //主装备伤害
    var ci = itemarray21[0].itemarr[0].damage  //提炼装备伤害
    var addnum = 0
    var tempadd2 = 0
    if (zhu >= ci) {
        tempadd2 = 0
    } else {
        var randomnum = Math.floor(Math.random() * 8 + 2);
        addnum = Math.floor((ci - zhu) / randomnum)
        tempadd2 = Math.floor((ci - zhu) + 2386)
    }

    var alllevel = itemarray21[0].level
    var allprice = 10000000 * ((alllevel - itemarray22[0].level) > 0 ? (alllevel - itemarray22[0].level) : 1)

    var todos = []
    if (itemarray23.length > 0) {
        for (var i = 0; i < itemarray23.length; i++) {
            rate2 += ((itemarray22[0].level - itemarray23[i].level) > 0 ? ((itemarray23[i].qualityid + 1) / (itemarray22[0].level - itemarray23[i].level)) > 10 ? 10 : ((itemarray23[i].qualityid + 1) / (itemarray22[0].level - itemarray23[i].level)) : (itemarray23[i].qualityid + 1))
            var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray23[i].objectId);
            todos.push(todo)
        }
    }


    if (tempadd2 != tempadd || allprice < 10000000) {
        // console.log(tempadd2 + "作弊魔盒2" + tempadd)
        // var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        // todo.set('band', true);
        // todo.save().then(function () {
        return response.error('非法操作');
        // })
    } else {
        //翻倍
        var isdouble = 1
        var randomrate2 = Math.floor(Math.random() * 100);
        if (randomrate2 < rate2) {
            addnum = addnum * 2
            isdouble = 2
        }
        itemarr[0].damage = itemarr[0].damage + addnum
        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.increment('gold', -allprice)
            return account.save(null, {
                query: new AV.Query(Account).greaterThanOrEqualTo('gold', allprice),
                fetchWhenSave: true,
            });
        }).then(function (account) {
            var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray21[0].objectId);
            todo.destroy()

            var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray22[0].objectId);
            todo.set('itemarr', itemarr);
            todo.save().then(function (success) {
                return response.success([addnum, isdouble]);//
            }, function (error) {
                return response.error(error);
            });

            AV.Object.destroyAll(todos)


        }).catch(function (error) {
            return response.error(error);

        });
    }
})

/**
 * 天天暗黑-魔盒3——3
 */
AV.Cloud.define('mohe3_3', function (request, response) {
    var itemarray31 = request.params.itemarray31
    var itemarray32 = request.params.itemarray32
    var itemarray33 = request.params.itemarray33
    var rate = request.params.rate
    var rate2 = 10
    var level = request.params.level;


    var allprice = 20000000 * ((itemarray32[0].level - itemarray31[0].level) > 0 ? (itemarray32[0].level - itemarray31[0].level) : 1)

    var todos = []
    if (itemarray33.length > 0) {
        for (var i = 0; i < itemarray33.length; i++) {
            rate2 += ((itemarray32[0].level - itemarray33[i].level) > 0 ? ((itemarray33[i].qualityid + 1) / (itemarray32[0].level - itemarray33[i].level)) > 10 ? 10 : ((itemarray33[i].qualityid + 1) / (itemarray32[0].level - itemarray33[i].level)) : (itemarray33[i].qualityid + 1))
            var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray33[i].objectId);
            todos.push(todo)
        }
    }


    if (allprice < 20000000) {
        console.log(request.currentUser + "作弊魔盒3" + allprice)
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.userid);
        todo.set('band', true);
        todo.save().then(function () {
            return response.error('非法操作，封禁处理');
        })
    }

    //机率
    var randomrate2 = Math.floor(Math.random() * 100);

    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        account.increment('gold', -allprice)
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('gold', allprice),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray31[0].objectId);
        todo.destroy()

        if (randomrate2 < rate2) {
            var todo = AV.Object.createWithoutData(request.params.db_bag, itemarray32[0].objectId);
            todo.set('cq_id', itemarray31[0].cq_id);
            todo.set('desc', itemarray31[0].desc);
            todo.save().then(function (success) {
                return response.success('ok');
            }, function (error) {
                return response.error(error);
            });
        } else {
            return response.success('faile');
        }


        AV.Object.destroyAll(todos)


    }).catch(function (error) {
        return response.error(error);

    });
})



/**
 * 天天暗黑-巅峰
 */
AV.Cloud.define('dianf', function (request, response) {
    var arr = request.params.dianarr
    var points = (arr[0] / 5) + (arr[1] / 0.5) + (arr[2] / 0.5) + (arr[3] / 1000) + (arr[4] / 2) + arr[5] + arr[6] + arr[7] + arr[8] + (arr[9] / 2) + arr[10]

    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        account.set('dianf', arr)
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('level_t', points),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        return response.success('ok');
    }).catch(function (error) {
        return response.error(error);

    });
})

/**
 * 天天暗黑-巅峰重置
 */
AV.Cloud.define('resetall', function (request, response) {
    var db_rate = request.params.db_rate !== undefined ? request.params.db_rate : 1
    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        account.set('dianf', [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])
        account.increment('diamond', -(100 * db_rate))
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('diamond', (100 * db_rate)),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        return response.success('ok');
    }).catch(function (error) {
        return response.error(error);

    });
})
/**
 * 天天暗黑-返L
 */
AV.Cloud.define('dtogold', function (request, response) {
    if (request.params.db_place == 'normal') {
        var db_rate = 1
    } else {
        var db_rate = 30
    }

    var Account = AV.Object.extend(request.params.db_human);
    new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
        account.increment('gold', 100000000);
        account.increment('diamond', -(20000 * db_rate));
        account.increment('diamond_1', -(20000 * db_rate));
        return account.save(null, {
            query: new AV.Query(Account).greaterThanOrEqualTo('diamond', (20000 * db_rate)),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        return response.success([account.get('diamond'), account.get('gold')]);

    }).catch(function (error) {
        return response.error("白金币不足");
    });
})
/**
 * 天天暗黑-返L
 */
AV.Cloud.define('takeorderback', function (request, response) {
    var Account = AV.Object.extend('orders_back');
    new AV.Query(Account).equalTo('objectId', request.params.objectId).first().then(function (account) {
        account.set('state', true);
        return account.save(null, {
            query: new AV.Query(Account).equalTo('state', false),
            fetchWhenSave: true,
        });
    }).then(function (account) {
        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectid);
        todo.increment('diamond', account.get('price'));
        todo.increment('diamond_1', account.get('price'));
        todo.save().then(function (todo) {
            return response.success("领取成功");
        }, function (error) {
            return response.error("领取失败");
        });
    }).catch(function (error) {
        return response.error("已经领取过");
    });
})

/**
 * 天天暗黑-7723请求订单号
 */
AV.Cloud.define('getorderid', function (request, response) {
    post('http://super-sdk.3999303.com/index.php/super/pay/getOrderID', request.params.orderdata, function (data) {
        if (JSON.parse(data).status == true) {
            var TodoFolder = AV.Object.extend('orders');
            var todoFolder = new TodoFolder();
            todoFolder.set('orderid', JSON.parse(data).data.orderID);
            todoFolder.set('state', "支付中");
            todoFolder.set('user', request.currentUser);
            todoFolder.set('price', request.params.money);  //分
            todoFolder.set('human', request.params.human);  //人物所在CLASS
            todoFolder.set('h_objectId', request.params.objectId);  //objectId
            todoFolder.set('orderdata', request.params.orderdata);  //orderdata            
            todoFolder.save().then(function (todo) {
                return response.success(data)
            }, function (error) {
                return response.error(error);
            });
        } else {
            return response.error("订单生成失败");
        }
    });
    function post(url, data, fn) {
        data = data || {};
        var content = require('querystring').stringify(data);
        var parse_u = require('url').parse(url, true);
        var isHttp = parse_u.protocol == 'http:';
        var options = {
            host: parse_u.hostname,
            port: parse_u.port || (isHttp ? 80 : 443),
            path: parse_u.path,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': content.length
            }
        };
        var req = require(isHttp ? 'http' : 'https').request(options, function (res) {
            var _data = '';
            res.on('data', function (chunk) {
                _data += chunk;
            });
            res.on('end', function () {
                fn != undefined && fn(_data);
            });
        });
        req.write(content);
        req.end();
    }
});



// AV.Cloud.define('testgetorderid', function (request, response) {
//     post('http://ttanhei.leanapp.cn/getnotify', request.params.orderdata, function (data) {
//         console.log(data + "接收成功")
//         return response.success(data)
//     });

//     function post(url, data, fn) {
//         data = data || {};
//         var content = require('querystring').stringify(data);
//         var parse_u = require('url').parse(url, true);
//         var isHttp = parse_u.protocol == 'http:';
//         var options = {
//             host: parse_u.hostname,
//             port: parse_u.port || (isHttp ? 80 : 443),
//             path: parse_u.path,
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded',
//                 'Content-Length': content.length
//             }
//         };
//         var req = require(isHttp ? 'http' : 'https').request(options, function (res) {
//             var _data = '';
//             res.on('data', function (chunk) {
//                 _data += chunk;
//             });
//             res.on('end', function () {
//                 fn != undefined && fn(_data);
//             });
//         });
//         req.write(content);
//         req.end();
//     }
// });



/**
 * 天天暗黑-创建军团
 */
AV.Cloud.define('creat_home', function (request, response) {
    var TodoFolder = AV.Object.extend('home');
    var todoFolder = new TodoFolder();
    todoFolder.set('boss', [1.1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    todoFolder.set('points', 0);
    todoFolder.set('home_level', 1);
    todoFolder.set('home_name', request.params.home_name);  //分
    todoFolder.set('hp', 10000000);  //人物所在CLASS
    todoFolder.set('members', [[request.params.db_human, request.params.name, request.params.obid]]);  //objectId
    todoFolder.set('home_desc', request.params.home_desc);  //orderdata     
    todoFolder.set('home_resources', 0);  //orderdata  
    todoFolder.set('user', request.currentUser);  //orderdata    
    todoFolder.set('server', request.params.db_human);  //orderdata    db_place   
    todoFolder.set('place', request.params.db_place);  //orderdata       
    todoFolder.save().then(function (todo) {
        console.log(todo.id)
        var targethome = AV.Object.createWithoutData('home', todo.id);
        var Account = AV.Object.extend(request.params.db_human);
        new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
            account.set('homeid', targethome);
            if (request.params.pay == 'gold') {
                account.increment('gold', -10000000000);
            } else {
                account.increment('diamond', -request.params.db_rate * 1000);
            }
            return account.save().then(function (todo) {
                return response.success(targethome)
            }, function (error) {
                return response.error(error);
            })
        })


    }, function (error) {
        return response.error(error);
    });
})




function updateinfos(who, request, datax) {
    if (who == "human") {
        var query = new AV.Query(request.params.db_human);
        query.include('item0');
        query.include('item1');
        query.include('item2');
        query.include('item3');
        query.include('item4');
        query.include('item5');
        query.include('item6');
        query.include('item7');
        query.include('item8');
        query.include('item9');
        query.include('item10');
        query.include('item11')
        query.include('item12');
        query.equalTo('user', request.currentUser);
        return query.find().then(function (results) {
            var data2 = results.map(results => results.toJSON()) //从网络拿到数据
            if (data2.length > 0) {

                if (datax != 'takeoff') {
                    if (datax[0].level > data2[0].level) {

                        console.log(datax[0].level + '+' + data2[0].level)
                        var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
                        todo.set('band', true);
                        todo.save().then(function () {
                            return response.error('非法操作，封禁处理');
                        })
                        console.log("空装备作弊" + request.params.db_human)
                    }
                }

                test(data2, "human")

            } else {
                return "未找到角色";
            }
        }, function (error) {
            return error
        });
    } else {
        var query = new AV.Query(request.params.db_follow);
        query.include('item0');
        query.include('item1');
        query.include('item2');
        query.include('item3');
        query.include('item4');
        query.include('item5');
        query.include('item6');
        query.include('item7');
        query.include('item8');
        query.include('item9');
        query.include('item10');
        query.include('item11')
        query.include('item12');
        query.equalTo('user', request.currentUser);
        return query.find().then(function (results) {

            var data2 = results.map(results => results.toJSON()) //从网络拿到数据
            if (data2.length > 0) {
                // if (datax != 'takeoff') {
                //     if (datax[0].level > data2[0].level) {
                //         // console.log("空装备作弊")
                //         // var todo = AV.Object.createWithoutData(request.params.db_human, request.params.human_objectId);
                //         // todo.set('band', true);
                //         // todo.save().then(function () {
                //         //     return response.error('非法操作，封禁处理');
                //         // })
                //     }
                // }

                test(data2, "follow")
            } else {
                return "未找到追随者";
            }
        }, function (error) {
            return error
        });
    }


    function test(data, who) {
        var newdata = []
        var newdiamond = []
        var cqarray = []
        var cqnums = 0;
        if (data[0].item0) {
            newdata.push(data[0].item0.itemarr[0])
            newdiamond.push(data[0].item0.kong1)
            newdiamond.push(data[0].item0.kong2)
            newdiamond.push(data[0].item0.kong3)
            data[0].item0.cq_id ? cqarray.push(data[0].item0.cq_id) : null
            data[0].item0.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item0.cq_id2 > 0 ? cqarray.push(data[0].item0.cq_id2) : null
            data[0].item0.cq_id == 30 ? cqarray.push(parseInt(data[0].item0.desc.substring(7)) + 1000) : null    //词辍经验值增加
        } else {
            newdata.push({})
        }
        if (data[0].item1) {
            newdata.push(data[0].item1.itemarr[0])
            newdiamond.push(data[0].item1.kong2)
            data[0].item1.cq_id ? cqarray.push(data[0].item1.cq_id) : null
            data[0].item1.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item1.cq_id2 > 0 ? cqarray.push(data[0].item1.cq_id2) : null
            data[0].item1.cq_id == 30 ? cqarray.push(parseInt(data[0].item1.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item2) {
            newdata.push(data[0].item2.itemarr[0])
            newdiamond.push(data[0].item2.kong2)
            data[0].item2.cq_id ? cqarray.push(data[0].item2.cq_id) : null
            data[0].item2.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item2.cq_id2 > 0 ? cqarray.push(data[0].item2.cq_id2) : null
            data[0].item2.cq_id == 30 ? cqarray.push(parseInt(data[0].item2.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item3) {
            newdata.push(data[0].item3.itemarr[0])
            newdiamond.push(data[0].item3.kong2)
            data[0].item3.cq_id ? cqarray.push(data[0].item3.cq_id) : null
            data[0].item3.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item3.cq_id2 > 0 ? cqarray.push(data[0].item3.cq_id2) : null
            data[0].item3.cq_id == 30 ? cqarray.push(parseInt(data[0].item3.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item4) {
            newdata.push(data[0].item4.itemarr[0])
            newdiamond.push(data[0].item4.kong2)
            data[0].item4.cq_id ? cqarray.push(data[0].item4.cq_id) : null
            data[0].item4.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item4.cq_id2 > 0 ? cqarray.push(data[0].item4.cq_id2) : null
            data[0].item4.cq_id == 30 ? cqarray.push(parseInt(data[0].item4.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item5) {
            newdata.push(data[0].item5.itemarr[0])
            newdiamond.push(data[0].item5.kong2)
            data[0].item5.cq_id ? cqarray.push(data[0].item5.cq_id) : null
            data[0].item5.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item5.cq_id2 > 0 ? cqarray.push(data[0].item5.cq_id2) : null
            data[0].item5.cq_id == 30 ? cqarray.push(parseInt(data[0].item5.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item6) {
            newdata.push(data[0].item6.itemarr[0])
            newdiamond.push(data[0].item6.kong2)
            data[0].item6.cq_id ? cqarray.push(data[0].item6.cq_id) : null
            data[0].item6.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item6.cq_id2 > 0 ? cqarray.push(data[0].item6.cq_id2) : null
            data[0].item6.cq_id == 30 ? cqarray.push(parseInt(data[0].item6.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item7) {
            newdata.push(data[0].item7.itemarr[0])
            newdiamond.push(data[0].item7.kong2)
            data[0].item7.cq_id ? cqarray.push(data[0].item7.cq_id) : null
            data[0].item7.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item7.cq_id2 > 0 ? cqarray.push(data[0].item7.cq_id2) : null
            data[0].item7.cq_id == 30 ? cqarray.push(parseInt(data[0].item7.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item8) {
            newdata.push(data[0].item8.itemarr[0])
            newdiamond.push(data[0].item8.kong2)
            data[0].item8.cq_id ? cqarray.push(data[0].item8.cq_id) : null
            data[0].item8.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item8.cq_id2 > 0 ? cqarray.push(data[0].item8.cq_id2) : null
            data[0].item8.cq_id == 30 ? cqarray.push(parseInt(data[0].item8.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item9) {
            newdata.push(data[0].item9.itemarr[0])
            newdiamond.push(data[0].item9.kong2)
            data[0].item9.cq_id ? cqarray.push(data[0].item9.cq_id) : null
            data[0].item9.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item9.cq_id2 > 0 ? cqarray.push(data[0].item9.cq_id2) : null
            data[0].item9.cq_id == 30 ? cqarray.push(parseInt(data[0].item9.desc.substring(7)) + 1000) : null
            data[0].item9.name == "夸下痒" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "杨先生的妖裤" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "沼地防水裤" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古夸下痒" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古杨先生的妖裤" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古沼地防水裤" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古夸下痒★" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古杨先生的妖裤★" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
            data[0].item9.name == "远古沼地防水裤★" ? cqarray.push(980) : null// 夸下痒、杨先生的妖裤或者沼地防水裤
        } else {
            newdata.push({})
        }
        if (data[0].item10) {
            newdata.push(data[0].item10.itemarr[0])
            newdiamond.push(data[0].item10.kong2)
            data[0].item10.cq_id ? cqarray.push(data[0].item10.cq_id) : null
            data[0].item10.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item10.cq_id2 > 0 ? cqarray.push(data[0].item10.cq_id2) : null
            data[0].item10.cq_id == 30 ? cqarray.push(parseInt(data[0].item10.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item11) {
            newdata.push(data[0].item11.itemarr[0])
            newdiamond.push(data[0].item11.kong2)
            data[0].item11.cq_id ? cqarray.push(data[0].item11.cq_id) : null
            data[0].item11.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item11.cq_id2 > 0 ? cqarray.push(data[0].item11.cq_id2) : null
            data[0].item11.cq_id == 30 ? cqarray.push(parseInt(data[0].item11.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }
        if (data[0].item12) {
            newdata.push(data[0].item12.itemarr[0])
            newdiamond.push(data[0].item12.kong2)
            data[0].item12.cq_id ? cqarray.push(data[0].item12.cq_id) : null
            data[0].item12.cq_id < 100 ? cqnums += 1 : cqnums += 0
            data[0].item12.cq_id2 > 0 ? cqarray.push(data[0].item12.cq_id2) : null
            data[0].item12.cq_id == 30 ? cqarray.push(parseInt(data[0].item12.desc.substring(7)) + 1000) : null
        } else {
            newdata.push({})
        }


        var mjx = 0;
        var llx = 0;
        var zlx = 0;
        var attbackx = 0;
        var cdx = 0;
        var critdamagex = 0;
        var hpx = 0;
        var h_dias = [0, 0, 0, 0, 0]
        for (i = 0; i < newdiamond.length; i++) {
            backdiamond(newdiamond[i])
        }

        var attback = (newdata[0].attback != undefined ? newdata[0].attback : 0) + (newdata[1].attback != undefined ? newdata[1].attback : 0) + (newdata[2].attback != undefined ? newdata[2].attback : 0) + (newdata[3].attback != undefined ? newdata[3].attback : 0) + (newdata[4].attback != undefined ? newdata[4].attback : 0) + (newdata[5].attback != undefined ? newdata[5].attback : 0) + (newdata[6].attback != undefined ? newdata[6].attback : 0) + (newdata[7].attback != undefined ? newdata[7].attback : 0) + (newdata[8].attback != undefined ? newdata[8].attback : 0) + (newdata[9].attback != undefined ? newdata[9].attback : 0) + (newdata[10].attback != undefined ? newdata[10].attback : 0) + (newdata[11].attback != undefined ? newdata[11].attback : 0) + (newdata[12].attback != undefined ? newdata[12].attback : 0)
        attback = attback != undefined ? attback + attbackx : attbackx

        var hj = (newdata[0].hj != undefined ? newdata[0].hj : 0) + (newdata[1].hj != undefined ? newdata[1].hj : 0) + (newdata[2].hj != undefined ? newdata[2].hj : 0) + (newdata[3].hj != undefined ? newdata[3].hj : 0) + (newdata[4].hj != undefined ? newdata[4].hj : 0) + (newdata[5].hj != undefined ? newdata[5].hj : 0) + (newdata[6].hj != undefined ? newdata[6].hj : 0) + (newdata[7].hj != undefined ? newdata[7].hj : 0) + (newdata[8].hj != undefined ? newdata[8].hj : 0) + (newdata[9].hj != undefined ? newdata[9].hj : 0) + (newdata[10].hj != undefined ? newdata[10].hj : 0) + (newdata[11].hj != undefined ? newdata[11].hj : 0) + (newdata[12].hj != undefined ? newdata[12].hj : 0)
        hj = hj != undefined ? hj : 0

        var hp_p = (newdata[0].hp_p != undefined ? newdata[0].hp_p : 0) + (newdata[1].hp_p != undefined ? newdata[1].hp_p : 0) + (newdata[2].hp_p != undefined ? newdata[2].hp_p : 0) + (newdata[3].hp_p != undefined ? newdata[3].hp_p : 0) + (newdata[4].hp_p != undefined ? newdata[4].hp_p : 0) + (newdata[5].hp_p != undefined ? newdata[5].hp_p : 0) + (newdata[6].hp_p != undefined ? newdata[6].hp_p : 0) + (newdata[7].hp_p != undefined ? newdata[7].hp_p : 0) + (newdata[8].hp_p != undefined ? newdata[8].hp_p : 0) + (newdata[9].hp_p != undefined ? newdata[9].hp_p : 0) + (newdata[10].hp_p != undefined ? newdata[10].hp_p : 0) + (newdata[11].hp_p != undefined ? newdata[11].hp_p : 0) + (newdata[12].hp_p != undefined ? newdata[12].hp_p : 0)
        hp_p = hp_p != undefined ? hp_p : 0

        var hp = (newdata[0].hp != undefined ? newdata[0].hp : 0) + (newdata[1].hp != undefined ? newdata[1].hp : 0) + (newdata[2].hp != undefined ? newdata[2].hp : 0) + (newdata[3].hp != undefined ? newdata[3].hp : 0) + (newdata[4].hp != undefined ? newdata[4].hp : 0) + (newdata[5].hp != undefined ? newdata[5].hp : 0) + (newdata[6].hp != undefined ? newdata[6].hp : 0) + (newdata[7].hp != undefined ? newdata[7].hp : 0) + (newdata[8].hp != undefined ? newdata[8].hp : 0) + (newdata[9].hp != undefined ? newdata[9].hp : 0) + (newdata[10].hp != undefined ? newdata[10].hp : 0) + (newdata[11].hp != undefined ? newdata[11].hp : 0) + (newdata[12].hp != undefined ? newdata[12].hp : 0)
        hp = hp != undefined ? (hp + hpx + 130) * (1 + hp_p / 100) : (130 + hpx) * (1 + hp_p / 100)


        var ll = (newdata[0].ll != undefined ? newdata[0].ll : 0) + (newdata[1].ll != undefined ? newdata[1].ll : 0) + (newdata[2].ll != undefined ? newdata[2].ll : 0) + (newdata[3].ll != undefined ? newdata[3].ll : 0) + (newdata[4].ll != undefined ? newdata[4].ll : 0) + (newdata[5].ll != undefined ? newdata[5].ll : 0) + (newdata[6].ll != undefined ? newdata[6].ll : 0) + (newdata[7].ll != undefined ? newdata[7].ll : 0) + (newdata[8].ll != undefined ? newdata[8].ll : 0) + (newdata[9].ll != undefined ? newdata[9].ll : 0) + (newdata[10].ll != undefined ? newdata[10].ll : 0) + (newdata[11].ll != undefined ? newdata[11].ll : 0) + (newdata[12].ll != undefined ? newdata[12].ll : 0)
        ll = ll != undefined ? ll + llx + data[0].level * (data[0].job == 1 ? 3 : 1) + 10 : llx + data[0].level * (data[0].job == 1 ? 3 : 1) + 10

        var mj = (newdata[0].mj != undefined ? newdata[0].mj : 0) + (newdata[1].mj != undefined ? newdata[1].mj : 0) + (newdata[2].mj != undefined ? newdata[2].mj : 0) + (newdata[3].mj != undefined ? newdata[3].mj : 0) + (newdata[4].mj != undefined ? newdata[4].mj : 0) + (newdata[5].mj != undefined ? newdata[5].mj : 0) + (newdata[6].mj != undefined ? newdata[6].mj : 0) + (newdata[7].mj != undefined ? newdata[7].mj : 0) + (newdata[8].mj != undefined ? newdata[8].mj : 0) + (newdata[9].mj != undefined ? newdata[9].mj : 0) + (newdata[10].mj != undefined ? newdata[10].mj : 0) + (newdata[11].mj != undefined ? newdata[11].mj : 0) + (newdata[12].mj != undefined ? newdata[12].mj : 0)
        mj = mj != undefined ? mj + mjx + data[0].level * (data[0].job == 2 ? 3 : 1) + 10 : mjx + data[0].level * (data[0].job == 2 ? 3 : 1) + 10

        var mp_p = (newdata[0].mp_p != undefined ? newdata[0].mp_p : 0) + (newdata[1].mp_p != undefined ? newdata[1].mp_p : 0) + (newdata[2].mp_p != undefined ? newdata[2].mp_p : 0) + (newdata[3].mp_p != undefined ? newdata[3].mp_p : 0) + (newdata[4].mp_p != undefined ? newdata[4].mp_p : 0) + (newdata[5].mp_p != undefined ? newdata[5].mp_p : 0) + (newdata[6].mp_p != undefined ? newdata[6].mp_p : 0) + (newdata[7].mp_p != undefined ? newdata[7].mp_p : 0) + (newdata[8].mp_p != undefined ? newdata[8].mp_p : 0) + (newdata[9].mp_p != undefined ? newdata[9].mp_p : 0) + (newdata[10].mp_p != undefined ? newdata[10].mp_p : 0) + (newdata[11].mp_p != undefined ? newdata[11].mp_p : 0) + (newdata[12].mp_p != undefined ? newdata[12].mp_p : 0)
        mp_p = mp_p != undefined ? mp_p : 0

        var mp = (newdata[0].mp != undefined ? newdata[0].mp : 0) + (newdata[1].mp != undefined ? newdata[1].mp : 0) + (newdata[2].mp != undefined ? newdata[2].mp : 0) + (newdata[3].mp != undefined ? newdata[3].mp : 0) + (newdata[4].mp != undefined ? newdata[4].mp : 0) + (newdata[5].mp != undefined ? newdata[5].mp : 0) + (newdata[6].mp != undefined ? newdata[6].mp : 0) + (newdata[7].mp != undefined ? newdata[7].mp : 0) + (newdata[8].mp != undefined ? newdata[8].mp : 0) + (newdata[9].mp != undefined ? newdata[9].mp : 0) + (newdata[10].mp != undefined ? newdata[10].mp : 0) + (newdata[11].mp != undefined ? newdata[11].mp : 0) + (newdata[12].mp != undefined ? newdata[12].mp : 0)
        mp = mp != undefined ? ((mp + 100) * (1 + (mp_p / 100))) : (100 * (1 + (mp_p / 100)))

        var tn = (newdata[0].tn != undefined ? newdata[0].tn : 0) + (newdata[1].tn != undefined ? newdata[1].tn : 0) + (newdata[2].tn != undefined ? newdata[2].tn : 0) + (newdata[3].tn != undefined ? newdata[3].tn : 0) + (newdata[4].tn != undefined ? newdata[4].tn : 0) + (newdata[5].tn != undefined ? newdata[5].tn : 0) + (newdata[6].tn != undefined ? newdata[6].tn : 0) + (newdata[7].tn != undefined ? newdata[7].tn : 0) + (newdata[8].tn != undefined ? newdata[8].tn : 0) + (newdata[9].tn != undefined ? newdata[9].tn : 0) + (newdata[10].tn != undefined ? newdata[10].tn : 0) + (newdata[11].tn != undefined ? newdata[11].tn : 0) + (newdata[12].tn != undefined ? newdata[12].tn : 0)
        tn = tn != undefined ? tn + data[0].level * 2 + 10 : data[0].level * 2 + 10

        var zl = (newdata[0].zl != undefined ? newdata[0].zl : 0) + (newdata[1].zl != undefined ? newdata[1].zl : 0) + (newdata[2].zl != undefined ? newdata[2].zl : 0) + (newdata[3].zl != undefined ? newdata[3].zl : 0) + (newdata[4].zl != undefined ? newdata[4].zl : 0) + (newdata[5].zl != undefined ? newdata[5].zl : 0) + (newdata[6].zl != undefined ? newdata[6].zl : 0) + (newdata[7].zl != undefined ? newdata[7].zl : 0) + (newdata[8].zl != undefined ? newdata[8].zl : 0) + (newdata[9].zl != undefined ? newdata[9].zl : 0) + (newdata[10].zl != undefined ? newdata[10].zl : 0) + (newdata[11].zl != undefined ? newdata[11].zl : 0) + (newdata[12].zl != undefined ? newdata[12].zl : 0)
        zl = zl != undefined ? zl + zlx + data[0].level * (data[0].job == 3 ? 3 : 1) + 10 : zlx + data[0].level * (data[0].job == 3 ? 3 : 1) + 10

        var crit = (newdata[0].crit != undefined ? newdata[0].crit : 0) + (newdata[1].crit != undefined ? newdata[1].crit : 0) + (newdata[2].crit != undefined ? newdata[2].crit : 0) + (newdata[3].crit != undefined ? newdata[3].crit : 0) + (newdata[4].crit != undefined ? newdata[4].crit : 0) + (newdata[5].crit != undefined ? newdata[5].crit : 0) + (newdata[6].crit != undefined ? newdata[6].crit : 0) + (newdata[7].crit != undefined ? newdata[7].crit : 0) + (newdata[8].crit != undefined ? newdata[8].crit : 0) + (newdata[9].crit != undefined ? newdata[9].crit : 0) + (newdata[10].crit != undefined ? newdata[10].crit : 0) + (newdata[11].crit != undefined ? newdata[11].crit : 0) + (newdata[12].crit != undefined ? newdata[12].crit : 0)
        crit = crit != undefined ? crit + 5 : 5

        var critdamage = (newdata[0].critdamage != undefined ? newdata[0].critdamage : 0) + (newdata[1].critdamage != undefined ? newdata[1].critdamage : 0) + (newdata[2].critdamage != undefined ? newdata[2].critdamage : 0) + (newdata[3].critdamage != undefined ? newdata[3].critdamage : 0) + (newdata[4].critdamage != undefined ? newdata[4].critdamage : 0) + (newdata[5].critdamage != undefined ? newdata[5].critdamage : 0) + (newdata[6].critdamage != undefined ? newdata[6].critdamage : 0) + (newdata[7].critdamage != undefined ? newdata[7].critdamage : 0) + (newdata[8].critdamage != undefined ? newdata[8].critdamage : 0) + (newdata[9].critdamage != undefined ? newdata[9].critdamage : 0) + (newdata[10].critdamage != undefined ? newdata[10].critdamage : 0) + (newdata[11].critdamage != undefined ? newdata[11].critdamage : 0) + (newdata[12].critdamage != undefined ? newdata[12].critdamage : 0)
        critdamage = critdamage != undefined ? critdamage + critdamagex + 50 : 50 + critdamagex

        var damage = (newdata[0].damage != undefined ? newdata[0].damage : 0) + (newdata[1].damage != undefined ? newdata[1].damage : 0) + (newdata[2].damage != undefined ? newdata[2].damage : 0) + (newdata[3].damage != undefined ? newdata[3].damage : 0) + (newdata[4].damage != undefined ? newdata[4].damage : 0) + (newdata[5].damage != undefined ? newdata[5].damage : 0) + (newdata[6].damage != undefined ? newdata[6].damage : 0) + (newdata[7].damage != undefined ? newdata[7].damage : 0) + (newdata[8].damage != undefined ? newdata[8].damage : 0) + (newdata[9].damage != undefined ? newdata[9].damage : 0) + (newdata[10].damage != undefined ? newdata[10].damage : 0) + (newdata[11].damage != undefined ? newdata[11].damage : 0) + (newdata[12].damage != undefined ? newdata[12].damage : 0)
        damage = damage != undefined ? damage + 100 : 100

        var damage_p = (newdata[0].damage_p != undefined ? newdata[0].damage_p : 0) + (newdata[1].damage_p != undefined ? newdata[1].damage_p : 0) + (newdata[2].damage_p != undefined ? newdata[2].damage_p : 0) + (newdata[3].damage_p != undefined ? newdata[3].damage_p : 0) + (newdata[4].damage_p != undefined ? newdata[4].damage_p : 0) + (newdata[5].damage_p != undefined ? newdata[5].damage_p : 0) + (newdata[6].damage_p != undefined ? newdata[6].damage_p : 0) + (newdata[7].damage_p != undefined ? newdata[7].damage_p : 0) + (newdata[8].damage_p != undefined ? newdata[8].damage_p : 0) + (newdata[9].damage_p != undefined ? newdata[9].damage_p : 0) + (newdata[10].damage_p != undefined ? newdata[10].damage_p : 0) + (newdata[11].damage_p != undefined ? newdata[11].damage_p : 0) + (newdata[12].damage_p != undefined ? newdata[12].damage_p : 0)
        damage_p = damage_p != undefined ? damage_p : 0

        var fire = (newdata[0].fire != undefined ? newdata[0].fire : 0) + (newdata[1].fire != undefined ? newdata[1].fire : 0) + (newdata[2].fire != undefined ? newdata[2].fire : 0) + (newdata[3].fire != undefined ? newdata[3].fire : 0) + (newdata[4].fire != undefined ? newdata[4].fire : 0) + (newdata[5].fire != undefined ? newdata[5].fire : 0) + (newdata[6].fire != undefined ? newdata[6].fire : 0) + (newdata[7].fire != undefined ? newdata[7].fire : 0) + (newdata[8].fire != undefined ? newdata[8].fire : 0) + (newdata[9].fire != undefined ? newdata[9].fire : 0) + (newdata[10].fire != undefined ? newdata[10].fire : 0) + (newdata[11].fire != undefined ? newdata[11].fire : 0) + (newdata[12].fire != undefined ? newdata[12].fire : 0)
        fire = fire != undefined ? fire : 0

        var ice = (newdata[0].ice != undefined ? newdata[0].ice : 0) + (newdata[1].ice != undefined ? newdata[1].ice : 0) + (newdata[2].ice != undefined ? newdata[2].ice : 0) + (newdata[3].ice != undefined ? newdata[3].ice : 0) + (newdata[4].ice != undefined ? newdata[4].ice : 0) + (newdata[5].ice != undefined ? newdata[5].ice : 0) + (newdata[6].ice != undefined ? newdata[6].ice : 0) + (newdata[7].ice != undefined ? newdata[7].ice : 0) + (newdata[8].ice != undefined ? newdata[8].ice : 0) + (newdata[9].ice != undefined ? newdata[9].ice : 0) + (newdata[10].ice != undefined ? newdata[10].ice : 0) + (newdata[11].ice != undefined ? newdata[11].ice : 0) + (newdata[12].ice != undefined ? newdata[12].ice : 0)
        ice = ice != undefined ? ice : 0

        var ray = (newdata[0].ray != undefined ? newdata[0].ray : 0) + (newdata[1].ray != undefined ? newdata[1].ray : 0) + (newdata[2].ray != undefined ? newdata[2].ray : 0) + (newdata[3].ray != undefined ? newdata[3].ray : 0) + (newdata[4].ray != undefined ? newdata[4].ray : 0) + (newdata[5].ray != undefined ? newdata[5].ray : 0) + (newdata[6].ray != undefined ? newdata[6].ray : 0) + (newdata[7].ray != undefined ? newdata[7].ray : 0) + (newdata[8].ray != undefined ? newdata[8].ray : 0) + (newdata[9].ray != undefined ? newdata[9].ray : 0) + (newdata[10].ray != undefined ? newdata[10].ray : 0) + (newdata[11].ray != undefined ? newdata[11].ray : 0) + (newdata[12].ray != undefined ? newdata[12].ray : 0)
        ray = ray != undefined ? ray : 0

        var poison = (newdata[0].poison != undefined ? newdata[0].poison : 0) + (newdata[1].poison != undefined ? newdata[1].poison : 0) + (newdata[2].poison != undefined ? newdata[2].poison : 0) + (newdata[3].poison != undefined ? newdata[3].poison : 0) + (newdata[4].poison != undefined ? newdata[4].poison : 0) + (newdata[5].poison != undefined ? newdata[5].poison : 0) + (newdata[6].poison != undefined ? newdata[6].poison : 0) + (newdata[7].poison != undefined ? newdata[7].poison : 0) + (newdata[8].poison != undefined ? newdata[8].poison : 0) + (newdata[9].poison != undefined ? newdata[9].poison : 0) + (newdata[10].poison != undefined ? newdata[10].poison : 0) + (newdata[11].poison != undefined ? newdata[11].poison : 0) + (newdata[12].poison != undefined ? newdata[12].poison : 0)
        poison = poison != undefined ? poison : 0


        var resistance = (newdata[0].resistance != undefined ? newdata[0].resistance : 0) + (newdata[1].resistance != undefined ? newdata[1].resistance : 0) + (newdata[2].resistance != undefined ? newdata[2].resistance : 0) + (newdata[3].resistance != undefined ? newdata[3].resistance : 0) + (newdata[4].resistance != undefined ? newdata[4].resistance : 0) + (newdata[5].resistance != undefined ? newdata[5].resistance : 0) + (newdata[6].resistance != undefined ? newdata[6].resistance : 0) + (newdata[7].resistance != undefined ? newdata[7].resistance : 0) + (newdata[8].resistance != undefined ? newdata[8].resistance : 0) + (newdata[9].resistance != undefined ? newdata[9].resistance : 0) + (newdata[10].resistance != undefined ? newdata[10].resistance : 0) + (newdata[11].resistance != undefined ? newdata[11].resistance : 0) + (newdata[12].resistance != undefined ? newdata[12].resistance : 0)
        resistance = resistance != undefined ? resistance : 0

        var secmp = (newdata[0].secmp != undefined ? newdata[0].secmp : 0) + (newdata[1].secmp != undefined ? newdata[1].secmp : 0) + (newdata[2].secmp != undefined ? newdata[2].secmp : 0) + (newdata[3].secmp != undefined ? newdata[3].secmp : 0) + (newdata[4].secmp != undefined ? newdata[4].secmp : 0) + (newdata[5].secmp != undefined ? newdata[5].secmp : 0) + (newdata[6].secmp != undefined ? newdata[6].secmp : 0) + (newdata[7].secmp != undefined ? newdata[7].secmp : 0) + (newdata[8].secmp != undefined ? newdata[8].secmp : 0) + (newdata[9].secmp != undefined ? newdata[9].secmp : 0) + (newdata[10].secmp != undefined ? newdata[10].secmp : 0) + (newdata[11].secmp != undefined ? newdata[11].secmp : 0) + (newdata[12].secmp != undefined ? newdata[12].secmp : 0)
        secmp = secmp != undefined ? secmp : 1
        secmp = secmp == 0 ? 1 : secmp

        var speed = (newdata[0].speed != undefined ? newdata[0].speed : 0) + (newdata[1].speed != undefined ? newdata[1].speed : 0) + (newdata[2].speed != undefined ? newdata[2].speed : 0) + (newdata[3].speed != undefined ? newdata[3].speed : 0) + (newdata[4].speed != undefined ? newdata[4].speed : 0) + (newdata[5].speed != undefined ? newdata[5].speed : 0) + (newdata[6].speed != undefined ? newdata[6].speed : 0) + (newdata[7].speed != undefined ? newdata[7].speed : 0) + (newdata[8].speed != undefined ? newdata[8].speed : 0) + (newdata[9].speed != undefined ? newdata[9].speed : 0) + (newdata[10].speed != undefined ? newdata[10].speed : 0) + (newdata[11].speed != undefined ? newdata[11].speed : 0) + (newdata[12].speed != undefined ? newdata[12].speed : 0)

        var speed_p = (newdata[0].speed_p != undefined ? newdata[0].speed_p : 0) + (newdata[1].speed_p != undefined ? newdata[1].speed_p : 0) + (newdata[2].speed_p != undefined ? newdata[2].speed_p : 0) + (newdata[3].speed_p != undefined ? newdata[3].speed_p : 0) + (newdata[4].speed_p != undefined ? newdata[4].speed_p : 0) + (newdata[5].speed_p != undefined ? newdata[5].speed_p : 0) + (newdata[6].speed_p != undefined ? newdata[6].speed_p : 0) + (newdata[7].speed_p != undefined ? newdata[7].speed_p : 0) + (newdata[8].speed_p != undefined ? newdata[8].speed_p : 0) + (newdata[9].speed_p != undefined ? newdata[9].speed_p : 0) + (newdata[10].speed_p != undefined ? newdata[10].speed_p : 0) + (newdata[11].speed_p != undefined ? newdata[11].speed_p : 0) + (newdata[12].speed_p != undefined ? newdata[12].speed_p : 0)
        speed_p = speed_p != undefined ? speed_p : 0

        speed = speed != undefined ? speed * (1 + (speed_p * 0.01)) : 0.8
        speed = ((Math.floor(speed * 100)) / 100) == 0 ? 1 : ((Math.floor(speed * 100)) / 100)
        hp = tn * 35 + 130 + hp


        //主属性加成 
        hj = data[0].job == 1 ? (hj + (ll * 2)) : hj;
        resistance = data[0].job == 3 ? (resistance + ((zl / 100) > 60 ? 60 : (zl / 100))) : resistance;
        speed = data[0].job == 2 ? (speed * (1 + (((mj / 200) > 30 ? 30 : (mj / 200)) / 100))) : speed;

        if (who == "human") {
            var tempdb = request.params.db_human

            var cqarraytemp = cqarray    //"你的武器伤害增加，增加数值为智力的5%"
            if (data[0].mohe[0][0] !== undefined) {
                cqarraytemp.push(data[0].mohe[0][0])
            }
            if (data[0].mohe[1][0] !== undefined) {
                cqarraytemp.push(data[0].mohe[1][0])
            }
            if (data[0].mohe[2][0] !== undefined) {
                cqarraytemp.push(data[0].mohe[2][0])
            }

            if (data[0].item1 && cqarraytemp.indexOf(29) > -1) {
                damage = damage + (zl * 0.05)
            }
        } else {
            var tempdb = request.params.db_follow
        }
        var todo = AV.Object.createWithoutData(tempdb, data[0].objectId);    // 修改属性
        if (who == "human") {
            todo.set('diaarray', h_dias);
            todo.set('exphour', cqnums);            //cqnums
        }
        todo.set('HJ', hj);
        todo.set('ZL', zl);
        todo.set('LL', ll);
        todo.set('MJ', mj);
        todo.set('TN', tn);
        todo.set('MP', mp);
        todo.set('HP', hp);
        todo.set('cd_p', cdx);
        todo.set('cqarray', cqarray);
        todo.set('attback', attback);
        todo.set('crit', crit);
        todo.set('critdamage', critdamage);
        todo.set('damage2', damage);
        todo.set('damage_p', damage_p);
        todo.set('fire', fire);
        todo.set('ray', ray);
        todo.set('poison', poison);
        todo.set('ice', ice);
        todo.set('resistance', resistance);
        todo.set('secmp', secmp);
        todo.set('speed', speed);
        todo.set('speed_p', speed_p);
        todo.save();

        var human_p = data[0].job == 1 ? ll : data[0].job == 2 ? mj : zl
        if (who == "follow") {
            var Account = AV.Object.extend(request.params.db_human);
            new AV.Query(Account).equalTo('user', request.currentUser).first().then(function (account) {
                account.set('diaarray_jc', h_dias);
                account.set('damage_jc', damage * (1 + (damage_p / 100)) * speed * (1 + (human_p / 100)) * (1 + (crit / 100 * critdamage / 100)));
                account.set('hp_jc', hp);
                account.set('hj_jc', hj);
                account.set('attback_jc', attback);
                account.set('resistance_jc', resistance);
                account.set('critdamage_jc', critdamage);
                account.set('ice_jc', ice);
                account.set('fire_jc', fire);
                account.set('ray_jc', ray);
                account.set('poison_jc', poison);
                account.set('cqarray_jc', cqarray);

                return account.save();
            })




            var query = new AV.Query(request.params.db_follow);
            query.equalTo('user', request.currentUser);
            return query.find().then(function (results) {
                var data_other = results.map(results => results.toJSON()) //从网络拿到数据
                if (data_other.length > 0) {

                } else {

                }
            }, function (error) {
                return error
            });
        }


        //类型
        function backdiamond(diamond) {

            switch (diamond) {
                case "未镶嵌":
                    break
                case "1级黄宝石":
                    h_dias[0] += 1
                    return llx += 10;

                case "2级黄宝石":
                    h_dias[0] += 2
                    return llx += 20;
                case "3级黄宝石":
                    h_dias[0] += 3
                    return llx += 30;
                case "4级黄宝石":
                    h_dias[0] += 4
                    return llx += 50;
                case "5级黄宝石":
                    h_dias[0] += 5
                    return llx += 80;
                case "6级黄宝石":
                    h_dias[0] += 6
                    return llx += 110;
                case "7级黄宝石":
                    h_dias[0] += 7
                    return llx += 150;

                case "1级红宝石":
                    h_dias[1] += 1
                    return zlx += 10;
                case "2级红宝石":
                    h_dias[1] += 2
                    return zlx += 20;
                case "3级红宝石":
                    h_dias[1] += 3
                    return zlx += 30;
                case "4级红宝石":
                    h_dias[1] += 4
                    return zlx += 50;
                case "5级红宝石":
                    h_dias[1] += 5
                    return zlx += 80;
                case "6级红宝石":
                    h_dias[1] += 6
                    return zlx += 110;
                case "7级红宝石":
                    h_dias[1] += 7
                    return zlx += 150;

                case "1级绿宝石":
                    h_dias[2] += 1
                    return mjx += 10;
                case "2级绿宝石":
                    h_dias[2] += 2
                    return mjx += 20;
                case "3级绿宝石":
                    h_dias[2] += 3
                    return mjx += 30;
                case "4级绿宝石":
                    h_dias[2] += 4
                    return mjx += 50;
                case "5级绿宝石":
                    h_dias[2] += 5
                    return mjx += 80;
                case "6级绿宝石":
                    h_dias[2] += 6
                    return mjx += 110;
                case "7级绿宝石":
                    h_dias[2] += 7
                    return mjx += 150;

                case "1级钻石":
                    h_dias[3] += 1
                    return critdamagex += 3, cdx += 1
                case "2级钻石":
                    h_dias[3] += 2
                    return critdamagex += 5, cdx += 1
                case "3级钻石":
                    h_dias[3] += 3
                    return critdamagex += 8, cdx += 2
                case "4级钻石":
                    h_dias[3] += 4
                    return critdamagex += 12, cdx += 2
                case "5级钻石":
                    h_dias[3] += 5
                    return critdamagex += 18, cdx += 3
                case "6级钻石":
                    h_dias[3] += 6
                    return critdamagex += 25, cdx += 4
                case "7级钻石":
                    h_dias[3] += 7
                    return critdamagex += 35, cdx += 5


                case "1级紫宝石":
                    h_dias[4] += 1
                    return hpx += 500, attbackx += 300
                case "2级紫宝石":
                    h_dias[4] += 2
                    return hpx += 700, attbackx += 400
                case "3级紫宝石":
                    h_dias[4] += 3
                    return hpx += 1000, attbackx += 500
                case "4级紫宝石":
                    h_dias[4] += 4
                    return hpx += 1500, attbackx += 700
                case "5级紫宝石":
                    h_dias[4] += 5
                    return hpx += 2000, attbackx += 1000
                case "6级紫宝石":
                    h_dias[4] += 6
                    return hpx += 2800, attbackx += 1500
                case "7级紫宝石":
                    h_dias[4] += 7
                    return hpx += 4000, attbackx += 2500
            }
        }
    }

}




