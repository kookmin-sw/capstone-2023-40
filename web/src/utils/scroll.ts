export const scrollToRef = (refs: React.MutableRefObject<HTMLDivElement[]>, domIndex: number) => {
  refs.current[domIndex].scrollIntoView({ block: 'center', inline: 'nearest', behavior: 'smooth' });
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
