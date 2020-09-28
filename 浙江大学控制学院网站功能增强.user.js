// ==UserScript==
// @name         浙江大学控制学院网站功能增强
// @namespace    zjucse-enhancement
// @version      1.1
// @description  1. 增加网页标题. 2. 展开首页所有新闻目录. 3. 高亮显示近期新闻（默认3天）
// @author       onejoy
// @match        http://cse.zju.edu.cn/*
// @match        http://www.cse.zju.edu.cn/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    function changePageTitle() {
        var title = ''
        if (document.URL.match(/^http\:\/\/(www\.)?cse\.zju\.edu\.cn\/redir\.php\?catalog_id\=.*&object_id\=.*$/)) {
            title = document.getElementsByClassName("con2t mg2 xi24 cen")[0].textContent.split('\n')[1].replace(/\s/g, '') + '-';
        } else if (document.URL.match(/^http\:\/\/(www\.)?cse\.zju\.edu\.cn\/redir\.php\?catalog_id\=.*$/)) {
            var catalogue_first = document.getElementsByClassName("con1lt xi32 bai")[0].textContent.replace(/\s/g, '');
            var catalogue_second = document.getElementsByClassName("con1rtl f xi24")[0].textContent.replace(/\s/g, '');
            title = catalogue_first + '-' + catalogue_second + '-';
        }
        addTitle(title);
    }
    function addTitle(title) {
        var appendix = "浙江大学-控制科学与工程学院"
        title = title + appendix;
        document.title = title;
    }

    function expandIndex() {
        if (document.URL.match(/^http\:\/\/(www\.)?cse\.zju\.edu\.cn\/(index\.php)?$/)) {
            var middles = document.getElementsByClassName("middle");
            var controls = document.getElementsByClassName("control")[0].children;
            for (var i = 0; i < middles.length-1; i++) { // -1 because the last .middle is in footer
                if (middles[i].className == 'middle') {
                    middles[i].className = 'middle on';
                }
                middles[i].getElementsByClassName("more")[0].children[0].textContent = controls[i].textContent;
            }
            document.getElementsByClassName("control")[0].style.display='none';
            document.getElementsByClassName("left fl left-arrow")[0].style.display='none';
            document.getElementsByClassName("right fr right-arrow")[0].style.display='none';
        }
    }

    function highlightTime() {
        if (document.URL.match(/^http\:\/\/(www\.)?cse\.zju\.edu\.cn\/(index\.php)?$/)) {
            var today = new Date();
            var sec_in_day = 86400000;
            var threshold = 5;
            var times = document.getElementsByClassName("time");
            var date = new Date(0);
            for (var i = 0; i < times.length; i++) {
                if (times[i].childElementCount == 2) {
                    var month = times[i].children[0].textContent;
                    var day = times[i].children[1].textContent;
                    date = new Date(month + '-' + day);
                }
                date.setHours(0);
                if (today - date < sec_in_day * threshold) {
                    times[i].style.color='#FF0000'
                }
            }
        }
    }

    changePageTitle();
    expandIndex();
    highlightTime();
})();

