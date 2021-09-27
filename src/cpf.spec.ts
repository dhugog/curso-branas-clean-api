import { Cpf } from "./cpf";

describe('CPF Validator', () => {
  test('Should validate a valid CPF', () => {
    const cpf = new Cpf('516.370.640-39');

    const result = cpf.isValid();

    expect(result).toBeTruthy();
  })

  test('Should validate an invalid CPF with correct format', () => {
    const cpf = new Cpf('516.370.640-49');

    const result = cpf.isValid();

    expect(result).toBeFalsy();
  })

  test('Should throw Error if CPF has invalid format', () => {
    const cpf = new Cpf('516.370.640');

    expect(() => {
      cpf.isValid();
    }).toThrowError('Formato de CPF inválido');
  })
})