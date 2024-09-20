import React, { useState , useEffect } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [lastname, setUserlastname] = useState('');
  const [phone, setUserphonenumder] = useState('');
  const [email, setUserEmail] = useState('');
  const [nat, setNet] = useState('');
  const [desc, setDesc] = useState('');
  const [lang, setLange] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(()=>{
    const locol = JSON.parse(localStorage.getItem("users"));
    if(locol){
      setUser(locol)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users))
  },[users])

  function handleChangeName(event) {
    setUsername(event.target.value);
  }

  function handleChangelastname(event) {
    setUserlastname(event.target.value);
  }

  function handleChangephone(event) {
    setUserphonenumder(event.target.value);
  }

  function handleChangeemail(event) {
    setUserEmail(event.target.value);
  }

  function handleChangeNAT(event) {
    setNet(event.target.value);
  }

  function handleChangeDesc(event) {
    setDesc(event.target.value);
  }

  function handleSave(event) {
    event.preventDefault();

    const userInfo = {
      id: Date.now(),
      username,
      lastname,
      phone,
      email,
      nat,
      desc,
      lang,
    };

    if (
      userInfo.username.trim() !== '' &&
      userInfo.phone.trim() !== '' &&
      userInfo.lastname.trim() !== '' &&
      userInfo.email.trim() !== '' &&
      userInfo.desc.trim() !== ''
    ) {
      setUser([...users, userInfo]);
    } else {
      alert("Ma'lumotlarni to'liq kiriting");
    }

    setUsername('');
    setUserlastname('');
    setUserphonenumder('');
    setUserEmail('');
    setNet('Uzbekista');
    setDesc('');
  }

  const handleDelete = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUser(updatedUsers);
  };

  function handleLanguageChange(event) {
    const { value, checked } = event.target;
    if (checked) {
      setLange([...lang, value]);
    } else {
      setLange(lang.filter((element) => element !== value));
    }
  }

  return (
    <div className="hero_box">
      <div className="container">
        <form action="" className="usersInfo">
          <input
            onChange={handleChangeName}
            value={username}
            type="text"
            placeholder="Enter firstName"
            className="firstName input"
          />
          <input
            onChange={handleChangelastname}
            value={lastname}
            type="text"
            placeholder=" Enter lastName"
            className="lastName input"
          />
          <input
            onChange={handleChangephone}
            value={phone}
            type="number"
            placeholder="Enter phone: +998 90 123 45 45"
            className="phone input"
          />
          <input
            onChange={handleChangeemail}
            value={email}
            type="email"
            placeholder=" Enter Email..."
            className="email input"
          />
          <select
            id="city"
            name="city"
            className="notin input"
            onChange={handleChangeNAT}
          >
            <option value="Uzbekista">Uzbekista</option>
            <option value="USA">USA</option>
            <option value="Koreya">Koreya</option>
          </select>
          <div className='label'>
          <label htmlFor="language">
            <input
              type="checkbox"
              value="English"
              name="language"
              onChange={handleLanguageChange}
              checked={lang.includes('English')}
            />
            English
          </label>
          <label htmlFor="language">
            <input
              type="checkbox"
              value="Russian"
              name="language"
              onChange={handleLanguageChange}
              checked={lang.includes('Russian')}
            />
            Koreya
          </label>
          <label htmlFor="language">
            <input
              type="checkbox"
              value="Uzbek"
              name="language"
              onChange={handleLanguageChange}
              checked={lang.includes('Uzbek')}
            />
            Uzbek
          </label>
          </div>

          <textarea
            onChange={handleChangeDesc}
            value={desc}
            name="message"
            rows="4"
            cols="50"
            placeholder="Enter desc..."
            className="input textARE"
          ></textarea>
          <button className="btn" onClick={handleSave}>
            SAVE
          </button>
        </form>

        <div className="users_card">
          {users.length > 0 &&
            users.map(function (element, index) {
              return (
                <div className="user_card" key={element.id}>
                  <h3 className="card_title">
                    {element.username} {element.lastname}
                  </h3>
                  <p className="card_text">{element.phone}</p>
                  <p className="card_email box_styl">{element.email}</p>
                  <p className="card_nat box_styl">{element.nat}</p>
                  <p className="card_lang box_styl">{element.lang.join(', ')}</p>
                  <p className="card_desc box_styl">{element.desc}</p>

                  <button onClick={() => handleDelete(element.id)}  className='btn'>
                    Delete
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
