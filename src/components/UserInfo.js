class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      description: this._jobElement.textContent,
      avatar: this._avatarElement.src,
    };
  }

  setUserInfo({ name, description, avatar, id }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = description;
    this._avatarElement.src = avatar;
    this._userId = id;
  }

  getUserId() {
    return this._userId;
  }
}

export default UserInfo;
