const CPF_LENGTH = 11;

export class Cpf {
  private readonly cpf: string;

  constructor(cpf: string) {
    this.cpf = cpf;
  }

  isValid(): boolean {
    this.validateFormat();

    const cpfCheckDigits = this.getCpfCheckDigits();
    const validCheckDigits = this.getValidCheckDigits();

    return cpfCheckDigits === validCheckDigits;
  }

  private validateFormat(): void | Error {
    const cpfBeingValidated = this.getUnmaskedCpf();

    if (!cpfBeingValidated || !this.hasCorrectLength() || this.repeatDigits()) {
      throw new Error('Formato de CPF inválido');
    }
  }

  private hasCorrectLength = (): boolean => this.getUnmaskedCpf().length === CPF_LENGTH;

  private repeatDigits = (): boolean => [...this.cpf].every(digit => digit === this.cpf[0]);

  private getCpfCheckDigits = (): string => this.cpf.substring(this.cpf.length - 2, this.cpf.length);

  private getValidCheckDigits(): string {
    const firstCheckDigit = this.getValidCheckDigit();
    const secondCheckDigit = this.getValidCheckDigit(firstCheckDigit);

    return `${firstCheckDigit}${secondCheckDigit}`;
  }

  private getValidCheckDigit(firstCheckDigit?: number): number {
    const cpf = this.getUnmaskedCpf();

    let validationKey = [...cpf]
      .slice(0, -2)
      .map(Number)
      .reduce((validation: number, currentDigit: number, currentDigitIndex: number) =>
        validation + ((firstCheckDigit ? 12 : 11) - currentDigitIndex - 1) * currentDigit, 0
      );

    if (firstCheckDigit) {
      validationKey += 2 * firstCheckDigit;
    }

    validationKey %= CPF_LENGTH;

    return validationKey < 2 ? 0 : CPF_LENGTH - validationKey;
  }

  private getUnmaskedCpf = (): string => this.cpf.replace(/[\D]/g, "");
}