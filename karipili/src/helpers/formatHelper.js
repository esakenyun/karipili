import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export const convertToStars = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<BsStarFill key={i} />);
    } else if (rating >= i + 0.5) {
      stars.push(<BsStarHalf key={i} />);
    } else {
      stars.push(<BsStar key={i} />);
    }
  }
  return stars;
};