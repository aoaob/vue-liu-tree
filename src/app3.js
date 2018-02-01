var testTree = {
    Id: 1,
    classType: "article",
    name: "liaoningyiban",
    showName: "树目录测试",
    parentId: 0,
    order: 1,
    namePath: "liaoningyiban/",
    showNamePath: "树目录测试/",
    idPath: "1/",
    grandFather: 1,
    Child: [{
            Id: 4,
            classType: "article",
            name: "YiZiXun",
            showName: "易资讯",
            parentId: 1,
            order: 2,
            namePath: "liaoningyiban/YiZiXun/",
            showNamePath: "树目录测试/易资讯/",
            idPath: "1/4/",
            grandFather: 1,
            Child: [{
                    Id: 19,
                    classType: "article",
                    name: "JiaoDuJiangDaJiuDian",
                    showName: "角度讲大酒店",
                    parentId: 4,
                    order: 3,
                    namePath: "liaoningyiban/YiZiXun/JiaoDuJiangDaJiuDian/",
                    showNamePath: "树目录测试/易资讯/角度讲大酒店/",
                    idPath: "1/4/19/",
                    grandFather: 1,
                    Child: [{
                            Id: 15,
                            classType: "article",
                            name: "HaoHao",
                            showName: "好好",
                            parentId: 19,
                            order: 4,
                            namePath: "liaoningyiban/YiZiXun/JiaoDuJiangDaJiuDian/HaoHao/",
                            showNamePath: "树目录测试/易资讯/角度讲大酒店/好好/",
                            idPath: "1/4/19/15/",
                            grandFather: 1,
                            Child: [{
                                Id: 6,
                                classType: "article",
                                name: "YiXueXi",
                                showName: "易学习",
                                parentId: 15,
                                order: 5,
                                namePath: "liaoningyiban/YiZiXun/JiaoDuJiangDaJiuDian/HaoHao/YiXueXi/",
                                showNamePath: "树目录测试/易资讯/角度讲大酒店/好好/易学习/",
                                idPath: "1/4/19/15/6/",
                                grandFather: 1,
                                Child: []
                            }]
                        },
                        {
                            Id: 20,
                            classType: "article",
                            name: "6666",
                            showName: "6666",
                            parentId: 19,
                            order: 6,
                            namePath: "liaoningyiban/YiZiXun/JiaoDuJiangDaJiuDian/6666/",
                            showNamePath: "树目录测试/易资讯/角度讲大酒店/6666/",
                            idPath: "1/4/19/20/",
                            grandFather: 1,
                            Child: []
                        },
                        {
                            Id: 21,
                            classType: "article",
                            name: "88989",
                            showName: "88989",
                            parentId: 19,
                            order: 7,
                            namePath: "liaoningyiban/YiZiXun/JiaoDuJiangDaJiuDian/88989/",
                            showNamePath: "树目录测试/易资讯/角度讲大酒店/88989/",
                            idPath: "1/4/19/21/",
                            grandFather: 1,
                            Child: []
                        }
                    ]
                },
                {
                    Id: 7,
                    classType: "article",
                    name: "SiZhengGongGao",
                    showName: "思政公告",
                    parentId: 4,
                    order: 8,
                    namePath: "liaoningyiban/YiZiXun/SiZhengGongGao/",
                    showNamePath: "树目录测试/易资讯/思政公告/",
                    idPath: "1/4/7/",
                    grandFather: 1,
                    Child: []
                }
            ]
        },
        {
            Id: 5,
            classType: "article",
            name: "YiWenHua",
            showName: "易文化",
            parentId: 1,
            order: 9,
            namePath: "liaoningyiban/YiWenHua/",
            showNamePath: "树目录测试/易文化/",
            idPath: "1/5/",
            grandFather: 1,
            Child: []
        },
        {
            Id: 18,
            classType: "article",
            name: "JinJinJiJiao",
            showName: "斤斤计较",
            parentId: 1,
            order: 10,
            namePath: "liaoningyiban/JinJinJiJiao/",
            showNamePath: "树目录测试/斤斤计较/",
            idPath: "1/18/",
            grandFather: 1,
            Child: []
        },
        {
            Id: 14,
            classType: "article",
            name: "XinLei",
            showName: "新蕾",
            parentId: 1,
            order: 11,
            namePath: "liaoningyiban/XinLei/",
            showNamePath: "树目录测试/新蕾/",
            idPath: "1/14/",
            grandFather: 1,
            Child: []
        },
        {
            Id: 11,
            classType: "article",
            name: "ReDianJuJiao",
            showName: "热点聚焦",
            parentId: 1,
            order: 12,
            namePath: "liaoningyiban/ReDianJuJiao/",
            showNamePath: "树目录测试/热点聚焦/",
            idPath: "1/11/",
            grandFather: 1,
            Child: []
        }
    ]
};


//Vue.config.devtools = true;

import LiuTree from './LiuTree.vue';

new Vue({
    el: '#app',
    components: {
        LiuTree,
    },
    data: {
        IsLoging: false,
        log: [],
        tree: testTree,
        CacheModel: {
            from: null,
            fromParent: null,
            to: null,
            toParent: null,
            over: null,
            leveal: null,
        },
        Step: {
            Point: 0,
            StepContent: []
        },
        Style: 'NodeTree',
        Select: 0,
        SelectNode: {},
    },
    mounted: function() {
        this.index = this.layout.length;
    },
    watch: {},
    methods: {

    },
});