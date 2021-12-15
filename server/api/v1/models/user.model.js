import { v4 as uuidv4 } from 'uuid';
/* import dummyDb  from '../dummyDb.js'; */
let dummyDb = [
  {
    userId: '1',
    name: 'Fabrizzio De Bracamonte',
    email: 'fabrizziodbc@gmail.com',
    password: '123456',
    lists: [
      {
        listId: 1,
        listName: 'myFirstList',
        list: [
          {
            id: 1,
            order: 2,
            name: 'Saco de box',
            price: 215,
            link: 'google.com',
            why: 'Me encanta practicar Muay Thai y con un saco en casa podría mejorar mucho',
            img: null,
            done: false,
          },
          {
            id: 2,
            order: 1,
            name: 'Zapatillas de basquet',
            price: 360,
            link: 'google.com',
            why: 'Me gusta jugar basquet, pero al no tener zapatillas para ese deporte, termino lastimandome los pies o rompiendo mis otras zapatillas :(',
            img: null,
            done: false,
          },
          {
            id: 3,
            order: 3,
            name: 'Kindle',
            price: 320,
            link: 'google.com',
            why: 'Amo leer y creo que un kindle me sería de mucha ayuda',
            img: null,
            done: false,
          },
        ],
      },
    ],
  },
];

class User {
  constructor(name, email, password) {
    this.name = name;
    this.userId = uuidv4();
    this.email = email;
    this.password = password;
  }

  save() {
    const list = [];
    const { userId } = this;
    const { name } = this;
    const { email } = this;
    const { password } = this;
    dummyDb.push({
      userId,
      name,
      email,
      password,
      list,
    });
  }

  static fetchAll() {
    return dummyDb;
  }

  static fetchById(id) {
    const userById = dummyDb.find((e) => e.userId === id);
    return userById;
  }

  static deleteById(id) {
    const dummyDbFiltered = dummyDb.filter((e) => e.userId !== id);
    dummyDb = dummyDbFiltered;
    return dummyDb;
  }

  static update(id, newData) {
    const userIndex = dummyDb.indexOf(this.fetchById(id));
    const dummyCopy = [...dummyDb];
    const validData = {};
    if (newData.name) {
      validData.name = newData.name;
    }
    if (newData.email) {
      validData.email = newData.email;
    }
    if (newData.password) {
      validData.password = newData.password;
    }

    dummyCopy[userIndex] = {
      ...dummyCopy[userIndex],
      ...validData,
    };
    dummyDb = dummyCopy;
    return dummyDb;
  }
}

export default User;
