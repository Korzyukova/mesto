export default class UserInfo {
    constructor(selectorName, selectorAbout){
        this.nameElement = document.querySelector(selectorName);
        this.aboutElement = document.querySelector(selectorAbout);
    }
    getUserInfo()
    {
        return {name: this.nameElement.textContent, description : this.aboutElement.textContent};
    }

    setUserInfo(name, description)
    {
        this.nameElement.textContent = name;
        this.aboutElement.textContent = description;
    }
}