const BENEFITS = [
  'Complimentary shipping on all orders',
  'In a hurry? Choose our Express shipping service',
  'Easy 14-day returns with free pick-up',
  'Enjoy an exclusive appointment in store - book online now',
  'Collect your online purchase at the nearest Fendi store',
  'Check which colours and sizes are available in Fendi stores',
  'Signature Fendi packaging',
]

export const getRandomBenefit = () => BENEFITS[Math.floor(Math.random() * BENEFITS.length)]

export const numberWithCommas = (x) => `${x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}.00`
