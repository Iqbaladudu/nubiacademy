export function formatToK(number: number): string {
  // Jika angka kurang dari 1000, kembalikan angka asli
  if (number < 1000) {
    return number.toString();
  }

  // Untuk ribuan
  if (number < 1000000) {
    // Pembulatan 1 desimal
    const formattedNumber = (number / 1000).toFixed(1);
    return `${formattedNumber.replace(".0", "")}K`;
  }

  // Untuk jutaan
  if (number < 1000000000) {
    const formattedNumber = (number / 1000000).toFixed(1);
    return `${formattedNumber.replace(".0", "")}M`;
  }

  // Untuk milyaran
  if (number < 1000000000000) {
    const formattedNumber = (number / 1000000000).toFixed(1);
    return `${formattedNumber.replace(".0", "")}B`;
  }

  // Untuk trilyun
  const formattedNumber = (number / 1000000000000).toFixed(1);
  return `${formattedNumber.replace(".0", "")}T`;
}
