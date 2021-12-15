const dummyDb = [
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

export default dummyDb;
