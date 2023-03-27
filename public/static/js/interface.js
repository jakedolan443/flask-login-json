class Interface {
    constructor(links, tabs) {
        this.links = links;
        this.tabs = tabs;
        this.currentTabIndex = 0;
    }
    _refreshRootElement() {
        for (let i = 0; i < this.links.length; i++) {
            this.links[i].classList.remove("selected");
            this.tabs[i].classList.remove("selected");
        } 
        this.links[this.currentTabIndex].classList.add("selected");
        this.tabs[this.currentTabIndex].classList.add("selected");
    }
    selectTab(tab_index) {
        this.currentTabIndex = tab_index;
        this._refreshRootElement();
    }
}
