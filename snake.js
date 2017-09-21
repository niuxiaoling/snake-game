/**
 * Created by dell on 2017/7/1.
 */

$(function (t) {
    let start=$('.start'); //获取开始按钮
    let onload=$('.onload'); //获取登录界面
    let stop=$('.stop');
    let box=$('.box');
    let onstart=$('.onstart');
    let re=$('.restart');
    let about=$('.about');
    let button=$('.button');
    function game() {
        let box = $('.box'); //获取游戏盒子
        let score=$('.score'); //获取分数
        let n=0;
        //场景构建，创建唯一的Id  19*19
        for (var i = 0; i < 20; i++) {
            for (var j = 0; j < 20; j++) {
                var div = $('<div>');
                div.id = 'r' + j + "-" + i;
                box.appendChild(div);

            }
        }
        //画蛇
//    数组储存有关联的变量，对象储存一个变量的特征{x:0,y:0}
        var she = [{x: 0, y: 0}, {x: 1, y: 0}, {x: 2, y: 0}];
        she.forEach(function (value) {
//   id:  "#r"+value.x+"-"+value.y
            var obj = $("#r" + value.x + "-" + value.y);
            obj.classList.add('she');
        })
        //获取食物
        function getFood() {
            do {
                var x = Math.floor(Math.random() * 20);
                var y = Math.floor(Math.random() * 20);
            } while (check(x, y)); //food 的x,y作为实参
            var obj = $("#r" + x + "-" + y);
            obj.classList.add('food');
            return {x: x, y: y};
        }

        var food = getFood();
        //检测是否某个坐标在蛇身上
        function check(m, n) {  //接收形参，返回布尔值
            var result = she.some(function (value) {  //遍历所有的蛇的x和y
                return value.x == m && value.y == n;   //只要蛇上有一个x和y和food的x和y相等,返回true
            })
            return result;
        }

        //移动方向
        var way = 'right'; //右走，x变，y不变
        function move() {
            var newheadx, newheady;
            var oldhead = she[she.length - 1];
            switch (way) {
                case"right":
                    newheadx = oldhead.x + 1; //即将移动的x
                    newheady = oldhead.y;   //即将移动的y
                    break;
                case"top":
                    newheadx = oldhead.x;
                    newheady = oldhead.y - 1;
                    break;
                case"left":
                    newheadx = oldhead.x - 1;
                    newheady = oldhead.y;
                    break;
                case"bottom":
                    newheadx = oldhead.x;
                    newheady = oldhead.y + 1;
                    break;
            }
            //判断结束
            if (newheadx < 0 || newheadx > 19 || newheady < 0 || newheady > 19 || check(newheadx, newheady)) {
                alert(`Game Over,分数为${n}分`);
                clearInterval(t);
                return;
            }

            var newheadobj = $("#r" + newheadx + "-" + newheady);
            newheadobj.className = 'she';  //问题
//            newheadobj.classList.add('she');
            she.push({x: newheadx, y: newheady});//新she
            //  新头的坐标和食物的坐标相同是是吃到了
            if (newheady == food.y && newheadx == food.x) {
                n+=10;
                food = getFood();
                score.innerHTML=`分数为${n}`;
            } else {
                var endobj = $("#r" + she[0].x + "-" + she[0].y);
                endobj.classList.remove('she');
                she.shift();//数组的变化
            }
        }
        t=setInterval(move,200);
        onstart.onclick=restart;
            function restart() {
                t=setInterval(move,200);
            }
        document.onkeydown = function (e) {
            // console.log(e.keyCode);
            var key = e.keyCode;
            if (key == '37') {  //左
                if (way == 'right') {
                    return;
                }
                way = 'left';
            } else if (key == "38") { //上
                if (way == 'bottom') {
                    return;
                }
                way = 'top';
            } else if (key == '39') { //右
                if (way == 'left') {
                    return;
                }
                way = 'right';
            } else if (key == '40') { //下
                if (way == 'top') {
                    return;
                }
                way = 'bottom';
            }else if(e.altKey){
                end();
            }
        }
    }

    start.onclick=open;
        function open() {
            animate(onload,{top:-700},800);
            game();
            about.style.display='none';
            animate(box,{left:550},500);
            animate(button,{right:300},500)
        }
    stop.onclick=end;

    function  end() {
        clearInterval(t);
    }
    re.onclick=function () {
        history.go(0);
    }
    document.onkeydown=function (e) {
        if(e.keyCode=="13"){
            open();
            return;
        }

    }


})

