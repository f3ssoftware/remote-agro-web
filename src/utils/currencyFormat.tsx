export function currencyFormat(num: number) {
  return !Number.isNaN(num)
    ? `R$ ${num?.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`
    : `R$ 0,00`;
}


export function unformatCurrency(str: string) {
  return Number(str.split("R$")[1].split(','));
}
