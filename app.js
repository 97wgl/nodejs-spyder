const express = require('express');
const eventproxy = require('eventproxy');
const cheerio = require('cheerio');
const superagent = require('superagent');

const app = express();
const ep = eventproxy();

let resultArr = []; //用来存储筛选后的对象
let desUrlList = [];  //存放目标页面的url列表

for(let i = 1; i <= 10; i++){
    let pageIndex = 25*(i-1);
    desUrlList.push(`https://movie.douban.com/top250?start=${pageIndex}&filter=`);
}

app.listen(3000,()=>{
    console.log("app is listening at port 3000...");
});

app.get('/',(req,res)=>{
    for(let desUrl of desUrlList) {
        superagent.get(desUrl).end(function(err,sres){

            if(err) {
                console.error(err);
            }

            const $ = cheerio.load(sres.text,{decodeEntities:false});  //解析response内容;decodeEntities设置为false防止出现乱码
            
            $('.item').each(function(index,element) {

                const Title =  $(element).find('.hd').find('span').first().html();
                const Director = $(element).find('.bd').find('p').html().split('\n')[1].split(":")[1].split("主演")[0].trim();
                const Staring = $(element).find('.bd').find('p').html().split('\n')[1].trim().split("<br>")[0].split(":")[2];
                const Time = $(element).find('.bd').find('p').html().replace(/[^0-9]/ig,"");
                const Country = $(element).find('.bd').find('p').html().split("<br>")[1].split('/')[1].trim();
                const Type = $(element).find('.bd').find('p').html().split("<br>")[1].split('/')[2].trim();
                const Quote = $(element).find('.inq').html();
                const Score = $(element).find('.rating_num').html();
                const Href = $(element).find('.hd').find('a').attr('href');

                const movie = {Title, Director, Staring, Time, Country, Type, Quote, Score, Href};
                resultArr.push(movie);
                ep.emit('allMovies',movie);
            })
        });
    }
    ep.after('allMovies',desUrlList.length,function(){
        res.send(resultArr);
        console.log(resultArr);
    });
});