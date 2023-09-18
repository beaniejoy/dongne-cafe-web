export function cafeNameWhiteSpace(cafeName) {
  return cafeName.replaceAll('-', ' ')
}


const WON = '원'
export function currencyKOR(money) {
  const convertedMoneyStr = 
    money
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',') ?? '0'

  return convertedMoneyStr + WON
}