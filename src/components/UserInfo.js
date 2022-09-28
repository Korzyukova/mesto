export default class UserInfo {
    constructor(selectorName, selectorAbout, avatarSelector) {
        this.nameElement = document.querySelector(selectorName);
        this.aboutElement = document.querySelector(selectorAbout);
        this.avatarElement = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        return { name: this.nameElement.textContent, description: this.aboutElement.textContent };
    }

    setUserInfo(name, description, avatarUrl) {
        if (name)
            this.nameElement.textContent = name;
        if (description)
            this.aboutElement.textContent = description;
        if (avatarUrl)
            this.avatarElement.src = avatarUrl;
    }
}