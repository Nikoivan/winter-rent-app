import { getPathByFulldate, validateDialogForm, validatePhone } from './calendar.utils';

test('Строка корректно формируется их FullDate', () => {
  const path = getPathByFulldate({ year: '2025', month: '11', date: '20' });

  expect(path).toBe('20-11-2025');
});

describe('Валидация значений - номера телефонов', () => {
  it('Телефон валиден', () => {
    expect(validatePhone('79787880738')).toBeTruthy();
  });

  it('Телефон не валиден', () => {
    expect(validatePhone('7978788073')).toBeFalsy();
  });
});

describe('Валидируем форму создания новой записи в журнале', () => {
  it('Все поля формы валидны', () => {
    const formFields = {
      name: 'Виктор',
      peopleAmount: 3,
      tel: 79787880738,
      city: 'SIMFEROPOL'
    };

    expect(validateDialogForm(formFields)).toEqual({
      name: true,
      peopleAmount: true,
      tel: true,
      city: true
    });
  });

  it('Форма имеет все не валидные значения', () => {
    const formFields = {
      name: '',
      peopleAmount: 0,
      tel: 7978788073,
      city: ''
    };

    expect(validateDialogForm(formFields)).toEqual({
      name: false,
      peopleAmount: false,
      tel: false,
      city: false
    });
  });
});
