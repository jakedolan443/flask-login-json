    
var ui, cache, table, tableHandler, user_token;


//document.cookie="token=vi5923856bmaf9war25gasgawfq2";
function setUserToken(token) {
    document.cookie="token=vi5923856bmaf9war25gasgawfq2";
}    


async function main(username, user_token) {

    
    var config = await fetchConfig(username, user_token)
        
    
    link1 = document.getElementById("link_live")
    link1.onclick = function(){ui.selectTab(0)};
    link2 = document.getElementById("link_statistics")
    link2.onclick = function(){ui.selectTab(1)};
    link3 = document.getElementById("link_history")
    link3.onclick = function(){ui.selectTab(2)};
    link4 = document.getElementById("link_options")
    link4.onclick = function(){ui.selectTab(3)};
    tab1 = document.getElementById("tab_live")
    tab2 = document.getElementById("tab_statistics")
    tab3 = document.getElementById("tab_history")
    tab4 = document.getElementById("tab_options")
    var ui = new Interface([link1, link2, link3, link4], [tab1, tab2, tab3, tab4]);
    ui.selectTab(0);
    var cache = new Cache();

    var table = document.getElementById("log");
    var tableHandler = new TableHandler(table, config);

    BeginLiveListener(config.username, user_token, tableHandler);
    
};

